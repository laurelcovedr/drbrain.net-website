/** @jsxImportSource @/lib/localized-jsx */
'use client';
import {useState} from 'react';
import Link from '@/components/site-link';
import {ProductImage} from '@/components/product-image';
import {getMediaImage} from '@/lib/yiwei-media';
import {demoHref} from '@/lib/contact-context';
const tours:Record<string,{title:string;text:string;image?:string}[]>={
 'dr-brain':[
  {title:'Assess cognition',text:'Explore a portable headset and controller configuration from the supplied product brochure.',image:'brochure-portable-kit'},
  {title:'Review quantitative imaging',text:'Explore regional MRI views. Image quality and individual clinical context require specialist review.',image:'drbrain-mri-views'},
  {title:'Review the output',text:'Open the sample Brain Health Report to review the reporting structure with your clinical team.'},
 ],
 'realnow':[
  {title:'Review CT findings',text:'Explore CT regional overlays from the product presentation. Source images and findings require specialist review.',image:'bp-ct-analysis'},
  {title:'Inspect perfusion outputs',text:'Explore perfusion maps and measurements. Outputs support, rather than replace, clinical decisions.',image:'bp-perfusion-analysis'},
  {title:'Review evidence and scope',text:'Open the product evidence page to review study findings, limitations and module-specific scope before planning an evaluation.'},
 ],
};
export function ProductTour({slug}:{slug:string}){
 const steps=tours[slug];const [active,setActive]=useState(0);if(!steps)return null;const step=steps[active];
 return <section className="product-tour product-chapter" id="product-tour" aria-labelledby="product-tour-title"><div className="chapter-heading"><h2 id="product-tour-title">Product quick tour</h2><p>Explore original product views. This guided overview does not run an assessment or analyze patient data.</p></div><div className="product-tour-layout"><nav aria-label="Product tour steps">{steps.map((s,i)=><button type="button" key={s.title} aria-pressed={i===active} onClick={()=>setActive(i)}>{s.title}</button>)}</nav><div className="product-tour-panel" aria-live="polite">{step.image?<ProductImage image={getMediaImage(step.image)}/>:<Link href={slug==='dr-brain'?'/reports/brain-health':'/evidence/'+slug} className="button outline">{slug==='dr-brain'?'Explore Brain Health Report':'View clinical evidence'}</Link>}<h3>{step.title}</h3><p>{step.text}</p><div className="actions"><button type="button" className="button outline" disabled={active===0} onClick={()=>setActive(i=>i-1)}>Previous step</button><button type="button" className="button outline" disabled={active===steps.length-1} onClick={()=>setActive(i=>i+1)}>Next step</button></div></div></div><div className="actions"><Link className="button" href={demoHref(slug)}>Request a demo</Link>{slug==='dr-brain'&&<Link className="text-link" href="/reports/brain-health">Explore Brain Health Report</Link>}<Link className="text-link" href={'/evidence/'+slug}>View clinical evidence</Link></div></section>
}
export function DeploymentReadiness({slug}:{slug:string}){return <section className="product-chapter deployment-readiness" id="deployment" aria-labelledby="deployment-title"><div className="chapter-heading"><h2 id="deployment-title">Plan your deployment</h2><p>Use this checklist to scope a demonstration and technical evaluation with our team.</p></div><div className="deployment-grid"><article><h3>Before the demonstration</h3><p>Share your country, care setting, intended users and preferred product modules.</p></article><article><h3>During technical evaluation</h3><p>{slug==='realnow'||slug==='dr-brain'?'Confirm required imaging sequences, image quality, output formats and any PACS or reporting interfaces.':'Confirm the supported headset or tablet, training environment, user supervision and reporting needs.'}</p></article><article><h3>Before rollout</h3><p>Agree on local availability, deployment configuration, data handling, training, support and acceptance criteria.</p></article></div><p>Integration, hosting location, response times and service terms are confirmed for each project. This page does not promise a specific interface or installation time.</p><div className="actions"><Link className="button" href={demoHref(slug)}>Discuss deployment requirements</Link><Link className="text-link" href="/about/global-registrations">Explore global registrations</Link></div></section>}
