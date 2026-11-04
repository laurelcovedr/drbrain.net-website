/** @jsxImportSource @/lib/localized-jsx */
'use client';
import Link from '@/components/site-link';
import {FileText,ExternalLink} from 'lucide-react';
import {articles,type Article} from '@/lib/yiwei-data';

const featured=[
 {id:'veca',topic:'VR eye tracking for dementia screening',design:'Screening study',metric:'201',metricLabel:'participants',scope:'Single-location study. Screening supports further clinical evaluation.'},
 {id:'perfusion',topic:'RealNow™ perfusion imaging and patient triage',design:'Retrospective comparison',metric:'594',metricLabel:'stroke cases',scope:'Software agreement study. Clinical-outcome benefit was not established.'},
 {id:'mri-pet-synthesis',topic:'Deep learning for MRI-to-PET synthesis',design:'Multicenter imaging research',metric:'1,009',metricLabel:'paired-imaging participants',scope:'Research-stage estimates. Synthetic PET does not replace confirmatory testing.'},
];

export function HomeEvidence({onOpen}:{onOpen:(a:Article)=>void}){return <section className="home-publications" aria-labelledby="home-evidence-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">CLINICAL EVIDENCE</span><h2 id="home-evidence-title">Published clinical research.</h2></div><Link href="/evidence" className="text-link">Explore all clinical evidence</Link></div><div className="publication-grid">{featured.map(f=>{const a=articles.find(a=>a.id===f.id)!;return <article className={'publication-card publication-'+f.id} key={f.id}><div className="publication-topline"><span>{f.design}</span><span>{a.year}</span></div><div className="publication-journal">{f.id==='veca'?<><strong>npj</strong><span>Digital Medicine</span></>:<strong>{a.journal}</strong>}</div><span className="publication-product">{f.id==='perfusion'?'RealNow™ / Stroke imaging':f.id==='veca'?'QuickMind VR / Cognitive Screening':'QuickMind MRI / Emerging Research'}</span><h3><button onClick={()=>onOpen(a)} aria-label={'Study summary: '+a.title}>{f.topic}</button></h3><div className="publication-metric"><strong>{f.metric}</strong><span>{f.metricLabel}</span></div><p className="publication-scope">{f.scope}</p><div className="publication-actions"><button onClick={()=>onOpen(a)} className="text-link">Study summary <FileText size={16}/></button><a href={a.url} target="_blank" rel="noreferrer" aria-label={'Published article in '+a.journal}>Read article <ExternalLink size={16}/></a></div></article>})}</div></div></section>}
