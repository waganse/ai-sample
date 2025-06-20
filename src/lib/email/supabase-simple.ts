import { createClient } from '@/lib/supabase/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabase = createClient();

// Service Role用クライアント（サーバーサイドでのみ使用）
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Supabase Authの基本メール送信機能

// 既存ユーザーのみにマジックリンクを送信
export async function sendMagicLinkEmail(email: string, redirectTo?: string) {
  try {
    // まず、ユーザーが存在するかチェック
    const { data: existingUser, error: userError } = await supabaseAdmin
      .from('auth.users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      throw userError;
    }

    if (!existingUser) {
      throw new Error(
        'このメールアドレスは登録されていません。先にアカウントを作成してください。'
      );
    }

    // 既存ユーザーにのみマジックリンクを送信
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          redirectTo || `${window.location.origin}/auth/callback`,
        shouldCreateUser: false, // 新規ユーザー作成を防ぐ
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Magic link email error:', error);
    throw error;
  }
}

// 新規ユーザー用のサインアップメール送信
export async function sendSignupEmail(
  email: string,
  password?: string,
  redirectTo?: string
) {
  try {
    let data, error;

    if (password) {
      // パスワード付きサインアップ
      ({ data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            redirectTo || `${window.location.origin}/auth/callback`,
          data: {
            user_type: 'senior',
            registration_source: 'tomorie_app',
          },
        },
      }));
    } else {
      // パスワードレスサインアップ（OTP）
      ({ data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            redirectTo || `${window.location.origin}/auth/callback`,
          shouldCreateUser: true, // 新規ユーザー作成を許可
          data: {
            user_type: 'senior',
            registration_source: 'tomorie_app',
          },
        },
      }));
    }

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Signup email error:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Password reset email error:', error);
    throw error;
  }
}

// サーバーサイドでの管理者機能
export async function sendAdminEmail(
  email: string,
  type: 'invite' | 'welcome'
) {
  try {
    if (type === 'invite') {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'invite',
        email,
        options: {
          data: {
            admin_invite: true,
            email_type: type,
          },
        },
      });
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'signup',
        email,
        password: 'temp-password-' + Date.now(),
        options: {
          data: {
            admin_invite: true,
            email_type: type,
          },
        },
      });
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Admin email error:', error);
    throw error;
  }
}

// カスタム通知メール（データベーストリガー使用）
export async function createEmailNotification(
  userId: string,
  type: 'match' | 'message' | 'community_invite',
  data: Record<string, any>
) {
  try {
    const { data: notification, error } = await supabase
      .from('email_notifications')
      .insert({
        user_id: userId,
        type,
        data,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // データベーストリガーが実際のメール送信を処理
    return notification;
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
}
