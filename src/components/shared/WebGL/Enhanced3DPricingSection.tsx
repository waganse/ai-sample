'use client';

import { useEffect, useState, Suspense } from 'react';
import PricingCard3D from './PricingCard3D';
import WebGLBackground from './WebGLBackground';

interface Enhanced3DPricingSectionProps {
  showAnimations?: boolean;
  sectionId?: string;
  className?: string;
}

export default function Enhanced3DPricingSection({
  showAnimations = false,
  sectionId = 'pricing',
  className = 'py-20 bg-white px-3 md:px-5',
}: Enhanced3DPricingSectionProps) {
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
    <section id={sectionId} className={`relative ${className}`}>
      {/* WebGL Background */}
      <Suspense fallback={null}>
        <WebGLBackground theme="cool" intensity="medium" />
      </Suspense>

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium text-sm mb-6 backdrop-blur-sm border border-blue-200/50">
            💰 料金プラン
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            シンプルで分かりやすい料金体系
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            大手サービスの半額以下で、質の高いサービスをご提供
          </p>
        </div>

        {/* 共通機能セクション - WebGL Enhanced */}
        <div className="bg-gradient-to-r from-primary-50/90 to-blue-50/90 rounded-3xl p-8 mb-16 max-w-4xl mx-auto backdrop-blur-lg border border-white/50 shadow-xl">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">全プラン共通機能</h3>
          <p className="text-center text-gray-600 mb-8">
            どのプランをお選びいただいても、同じ高品質なサービスをご利用いただけます
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {commonFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-all duration-300 ${
                  showAnimations && isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={showAnimations ? { animationDelay: `${index * 50}ms` } : {}}
              >
                <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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

        {/* 3D Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`${showAnimations && isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={showAnimations ? { animationDelay: `${index * 200}ms` } : {}}
            >
              <Suspense fallback={
                <div className="h-80 bg-gradient-to-br from-white to-gray-50 rounded-3xl animate-pulse" />
              }>
                <PricingCard3D plan={plan} index={index} />
              </Suspense>
            </div>
          ))}
        </div>

        {/* Enhanced 7 Day Trial */}
        <div className="bg-gradient-to-r from-primary-500/90 to-primary-600/90 rounded-3xl p-8 text-center text-white backdrop-blur-lg border border-white/30 shadow-2xl">
          <div className="text-5xl mb-6 animate-bounce">🎁</div>
          <h3 className="text-3xl font-bold mb-6">7日間無料体験</h3>
          <p className="text-xl mb-8 opacity-90">
            全ての機能を7日間無料でお試しいただけます。
            <br />
            気に入らなければ、いつでもキャンセル可能です。
          </p>
          <button className="group relative overflow-hidden bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <span className="relative z-10">今すぐ無料で始める</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}