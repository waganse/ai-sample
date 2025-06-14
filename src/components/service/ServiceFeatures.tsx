import SectionHeader from '../shared/SectionHeader';
import FeatureGrid from '../shared/FeatureGrid';

export default function ServiceFeatures() {
  const features = [
    {
      icon: '👥',
      title: '年齢層に特化',
      description: '60歳以上の方々のためのコミュニティ。同世代だからこそ分かり合える関係を。',
      details: ['同世代の価値観', '豊富な人生経験', '落ち着いた関係性'],
      badge: '同世代コミュニティ',
    },
    {
      icon: '🛡️',
      title: '安心・安全',
      description: '身元確認と24時間監視システムで、安心してご利用いただけます。',
      details: ['身元確認必須', '24時間監視', '報告・ブロック機能'],
      badge: '安心の管理体制',
    },
    {
      icon: '📱',
      title: 'シンプル操作',
      description: 'スマートフォンが苦手な方でも直感的に操作できるシンプル設計。',
      details: ['大きな文字', '分かりやすいボタン', 'サポート充実'],
      badge: '誰でも簡単操作',
    },
    {
      icon: '💰',
      title: 'リーズナブル',
      description: '月額980円から。他社の半額以下で、質の高いサービスをご提供。',
      details: ['月額980円', '7日間無料体験'],
      badge: 'コストパフォーマンス',
    },
    {
      icon: '🤝',
      title: '多様な出会い',
      description: 'パートナー探しから友人作りまで、あなたの目的に合った出会いを。',
      details: ['パートナー探し', '友人作り', '趣味の仲間'],
      badge: '豊富な出会いの形',
    },
    {
      icon: '💌',
      title: '丁寧なサポート',
      description: '専門スタッフによるメールサポート。使い方から出会いまで親身にサポート。',
      details: ['専門スタッフ対応', '使い方ガイド', '出会いのアドバイス'],
      badge: '手厚いサポート',
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-white px-3 md:px-5">
      <div className="container-max">
        <SectionHeader
          badge={{ icon: '✨', text: '縁日和の特徴' }}
          title="なぜ縁日和が選ばれるのか"
          description={
            <>
              60歳以上の方々のニーズに特化した、
              <br className="md:hidden" />
              安心で使いやすいマッチングサービス
            </>
          }
        />

        <FeatureGrid features={features} variant="detailed" layout="grid-3" showAnimations={true} />
      </div>
    </section>
  );
}
