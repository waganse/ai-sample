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
  title: 'トモリエ（Tomorie） - 心に灯りをともす大人の出会い',
  description:
    'ご近所での気軽な出会いから始まる、大人のためのマッチングアプリ。成熟した大人の、新しいつながりを応援します。',
  keywords: '大人, お隣さん, ご近所, マッチング, 出会い, 友達, パートナー, 成熟, トモリエ, Tomorie',
  openGraph: {
    title: 'トモリエ（Tomorie） - 心に灯りをともす大人の出会い',
    description: 'ご近所での気軽な出会いから始まる、大人のためのマッチングアプリ。',
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
