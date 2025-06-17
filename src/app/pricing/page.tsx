'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('3month');

  const plans = [
    {
      id: 'monthly',
      name: '月額プラン',
      duration: '1ヶ月',
      price: 980,
      originalPrice: 980,
      monthlyPrice: 980,
      discount: 0,
      badge: '人気',
      description: '気軽に始めたい方に最適',
      popular: true,
    },
    {
      id: '3month',
      name: '3ヶ月プラン',
      duration: '3ヶ月',
      price: 2700,
      originalPrice: 2940,
      monthlyPrice: 900,
      discount: 8,
      badge: 'おすすめ',
      description: '短期集中でお相手探し',
      popular: false,
    },
    {
      id: '6month',
      name: '6ヶ月プラン',
      duration: '6ヶ月',
      price: 5100,
      originalPrice: 5880,
      monthlyPrice: 850,
      discount: 13,
      badge: 'お得',
      description: 'じっくり時間をかけて理想の出会いを',
      popular: false,
    },
    {
      id: 'yearly',
      name: '年額プラン',
      duration: '12ヶ月',
      price: 10000,
      originalPrice: 11760,
      monthlyPrice: 833,
      discount: 15,
      badge: '最安',
      description: '年間契約で最もお得に',
      popular: false,
    },
  ];

  const features = [
    'プロフィール閲覧無制限',
    'メッセージ送受信無制限',
    'いいね送信無制限',
    '高度な検索機能',
    'コミュニティ参加',
    'イベント参加',
    '24時間サポート',
    '身元確認済みマーク',
    'プライバシー保護',
    'ブロック・通報機能',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-gray-50 to-primary-100">
      <Header />

      <main className="container-max section-padding">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-100 rounded-full text-primary-800 font-medium text-sm mb-6">
            🌸 トモリエの料金プラン
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            あなたにぴったりの
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
              プラン
            </span>
            を選んでください
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            シンプルで分かりやすい料金体系。長期契約でさらにお得に。
            <br />
            全プラン同じサービス内容で安心してご利用いただけます。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-6 shadow-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-primary-500 transform scale-105'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${
                      plan.badge === '人気'
                        ? 'bg-gradient-to-r from-pink-500 to-red-500'
                        : plan.badge === 'おすすめ'
                        ? 'bg-gradient-to-r from-primary-600 to-pink-500'
                        : plan.badge === 'お得'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : plan.badge === '最安'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                        : 'bg-gradient-to-r from-primary-600 to-pink-500'
                    }`}
                  >
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-primary-600">
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-600 ml-1">/{plan.duration}</span>
                  </div>

                  {plan.id !== 'monthly' && (
                    <div className="text-sm text-gray-600 mt-1">¥{plan.monthlyPrice}/月</div>
                  )}

                  {plan.discount > 0 && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500 line-through">
                        ¥{plan.originalPrice.toLocaleString()}
                      </span>
                      <span className="ml-2 text-sm text-pink-600 font-semibold">
                        {plan.discount}%OFF
                      </span>
                    </div>
                  )}
                </div>

                {plan.discount > 0 && (
                  <div className="text-sm text-pink-600 font-semibold mb-4">
                    ¥{(plan.originalPrice - plan.price).toLocaleString()}お得
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-600 to-pink-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-800 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {plan.name}を選ぶ
              </button>
            </div>
          ))}
        </div>

        {/* Service Features */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            全プラン共通サービス内容
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">安心の7日間無料体験</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">7日間無料</h3>
              <p className="text-gray-600">すべての機能を7日間無料でお試しいただけます</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">いつでも解約</h3>
              <p className="text-gray-600">面倒な手続きなし。いつでも簡単に解約できます</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">24時間サポート</h3>
              <p className="text-gray-600">困ったときはいつでもサポートチームがお手伝いします</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">よくあるご質問</h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                料金はいつから発生しますか？
              </h3>
              <p className="text-gray-600">
                7日間の無料体験期間後から料金が発生します。無料期間中に解約された場合、料金は一切発生しません。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                どのプランがおすすめですか？
              </h3>
              <p className="text-gray-600">
                月額プランが最も人気で、気軽に始められます。長期プランほど月額料金が安くお得になりますので、じっくり相手を探したい方には3ヶ月以上のプランがおすすめです。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                途中でプラン変更は可能ですか？
              </h3>
              <p className="text-gray-600">
                現在のプラン期間終了後に別のプランに変更できます。プラン期間中の変更はできませんが、次回更新時に自動的に新しいプランが適用されます。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                他社サービスからの乗り換え割引はありますか？
              </h3>
              <p className="text-gray-600">
                はい、他社マッチングサービスからの乗り換えの場合、初回限定で追加10%割引をご利用いただけます。詳細はお問い合わせください。
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">まずは7日間無料でお試しください</h2>
          <p className="text-xl text-gray-600 mb-8">トモリエで新しい出会いを見つけませんか？</p>
          <button className="btn-primary text-xl px-12 py-4 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            無料で始める
          </button>
        </div>
      </main>
    </div>
  );
}
