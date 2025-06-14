'use client';

import { useState } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際の登録処理を行います
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6">
            今すぐ始めて、新しい出会いを見つけませんか？
          </h2>
          <p className="md:text-xl mb-8 text-primary-100 leading-relaxed">
            7日間の無料お試し期間があります。
            <br className="sm:hidden" />
            まずは気軽に始めてみましょう。
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレスを入力してください"
                  className="flex-1 px-6 py-4 text-gray-900 rounded-lg md:text-lg focus:outline-none focus:ring-4 focus:ring-primary-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                  無料で始める
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-600 rounded-lg p-8 mb-8 max-w-lg mx-auto">
              <p className="text-xl font-semibold mb-2">✅ 登録ありがとうございます！</p>
              <p className="text-gray-100">確認メールをお送りしました。メールをご確認ください。</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 text-center text-primary-100">
            <div className="flex items-center justify-center">
              <span className="mr-2 text-2xl">✓</span>
              <span>7日間無料</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-2xl">✓</span>
              <span>いつでも解約可能</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-2xl">✓</span>
              <span>メールサポート付き</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
