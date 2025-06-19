'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { signUpWithEmail, verifyOtp, signInWithProvider } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('利用規約とプライバシーポリシーに同意してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signUpWithEmail(email);
      if (result.error) {
        throw result.error;
      }
      setIsCodeSent(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = error.message || 'アカウント作成に失敗しました';
      
      // 特定のエラーメッセージに対する処理
      if (errorMessage.includes('既に登録済みです')) {
        errorMessage += '\n\nログインページからサインインしてください。';
      } else if (errorMessage.includes('メール確認が完了していません')) {
        errorMessage += '\n\n登録時にお送りしたメールの確認リンクをクリックしてください。';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await verifyOtp(email, verificationCode);
    } catch (error: any) {
      setError(error.message || '認証コードの確認に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'facebook' | 'line') => {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">ト</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">トモリエ</h1>
              <p className="text-sm text-gray-600">心に灯りをともす</p>
            </div>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            新規登録
          </h2>
          <p className="text-lg text-gray-600">
            アカウントを作成して始めましょう
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6">
              <ErrorMessage 
                title="登録エラー" 
                message={error}
                onRetry={() => setError('')}
              />
            </div>
          )}

          {!isCodeSent ? (
            <>
              {/* メールアドレス入力フォーム */}
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
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
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="terms" className="text-lg text-gray-700">
                    <Link href="/terms" className="text-primary-600 hover:text-primary-500 underline">
                      利用規約
                    </Link>
                    {' '}と{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-500 underline">
                      プライバシーポリシー
                    </Link>
                    に同意します
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !agreedToTerms}
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

              {/* ソーシャル登録 */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-lg">
                    <span className="px-4 bg-white text-gray-500">または</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignUp('line')}
                    disabled={isLoading || !agreedToTerms}
                    className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    <Icons.line className="w-5 h-5 mr-3" />
                    LINEで登録
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignUp('google')}
                    disabled={isLoading || !agreedToTerms}
                    className="w-full"
                  >
                    <Icons.google className="w-5 h-5 mr-3" />
                    Googleで登録
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignUp('facebook')}
                    disabled={isLoading || !agreedToTerms}
                    className="w-full"
                  >
                    <Icons.facebook className="w-5 h-5 mr-3" />
                    Facebookで登録
                  </Button>
                </div>

                {!agreedToTerms && (
                  <p className="text-sm text-gray-500 text-center mt-4">
                    ソーシャル登録を利用するには利用規約への同意が必要です
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* 認証コード入力フォーム */}
              <div className="text-center mb-6">
                <Icons.mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  認証コードを入力してください
                </h3>
                <p className="text-lg text-gray-600">
                  {email} に送信された6桁のコードを入力してください
                </p>
              </div>

              <form onSubmit={handleCodeVerification} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-lg font-medium text-gray-700 mb-3">
                    認証コード
                  </label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                    disabled={isLoading}
                    className="text-lg text-center tracking-widest"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      アカウント作成中...
                    </>
                  ) : (
                    'アカウントを作成'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsCodeSent(false);
                    setVerificationCode('');
                    setError('');
                  }}
                  className="text-lg"
                >
                  メールアドレスを変更する
                </Button>
              </div>
            </>
          )}

          {/* ログインリンク */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-500 font-medium">
                ログイン
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}