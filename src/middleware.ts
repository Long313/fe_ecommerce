import { jwtDecode } from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['vi', 'en', 'de', 'fr'];
const defaultLocale = 'vi';
const protectedRoutes = ['user', 'admin'];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("access_token")?.value;
  const segments = pathname.split('/');
  const locale = segments[1] || defaultLocale;
  const section = segments[2] || '';

  const isProtected = locales.includes(locale) && protectedRoutes.includes(section);

  // Nếu là route cần bảo vệ mà không có token -> redirect
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Nếu truy cập admin -> phải có token + role === 'admin'
  if (section === 'admin') {
    try {
      const decoded: { role: string } = jwtDecode(accessToken!);
      const role = decoded?.role;

      if (role !== 'admin') {
        return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
      }
    } catch (err) {
      console.log(err)
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
  }

  // Bỏ qua các file tĩnh, API, Next.js assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Thêm locale mặc định nếu thiếu
  const pathnameIsMissingLocale = !locales.some((locale) =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameIsMissingLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
