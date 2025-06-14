import FAQSection from '../shared/FAQSection';

export default function ServiceFAQ() {
  return (
    <FAQSection
      showAnimations={true}
      variant="full"
      sectionId="faq"
      className="py-10 md:py-20 bg-white px-3 md:px-5"
    />
  );
}
