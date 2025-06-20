import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/ui/Icons';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface OtpVerificationFormProps {
  email: string;
  isLoading: boolean;
  onVerify: (code: string) => Promise<void>;
  onChangeEmail: () => void;
  submitButtonText?: string;
  loadingText?: string;
}

export function OtpVerificationForm({
  email,
  isLoading,
  onVerify,
  onChangeEmail,
  submitButtonText = 'ログイン',
  loadingText = '認証中...'
}: OtpVerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(verificationCode);
  };

  return (
    <>
      {/* ヘッダー */}
      <div className="text-center mb-6">
        <Icons.mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          認証コードを入力してください
        </h3>
        <p className="text-lg text-gray-600">
          {email} に送信された6桁のコードを入力してください
        </p>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="code"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
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
              {loadingText}
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </form>

      {/* メールアドレス変更 */}
      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          onClick={onChangeEmail}
          className="text-lg"
        >
          メールアドレスを変更する
        </Button>
      </div>
    </>
  );
}