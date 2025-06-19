import { NextRequest, NextResponse } from 'next/server';
import { testEmailSending } from '@/lib/email/service';

export async function POST(request: NextRequest) {
  // 開発環境でのみ実行を許可
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Test endpoint only available in development' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // テストメール送信
    const result = await testEmailSending();

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Test endpoint only available in development' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: 'Email test endpoint',
    usage: 'POST /api/email/test with { "email": "test@example.com" }',
    environment: process.env.NODE_ENV,
    resendConfigured: !!process.env.RESEND_API_KEY
  });
}