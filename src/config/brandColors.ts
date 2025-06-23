// OAuth プロバイダーのブランドカラー定義

export const OAUTH_BRAND_COLORS = {
  google: {
    primary: '#FFFFFF', // Google White background
    hover: '#F8F9FA',
    text: '#3C4043', // Google Gray text
    border: '#DADCE0', // Google border
    disabled: {
      bg: '#F8F9FA',
      text: '#9AA0A6',
      border: '#DADCE0',
    },
  },
  facebook: {
    primary: '#1877F2', // Facebook Blue
    hover: '#166FE5',
    text: '#FFFFFF',
    border: '#1877F2',
    disabled: {
      bg: '#F0F2F5',
      text: '#8A8D91',
      border: '#DADDE1',
    },
  },
} as const;

export type OAuthProvider = keyof typeof OAUTH_BRAND_COLORS;

// Tailwind CSS クラス生成ヘルパー
export function getOAuthButtonClasses(
  provider: OAuthProvider,
  disabled: boolean = false
): string {
  if (disabled) {
    return `bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed`;
  }

  switch (provider) {
    case 'google':
      return 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm hover:shadow-md ring-1 ring-gray-300';
    case 'facebook':
      return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-md hover:shadow-lg';
    default:
      return 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300';
  }
}

// アクセシビリティを考慮したフォーカススタイル
export function getOAuthButtonFocusClasses(provider: OAuthProvider): string {
  switch (provider) {
    case 'google':
      return 'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2';
    case 'facebook':
      return 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    default:
      return 'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2';
  }
}

// アニメーション付きボタンクラス
export function getOAuthButtonAnimationClasses(): string {
  return 'transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]';
}

// 完全なボタンクラス生成
export function generateOAuthButtonClasses(
  provider: OAuthProvider,
  disabled: boolean = false
): string {
  const baseClasses =
    'w-full font-medium py-3 px-4 rounded-lg flex items-center justify-center';
  const colorClasses = getOAuthButtonClasses(provider, disabled);
  const focusClasses = getOAuthButtonFocusClasses(provider);
  const animationClasses = getOAuthButtonAnimationClasses();

  return `${baseClasses} ${colorClasses} ${focusClasses} ${animationClasses}`;
}
