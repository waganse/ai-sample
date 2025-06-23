'use client';

import { DEBUG_CONFIG, INITIAL_AUTH_STATE } from '@/config/auth';
import { authService } from '@/services/authService';
import { AuthContextValue, AuthState } from '@/types/auth';
import { User } from '@supabase/supabase-js';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// コンテキストの作成
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Props型定義
interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

// 認証プロバイダーコンポーネント
export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  // 認証状態の管理
  const [authState, setAuthState] = useState<AuthState>({
    ...INITIAL_AUTH_STATE,
    user: initialUser,
    loading: !initialUser, // 初期ユーザーがいる場合はローディングを false に
    isAuthenticated: !!initialUser,
  });

  // デバッグログ
  const log = (message: string, data?: any) => {
    if (DEBUG_CONFIG.ENABLED) {
      console.log(`[AuthProvider] ${message}`, data);
    }
  };

  // 認証状態の更新
  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  };

  // ユーザー状態の更新
  const setUser = useCallback((user: User | null) => {
    const isAuthenticated = !!user;
    updateAuthState({
      user,
      isAuthenticated,
      loading: false,
    });
    log('User state updated', { userId: user?.id, isAuthenticated });
  }, []);

  // ローディング状態の更新
  const setLoading = useCallback((loading: boolean) => {
    updateAuthState({ loading });
  }, []);

  // 初期セッション取得
  useEffect(() => {
    if (initialUser) {
      log('Initial user provided, skipping session fetch');
      return;
    }

    const getInitialSession = async () => {
      log('Fetching initial session');
      setLoading(true);

      try {
        const sessionResult = await authService.getSession();
        if (sessionResult.error) {
          log('No initial session found');
          setUser(null);
        } else {
          const session = sessionResult.data?.session;
          setUser(session?.user ?? null);
          log('Initial session loaded', { userId: session?.user?.id });
        }
      } catch (error) {
        log('Error fetching initial session', error);
        setUser(null);
      }
    };

    getInitialSession();
  }, [initialUser, setLoading, setUser]);

  // 認証状態変更の監視
  useEffect(() => {
    log('Setting up auth state change listener');

    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      log('Auth state changed', { event, userId: session?.user?.id });

      setUser(session?.user ?? null);

      // 特定のイベントに対する追加処理
      switch (event) {
        case 'SIGNED_IN':
          log('User signed in successfully');
          break;
        case 'SIGNED_OUT':
          log('User signed out');
          break;
        case 'TOKEN_REFRESHED':
          log('Token refreshed');
          break;
        default:
          log('Unknown auth event', event);
      }
    });

    return () => {
      log('Cleaning up auth state listener');
      subscription.unsubscribe();
    };
  }, [setUser]);

  // 認証アクション
  const signInWithMagicLink = async (email: string) => {
    log('Sign in with magic link requested', { email });
    return authService.signInWithMagicLink(email);
  };

  const signUpWithMagicLink = async (email: string) => {
    log('Sign up with magic link requested', { email });
    return authService.signUpWithMagicLink(email);
  };

  const signInWithProvider = async (provider: any, options?: any) => {
    log('Sign in with provider requested', { provider });
    return authService.signInWithProvider(provider, options);
  };

  const signOut = async () => {
    log('Sign out requested');
    setLoading(true);
    try {
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    log('Session refresh requested');
    return authService.refreshSession();
  };

  // コンテキスト値
  const contextValue: AuthContextValue = {
    // 状態
    ...authState,

    // アクション
    signInWithMagicLink,
    signUpWithMagicLink,
    signInWithProvider,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// カスタムフック: 認証コンテキストの使用
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

// カスタムフック: 認証状態のみ
export function useAuthState() {
  const { user, loading, isAuthenticated } = useAuthContext();
  return { user, loading, isAuthenticated };
}

// カスタムフック: 認証アクションのみ
export function useAuthActions() {
  const {
    signInWithMagicLink,
    signUpWithMagicLink,
    signInWithProvider,
    signOut,
    refreshSession,
  } = useAuthContext();

  return {
    signInWithMagicLink,
    signUpWithMagicLink,
    signInWithProvider,
    signOut,
    refreshSession,
  };
}

// カスタムフック: 認証チェック
export function useRequireAuth() {
  const { user, loading } = useAuthState();

  useEffect(() => {
    if (!loading && !user && typeof window !== 'undefined') {
      // 未認証の場合はログインページにリダイレクト
      window.location.href = '/auth/login';
    }
  }, [user, loading]);

  return { user, loading };
}

// カスタムフック: ゲスト専用（認証済みの場合はリダイレクト）
export function useGuestOnly() {
  const { user, loading } = useAuthState();

  useEffect(() => {
    if (!loading && user && typeof window !== 'undefined') {
      // 認証済みの場合はダッシュボードにリダイレクト
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  return { user, loading };
}
