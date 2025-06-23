import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';

interface MagicLinkSentMessageProps {
  email: string;
  onChangeEmail: () => void;
  mode: 'login' | 'signup';
}

export function MagicLinkSentMessage({
  email,
  onChangeEmail,
  mode
}: MagicLinkSentMessageProps) {
  const title = mode === 'login' ? 'ログインリンクを送信しました' : '確認リンクを送信しました';
  const description = mode === 'login' 
    ? 'メールのリンクをクリックしてログインを完了してください' 
    : 'メールのリンクをクリックして登録を完了してください';

  return (
    <>
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <Icons.mail className="w-16 h-16 text-primary-600 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-600 mb-2">
          {description}
        </p>
        <p className="text-base text-gray-500">
          送信先: <span className="font-medium text-gray-700">{email}</span>
        </p>
      </div>

      {/* 手順説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-medium text-blue-900 mb-4">次の手順:</h4>
        <ol className="space-y-3 text-blue-800">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span>メールボックスを確認してください</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span>「トモリエへのログイン」という件名のメールを探してください</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span>メール内の「ログインする」ボタンをクリックしてください</span>
          </li>
        </ol>
      </div>

      {/* 注意事項 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex">
          <Icons.alertCircle className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-amber-800 mb-1">
              メールが届かない場合
            </h5>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• 迷惑メールフォルダをご確認ください</li>
              <li>• メールアドレスに誤りがないかご確認ください</li>
              <li>• 数分待ってから再度お試しください</li>
            </ul>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="text-center space-y-4">
        <Button
          variant="outline"
          onClick={onChangeEmail}
          className="w-full text-lg"
        >
          メールアドレスを変更する
        </Button>
        
        <p className="text-sm text-gray-500">
          メールのリンクは15分間有効です
        </p>
      </div>
    </>
  );
}