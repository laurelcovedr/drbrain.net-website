const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const Module=require('node:module');const ts=require('typescript');
const root=path.resolve(__dirname,'..');const resolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...args){return resolve.call(this,request.startsWith('@/')?root+'/'+request.slice(2):request,parent,...args)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=function(mod,file){const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}});mod._compile(output.outputText,file)};
const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');const Site=require('../components/yiwei-site.tsx').default;const {LocaleProvider}=require('../components/locale-provider.tsx');const {seoPages}=require('../lib/yiwei-seo.ts');const i18n=require('../lib/i18n.ts');const original=i18n.translate;const missing=new Set();i18n.translate=(s,l)=>{const t=original(s,l);if(l!=='en'&&t===s&&/[a-zA-Z]{3}/.test(s))missing.add(s.trim());return t};
const preserved=new Set(require('../lib/translations/preserved-terms.json'));
const signature=html=>Array.from(html.matchAll(/<([a-z][\w-]*)(\s[^>]*?)?>/g)).filter(m=>!['link'].includes(m[1])).map(m=>m[1]+':'+(m[2]?.match(/class="([^"]*)"/)?.[1]||'')).join('\n');
let count=0;
for(const p of seoPages.filter(p=>!p.legacy)){
 const [section='home',detail]=p.path.slice(1).split('/').filter(Boolean);const render=locale=>renderToStaticMarkup(React.createElement(LocaleProvider,{locale},React.createElement(Site,{section,detail})));
 const english=render('en');for(const locale of ['zh','es']){const html=render(locale);assert.equal(signature(html),signature(english),'DOM structure changed: '+locale+p.path);const prefix='/'+locale;
 const content=html.replace(/<details class="language-menu"[\s\S]*?<\/details>/g,'');
 for(const m of content.matchAll(/href="(\/(?!\/)[^"?#]*)/g)){if(/^\/(products|technology|evidence|care-settings|reports|about|contact)(\/|$)/.test(m[1])){assert.fail('unlocalized internal link '+m[1]+' on '+locale+p.path);}}
 if(p.path==='/'){assert(html.includes(locale==='zh'?'推动脑健康':'Impulsamos la salud cerebral'));assert(html.includes(locale==='zh'?'四大聚焦方案':'Cuatro soluciones específicas'));}
 if(p.path==='/contact')for(const attr of ['name="name"','name="email"','name="message"','required=""'])assert(html.includes(attr),'form contract changed');
 count++;}
}
assert.equal(i18n.localizedHref('/products/dr-brain?source=qa#questions','es'),'/es/products/dr-brain?source=qa#questions');assert.equal(i18n.localizedHref('/resources/research/veca.pdf','zh'),'/resources/research/veca.pdf');assert.equal(i18n.localizedHref('https://example.com','zh'),'https://example.com');
for(const value of missing)assert(preserved.has(value),'Untranslated user-facing text: '+value);
const {products,articles}=require('../lib/yiwei-data.ts');const {productQuestions}=require('../lib/yiwei-faq.ts');
for(const locale of ['zh','es']){for(const a of articles)for(const key of ['title','summary','limits'])assert.notEqual(i18n.translate(a[key],locale),a[key],'Untranslated research '+a.id+' '+key);for(const p of products){assert.notEqual(i18n.translate(p.description,locale),p.description);for(const q of productQuestions[p.slug])for(const key of ['question','answer'])assert.notEqual(i18n.translate(q[key],locale),q[key]);}}
fs.writeFileSync('/tmp/untranslated.json',JSON.stringify([...missing],null,2));console.log(JSON.stringify({localized_pages_checked:count,same_dom_and_classes:true,form_contract_preserved:true,preserved_names_and_identifiers:missing.size,untranslated_editorial_texts:0}));
