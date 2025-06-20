'use client';

import { useEffect, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

interface FAQSectionProps {
  showAnimations?: boolean;
  variant?: 'full' | 'compact';
  sectionId?: string;
  className?: string;
  backgroundClassName?: string;
}

export default function FAQSection({
  showAnimations = false,
  variant = 'full',
  sectionId = 'faq',
  className = 'py-10 md:py-20 bg-white px-3 md:px-5',
  backgroundClassName = 'bg-white',
}: FAQSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    if (showAnimations) {
      setIsVisible(true);
    }
  }, [showAnimations]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // 完全版のFAQ（サービスページ用）
  const fullFaqs: FAQCategory[] = [
    {
      category: '基本的な質問',
      questions: [
        {
          question: '60歳以上でないと利用できませんか？',
          answer:
            'はい、トモリエは60歳以上の方々に特化したサービスです。同世代の方々との出会いを大切にしているため、年齢制限を設けさせていただいております。',
        },
        {
          question: 'スマートフォンが苦手でも使えますか？',
          answer:
            'もちろんです。トモリエは「シンプルで分かりやすい」をモットーに設計されています。大きな文字、分かりやすいボタン配置で、スマートフォンが苦手な方でも安心してご利用いただけます。',
        },
        {
          question: '月額料金以外に追加費用はかかりますか？',
          answer:
            '基本的に月額料金以外の追加費用はございません。メッセージ送信、プロフィール閲覧、検索機能など、すべて月額料金に含まれています。',
        },
      ],
    },
    {
      category: '登録・プロフィールについて',
      questions: [
        {
          question: '登録に必要なものは何ですか？',
          answer:
            'メールアドレスと身分証明書（運転免許証、パスポートなど）が必要です。本人確認は安全なサービス運営のため必須とさせていただいております。',
        },
        {
          question: '写真の掲載は必須ですか？',
          answer:
            '写真の掲載は必須ではありませんが、プロフィール写真があることで出会いの機会が大幅に向上します。お顔が分からないお相手との出会いに不安を感じる方も多いためです。',
        },
        {
          question: 'プロフィールは後から変更できますか？',
          answer:
            'はい、いつでも変更可能です。趣味や自己紹介文、写真なども自由に更新していただけます。',
        },
      ],
    },
    {
      category: '出会い・マッチングについて',
      questions: [
        {
          question: 'どのような方と出会えますか？',
          answer:
            '60歳以上の、人生経験豊富で落ち着いた大人の方々と出会えます。パートナー探しの方から、友人や趣味仲間を探している方まで様々です。',
        },
        {
          question: 'メッセージの送り方を教えてください',
          answer:
            'お相手のプロフィールで「いいね」を送り、相手も「いいね」を返してくれたらマッチング成立です。その後、メッセージのやり取りができるようになります。',
        },
        {
          question: '実際に会うまでの流れは？',
          answer:
            'メッセージ交換で親しくなったら、まずは人が多いカフェやレストランでお食事やお茶から始めることをお勧めしています。安全を第一に考えてください。',
        },
      ],
    },
    {
      category: '安全・サポートについて',
      questions: [
        {
          question: '怪しい人がいた場合はどうすればいいですか？',
          answer:
            'すぐに「報告・ブロック」機能をご利用ください。専門スタッフが迅速に調査し、適切な対応を取らせていただきます。',
        },
        {
          question: 'サポートはどのように受けられますか？',
          answer:
            'メールサポートを24時間受け付けています。使い方のご質問から、出会いに関するお悩みまで、専門スタッフが親身にサポートいたします。',
        },
        {
          question: '個人情報は安全ですか？',
          answer:
            'はい、SSL暗号化通信や厳重なセキュリティ体制で個人情報を保護しています。第三者への情報提供は一切行いません。',
        },
      ],
    },
    {
      category: '料金・解約について',
      questions: [
        {
          question: '無料体験期間中に解約できますか？',
          answer:
            'はい、7日間の無料体験期間中はいつでも解約可能です。期間中に解約された場合、料金は一切発生しません。',
        },
        {
          question: '支払い方法は何がありますか？',
          answer:
            'クレジットカード決済をご利用いただけます。VISA、MasterCard、JCB、American Expressに対応しています。',
        },
        {
          question: '解約方法を教えてください',
          answer:
            'アプリ内の設定画面から簡単に解約手続きができます。解約後も一定期間はメッセージ履歴の確認が可能です。',
        },
      ],
    },
  ];

  // コンパクト版のFAQ（トップページ用）
  const compactFaqs: FAQItem[] = [
    {
      question: 'スマートフォンの操作に自信がないのですが、大丈夫でしょうか？',
      answer:
        'はい、大丈夫です。トモリエは60歳以上の方を対象に、特にシンプルで使いやすい設計にしています。大きな文字と直感的なボタン操作で、スマートフォンが苦手な方でも安心してお使いいただけます。また、メールサポートもございますので、困った時はいつでもお気軽にご連絡ください。',
    },
    {
      question: '本当に安全なサービスですか？',
      answer:
        '安全性には最大限の配慮をしています。24時間365日の監視体制で不適切な利用者を排除し、身分証明書による本人確認も徹底しています。また、個人情報の管理も厳重に行っており、プライバシーマーク認定企業として運営しています。',
    },
    {
      question: '恋愛だけでなく、友達作りでも利用できますか？',
      answer:
        'もちろんです。むしろトモリエでは「まずはお茶飲み友達から」という文化を大切にしています。趣味のサークル機能や日記機能を通じて、気軽な友人関係から始められる温かいコミュニティを目指しています。',
    },
    {
      question: '料金体系について詳しく教えてください。',
      answer:
        '月額980円からのシンプルな料金体系です。7日間の無料お試し期間があり、いつでも変更・解約が可能です。大手サービスと比べて半額以下の価格で、充実した機能とサポートを提供しています。',
    },
  ];

  if (variant === 'compact') {
    return (
      <section id={sectionId} className={className}>
        <div className="container-max">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              よくあるご質問
            </h2>
            <p className="text-xl text-gray-600">
              皆様からよくお寄せいただくご質問にお答えします。
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {compactFaqs.map((faq, index) => (
              <div
                key={index}
                className={`${backgroundClassName} rounded-xl p-5 md:p-8 shadow-sm`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Q. {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">A. {faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              その他のご質問がございましたら、お気軽にお問い合わせください。
            </p>
            <button className="btn-primary">お問い合わせする</button>
          </div>
        </div>
      </section>
    );
  }

  // フル版のFAQ（アコーディオン式）
  return (
    <section id={sectionId} className={className}>
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 font-medium text-sm mb-6">
            ❓ よくあるご質問
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            お客様からよく寄せられるご質問
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            トモリエに関するご不明点にお答えします。こちらにない質問がございましたら、お気軽にお問い合わせください
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {fullFaqs.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`mb-12 ${showAnimations && isVisible ? 'animate-fade-in-up' : ''}`}
              style={
                showAnimations
                  ? { animationDelay: `${categoryIndex * 200}ms` }
                  : {}
              }
            >
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white text-center">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={questionIndex}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h4>
                        <div
                          className={`transform transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          <svg
                            className="w-6 h-6 text-gray-500"
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
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-2xl font-bold mb-4">
            他にご質問がございますか？
          </h3>
          <p className="text-lg mb-6 opacity-90">
            専門スタッフが24時間体制でサポートいたします。
            <br />
            どんな小さなことでもお気軽にお問い合わせください。
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              メールでお問い合わせ
            </button>
            <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-30 transition-colors">
              ヘルプセンター
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
