'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ConceptValues() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const values = [
    {
      title: 'あなたが輝く姿が、家族の希望になる',
      subtitle: 'お子さんやお孫さんにとって、最高のお手本',
      description:
        'あなたが「Tomorie」で楽しそうにしている姿を見たお子さんやお孫さんは、きっとこう思うでしょう。「おじいちゃん、おばあちゃん、すごく楽しそう！年を重ねるのも素敵だな」と。人生の先輩方が笑顔でいる社会は、若い世代にとって希望そのものです。',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'あなたの輝きが、日本全体を照らす光',
      subtitle: '一人ひとりの笑顔が、社会を明るくする力になる',
      description:
        'あなたの輝きは、ご家族を安心させ、ひいては日本全体を明るく照らす、かけがえのない「灯り」なのです。皆様が生き生きと過ごす日常こそが、最高の社会貢献。それが私たちの確信です。',
      icon: '🌟',
    },
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            あなたの笑顔が、日本を元気にする理由
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            なぜ、私たちがここまで皆様の輝きにこだわるのか。
            それは、皆様が生き生きと過ごす日常こそが、最高の社会貢献になると信じているからです。
          </p>
        </div>

        <div className="space-y-12 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`transition-all duration-700 delay-${index * 200} ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-5xl mb-6">{value.icon}</div>
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 leading-relaxed">
                    {value.title}
                  </h3>
                  <p className="text-lg text-primary-600 font-medium mb-6">
                    {value.subtitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-primary-50 rounded-2xl p-12">
          <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
            さあ、はじめましょう。あなたの第二の青春を。
          </h3>
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Tomorieというアトリエで、あなたの物語を、もう一度、鮮やかに彩ってください。
            </p>
            <p className="text-xl md:text-2xl text-primary-700 font-medium leading-relaxed">
              私たちは、あなたの毎日が輝くためのお手伝いを、全力でさせていただきます。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service">
              <Button size="lg" className="px-12 py-4 text-lg">
                サービス詳細を見る
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="outline"
                size="lg"
                className="px-12 py-4 text-lg"
              >
                無料登録する
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
