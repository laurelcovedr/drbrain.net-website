/** @jsxImportSource @/lib/localized-jsx */
'use client';
import Link from '@/components/site-link';
import {organizationMarks,type OrganizationMark} from '@/lib/yiwei-organizations';

function OrganizationLogo({mark}:{mark:OrganizationMark}){
 return mark.crop?<svg className="institution-symbol" viewBox={mark.crop.join(' ')} role="img" aria-label={mark.name+' mark'}><title>{mark.name}</title><image href={mark.src} width={mark.width} height={mark.height}/></svg>:<img src={mark.src} width={mark.width} height={mark.height} alt={mark.name+' logo'} loading="lazy" decoding="async"/>;
}
function OrganizationCard({mark}:{mark:OrganizationMark}){
 const content=<><div className="organization-logo"><OrganizationLogo mark={mark}/></div>{mark.kind==='clinical'&&<h3>{mark.name}</h3>}<span>{mark.role}</span></>;
 return mark.external?<a className={'organization-mark '+mark.kind} href={mark.href} target="_blank" rel="noreferrer" aria-label={'Explore '+mark.name}>{content}</a>:<Link className={'organization-mark '+mark.kind} href={mark.href} aria-label={'Explore '+mark.name+' in YIWEI materials'}>{content}</Link>;
}
export function GlobalConnections(){
 return <section className="global-connections" aria-labelledby="global-connections-title"><h3 id="global-connections-title" className="organization-heading">Technology & clinical connections</h3><div className="organization-row" tabIndex={0} role="region" aria-label="Company and hospital logos; scroll horizontally to explore all six">{organizationMarks.map(m=><OrganizationCard key={m.id} mark={m}/>)}</div><p className="organization-context">Selected companies and institutions identified by YIWEI. Roles vary by product and project.</p></section>;
}
