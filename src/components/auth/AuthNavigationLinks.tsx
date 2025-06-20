import Link from 'next/link';

interface AuthNavigationLinksProps {
  mode: 'login' | 'signup';
  className?: string;
}

export function AuthNavigationLinks({
  mode,
  className = '',
}: AuthNavigationLinksProps) {
  if (mode === 'login') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-lg text-gray-600">
          アカウントをお持ちでない方は{' '}
          <Link
            href="/auth/register"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            新規登録
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <p className="text-lg text-gray-600">
        すでにアカウントをお持ちの方は{' '}
        <Link
          href="/auth/login"
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}
