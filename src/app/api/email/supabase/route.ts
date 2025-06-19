import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaEdgeFunction, sendNotificationEmail } from '@/lib/email/supabase-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, type, userId, data } = body;

    // 通知ベースのメール送信
    if (type && userId) {
      const result = await sendNotificationEmail(userId, type, {
        to,
        subject,
        html,
        text,
        ...data
      });

      return NextResponse.json({
        success: true,
        notificationId: result.id,
        message: 'Notification created successfully'
      });
    }

    // Edge Function経由でのメール送信
    if (to && subject && html) {
      const result = await sendEmailViaEdgeFunction({
        to,
        subject,
        html,
        text
      });

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Email sent via Edge Function'
      });
    }

    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Supabase email API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}