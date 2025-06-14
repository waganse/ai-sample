import Header from '@/components/Header';
import EnhancedHero from '@/components/EnhancedHero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Support from '@/components/Support';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <EnhancedHero />
      <Features />
      <Pricing />
      {/* <Testimonials /> */}
      <Support />
      <CTA />
      <Footer />
    </main>
  );
}
