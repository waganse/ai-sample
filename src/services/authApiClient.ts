import { AUTH_CONFIG, HTTP_HEADERS } from '@/config/auth';
import { createClient } from '@/lib/supabase/client';
import { AuthProvider, AuthResult, MagicLinkOptions, UserCheckResult } from '@/types/auth';
import { mapSupabaseError } from '@/utils/authErrors';

// HTTP クライアントのベースクラス
class BaseApiClient {
  protected async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = AUTH_CONFIG.TIMEOUTS.API_REQUEST
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...HTTP_HEADERS.CONTENT_TYPE_JSON,
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  protected async handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return response.json();
  }
}


// 認証API クライアント
export class AuthApiClient extends BaseApiClient {
  private supabase = createClient();

  // ユーザー存在確認
  async checkUser(email: string): Promise<AuthResult<UserCheckResult>> {
    try {
      const response = await this.fetchWithTimeout(
        AUTH_CONFIG.API_ENDPOINTS.CHECK_USER,
        {
          method: 'POST',
          body: JSON.stringify({ email }),
        }
      );

      const result = await this.handleApiResponse<UserCheckResult>(response);
      return { data: result, error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // Magic Linkでのサインイン
  async signInWithMagicLink(email: string): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}${AUTH_CONFIG.REDIRECT_URL}`
            : AUTH_CONFIG.REDIRECT_URL,
        },
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // Magic Linkでのサインアップ
  async signUpWithMagicLink(email: string): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: AUTH_CONFIG.USER_METADATA,
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}${AUTH_CONFIG.REDIRECT_URL}`
            : AUTH_CONFIG.REDIRECT_URL,
        },
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // OAuth認証
  async signInWithOAuth(provider: AuthProvider): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}${AUTH_CONFIG.REDIRECT_URL}`
            : AUTH_CONFIG.REDIRECT_URL,
        },
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // サインアウト
  async signOut(): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // セッション取得
  async getSession(): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // セッション更新
  async refreshSession(): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { error: mapSupabaseError(error) };
    }
  }

  // 認証状態変更の監視
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}

// シングルトンインスタンス
export const authApiClient = new AuthApiClient();
