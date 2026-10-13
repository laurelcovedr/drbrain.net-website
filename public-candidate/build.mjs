import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(process.env.CANDIDATE_SOURCE || path.join(root,'../drbrainnet/lib')); 
const config=JSON.parse(fs.readFileSync(path.join(root,'config.json'),'utf8'));
export function policy(c){
  if(!['review','release'].includes(c.mode))throw Error('Unknown mode');
  const u=new URL(c.origin);
  if(u.protocol!=='https:'||u.pathname!=='/'||u.search||u.hash||u.username||u.password)throw Error('HTTPS origin required');
  if(c.mode==='release'&&(!c.approvedOrigin||c.approvedOrigin!==c.origin||!c.medicalContentApproved||!c.companyContentApproved||u.hostname.endsWith('.invalid')||u.hostname.includes('chatgpt.site')||u.hostname==='localhost'))throw Error('Release approvals required');
  return c.mode==='release';
}
const release=policy(config),origin=new URL(config.origin).origin;
function data(file,name){
  const s=fs.readFileSync(path.join(source,file),'utf8');
  const start=s.indexOf('export const '+name+':');
  if(start<0)throw Error('Missing source array '+name);
  const equal=s.indexOf('=',start),end=s.indexOf('\n];',equal)+3;
  if(end<3)throw Error('Source format changed '+name);
  return vm.runInNewContext('('+s.slice(equal+1,end-1)+')',{}, {timeout:1000});
}
const products=data('yiwei-data.ts','products');
const articles=data('yiwei-data.ts','articles');
const faqSource=fs.readFileSync(path.join(source,'yiwei-faq.ts'),'utf8');
const faqs=vm.runInNewContext('('+faqSource.slice(faqSource.indexOf('={',faqSource.indexOf('export const productQuestions'))+1).trim().replace(/;$/,'')+')',{}, {timeout:1000});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');
const pages=[];
const link=(p,t)=>`<a href="${esc(p)}">${esc(t)}</a>`;
const notes='<aside>For professional information. Screening and training do not provide a standalone diagnosis. Availability and intended use depend on product version and country; confirm applicable documentation with YIWEI MEDICAL.</aside>';
function add(route,title,description,body,extra=[]){pages.push({route,title,description,body,extra});}
add('/','YIWEI MEDICAL | Brain science and AI','Explore YIWEI MEDICAL brain imaging, cognitive assessment and VR and tablet training solutions.',`<h1>Advancing brain health through science and AI</h1><p>YIWEI MEDICAL develops brain imaging analysis, cognitive assessment and digital cognitive training technologies.</p><div class="grid">${products.map(p=>`<section><h2>${link('/products/'+p.slug,p.name)}</h2><p>${esc(p.description)}</p></section>`).join('')}</div>${notes}`);
add('/about/company','About YIWEI MEDICAL','Brain health technology spanning imaging AI, cognitive assessment and interactive training.',`<h1>About YIWEI MEDICAL</h1><p>YIWEI MEDICAL is a technology company focused on brain health. We develop solutions spanning AI-powered brain imaging analysis, cognitive assessment, and digital cognitive training.</p><p>Our approach connects insights from brain imaging with measures of cognitive function and interactive training experiences. Our technologies include medical imaging AI, eye tracking, virtual reality and tablet-based applications.</p><h2>Our mission</h2><p>To help people better understand, monitor and manage their brain health by translating scientific advances into accessible technologies.</p><h2>Evidence and responsible communication</h2><p>Each product and component should be evaluated for its intended use. Study populations, product versions and limitations matter when interpreting research.</p>${notes}`);
function evidence(list){return list.map(a=>`<article><h2>${esc(a.title)}</h2><p>${esc(a.authors)} · ${esc(a.journal)} · ${esc(a.year)}</p><p>${esc(a.citation||'')}</p><p><strong>Research relationship:</strong> ${esc(a.relation)}</p><p>${esc(a.summary)}</p><p><strong>Limitations:</strong> ${esc(a.limits)}</p>${a.publicationNote?`<p>${esc(a.publicationNote)}</p>`:''}${a.doi?`<p>${link('https://doi.org/'+a.doi,'DOI: '+a.doi)}</p>`:'<p>No DOI supplied; bibliographic details require verification before public release.</p>'}</article>`).join('');}
add('/evidence','Clinical evidence | YIWEI MEDICAL','Component-specific research summaries, citations and limitations for YIWEI MEDICAL solutions.',`<h1>Clinical evidence and research context</h1><p>Research does not establish clearance or efficacy for every marketed component. Summaries below are carried forward from company-supplied source material and require medical and bibliographic review before public release.</p>${evidence(articles)}`);
for(const p of products){
 const qs=faqs[p.slug];if(!qs?.length)throw Error('FAQ missing');
 add('/products/'+p.slug,p.name+' | YIWEI MEDICAL',p.description,`<h1>${esc(p.name)}</h1><p>${esc(p.description)}</p>${p.features.map(f=>`<section><h2>${esc(f.title)}</h2><p>${esc(f.text)}</p></section>`).join('')}${notes}<p>${link('/evidence/'+p.slug,'Read research and limitations')}</p><h2>Frequently asked questions</h2>${qs.map(q=>`<section><h3>${esc(q.question)}</h3><p>${esc(q.answer)}</p></section>`).join('')}`,[{'@type':'FAQPage','@id':origin+'/products/'+p.slug+'#faq',mainEntity:qs.map(q=>({'@type':'Question',name:q.question,acceptedAnswer:{'@type':'Answer',text:q.answer}}))}]);
 const list=articles.filter(a=>a.products.includes(p.slug));
 add('/evidence/'+p.slug,'Research for '+p.name+' | YIWEI MEDICAL','Study summaries and evidence limitations relevant to '+p.name+'.',`<h1>Research for ${esc(p.name)}</h1><p>Studies apply to their specified components, populations and versions. Independent studies provide scientific context and do not establish efficacy of the marketed product.</p>${list.length?evidence(list):'<p>Product-specific efficacy studies were not identified in the supplied material.</p>'}`,[{'@type':'ItemList',numberOfItems:list.length,itemListElement:list.map((a,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'ScholarlyArticle',name:a.title,abstract:a.summary,description:a.limits,creditText:a.authors,datePublished:a.year,...(a.doi?{url:'https://doi.org/'+a.doi,identifier:a.doi}:{})}}))}]);
}
const out=path.join(root,'dist');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const css='body{margin:0;background:#f6f9fc;color:#162b40;font:17px/1.65 system-ui,sans-serif}header,main,footer{max-width:1040px;margin:auto;padding:24px}nav{display:flex;gap:24px;flex-wrap:wrap}a{color:#006e91}h1{font-size:clamp(30px,5vw,48px);line-height:1.2}h2{line-height:1.3}section,article,aside{background:white;border:1px solid #d9e5ef;border-radius:12px;padding:24px;margin:20px 0}aside{background:#eaf3f8}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}footer{font-size:14px}';
fs.writeFileSync(path.join(out,'style.css'),css);
for(const p of pages){
 const graph=[{'@type':'Organization','@id':origin+'/#organization',name:'YIWEI MEDICAL',url:origin+'/'},{'@type':'WebPage','@id':origin+p.route,url:origin+p.route,name:p.title,description:p.description},...p.extra];
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><link rel="canonical" href="${esc(origin+p.route)}"><meta name="robots" content="${release?'index,follow':'noindex,nofollow'}"><meta property="og:url" content="${esc(origin+p.route)}"><meta property="og:title" content="${esc(p.title)}"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script></head><body><header><strong>YIWEI MEDICAL</strong><nav>${link('/','Home')}${link('/about/company','Company')}${link('/evidence','Evidence')}</nav></header><main>${p.body}</main><footer>${notes}<p>© YIWEI MEDICAL</p></footer></body></html>`;
 const dir=path.join(out,p.route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
fs.writeFileSync(path.join(out,'robots.txt'),`User-agent: *\n${release?'Allow: /':'Disallow: /'}\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(p=>`<url><loc>${esc(origin+p.route)}</loc></url>`).join('')+'</urlset>');
fs.writeFileSync(path.join(out,'llms.txt'),'# YIWEI MEDICAL\n\nResearch summaries are component-specific; screening is not diagnosis. Independent research does not prove marketed-product efficacy. Market availability requires confirmation.\n\n'+pages.map(p=>`- [${p.title}](${origin+p.route}): ${p.description}`).join('\n')+'\n');
fs.writeFileSync(path.join(out,'404.html'),'<!doctype html><html lang="en"><meta name="robots" content="noindex,nofollow"><title>Not found</title><h1>Page not found</h1></html>');
fs.writeFileSync(path.join(root,'build-manifest.json'),JSON.stringify({sourceCommit:config.sourceCommit,mode:config.mode,origin,pages:pages.map(({route,title})=>({route,title})),assetPolicy:'No original public assets copied',articleCount:articles.length,faqCount:Object.values(faqs).reduce((n,a)=>n+a.length,0)},null,2)+'\n');
console.log(`Built ${pages.length} isolated pages (${config.mode}); no source assets copied.`);
