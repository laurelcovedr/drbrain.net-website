import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Site from '@/components/yiwei-site';
import {sections} from '@/lib/yiwei-data';
import {metadataFor} from '@/lib/yiwei-seo';
import {SeoData} from '@/components/seo-data';
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{const {section}=await params;return metadataFor(section);}
export default async function Section({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!sections.includes(section))notFound();return <><SeoData section={section}/><Site key={section} section={section}/></>;}
