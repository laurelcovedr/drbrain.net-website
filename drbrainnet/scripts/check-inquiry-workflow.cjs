const assert=require('node:assert/strict');const fs=require('node:fs');const ts=require('typescript');const Module=require('node:module');const path=require('node:path');
const load=Module._load;let user=null;let state='pending';let saves=0;let sent=0;const env={INQUIRY_ADMIN_EMAIL:'owner@example.com'};
Module._load=function(name,parent,...args){if(name==='cloudflare:workers')return {env};if(name==='@/app/chatgpt-auth')return {getChatGPTUser:async()=>user};if(name.startsWith('@/'))name=path.resolve(__dirname,'..',name.slice(2));return load.call(this,name,parent,...args)};
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {notifyInquiry}=require('../lib/inquiry-notifications.ts');const {POST}=require('../app/api/inquiries/manage/route.ts');const id='c15a91aa-0950-4540-bde0-20cbe9ea3467';
env.DB={prepare(sql){return {bind(...v){return {first:async()=>({id,notification_status:state}),run:async()=>{if(sql.includes('notification_status'))state=v[0];saves++;return {success:true}}}}}}};
const request=(status='assigned')=>new Request('https://example.com/api/inquiries/manage',{method:'POST',headers:{origin:'https://example.com'},body:new URLSearchParams({id,status,assignee:'Team A',notes:'Follow up'})});
(async()=>{
 assert.equal(await notifyInquiry(id,'https://example.com'),'pending');assert.equal(saves,0);
 assert.equal((await POST(request())).status,403);user={email:'other@example.com'};assert.equal((await POST(request())).status,403);
 user={email:'owner@example.com'};assert.equal((await POST(request('invalid'))).status,400);assert.equal((await POST(request())).status,303);assert.equal(saves,1);
 env.RESEND_API_KEY='test';env.INQUIRY_FROM_EMAIL='sender@example.com';env.INQUIRY_NOTIFY_EMAIL='team@example.com';
 global.fetch=async(url,opts)=>{sent++;assert.equal(url,'https://api.resend.com/emails');assert.equal(opts.headers['Idempotency-Key'],'inquiry/'+id);assert(!opts.body.includes('qa@example.com'));return Response.json({id:'provider-id'})};
 assert.equal(await notifyInquiry(id,'https://example.com'),'accepted');assert.equal(await notifyInquiry(id,'https://example.com'),'accepted');assert.equal(sent,1);
 state='pending';global.fetch=async()=>new Response('error',{status:500});assert.equal(await notifyInquiry(id,'https://example.com'),'failed');
 console.log('Inquiry workflow: missing config, authorization, status validation, persistence, notification acceptance/deduplication/failure passed.');
})().catch(e=>{console.error(e);process.exit(1)});
