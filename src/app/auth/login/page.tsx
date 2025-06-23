'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthNavigationLinks } from '@/components/auth/AuthNavigationLinks';
import { MagicLinkSentMessage } from '@/components/auth/MagicLinkSentMessage';
import { SocialAuthSection } from '@/components/auth/SocialAuthSection';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { OAuthProvider } from '@/config/brandColors';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState<string>('');

  const { signInWithMagicLink, signInWithProvider } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithMagicLink(email);
      if (result.error) {
        throw result.error;
      }
      setIsLinkSent(true);
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = error.message || 'ログインに失敗しました';

      // 特定のエラーメッセージに対する処理
      if (errorMessage.includes('登録されていません')) {
        errorMessage += '\n\n新規登録は下のリンクから行えます。';
      } else if (errorMessage.includes('確認されていません')) {
        errorMessage += '\n\n登録時にお送りしたメールをご確認ください。';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithProvider(provider);
    } catch (error: any) {
      setError(error.message || 'ソーシャルログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="ログイン"
      subtitle="アカウントにログインしてください"
      error={error}
      onErrorClear={() => setError('')}
    >
      {!isLinkSent ? (
        <>
          {/* メールアドレス入力フォーム */}
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-3"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@tomorie.com"
                required
                disabled={isLoading}
                className="text-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-3 text-white" />
                  ログインリンクを送信中...
                </>
              ) : (
                'ログインリンクを送信'
              )}
            </Button>
          </form>

          {/* ソーシャルログイン */}
          <SocialAuthSection
            onProviderClick={handleSocialLogin}
            disabled={isLoading}
            loading={isLoading}
            mode="login"
          />
        </>
      ) : (
        <MagicLinkSentMessage
          email={email}
          mode="login"
          onChangeEmail={() => {
            setIsLinkSent(false);
            setError('');
          }}
        />
      )}

      {/* ナビゲーションリンク */}
      <AuthNavigationLinks mode="login" className="mt-8" />
    </AuthLayout>
  );
}
