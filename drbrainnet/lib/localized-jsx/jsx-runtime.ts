'use client';
import {createElement,cloneElement,isValidElement,type ReactNode} from 'react';
import {jsx as originalJsx,jsxs as originalJsxs,Fragment} from 'react/jsx-runtime';
import {useLocale} from '@/components/locale-provider';
import {translate,localizedHref} from '@/lib/i18n';
export {Fragment};
export namespace JSX { export type ElementType=import('react').JSX.ElementType; export type Element=import('react').JSX.Element; export type IntrinsicElements=import('react').JSX.IntrinsicElements; export type ElementChildrenAttribute=import('react').JSX.ElementChildrenAttribute; export type IntrinsicAttributes=import('react').JSX.IntrinsicAttributes; }
function Text({value}:{value:string}){return translate(value,useLocale());}
function children(value:unknown):unknown{if(typeof value==='string'&&value.trim())return createElement(Text,{value});if(Array.isArray(value))return value.map((v,i)=>typeof v==='string'?createElement(Text,{value:v,key:i}):isValidElement(v)?cloneElement(v,{key:v.key??i}):Array.isArray(v)?children(v):v);return value;}
function Host({tag,original}:{tag:string;original:Record<string,unknown>}){
 const locale=useLocale();const props={...original};
 for(const key of ['aria-label','aria-description','placeholder','title','alt'])if(typeof props[key]==='string')props[key]=translate(props[key] as string,locale);
 if(typeof props.href==='string')props.href=localizedHref(props.href,locale);
 if(['title','option','textarea'].includes(tag)&&typeof props.children==='string')props.children=translate(props.children,locale);else if(tag!=='script'&&tag!=='style')props.children=children(props.children);
 return createElement(tag,props);
}
function localized(type:unknown,props:Record<string,unknown>|null,key:unknown,multiple:boolean){
 if(typeof type==='string'&&type!=='script'&&type!=='style')return originalJsx(Host,{tag:type,original:props||{}},key as string);
 const next=props&&Object.hasOwn(props,'children')?{...props,children:children(props.children)}:props;
 return (multiple?originalJsxs:originalJsx)(type as Parameters<typeof originalJsx>[0],next,key as string);
}
export const jsx=(type:unknown,props:Record<string,unknown>|null,key?:unknown)=>localized(type,props,key,false);
export const jsxs=(type:unknown,props:Record<string,unknown>|null,key?:unknown)=>localized(type,props,key,true);
