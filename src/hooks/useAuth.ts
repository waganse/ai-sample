'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { OAuthProvider } from '@/config/brandColors';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 初回認証状態取得
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signInWithMagicLink = async (email: string) => {
    try {
      // APIエンドポイント経由でユーザー存在確認
      const response = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'ユーザー確認に失敗しました');
      }

      if (!result.exists) {
        throw new Error('このメールアドレスは登録されていません。先にアカウントを作成してください。');
      }

      if (!result.confirmed) {
        throw new Error('メールアドレスがまだ確認されていません。登録時のメールをご確認ください。');
      }

      // 既存ユーザーにMagic Linkを送信
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signUpWithMagicLink = async (email: string) => {
    try {
      // APIエンドポイント経由でユーザー存在確認
      const response = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'ユーザー確認に失敗しました');
      }

      if (result.exists) {
        if (result.confirmed) {
          throw new Error('このメールアドレスは既に登録済みです。ログインページからサインインしてください。');
        } else {
          throw new Error('このメールアドレスは既に登録されていますが、メール確認が完了していません。登録時のメールをご確認ください。');
        }
      }

      // 新規ユーザーのMagic Link送信
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // 新規ユーザー作成を許可
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            user_type: 'senior',
            registration_source: 'tomorie_app',
          }
        },
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithProvider = async (provider: OAuthProvider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signInWithMagicLink,
    signUpWithMagicLink,
    signInWithProvider,
    signOut,
  };
}