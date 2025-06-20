import type {
  AuthProvider,
  EmailAuthOptions,
  OAuthOptions,
} from '@/types/auth';

// 認証設定の定数
export const AUTH_CONFIG = {
  // リダイレクトURL
  REDIRECT_URL: '/auth/callback',

  // セッション設定
  SESSION: {
    REFRESH_THRESHOLD: 5 * 60 * 1000, // 5分前にリフレッシュ
    STORAGE_KEY: 'supabase.auth.token',
  },

  // OTP設定
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 5,
    RESEND_COOLDOWN_SECONDS: 60,
  },

  // ユーザーメタデータ
  USER_METADATA: {
    user_type: 'senior',
    registration_source: 'tomorie_app',
    platform: 'web',
  },

  // API エンドポイント
  API_ENDPOINTS: {
    CHECK_USER: '/api/auth/check-user',
    REFRESH_TOKEN: '/api/auth/refresh',
    UPDATE_PROFILE: '/api/auth/profile',
  },

  // タイムアウト設定
  TIMEOUTS: {
    API_REQUEST: 10000, // 10秒
    AUTH_REDIRECT: 30000, // 30秒
  },
} as const;

// プロバイダー別設定
export const PROVIDER_CONFIG: Record<AuthProvider, OAuthOptions> = {
  google: {
    redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}${AUTH_CONFIG.REDIRECT_URL}`,
    scopes: 'email profile',
  },
  facebook: {
    redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}${AUTH_CONFIG.REDIRECT_URL}`,
    scopes: 'email public_profile',
  },
  line: {
    redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}${AUTH_CONFIG.REDIRECT_URL}`,
    scopes: 'profile openid email',
  },
};

// サインイン時のメール認証設定
export const SIGNIN_EMAIL_OPTIONS: EmailAuthOptions = {
  shouldCreateUser: false,
  captchaToken: undefined,
};

// サインアップ時のメール認証設定
export const SIGNUP_EMAIL_OPTIONS: EmailAuthOptions = {
  shouldCreateUser: true,
  data: AUTH_CONFIG.USER_METADATA,
  captchaToken: undefined,
};

// 認証状態の初期値
export const INITIAL_AUTH_STATE = {
  user: null,
  loading: true,
  isAuthenticated: false,
} as const;

// HTTP ヘッダー設定
export const HTTP_HEADERS = {
  CONTENT_TYPE_JSON: {
    'Content-Type': 'application/json',
  },
  CONTENT_TYPE_FORM: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
} as const;

// 認証イベントタイプ
export const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
  USER_UPDATED: 'USER_UPDATED',
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
} as const;

// バリデーション設定
export const VALIDATION_CONFIG = {
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 320,
  },
  OTP: {
    REGEX: /^\d{6}$/,
    LENGTH: 6,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  },
} as const;

// デバッグ設定
export const DEBUG_CONFIG = {
  ENABLED: process.env.NODE_ENV === 'development',
  LOG_LEVEL: process.env.AUTH_LOG_LEVEL || 'info',
  SUPABASE_DEBUG: process.env.SUPABASE_DEBUG === 'true',
} as const;
