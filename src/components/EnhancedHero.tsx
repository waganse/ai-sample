'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function EnhancedHero() {
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
    {
      src: '/images/main9.png',
      alt: '縁日和で新しい出会いを楽しむ60歳以上の方々',
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
      {/* Enhanced CSS Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 via-purple-50/80 to-pink-50/90 animate-gradient-shift" />

        {/* Beautiful sakura petals falling */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Layer 1: Main gentle flow */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`main-${i}`}
              className="absolute animate-sakura-gentle"
              style={{
                left: `${5 + i * 12}%`,
                top: `-20vh`,
                animationDelay: `${i * 3}s`,
                animationDuration: `20s`,
                width: `${24 + (i % 3) * 6}px`,
                height: `${24 + (i % 3) * 6}px`,
              }}
            >
              <img
                src="/images/sakura.png"
                alt="桜の花びら"
                className="w-full h-full opacity-60 drop-shadow-sm"
                style={{
                  filter: 'hue-rotate(0deg) saturate(1.2) brightness(1.1)',
                }}
              />
            </div>
          ))}

          {/* Layer 2: Offset gentle flow */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`offset-${i}`}
              className="absolute animate-sakura-sway"
              style={{
                left: `${10 + i * 15}%`,
                top: `-25vh`,
                animationDelay: `${i * 4 + 10}s`,
                animationDuration: `24s`,
                width: `${20 + (i % 2) * 5}px`,
                height: `${20 + (i % 2) * 5}px`,
              }}
            >
              <img
                src="/images/sakura.png"
                alt="桜の花びら"
                className="w-full h-full opacity-50 drop-shadow-md"
                style={{
                  filter: 'hue-rotate(5deg) saturate(1.1) brightness(1.05)',
                }}
              />
            </div>
          ))}

          {/* Layer 3: Slow dreamy flow */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`slow-${i}`}
              className="absolute animate-sakura-drift"
              style={{
                left: `${15 + i * 18}%`,
                top: `-30vh`,
                animationDelay: `${i * 6 + 5}s`,
                animationDuration: `30s`,
                width: `${18 + (i % 2) * 4}px`,
                height: `${18 + (i % 2) * 4}px`,
              }}
            >
              <img
                src="/images/sakura.png"
                alt="桜の花びら"
                className="w-full h-full opacity-40 drop-shadow-lg"
                style={{
                  filter: 'hue-rotate(10deg) saturate(0.9) brightness(1)',
                }}
              />
            </div>
          ))}

          {/* Layer 4: Micro gentle flow */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`micro-${i}`}
              className="absolute animate-sakura-whisper"
              style={{
                left: `${20 + i * 20}%`,
                top: `-35vh`,
                animationDelay: `${i * 8 + 15}s`,
                animationDuration: `35s`,
                width: `${16 + i * 3}px`,
                height: `${16 + i * 3}px`,
              }}
            >
              <img
                src="/images/sakura.png"
                alt="桜の花びら"
                className="w-full h-full opacity-35 drop-shadow-xl"
                style={{
                  filter: 'hue-rotate(-5deg) saturate(0.8) brightness(0.95)',
                }}
              />
            </div>
          ))}
        </div>

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
            60歳からの新しいスタート
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
            60歳以上の方のための、安心でシンプルなマッチングアプリ。
            <span className="font-semibold text-primary-600 block mt-2">
              あなたらしい出会いを応援します。
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
              <div className="text-3xl mb-3 animate-bounce">💕</div>
              <div className="text-sm font-semibold text-gray-800">パートナー探し</div>
              <div className="text-xs text-gray-600">心ときめく出会い</div>
            </div>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary-100 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover-glow">
              <div className="text-3xl mb-3 animate-bounce delay-75">👥</div>
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
                  🌸 60歳からの新しいスタート
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

                    {/* Enhanced Text overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-white/50 transition-all duration-500 hover:bg-white hover-lift">
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          {images[currentImageIndex].title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {images[currentImageIndex].subtitle}
                        </div>
                      </div>
                    </div>

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

        @keyframes float-0 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(90deg);
          }
          75% {
            transform: translateY(-10px) rotate(135deg);
          }
          100% {
            transform: translateY(0px) rotate(180deg);
          }
        }

        @keyframes float-1 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(60deg);
          }
          66% {
            transform: translateY(-30px) rotate(120deg);
          }
          100% {
            transform: translateY(0px) rotate(180deg);
          }
        }

        @keyframes float-2 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          20% {
            transform: translateY(-8px) rotate(36deg);
          }
          40% {
            transform: translateY(-18px) rotate(72deg);
          }
          60% {
            transform: translateY(-25px) rotate(108deg);
          }
          80% {
            transform: translateY(-15px) rotate(144deg);
          }
          100% {
            transform: translateY(0px) rotate(180deg);
          }
        }

        @keyframes sakura-gentle {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
          3% {
            opacity: 0.6;
          }
          8% {
            transform: translateY(8vh) translateX(-8px) rotate(15deg) scale(1.02) rotateX(10deg)
              rotateY(5deg);
          }
          16% {
            transform: translateY(16vh) translateX(12px) rotate(-20deg) scale(0.98) rotateX(-8deg)
              rotateY(-10deg);
          }
          24% {
            transform: translateY(24vh) translateX(-10px) rotate(25deg) scale(1.01) rotateX(15deg)
              rotateY(8deg);
          }
          32% {
            transform: translateY(32vh) translateX(15px) rotate(-18deg) scale(0.99) rotateX(-12deg)
              rotateY(-6deg);
          }
          40% {
            transform: translateY(40vh) translateX(-12px) rotate(30deg) scale(1.03) rotateX(18deg)
              rotateY(12deg);
          }
          48% {
            transform: translateY(48vh) translateX(18px) rotate(-15deg) scale(0.97) rotateX(-10deg)
              rotateY(-8deg);
          }
          56% {
            transform: translateY(56vh) translateX(-8px) rotate(22deg) scale(1.01) rotateX(12deg)
              rotateY(5deg);
          }
          64% {
            transform: translateY(64vh) translateX(14px) rotate(-25deg) scale(0.98) rotateX(-15deg)
              rotateY(-10deg);
          }
          72% {
            transform: translateY(72vh) translateX(-14px) rotate(18deg) scale(1.02) rotateX(8deg)
              rotateY(6deg);
          }
          80% {
            transform: translateY(80vh) translateX(10px) rotate(-12deg) scale(0.99) rotateX(-6deg)
              rotateY(-4deg);
          }
          88% {
            transform: translateY(88vh) translateX(-6px) rotate(8deg) scale(1.01) rotateX(4deg)
              rotateY(3deg);
          }
          96% {
            transform: translateY(96vh) translateX(8px) rotate(-5deg) scale(0.98) rotateX(-3deg)
              rotateY(-2deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-sway {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
          4% {
            opacity: 0.5;
          }
          10% {
            transform: translateY(10vh) translateX(-12px) rotate(20deg) scale(1.05) rotateX(15deg)
              rotateY(10deg);
          }
          20% {
            transform: translateY(20vh) translateX(18px) rotate(-28deg) scale(0.95) rotateX(-20deg)
              rotateY(-15deg);
          }
          30% {
            transform: translateY(30vh) translateX(-15px) rotate(35deg) scale(1.08) rotateX(25deg)
              rotateY(18deg);
          }
          40% {
            transform: translateY(40vh) translateX(22px) rotate(-22deg) scale(0.92) rotateX(-18deg)
              rotateY(-12deg);
          }
          50% {
            transform: translateY(50vh) translateX(-18px) rotate(30deg) scale(1.06) rotateX(22deg)
              rotateY(15deg);
          }
          60% {
            transform: translateY(60vh) translateX(20px) rotate(-32deg) scale(0.94) rotateX(-25deg)
              rotateY(-18deg);
          }
          70% {
            transform: translateY(70vh) translateX(-14px) rotate(25deg) scale(1.04) rotateX(18deg)
              rotateY(12deg);
          }
          80% {
            transform: translateY(80vh) translateX(16px) rotate(-18deg) scale(0.96) rotateX(-15deg)
              rotateY(-10deg);
          }
          90% {
            transform: translateY(90vh) translateX(-10px) rotate(12deg) scale(1.02) rotateX(8deg)
              rotateY(6deg);
          }
          96% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(115vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-drift {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.4;
          }
          12% {
            transform: translateY(12vh) translateX(-20px) rotate(30deg) scale(1.1) rotateX(25deg)
              rotateY(20deg);
          }
          24% {
            transform: translateY(24vh) translateX(28px) rotate(-40deg) scale(0.9) rotateX(-30deg)
              rotateY(-25deg);
          }
          36% {
            transform: translateY(36vh) translateX(-25px) rotate(45deg) scale(1.12) rotateX(35deg)
              rotateY(28deg);
          }
          48% {
            transform: translateY(48vh) translateX(32px) rotate(-35deg) scale(0.88) rotateX(-28deg)
              rotateY(-20deg);
          }
          60% {
            transform: translateY(60vh) translateX(-28px) rotate(38deg) scale(1.08) rotateX(30deg)
              rotateY(22deg);
          }
          72% {
            transform: translateY(72vh) translateX(30px) rotate(-25deg) scale(0.92) rotateX(-22deg)
              rotateY(-18deg);
          }
          84% {
            transform: translateY(84vh) translateX(-18px) rotate(20deg) scale(1.04) rotateX(15deg)
              rotateY(12deg);
          }
          95% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(120vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-whisper {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.35;
          }
          15% {
            transform: translateY(15vh) translateX(-30px) rotate(50deg) scale(1.15) rotateX(40deg)
              rotateY(30deg);
          }
          30% {
            transform: translateY(30vh) translateX(38px) rotate(-60deg) scale(0.85) rotateX(-45deg)
              rotateY(-35deg);
          }
          45% {
            transform: translateY(45vh) translateX(-35px) rotate(70deg) scale(1.2) rotateX(50deg)
              rotateY(40deg);
          }
          60% {
            transform: translateY(60vh) translateX(42px) rotate(-45deg) scale(0.8) rotateX(-38deg)
              rotateY(-28deg);
          }
          75% {
            transform: translateY(75vh) translateX(-25px) rotate(35deg) scale(1.1) rotateX(28deg)
              rotateY(22deg);
          }
          90% {
            transform: translateY(90vh) translateX(20px) rotate(-20deg) scale(0.9) rotateX(-18deg)
              rotateY(-15deg);
          }
          94% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(125vh) translateX(0px) rotate(0deg) scale(1) rotateX(0deg)
              rotateY(0deg);
            opacity: 0;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 12s ease-in-out infinite;
        }

        .animate-float-0 {
          animation: float-0 8s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 10s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        .animate-sakura-gentle {
          animation: sakura-gentle ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-sway {
          animation: sakura-sway ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-drift {
          animation: sakura-drift ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-whisper {
          animation: sakura-whisper ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
