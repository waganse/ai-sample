export default function Testimonials() {
  const testimonials = [
    {
      name: '田中 美恵子さん',
      age: '56歳',
      location: '東京都',
      text: '子育てが終わり、自分の時間ができたときに友人に勧められました。最初は不安でしたが、電話サポートの方がとても親切で、安心して始められました。今では趣味の写真サークルで素敵な仲間に出会え、毎日が楽しくなりました。',
      avatar: '👩',
    },
    {
      name: '佐藤 健一郎さん',
      age: '62歳',
      location: '大阪府',
      text: '定年退職後、妻と一緒に新しい友人を作りたくて始めました。操作がとてもシンプルで、私のようなスマホ初心者でも迷うことなく使えています。同世代の方々と旅行の話で盛り上がり、実際にお会いすることもできました。',
      avatar: '👨',
    },
    {
      name: '山田 さち子さん',
      age: '54歳',
      location: '福岡県',
      text: '転勤で知らない土地に来て寂しい思いをしていました。トモリエでは地域のコミュニティ機能があり、近所の方々と繋がることができました。料理教室のイベントに参加して、今では良いお友達になっています。',
      avatar: '👩',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">利用者の声</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            実際にトモリエをご利用いただいている皆様から、嬉しいお声をいただいています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.age} · {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="flex mt-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            ※お客様個人の感想であり、効果を保証するものではありません
          </p>
        </div>
      </div>
    </section>
  );
}
