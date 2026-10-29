import {env} from 'cloudflare:workers';
export async function notifyInquiry(id:string,origin:string):Promise<string>{
 if(!env.DB)return 'unavailable';
 if(!env.RESEND_API_KEY||!env.INQUIRY_FROM_EMAIL||!env.INQUIRY_NOTIFY_EMAIL)return 'pending';
 const row=await env.DB.prepare('SELECT id,notification_status FROM inquiries WHERE id=?').bind(id).first<{id:string;notification_status:string}>();
 if(!row)return 'missing';if(row.notification_status==='accepted')return 'accepted';
 let state='failed';
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'inquiry/'+id},signal:AbortSignal.timeout(6000),body:JSON.stringify({from:env.INQUIRY_FROM_EMAIL,to:[env.INQUIRY_NOTIFY_EMAIL],subject:'YIWEI website enquiry '+id,text:'A website enquiry is ready for review. Reference: '+id+'\nSign in to the protected inbox: '+origin+'/inquiries\nThis notification contains no customer contact details.'})});const result=await response.json() as {id?:string};if(response.ok&&result.id)state='accepted'}catch{}
 await env.DB.prepare('UPDATE inquiries SET notification_status=? WHERE id=?').bind(state,id).run();return state;
}
