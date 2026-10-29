const assert=require('node:assert/strict');const fs=require('node:fs');const ts=require('typescript');const Module=require('node:module');const path=require('node:path');
const load=Module._load;const env={};Module._load=function(name,parent,...args){if(name==='cloudflare:workers')return {env};if(name.startsWith('@/'))name=path.resolve(__dirname,'..',name.slice(2));return load.call(this,name,parent,...args)};
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {POST}=require('../app/api/inquiries/route.ts');
const body={id:'c15a91aa-0950-4540-bde0-20cbe9ea3467',name:'QA',email:'qa@example.com',organization:'',role:'',country:'',message:'Test',purpose:'Demo request',solution:'RealNow™',careSetting:'Radiology Department',locale:'zh',website:''};
const request=(data=body,origin='https://example.com')=>new Request('https://example.com/api/inquiries',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(data)});
(async()=>{
 assert.equal((await POST(request(body,'https://evil.example'))).status,403);
 assert.equal((await POST(request({...body,email:'invalid'}))).status,400);
 assert.equal((await POST(request({...body,message:''}))).status,400);
 assert.equal((await POST(request({...body,website:'spam'}))).status,400);
 assert.equal((await POST(request())).status,503);
 let saved=false;let count=0;env.DB={prepare(sql){return {bind(...values){return {async first(){return sql.startsWith('SELECT id')?(saved?{id:body.id}:null):{n:count}},async run(){assert(values.includes('Radiology Department'));saved=true;return {success:true}}}}}}};
 const result=await POST(request());assert.equal(result.status,201);assert.equal((await result.json()).id,body.id);
 assert.equal((await POST(request())).status,200);
 saved=false;count=5;assert.equal((await POST(request())).status,429);
 console.log('8 inquiry checks passed: origin, validation, honeypot, unavailable, persistence, idempotency, rate limit.');
})().catch(e=>{console.error(e);process.exit(1)});
