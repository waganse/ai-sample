import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import CTA from '@/components/CTA';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import ServiceFeatures from '@/components/service/ServiceFeatures';
import ServiceHero from '@/components/service/ServiceHero';
import ServicePricing from '@/components/service/ServicePricing';
import ServiceProcess from '@/components/service/ServiceProcess';
import ServiceSafety from '@/components/service/ServiceSafety';

export default function ServicePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServiceHero />
      <ServiceFeatures />
      <ServiceProcess />
      <ServicePricing />
      <ServiceSafety />
      <ServiceFAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
