import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const pathname = req.nextUrl.pathname;

  if (!accessToken && pathname.startsWith('/expenses')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (
    accessToken &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/', '/expenses/:path*', '/login', '/register'],
};
