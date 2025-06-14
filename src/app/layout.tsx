import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: '縁日和 - 60歳からの新しい出会い',
  description:
    '人生100年時代、心でつながる、第二の仲間を。60歳以上の方のための安心なマッチングアプリ。',
  keywords: '60歳以上, シニア, マッチング, 出会い, 友達, パートナー, 安心',
  openGraph: {
    title: '縁日和 - 60歳からの新しい出会い',
    description: '人生100年時代、心でつながる、第二の仲間を。',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${notoSansJP.className}`}>{children}</body>
    </html>
  );
}
