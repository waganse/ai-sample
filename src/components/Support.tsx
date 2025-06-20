import FAQSection from './shared/FAQSection';
import FeatureGrid from './shared/FeatureGrid';
import SectionHeader from './shared/SectionHeader';

export default function Support() {
  const supportFeatures = [
    {
      icon: '📧',
      title: 'メールサポート',
      description:
        '操作方法がわからない時、困った時はメールでサポートします。お問い合わせフォームからいつでもご相談いただけます。',
      details: ['24時間受付', '営業日内に返信', 'サポートフォーム完備'],
    },
    {
      icon: '🛡️',
      title: '安全パトロール',
      description:
        '不適切な利用者の監視・排除を徹底しています。身分証明書による本人確認も行っています。',
      details: ['24時間365日監視体制', '身分証明書確認', '通報システム'],
    },
    {
      icon: '📚',
      title: '使い方ガイド',
      description:
        '図解入りのガイドブックを無料でお送りします。スマートフォンが苦手な方でも安心です。',
      details: ['大きな文字でわかりやすく説明', '図解入りガイド', '無料配布'],
    },
  ];

  return (
    <>
      <section id="support" className="section-padding bg-white">
        <div className="container-max">
          <SectionHeader
            title="充実のサポート体制"
            description="初めての方でも安心してご利用いただけるよう、万全のサポート体制を整えています。"
            titleClassName="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            descriptionClassName="text-xl text-gray-600 max-w-3xl mx-auto"
          />

          <FeatureGrid
            features={supportFeatures}
            variant="card"
            layout="grid-3"
            className=""
            itemClassName="bg-gray-50"
          />
        </div>
      </section>

      <FAQSection
        variant="compact"
        sectionId="faq"
        className="section-padding bg-gray-50 px-3 md:px-5"
        backgroundClassName="bg-white"
      />
    </>
  );
}
