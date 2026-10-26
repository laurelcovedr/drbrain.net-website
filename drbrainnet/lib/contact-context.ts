import {products} from './yiwei-data';
import {careSettings} from './yiwei-care-settings';
export function demoHref(product?:string,setting?:string){
 const query=new URLSearchParams({intent:'demo'});
 if(products.some(p=>p.slug===product))query.set('product',product!);
 if(careSettings.some(s=>s.slug===setting))query.set('setting',setting!);
 return '/contact?'+query.toString();
}
export function readContactContext(search:string){
 const query=new URLSearchParams(search);
 return {demo:query.get('intent')==='demo',product:products.find(p=>p.slug===query.get('product'))?.name??'Solution overview',setting:careSettings.find(s=>s.slug===query.get('setting'))?.label??'Not specified'};
}
