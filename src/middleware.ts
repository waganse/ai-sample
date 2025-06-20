import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // 認証状態をチェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // パスの定義
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/matches',
    '/messages',
    '/communities',
  ];
  const authPaths = ['/auth/login', '/auth/register'];
  const publicPaths = [
    '/',
    '/service',
    '/concept',
    '/pricing',
    '/terms',
    '/privacy',
    '/contact',
    '/help',
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isAuthCallbackPath = request.nextUrl.pathname === '/auth/callback';

  // 認証コールバックページは常に許可
  if (isAuthCallbackPath) {
    return response;
  }

  // 未認証ユーザーが保護されたページにアクセスしようとした場合
  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 認証済みユーザーの場合
  if (user) {
    // プロフィール設定の確認
    const hasProfile = user.user_metadata?.profile_completed;
    const isSetupPath = request.nextUrl.pathname === '/profile/setup';

    // プロフィール未設定でセットアップページ以外にアクセスした場合
    if (!hasProfile && !isSetupPath && !isAuthCallbackPath) {
      return NextResponse.redirect(new URL('/profile/setup', request.url));
    }

    // プロフィール設定済みでセットアップページにアクセスした場合
    if (hasProfile && isSetupPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 認証済みユーザーが認証ページにアクセスしようとした場合
    if (isAuthPath) {
      const destination = hasProfile ? '/dashboard' : '/profile/setup';
      return NextResponse.redirect(new URL(destination, request.url));
    }

    // ルートアクセス時のリダイレクト
    if (request.nextUrl.pathname === '/') {
      const destination = hasProfile ? '/dashboard' : '/profile/setup';
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  // APIルートやパブリックページは常に許可
  if (request.nextUrl.pathname.startsWith('/api') || isPublicPath) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
