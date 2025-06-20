'use client';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FloatingBubbles } from '@/components/ui/FloatingBubbles';
import { Icons } from '@/components/ui/Icons';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <Header />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50 py-16 lg:py-20">
        {/* 浮遊するバブル装飾 */}
        <FloatingBubbles />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            トモリエについて
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            人生経験豊富な大人世代の皆様に、新しい出会いとコミュニティの場をご提供する、
            特別に設計されたプラットフォームです。
          </p>
        </div>
      </section>

      {/* ミッション */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              私たちのミッション
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              60歳からの新しい人生の章で、同世代の仲間との meaningful
              な関係を築く場所を提供すること。
              年齢を重ねた今だからこそ分かる、本当の価値を共有できる出会いをサポートします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                「灯り」をともす出会い
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                トモリエという名前は、「灯（とも）り」と「アトリエ」を組み合わせました。
                人生の豊かな経験を持つ皆様の心に、新しい灯りをともす出会いの場でありたいという願いが込められています。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                年齢を重ねることで得られる深い洞察力、思いやり、そして人生への感謝の気持ち。
                そんな素晴らしい qualities を持つ大人世代同士が出会い、
                お互いを尊重し合える関係を築けるよう、私たちがサポートいたします。
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary-50 to-orange-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.heart className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  真心のこもった出会い
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  表面的な出会いではなく、人生経験を重ねた大人同士だからこそ築ける、
                  深くて meaningful な関係性を大切にしています。
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">主な機能</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              大人世代の皆様が安心してご利用いただけるよう、
              シンプルで分かりやすい機能をご用意しました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.heart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                お相手探し
              </h3>
              <p className="text-gray-600 leading-relaxed">
                価値観や趣味、お住まいの地域などから、あなたにぴったりのお相手を見つけることができます。
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.message className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                安全なメッセージ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                プライバシーを守りながら、お相手とじっくりとやり取りができる、安全なメッセージ機能です。
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                コミュニティ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                趣味や関心事で繋がるコミュニティで、同じ興味を持つ仲間と交流できます。
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.check className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                本人確認
              </h3>
              <p className="text-gray-600 leading-relaxed">
                しっかりとした本人確認システムで、安心してご利用いただける環境を整えています。
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                イベント
              </h3>
              <p className="text-gray-600 leading-relaxed">
                オンライン・オフラインでのイベントに参加して、リアルな出会いの機会も提供します。
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Icons.settings className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                簡単設定
              </h3>
              <p className="text-gray-600 leading-relaxed">
                大きな文字、シンプルな操作で、どなたでも簡単にご利用いただけます。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 安全への取り組み */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              安全への取り組み
            </h2>
            <p className="text-xl text-gray-600">
              大人世代の皆様に安心してご利用いただくため、様々な安全対策を講じています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    本人確認の徹底
                  </h3>
                  <p className="text-gray-600">
                    身分証明書による厳格な本人確認を実施しています。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    24時間監視体制
                  </h3>
                  <p className="text-gray-600">
                    専門スタッフによる24時間体制での監視とサポートを行っています。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    プライバシー保護
                  </h3>
                  <p className="text-gray-600">
                    個人情報の取り扱いには細心の注意を払い、厳重に管理しています。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    通報・ブロック機能
                  </h3>
                  <p className="text-gray-600">
                    不適切な行為を見つけた場合、すぐに通報・ブロックできます。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    専門サポート
                  </h3>
                  <p className="text-gray-600">
                    ご不明な点があれば、専門スタッフが丁寧にサポートいたします。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icons.check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    セキュアな通信
                  </h3>
                  <p className="text-gray-600">
                    すべての通信は暗号化され、安全に保護されています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            あなたも今日から始めませんか？
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            トモリエで、新しい出会いとコミュニティの扉を開いてください。
            人生経験豊富な仲間たちが、あなたをお待ちしています。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-xl px-8 py-4 bg-white text-primary-600 border-white hover:bg-gray-50"
              >
                無料で始める
                <Icons.chevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full text-xl px-8 py-4 bg-primary-800 hover:bg-primary-900 border-primary-800"
              >
                料金プランを見る
              </Button>
            </Link>
          </div>

          <p className="text-lg text-primary-200 mt-6">
            すでにアカウントをお持ちの方は{' '}
            <Link
              href="/auth/login"
              className="text-white hover:text-primary-100 font-medium underline"
            >
              こちらからログイン
            </Link>
          </p>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}
