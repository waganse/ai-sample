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
import {
  baseStyles,
  buttonStyles,
  contentStyles,
  emailColors,
  emailFonts,
  emailSizes,
  footerStyles,
} from '../styles/modern-email-styles';
import { MatchNotificationEmailProps } from '../types';

export const MatchNotificationEmail = ({
  userName,
  matchedUserName,
  matchedUserAge,
  profileUrl,
}: MatchNotificationEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.15); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
          .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        `}</style>
      </Head>
      <Preview>
        🎉 おめでとうございます！{matchedUserName}さん（{String(matchedUserAge)}
        歳）と素敵なマッチが成立しました。新しい出会いの始まりです！
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* ヘッダーセクション */}
          <Section style={header}>
            <div style={logoContainer}>
              <div style={logoBackground}>
                <Text style={logoText}>灯</Text>
              </div>
            </div>
            <div style={celebrationIcon}>🎉</div>
            <Heading style={headerTitle}>新しいマッチが成立！</Heading>
            <Text style={headerSubtitle}>おめでとうございます</Text>
          </Section>

          {/* メインコンテンツ */}
          <Section style={contentSection}>
            <div style={matchIconContainer}>
              <div style={heartContainer}>
                <Text style={heartIcon}>💕</Text>
              </div>
            </div>

            <Text style={greeting}>{userName}様</Text>

            <Text style={paragraph}>素敵なニュースをお届けします！</Text>

            <div style={matchHighlight}>
              <Text style={matchText}>
                <strong style={matchedUserNameStyle}>
                  {matchedUserName}さん（{matchedUserAge}歳）
                </strong>
                <br />
                とマッチが成立いたしました！
              </Text>
            </div>

            <Text style={paragraph}>
              これは、お互いに「素敵な方だな」と感じた方同士の特別なマッチングです。
              <br />
              きっと素晴らしい出会いになることでしょう。
            </Text>

            <Text style={paragraph}>
              まずは温かいメッセージを送って、
              <br />
              新しい友情の第一歩を踏み出してみませんか？
            </Text>

            <Section style={buttonContainer}>
              <Link href={profileUrl} style={primaryButton}>
                💬 {matchedUserName}さんとお話しする
              </Link>
            </Section>

            {/* ティップスセクション */}
            <div style={tipsContainer}>
              <Text style={tipsTitle}>💡 素敵な会話を始めるコツ</Text>
              <Text style={tipsContent}>
                • プロフィールの共通点に触れてみましょう
                <br />
                • 趣味や興味について質問してみましょう
                <br />
                • 丁寧で温かい言葉を心がけましょう
                <br />
                • 相手の人生経験に敬意を示しましょう
                <br />• 地域の話題で親近感を演出しましょう
              </Text>
            </div>

            <div style={encouragementBox}>
              <Text style={encouragementText}>
                🌸 新しい出会いは人生を豊かにしてくれます。
                <br />
                あなたの温かい心で、素敵な繋がりを育んでください。
              </Text>
            </div>
          </Section>

          {/* フッター */}
          <Section style={footer}>
            <Text style={signature}>
              素敵な出会いを心より応援しています
              <br />
              <strong>トモリエチーム一同</strong>
            </Text>
            <Text style={contact}>
              📧 support@tomorie.jp | 🌐 https://tomorie.jp
            </Text>
            <Text style={unsubscribe}>
              マッチ通知の設定は{' '}
              <Link href="#" style={linkStyle}>
                こちら
              </Link>{' '}
              から変更できます。
              <br />
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
  boxShadow: '0 15px 50px rgba(20, 184, 166, 0.15)',
  overflow: 'hidden',
};

const header = {
  background: `linear-gradient(135deg, ${emailColors.primary} 0%, ${emailColors.primaryDark} 50%, ${emailColors.warm} 100%)`,
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
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
};

const logoText = {
  ...baseStyles.logoText,
};

const celebrationIcon = {
  fontSize: '60px',
  marginBottom: emailSizes.spacing.md,
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
};

const headerTitle = {
  fontSize: emailSizes['4xl'],
  fontWeight: '700',
  color: emailColors.white,
  margin: `${emailSizes.spacing.md} 0 ${emailSizes.spacing.sm} 0`,
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

const headerSubtitle = {
  fontSize: emailSizes.xl,
  color: emailColors.primaryLight,
  margin: '0',
  opacity: '0.95',
  textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
};

const contentSection = {
  ...contentStyles.section,
};

const matchIconContainer = {
  textAlign: 'center' as const,
  margin: `${emailSizes.spacing.xl} 0`,
};

const heartContainer = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  backgroundColor: '#fef7f7',
  borderRadius: emailSizes.radius.full,
  border: `3px solid ${emailColors.primaryLight}`,
  boxShadow: '0 8px 25px rgba(244, 63, 94, 0.3)',
};

const heartIcon = {
  fontSize: '48px',
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

const matchHighlight = {
  background: `linear-gradient(135deg, ${emailColors.primaryUltraLight} 0%, ${emailColors.warmLight} 100%)`,
  padding: `${emailSizes.spacing.xl} ${emailSizes.spacing.lg}`,
  borderRadius: emailSizes.radius.xl,
  border: `3px solid ${emailColors.primaryLight}`,
  margin: `${emailSizes.spacing.xl} 0`,
  textAlign: 'center' as const,
  boxShadow: '0 8px 25px rgba(20, 184, 166, 0.1)',
};

const matchText = {
  fontSize: emailSizes.xl,
  color: emailColors.gray800,
  margin: '0',
  lineHeight: '1.6',
};

const matchedUserNameStyle = {
  color: emailColors.primary,
  fontSize: emailSizes['2xl'],
  fontWeight: '700',
};

const buttonContainer = {
  ...buttonStyles.container,
};

const primaryButton = {
  ...buttonStyles.primary,
  background: `linear-gradient(135deg, ${emailColors.primary} 0%, ${emailColors.warm} 100%)`,
  boxShadow: `0 12px 35px rgba(20, 184, 166, 0.4)`,
  fontSize: emailSizes.xl,
  padding: `${emailSizes.spacing.xl} ${emailSizes.spacing['4xl']}`,
};

const tipsContainer = {
  backgroundColor: emailColors.successLight,
  padding: emailSizes.spacing.xl,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid ${emailColors.success}30`,
  margin: `${emailSizes.spacing.xl} 0`,
};

const tipsTitle = {
  fontSize: emailSizes.lg,
  fontWeight: '600',
  color: emailColors.gray800,
  margin: `0 0 ${emailSizes.spacing.md} 0`,
  display: 'flex',
  alignItems: 'center',
  gap: emailSizes.spacing.sm,
};

const tipsContent = {
  fontSize: emailSizes.base,
  lineHeight: '1.8',
  color: emailColors.gray700,
  margin: '0',
};

const encouragementBox = {
  background: `linear-gradient(135deg, ${emailColors.warmLight} 0%, #fef3c7 100%)`,
  padding: emailSizes.spacing.xl,
  borderRadius: emailSizes.radius.lg,
  border: `2px solid ${emailColors.warm}40`,
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
