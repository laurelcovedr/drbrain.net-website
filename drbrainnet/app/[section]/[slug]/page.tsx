import type {Metadata} from 'next';
import {notFound,permanentRedirect} from 'next/navigation';
import Site from '@/components/yiwei-site';
import {productAliases} from '@/lib/yiwei-data';
import {metadataFor} from '@/lib/yiwei-seo';
import {SeoData} from '@/components/seo-data';
import {detailIsValid} from '@/lib/yiwei-navigation';
export async function generateMetadata({params}:{params:Promise<{section:string;slug:string}>}):Promise<Metadata>{const {section,slug}=await params;return metadataFor(section,slug);}
export default async function Detail({params,searchParams}:{params:Promise<{section:string;slug:string}>;searchParams?:Promise<Record<string,string|string[]|undefined>>}){const {section,slug}=await params;if(['products','evidence'].includes(section)&&Object.hasOwn(productAliases,slug))permanentRedirect('/'+section+'/'+productAliases[slug]);if(!detailIsValid(section,slug))notFound();const query=await searchParams??{};return <><SeoData section={section} slug={slug}/><Site key={section+'/'+slug} section={section} detail={slug} market={typeof query.market==='string'?query.market:undefined} solution={typeof query.solution==='string'?query.solution:undefined}/></>;}
