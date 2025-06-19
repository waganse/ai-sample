import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { MessageNotificationEmailProps } from '../types';
import { 
  emailColors, 
  emailFonts, 
  emailSizes, 
  baseStyles, 
  contentStyles, 
  buttonStyles, 
  iconStyles,
  footerStyles 
} from '../styles/modern-email-styles';

export const MessageNotificationEmail = ({ 
  userName, 
  senderName, 
  messagePreview,
  chatUrl 
}: MessageNotificationEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          @keyframes messageFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes notification {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .animate-message-float { animation: messageFloat 3s ease-in-out infinite; }
          .animate-notification { animation: notification 2s ease-in-out infinite; }
        `}</style>
      </Head>
      <Preview>💌 {senderName}さんからメッセージが届きました: 「{messagePreview}」素敵な会話を続けましょう！</Preview>
      
      <Body style={main}>
        <Container style={container}>
          {/* ヘッダーセクション */}
          <Section style={header}>
            <div style={logoContainer}>
              <div style={logoBackground}>
                <Text style={logoText}>灯</Text>
              </div>
            </div>
            <div style={notificationIcon}>💌</div>
            <Heading style={headerTitle}>新しいメッセージ</Heading>
            <Text style={headerSubtitle}>温かい言葉が届きました</Text>
          </Section>
          
          {/* メインコンテンツ */}
          <Section style={contentSection}>
            <div style={messageIconContainer}>
              <div style={messageIconBackground}>
                <Text style={messageIconText}>💬</Text>
              </div>
            </div>
            
            <Text style={greeting}>
              {userName}様
            </Text>
            
            <Text style={paragraph}>
              嬉しいお知らせです！
            </Text>
            
            <div style={senderHighlight}>
              <Text style={senderText}>
                <strong style={senderNameStyle}>{senderName}さん</strong><br />
                からメッセージが届きました
              </Text>
            </div>
            
            {/* メッセージプレビュー */}
            <div style={messagePreviewBox}>
              <Text style={messageLabel}>📝 メッセージ内容</Text>
              <div style={messageQuote}>
                <Text style={messageContent}>
                  「{messagePreview}」
                </Text>
              </div>
            </div>
            
            <Text style={paragraph}>
              素敵な会話の続きを楽しみませんか？<br />
              温かい言葉での交流が、きっと心を豊かにしてくれるでしょう。
            </Text>
            
            <Section style={buttonContainer}>
              <Link href={chatUrl} style={primaryButton}>
                💬 返信する
              </Link>
            </Section>
            
            {/* 会話のティップス */}
            <div style={tipsContainer}>
              <Text style={tipsTitle}>
                🌟 心温まる会話のコツ
              </Text>
              <Text style={tipsContent}>
                • 相手の話に共感の気持ちを示しましょう<br />
                • 自分の経験や思い出を交えて話してみましょう<br />
                • 質問を通して相手への関心を表現しましょう<br />
                • 地域の話題で親近感を深めましょう<br />
                • 丁寧で温かい言葉を心がけましょう
              </Text>
            </div>
            
            <div style={encouragementBox}>
              <Text style={encouragementText}>
                💫 一期一会の出会いを大切に。<br />
                あなたの言葉が、相手の心に温かい灯りを灯します。
              </Text>
            </div>
          </Section>
          
          {/* フッター */}
          <Section style={footer}>
            <Text style={signature}>
              素敵な会話を心より応援しています<br />
              <strong>トモリエチーム一同</strong>
            </Text>
            <Text style={contact}>
              📧 support@tomorie.jp | 🌐 https://tomorie.jp
            </Text>
            <Text style={unsubscribe}>
              メッセージ通知の設定は <Link href="#" style={linkStyle}>こちら</Link> から変更できます。<br />
              このメールに心当たりがない場合は、お手数ですがご連絡ください。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// スタイル定義
const main = {
  backgroundColor: emailColors.gray50,
  fontFamily: emailFonts.primary,
  padding: '20px 0',
};

const container = {
  ...baseStyles.container,
  borderRadius: emailSizes.radius.xl,
  boxShadow: '0 12px 40px rgba(16, 185, 129, 0.15)',
  overflow: 'hidden',
};

const header = {
  background: `linear-gradient(135deg, ${emailColors.primary} 0%, ${emailColors.success} 100%)`,
  padding: `${emailSizes.spacing['2xl']} ${emailSizes.spacing.xl}`,
  textAlign: 'center' as const,
  position: 'relative' as const,
};

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: emailSizes.spacing.md,
};

const logoBackground = {
  ...baseStyles.logo,
  margin: '0 auto',
  backgroundColor: emailColors.white,
  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
};

const logoText = {
  ...baseStyles.logoText,
};

const notificationIcon = {
  fontSize: '56px',
  marginBottom: emailSizes.spacing.md,
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
};

const headerTitle = {
  fontSize: emailSizes['3xl'],
  fontWeight: '700',
  color: emailColors.white,
  margin: `${emailSizes.spacing.md} 0 ${emailSizes.spacing.sm} 0`,
  textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
};

const headerSubtitle = {
  fontSize: emailSizes.lg,
  color: emailColors.primaryLight,
  margin: '0',
  opacity: '0.95',
  textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
};

const contentSection = {
  ...contentStyles.section,
};

const messageIconContainer = {
  textAlign: 'center' as const,
  margin: `${emailSizes.spacing.xl} 0`,
};

const messageIconBackground = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '90px',
  height: '90px',
  backgroundColor: emailColors.successLight,
  borderRadius: emailSizes.radius.full,
  border: `3px solid ${emailColors.success}`,
  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
};

const messageIconText = {
  fontSize: '42px',
  lineHeight: '1',
};

const greeting = {
  ...contentStyles.greeting,
  textAlign: 'center' as const,
  color: emailColors.primary,
  fontSize: emailSizes['2xl'],
};

const paragraph = {
  ...contentStyles.paragraph,
  textAlign: 'center' as const,
};

const senderHighlight = {
  background: `linear-gradient(135deg, ${emailColors.primaryUltraLight} 0%, ${emailColors.successLight} 100%)`,
  padding: `${emailSizes.spacing.lg} ${emailSizes.spacing.xl}`,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid ${emailColors.primaryLight}`,
  margin: `${emailSizes.spacing.xl} 0`,
  textAlign: 'center' as const,
  boxShadow: '0 6px 20px rgba(20, 184, 166, 0.1)',
};

const senderText = {
  fontSize: emailSizes.lg,
  color: emailColors.gray800,
  margin: '0',
  lineHeight: '1.6',
};

const senderNameStyle = {
  color: emailColors.primary,
  fontSize: emailSizes.xl,
  fontWeight: '700',
};

const messagePreviewBox = {
  backgroundColor: emailColors.white,
  border: `3px solid ${emailColors.gray200}`,
  borderRadius: emailSizes.radius.lg,
  padding: emailSizes.spacing.xl,
  margin: `${emailSizes.spacing.xl} 0`,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
};

const messageLabel = {
  fontSize: emailSizes.base,
  fontWeight: '600',
  color: emailColors.gray600,
  margin: `0 0 ${emailSizes.spacing.md} 0`,
  textAlign: 'center' as const,
};

const messageQuote = {
  backgroundColor: emailColors.gray50,
  borderLeft: `4px solid ${emailColors.primary}`,
  borderRadius: emailSizes.radius.md,
  padding: emailSizes.spacing.lg,
  position: 'relative' as const,
};

const messageContent = {
  fontSize: emailSizes.lg,
  fontStyle: 'italic',
  color: emailColors.gray800,
  lineHeight: '1.7',
  margin: '0',
  textAlign: 'center' as const,
};

const buttonContainer = {
  ...buttonStyles.container,
};

const primaryButton = {
  ...buttonStyles.primary,
  background: `linear-gradient(135deg, ${emailColors.primary} 0%, ${emailColors.success} 100%)`,
  boxShadow: `0 10px 30px rgba(20, 184, 166, 0.4)`,
  fontSize: emailSizes.lg,
  padding: `${emailSizes.spacing.lg} ${emailSizes.spacing['3xl']}`,
};

const tipsContainer = {
  backgroundColor: '#f0f9ff',
  padding: emailSizes.spacing.xl,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid #38bdf8`,
  margin: `${emailSizes.spacing.xl} 0`,
};

const tipsTitle = {
  fontSize: emailSizes.lg,
  fontWeight: '600',
  color: emailColors.gray800,
  margin: `0 0 ${emailSizes.spacing.md} 0`,
};

const tipsContent = {
  fontSize: emailSizes.base,
  lineHeight: '1.8',
  color: emailColors.gray700,
  margin: '0',
};

const encouragementBox = {
  background: `linear-gradient(135deg, #fef3c7 0%, ${emailColors.warmLight} 100%)`,
  padding: emailSizes.spacing.xl,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid ${emailColors.warm}50`,
  textAlign: 'center' as const,
  margin: `${emailSizes.spacing.xl} 0`,
};

const encouragementText = {
  fontSize: emailSizes.lg,
  fontWeight: '500',
  color: emailColors.gray800,
  margin: '0',
  lineHeight: '1.6',
};

const footer = {
  ...footerStyles.container,
};

const signature = {
  ...footerStyles.signature,
  color: emailColors.primary,
};

const contact = {
  ...footerStyles.contact,
};

const unsubscribe = {
  ...footerStyles.unsubscribe,
};

const linkStyle = {
  ...footerStyles.link,
};