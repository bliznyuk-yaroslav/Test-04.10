import { NextResponse, type NextRequest } from 'next/server';

// Protect /kanban on the edge (SSR guard). If no token cookie -> redirect to /login
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard the kanban route (and potential subpaths)
  if (pathname.startsWith('/kanban')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/kanban/:path*'],
};
