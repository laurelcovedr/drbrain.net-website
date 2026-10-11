'use client';
import Link from '@/components/site-link';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {getMediaImage} from '@/lib/yiwei-media';
import {ProductImage} from '@/components/product-image';

const views=[
 {id:'mri',label:'MRI',image:'drbrain-mri-views',title:'Brain structure, in view.',caption:'Dr.Brain™ · Multiplanar MRI visualization',href:'/technology/imaging-ai'},
 {id:'perfusion',label:'Perfusion',image:'realnow-perfusion',title:'Blood flow, quantified.',caption:'RealNow™ · Original perfusion analysis interface',href:'/products/realnow'},
 {id:'vascular',label:'Vascular',image:'realnow-vessels',title:'A closer view of vessels.',caption:'RealNow™ · Original vascular imaging interface',href:'/products/realnow'},
];

export function NeuroImagingViewer(){
 return <div className="neuro-viewer"><div className="neuro-viewer-heading"><span>IMAGING INTELLIGENCE</span><span>MRI / CT</span></div>
  <Tabs defaultValue="mri"><TabsList className="neuro-view-tabs" aria-label="Explore brain imaging views">{views.map(v=><TabsTrigger value={v.id} key={v.id}>{v.label}</TabsTrigger>)}</TabsList>
   {views.map(v=>{const image=getMediaImage(v.image);return <TabsContent value={v.id} key={v.id} className="neuro-view-content"><figure><ProductImage image={image} priority={v.id==='mri'}/><figcaption><span>{v.caption}</span><h2>{v.title}</h2><Link href={v.href}>Explore imaging AI</Link></figcaption></figure></TabsContent>})}
  </Tabs><div className="neuro-viewer-footnote">Original YIWEI product imagery</div>
 </div>
}
