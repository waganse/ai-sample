import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service Role Keyを使用してSupabaseクライアントを作成
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface SupabaseEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Supabase Authを使用したメール送信
export async function sendSupabaseEmail(params: SupabaseEmailParams) {
  try {
    // Supabase Authのカスタムメール送信
    // これはSupabase Authの機能を使用します
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email: params.to,
      password: 'temp-password-' + Date.now(), // 一時的なパスワード、OTPで上書きされる
      options: {
        // カスタムデータを含める
        data: {
          custom_email: true,
          email_subject: params.subject,
          email_html: params.html,
          email_text: params.text,
        }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Supabase email error:', error);
    throw error;
  }
}

// Edge Functions経由でメール送信する方法
export async function sendEmailViaEdgeFunction(params: SupabaseEmailParams) {
  try {
    const { data, error } = await supabaseAdmin.functions.invoke('send-email', {
      body: {
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Edge function email error:', error);
    throw error;
  }
}

// ウェルカムメール送信（Supabase Auth OTP使用）
export async function sendWelcomeEmailWithOTP(email: string, userName: string) {
  try {
    // OTPメールを送信
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        data: {
          user_name: userName,
          email_type: 'welcome',
        }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Welcome email OTP error:', error);
    throw error;
  }
}

// データベース通知を使用したメール送信
export async function sendNotificationEmail(
  userId: string,
  type: 'match' | 'message' | 'community',
  data: Record<string, any>
) {
  try {
    // 通知レコードをデータベースに挿入
    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        data,
        email_sent: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // データベーストリガーまたはバックグラウンドジョブが
    // この通知を処理してメールを送信します
    return notification;
  } catch (error) {
    console.error('Notification email error:', error);
    throw error;
  }
}