import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {notifyInquiry} from '@/lib/inquiry-notifications';
export async function POST(request:Request){
 const headers={'Cache-Control':'no-store'};const fail=(status:number)=>new Response('Request unavailable',{status,headers});
 if(request.headers.get('origin')!==new URL(request.url).origin)return fail(403);
 const user=await getChatGPTUser();if(!user||!env.INQUIRY_ADMIN_EMAIL||user.email.toLowerCase()!==env.INQUIRY_ADMIN_EMAIL.toLowerCase())return fail(403);
 if(!env.DB)return fail(503);if(Number(request.headers.get('content-length')||0)>8000)return fail(413);
 const data=await request.formData();const id=String(data.get('id')||'');if(!/^[a-zA-Z0-9-]{20,64}$/.test(id))return fail(400);
 if(data.get('action')==='notify'){await notifyInquiry(id,new URL(request.url).origin)}else{
 const status=String(data.get('status')||'');const assignee=String(data.get('assignee')||'').trim();const notes=String(data.get('notes')||'').trim();
 if(!['new','assigned','contacted','closed'].includes(status)||assignee.length>100||notes.length>2000)return fail(400);
 await env.DB.prepare('UPDATE inquiries SET status=?,assignee=?,notes=?,updated_at=? WHERE id=?').bind(status,assignee,notes,Date.now(),id).run();
 }
 return new Response(null,{status:303,headers:{...headers,Location:'/inquiries'}});
}
