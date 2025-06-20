import FeatureGrid from './shared/FeatureGrid';
import SectionHeader from './shared/SectionHeader';

export default function Features() {
  const features = [
    {
      icon: '💕',
      title: '同世代の友人との出会い',
      description:
        '共通の趣味や話題で盛り上がれる、価値観の近い仲間と繋がれます。まずはお茶飲み友達から気軽に始められます。',
    },
    {
      icon: '❤️',
      title: '心ときめくパートナーとの出会い',
      description:
        '焦らず、自分のペースでゆっくりと関係を育める、大人のための恋愛を応援します。',
    },
    {
      icon: '🌸',
      title: '毎日が楽しくなる生きがいとの出会い',
      description:
        '新しい趣味の発見や、イベントへの参加を通じて、日常に新しい彩りを加えます。',
    },
  ];

  const differentiators = [
    {
      icon: '💰',
      title: '安心の価格設定',
      description:
        '大手サービスの半額以下で始められる、高コストパフォーマンス。月々わずかな負担で、安心してご利用いただけます。',
    },
    {
      icon: '📱',
      title: '徹底したシンプル設計',
      description:
        '大きな文字と、直感的なボタン操作。「スワイプ」などの難しい操作は一切ありません。誰でも簡単に始められます。',
    },
    {
      icon: '📧',
      title: '万全のサポート体制',
      description:
        'メールでのサポート体制を整備。お困りのことがあれば、いつでもお気軽にご相談ください。24時間365日のパトロール体制も万全です。',
    },
    {
      icon: '🤝',
      title: '友達作りを歓迎する文化',
      description:
        '「まずは、お茶飲み友達から」を公認。趣味のサークル機能や日記機能で、気軽な交流から始められる温かい雰囲気を作ります。',
    },
  ];

  return (
    <>
      <section id="features" className="section-padding bg-white">
        <div className="container-max">
          <SectionHeader
            title="3つの出会いをサポート"
            description={
              <>
                単なる「出会いの場」ではありません。60歳からの人生を、より豊かで彩りあるものにするための
                <span className="font-semibold text-primary-600">
                  「安心なオンライン上の居場所」
                </span>
                を提供します。
              </>
            }
            titleClassName="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            descriptionClassName="text-xl text-gray-600 max-w-3xl mx-auto"
          />

          <FeatureGrid features={features} variant="simple" layout="grid-3" />
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <SectionHeader
            title="他のサービスとの違い"
            description="「真剣だけど、まずは友達から始めたい」「手頃な価格で、安心して使いたい」という最も大きなニーズに応えるサービスです。"
            titleClassName="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            descriptionClassName="text-xl text-gray-600 max-w-3xl mx-auto"
          />

          <FeatureGrid
            features={differentiators}
            variant="card"
            layout="grid-2"
          />
        </div>
      </section>
    </>
  );
}
