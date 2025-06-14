'use client';

import { useEffect, useState } from 'react';

export default function ServiceSafety() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const safetyFeatures = [
    {
      icon: '🆔',
      title: '本人確認必須',
      description: '全ユーザーに身分証明書による本人確認を義務付け',
      details: [
        '運転免許証・パスポートなど公的書類',
        '専門スタッフによる目視確認',
        '確認済みマークで一目で分かる',
      ],
    },
    {
      icon: '👮',
      title: '24時間監視',
      description: 'AIと人による24時間体制での監視システム',
      details: ['不適切な投稿の自動検出', '専門スタッフによる巡回', '怪しい行動パターンの分析'],
    },
    {
      icon: '🚫',
      title: '報告・ブロック機能',
      description: '迷惑な相手は簡単に報告・ブロックできます',
      details: ['ワンタップで報告・ブロック', '迅速な対応と調査', '悪質ユーザーの永久追放'],
    },
    {
      icon: '🔒',
      title: 'プライバシー保護',
      description: '個人情報の厳重な管理とプライバシー保護',
      details: ['SSL暗号化通信', '個人情報の厳重管理', '第三者への情報提供なし'],
    },
  ];

  const safetyTips = [
    {
      icon: '☕',
      title: '初回は公共の場で',
      tip: '初めてお会いする際は、カフェやレストランなど人が多い場所を選びましょう。',
    },
    {
      icon: '👥',
      title: '信頼できる人に相談',
      tip: '家族や友人に相手のことを話し、アドバイスをもらうことをお勧めします。',
    },
    {
      icon: '📱',
      title: '連絡先は慎重に',
      tip: '電話番号や住所などの個人情報は、十分に信頼関係ができてから交換しましょう。',
    },
    {
      icon: '💰',
      title: 'お金の話に注意',
      tip: 'お金の貸し借りや投資の話が出たら、詐欺の可能性があります。注意してください。',
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 px-3 md:px-5">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-6">
            🛡️ 安心・安全への取り組み
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            あなたの安全を第一に
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            60歳以上の方々が安心してご利用いただけるよう、
            <br className="md:hidden" />
            厳重なセキュリティ体制を整えています
          </p>
        </div>

        {/* Safety Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Safety Statistics */}
        {/* <div className="bg-white rounded-3xl p-8 shadow-xl mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">安全性への実績</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">本人確認実施率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">0.1%</div>
              <div className="text-gray-600">違反ユーザー率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24時間</div>
              <div className="text-gray-600">監視体制</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
              <div className="text-gray-600">ユーザー満足度</div>
            </div>
          </div>
        </div> */}

        {/* Safety Tips */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            安全にご利用いただくためのコツ
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{tip.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        {/* <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-4">🚨</div>
          <h3 className="text-2xl font-bold mb-4">緊急時のサポート</h3>
          <p className="text-lg mb-6 opacity-90">
            何かお困りのことがございましたら、24時間いつでもお気軽にご相談ください
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              緊急サポートに連絡
            </button>
            <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-30 transition-colors">
              ヘルプセンター
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
