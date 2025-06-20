'use client';

import { useEffect, useState } from 'react';

interface PricingSectionProps {
  showAnimations?: boolean;
  sectionId?: string;
  className?: string;
}

export default function PricingSection({
  showAnimations = false,
  sectionId = 'pricing',
  className = 'py-20 bg-white px-3 md:px-5',
}: PricingSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAnimations) {
      setIsVisible(true);
    }
  }, [showAnimations]);

  // 全プラン共通の機能
  const commonFeatures = [
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

  const plans = [
    {
      id: 'monthly',
      name: '月額プラン',
      price: '¥980',
      period: '月',
      originalPrice: '',
      discount: '',
      description: '気軽に始めたい方に最適',
      badge: '人気',
      color: 'primary',
    },
    {
      id: '3months',
      name: '3ヶ月プラン',
      price: '¥2,700',
      period: '3ヶ月',
      originalPrice: '¥2,940',
      discount: '8%OFF',
      monthlyEquivalent: '約900円/月',
      description: '短期集中でお相手探し',
      badge: 'おすすめ',
      color: 'blue',
    },
    {
      id: '6months',
      name: '6ヶ月プラン',
      price: '¥5,100',
      period: '6ヶ月',
      originalPrice: '¥5,880',
      discount: '13%OFF',
      monthlyEquivalent: '約850円/月',
      description: 'じっくり時間をかけて理想の出会いを',
      badge: 'お得',
      color: 'purple',
    },
    {
      id: 'yearly',
      name: '年額プラン',
      price: '¥10,000',
      period: '年',
      originalPrice: '¥11,760',
      discount: '15%OFF',
      monthlyEquivalent: '約833円/月',
      description: '年間契約で最もお得に',
      badge: '最安',
      color: 'green',
    },
  ];

  return (
    <section id={sectionId} className={className}>
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-800 font-medium text-sm mb-6">
            💰 料金プラン
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            シンプルで分かりやすい料金体系
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            大手サービスの半額以下で、質の高いサービスをご提供
          </p>
        </div>

        {/* 共通機能セクション */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-5 md:p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            全プラン共通機能
          </h3>
          <p className="text-center text-gray-600 mb-8">
            どのプランをお選びいただいても、同じ高品質なサービスをご利用いただけます
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {commonFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center bg-white rounded-xl p-4 shadow-sm ${
                  showAnimations && isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={
                  showAnimations ? { animationDelay: `${index * 50}ms` } : {}
                }
              >
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-gradient-to-br ${
                plan.color === 'primary'
                  ? 'from-primary-50 to-white border-primary-200'
                  : plan.color === 'blue'
                    ? 'from-blue-50 to-white border-blue-200'
                    : plan.color === 'purple'
                      ? 'from-purple-50 to-white border-purple-200'
                      : 'from-green-50 to-white border-green-200'
              } rounded-3xl p-6 pt-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 ${
                showAnimations && isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={
                showAnimations ? { animationDelay: `${index * 200}ms` } : {}
              }
            >
              {/* Badge */}
              <div
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 ${
                  plan.color === 'primary'
                    ? 'bg-primary-500'
                    : plan.color === 'blue'
                      ? 'bg-blue-500'
                      : plan.color === 'purple'
                        ? 'bg-purple-500'
                        : 'bg-green-500'
                } text-white rounded-full text-sm font-bold shadow-lg`}
              >
                {plan.badge}
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div>
                  <div className="flex items-center justify-center gap-2 mb-2 h-6">
                    <span className="text-sm text-gray-500 line-through">
                      {plan.originalPrice}
                    </span>
                    <span
                      className={`px-2 py-1 ${
                        plan.color === 'primary'
                          ? 'bg-white'
                          : plan.color === 'blue'
                            ? 'bg-blue-500'
                            : plan.color === 'purple'
                              ? 'bg-purple-500'
                              : 'bg-green-500'
                      } text-white text-xs rounded-full font-bold`}
                    >
                      {plan.discount}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-sm">
                      /{plan.period}
                    </span>
                  </div>

                  <div className="text-green-600 font-medium mt-1 text-sm h-5">
                    {plan.monthlyEquivalent}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 7 Day Trial */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-5 md:p-8 text-center text-white">
          <div className="text-4xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold mb-4">7日間無料体験</h3>
          <p className="text-lg mb-6 opacity-90">
            全ての機能を7日間無料でお試しいただけます。
            <br />
            気に入らなければ、いつでもキャンセル可能です。
          </p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
            今すぐ無料で始める
          </button>
        </div>
      </div>
    </section>
  );
}
