'use client';

import { useEffect, useState } from 'react';

export default function ServiceProcess() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 共通の準備フェーズ
  const preparationSteps = [
    {
      number: '01',
      title: '無料会員登録',
      description: 'メールアドレスと基本情報だけで簡単登録。7日間は完全無料でお試しいただけます。',
      icon: '📝',
      time: '約3分',
      details: ['メールアドレス登録', '基本プロフィール入力', '写真アップロード（任意）'],
    },
    {
      number: '02',
      title: 'プロフィール作成',
      description:
        'あなたの魅力を伝えるプロフィールを作成。趣味や価値観を詳しく書くことで良い出会いに。',
      icon: '👤',
      time: '約10分',
      details: ['自己紹介文作成', '趣味・興味の選択', '理想の相手像を記入'],
    },
  ];

  // 個人での出会いフロー
  const personalSteps = [
    {
      number: '03',
      title: '相手を探す',
      description: '条件検索やおすすめ機能で気になる方を見つけましょう。焦らずゆっくりと。',
      icon: '🔍',
      time: '自由に',
      details: ['条件検索', 'おすすめ表示', 'プロフィール閲覧'],
    },
    {
      number: '04',
      title: 'メッセージ交換',
      description:
        '気になる方が見つかったら「いいね」を送信。マッチングしたらメッセージのやり取りを。',
      icon: '💌',
      time: '自由に',
      details: ['いいね送信', 'メッセージ交換', '関係を深める'],
    },
    {
      number: '05',
      title: '実際にお会いする',
      description: 'メッセージで親しくなったら、安全な場所でのお食事やお茶から始めましょう。',
      icon: '☕',
      time: 'お互いのペース',
      details: ['安全な場所で会う', 'お食事やお茶', '関係を発展させる'],
    },
  ];

  // コミュニティでの出会いフロー
  const communitySteps = [
    {
      number: '03',
      title: 'コミュニティを探す',
      description: '趣味や興味が合う仲間が集まるコミュニティに参加。同じ価値観の方々と出会えます。',
      icon: '👥',
      time: '自由に',
      details: ['趣味コミュニティ参加', 'グループ活動参加', '同じ興味の仲間と交流'],
    },
    {
      number: '04',
      title: 'コミュニティイベントに参加',
      description: 'オフラインイベントや趣味活動に参加して、実際に顔を合わせて交流を深めましょう。',
      icon: '🎪',
      time: '月1-2回程度',
      details: ['お茶会・食事会', '趣味のワークショップ', 'グループ散策・旅行'],
    },
    {
      number: '05',
      title: '個人的な関係を深める',
      description: 'コミュニティで親しくなった方と、個人的にもお付き合いを始めてみましょう。',
      icon: '💕',
      time: '自然な流れで',
      details: ['個別でのお食事', 'プライベートな会話', '特別な関係へ発展'],
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-gray-50 to-primary-50 px-3 md:px-5">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-800 font-medium text-sm mb-6">
            🚀 ご利用の流れ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">トモリエの始め方</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            あなたに合った出会いのスタイルで、
            <br className="md:hidden" />
            新しい仲間との第一歩を踏み出しましょう
          </p>
        </div>

        <div className="relative">
          {/* 準備フェーズ - 共通 */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
              準備フェーズ（共通）
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {preparationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    {index < 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-primary-300 to-primary-200 transform -translate-y-1/2">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary-300 border-y-2 border-y-transparent"></div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {step.title}
                      </h4>
                      <div className="text-sm text-primary-600 font-medium mb-3">
                        所要時間: {step.time}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分岐ポイント */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                あなたに合った出会いスタイルを選択
              </h3>
              <p className="text-gray-600 mb-6">トモリエでは2つの出会い方をご用意しています</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl mb-2">💝</div>
                  <div className="font-semibold text-blue-600">個人での出会い</div>
                  <div className="text-sm text-gray-600">1対1でじっくり関係を築く</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-semibold text-purple-600">コミュニティ出会い</div>
                  <div className="text-sm text-gray-600">仲間と一緒に自然な出会い</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2つのパス */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 個人での出会いパス */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-4">
                  💝 個人での出会い
                </div>
                <h3 className="text-xl font-bold text-gray-900">1対1でじっくり関係を築く</h3>
              </div>

              <div className="space-y-6">
                {personalSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${(index + 2) * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-md font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                        <div className="text-xs text-blue-600 font-medium mb-2">
                          所要時間: {step.time}
                        </div>
                        <div className="space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center text-xs text-gray-500"
                            >
                              <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < personalSteps.length - 1 && (
                      <div className="ml-6 mt-4 w-0.5 h-6 bg-gradient-to-b from-blue-300 to-blue-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* コミュニティでの出会いパス */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 font-medium text-sm mb-4">
                  👥 コミュニティ出会い
                </div>
                <h3 className="text-xl font-bold text-gray-900">仲間と一緒に自然な出会い</h3>
              </div>

              <div className="space-y-6">
                {communitySteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${(index + 2) * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-md font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                        <div className="text-xs text-purple-600 font-medium mb-2">
                          所要時間: {step.time}
                        </div>
                        <div className="space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center text-xs text-gray-500"
                            >
                              <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < communitySteps.length - 1 && (
                      <div className="ml-6 mt-4 w-0.5 h-6 bg-gradient-to-b from-purple-300 to-purple-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-lg mx-auto">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">今すぐ始めてみませんか？</h3>
            <p className="text-gray-600 mb-6">
              7日間の無料体験で、
              <br className="md:hidden" />
              トモリエの魅力を実感してください
            </p>
            <button className="btn-primary w-full py-4">無料で始める</button>
          </div>
        </div>
      </div>
    </section>
  );
}
