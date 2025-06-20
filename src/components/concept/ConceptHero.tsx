'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FloatingBubbles } from '@/components/ui/FloatingBubbles';

export default function ConceptHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-orange-50 overflow-hidden">
      {/* 浮遊するバブル装飾 */}
      <FloatingBubbles />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight mb-8">
            <span className="block font-thin">あなたの物語が</span>
            <span className="block font-medium text-primary-600">日本の未来を灯す</span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              戦後の日本を創り、高度成長を支え、今日の豊かな国を築いてこられた皆様へ。
              運営スタッフ一同より、心からの敬意と感謝を込めて、お話しさせてください。
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              大きな仕事を成し遂げ、お子様を立派に育て上げ、ふと一息ついた時。
              「社会に、自分の役割がなくなった気がする…」「昔のように、誰かと夢中になって話せる機会が減ってしまった…」
              そんな風に、少しだけ寂しさを感じたことはありませんか？
            </p>
            
            <p className="text-xl md:text-2xl text-primary-700 font-medium leading-relaxed">
              もしそうなら、私たちは、大きな声で伝えたいのです。
              「とんでもない！あなたの豊かな人生経験こそ、今の日本が一番必要としている光です」と。
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <Link href="#story">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                3つのお約束を見る
              </Button>
            </Link>
            <Link href="/service">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                サービス詳細へ
              </Button>
            </Link>
          </div>
          
          <p className="text-base text-gray-500 mt-8 max-w-3xl mx-auto">
            「Tomorie（トモリエ）」は、私たちが心を込めて創り上げた、皆様のための「新しい活躍の舞台（アトリエ）」です。
            ここは、皆様が安心して心を開き、新しい仲間と出会い、ご自身の「好き」をもう一度咲かせるための特別な場所です。
          </p>
        </div>
      </div>
    </section>
  );
}