/** @jsxImportSource @/lib/localized-jsx */
'use client';
import {useState,type FormEvent} from 'react';
import {Mail} from 'lucide-react';
import {brandMessaging} from '@/lib/yiwei-brand';
import {Breadcrumb} from '@/components/site-navigation';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {products} from '@/lib/yiwei-data';
import {contactEmail,prepareInquiryEmail,type InquiryFields} from '@/lib/contact-email';

const inquiryTypes=[
 {id:'products',label:'Product inquiries',description:'Explore our solutions for your clinic, hospital or brain-health programme.'},
 {id:'partnerships',label:'Partnerships',description:'Connect with us about distribution and local deployment in your market.'},
 {id:'research',label:'Research collaboration',description:'Discuss clinical research, evaluation and collaboration with our team.'},
];
const emptyFields:InquiryFields={name:'',email:'',organization:'',role:'',country:'',message:''};

export function ContactPage(){
 const [purpose,setPurpose]=useState('products');
 const [solution,setSolution]=useState('Solution overview');
 const [fields,setFields]=useState<InquiryFields>(emptyFields);
 const [prepared,setPrepared]=useState(false);
 const update=(key:keyof InquiryFields,value:string)=>{setFields(f=>({...f,[key]:value}));setPrepared(false)};
 const current=inquiryTypes.find(i=>i.id===purpose)!;
 const draft=prepareInquiryEmail(current.label,solution,fields);
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setPrepared(true);window.location.href=draft.href};
 return <div className="contact-v3"><div className="container contact-intro"><Breadcrumb section="contact"/><div className="page-intro"><span className="eyebrow">YIWEI MEDICAL / GLOBAL</span><h1>Contact.</h1><p>{brandMessaging.contactIntro}</p></div></div><section className="contact-inquiries container" aria-label="Contact YIWEI MEDICAL"><Tabs value={purpose} onValueChange={v=>{setPurpose(v);setPrepared(false)}}><TabsList className="contact-tabs" aria-label="Inquiry type">{inquiryTypes.map(i=><TabsTrigger key={i.id} value={i.id}>{i.label}</TabsTrigger>)}</TabsList>{inquiryTypes.map(i=><TabsContent key={i.id} value={i.id}><div className="contact-v3-layout"><div className="contact-v3-copy"><span className="eyebrow">LET’S TALK</span><h2>{i.label}</h2><p>{i.description}</p><div className="contact-email-card"><span>Prefer email?</span><a href={'mailto:'+contactEmail}><Mail size={19}/><span>{contactEmail}</span></a><div className="contact-office"><h3>Shenzhen Office</h3><address>Room 701-2, Block B, Shenzhen International Innovation Center, No. 1006 Shennan Boulevard, Futian District, Shenzhen, Guangdong, China</address></div></div><p className="contact-global-line">Based in Shenzhen. Connected to global care.</p></div><form className="contact-enquiry-form" onSubmit={submit}><p className="contact-required">* Required fields</p><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-name'}>Name <span>*</span></label><input id={i.id+'-name'} name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={e=>update('name',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-email'}>Email <span>*</span></label><input id={i.id+'-email'} name="email" type="email" autoComplete="email" required maxLength={160} value={fields.email} onChange={e=>update('email',e.target.value)}/></div></div><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-organization'}>Organization</label><input id={i.id+'-organization'} name="organization" autoComplete="organization" maxLength={160} value={fields.organization} onChange={e=>update('organization',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-role'}>Title / role</label><input id={i.id+'-role'} name="role" autoComplete="organization-title" maxLength={100} value={fields.role} onChange={e=>update('role',e.target.value)}/></div></div><div className="contact-field-pair"><div className="contact-field"><label htmlFor={i.id+'-country'}>Country / region</label><input id={i.id+'-country'} name="country" autoComplete="country-name" maxLength={100} value={fields.country} onChange={e=>update('country',e.target.value)}/></div><div className="contact-field"><label htmlFor={i.id+'-solution'}>Solution of interest</label><Select value={solution} onValueChange={v=>{setSolution(v);setPrepared(false)}}><SelectTrigger id={i.id+'-solution'} aria-label="Solution of interest"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Solution overview">Solution overview</SelectItem>{products.map(p=><SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}<SelectItem value="Brain Health Report">Brain Health Report</SelectItem></SelectContent></Select></div></div><div className="contact-field"><label htmlFor={i.id+'-message'}>Message <span>*</span></label><textarea id={i.id+'-message'} name="message" rows={5} required maxLength={2500} placeholder="Tell us about your care setting and what you would like to discuss." value={fields.message} onChange={e=>update('message',e.target.value)}/></div><div className="contact-form-send"><button type="submit" className="button"><Mail size={18}/>Email enquiry</button><p>Opens your email app with your message ready to send.</p></div>{prepared&&<div className="contact-draft-status" role="status"><p>Email draft prepared. Send it from your email app to complete your enquiry.</p><a href={draft.href} className="text-link">Open email draft again</a></div>}</form></div></TabsContent>)}</Tabs></section></div>
}
