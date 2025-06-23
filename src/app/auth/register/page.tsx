'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthNavigationLinks } from '@/components/auth/AuthNavigationLinks';
import { MagicLinkSentMessage } from '@/components/auth/MagicLinkSentMessage';
import { SocialAuthSection } from '@/components/auth/SocialAuthSection';
import { TermsAgreementCheckbox } from '@/components/auth/TermsAgreementCheckbox';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { OAuthProvider } from '@/config/brandColors';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { signUpWithMagicLink, signInWithProvider } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setError('利用規約とプライバシーポリシーに同意してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signUpWithMagicLink(email);
      if (result.error) {
        throw result.error;
      }
      setIsLinkSent(true);
    } catch (error: any) {
      console.error('Registration error:', error);

      let errorMessage = error.message || 'アカウント作成に失敗しました';

      // 特定のエラーメッセージに対する処理
      if (errorMessage.includes('既に登録済みです')) {
        errorMessage += '\n\nログインページからサインインしてください。';
      } else if (errorMessage.includes('メール確認が完了していません')) {
        errorMessage +=
          '\n\n登録時にお送りしたメールの確認リンクをクリックしてください。';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: OAuthProvider) => {
    if (!agreedToTerms) {
      setError('利用規約とプライバシーポリシーに同意してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signInWithProvider(provider);
    } catch (error: any) {
      setError(error.message || 'アカウント作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="新規登録"
      subtitle="アカウントを作成して始めましょう"
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

            {/* 利用規約同意 */}
            <TermsAgreementCheckbox
              checked={agreedToTerms}
              onChange={setAgreedToTerms}
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={isLoading || !email || !agreedToTerms}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-3 text-white" />
                  確認リンクを送信中...
                </>
              ) : (
                '確認リンクを送信'
              )}
            </Button>
          </form>

          {/* ソーシャル登録 */}
          <SocialAuthSection
            onProviderClick={handleSocialSignUp}
            disabled={isLoading}
            loading={isLoading}
            mode="signup"
            requiresTermsAgreement={true}
            hasAgreedToTerms={agreedToTerms}
          />
        </>
      ) : (
        <MagicLinkSentMessage
          email={email}
          mode="signup"
          onChangeEmail={() => {
            setIsLinkSent(false);
            setError('');
          }}
        />
      )}

      {/* ナビゲーションリンク */}
      <AuthNavigationLinks mode="signup" className="mt-8" />
    </AuthLayout>
  );
}
