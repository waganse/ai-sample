'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { FloatingBubbles } from '@/components/ui/FloatingBubbles';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ヒーローセクション用のメイン画像
  const heroImages = [
    {
      src: '/images/main.png',
      alt: '素敵な笑顔のご夫婦'
    },
    {
      src: '/images/main9.png',
      alt: '手を繋いで歩く温かいご夫婦'
    },
    {
      src: '/images/main7.png',
      alt: 'お茶を楽しむ和やかなグループ'
    },
    {
      src: '/images/main8.png',
      alt: 'カラオケを楽しむ明るいグループ'
    },
    {
      src: '/images/main6.png',
      alt: '農業を楽しむご夫婦'
    }
  ];

  useEffect(() => {
    // 認証済みユーザーは適切なページにリダイレクト
    if (!loading && user) {
      const hasProfile = user.user_metadata?.profile_completed;
      const destination = hasProfile ? '/dashboard' : '/profile/setup';
      router.push(destination);
    }
  }, [user, loading, router]);

  // 認証済みユーザーにはローディング表示
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Icons.loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">リダイレクト中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <Header />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50 py-20 lg:py-32">
        {/* 浮遊するバブル装飾 */}
        <FloatingBubbles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左側: テキストコンテンツ */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                人生経験豊富な
                <span className="text-primary-600">大人世代</span>
                のための
                <br />
                新しい出会いとコミュニティ
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                60歳からの新しいスタート。同じ価値観を持つ仲間との出会いで、
                毎日をもっと豊かに、もっと楽しく。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <Link href="/concept">
                  <Button size="lg" className="w-full sm:w-auto text-xl px-8 py-4">
                    私たちの想いを知る
                    <Icons.chevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                
                <Link href="/service">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-xl px-8 py-4">
                    サービス詳細
                  </Button>
                </Link>
              </div>

              <p className="text-lg text-gray-500">
                すでにアカウントをお持ちの方は{' '}
                <Link href="/auth/login" className="text-primary-600 hover:text-primary-500 font-medium underline">
                  こちらからログイン
                </Link>
              </p>
            </div>

            {/* 右側: メイン画像カルーセル */}
            <div className="relative">
              <div className="relative z-10 h-[600px]">
                <ImageCarousel 
                  images={heroImages}
                  interval={5000}
                  className="h-full"
                />
              </div>
              
              {/* 装飾的な背景要素 */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-primary-200 to-orange-200 rounded-2xl -z-10"></div>
              <div className="absolute top-8 left-8 w-20 h-20 bg-primary-300 rounded-full opacity-60 animate-float"></div>
              <div className="absolute bottom-12 right-12 w-16 h-16 bg-orange-300 rounded-full opacity-50 animate-float-delay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              トモリエが選ばれる理由
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              大人世代の皆様に安心してご利用いただけるよう、
              細部まで配慮したサービスを提供しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/images/main2.png"
                  alt="仲の良いグループの笑顔"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.heart className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  真剣な出会い
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  人生経験豊富な大人同士の、質の高い出会いをサポート。
                  共通の価値観を大切にした、深いつながりを築けます。
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/images/main3.png"
                  alt="趣味を楽しむグループ"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  活発なコミュニティ
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  趣味や関心事でつながるコミュニティ機能。
                  同じ興味を持つ仲間と一緒に、新しい体験を楽しめます。
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <Image 
                  src="/images/main5.png"
                  alt="合唱を楽しむグループ"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  安心・安全
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  本人確認システムと24時間監視体制で、
                  安心してご利用いただける環境を整えています。
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 体験談・実際の声セクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              トモリエで広がる、新しい世界
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              実際にトモリエをご利用いただいている皆様の、
              生き生きとした毎日をご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* 左側: ハイキンググループ */}
            <div className="relative">
              <Image 
                src="/images/main4.png"
                alt="楽しくハイキングを楽しむグループ"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  自然を愛する仲間たち
                </h3>
                <p className="text-white/90">
                  「ハイキングコミュニティで出会った仲間と、毎週末が楽しみになりました」
                </p>
              </div>
            </div>

            {/* 右側: 農業体験 */}
            <div className="relative">
              <Image 
                src="/images/main6.png"
                alt="農業を楽しむご夫婦"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  共通の趣味で結ばれた絆
                </h3>
                <p className="text-white/90">
                  「同じ趣味の方と出会えて、毎日が充実しています」
                </p>
              </div>
            </div>
          </div>

          {/* 統計情報 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">1,200+</div>
                <p className="text-lg text-gray-600">アクティブユーザー</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <p className="text-lg text-gray-600">活発なコミュニティ</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
                <p className="text-lg text-gray-600">ユーザー満足度</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            新しい人生の章を、今から始めませんか？
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            無料登録で、素敵な出会いとコミュニティへの第一歩を踏み出しましょう
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-xl px-8 py-4 bg-white text-primary-600 border-white hover:bg-gray-50"
              >
                無料で始める
                <Icons.chevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/concept">
              <Button 
                size="lg"
                className="w-full sm:w-auto text-xl px-8 py-4 bg-primary-800 hover:bg-primary-900 border-primary-800"
              >
                想いを知る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}