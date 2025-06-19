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
import { WelcomeEmailProps } from '../types';
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

export const WelcomeEmail = ({ userName, verificationUrl }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          .animate-fade-in { animation: fadeIn 0.8s ease-out; }
          .animate-pulse { animation: pulse 2s infinite; }
        `}</style>
      </Head>
      <Preview>🌸 トモリエへようこそ！新しい人生の扉が開かれました。素敵な出会いと温かいコミュニティがあなたを待っています。</Preview>
      
      <Body style={main}>
        <Container style={container}>
          {/* ヘッダーセクション */}
          <Section style={header}>
            <div style={logoContainer}>
              <div style={logoBackground}>
                <Text style={logoText}>灯</Text>
              </div>
            </div>
            <Heading style={headerTitle}>トモリエへようこそ</Heading>
            <Text style={headerSubtitle}>心に灯りをともす、新しいコミュニティ</Text>
          </Section>
          
          {/* メインコンテンツ */}
          <Section style={contentSection}>
            <div style={iconContainer}>
              <div style={iconBackground}>
                <Text style={iconText}>🌸</Text>
              </div>
            </div>
            
            <Text style={greeting}>
              {userName}様
            </Text>
            
            <Text style={paragraph}>
              この度は、<strong>トモリエ</strong>にご登録いただき、心より感謝申し上げます。
            </Text>
            
            <div style={highlightBox}>
              <Text style={highlightText}>
                <strong>トモリエ</strong>は、60歳以上の皆様のための特別なコミュニティです。<br />
                新しい出会い、深い友情、そして人生の素晴らしい第二章を一緒に楽しみましょう。
              </Text>
            </div>
            
            <Text style={paragraph}>
              あなたの豊かな経験と知恵が、きっと多くの方々の心を温かくし、<br />
              素敵な繋がりを生み出すことでしょう。
            </Text>
            
            {verificationUrl && (
              <Section style={buttonContainer}>
                <Link href={verificationUrl} style={primaryButton}>
                  ✨ メールアドレスを確認して始める
                </Link>
              </Section>
            )}
            
            {/* ティップスセクション */}
            <div style={tipsContainer}>
              <Text style={tipsTitle}>
                🌟 トモリエで素敵な時間を過ごすために
              </Text>
              <Text style={tipsContent}>
                • プロフィールに趣味や興味を詳しく書いてみましょう<br />
                • 共通の話題でコミュニティに参加してみましょう<br />
                • 温かい言葉で新しい友達に話しかけてみましょう<br />
                • 地域のイベントにも積極的に参加してみましょう
              </Text>
            </div>
            
            <Text style={paragraph}>
              ご不明な点やご質問がございましたら、いつでもお気軽にお声かけください。<br />
              私たちがしっかりとサポートいたします。
            </Text>
          </Section>
          
          {/* フッター */}
          <Section style={footer}>
            <Text style={signature}>
              素敵な出会いと温かい繋がりを心より応援しています<br />
              <strong>トモリエチーム一同</strong>
            </Text>
            <Text style={contact}>
              📧 support@tomorie.jp | 🌐 https://tomorie.jp
            </Text>
            <Text style={unsubscribe}>
              このメールは、トモリエのサービスに関する重要なお知らせです。<br />
              配信停止をご希望の場合は <Link href="#" style={linkStyle}>こちら</Link> からお手続きください。
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
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const header = {
  ...baseStyles.header,
  background: emailColors.gradientPrimary,
  position: 'relative' as const,
};

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: emailSizes.spacing.lg,
};

const logoBackground = {
  ...baseStyles.logo,
  margin: '0 auto',
};

const logoText = {
  ...baseStyles.logoText,
};

const headerTitle = {
  ...baseStyles.headerTitle,
};

const headerSubtitle = {
  ...baseStyles.headerSubtitle,
};

const contentSection = {
  ...contentStyles.section,
};

const iconContainer = {
  ...iconStyles.container,
};

const iconBackground = {
  ...iconStyles.background,
  margin: '0 auto',
};

const iconText = {
  ...iconStyles.large,
};

const greeting = {
  ...contentStyles.greeting,
};

const paragraph = {
  ...contentStyles.paragraph,
};

const highlightBox = {
  ...contentStyles.highlight,
  background: emailColors.gradientSoft,
  border: `2px solid ${emailColors.primaryLight}`,
};

const highlightText = {
  ...contentStyles.highlightText,
};

const buttonContainer = {
  ...buttonStyles.container,
};

const primaryButton = {
  ...buttonStyles.primary,
  background: emailColors.gradientPrimary,
  boxShadow: `0 8px 25px ${emailColors.primary}40`,
};

const tipsContainer = {
  backgroundColor: emailColors.warmLight,
  padding: emailSizes.spacing.xl,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid ${emailColors.warm}30`,
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