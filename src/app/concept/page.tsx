import { Header } from '@/components/common/Header';
import ConceptHero from '@/components/concept/ConceptHero';
import ConceptStory from '@/components/concept/ConceptStory';
import ConceptValues from '@/components/concept/ConceptValues';
import CTA from '@/components/CTA';
import { Footer } from '@/components/common/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: '私たちの想い - Tomorie（トモリエ）',
  description: 'あなたの経験こそ、日本の宝物です。戦後日本を築いてきた皆様へ心からの敬意を込めて。もう一度「社会の主役」となる第二の青春を、Tomorieで始めませんか。',
  keywords: 'Tomorie, トモリエ, 想い, コンセプト, シニア, 60歳以上, 第二の青春, 社会貢献, 出会い, コミュニティ',
};

export default function ConceptPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ConceptHero />
      <ConceptStory />
      <ConceptValues />
      <CTA />
      <Footer />
      <ScrollToTop />
    </main>
  );
}