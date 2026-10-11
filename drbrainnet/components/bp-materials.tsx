'use client';
import {useState} from 'react';
import Link from '@/components/site-link';
import {Expand,FileText} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {ProductImage} from '@/components/product-image';
import {getMediaImage} from '@/lib/yiwei-media';
import {articles,type Article} from '@/lib/yiwei-data';

const stages=[
 {id:'screen',label:'01 Screen',product:'QuickMind',title:'A clearer cognitive profile.',text:'Structured VR tasks capture gaze and task responses to guide referral and training priorities.',setting:'Community / primary care',image:'bp-quickmind-device',link:'/technology/eye-tracking',action:'Explore eye tracking'},
 {id:'diagnose',label:'02 Diagnose',product:'Dr.Brain™ imaging',title:'Quantitative evidence for clinical review.',text:'Regional MRI measurements and English Brain Doctor reports support clinician-led assessment.',setting:'Hospitals / imaging centers',image:'bp-structural-mri',link:'/reports/brain-health',action:'Explore the English report'},
 {id:'rehabilitate',label:'03 Rehabilitate',product:'QuickMind rehabilitation',title:'Practice shaped around the individual.',text:'Cognitive and motor tasks adapt to the care plan, with session records for reassessment and supported home practice.',setting:'Rehabilitation / supported home care',image:'bp-clinic-practice',link:'/technology/digital-rehabilitation',action:'Explore digital rehabilitation'},
];

export function DementiaCareJourney(){return <div className="dementia-journey"><Tabs defaultValue="screen"><TabsList className="care-stage-tabs" aria-label="Explore the dementia care pathway">{stages.map(s=><TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>)}</TabsList>{stages.map(s=><TabsContent key={s.id} value={s.id}><div className="care-stage-panel"><figure className={s.id==='diagnose'?'imaging-frame':''}><ProductImage image={getMediaImage(s.image)}/><figcaption>{getMediaImage(s.image).title} · Original YIWEI material</figcaption></figure><div className="care-stage-copy"><span className="eyebrow">{s.product}</span><h3>{s.title}</h3><p>{s.text}</p><span className="care-stage-setting">{s.setting}</span><Link href={s.link} className="text-link">{s.action}</Link></div></div></TabsContent>)}</Tabs><p className="care-pathway-note">Reassessment informs the next care plan. Screening and imaging support clinical evaluation; availability varies by product and market.</p></div>}

export function ImagingResearchSpotlight({onOpen}:{onOpen:(a:Article)=>void}){
 const [expanded,setExpanded]=useState(false);const image=getMediaImage('bp-mri-pet-research');const study=articles.find(a=>a.id==='mri-pet-synthesis')!;
 return <section className="imaging-research-spotlight"><div className="research-image"><button onClick={()=>setExpanded(true)} aria-label="Enlarge MRI and amyloid PET research figure"><ProductImage image={{...image,viewport:{x:0,y:0,width:1,height:.505}}}/><span className="media-enlarge"><Expand size={18}/></span></button><span>MRI / acquired PET / synthetic PET</span></div><div className="research-spotlight-copy"><span className="eyebrow">GENERATIVE AI / PUBLISHED RESEARCH</span><h2>A new perspective on MRI.</h2><p>Deep learning explores synthetic amyloid-PET estimates from structural MRI.</p><div className="research-study-meta"><strong>1,009</strong><span>participants with paired imaging<br/>European Radiology · 2026</span></div><button className="text-link" onClick={()=>onOpen(study)}>Explore the published study <FileText size={17}/></button><p className="research-scope">Research-stage estimates. This study does not establish an approved Dr.Brain™ module or replace confirmatory amyloid testing.</p></div><Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="media-dialog bp-research-dialog"><DialogHeader><DialogTitle>MRI-to-PET research</DialogTitle><DialogDescription>{image.caption}</DialogDescription></DialogHeader><ProductImage image={image}/><button className="text-link" onClick={()=>{setExpanded(false);onOpen(study)}}>Open the study summary <FileText size={17}/></button></DialogContent></Dialog></section>
}
