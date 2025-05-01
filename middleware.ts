// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  console.log('[Middleware] Middleware triggered!');
  const { pathname } = req.nextUrl;
  console.log(`[Middleware] Request for: ${pathname}`);

  // Normalize pathname
  const normalizedPathname = pathname.replace(/\/$/, '');
  console.log(`[Middleware] Normalized pathname: ${normalizedPathname}`);

  // Define protected routes
  const protectedRoutes = ['/admin', '/select', '/templates',"/SelectTemplate"];
  const isProtectedRoute = protectedRoutes.some((route) => normalizedPathname.startsWith(route));
  console.log(`[Middleware] Protected route: ${isProtectedRoute}`);

  // Allow non-protected routes and /admin/login
  if (!isProtectedRoute || normalizedPathname === '/admin/login') {
    console.log(`[Middleware] Allowing: ${pathname}`);
    return NextResponse.next();
  }

  try {
    // Check for auth_token cookie
    const token = req.cookies.get('auth_token')?.value;
    console.log(`[Middleware] Auth token: ${token || 'Missing'}`);

    if (!token) {
      console.log(`[Middleware] No token, redirecting to /admin/login`);
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      console.log(`[Middleware] Redirecting to: ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }

    // Verify JWT token
    console.log(`[Middleware] Verifying token`);
    const payload = await verifyAuth(token);
    console.log(`[Middleware] Payload: ${JSON.stringify(payload)}`);

    if (!payload || !payload.adminId || payload.role !== 'admin') {
      console.log(`[Middleware] Invalid token or role, redirecting to /admin/login`);
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      console.log(`[Middleware] Redirecting to: ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }

    // Allow request
    console.log(`[Middleware] Token valid, allowing request`);
    return NextResponse.next();
  } catch (error: any) {
    console.error(`[Middleware] Error: ${error.name} - ${error.message}`);
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    console.log(`[Middleware] Error redirecting to: ${loginUrl.toString()}`);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/select/:path*', '/templates/:path*'],
};