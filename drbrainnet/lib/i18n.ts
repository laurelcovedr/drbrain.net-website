import catalog from './translations/catalog';
import editorial from './editorial-overrides.json';
export type Locale='en'|'zh'|'es';
export const localeNames={en:'English',zh:'中文',es:'Español'};
export function translate(text:string,locale:Locale):string{
 const replacement=(editorial as Record<string,string>)[text.trim()];
 if(replacement)text=text.replace(text.trim(),replacement);
 if(locale==='en'||!text.trim())return text;
 const key=text.replace(/\s+/g,' ').trim();
 const translated=(catalog as Record<string,string[]>)[key]?.[locale==='zh'?0:1];
 if(translated)return text.replace(/\S[\s\S]*\S|\S/,translated);
 const patterns: [RegExp,(m:RegExpMatchArray)=>string][]=[
 [/^(\d+) records\. Open a record for its registered scope and public summary\.$/,m=>locale==='zh'?`${m[1]} 条记录。打开记录查看适用范围与公开摘要。`:`${m[1]} registros. Abra uno para ver su alcance y resumen público.`],
 [/^(.+) \| (.+)$/,m=>`${translate(m[1],locale)} | ${translate(m[2],locale)}`],
 [/^(.+™) (Dementia Care|Stroke Imaging AI|Autism Support|ADHD Support|Clinical Evidence)$/,m=>`${m[1]} · ${translate(m[2],locale)}`],
 [/^(.+) Explore workflows, relevant solutions, and the scope of supporting research\.$/,m=>translate(m[1],locale)+(locale==='zh'?' 了解流程、相关方案及研究证据范围。':' Explore los flujos, las soluciones y el alcance de la investigación.')],
 [/^(.+) Explore relevant solutions and evidence\.$/,m=>translate(m[1],locale)+(locale==='zh'?' 了解相关方案与证据。':' Explore soluciones y evidencia relevantes.')],
 [/^Review published studies and research context relevant to (.+)\. Explore original articles, source PDFs, and evidence scope\.$/,m=>locale==='zh'?`查看 ${m[1]} 相关发表研究与背景，了解原文、来源 PDF 与证据范围。`:`Revise estudios y contexto relacionados con ${m[1]}, con artículos originales, PDF fuente y alcance de la evidencia.`],
 [/^Show (.+) pages$/,m=>locale==='zh'?`显示${translate(m[1],locale)}页面`:`Mostrar páginas de ${translate(m[1],locale)}`],
 [/^(.+) pages$/,m=>locale==='zh'?`${translate(m[1],locale)}页面`:`Páginas de ${translate(m[1],locale)}`],
 [/^Clinical evidence for (.+)$/,m=>locale==='zh'?`${m[1]} 临床证据`:`Evidencia clínica de ${m[1]}`],
 [/^(.+) page sections$/,m=>locale==='zh'?`${m[1]} 页面章节`:`Secciones de ${m[1]}`],
 [/^Source PDF: (.+)$/,m=>locale==='zh'?`来源 PDF：${translate(m[1],locale)}`:`PDF fuente: ${translate(m[1],locale)}`],
 [/^Published article in (.+)$/,m=>locale==='zh'?`发表于 ${m[1]}`:`Artículo publicado en ${m[1]}`],
 [/^View all (\d+) records$/,m=>locale==='zh'?`查看全部 ${m[1]} 条记录`:`Ver los ${m[1]} registros`],
 [/^View (.+) field photos$/,m=>locale==='zh'?`查看${translate(m[1],locale)}现场照片`:`Ver fotos de ${translate(m[1],locale)}`],
 [/^Original report thumbnail: (.+)$/,m=>locale==='zh'?`原报告缩略图：${translate(m[1],locale)}`:`Miniatura original: ${translate(m[1],locale)}`],
 [/^Uploaded report page (\d+): (.+)$/,m=>locale==='zh'?`上传报告第${m[1]}页：${translate(m[2],locale)}`:`Página ${m[1]} del informe: ${translate(m[2],locale)}`],
 [/^(.+) (logo|mark)$/,m=>locale==='zh'?`${translate(m[1],locale)}标志`:`Logotipo de ${translate(m[1],locale)}`],
 [/^Showing (\d+) of (\d+) articles$/,m=>locale==='zh'?`显示 ${m[1]} / ${m[2]} 篇研究`:`Se muestran ${m[1]} de ${m[2]} artículos`],
 [/^(\d+) product-related papers · (\d+) independent references$/,m=>locale==='zh'?`${m[1]} 篇产品相关论文 · ${m[2]} 篇独立参考文献`:`${m[1]} artículos relacionados · ${m[2]} referencias independientes`],
 [/^Explore (\d+) articles$/,m=>locale==='zh'?`查看 ${m[1]} 篇研究`:`Ver ${m[1]} artículos`],
 [/^Explore (.+)$/,m=>locale==='zh'?`了解 ${translate(m[1],locale)}`:`Explorar ${translate(m[1],locale)}`],
 [/^More (.+) evidence$/,m=>locale==='zh'?`更多 ${m[1]} 研究证据`:`Más evidencia de ${m[1]}`],
 [/^Research relevant to (.+)$/,m=>locale==='zh'?`${m[1]} 相关研究`:`Investigación relacionada con ${m[1]}`],
 [/^(.+) clinical evidence\.$/,m=>locale==='zh'?`${m[1]} 临床证据。`:`Evidencia clínica de ${m[1]}.`],
 [/^View profile: (.+)$/,m=>locale==='zh'?`查看简介：${m[1]}`:`Ver perfil: ${m[1]}`],
 [/^Enlarge (.+)$/,m=>locale==='zh'?`放大：${translate(m[1],locale)}`:`Ampliar: ${translate(m[1],locale)}`],
 [/^Published article: (.+)$/,m=>locale==='zh'?`发表原文：${m[1]}`:`Artículo publicado: ${m[1]}`],
 [/^Study summary: (.+)$/,m=>locale==='zh'?`研究摘要：${m[1]}`:`Resumen del estudio: ${m[1]}`]
 ];
 for(const [re,fn]of patterns){const m=key.match(re);if(m)return text.replace(key,fn(m));}
 const months:Record<string,[string,string]>={January:['1月','enero'],February:['2月','febrero'],March:['3月','marzo'],April:['4月','abril'],May:['5月','mayo'],June:['6月','junio'],July:['7月','julio'],August:['8月','agosto'],September:['9月','septiembre'],October:['10月','octubre'],November:['11月','noviembre'],December:['12月','diciembre']};
 if(/\d.*\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/.test(key))return text.replace(/(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/g,(_,d,m,y)=>locale==='zh'?`${y}年${months[m][0]}${d}日`:`${d} de ${months[m][1]} de ${y}`);
 return text;
}
export function localizedHref(href:string,locale:Locale):string{
 if(locale==='en'||!/^\/(?:$|products(?:[/?#]|$)|evidence(?:[/?#]|$)|technology(?:[/?#]|$)|care-settings(?:[/?#]|$)|about(?:[/?#]|$)|contact(?:[/?#]|$)|reports(?:[/?#]|$))/.test(href))return href;
 return '/'+locale+(href==='/'?'':href);
}
