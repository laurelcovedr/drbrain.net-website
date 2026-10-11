'use client';
import Link from '@/components/site-link';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {FileText} from 'lucide-react';
import {Breadcrumb} from '@/components/site-navigation';
import {ProductImage} from '@/components/product-image';
import {BrainHealthPreview} from '@/components/brain-health-preview';
import {getMediaImage,type MediaImage} from '@/lib/yiwei-media';
import {careSettings,type CareSetting} from '@/lib/yiwei-care-settings';
import {fieldCases} from '@/lib/yiwei-field';
import {products,articles,type Article} from '@/lib/yiwei-data';

const settingImage=(s:CareSetting):MediaImage=>s.fieldMarket?fieldCases.find(c=>c.id===s.fieldMarket)!.photos[0]:getMediaImage(s.image);
const productName=(slug:string)=>products.find(p=>p.slug===slug)!.name;

function SettingPanel({setting:s,detail=false}:{setting:CareSetting;detail?:boolean}){return <div className={'setting-panel '+(detail?'setting-panel-detail':'')+(s.slug==='longevity'?' setting-brain-health':'')}>{s.slug==='longevity'?<BrainHealthPreview/>:<figure className={s.slug==='radiology'?'setting-imaging':''}><ProductImage image={settingImage(s)}/><figcaption>{s.imageCaption}</figcaption></figure>}<div className="setting-copy"><span className="eyebrow">{s.label}</span><h3>{s.focus}</h3><p>{s.summary}</p><div className="setting-use-list">{s.uses.map(u=><div key={u.product??u.href}><Link href={u.href??'/products/'+u.product}>{u.label??productName(u.product!)}</Link><p>{u.text}</p></div>)}</div>{s.slug==='longevity'&&<Link href="/reports/brain-health" className="button setting-report-button">Explore Brain Health Report</Link>}{!detail&&<Link href={'/care-settings/'+s.slug} className="text-link">Explore this care setting</Link>}</div></div>}

export function CareSettingsExplorer({home=false}:{home?:boolean}){return <section className={'care-settings-explorer '+(home?'home-care-settings':'')} aria-labelledby={home?'home-settings-title':'settings-explorer-title'}><div className="section-heading"><div><span className="eyebrow">CARE SETTINGS</span><h2 id={home?'home-settings-title':'settings-explorer-title'}>Built around clinical practice.</h2></div>{home&&<Link href="/care-settings" className="text-link">All care settings</Link>}</div><Tabs defaultValue="neurology"><TabsList className="care-setting-tabs" aria-label="Explore product use by care setting">{careSettings.map(s=><TabsTrigger key={s.slug} value={s.slug}>{s.label}</TabsTrigger>)}</TabsList>{careSettings.map(s=><TabsContent key={s.slug} value={s.slug}><SettingPanel setting={s}/></TabsContent>)}</Tabs><p className="care-settings-note">Applications follow clinician review and local product availability. Photos and imaging show product-use examples.</p></section>}

export function CareSettingsPage({slug,onOpen}:{slug?:string;onOpen:(a:Article)=>void}){
 const s=careSettings.find(s=>s.slug===slug);
 return <div className="container section care-settings-page"><Breadcrumb section="care-settings" detail={s?.label}/><div className="page-intro"><span className="eyebrow">YIWEI MEDICAL / CLINICAL APPLICATIONS</span><h1>{s?s.label+'.':'Care settings.'}</h1><p>{s?s.summary:'Explore product applications in neurology, rehabilitation, radiology and longevity care.'}</p></div>{s?<><SettingPanel setting={s} detail/><section className="setting-detail-section"><div className="section-heading"><div><span className="eyebrow">IN PRACTICE</span><h2>The product-use workflow.</h2></div></div><ol className="setting-workflow">{s.workflow.map((step,i)=><li key={step}><span>0{i+1}</span><p>{step}</p></li>)}</ol><p className="setting-scope">{s.scope}</p></section><section className="setting-detail-section"><div className="section-heading"><div><span className="eyebrow">SUPPORTING RESEARCH</span><h2>Evidence in context.</h2></div></div><div className="setting-evidence">{s.evidence.map(id=>articles.find(a=>a.id===id)!).map(a=><button key={a.id} onClick={()=>onOpen(a)}><span>{a.journal} · {a.year}</span><h3>{a.title}</h3><span className="setting-study-action">Study summary <FileText size={16}/></span></button>)}</div>{s.resource&&<Link href={s.resource.url} className="text-link setting-resource">{s.resource.label}</Link>}<div className="setting-end-links"><Link href="/care-settings" className="button outline">All care settings</Link><Link href="/contact" className="text-link">Discuss your care setting</Link></div></section></>:<CareSettingsExplorer/>}</div>
}
