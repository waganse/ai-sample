import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Service Role Keyを使用したSupabaseクライアント
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // バリデーション
    if (!email) {
      return NextResponse.json(
        { error: 'メールアドレスが必要です' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // Prismaのusersテーブルから検索
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, auth_id, created_at')
      .eq('email', email)
      .maybeSingle();

    if (userError && userError.code !== 'PGRST116') {
      console.error('User check error:', userError);
      return NextResponse.json(
        { error: 'ユーザー確認に失敗しました' },
        { status: 500 }
      );
    }

    // ユーザーが存在しない場合
    if (!user) {
      return NextResponse.json({
        exists: false,
        confirmed: false,
        message: 'ユーザーが見つかりませんでした',
      });
    }

    // ユーザーが存在する場合
    // Prismaのusersテーブルにレコードがある = 登録完了 & メール確認済みと仮定
    // （Supabase Authでメール確認後にusersテーブルにレコードが作成される想定）
    return NextResponse.json({
      exists: true,
      confirmed: true,
      message: 'ユーザーが存在し、確認済みです',
    });
  } catch (error) {
    console.error('Check user error:', error);

    return NextResponse.json(
      {
        error: 'ユーザー確認処理でエラーが発生しました',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
