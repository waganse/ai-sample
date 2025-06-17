'use client';

import { useState, useEffect } from 'react';
import SakuraAnimation from '@/components/shared/SakuraAnimation';

export default function ConceptHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-gradient-to-br from-primary-50 via-white to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Sakura Animation */}
        <SakuraAnimation
          size="large"
          intensity="subtle"
          asBackground={true}
          layers={{ main: 6, offset: 4, slow: 3, micro: 2 }}
        />

        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-pink-200/30 rounded-full animate-pulse blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full animate-bounce blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-200/30 to-primary-200/30 rounded-full animate-pulse delay-1000 blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-primary-150/30 to-pink-250/30 rounded-full animate-spin-slow blur-xl" />
      </div>

      <div className="container-max relative z-10 min-h-[100vh] flex items-center justify-center text-center px-6 py-12 md:py-0">
        <div className="max-w-4xl space-y-12">
          {/* Main headline */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              <p className="mb-2">人生の先輩たちが</p>
              <p className="mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-pink-500 to-purple-600 animate-gradient-x">
                  輝く国
                </span>
                は、
              </p>
              きっともっと
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-primary-600 animate-gradient-x">
                強くなる
              </span>
              。
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`space-y-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              人生100年時代。
              <br />
              私たちは、60歳という節目を
              <br />
              <span className="font-bold text-primary-600">「第二の成人式」</span>
              だと考えています。
            </p>
          </div>

          {/* Message */}
          <div
            className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-primary-100">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                これまで日本を支え、家族を守り、懸命に走り続けてきたあなたへ。
                <br />
                <span className="font-semibold text-primary-700">
                  心からの敬意と感謝を込めて、この場所を贈ります。
                </span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '900ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative overflow-hidden btn-primary text-xl px-12 py-5 hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center">
                  あなたの第二の青春を始める
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`pt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1200ms' }}
          >
            <div className="flex justify-center">
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 text-primary-600"
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
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">スクロールして想いを読む</p>
          </div>
        </div>
      </div>
    </section>
  );
}
