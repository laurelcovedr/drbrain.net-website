/** @jsxImportSource @/lib/localized-jsx */
'use client';
import type {MediaImage} from '@/lib/yiwei-media';

// A source viewport keeps the original pixels and excludes localized interface chrome.
export function ProductImage({image,className='',priority=false}:{image:MediaImage;className?:string;priority?:boolean}){
 const view=image.viewport;
 if(!view)return <img className={className} src={image.src} width={image.width} height={image.height} alt={image.alt} decoding="async" loading={priority?undefined:'lazy'} fetchPriority={priority?'high':undefined}/>;
 return <svg className={'product-source-image '+className} viewBox={[view.x*image.width,view.y*image.height,view.width*image.width,view.height*image.height].join(' ')} preserveAspectRatio="xMidYMid meet" role="img" aria-label={image.alt}>
  <title>{image.alt}</title><image href={image.src} width={image.width} height={image.height}/>
 </svg>
}
