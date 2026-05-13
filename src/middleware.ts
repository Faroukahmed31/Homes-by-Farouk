import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the /admin/leads route
  if (request.nextUrl.pathname.startsWith('/admin/leads')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
        },
      });
    }

    const auth = authHeader.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    // Check credentials
    if (user === 'Akukzeey' && pwd === 'Acookie@001') {
      return NextResponse.next();
    }

    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/leads/:path*',
};
