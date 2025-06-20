import { Button } from '@/components/ui/Button';
import { FloatingBubbles } from '@/components/ui/FloatingBubbles';
import { Icons } from '@/components/ui/Icons';
import Link from 'next/link';

export default function ServiceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50 py-20">
      {/* 浮遊するバブル装飾 */}
      <FloatingBubbles />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          サービス詳細
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          トモリエは、60歳以上の方のための安心・安全なマッチングサービスです。
          <br />
          シンプルな操作性と充実したサポート体制で、新しいつながりを応援します。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/auth/register">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
              今すぐ無料で始める
              <Icons.chevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              料金プランを見る
            </Button>
          </Link>
        </div>

        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
          <Icons.check className="w-5 h-5" />
          <span className="font-medium">無料登録でプロフィール作成可能</span>
        </div>
      </div>
    </section>
  );
}
