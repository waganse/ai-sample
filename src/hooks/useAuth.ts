'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

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
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signInWithEmail = async (email: string) => {
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

      // 既存ユーザーにのみOTPを送信
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signUpWithEmail = async (email: string) => {
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

      // 新規ユーザーのOTP送信
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // 新規ユーザー作成を許可
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

  const signInWithProvider = async (provider: 'google' | 'facebook' | 'line') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider === 'line' ? 'line' : provider,
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

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    return { data, error };
  };

  return {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithProvider,
    signOut,
    verifyOtp,
  };
}