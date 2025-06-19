'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-xl">ト</span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                トモリエ
              </h1>
              <p className="text-sm text-gray-600 leading-tight">
                心に灯りをともす
              </p>
            </div>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className={`relative transition-colors text-lg ${
                    isActive('/profile') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  プロフィール
                  {isActive('/profile') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  href="/matches" 
                  className={`relative transition-colors text-lg ${
                    isActive('/matches') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  マッチ
                  {isActive('/matches') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  href="/communities" 
                  className={`relative transition-colors text-lg ${
                    isActive('/communities') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  コミュニティ
                  {isActive('/communities') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/concept" 
                  className={`relative transition-colors text-lg ${
                    isActive('/concept') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  私たちの想い
                  {isActive('/concept') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  href="/service" 
                  className={`relative transition-colors text-lg ${
                    isActive('/service') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  サービスについて
                  {isActive('/service') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  href="/pricing" 
                  className={`relative transition-colors text-lg ${
                    isActive('/pricing') 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  料金プラン
                  {isActive('/pricing') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* アクションボタン */}
          {showAuthButtons && (
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {/* 通知ベル */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Icons.bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  {/* プロフィールメニュー */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Icons.user className="h-6 w-6 text-gray-600" />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="hidden sm:inline-flex"
                    >
                      ログアウト
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" className="hidden sm:inline-flex">
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>
                      新規登録
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}