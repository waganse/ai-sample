'use client';

import Link from 'next/link';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          今すぐトモリエを始めませんか？
        </h2>
        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
          まずは無料登録で、どんな方々がいらっしゃるかご覧ください。
          きっと素敵な出会いが待っています。
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

          <Link href="/service">
            <Button
              size="lg"
              className="w-full sm:w-auto text-xl px-8 py-4 bg-primary-800 hover:bg-primary-900 border-primary-800"
            >
              サービスについて
            </Button>
          </Link>
        </div>

        <p className="text-lg text-primary-200 mt-6">
          すでにアカウントをお持ちの方は{' '}
          <Link
            href="/auth/login"
            className="text-white hover:text-primary-100 font-medium underline"
          >
            こちらからログイン
          </Link>
        </p>
      </div>
    </section>
  );
}
