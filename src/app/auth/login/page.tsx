'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthNavigationLinks } from '@/components/auth/AuthNavigationLinks';
import { OtpVerificationForm } from '@/components/auth/OtpVerificationForm';
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
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState<string>('');

  const { signInWithEmail, verifyOtp, signInWithProvider } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithEmail(email);
      if (result.error) {
        throw result.error;
      }
      setIsCodeSent(true);
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

  const handleCodeVerification = async (code: string) => {
    setIsLoading(true);
    setError('');

    try {
      await verifyOtp(email, code);
    } catch (error: any) {
      setError(error.message || '認証コードの確認に失敗しました');
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
      {!isCodeSent ? (
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
                  <LoadingSpinner size="sm" className="mr-2" />
                  認証コードを送信中...
                </>
              ) : (
                '認証コードを送信'
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
        <OtpVerificationForm
          email={email}
          isLoading={isLoading}
          onVerify={handleCodeVerification}
          onChangeEmail={() => {
            setIsCodeSent(false);
            setError('');
          }}
          submitButtonText="ログイン"
          loadingText="認証中..."
        />
      )}

      {/* ナビゲーションリンク */}
      <AuthNavigationLinks mode="login" className="mt-8" />
    </AuthLayout>
  );
}
