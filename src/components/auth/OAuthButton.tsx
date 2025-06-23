import React from 'react';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { OAuthProvider } from '@/config/brandColors';
import styles from './OAuthButton.module.css';

interface OAuthButtonProps {
  provider: OAuthProvider;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
}

const PROVIDER_CONFIG = {
  google: {
    icon: 'google' as const,
    defaultText: {
      login: 'Googleでログイン',
      signup: 'Googleで登録'
    }
  },
  facebook: {
    icon: 'facebook' as const,
    defaultText: {
      login: 'Facebookでログイン',
      signup: 'Facebookで登録'
    }
  }
} as const;

export function OAuthButton({
  provider,
  onClick,
  disabled = false,
  loading = false,
  text,
  icon,
  className = '',
}: OAuthButtonProps) {
  const config = PROVIDER_CONFIG[provider];
  const buttonText = text || config.defaultText.login;
  const isDisabled = disabled || loading;

  // CSSクラスの決定
  const getButtonClasses = () => {
    const baseClasses = `${styles.oauthButton} w-full font-medium py-3 px-4 rounded-lg flex items-center justify-center text-base`;
    
    if (isDisabled) {
      return `${baseClasses} ${styles.disabledButton}`;
    }
    
    switch (provider) {
      case 'google':
        return `${baseClasses} ${styles.googleButton}`;
      case 'facebook':
        return `${baseClasses} ${styles.facebookButton}`;
      default:
        return `${baseClasses} ${styles.disabledButton}`;
    }
  };

  const finalClasses = `${getButtonClasses()} ${className}`;

  // アイコンの決定
  const renderIcon = () => {
    if (loading) {
      return <LoadingSpinner size="sm" className="mr-3" />;
    }
    
    if (icon) {
      return icon;
    }
    
    // プロバイダーに応じたアイコンを選択
    switch (provider) {
      case 'google':
        return <Icons.google className="w-5 h-5 mr-3" />;
      case 'facebook':
        return <Icons.facebook className="w-5 h-5 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={finalClasses}
      type="button"
    >
      {renderIcon()}
      {buttonText}
    </button>
  );
}

// 特定プロバイダー用のプリセットコンポーネント
export function GoogleOAuthButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="google" />;
}

export function FacebookOAuthButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="facebook" />;
}


// まとめてOAuthボタンを表示するコンポーネント
interface OAuthButtonGroupProps {
  onProviderClick: (provider: OAuthProvider) => void;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'login' | 'signup';
  className?: string;
}

export function OAuthButtonGroup({
  onProviderClick,
  disabled = false,
  loading = false,
  mode = 'login',
  className = '',
}: OAuthButtonGroupProps) {
  const providers: OAuthProvider[] = ['google', 'facebook'];

  return (
    <div className={`space-y-3 ${className}`}>
      {providers.map((provider) => {
        const config = PROVIDER_CONFIG[provider];
        const text = mode === 'login' 
          ? config.defaultText.login 
          : config.defaultText.signup;

        return (
          <OAuthButton
            key={provider}
            provider={provider}
            onClick={() => onProviderClick(provider)}
            disabled={disabled}
            loading={loading}
            text={text}
          />
        );
      })}
    </div>
  );
}