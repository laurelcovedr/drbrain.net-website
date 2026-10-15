'use client';
import {useEffect} from 'react';
export default function LanguageDocument(){useEffect(()=>{document.documentElement.lang='zh-CN';return()=>{document.documentElement.lang='en'}},[]);return null;}
