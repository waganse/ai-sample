import Header from '@/components/Header';
import ConceptHero from '@/components/concept/ConceptHero';
import ConceptStory from '@/components/concept/ConceptStory';
import ConceptValues from '@/components/concept/ConceptValues';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: '私たちの想い - Otonari',
  description: '人生の先輩たちが輝く国は、きっともっと強くなる。大人のお隣さんとして、成熟した大人の新しいつながりを応援する、Otonariの想いをお伝えします。',
  keywords: 'Otonari, 想い, コンセプト, 大人, お隣さん, ご近所, 第二の青春, 出会い',
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