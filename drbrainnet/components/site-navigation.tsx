/** @jsxImportSource @/lib/localized-jsx */
'use client';
import {useEffect,useRef} from 'react';
import Link from '@/components/site-link';
import {LanguageSwitcher} from '@/components/locale-provider';
import {brandMessaging} from '@/lib/yiwei-brand';
import {Globe2,Menu,X,ShieldCheck,ChevronDown} from 'lucide-react';
import {companyLogo} from '@/lib/yiwei-media';
import {Breadcrumb as BreadcrumbRoot,BreadcrumbList,BreadcrumbItem,BreadcrumbLink,BreadcrumbPage,BreadcrumbSeparator} from '@/components/ui/breadcrumb';
import {navigation,sectionLabel} from '@/lib/yiwei-navigation';

export function Brand(){return <Link href="/" className="brand" aria-label="YIWEI MEDICAL home"><svg className="official-brand-symbol" viewBox="0 0 47 68" preserveAspectRatio="xMidYMid meet" role="img" aria-label="YIWEI MEDICAL brand symbol"><image href={companyLogo.src} width={companyLogo.width} height={companyLogo.height}/></svg><span className="brand-english">YIWEI <b>MEDICAL</b></span></Link>}

export function Header({section,detail}:{section:string;detail?:string}){
  const header=useRef<HTMLElement>(null);
  useEffect(()=>{
    const closeAll=(event:Event)=>{
      const root=header.current;if(!root)return;
      if(event.type==='keydown'&&(event as KeyboardEvent).key!=='Escape')return;
      if(event.type==='click'&&root.contains(event.target as Node))return;
      root.querySelectorAll<HTMLDetailsElement>('details[open]').forEach(el=>{el.open=false;if(event.type==='keydown')el.querySelector<HTMLElement>('summary')?.focus()});
    };
    document.addEventListener('click',closeAll);document.addEventListener('keydown',closeAll);
    return ()=>{document.removeEventListener('click',closeAll);document.removeEventListener('keydown',closeAll)};
  },[]);
  return <header className="site-header" ref={header}><div className="header-inner"><Brand/>
    <nav className="native-desktop-navigation" aria-label="Main navigation">{navigation.map(n=><div className="native-nav-item" key={n.slug}>
      <Link href={'/'+n.slug} className={'native-primary-link '+(section===n.slug?'active':'')} aria-current={section===n.slug&&!detail?'page':undefined}>{n.label}</Link>
      <details className="native-nav-disclosure" name="desktop-submenu"><summary aria-label={'Show '+n.label+' pages'}><ChevronDown size={15}/></summary><div className="native-submenu"><span className="eyebrow">{n.label}</span><Link href={'/'+n.slug} className="nav-overview">{n.overview}</Link>{n.children.map(c=><Link href={'/'+n.slug+'/'+c.slug} key={c.slug} aria-current={section===n.slug&&detail===c.slug?'page':undefined}><b>{c.label}</b><span>{c.description}</span></Link>)}</div></details>
    </div>)}</nav>
    <LanguageSwitcher section={section} detail={detail}/><Link href="/contact?intent=demo" className={'header-contact '+(section==='contact'?'active':'')} aria-current={section==='contact'?'page':undefined}>Request a demo</Link>
    <details className="native-mobile-navigation"><summary className="menu-toggle" aria-label="Toggle navigation"><Menu className="menu-open-icon"/><X className="menu-close-icon"/></summary><nav className="native-mobile-panel" aria-label="Mobile navigation"><Link href="/" className="mobile-home">Home</Link>{navigation.map(n=><div className="native-mobile-group" key={n.slug}><Link href={'/'+n.slug} className={'mobile-primary-link '+(section===n.slug?'active':'')}>{n.label}</Link><div>{n.children.map(c=><Link href={'/'+n.slug+'/'+c.slug} key={c.slug} aria-current={section===n.slug&&detail===c.slug?'page':undefined}><b>{c.label}</b><span>{c.description}</span></Link>)}</div></div>)}<Link href="/contact?intent=demo" className="mobile-home">Request a demo</Link></nav></details>
  </div></header>
}

export function SectionNavigation({section,detail}:{section:string;detail?:string}){
  const n=navigation.find(n=>n.slug===section);if(!n)return null;
  return <div className="section-navigation"><div className="container section-navigation-inner"><span>{n.label}</span><nav aria-label={n.label+' pages'}><Link href={'/'+n.slug} aria-current={!detail?'page':undefined}>{n.overview}</Link>{n.children.map(c=><Link href={'/'+n.slug+'/'+c.slug} aria-current={detail===c.slug?'page':undefined} key={c.slug}>{c.label}</Link>)}</nav></div></div>
}

export function Breadcrumb({section,detail}:{section:string;detail?:string}){
  return <BreadcrumbRoot className="breadcrumb"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator>/</BreadcrumbSeparator><BreadcrumbItem>{detail?<BreadcrumbLink asChild><Link href={'/'+section}>{sectionLabel(section)}</Link></BreadcrumbLink>:<BreadcrumbPage>{sectionLabel(section)}</BreadcrumbPage>}</BreadcrumbItem>{detail&&<><BreadcrumbSeparator>/</BreadcrumbSeparator><BreadcrumbItem><BreadcrumbPage>{detail}</BreadcrumbPage></BreadcrumbItem></>}</BreadcrumbList></BreadcrumbRoot>
}

export function Footer(){return <footer><div className="container footer-brand"><Brand/><p>{brandMessaging.slogan}</p><span className="private-label"><ShieldCheck size={14}/> Private prototype</span></div><nav className="container footer-directory" aria-label="Footer navigation">{navigation.map(n=><div key={n.slug}><Link href={'/'+n.slug} className="footer-section-title">{n.label}</Link>{n.children.map(c=><Link href={'/'+n.slug+'/'+c.slug} key={c.slug}>{c.label}</Link>)}</div>)}</nav><div className="container footer-contact-row"><Link href="/contact">Contact YIWEI</Link><a href="mailto:service@quickmindstore.com">service@quickmindstore.com</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} YIWEI MEDICAL</span><span>Clinical use and availability vary by product and market.</span><span><Globe2 size={14}/> English · Global</span></div></footer>}
