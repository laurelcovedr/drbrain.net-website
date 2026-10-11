import {products} from './yiwei-data';
import {careSettings} from './yiwei-care-settings';

export type NavigationEntry = {slug:string;label:string;description:string};
export type NavigationSection = {slug:string;label:string;overview:string;children:NavigationEntry[]};
export const navigation:NavigationSection[] = [
  {slug:'products',label:'Products',overview:'All solutions',children:products.map(p=>({slug:p.slug,label:p.name,description:p.subtitle}))},
  {slug:'technology',label:'Technology',overview:'Technology overview',children:[
    {slug:'imaging-ai',label:'Imaging AI',description:'Quantitative structure, vascular and perfusion analysis'},
    {slug:'eye-tracking',label:'Eye tracking',description:'Gaze measurement in structured cognitive tasks'},
    {slug:'digital-rehabilitation',label:'Digital rehabilitation',description:'Clinician-guided VR and tablet practice'},
  ]},
  {slug:'evidence',label:'Clinical evidence',overview:'All clinical evidence',children:products.map(p=>({slug:p.slug,label:p.name,description:p.subtitle}))},
  {slug:'care-settings',label:'Care Settings',overview:'All care settings',children:careSettings.map(s=>({slug:s.slug,label:s.label,description:s.focus}))},
  {slug:'about',label:'About us',overview:'About YIWEI',children:[
    {slug:'company',label:'Company profile',description:'Brain science, AI and clinical collaboration'},
    {slug:'global-in-practice',label:'Global in practice',description:'Original field photos across nine markets and regions'},
    {slug:'global-registrations',label:'Global registrations',description:'Registrations and market-specific documentation'},
  ]},
];
export const detailIsValid = (section:string,slug:string) => (section==='reports'&&['brain-doctor','brain-health'].includes(slug))||navigation.some(n=>n.slug===section&&n.children.some(c=>c.slug===slug));
export const sectionLabel = (section:string) => navigation.find(n=>n.slug===section)?.label??(section==='reports'?'Reports':'Contact');
export const detailLabel = (section:string,slug:string) => section==='reports'&&['brain-doctor','brain-health'].includes(slug)?(slug==='brain-health'?'Brain Health Report':'Brain Doctor'):navigation.find(n=>n.slug===section)?.children.find(c=>c.slug===slug)?.label;
