'use client';

import { useState, useEffect, useRef } from 'react';

export default function ConceptStory() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, index]);
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

  const stories = [
    {
      title: "自分だけの時間が、ようやく訪れた",
      content: "仕事や子育てという大きな役目を終え、ようやく訪れた、自分だけの時間。その貴重な時間を、ただ過ぎ去るのを待つのではなく、もう一度、心躍るような出会いや、夢中になれる喜びに満たしたものにしてほしい。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      color: "from-orange-400 to-pink-400"
    },
    {
      title: "温かなつながりの物語",
      content: "「おはよう」と挨拶を交わす散歩仲間。思い出の歌を一緒に口ずさむカラオケ友達。豊富な知識や経験を、次の世代にそっと伝える語らいの相手。そんな、温かなつながりが生まれることで、あなたの毎日は、もっと豊かに、もっと色鮮やかになるはずです。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "この国の一番の元気の源",
      content: "そして、私たちは信じています。人生の先輩たちが笑顔でいること、それが、この国の一番の元気の源だと。あなたが生き生きと毎日を楽しむ姿は、きっと、あなたのお子さんやお孫さんたちにとって、未来への希望の光となります。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
      color: "from-green-400 to-blue-400"
    },
    {
      title: "世代をつなぐ社会インフラ",
      content: "このアプリは、単なる「出会いの道具」ではありません。それは、シニア世代が輝くことで、若者世代も、そして日本も元気になる未来を創るための、ささやかだけれど、確かな一歩。私たちは、そんな「世代をつなぐ社会インフラ」を目指しています。",
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
      color: "from-purple-400 to-pink-400"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-primary-25 to-white">
      <div className="container-max px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          {stories.map((story, index) => (
            <div
              key={index}
              ref={el => sectionRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleSections.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
            >
              {/* Story card */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-100/50 via-transparent to-pink-100/50 rounded-3xl blur-xl" />
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
                  {/* Icon and title */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center shadow-lg`}>
                      {story.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {story.title}
                    </h2>
                  </div>
                  
                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                      {story.content}
                    </p>
                  </div>
                  
                  {/* Decorative line */}
                  <div className={`mt-8 h-1 bg-gradient-to-r ${story.color} rounded-full opacity-30`} />
                </div>
              </div>
            </div>
          ))}
          
          {/* Final message */}
          <div
            ref={el => sectionRefs.current[stories.length] = el}
            className={`transition-all duration-1000 delay-300 ${
              visibleSections.includes(stories.length) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-primary-200/30 via-pink-200/30 to-purple-200/30 rounded-full blur-2xl" />
                <div className="relative bg-gradient-to-br from-primary-600 via-pink-500 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    さあ、はじめましょう。
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed mb-8">
                    あなたの輝きで、この国を、もっと元気に。
                    <br />
                    あなたの「第二の青春」が、今、ここから始まります。
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="group relative overflow-hidden bg-white text-primary-600 hover:text-white hover:bg-primary-700 text-xl px-12 py-5 rounded-full font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <span className="relative z-10 flex items-center justify-center">
                        無料で始める
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
                    
                    <button className="group text-white border-2 border-white/50 hover:border-white hover:bg-white/10 text-xl px-12 py-5 rounded-full font-semibold transition-all duration-500 hover:scale-105 backdrop-blur-sm">
                      サービス詳細を見る
                      <svg
                        className="w-5 h-5 ml-2 inline group-hover:rotate-90 transition-transform duration-300"
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}