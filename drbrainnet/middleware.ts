import {NextResponse,type NextRequest} from 'next/server';
export function middleware(request:NextRequest){const headers=new Headers(request.headers);const locale=request.nextUrl.pathname.match(/^\/(zh|es)(?:\/|$)/)?.[1]||'en';headers.set('x-yiwei-locale',locale==='zh'?'zh-CN':locale);return NextResponse.next({request:{headers}});}
export const config={matcher:['/((?!api|_next|media|resources|favicon).*)']};
