import Header from '@/components/Header';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceFeatures from '@/components/service/ServiceFeatures';
import ServiceProcess from '@/components/service/ServiceProcess';
import ServicePricing from '@/components/service/ServicePricing';
import ServiceSafety from '@/components/service/ServiceSafety';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

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
