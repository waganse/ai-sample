export interface EmailTemplateProps {
  userName: string;
  userEmail: string;
}

export interface WelcomeEmailProps extends EmailTemplateProps {
  verificationUrl?: string;
}

export interface MatchNotificationEmailProps extends EmailTemplateProps {
  matchedUserName: string;
  matchedUserAge: number;
  profileUrl: string;
}

export interface MessageNotificationEmailProps extends EmailTemplateProps {
  senderName: string;
  messagePreview: string;
  chatUrl: string;
}

export interface CommunityInviteEmailProps extends EmailTemplateProps {
  communityName: string;
  inviterName: string;
  communityUrl: string;
}

export interface EventReminderEmailProps extends EmailTemplateProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation?: string;
  eventUrl: string;
}

export interface PasswordResetEmailProps extends EmailTemplateProps {
  resetUrl: string;
  expiryTime: string;
}

export type EmailType =
  | 'welcome'
  | 'match-notification'
  | 'message-notification'
  | 'community-invite'
  | 'event-reminder'
  | 'password-reset';

export interface EmailConfig {
  from: string;
  replyTo?: string;
  subject: string;
  template: EmailType;
}
