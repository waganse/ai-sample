'use client';

import { useState, useEffect, useRef } from 'react';

export default function ConceptStory() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stories = [
    {
      title: "心から安心できる「居場所」であること",
      subtitle: "馴染みの店のような温かく、絶対に安全な場所",
      content: "私たちは、皆様の安全と安心を何よりも大切にします。24時間365日、専門のスタッフがアプリ内を見守り、不適切な言動や不審な勧誘がないか、常に目を光らせています。まるで、馴染みの店の店主が「いらっしゃい！」と笑顔で迎えてくれるような、温かく、そして絶対に安全な場所。それが私たちの誇りです。",
      icon: "🏠"
    },
    {
      title: "新しい「仲間」や「ときめき」と出会えること",
      subtitle: "同じ時代を生きてきた、話の合う仲間がたくさんいます",
      content: "「Tomorie」には、あなたと同じ時代を生きてきた、話の合う仲間がたくさんいます。ご近所の公園まで、一緒に散歩してくれる友達。思い出の歌謡曲で、一緒に盛り上がれるカラオケ仲間。丹精込めて育てたお庭の花を、褒め合える趣味友達。恋愛に限定しない、心温まる出会いがここにはあります。もちろん、人生のパートナーとして、もう一度ときめきを感じられる素敵な出会いが待っているかもしれません。",
      icon: "🤝"
    },
    {
      title: "忘れていた「夢中」を、もう一度思い出せること",
      subtitle: "心の奥にしまっていた「好き」を、もう一度取り出してみませんか",
      content: "「昔、編み物が好きだったな」「若い頃、よく写真を撮りに行ったっけ」そんな、心の奥にしまっていた「好き」を、もう一度取り出してみませんか？「手芸サークル」や「写真クラブ」など、様々な趣味の部屋（コミュニティ）をご用意しています。新しい趣味を始めるのも、昔取った杵柄を誰かに教えてあげるのも、ここでは自由です。あなたの人生経験が、誰かの新しい楽しみのきっかけになるのです。",
      icon: "✨"
    }
  ];

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => {
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
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="story" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Tomorieが、あなたにお約束すること
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            私たちが皆様に心からお約束する、3つの大切なこと。
            安心できる居場所、新しい仲間との出会い、そして忘れていた夢中を思い出せる場所であることを、
            お約束いたします。
          </p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <div
              key={index}
              ref={el => { sectionRefs.current[index] = el; }}
              className={`transition-all duration-1000 ${
                visibleSections.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                <div className="flex flex-col items-center gap-8">
                  <div className="text-6xl">{story.icon}</div>
                  <div className="flex-1 text-center max-w-4xl">
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 leading-relaxed">
                      {story.title}
                    </h3>
                    <p className="text-lg text-primary-600 font-medium mb-6">
                      {story.subtitle}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {story.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}