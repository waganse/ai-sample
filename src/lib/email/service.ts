import { Resend } from 'resend';
import { render } from '@react-email/render';
import { WelcomeEmail } from './templates/WelcomeEmail';
import { MatchNotificationEmail } from './templates/MatchNotificationEmail';
import { MessageNotificationEmail } from './templates/MessageNotificationEmail';
import {
  EmailType,
  WelcomeEmailProps,
  MatchNotificationEmailProps,
  MessageNotificationEmailProps,
} from './types';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = 'トモリエ <onboarding@resend.dev>';
const REPLY_TO_EMAIL = 'support@resend.dev';

export interface SendEmailParams {
  to: string;
  type: EmailType;
  props: any;
}

export async function sendEmail({ to, type, props }: SendEmailParams) {
  try {
    if (!resend) {
      throw new Error('Email service not configured. RESEND_API_KEY is missing.');
    }

    let subject: string;
    let html: string;

    switch (type) {
      case 'welcome':
        subject = 'トモリエへようこそ！アカウント確認のお願い';
        html = await render(WelcomeEmail(props as WelcomeEmailProps));
        break;

      case 'match-notification':
        subject = '🎉 新しいマッチが成立しました！';
        html = await render(
          MatchNotificationEmail(props as MatchNotificationEmailProps)
        );
        break;

      case 'message-notification':
        const messageProps = props as MessageNotificationEmailProps;
        subject = `${messageProps.senderName}さんからメッセージが届きました`;
        html = await render(MessageNotificationEmail(messageProps));
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      replyTo: REPLY_TO_EMAIL,
    });

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// ウェルカムメール送信
export async function sendWelcomeEmail(props: WelcomeEmailProps) {
  return sendEmail({
    to: props.userEmail,
    type: 'welcome',
    props,
  });
}

// マッチ通知メール送信
export async function sendMatchNotificationEmail(
  props: MatchNotificationEmailProps
) {
  return sendEmail({
    to: props.userEmail,
    type: 'match-notification',
    props,
  });
}

// メッセージ通知メール送信
export async function sendMessageNotificationEmail(
  props: MessageNotificationEmailProps
) {
  return sendEmail({
    to: props.userEmail,
    type: 'message-notification',
    props,
  });
}

// メール送信のテスト用関数
export async function testEmailSending() {
  try {
    const testEmail = await sendWelcomeEmail({
      userName: 'テスト太郎',
      userEmail: 'test@example.com',
      verificationUrl: 'https://tomorie.jp/verify?token=test123',
    });

    console.log('Test email sent:', testEmail);
    return testEmail;
  } catch (error) {
    console.error('Test email failed:', error);
    throw error;
  }
}
