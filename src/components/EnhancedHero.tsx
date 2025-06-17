'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SakuraAnimation from '@/components/shared/SakuraAnimation';

export default function EnhancedHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: '/images/main.png',
      alt: 'トモリエで素敵な出会いを見つけた60歳以上の方々',
      title: 'パートナー探し',
      subtitle: '心ときめく出会い',
    },
    {
      src: '/images/main2.png',
      alt: 'トモリエで友達の輪を広げた60歳以上の方々',
      title: '友達作り',
      subtitle: '趣味の仲間と',
    },
    {
      src: '/images/main3.png',
      alt: 'トモリエでコミュニティ活動を楽しむ60歳以上の方々',
      title: 'コミュニティ参加',
      subtitle: 'イベントで自然な出会い',
    },
    {
      src: '/images/main4.png',
      alt: 'トモリエでパートナーを見つけた60歳以上のカップル',
      title: '安心のマッチング',
      subtitle: '60歳からの新しいスタート',
    },
    {
      src: '/images/main5.png',
      alt: 'トモリエで充実した時間を過ごす60歳以上の方々',
      title: '豊かなセカンドライフ',
      subtitle: '新たな人生の始まり',
    },
    {
      src: '/images/main6.png',
      alt: 'トモリエで新しい趣味を見つけた60歳以上の方々',
      title: '新しい趣味発見',
      subtitle: '生きがいのある毎日',
    },
    {
      src: '/images/main7.png',
      alt: 'トモリエで一緒に過ごす時間を大切にする60歳以上の方々',
      title: '温かなつながり',
      subtitle: '心の支えあい',
    },
    {
      src: '/images/main8.png',
      alt: 'トモリエで新たな挑戦を楽しむ60歳以上の方々',
      title: '新たな挑戦',
      subtitle: '年齢を重ねても輝く毎日',
    },
    {
      src: '/images/main9.png',
      alt: 'トモリエで新しい出会いを楽しむ60歳以上の方々',
      title: '新しい出会い',
      subtitle: '人生を豊かにする絆',
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Full screen background image with transparency */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentImageIndex ? 'opacity-20' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/70 via-purple-50/60 to-pink-50/70 animate-gradient-shift" />

        {/* Beautiful sakura petals falling */}
        <SakuraAnimation 
          size="medium" 
          intensity="normal" 
          asBackground={true}
        />

        {/* Enhanced floating background elements with subtle sakura colors */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-15 animate-pulse blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-200 rounded-full opacity-20 animate-bounce blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-18 animate-pulse delay-1000 blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-pink-150 to-rose-250 rounded-full opacity-12 animate-spin-slow blur-xl" />

        {/* Ambient sakura glow */}
        <div className="absolute inset-0 bg-gradient-radial from-pink-50/20 via-transparent to-transparent opacity-40" />
      </div>

      <div className="container-max relative z-20 min-h-[90vh] flex items-center p-5 md:p-0">
        {/* Mobile First Content */}
        <div className="lg:hidden text-center space-y-6 mb-8 w-full">
          <div
            className={`inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-800 font-medium text-sm border border-primary-200/50 shadow-xl ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
心に灯りをともす、トモリエ
          </div>

          <h1
            className={`text-4xl sm:text-5xl font-bold text-gray-900 leading-tight ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            人生100年時代、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-pink-500 to-purple-600 animate-gradient-x">
              心でつながる
            </span>
            、
            <br />
            第二の仲間を。
          </h1>

          <p
            className={`text-lg text-gray-700 leading-relaxed mx-auto max-w-md ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            ご近所での気軽な出会いから始まる、大人のためのマッチングアプリ。
            <span className="font-semibold text-primary-600 block mt-2">
              成熟した大人の、新しいつながりを応援します。
            </span>
          </p>

          {/* Enhanced Mobile Cards */}
          <div
            className={`grid grid-cols-2 gap-4 max-w-xs mx-auto ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover-glow">
              <div className="w-8 h-8 mb-3 mx-auto animate-bounce">
                <svg className="w-full h-full text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="text-sm font-semibold text-gray-800">パートナー探し</div>
              <div className="text-xs text-gray-600">心ときめく出会い</div>
            </div>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover-glow">
              <div className="w-8 h-8 mb-3 mx-auto animate-bounce delay-75">
                <svg className="w-full h-full text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v7H5v-5H2v-2h2zm6.5-2c.83 0 1.5-.67 1.5-1.5S11.33 14 10.5 14 9 14.67 9 15.5s.67 1.5 1.5 1.5zM12.5 11H11v5.5h1.5V11zM22 12l-4-2v1.5h-3v1h3V14l4-2zm-7.5 1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                </svg>
              </div>
              <div className="text-sm font-semibold text-gray-800">友達作り</div>
              <div className="text-xs text-gray-600">趣味の仲間と</div>
            </div>
          </div>


          <div
            className={`flex flex-col gap-4 max-w-sm mx-auto ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '800ms' }}
          >
            <button className="group relative overflow-hidden btn-primary text-lg px-8 py-4 w-full hover:scale-105 transition-all duration-500 hover:shadow-xl hover-glow">
              <span className="relative z-10">無料で始める（7日間無料）</span>
            </button>
            <Link href="/service">
              <button className="group btn-secondary text-lg px-8 py-4 w-full transition-all duration-500 hover:scale-105 hover:shadow-lg backdrop-blur-sm hover-lift">
                サービス詳細を見る
                <svg
                  className="w-4 h-4 ml-2 inline group-hover:rotate-90 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </Link>
            <div className="text-center">
              <div className="text-xl font-bold text-primary-600">月額980円</div>
              <div className="text-sm text-gray-600">長期割引制度あり</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center min-h-[90vh] relative w-full">
          {/* Main Content Area */}
          <div className="w-full max-w-7xl mx-auto relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-800 font-medium text-sm border border-primary-200/50 shadow-xl animate-bounce-gentle">
                  🌸 心に灯りをともす、トモリエ
                </div>

                <h1 className="text-5xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  人生100年時代、
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-pink-500 to-purple-600 animate-gradient-x">
                    心でつながる
                  </span>
                  、
                  <br />
                  第二の仲間を。
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                  ご近所での気軽な出会いから始まる、大人のためのマッチングアプリ。
                  <br />
                  まずは気軽に話せる友人から、心ときめくパートナーまで。
                  <br />
                  <span className="font-semibold text-primary-600">
                    成熟した大人の、新しいつながりを応援します。
                  </span>
                </p>
              </div>

              <div className="flex flex-row gap-6">
                <button className="group relative overflow-hidden btn-primary text-xl px-12 py-5 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover-glow z-40">
                  <span className="relative z-10 flex items-center justify-center">
                    無料で始める
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>

                <Link href="/service">
                  <button className="group btn-secondary text-xl px-12 py-5 transition-all duration-500 hover:scale-105 hover:shadow-lg z-40 backdrop-blur-sm hover-lift">
                    サービス詳細を見る
                    <svg
                      className="w-5 h-5 ml-2 inline group-hover:rotate-90 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Enhanced Trust indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-2xl">
                <div className="text-center group hover-lift bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-primary-100 z-40 hover-glow transition-all duration-500">
                  <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                    月額980円
                  </div>
                  <div className="text-sm text-gray-600">大手サービスの半額以下</div>
                </div>
                <div className="text-center group hover-lift bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-primary-100 z-40 hover-glow transition-all duration-500">
                  <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                    シンプル
                  </div>
                  <div className="text-sm text-gray-600">スマホが苦手でも安心</div>
                </div>
                <div className="text-center group hover-lift bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-primary-100 z-40 hover-glow transition-all duration-500">
                  <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                    安心
                  </div>
                  <div className="text-sm text-gray-600">24時間サポート</div>
                </div>
              </div>
            </div>

            {/* Right Image Section with Enhanced Effects */}
            <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-3xl border border-white/50 hover:shadow-3xl transition-all duration-700 hover-lift">
                <div className="bg-gradient-to-br from-primary-100/90 to-gray-100/90 rounded-2xl p-4 shadow-inner backdrop-blur-sm">
                  <div className="aspect-[4/5] rounded-xl relative overflow-hidden">
                    {/* Enhanced Image carousel */}
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${
                          index === currentImageIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover filter brightness-105 contrast-105"
                          priority={index === 0}
                        />
                      </div>
                    ))}

                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Enhanced Image indicators */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${
                            index === currentImageIndex
                              ? 'bg-primary-500 scale-125 shadow-lg'
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 12s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
