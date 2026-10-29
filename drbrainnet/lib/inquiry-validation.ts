export function validateInquiry(value:unknown){
 if(!value||typeof value!=='object')return null;
 const b=value as Record<string,unknown>;
 const limits:Record<string,number>={id:64,name:100,email:160,organization:160,role:100,country:100,message:2500,purpose:80,solution:100,careSetting:100,locale:5};
 const result:Record<string,string>={};
 for(const [key,max] of Object.entries(limits)){if(typeof b[key]!=='string'||(b[key] as string).length>max)return null;result[key]=(b[key] as string).trim()}
 if(!/^[a-zA-Z0-9-]{20,64}$/.test(result.id)||!result.name||!result.message||!/^\S+@\S+\.\S+$/.test(result.email)||/[\r\n]/.test(result.email)||!['en','zh','es'].includes(result.locale))return null;
 if(typeof b.website==='string'&&b.website)return null;
 return result;
}
