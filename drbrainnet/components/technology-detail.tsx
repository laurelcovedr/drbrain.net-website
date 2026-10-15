/** @jsxImportSource @/lib/localized-jsx */
'use client';
import Link from '@/components/site-link';
import {ImagingResearchSpotlight} from '@/components/bp-materials';
import {FileText} from 'lucide-react';
import {Breadcrumb} from '@/components/site-navigation';
import {TechnologyMedia,DemonstrationVideo} from '@/components/product-media';
import {technologies} from '@/lib/yiwei-technology';
import {getMediaImage} from '@/lib/yiwei-media';
import {ProductImage} from '@/components/product-image';
import {products,articles,type Article} from '@/lib/yiwei-data';

export function TechnologyDetail({slug,onOpen}:{slug:string;onOpen:(a:Article)=>void}){
  const technology=technologies.find(t=>t.slug===slug)!;
  const related=products.filter(p=>technology.products.includes(p.slug));
  const visual=getMediaImage(slug==='imaging-ai'?'drbrain-mri-views':slug==='eye-tracking'?'quickmind-screening':'quickmind-home');
  return <div className="container section technology-detail"><Breadcrumb section="technology" detail={technology.label}/>
    <div className="technology-detail-hero"><div className="page-intro"><span className="eyebrow">{technology.kicker}</span><h1>{technology.label}.</h1><p>{technology.summary}</p></div><figure className={"technology-hero-image "+(slug==='imaging-ai'?'imaging-frame':'')}><ProductImage image={visual}/><figcaption>{visual.title} · Original product imagery</figcaption></figure></div>
    <div className="technology-io"><div><span className="eyebrow">INPUT</span><p>{technology.input}</p></div><div><span className="eyebrow">OUTPUT FOR REVIEW</span><p>{technology.output}</p></div></div>
    <section className="technology-detail-section"><span className="eyebrow">CAPABILITIES</span><h2>From measurement to care.</h2><div className="feature-grid">{technology.features.map((f,i)=><article key={f.title}><span className="feature-number">0{i+1}</span><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section>
    <section className="technology-detail-section"><div className="section-heading"><div><span className="eyebrow">CLINICAL WORKFLOW</span><h2>How it fits.</h2></div></div><div className="technology-workflow">{technology.workflow.map((w,i)=><div key={w}><span>0{i+1}</span><p>{w}</p></div>)}</div><div className="report-notice">{technology.note}</div></section>
    <TechnologyMedia slug={slug}/>{slug==='imaging-ai'&&<ImagingResearchSpotlight onOpen={onOpen}/>}{slug==='digital-rehabilitation'&&<DemonstrationVideo compact/>}<section className="technology-detail-section"><span className="eyebrow">RELATED SOLUTIONS</span><h2>Explore the applications.</h2><div className="collection-cards technology-related">{related.map(p=><Link href={'/products/'+p.slug} key={p.slug}><span className="eyebrow">{p.subtitle}</span><h3>{p.name}</h3><p>{p.tag}</p><span className="collection-action">Explore solution</span></Link>)}</div></section>
    <section className="technology-detail-section"><span className="eyebrow">RESEARCH & RESOURCES</span><h2>See the supporting material.</h2>{technology.evidence.length>0?<div className="technology-study-list">{technology.evidence.map(id=>articles.find(a=>a.id===id)).filter((a):a is Article=>!!a).map(a=><button onClick={()=>onOpen(a)} key={a.id}><span>{a.journal} · {a.year}</span><h3>{a.title}</h3><span className="collection-action">Study summary <FileText size={16}/></span></button>)}</div>:<div className="technology-collection-links">{related.map(p=><Link href={'/evidence/'+p.slug} key={p.slug} className="button outline">{p.name} evidence</Link>)}</div>}{technology.resource&&<Link href={technology.resource.url} className="text-link technology-resource">{technology.resource.label}</Link>}<div className="actions technology-end-links"><Link href="/technology" className="button outline">All technologies</Link><Link href="/contact" className="text-link">Discuss a clinical application</Link></div></section>
  </div>
}
