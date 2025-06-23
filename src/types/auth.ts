import { User } from '@supabase/supabase-js';

// 基本的な認証プロバイダー型
export type AuthProvider = 'google' | 'facebook';

// 認証結果型
export interface AuthResult<T = any> {
  data?: T;
  error: Error | null;
}

// ユーザー確認結果型
export interface UserCheckResult {
  exists: boolean;
  confirmed: boolean;
}

// 認証状態型
export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Magic Link認証設定型
export interface MagicLinkOptions {
  redirectTo?: string;
  shouldCreateUser?: boolean;
  data?: Record<string, any>;
  captchaToken?: string;
}

// OAuth設定型
export interface OAuthOptions {
  redirectTo?: string;
  scopes?: string;
  queryParams?: Record<string, string>;
}

// メール認証設定型
export interface EmailAuthOptions {
  shouldCreateUser?: boolean;
  data?: Record<string, any>;
  captchaToken?: string;
}

// 認証イベント型
export type AuthEvent =
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'PASSWORD_RECOVERY';

// 認証エラー型
export enum AuthErrorType {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_NOT_CONFIRMED = 'EMAIL_NOT_CONFIRMED',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AuthError extends Error {
  type: AuthErrorType;
  details?: Record<string, any>;
}

// 認証アクション型
export interface AuthActions {
  signInWithMagicLink: (email: string) => Promise<AuthResult>;
  signUpWithMagicLink: (email: string) => Promise<AuthResult>;
  signInWithProvider: (
    provider: AuthProvider,
    options?: OAuthOptions
  ) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  refreshSession: () => Promise<AuthResult>;
}

// 認証コンテキスト型
export interface AuthContextValue extends AuthState, AuthActions {}
