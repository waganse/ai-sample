import { DEBUG_CONFIG } from '@/config/auth';
import { authApiClient } from '@/services/authApiClient';
import {
  AuthProvider,
  AuthResult,
  OAuthOptions,
} from '@/types/auth';
import {
  createSignUpUserCheckError,
  createUserCheckError,
  mapSupabaseError,
} from '@/utils/authErrors';
import {
  normalizeAuthInput,
  validateAuthProvider,
  validateEmail,
} from '@/utils/authValidation';

// 認証サービスクラス
export class AuthService {
  // デバッグログ
  private log(message: string, data?: any) {
    if (DEBUG_CONFIG.ENABLED) {
      console.log(`[AuthService] ${message}`, data);
    }
  }

  // エラーログ
  private logError(message: string, error?: any) {
    if (DEBUG_CONFIG.ENABLED) {
      console.error(`[AuthService] ${message}`, error);
    }
  }

  // Magic Linkでサインイン
  async signInWithMagicLink(email: string): Promise<AuthResult> {
    this.log('Starting magic link sign-in', { email });

    try {
      // 入力値の正規化とバリデーション
      const normalizedEmail = normalizeAuthInput(email, 'email');
      const emailValidation = validateEmail(normalizedEmail);

      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      // ユーザー存在確認
      const userCheckResult = await authApiClient.checkUser(normalizedEmail);
      if (userCheckResult.error) {
        throw userCheckResult.error;
      }

      // ユーザー確認結果のチェック
      const userError = createUserCheckError(userCheckResult.data!);
      if (userError) {
        throw userError;
      }

      // Magic Link送信
      const result = await authApiClient.signInWithMagicLink(normalizedEmail);
      if (result.error) {
        throw result.error;
      }

      this.log('Magic link sign-in sent successfully');
      return { error: null };
    } catch (error: any) {
      this.logError('Magic link sign-in failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // Magic Linkでサインアップ
  async signUpWithMagicLink(email: string): Promise<AuthResult> {
    this.log('Starting magic link sign-up', { email });

    try {
      // 入力値の正規化とバリデーション
      const normalizedEmail = normalizeAuthInput(email, 'email');
      const emailValidation = validateEmail(normalizedEmail);

      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      // ユーザー存在確認
      const userCheckResult = await authApiClient.checkUser(normalizedEmail);
      if (userCheckResult.error) {
        throw userCheckResult.error;
      }

      // サインアップ時のユーザー確認結果チェック
      const userError = createSignUpUserCheckError(userCheckResult.data!);
      if (userError) {
        throw userError;
      }

      // Magic Link送信
      const result = await authApiClient.signUpWithMagicLink(normalizedEmail);
      if (result.error) {
        throw result.error;
      }

      this.log('Magic link sign-up sent successfully');
      return { error: null };
    } catch (error: any) {
      this.logError('Magic link sign-up failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // OAuth認証
  async signInWithProvider(
    provider: AuthProvider,
    options?: OAuthOptions
  ): Promise<AuthResult> {
    this.log('Starting OAuth sign-in', { provider });

    try {
      // プロバイダーのバリデーション
      const providerValidation = validateAuthProvider(provider);
      if (!providerValidation.isValid) {
        throw new Error(providerValidation.error);
      }

      // OAuth認証実行
      const result = await authApiClient.signInWithOAuth(provider);
      if (result.error) {
        throw result.error;
      }

      this.log('OAuth sign-in initiated successfully');
      return result;
    } catch (error: any) {
      this.logError('OAuth sign-in failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // サインアウト
  async signOut(): Promise<AuthResult> {
    this.log('Starting sign out');

    try {
      const result = await authApiClient.signOut();
      if (result.error) {
        throw result.error;
      }

      this.log('Sign out successful');
      return result;
    } catch (error: any) {
      this.logError('Sign out failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // セッション更新
  async refreshSession(): Promise<AuthResult> {
    this.log('Refreshing session');

    try {
      const result = await authApiClient.refreshSession();
      if (result.error) {
        throw result.error;
      }

      this.log('Session refresh successful');
      return result;
    } catch (error: any) {
      this.logError('Session refresh failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // セッション取得
  async getSession(): Promise<AuthResult> {
    try {
      return await authApiClient.getSession();
    } catch (error: any) {
      this.logError('Get session failed', error);
      return { error: mapSupabaseError(error) };
    }
  }

  // 認証状態変更の監視
  onAuthStateChange(callback: (event: string, session: any) => void) {
    this.log('Setting up auth state change listener');
    return authApiClient.onAuthStateChange(callback);
  }
}

// シングルトンインスタンス
export const authService = new AuthService();
