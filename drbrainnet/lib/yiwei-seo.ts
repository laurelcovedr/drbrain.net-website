import type {Metadata} from 'next';
import {productQuestions} from './yiwei-faq';
import {brandMessaging} from './yiwei-brand';
import {products,articles,productAliases} from './yiwei-data';
import {careSettings} from './yiwei-care-settings';
import {technologies} from './yiwei-technology';
import {navigation} from './yiwei-navigation';
import {getMediaImage,productCover,companyLogo} from './yiwei-media';

// This is the current Site origin. Change it only with an approved domain migration.
export const siteOrigin='https://yiwei-medical-global.lawrence-wan-0405.chatgpt.site';
// Private review remains excluded from search. Public launch needs separate approval.
export const privateRobots:Metadata['robots']={index:false,follow:false};
export type SeoPage={path:string;label:string;title:string;description:string;image?:string;legacy?:boolean};
const page=(path:string,label:string,title:string,description:string,image?:string,legacy?:boolean):SeoPage=>({path,label,title,description,image,legacy});
const productTopics:Record<string,string>={'dr-brain':'Dementia Care','realnow':'Stroke Imaging AI','autismshield':'Autism Support','forcus':'ADHD Support'};
const productDescriptions:Record<string,string>={
 'dr-brain':'Explore Dr.Brain™ dementia care: cognitive screening, quantitative MRI analysis, and guided rehabilitation, with component-specific clinical evidence.',
 'realnow':'Explore RealNow™ AI-assisted stroke imaging: CT, vascular, and perfusion analysis for clinical review. View studies and module-specific registrations.',
 'autismshield':'Explore AutismShield™ VR and tablet activities for social attention and developmental skills, with care settings, research context, and market records.',
 'forcus':'Explore ForcusGenius™ guided VR and tablet practice for attention and executive function, with session review, research context, and market records.',
};
export const seoPages:SeoPage[]=[
 page('/','Home','YIWEI MEDICAL | Brain Health AI & Cognitive Care',brandMessaging.metadataDescription),
 page('/products','Products','Brain Health Solutions | YIWEI MEDICAL','Explore Dr.Brain™, RealNow™, AutismShield™, and ForcusGenius™ for dementia care, stroke imaging, autism support, and ADHD support.'),
 ...products.map(p=>page('/products/'+p.slug,p.name,p.name+' '+productTopics[p.slug]+' | YIWEI MEDICAL',productDescriptions[p.slug],getMediaImage(productCover[p.slug]).src)),
 page('/technology','Technology','Brain Imaging & Cognitive Technologies | YIWEI MEDICAL','Explore YIWEI MEDICAL’s quantitative imaging AI, eye-tracking assessment, and VR and tablet cognitive training technologies for brain health.'),
 ...technologies.map(t=>page('/technology/'+t.slug,t.label,({'imaging-ai':'AI Brain Imaging Analysis','eye-tracking':'Eye-Tracking Cognitive Assessment','digital-rehabilitation':'VR & Tablet Cognitive Training'}[t.slug]??t.label)+' | YIWEI MEDICAL',t.summary+' Explore workflows, relevant solutions, and the scope of supporting research.')),
 page('/evidence','Clinical evidence','Brain Health Clinical Evidence | YIWEI MEDICAL','Browse published studies and supplied research for YIWEI MEDICAL solutions. Review original sources, product connections, findings, and evidence scope.'),
 ...products.map(p=>page('/evidence/'+p.slug,p.name,p.name+' Clinical Evidence | YIWEI MEDICAL','Review published studies and research context relevant to '+p.name+' '+productTopics[p.slug].toLowerCase()+'. Explore original articles, source PDFs, and evidence scope.')),
 page('/care-settings','Care Settings','Brain Health Care Settings | YIWEI MEDICAL','Explore brain health technologies in neurology, rehabilitation, radiology, and longevity clinics, with product workflows and the English Brain Health Report.'),
 ...careSettings.map(c=>page('/care-settings/'+c.slug,c.label,c.label+' | YIWEI MEDICAL',c.summary+' Explore relevant solutions and evidence.')),
 page('/reports','Reports','English Brain Health Reports | YIWEI MEDICAL','Explore the English AI Brain Health & Longevity Report: brain aging, regional MRI findings, and structured information for clinician-led consultations.'),
 page('/reports/brain-health','Brain Health Report','AI Brain Health & Longevity Report | YIWEI MEDICAL','Preview the 18-page English Brain Health Report for longevity and brain health clinics, with regional MRI findings and source notes for clinical review.','/media/brain-health-report/thumbnail-01.webp'),
 page('/reports/brain-doctor','Brain Doctor','Interactive Brain Doctor Report | YIWEI MEDICAL','Explore the legacy interactive Brain Doctor sample report, with MRI-derived measurements, reporting modules, and source checks for clinician review.',undefined,true),
 page('/about','About us','About YIWEI MEDICAL | Neuroscience & Brain Health AI','Meet YIWEI MEDICAL: a brain health technology company connecting neuroscience, AI imaging, cognitive assessment, and digital cognitive training.','/media/bp/digital-brain-profile.png'),
 page('/about/company','Company profile','YIWEI MEDICAL Team & Company Profile','Meet YIWEI MEDICAL’s leadership and advisors, and explore the company’s mission, brain health technologies, principles, and international field use.'),
 page('/about/global-in-practice','Global in practice','Global Brain Health Field Use | YIWEI MEDICAL','Explore company-supplied photos of brain health assessment, VR demonstrations, and guided practice across nine international markets and regions.'),
 page('/about/global-registrations','Global registrations','Global Medical Device Registrations | YIWEI MEDICAL','Review YIWEI MEDICAL’s product-specific market documents, regulatory scope, and registration workstreams, including Malaysia, Singapore, and Indonesia.'),
 page('/contact','Contact','Contact YIWEI MEDICAL | Brain Health Collaboration','Contact YIWEI MEDICAL in Shenzhen about brain health solutions, research collaboration, and international distribution. Prepare an email enquiry online.'),
];
export const absoluteUrl=(path:string)=>new URL(path,siteOrigin).href;
export function canonicalPath(section:string,slug?:string){
 if(section==='home')return '/';
 const normalized=slug&&['products','evidence'].includes(section)?productAliases[slug]??slug:slug;
 return '/'+section+(normalized?'/'+normalized:'');
}
export const seoPageFor=(section:string,slug?:string)=>seoPages.find(p=>p.path===canonicalPath(section,slug));
export function metadataFor(section:string,slug?:string):Metadata{
 const p=seoPageFor(section,slug);
 if(!p)return {title:'Page Not Found | YIWEI MEDICAL',description:'This YIWEI MEDICAL page could not be found.',robots:privateRobots,alternates:{canonical:null},openGraph:null,twitter:null};
 const image=absoluteUrl(p.image??'/media/drbrain-neural-banner.webp');
 return {metadataBase:new URL(siteOrigin),title:p.title,description:p.description,robots:privateRobots,alternates:{canonical:absoluteUrl(p.path)},openGraph:{type:'website',locale:'en_US',siteName:'YIWEI MEDICAL',title:p.title,description:p.description,url:absoluteUrl(p.path),images:[{url:image,alt:p.label+' — YIWEI MEDICAL'}]},twitter:{card:'summary_large_image',title:p.title,description:p.description,images:[image]}};
}
export function structuredDataFor(section:string,slug?:string){
 const p=seoPageFor(section,slug);if(!p)return null;
 const url=absoluteUrl(p.path);
 const organization={'@type':'Organization','@id':siteOrigin+'/#organization',name:'YIWEI MEDICAL',url:siteOrigin+'/',logo:absoluteUrl(companyLogo.src),description:brandMessaging.companyIntro,sameAs:['https://www.drbrain.net/','https://quickmindstore.com/'],email:'service@quickmindstore.com',address:{'@type':'PostalAddress',streetAddress:'Room 701-2, Block B, Shenzhen International Innovation Center, No. 1006 Shennan Boulevard',addressLocality:'Futian District, Shenzhen',addressRegion:'Guangdong',addressCountry:'CN'}};
 const website={'@type':'WebSite','@id':siteOrigin+'/#website',name:'YIWEI MEDICAL',url:siteOrigin+'/',inLanguage:'en',publisher:{'@id':organization['@id']}};
 const graph:Record<string,unknown>[]=[organization,website,{'@type':section==='about'?'AboutPage':section==='contact'?'ContactPage':'WebPage','@id':url+'#webpage',name:p.title,description:p.description,url,inLanguage:'en',breadcrumb:section==='home'?undefined:{'@id':url+'#breadcrumbs'},isPartOf:{'@id':website['@id']},publisher:{'@id':organization['@id']}}];
 const crumbs=[{name:'Home',url:siteOrigin+'/'}];
 if(section!=='home'){
  const overview=seoPageFor(section);
  if(overview)crumbs.push({name:overview.label,url:absoluteUrl(overview.path)});
  if(slug)crumbs.push({name:p.label,url});
  graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:c.url}))});
 }
 if(section==='products'&&slug){
  const product=products.find(x=>x.slug===(productAliases[slug]??slug));
  if(product)graph.push({'@type':'Product','@id':url+'#solution',name:product.name,description:product.description,category:product.subtitle,url,image:absoluteUrl(getMediaImage(productCover[product.slug]).src),brand:{'@type':'Brand',name:'YIWEI MEDICAL'},manufacturer:{'@id':organization['@id']}});
 }
 if(section==='products'&&slug){
  const questions=productQuestions[productAliases[slug]??slug];
  if(questions)graph.push({'@type':'FAQPage','@id':url+'#questions',mainEntity:questions.map(q=>({'@type':'Question',name:q.question,acceptedAnswer:{'@type':'Answer',text:q.answer}}))});
 }
 if(section==='evidence'){
  const list=articles.filter(a=>!slug||a.products.includes(productAliases[slug]??slug));
  graph.push({'@type':'ItemList','@id':url+'#research',name:p.label+' research sources',numberOfItems:list.length,itemListElement:list.map((a,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'ScholarlyArticle','@id':absoluteUrl('/evidence')+'#study-'+a.id,name:a.title,headline:a.title,abstract:a.summary,description:a.limits,creditText:a.authors,inLanguage:'en',url:a.url||absoluteUrl(a.suppliedPdf??p.path),identifier:a.doi?{'@type':'PropertyValue',propertyID:'DOI',value:a.doi}:undefined,citation:a.citation,isPartOf:{'@type':'Periodical',name:a.journal}}}))});
 }
 if(section==='products'&&!slug)graph.push({'@type':'ItemList',name:'YIWEI MEDICAL solutions',itemListElement:products.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,url:absoluteUrl('/products/'+x.slug)}))});
 return {'@context':'https://schema.org','@graph':graph};
}
// Keep the registry aligned with the two-level navigation and report routes.
export const navigationPaths=navigation.flatMap(n=>['/'+n.slug,...n.children.map(c=>'/'+n.slug+'/'+c.slug)]);
