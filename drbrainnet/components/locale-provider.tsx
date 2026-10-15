'use client';
import {createContext,useContext,useEffect,createElement,type ReactNode} from 'react';
import {type Locale,localeNames,localizedHref} from '@/lib/i18n';
export const LocaleContext=createContext<Locale>('en');
export const useLocale=()=>useContext(LocaleContext);
export function LocaleProvider({locale,children}:{locale:Locale;children:ReactNode}){useEffect(()=>{document.documentElement.lang=locale==='zh'?'zh-CN':locale;return()=>{document.documentElement.lang='en'}},[locale]);return createElement(LocaleContext.Provider,{value:locale},children);}
export function LanguageSwitcher({section,detail}:{section:string;detail?:string}){
 const current=useLocale();const path=(section==='home'?'/':'/'+section)+(detail?'/'+detail:'');
 return createElement('details',{className:'language-menu'},createElement('summary',{'aria-label':'Language / 语言 / Idioma'},localeNames[current]),createElement('nav',{'aria-label':'Language / 语言 / Idioma'},(['en','zh','es'] as Locale[]).map(locale=>createElement('a',{key:locale,href:localizedHref(path,locale),lang:locale==='zh'?'zh-CN':locale,hrefLang:locale==='zh'?'zh-CN':locale,'aria-current':current===locale?'page':undefined,onClick:(event:React.MouseEvent<HTMLAnchorElement>)=>{event.currentTarget.href=localizedHref(path,locale)+window.location.search+window.location.hash}},localeNames[locale]))));
}
