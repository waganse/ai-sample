'use client';

// 新しいuseAuthフック - AuthContextを使用するシンプル版
export {
  useAuthContext as useAuth,
  useAuthActions,
  useAuthState,
  useGuestOnly,
  useRequireAuth,
} from '@/contexts/AuthContext';

// 後方互換性のためのラッパー関数
import { useAuthContext } from '@/contexts/AuthContext';

// 従来のuseAuthフックと同じインターフェースを提供
export function useAuthLegacy() {
  const context = useAuthContext();

  return {
    user: context.user,
    loading: context.loading,
    signInWithEmail: context.signInWithEmail,
    signUpWithEmail: context.signUpWithEmail,
    signInWithProvider: context.signInWithProvider,
    verifyOtp: context.verifyOtp,
    signOut: context.signOut,
  };
}
