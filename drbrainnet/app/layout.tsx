import {headers} from 'next/headers';
import type {Metadata} from 'next';
import {metadataFor} from '@/lib/yiwei-seo';
import './globals.css';
import './neuro-theme.css';
import './global-engagement.css';
import './company-about.css';
export const metadata:Metadata={...metadataFor('home'),icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default async function RootLayout({children}:{children:React.ReactNode}){const lang=(await headers()).get('x-yiwei-locale')||'en';return <html lang={lang}><body>{children}</body></html>}
