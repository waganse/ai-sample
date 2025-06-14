'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ServiceHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: '/images/main.png',
      alt: '縁日和で素敵な出会いを見つけた60歳以上の方々',
      title: '安心のマッチング',
      subtitle: '60歳からの新しいスタート',
    },
    {
      src: '/images/main2.png',
      alt: '縁日和で友達の輪を広げた60歳以上の方々',
      title: '友達作りから',
      subtitle: '趣味の仲間と楽しく',
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
      title: 'パートナー探し',
      subtitle: '心ときめく出会いを',
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
    <section className="relative min-h-[80vh] bg-gradient-to-br from-primary-50 via-gray-50 to-primary-100 overflow-hidden md:pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-300 rounded-full opacity-25 animate-pulse delay-1000"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      <div className="container-max relative z-10 section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-800 font-medium text-sm">
                縁日和のサービス詳細
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                安心・簡単・
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                  60歳からの
                </span>
                <br />
                新しい出会い
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed">
                縁日和は、60歳以上の方々が安心して利用できる、月額980円のマッチングサービスです。
                <br />
                シンプルな操作性と充実したサポート体制で、
                <br />
                <span className="font-semibold text-primary-600">
                  人生の新しい章を素敵な仲間とともに。
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4">今すぐ無料で始める</button>
              <button
                className="btn-secondary text-lg px-8 py-4"
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                料金プランを見る
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-primary-100 to-gray-100 rounded-2xl p-4 shadow-inner">
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
                  <div className="absolute bottom-4 left-4 right-4">
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
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
    </section>
  );
}
