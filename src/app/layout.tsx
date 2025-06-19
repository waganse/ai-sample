import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'トモリエ（Tomorie） - 心に灯りをともす',
  description: '人生経験豊富な大人世代のための新しい出会いとコミュニティの場所。60歳からの素敵な出会いとコミュニティをサポートします。',
  keywords: ['シニア', '出会い', 'マッチング', 'コミュニティ', '60代', '70代', '大人世代'],
  openGraph: {
    title: 'トモリエ（Tomorie） - 心に灯りをともす',
    description: '人生経験豊富な大人世代のための新しい出会いとコミュニティの場所',
    type: 'website',
    locale: 'ja_JP',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
