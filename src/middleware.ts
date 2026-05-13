import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/leads but allow /admin/login
  if (pathname.startsWith('/admin/leads')) {
    const session = request.cookies.get('admin_session');

    if (!session || session.value !== 'true') {
      // Redirect to login page
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/leads/:path*'],
};
