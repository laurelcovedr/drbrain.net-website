import {env} from 'cloudflare:workers';
import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export const metadata={title:'YIWEI inquiry inbox',robots:{index:false,follow:false}};
export default async function Inbox(){
 const user=await requireChatGPTUser('/inquiries');
 if(!env.INQUIRY_ADMIN_EMAIL||user.email.toLowerCase()!==env.INQUIRY_ADMIN_EMAIL.toLowerCase())notFound();
 const result=await env.DB!.prepare('SELECT id,created_at,name,email,organization,message,purpose,solution,care_setting FROM inquiries ORDER BY created_at DESC LIMIT 100').all<Record<string,string|number>>();
 return <main style={{maxWidth:1000,margin:'40px auto',padding:24}}><h1>问询收件箱 / Inquiry inbox</h1><p>最近100条。网站已保存问询，不代表邮件已发送。</p>{result.results.map(r=><article key={r.id} style={{borderBottom:'1px solid #ccc',padding:'24px 0'}}><h2>{String(r.name)} · {String(r.solution)}</h2><p>{new Date(Number(r.created_at)).toISOString()} · {String(r.id)}</p><p>{String(r.email)} · {String(r.organization)} · {String(r.care_setting)}</p><p style={{whiteSpace:'pre-wrap'}}>{String(r.message)}</p><a href={'mailto:'+encodeURIComponent(String(r.email))+'?subject='+encodeURIComponent('Re: YIWEI inquiry '+r.id)}>回复 / Reply</a></article>)}</main>;
}
