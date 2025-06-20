import { OAuthButtonGroup } from './OAuthButton';
import type { OAuthProvider } from '@/config/brandColors';

interface SocialAuthSectionProps {
  onProviderClick: (provider: OAuthProvider) => void;
  disabled?: boolean;
  loading?: boolean;
  mode: 'login' | 'signup';
  requiresTermsAgreement?: boolean;
  hasAgreedToTerms?: boolean;
  className?: string;
}

export function SocialAuthSection({
  onProviderClick,
  disabled = false,
  loading = false,
  mode,
  requiresTermsAgreement = false,
  hasAgreedToTerms = true,
  className = ''
}: SocialAuthSectionProps) {
  const isDisabled = disabled || (requiresTermsAgreement && !hasAgreedToTerms);

  return (
    <div className={`mt-8 ${className}`}>
      {/* 区切り線 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-lg">
          <span className="px-4 bg-white text-gray-500">または</span>
        </div>
      </div>

      {/* OAuthボタングループ */}
      <OAuthButtonGroup
        onProviderClick={onProviderClick}
        disabled={isDisabled}
        loading={loading}
        mode={mode}
        className="mt-6"
      />

      {/* 利用規約同意が必要な場合の注意文 */}
      {requiresTermsAgreement && !hasAgreedToTerms && (
        <p className="text-sm text-gray-500 text-center mt-4">
          ソーシャル{mode === 'login' ? 'ログイン' : '登録'}を利用するには利用規約への同意が必要です
        </p>
      )}
    </div>
  );
}