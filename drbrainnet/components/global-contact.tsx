/** @jsxImportSource @/lib/localized-jsx */
'use client';
import {useState,useEffect,type FormEvent} from 'react';
import {useLocale} from '@/components/locale-provider';
import {Mail} from 'lucide-react';
import {brandMessaging} from '@/lib/yiwei-brand';
import {Breadcrumb} from '@/components/site-navigation';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {products} from '@/lib/yiwei-data';
import {contactEmail,prepareInquiryEmail,type InquiryFields} from '@/lib/contact-email';

import {careSettings} from '@/lib/yiwei-care-settings';
import {readContactContext} from '@/lib/contact-context';

const inquiryTypes=[
 {id:'products',label:'Product inquiries',description:'Explore our solutions for your clinic, hospital or brain-health programme.'},
 {id:'partnerships',label:'Partnerships',description:'Connect with us about distribution and local deployment in your market.'},
 {id:'research',label:'Research collaboration',description:'Discuss clinical research, evaluation and collaboration with our team.'},
];
const emptyFields:InquiryFields={name:'',email:'',organization:'',role:'',country:'',message:''};

export function ContactPage(){
 const locale=useLocale();
 const [sending,setSending]=useState(false);
 const [receipt,setReceipt]=useState('');
 const [failure,setFailure]=useState(false);
 const [requestId,setRequestId]=useState('');
 const [purpose,setPurpose]=useState('products');
 const [solution,setSolution]=useState('Solution overview');
 const [fields,setFields]=useState<InquiryFields>(emptyFields);
 const [prepared,setPrepared]=useState(false);
 const [copyState,setCopyState]=useState<'idle'|'copied'|'manual'>('idle');
 const [demo,setDemo]=useState(false);
 const [setting,setSetting]=useState('Not specified');
 useEffect(()=>{const context=readContactContext(window.location.search);setDemo(context.demo);setSolution(context.product);setSetting(context.setting)},[]);
 const update=(key:keyof InquiryFields,value:string)=>{setFields(f=>({...f,[key]:value}));setPrepared(false);setCopyState('idle')};
 const current=inquiryTypes.find(i=>i.id===purpose)!;
 const draft=prepareInquiryEmail(demo?'Demo request':current.label,solution,{...fields,careSetting:setting});
 const copyInquiry=async(form:HTMLFormElement)=>{
  if(!form.reportValidity())return;
  const text=draft.subject+'\n\n'+draft.body;
  try{await navigator.clipboard.writeText(text);setCopyState('copied')}catch{setCopyState('manual')}
 };
 const submit=async(event:FormEvent<HTMLFormElement>)=>{
 event.preventDefault();if(sending)return;const form=event.currentTarget;
 const id=requestId||crypto.randomUUID();setRequestId(id);setSending(true);setFailure(false);
 try{const response=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,id,purpose:demo?'Demo request':current.label,solution,careSetting:setting,locale,website:(new FormData(form).get('website')||'')})});const result=await response.json() as {id?:string};if(!response.ok||!result.id)throw new Error('submission');setReceipt(result.id)}catch{setFailure(true)}finally{setSending(false)}
 };
 return <div className="contact-v3"><div className="container contact-intro"><Breadcrumb section="contact"/><div className="page-intro"><span className="eyebrow">YIWEI MEDICAL / GLOBAL</span><h1>{demo?'Request a demo.':'Contact.'}</h1><p>{brandMessaging.contactIntro}</p></div></div><section className="contact-inquiries container" aria-label="Contact YIWEI MEDICAL"><Tabs value={purpose} onValueChange={v=>{setPurpose(v);setDemo(false);setPrepared(false);setCopyState('idle')}}><TabsList className="contact-tabs" aria-label="Inquiry type">{inquiryTypes.map(i=><TabsTrigger key={i.id} value={i.id}>{i.label}</TabsTrigger>)}</TabsList>{inquiryTypes.map(i=><TabsContent key={i.id} value={i.id}><div className="contact-v3-layout"><div className="contact-v3-copy"><span className="eyebrow">LET’S TALK</span><h2>{demo&&i.id==='products'?'Request a demo':i.label}</h2><p>{i.description}</p><div className="contact-email-card"><span>Prefer email?</span><a href={'mailto:'+contactEmail}><Mail size={19}/><span>{contactEmail}</span></a><div className="contact-office"><h3>Shenzhen Office</h3><address>Room 701-2, Block B, Shenzhen International Innovation Center, No. 1006 Shennan Boulevard, Futian District, Shenzhen, Guangdong, China</address></div></div><p className="contact-global-line">Based in Shenzhen. Connected to global care.</p></div><form className="contact-enquiry-form" onSubmit={submit}><div className="contact-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><p className="contact-required">* Required fields</p><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-name'}>Name <span>*</span></label><input id={i.id+'-name'} name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={e=>update('name',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-email'}>Email <span>*</span></label><input id={i.id+'-email'} name="email" type="email" inputMode="email" spellCheck={false} autoComplete="email" required maxLength={160} value={fields.email} onChange={e=>update('email',e.target.value)}/></div></div><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-organization'}>Organization</label><input id={i.id+'-organization'} name="organization" autoComplete="organization" maxLength={160} value={fields.organization} onChange={e=>update('organization',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-role'}>Title / role</label><input id={i.id+'-role'} name="role" autoComplete="organization-title" maxLength={100} value={fields.role} onChange={e=>update('role',e.target.value)}/></div></div><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-country'}>Country / region</label><input id={i.id+'-country'} name="country" autoComplete="country-name" maxLength={100} value={fields.country} onChange={e=>update('country',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-solution'}>Solution of interest</label><select id={i.id+'-solution'} name="solution" value={solution} onChange={e=>{setSolution(e.target.value);setPrepared(false);setCopyState('idle')}}><option value="Solution overview">Solution overview</option>{products.map(p=><option key={p.slug} value={p.name}>{p.name}</option>)}<option value="Brain Health Report">Brain Health Report</option></select></div></div><div className="contact-field"><label htmlFor={i.id+'-setting'}>Care setting</label><select id={i.id+'-setting'} name="careSetting" value={setting} onChange={e=>{setSetting(e.target.value);setPrepared(false);setCopyState('idle')}}><option value="Not specified">Not specified</option>{careSettings.map(s=><option key={s.slug} value={s.label}>{s.label}</option>)}</select></div><div className="contact-field"><label htmlFor={i.id+'-message'}>Message <span>*</span></label><textarea id={i.id+'-message'} name="message" rows={5} required maxLength={2500} placeholder="Tell us about your care setting and what you would like to discuss." value={fields.message} onChange={e=>update('message',e.target.value)}/></div><div className="contact-form-send"><button type="submit" className="button" disabled={sending||!!receipt}><Mail size={18} aria-hidden="true"/>{sending?'Submitting…':'Submit enquiry'}</button><button type="button" className="button outline" onClick={event=>{const form=event.currentTarget.form;if(form)void copyInquiry(form)}}>Copy enquiry</button><p>Submit directly on this website. No email app is needed.</p></div><p className="contact-delivery-note">Your contact details are stored so our team can respond. Do not include patient records or other sensitive medical information.</p>{receipt&&<div className="inquiry-result" role="status"><h3>Enquiry saved.</h3><p>Your enquiry is stored in our inquiry inbox. This confirmation does not mean an email was sent.</p><p><span>Reference:</span> <strong>{receipt}</strong></p><button type="button" className="button outline" onClick={()=>{setReceipt('');setRequestId('');setFields(emptyFields);setFailure(false);setCopyState('idle')}}>Start another enquiry</button></div>}{failure&&<div className="inquiry-result" role="alert"><p>Submission failed. Please retry or copy your enquiry and email our team.</p></div>}{copyState!=='idle'&&<div className="contact-copy-result"><p role="status">{copyState==='copied'?'Enquiry copied. Paste it into your email and send it to our team.':'Select and copy the enquiry below, then send it by email.'}</p><label htmlFor={i.id+'-draft'}>Your enquiry</label><textarea id={i.id+'-draft'} readOnly rows={8} value={draft.subject+'\n\n'+draft.body}/></div>}{prepared&&<div className="contact-draft-status" role="status"><p>Email draft prepared. Send it from your email app to complete your enquiry.</p><a href={draft.href} className="text-link">Open email draft again</a></div>}</form></div></TabsContent>)}</Tabs></section></div>
}
