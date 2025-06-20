import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
  template_type?: string;
  template_data?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      to,
      subject,
      html,
      text,
      template_type,
      template_data,
    }: EmailRequest = await req.json();

    // バリデーション
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // メールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Supabaseクライアントの初期化
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // HTMLテンプレートの準備
    let emailHtml = html;

    // テンプレートタイプに応じてHTMLを生成
    if (template_type && template_data) {
      emailHtml = generateEmailTemplate(template_type, template_data);
    }

    // メール送信のログを記録
    const { error: logError } = await supabaseClient.from('email_logs').insert({
      to_email: to,
      subject,
      template_type: template_type || 'custom',
      sent_at: new Date().toISOString(),
      status: 'pending',
    });

    if (logError) {
      console.error('Error logging email:', logError);
    }

    // 実際のメール送信処理
    // ここではSupabase AuthのOTP機能を使用してメールを送信
    const { data, error } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: to,
      options: {
        data: {
          custom_email: true,
          subject,
          html: emailHtml,
          text: text || extractTextFromHtml(emailHtml),
          template_type,
        },
      },
    });

    if (error) {
      throw error;
    }

    // 成功ログの更新
    await supabaseClient
      .from('email_logs')
      .update({ status: 'sent' })
      .eq('to_email', to)
      .eq('sent_at', new Date().toISOString());

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        data,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Email sending error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// テンプレート生成関数
function generateEmailTemplate(
  type: string,
  data: Record<string, any>
): string {
  const baseStyle = `
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; margin-bottom: 30px; }
      .logo { width: 120px; height: 40px; }
      .content { background: #f8f9fa; padding: 30px; border-radius: 8px; }
      .button { background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
      .footer { margin-top: 30px; text-align: center; color: #666; font-size: 14px; }
    </style>
  `;

  switch (type) {
    case 'welcome':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>トモリエへようこそ！</h1>
            </div>
            <div class="content">
              <p>${data.userName}様</p>
              <p>この度は、トモリエにご登録いただき、誠にありがとうございます。</p>
              <p>トモリエは、60歳以上の方々のための特別なコミュニティです。</p>
              ${data.verificationUrl ? `<p><a href="${data.verificationUrl}" class="button">メールアドレスを確認する</a></p>` : ''}
            </div>
            <div class="footer">
              <p>トモリエチーム</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'match':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 新しいマッチが成立しました！</h1>
            </div>
            <div class="content">
              <p>${data.userName}様</p>
              <p><strong>${data.matchedUserName}さん（${data.matchedUserAge}歳）</strong>とマッチが成立いたしました。</p>
              <p><a href="${data.profileUrl}" class="button">お話しする</a></p>
            </div>
            <div class="footer">
              <p>トモリエチーム</p>
            </div>
          </div>
        </body>
        </html>
      `;

    default:
      return data.html || '<p>メールの内容</p>';
  }
}

// HTMLからテキストを抽出する簡単な関数
function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
