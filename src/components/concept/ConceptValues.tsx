'use client';

import { useState, useEffect, useRef } from 'react';

export default function ConceptValues() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const values = [
    {
      title: "シンプル",
      subtitle: "誰でも使えるように、とことん簡単に",
      description: "スマートフォンが苦手な方でも、直感的に操作できるインターフェース。大きな文字、わかりやすいボタン、迷わない設計で、テクノロジーの恩恵を誰もが享受できるように。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      color: "from-blue-400 to-cyan-400",
      features: ["大きく見やすい文字", "直感的な操作", "迷わないデザイン"]
    },
    {
      title: "安心",
      subtitle: "24時間365日、私たちが責任をもって見守ります",
      description: "プライバシーの保護、なりすまし防止、不適切な利用者の排除。専門スタッフが常時監視し、安全で安心できる出会いの場を提供します。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-6a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      color: "from-green-400 to-emerald-400",
      features: ["24時間監視体制", "本人確認必須", "専門スタッフサポート"]
    },
    {
      title: "つながり",
      subtitle: "一人ひとりに寄り添う、温かなコミュニティ",
      description: "単なるマッチングを超えて、共通の趣味や価値観でつながる深い関係性を。お互いを尊重し、支え合える、温かなコミュニティの実現を目指します。",
      icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
      color: "from-pink-400 to-rose-400",
      features: ["趣味でつながる", "価値観の共有", "温かなコミュニティ"]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container-max px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            私たちの
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
              約束
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            60歳からの新しい出会いを、安心して楽しんでいただくために
          </p>
        </div>

        {/* Values grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={`group transition-all duration-1000 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-full">
                {/* Background glow */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${value.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-all duration-500`} />
                
                <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {value.icon}
                  </div>
                  
                  {/* Title and subtitle */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-lg font-medium text-primary-600">
                      {value.subtitle}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
                    {value.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {value.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${value.color}`} />
                        <span className="text-sm text-gray-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative bottom line */}
                  <div className={`mt-6 h-1 bg-gradient-to-r ${value.color} rounded-full opacity-30 group-hover:opacity-60 transition-all duration-300`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center">
            <button className="group relative overflow-hidden btn-primary text-xl px-12 py-5 hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <span className="relative z-10 flex items-center justify-center">
                安心して始める
                <svg
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300"
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
              </span>
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                7日間無料体験 • 月額980円 • いつでも退会可能
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}