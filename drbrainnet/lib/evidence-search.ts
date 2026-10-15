import type {Article} from './yiwei-data';
import {translate,type Locale} from './i18n';
const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
export function matchesEvidence(article:Article,query:string,locale:Locale){
 const needle=normalize(query);if(!needle)return true;
 const fields=[article.title,article.authors,article.journal,article.relation,article.kind,article.year,article.component??'',...(article.institutions??[])];
 return normalize([...fields,...fields.map(value=>translate(value,locale))].join(' ')).includes(needle);
}
