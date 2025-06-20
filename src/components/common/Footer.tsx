'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ト</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">トモリエ</h3>
                <p className="text-sm text-gray-600">心に灯りをともす</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              人生経験豊富な大人世代のための、 新しい出会いとコミュニティの場所
            </p>
          </div>

          {/* サービス */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              サービス
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/concept"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  私たちの想い
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  サービスについて
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  料金プラン
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  安全への取り組み
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              サポート
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-lg">
              © 2024 トモリエ. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-primary-600 transition-colors text-lg"
              >
                プライバシー
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-primary-600 transition-colors text-lg"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
