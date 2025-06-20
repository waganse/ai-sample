import { sendEmail } from '@/lib/email/service';
import { EmailType } from '@/lib/email/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, type, props } = body;

    // バリデーション
    if (!to || !type || !props) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type, props' },
        { status: 400 }
      );
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // サポートされているメールタイプの確認
    const supportedTypes: EmailType[] = [
      'welcome',
      'match-notification',
      'message-notification',
    ];

    if (!supportedTypes.includes(type)) {
      return NextResponse.json(
        { error: `Unsupported email type: ${type}` },
        { status: 400 }
      );
    }

    // メール送信実行
    const result = await sendEmail({ to, type, props });

    return NextResponse.json({
      success: true,
      messageId: result.data?.id,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
