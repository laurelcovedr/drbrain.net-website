import {env} from 'cloudflare:workers';
import {validateInquiry} from '@/lib/inquiry-validation';
export async function POST(request:Request){
 const headers={'Cache-Control':'no-store'};
 const reply=(body:unknown,status=200)=>Response.json(body,{status,headers});
 if(request.headers.get('origin')!==new URL(request.url).origin)return reply({error:'origin'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return reply({error:'type'},415);
 if(Number(request.headers.get('content-length')||0)>16000)return reply({error:'size'},413);
 const raw=await request.text();if(raw.length>16000)return reply({error:'size'},413);
 let body;try{body=validateInquiry(JSON.parse(raw))}catch{return reply({error:'invalid'},400)}
 if(!body)return reply({error:'invalid'},400);
 if(!env.DB)return reply({error:'unavailable'},503);
 try{
 const existing=await env.DB.prepare('SELECT id FROM inquiries WHERE id=?').bind(body.id).first();
 if(existing)return reply({id:body.id,status:'received'});
 const rateKey=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode((request.headers.get('cf-connecting-ip')||'unknown')+'|'+new Date().toISOString().slice(0,10))))).map(x=>x.toString(16).padStart(2,'0')).join('');
 const count=await env.DB.prepare('SELECT COUNT(*) AS n FROM inquiries WHERE rate_key=? AND created_at>?').bind(rateKey,Date.now()-3600000).first<{n:number}>();
 if((count?.n||0)>=5)return reply({error:'rate'},429);
 await env.DB.prepare('INSERT INTO inquiries (id,created_at,name,email,organization,role,country,message,purpose,solution,care_setting,locale,rate_key) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(body.id,Date.now(),body.name,body.email,body.organization,body.role,body.country,body.message,body.purpose,body.solution,body.careSetting,body.locale,rateKey).run();
 return reply({id:body.id,status:'received'},201);
 }catch{return reply({error:'unavailable'},503)}
}
