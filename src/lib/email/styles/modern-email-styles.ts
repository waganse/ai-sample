// モダンメールテンプレート用のスタイル定義

export const emailColors = {
  // ブランドカラー（サイトと統一）
  primary: '#14b8a6', // primary: 174 94% 39%
  primaryDark: '#0d9488',
  primaryLight: '#5eead4',
  primaryUltraLight: '#f0fdfa',
  
  // ニュートラルカラー
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // アクセントカラー
  warm: '#f59e0b',
  warmLight: '#fef3c7',
  success: '#10b981',
  successLight: '#ecfdf5',
  
  // グラデーション
  gradientPrimary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  gradientWarm: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  gradientSoft: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
};

export const emailFonts = {
  primary: '"Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  heading: '"Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
};

export const emailSizes = {
  // フォントサイズ（シニア向け大きめ）
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  
  // スペーシング
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
  },
  
  // ボーダーラディウス
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
};

// 基本レイアウトスタイル
export const baseStyles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: emailColors.white,
    fontFamily: emailFonts.primary,
    lineHeight: '1.6',
    color: emailColors.gray800,
  },
  
  header: {
    background: emailColors.gradientPrimary,
    padding: `${emailSizes.spacing['2xl']} ${emailSizes.spacing.xl}`,
    textAlign: 'center' as const,
    borderRadius: `${emailSizes.radius.lg} ${emailSizes.radius.lg} 0 0`,
  },
  
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    backgroundColor: emailColors.white,
    borderRadius: emailSizes.radius.xl,
    marginBottom: emailSizes.spacing.lg,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  
  logoText: {
    fontSize: emailSizes['2xl'],
    fontWeight: '700',
    color: emailColors.primary,
    margin: '0',
  },
  
  headerTitle: {
    fontSize: emailSizes['3xl'],
    fontWeight: '700',
    color: emailColors.white,
    margin: `${emailSizes.spacing.md} 0 ${emailSizes.spacing.sm} 0`,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  headerSubtitle: {
    fontSize: emailSizes.lg,
    color: emailColors.primaryLight,
    margin: '0',
    opacity: '0.9',
  },
};

// コンテンツセクションスタイル
export const contentStyles = {
  section: {
    padding: `${emailSizes.spacing['3xl']} ${emailSizes.spacing.xl}`,
    backgroundColor: emailColors.white,
  },
  
  greeting: {
    fontSize: emailSizes.xl,
    fontWeight: '600',
    color: emailColors.gray800,
    marginBottom: emailSizes.spacing.lg,
  },
  
  paragraph: {
    fontSize: emailSizes.lg,
    lineHeight: '1.7',
    color: emailColors.gray700,
    margin: `${emailSizes.spacing.lg} 0`,
  },
  
  highlight: {
    backgroundColor: emailColors.primaryUltraLight,
    padding: `${emailSizes.spacing.md} ${emailSizes.spacing.lg}`,
    borderRadius: emailSizes.radius.md,
    borderLeft: `4px solid ${emailColors.primary}`,
    margin: `${emailSizes.spacing.xl} 0`,
  },
  
  highlightText: {
    fontSize: emailSizes.lg,
    color: emailColors.gray800,
    margin: '0',
    fontWeight: '500',
  },
};

// ボタンスタイル
export const buttonStyles = {
  container: {
    textAlign: 'center' as const,
    margin: `${emailSizes.spacing['3xl']} 0`,
  },
  
  primary: {
    display: 'inline-block',
    background: emailColors.gradientPrimary,
    color: emailColors.white,
    fontSize: emailSizes.lg,
    fontWeight: '600',
    padding: `${emailSizes.spacing.lg} ${emailSizes.spacing['3xl']}`,
    textDecoration: 'none',
    borderRadius: emailSizes.radius.lg,
    boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
    transition: 'all 0.3s ease',
  },
  
  secondary: {
    display: 'inline-block',
    backgroundColor: emailColors.white,
    color: emailColors.primary,
    fontSize: emailSizes.base,
    fontWeight: '500',
    padding: `${emailSizes.spacing.md} ${emailSizes.spacing.xl}`,
    textDecoration: 'none',
    borderRadius: emailSizes.radius.md,
    border: `2px solid ${emailColors.primary}`,
    transition: 'all 0.3s ease',
  },
};

// アイコンスタイル
export const iconStyles = {
  container: {
    textAlign: 'center' as const,
    margin: `${emailSizes.spacing.xl} 0`,
  },
  
  large: {
    fontSize: '48px',
    lineHeight: '1',
  },
  
  background: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    backgroundColor: emailColors.primaryUltraLight,
    borderRadius: emailSizes.radius.full,
    marginBottom: emailSizes.spacing.lg,
  },
};

// ティップスセクションスタイル
export const tipsStyles = {
  container: {
    background: emailColors.gradientSoft,
    padding: `${emailSizes.spacing.xl} ${emailSizes.spacing.lg}`,
    borderRadius: emailSizes.radius.lg,
    border: `1px solid ${emailColors.primaryLight}`,
    margin: `${emailSizes.spacing.xl} 0`,
  },
  
  title: {
    fontSize: emailSizes.lg,
    fontWeight: '600',
    color: emailColors.gray800,
    margin: `0 0 ${emailSizes.spacing.md} 0`,
    display: 'flex',
    alignItems: 'center',
    gap: emailSizes.spacing.sm,
  },
  
  content: {
    fontSize: emailSizes.base,
    lineHeight: '1.7',
    color: emailColors.gray700,
    margin: '0',
  },
};

// フッタースタイル
export const footerStyles = {
  container: {
    backgroundColor: emailColors.gray50,
    padding: `${emailSizes.spacing.xl} ${emailSizes.spacing.lg}`,
    textAlign: 'center' as const,
    borderTop: `1px solid ${emailColors.gray200}`,
    borderRadius: `0 0 ${emailSizes.radius.lg} ${emailSizes.radius.lg}`,
  },
  
  signature: {
    fontSize: emailSizes.base,
    color: emailColors.gray600,
    margin: `0 0 ${emailSizes.spacing.md} 0`,
    fontWeight: '500',
  },
  
  contact: {
    fontSize: emailSizes.sm,
    color: emailColors.gray500,
    margin: '0',
  },
  
  unsubscribe: {
    fontSize: emailSizes.xs,
    color: emailColors.gray400,
    margin: `${emailSizes.spacing.lg} 0 0 0`,
  },
  
  link: {
    color: emailColors.primary,
    textDecoration: 'none',
  },
};

// アニメーション効果（CSS）
export const animationCSS = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3);
  }
`;