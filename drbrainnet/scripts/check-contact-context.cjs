const assert=require('node:assert/strict');
const fs=require('node:fs');const ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {demoHref,readContactContext}=require('../lib/contact-context.ts');
const {prepareInquiryEmail}=require('../lib/contact-email.ts');
const {products}=require('../lib/yiwei-data.ts');
const {careSettings}=require('../lib/yiwei-care-settings.ts');
for(const product of products){const url=demoHref(product.slug);assert.equal(readContactContext(url.split('?')[1]).product,product.name)}
for(const setting of careSettings){const url=demoHref(undefined,setting.slug);assert.equal(readContactContext(url.split('?')[1]).setting,setting.label)}
assert.deepEqual(readContactContext('?product=unknown&setting=unknown&intent=unknown'),{demo:false,product:'Solution overview',setting:'Not specified'});
const email=prepareInquiryEmail('Demo request','RealNow™',{name:'QA',email:'qa@example.com',organization:'',role:'',country:'',message:'Demo request',careSetting:'Radiology Department'});
assert.match(email.body,/Care setting: Radiology Department/);assert.match(decodeURIComponent(email.href),/Demo request/);
console.log('Contact context: four products, four settings, invalid query fallback and email context passed.');
