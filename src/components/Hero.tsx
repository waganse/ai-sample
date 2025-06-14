'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: '/images/main.png',
      alt: '縁日和で素敵な出会いを見つけた60歳以上の方々',
      title: 'パートナー探し',
      subtitle: '心ときめく出会い',
    },
    {
      src: '/images/main2.png',
      alt: '縁日和で友達の輪を広げた60歳以上の方々',
      title: '友達作り',
      subtitle: '趣味の仲間と',
    },
    {
      src: '/images/main3.png',
      alt: '縁日和でコミュニティ活動を楽しむ60歳以上の方々',
      title: 'コミュニティ参加',
      subtitle: 'イベントで自然な出会い',
    },
    {
      src: '/images/main4.png',
      alt: '縁日和でパートナーを見つけた60歳以上のカップル',
      title: '安心のマッチング',
      subtitle: '60歳からの新しいスタート',
    },
    {
      src: '/images/main5.png',
      alt: '縁日和で充実した時間を過ごす60歳以上の方々',
      title: '豊かなセカンドライフ',
      subtitle: '新たな人生の始まり',
    },
    {
      src: '/images/main6.png',
      alt: '縁日和で新しい趣味を見つけた60歳以上の方々',
      title: '新しい趣味発見',
      subtitle: '生きがいのある毎日',
    },
    {
      src: '/images/main7.png',
      alt: '縁日和で一緒に過ごす時間を大切にする60歳以上の方々',
      title: '温かなつながり',
      subtitle: '心の支えあい',
    },
    {
      src: '/images/main8.png',
      alt: '縁日和で新たな挑戦を楽しむ60歳以上の方々',
      title: '新たな挑戦',
      subtitle: '年齢を重ねても輝く毎日',
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
    <section className="relative min-h-[90vh] bg-gradient-to-br from-primary-50 via-gray-50 to-primary-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-300 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-gray-300 rounded-full opacity-20 animate-bounce delay-500"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      <div className="container-max relative z-10 section-padding">
        {/* Mobile First Content */}
        <div className="lg:hidden text-center space-y-6 mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-800 font-medium text-sm">
            60歳からの新しいスタート
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            人生100年時代、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
              心でつながる
            </span>
            、
            <br />
            第二の仲間を。
          </h1>

          <p className="text-base text-gray-700 leading-relaxed mx-auto max-w-md">
            60歳以上の方のための、安心でシンプルなマッチングアプリ。
            <span className="font-semibold text-primary-600 block mt-2">
              あなたらしい出会いを応援します。
            </span>
          </p>

          {/* Mobile Service Preview Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary-100">
              <div className="text-2xl mb-2">💕</div>
              <div className="text-sm font-semibold text-gray-800">パートナー探し</div>
              <div className="text-xs text-gray-600">心ときめく出会い</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary-100">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-semibold text-gray-800">友達作り</div>
              <div className="text-xs text-gray-600">趣味の仲間と</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <button className="btn-primary text-lg px-8 py-4 w-full">
              無料で始める（7日間無料）
            </button>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600">月額980円</div>
              <div className="text-sm text-gray-600">長期割引制度あり</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center min-h-[90vh] relative">
          {/* Main Content Area */}
          <div className="w-full max-w-5xl mx-auto relative">
            {/* Left Content */}
            <div
              className={`relative z-30 max-w-3xl space-y-8 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-800 font-medium text-sm animate-bounce-gentle">
                  60歳からの新しいスタート
                </div>

                <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  人生100年時代、
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 animate-gradient">
                    心でつながる
                  </span>
                  、
                  <br />
                  第二の仲間を。
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                  60歳以上の方のための、安心でシンプルなマッチングアプリ。
                  <br />
                  まずは気軽に話せる友人から、心ときめくパートナーまで。
                  <br />
                  <span className="font-semibold text-primary-600">
                    あなたらしい出会いを応援します。
                  </span>
                </p>
              </div>

              <div className="flex flex-row gap-6">
                <button className="group btn-primary text-xl px-12 py-5 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl z-40">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <Link href="/service">
                  <button className="group btn-secondary text-xl px-12 py-5 transition-all duration-300 hover:scale-105 hover:shadow-lg z-40">
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

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-2xl">
                <div className="text-center group hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm z-40">
                  <div className="text-2xl font-bold text-primary-600 mb-2 group-hover:text-primary-700">
                    月額980円
                  </div>
                  <div className="text-xs text-gray-600">大手サービスの半額以下</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm z-40">
                  <div className="text-2xl font-bold text-primary-600 mb-2 group-hover:text-primary-700">
                    シンプル
                  </div>
                  <div className="text-xs text-gray-600">スマホが苦手でも安心</div>
                </div>
              </div>
            </div>

            {/* Floating Images - Absolute positioned */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isVisible ? 'animate-fade-in-right' : 'opacity-0'
              }`}
            >
              {/* Main image with carousel - positioned aggressively close to text */}
              <div className="absolute top-[-50px] right-[-50px] w-[320px] bg-gradient-to-br from-white to-gray-50 rounded-3xl p-4 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 z-20 pointer-events-auto">
                <div className="bg-gradient-to-br from-primary-100 to-gray-100 rounded-2xl p-3 shadow-inner">
                  <div className="aspect-[4/5] rounded-xl relative overflow-hidden">
                    {/* Image carousel */}
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    ))}

                    {/* Overlay with soft gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Text overlay with dynamic content */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg transition-all duration-500">
                        <div className="text-sm font-semibold text-gray-800">
                          {images[currentImageIndex].title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {images[currentImageIndex].subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Image indicators */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second image with offset carousel - positioned aggressively close to bottom content */}
              <div className="absolute bottom-[-60px] right-[80px] w-[320px] bg-gradient-to-br from-white to-gray-50 rounded-3xl p-4 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 z-10 pointer-events-auto">
                <div className="bg-gradient-to-br from-primary-50 to-gray-50 rounded-2xl p-3 shadow-inner">
                  <div className="aspect-[4/5] rounded-xl relative overflow-hidden">
                    {/* Image carousel with offset */}
                    {images.map((image, index) => {
                      const offsetIndex = (index + 2) % images.length;
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={images[offsetIndex].src}
                            alt={images[offsetIndex].alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      );
                    })}

                    {/* Overlay with soft gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

                    {/* Text overlay with offset content */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg transition-all duration-500">
                        <div className="text-sm font-semibold text-gray-800">
                          {images[(currentImageIndex + 2) % images.length].title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {images[(currentImageIndex + 2) % images.length].subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Image indicators */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
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

        {/* Mobile Images Section */}
        <div className="lg:hidden mt-8">
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-3 shadow-lg transform rotate-2">
              <div className="bg-gradient-to-br from-primary-100 to-gray-100 rounded-xl p-2 shadow-inner">
                <div className="aspect-[3/4] rounded-lg relative overflow-hidden">
                  {/* Mobile carousel */}
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Mobile image indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-3 shadow-lg transform -rotate-2">
              <div className="bg-gradient-to-br from-primary-50 to-gray-50 rounded-xl p-2 shadow-inner">
                <div className="aspect-[3/4] rounded-lg relative overflow-hidden">
                  {/* Mobile carousel with offset */}
                  {images.map((image, index) => {
                    const offsetIndex = (index + 2) % images.length;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Image
                          src={images[offsetIndex].src}
                          alt={images[offsetIndex].alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

                  {/* Mobile image indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
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

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    </section>
  );
}
