import {env} from 'cloudflare:workers';
import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export const metadata={title:'YIWEI inquiry inbox',robots:{index:false,follow:false}};
export default async function Inbox(){
 const user=await requireChatGPTUser('/inquiries');
 if(!env.INQUIRY_ADMIN_EMAIL||user.email.toLowerCase()!==env.INQUIRY_ADMIN_EMAIL.toLowerCase())notFound();
 const result=await env.DB!.prepare('SELECT id,created_at,name,email,organization,message,purpose,solution,care_setting,status,assignee,notes,updated_at,notification_status FROM inquiries ORDER BY created_at DESC LIMIT 100').all<Record<string,string|number>>();
 return <main style={{maxWidth:1000,margin:'40px auto',padding:24}}><h1>问询收件箱 / Inquiry inbox</h1><p>最近100条。记录负责人、跟进状态及备注；邮件服务未配置时通知保持 pending。</p><p>通知 accepted 仅代表发信服务接受请求，不代表邮件已投递。失败通知可重试。</p>{result.results.map(r=><article key={r.id} style={{borderBottom:'1px solid #ccc',padding:'24px 0'}}><h2>{String(r.name)} · {String(r.solution)}</h2><p>{new Date(Number(r.created_at)).toISOString()} · {String(r.id)}</p><p>{String(r.email)} · {String(r.organization)} · {String(r.care_setting)}</p><p style={{whiteSpace:'pre-wrap'}}>{String(r.message)}</p><form action="/api/inquiries/manage" method="post"><input type="hidden" name="id" value={String(r.id)}/><label>状态 / Status <select name="status" defaultValue={String(r.status)}>{['new','assigned','contacted','closed'].map(v=><option key={v} value={v}>{v}</option>)}</select></label><label>负责人 / Owner <input name="assignee" maxLength={100} defaultValue={String(r.assignee)}/></label><label>跟进备注 / Notes <textarea name="notes" maxLength={2000} defaultValue={String(r.notes)}/></label><button type="submit">保存跟进 / Save</button></form><p>通知 / Notification: {String(r.notification_status)}</p><form action="/api/inquiries/manage" method="post"><input type="hidden" name="id" value={String(r.id)}/><button name="action" value="notify">重试通知 / Retry notification</button></form><a href={'mailto:'+encodeURIComponent(String(r.email))+'?subject='+encodeURIComponent('Re: YIWEI inquiry '+r.id)}>回复 / Reply</a></article>)}</main>;
}
