'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between px-3 py-3 md:py-6">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">縁日和</h1>
            <span className="ml-3 text-sm text-gray-600 hidden sm:block">
              60歳からの新しい出会い
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              特徴
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              料金
            </a>
            <a
              href="#support"
              className="text-gray-700 hover:text-primary-600 text-lg transition-colors"
            >
              サポート
            </a>
            <a href="#contact" className="btn-secondary">
              お問い合わせ
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-primary-600 text-lg py-2">
                特徴
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 text-lg py-2">
                料金
              </a>
              <a href="#support" className="text-gray-700 hover:text-primary-600 text-lg py-2">
                サポート
              </a>
              <a href="#contact" className="btn-secondary w-full text-center mt-4">
                お問い合わせ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
