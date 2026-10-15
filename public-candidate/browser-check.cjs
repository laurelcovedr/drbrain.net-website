/* Browser QA starts its own loopback-only static server. No production or private source is served. */
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const root=__dirname, out=path.join(root,'browser-results');
const dist=path.join(root,'dist');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'build-manifest.json')));
const widths=[360,390,768,1024,1440];
const products=['dr-brain','realnow','autismshield','forcus'];
const report={browser:'Chromium',startedAt:new Date().toISOString(),cases:[],errors:[],externalRequests:[],citationLinks:'Compared with JSON-LD and href; no external DOI availability or bibliographic verification claimed.'};
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
 let route;try{route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 let target=path.resolve(dist,'.'+route);
 if(!target.startsWith(dist+path.sep)&&target!==dist){res.writeHead(403).end();return;}
 if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
 if(!fs.existsSync(target)){res.writeHead(404,{'Content-Type':'text/html','X-Robots-Tag':'noindex, nofollow'}).end(fs.readFileSync(path.join(dist,'404.html')));return;}
 res.writeHead(200,{'Content-Type':target.endsWith('.css')?'text/css':'text/html','X-Robots-Tag':'noindex, nofollow'}).end(fs.readFileSync(target));
});
(async()=>{
 let browser;
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true});
  report.browserVersion=browser.version();
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
   await context.route('**/*',route=>{
    if(new URL(route.request().url()).origin!==origin){report.externalRequests.push(route.request().url());return route.abort();}
    return route.continue();
   });
   const page=await context.newPage();
   page.on('pageerror',e=>report.errors.push(e.message));
   for(const {route} of manifest.pages){
    const result={width,route,status:'running'};report.cases.push(result);
    const response=await page.goto(origin+route,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
    const overflow=await page.evaluate(()=>({viewport:innerWidth,body:document.documentElement.scrollWidth,offscreen:[...document.querySelectorAll('main h1,main h2,main h3,main p,main .button,main .doi a')].filter(e=>{const r=e.getBoundingClientRect();return r.width&& (r.left< -1||r.right>innerWidth+1);}).map(e=>e.textContent.slice(0,90))}));
    assert.ok(overflow.body<=width+1,JSON.stringify(overflow));
    assert.deepEqual(overflow.offscreen,[],'Text outside viewport: '+JSON.stringify(overflow));
    // CSS font size stays readable at each device width.
    assert.ok(await page.locator('.lead').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));
    const links=await page.locator('a').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
    for(const href of new Set(links.filter(h=>h.startsWith('/')))){
     const r=await context.request.get(origin+href);assert.equal(r.status(),200,'Broken internal link '+href);
    }
    if(route.startsWith('/products/')){
     assert.equal(await page.locator('.faq details').count(),4);
     const graph=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
     const questions=graph.find(n=>n['@type']==='FAQPage').mainEntity;
     for(let i=0;i<questions.length;i++){
      const detail=page.locator('.faq details').nth(i), summary=detail.locator('summary');
      await summary.focus();await page.keyboard.press('Enter');
      assert.equal(await detail.getAttribute('open'),'');
      assert.equal((await detail.locator('p').textContent()).trim(),questions[i].acceptedAnswer.text);
      assert.ok(await detail.locator('p').isVisible());
      await page.keyboard.press('Enter');assert.equal(await detail.getAttribute('open'),null);
     }
     if(width===390&&route==='/products/dr-brain'){
      await page.locator('.faq details').first().locator('summary').click();
      await page.locator('.faq').screenshot({path:path.join(out,'faq-mobile.png')});
     }
    }
    if(route.startsWith('/evidence/')){
     const graph=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
     const list=graph.find(n=>n['@type']==='ItemList');
     const expected=list.itemListElement.map(x=>x.item.url).filter(Boolean);
     const actual=await page.locator('.doi a').evaluateAll(as=>as.map(a=>a.href));
     assert.deepEqual(actual,expected,'Citation destinations differ from supplied source/schema');
     assert.equal(await page.locator('.limitations').count(),list.numberOfItems);
    }
    if(['/', '/about/company','/products/dr-brain','/evidence/realnow'].includes(route)){
     await page.screenshot({path:path.join(out,`${route==='/'?'home':route.slice(1).replaceAll('/','-')}-${width}.png`),fullPage:true});
    }
    // Keyboard-operable mobile and desktop menus, followed by real navigation.
    const menu=page.locator(width<=700?'.mobile-menu':'.product-menu');
    await menu.locator('summary').focus();await page.keyboard.press('Enter');
    assert.equal(await menu.getAttribute('open'),'');
    const destination='/products/'+products[manifest.pages.findIndex(p=>p.route===route)%4];
    await menu.locator(`a[href="${destination}"]`).click();
    await page.waitForURL(url=>url.pathname.replace(/\/$/,'')===destination);
    assert.equal(await page.locator('h1').count(),1);
    result.status='passed';
   }
   await page.goto(origin+'/');
   // Primary product links and research links are followed, not just counted.
   for(const slug of products){
    await page.goto(origin+'/');await page.locator(`.product-card .text-link[href="/products/${slug}"]`).click();
    await page.locator(`.hero a[href="/evidence/${slug}"]`).click();
    assert.ok(new URL(page.url()).pathname.replace(/\/$/,'')==='/evidence/'+slug);
   }
   await page.goto(origin+'/');await page.keyboard.press('Tab');
   assert.equal(await page.locator(':focus').textContent(),'Skip to content');
   await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
   assert.equal((await context.request.get(origin+'/missing-route')).status(),404);
   await context.close();
  }
  assert.deepEqual(report.externalRequests,[],'Unexpected remote resource request');
  assert.deepEqual(report.errors,[],'Browser JavaScript errors');
  report.status='passed';
 }catch(e){report.status='failed';report.failure=e.stack;process.exitCode=1;}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.completedAt=new Date().toISOString();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
})();
