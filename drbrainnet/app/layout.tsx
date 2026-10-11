import type {Metadata} from 'next';
import {metadataFor} from '@/lib/yiwei-seo';
import './globals.css';
import './neuro-theme.css';
import './global-engagement.css';
import './company-about.css';
export const metadata:Metadata={...metadataFor('home'),icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
