import {structuredDataFor} from '@/lib/yiwei-seo';
export function SeoData({section,slug}:{section:string;slug?:string}){
 const data=structuredDataFor(section,slug);if(!data)return null;
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}
