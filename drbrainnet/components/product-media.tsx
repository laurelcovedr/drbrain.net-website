/** @jsxImportSource @/lib/localized-jsx */
'use client';
import {useState} from 'react';
import Link from '@/components/site-link';
import {Expand,ExternalLink,Play} from 'lucide-react';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {ProductImage} from '@/components/product-image';
import {getMediaImage,productMedia,technologyMedia,quickmindVideo,type MediaImage} from '@/lib/yiwei-media';

export function MediaGallery({ids,title='Inside the system.',description}:{ids:string[];title?:string;description?:string}){
 const [selected,setSelected]=useState<MediaImage|null>(null);
 const images=ids.map(getMediaImage);
 return <section className="media-gallery" aria-label={title}><div className="section-heading"><div><span className="eyebrow">PRODUCT EXPERIENCE</span><h2>{title}</h2></div>{description&&<p>{description}</p>}</div><div className={'media-gallery-grid '+(images.length===1?'single-image':images.length===2?'two-images':'')}>{images.map(m=><figure key={m.id}><button className={'media-image-button '+((m.id.startsWith('realnow-')||m.id==='drbrain-mri-views'||m.id==='bp-ct-analysis'||m.id==='bp-perfusion-analysis')?'imaging-frame':'')} onClick={()=>setSelected(m)} aria-label={'Enlarge '+m.title}><ProductImage image={m}/><span className="media-enlarge"><Expand size={17}/></span></button><figcaption><h3>{m.title}</h3></figcaption></figure>)}</div><Dialog open={!!selected} onOpenChange={open=>!open&&setSelected(null)}><DialogContent className="media-dialog">{selected&&<><DialogHeader><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.caption}</DialogDescription></DialogHeader><ProductImage image={selected}/>{!selected.illustrative&&<a href={selected.source} target="_blank" rel="noreferrer" className="text-link">{selected.id.startsWith('bp-')?'Explore related material':'Original website image'} <ExternalLink size={15}/></a>}</>}</DialogContent></Dialog></section>
}
export function ProductMedia({slug}:{slug:string}){return <MediaGallery ids={productMedia[slug]} description={slug==='realnow'?'CT, vessel and perfusion interfaces.':slug==='dr-brain'?'Assessment, practice and progress review.':slug==='autismshield'?'VR and tablet practice, adapted to the child’s developmental goals.':'Original VR platform examples.'}/>}
export function TechnologyMedia({slug}:{slug:string}){return <MediaGallery ids={technologyMedia[slug]} title="See the technology in use." description={slug!=='imaging-ai'?'Product configurations and training scenes from supplied brochures. Availability and supported functions depend on the selected device and market.':undefined}/>}

export function DemonstrationVideo({compact=false}:{compact?:boolean}){return <section className={'demonstration-video '+(compact?'compact':'')} aria-labelledby="demonstration-title"><div className="video-heading"><span className="eyebrow">QUICKMIND / ORIGINAL DEMONSTRATION</span><h2 id="demonstration-title">A closer look at digital care.</h2><p>See assessment, practice and reporting in action.</p><Link href="/products/dr-brain" className="text-link">Explore Dr.Brain™</Link></div><div className="video-player-wrap"><video controls preload="none" playsInline poster={quickmindVideo.poster} aria-label="QuickMind product demonstration"><source src={quickmindVideo.src} type="video/mp4"/><a href={quickmindVideo.source}>Open the original QuickMind video</a></video><div className="video-caption"><span><Play size={14}/> Original QuickMind presentation</span><a href={quickmindVideo.source} target="_blank" rel="noreferrer">Watch original <ExternalLink size={14}/></a></div></div></section>}

const brochureSets:Record<string,string[]>={
 'dr-brain':['brochure-quickmind-device-range','brochure-portable-kit','brochure-portable-pro','brochure-clinical-workstation','brochure-home-rehabilitation','brochure-mobile-clinical-unit'],
 'autismshield':['brochure-asd-family','brochure-asd-device','brochure-asd-emotions','brochure-asd-social'],
 'forcus':['brochure-adhd-headset','brochure-adhd-training','brochure-adhd-care','brochure-portable-kit'],
};
export function BrochureProductMedia({slug}:{slug:string}){const ids=brochureSets[slug];if(!ids)return null;return <div className="brochure-product-media"><MediaGallery ids={ids} title="New product brochure visuals" description="Supplied LumiBrain and QuickMind materials. Brochure brand names are retained; promotional scenes are not clinical case evidence."/></div>}
