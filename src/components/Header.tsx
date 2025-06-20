'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      // 少し遅延してアニメーションを開始
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      // アニメーション完了後にメニューを閉じる
      setTimeout(() => setIsMenuOpen(false), 700);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between px-3 py-3 md:py-6">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">
              トモリエ
            </h1>
            <span className="ml-3 text-sm text-gray-600 hidden sm:block">
              Tomorie
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/concept"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              私たちの想い
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              料金プラン
            </Link>
            <Link
              href="/service"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              サービス詳細
            </Link>
            <a href="#contact" className="btn-secondary">
              お問い合わせ
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 relative z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop with blur effect */}
            <div
              className={`fixed inset-0 bg-black/30 backdrop-blur-md z-30 transition-all duration-700 ease-out ${
                isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={toggleMenu}
            />

            {/* Animated Menu Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 transform transition-all duration-700 ease-out ${
                isAnimating
                  ? 'translate-x-0 scale-100'
                  : 'translate-x-full scale-95'
              }`}
            >
              {/* Menu Header with enhanced design */}
              <div
                className={`relative bg-gradient-to-br from-primary-600 via-primary-500 to-pink-500 text-white p-6 overflow-hidden transition-all duration-700 ${
                  isAnimating
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-4 opacity-90'
                }`}
              >
                {/* Animated background elements */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 transition-all duration-1000 ${
                    isAnimating ? 'animate-pulse' : 'scale-75 opacity-50'
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 transition-all duration-1000 ${
                    isAnimating ? 'animate-bounce' : 'scale-75 opacity-50'
                  }`}
                />

                <div className="relative z-10">
                  <h2
                    className={`text-2xl font-bold mb-2 transition-all duration-700 ${
                      isAnimating
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: isAnimating ? '200ms' : '0ms' }}
                  >
                    トモリエ
                  </h2>
                  <p
                    className={`text-primary-100 text-sm transition-all duration-700 ${
                      isAnimating
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: isAnimating ? '300ms' : '0ms' }}
                  >
                    Tomorie
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-110"
                  aria-label="メニューを閉じる"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-6">
                <nav className="space-y-2">
                  {[
                    {
                      href: '/concept',
                      label: '私たちの想い',
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ),
                    },
                    {
                      href: '/pricing',
                      label: '料金プラン',
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 8l3-3 3 3M9 16l3 3 3-3M12 3v18M8 12h8"
                          />
                        </svg>
                      ),
                    },
                    {
                      href: '/service',
                      label: 'サービス詳細',
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      ),
                    },
                  ].map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className={`group flex items-center space-x-4 p-4 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                        isAnimating
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-8'
                      }`}
                      style={{
                        transitionDelay: isAnimating
                          ? `${index * 100 + 400}ms`
                          : '0ms',
                      }}
                    >
                      <span className="group-hover:animate-bounce">
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium">{item.label}</span>
                      <svg
                        className="w-5 h-5 ml-auto transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </nav>

                {/* CTA Section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <a
                      href="#contact"
                      onClick={toggleMenu}
                      className={`group relative overflow-hidden block w-full btn-primary text-center py-4 text-lg font-semibold hover:scale-105 transition-all duration-500 ${
                        isAnimating
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: isAnimating ? '900ms' : '0ms' }}
                    >
                      <span className="relative z-10">お問い合わせ</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </a>

                    <button
                      onClick={toggleMenu}
                      className={`group w-full btn-secondary text-center py-4 text-lg font-semibold hover:scale-105 transition-all duration-500 ${
                        isAnimating
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: isAnimating ? '1000ms' : '0ms',
                      }}
                    >
                      無料で始める
                      <svg
                        className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300"
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
