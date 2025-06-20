'use client';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import CTA from '@/components/CTA';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FloatingBubbles } from '@/components/ui/FloatingBubbles';
import { Icons } from '@/components/ui/Icons';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      id: 'monthly',
      name: '月額プラン',
      duration: '1ヶ月',
      price: 980,
      originalPrice: 980,
      monthlyPrice: 980,
      discount: 0,
      badge: '試してみたい方に',
      description: '気軽に始めたい方に最適',
      popular: false,
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
      description: 'バランスの良いプラン',
      popular: true,
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
      description: 'じっくり活動したい方に',
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
      badge: '最もお得',
      description: '本格的に利用したい方に',
      popular: false,
    },
  ];

  const features = [
    'プロフィール閲覧無制限',
    'メッセージ送受信無制限',
    'コミュニティ参加',
    'イベント参加',
    '詳細検索機能',
    '足跡機能',
    '24時間サポート',
    '本人確認サポート',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <Header />

      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50 py-20">
        {/* 浮遊するバブル装飾 */}
        <FloatingBubbles />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            料金プラン
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            すべてのプランで同じ機能をご利用いただけます。
            期間に応じて、お得な割引をご用意しました。
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <Icons.check className="w-5 h-5" />
            <span className="font-medium">無料登録でプロフィール作成可能</span>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  <div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ¥{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /{plan.duration}
                      </span>
                    </div>

                    {plan.discount > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 line-through">
                          ¥{plan.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-green-600 ml-2 font-medium">
                          {plan.discount}% OFF
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 mt-2">
                      月額換算: ¥{plan.monthlyPrice}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 登録ボタン */}
          <div className="text-center mt-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-xl px-12 py-4">
                無料登録で始める
                <Icons.chevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-gray-600 mt-4 text-lg">
              登録後、お好みのプランをお選びいただけます
            </p>
          </div>
        </div>
      </section>

      {/* 機能一覧 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              すべてのプランに含まれる機能
            </h2>
            <p className="text-xl text-gray-600">
              どのプランをお選びいただいても、同じ充実した機能をご利用いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              よくある質問
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                無料で利用できる機能はありますか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                はい。無料登録でプロフィール作成、基本的なお相手検索、コミュニティの閲覧が可能です。
                メッセージの送受信やイベント参加には有料プランが必要です。
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                プランの変更は可能ですか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                はい、いつでもプランの変更が可能です。アップグレードの場合は即座に反映され、
                ダウングレードの場合は現在のプラン期間終了後に変更されます。
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                退会・解約はいつでも可能ですか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                はい、いつでも退会・解約が可能です。解約した場合、現在のプラン期間終了まで
                サービスをご利用いただけます。自動更新もお選びいただけます。
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                支払い方法は何が利用できますか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                クレジットカード（Visa、MasterCard、JCB、American
                Express）でのお支払いが可能です。
                安全なStripe決済システムを使用しているため、安心してご利用いただけます。
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA */}
      <CTA />
      {/* フッター */}
      <Footer />
    </div>
  );
}
