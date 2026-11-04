const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');
const resolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...args){return resolve.call(this,request.startsWith('@/')?root+'/'+request.slice(2):request,parent,...args)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=function(mod,file){const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}});mod._compile(output.outputText,file)};
const {seoPages,navigationPaths,metadataFor,canonicalPath,structuredDataFor,siteOrigin}=require('../lib/yiwei-seo.ts');
const {products,articles,productAliases}=require('../lib/yiwei-data.ts');
const {renderToStaticMarkup}=require('react-dom/server');
const React=require('react');
const Site=require('../components/yiwei-site.tsx').default;
const {SeoData}=require('../components/seo-data.tsx');
const {productQuestions}=require('../lib/yiwei-faq.ts');
const sitemap=require('../app/sitemap.ts').default();
assert.equal(new Set(seoPages.map(p=>p.path)).size,seoPages.length,'duplicate route');
assert.equal(new Set(seoPages.map(p=>p.title)).size,seoPages.length,'duplicate title');
assert.equal(new Set(seoPages.map(p=>p.description)).size,seoPages.length,'duplicate description');
for(const url of navigationPaths)assert(seoPages.some(p=>p.path===url),'navigation omitted '+url);
for(const p of seoPages){
 const [section='home',slug]=p.path.slice(1).split('/');
 const meta=metadataFor(section||'home',slug);
 assert(meta.title&&meta.description,'incomplete metadata '+p.path);
 assert.equal(meta.alternates.canonical,siteOrigin+p.path);
 assert.equal(meta.openGraph.url,meta.alternates.canonical);
 assert.equal(meta.twitter.card,'summary_large_image');
 assert.deepEqual(meta.robots,{index:false,follow:false});
 const img=new URL(meta.openGraph.images[0].url).pathname;
 assert(fs.existsSync(root+'/public'+img),'missing OG asset '+img);
 const graph=structuredDataFor(section||'home',slug)['@graph'];
 assert(graph.some(n=>n['@type']==='Organization'));
 assert(graph.some(n=>n['@type']==='WebSite'));
 assert(!JSON.stringify(graph).includes('aggregateRating'),'unverified rating');
 assert(!JSON.stringify(graph).includes('"offers"'),'unverified offer');
 for(const crumb of graph.filter(n=>n['@type']==='BreadcrumbList')){
  assert.equal(crumb.itemListElement.at(-1).item,meta.alternates.canonical);
  assert(crumb.itemListElement.every((x,i)=>x.position===i+1));
 }
}
for(const [alias,target] of Object.entries(productAliases))for(const section of ['products','evidence'])assert.equal(canonicalPath(section,alias),'/'+section+'/'+target);
assert.equal(sitemap.length,87);
assert(sitemap.every(x=>seoPages.some(p=>[siteOrigin+p.path,siteOrigin+'/zh'+(p.path==='/'?'':p.path),siteOrigin+'/es'+(p.path==='/'?'':p.path)].includes(x.url)&&!p.legacy)));
const html=renderToStaticMarkup(React.createElement(Site,{section:'evidence'}));
for(const a of articles){
 assert(html.includes(a.url.replace(/&/g,'&amp;').replace(/"/g,'&quot;')),'publication link absent '+a.id);
 if(a.suppliedPdf){assert(html.includes(a.suppliedPdf),'PDF link absent '+a.id);assert(fs.existsSync(root+'/public'+a.suppliedPdf),'missing PDF '+a.suppliedPdf)}
}
assert.equal((html.match(/class="article-row"/g)||[]).length,articles.length);
for(const p of products){const graph=structuredDataFor('products',p.slug)['@graph'];const product=graph.find(n=>n['@type']==='Product');assert.equal(product.name,p.name);const evidence=structuredDataFor('evidence',p.slug)['@graph'].find(n=>n['@type']==='ItemList');assert.equal(evidence.numberOfItems,articles.filter(a=>a.products.includes(p.slug)).length)}
const markup=renderToStaticMarkup(React.createElement(SeoData,{section:'home'}));
assert(markup.includes('type="application/ld+json"'));
assert(!markup.includes('&quot;'),'JSON-LD must contain raw JSON');
let questionCount=0;
for(const p of products){
 const rendered=renderToStaticMarkup(React.createElement(Site,{section:'products',detail:p.slug}));
 const faq=structuredDataFor('products',p.slug)['@graph'].find(n=>n['@type']==='FAQPage');
 assert(faq,'missing FAQ schema '+p.slug);
 assert.equal(faq.mainEntity.length,productQuestions[p.slug].length);
 for(const [i,q] of productQuestions[p.slug].entries()){
  assert.equal(faq.mainEntity[i].name,q.question);
  assert.equal(faq.mainEntity[i].acceptedAnswer.text,q.answer);
  const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
  assert(rendered.includes(escape(q.question))&&rendered.includes(escape(q.answer)),'FAQ missing from rendered HTML '+p.slug);
  assert(seoPages.some(p=>p.path===q.link.split(/[?#]/)[0]),'FAQ link invalid '+q.link);
  questionCount++;
 }
 assert.equal((rendered.match(/<h1(?:\s|>)/g)||[]).length,1,'single primary heading');
}
for(const item of structuredDataFor('evidence')['@graph'].find(n=>n['@type']==='ItemList').itemListElement){
 const article=articles.find(a=>item.item['@id'].endsWith('#study-'+a.id));
 assert.equal(item.item.abstract,article.summary);assert.equal(item.item.description,article.limits);
}
const llms=fs.readFileSync(root+'/public/llms.txt','utf8');
for(const match of llms.matchAll(/\]\((https:[^)]+)\)/g))assert(seoPages.some(p=>siteOrigin+p.path===match[1]),'llms index points to unknown route');
assert(!llms.includes('/resources/registrations/'),'restricted PDF indexed');
assert.equal(fs.readFileSync(root+'/public/robots.txt','utf8').trim(),'User-agent: *\nDisallow: /');
console.log(JSON.stringify({visible_product_questions:questionCount,faq_schema_matches_content:true,research_abstracts_and_limits:true,llms_links_valid:true}));
console.log(JSON.stringify({seo_pages:seoPages.length,sitemap_urls:sitemap.length,unique_titles_and_descriptions:true,canonical_and_share_metadata:true,structured_data:true,publication_links:articles.length,source_pdfs:articles.filter(a=>a.suppliedPdf).length,private_robots_preserved:true}));
