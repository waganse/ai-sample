export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              トモリエ
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              60歳以上の方のための、安心でシンプルなマッチングアプリ。
              <br />
              人生100年時代、心でつながる、第二の仲間を見つけませんか？
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">カスタマーサポート:</span>{' '}
                support@tomorie.jp
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">受付時間:</span>{' '}
                24時間受付（返信は営業日内）
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">メール:</span>{' '}
                support@en-biyori.jp
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">サービス</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary-400 transition-colors"
                >
                  特徴
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-primary-400 transition-colors"
                >
                  料金プラン
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="hover:text-primary-400 transition-colors"
                >
                  サポート
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  使い方ガイド
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  会社概要
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  利用規約
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                プライバシーポリシー
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                利用規約
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                お問い合わせ
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Tomorie. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
