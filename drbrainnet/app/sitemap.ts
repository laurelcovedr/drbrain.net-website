import type {MetadataRoute} from 'next';
import {seoPages,absoluteUrl} from '@/lib/yiwei-seo';
export default function sitemap():MetadataRoute.Sitemap{
 // Prepared for a future approved public launch; private access and robots remain active.
 return seoPages.filter(p=>!p.legacy).map(p=>({url:absoluteUrl(p.path)}));
}
