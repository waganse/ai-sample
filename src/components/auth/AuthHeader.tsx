import Link from 'next/link';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <Link href="/" className="inline-flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">ト</span>
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900">トモリエ</h1>
          <p className="text-sm text-gray-600">心に灯りをともす</p>
        </div>
      </Link>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </div>
  );
}
