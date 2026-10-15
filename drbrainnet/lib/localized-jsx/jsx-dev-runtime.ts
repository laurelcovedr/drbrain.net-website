'use client';
export {Fragment} from './jsx-runtime';
import {jsx} from './jsx-runtime';
export {type JSX} from './jsx-runtime';
export const jsxDEV=(type:unknown,props:Record<string,unknown>|null,key?:unknown)=>jsx(type,props,key);
