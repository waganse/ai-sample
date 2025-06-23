'use client';

import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorBoundary';
import { Icons } from '@/components/ui/Icons';
import { LoadingOverlay } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
interface UserStats {
  newMatches: number;
  unreadMessages: number;
  profileViews: number;
  upcomingEvents: number;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    newMatches: 0,
    unreadMessages: 0,
    profileViews: 0,
    upcomingEvents: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ダッシュボードデータの取得
  const fetchDashboardData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // 統計データの取得
      const [statsRes, activityRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/activity'),
      ]);
      
      if (!statsRes.ok || !activityRes.ok) {
        throw new Error('データの読み込みに失敗しました');
      }
      
      const [statsData, activityData] = await Promise.all([
        statsRes.json(),
        activityRes.json(),
      ]);
      
      setStats(statsData.stats || {
        newMatches: 0,
        unreadMessages: 0,
        profileViews: 0,
        upcomingEvents: 0,
      });
      setRecentActivity(activityData.activities || []);
    } catch (error) {
      console.error('Dashboard data error:', error);
      setError('データの読み込みに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchDashboardData();
    }
  }, [authLoading, user]);

  if (authLoading) {
    return (
      <LoadingOverlay isLoading={true} message="認証確認中...">
        {null}
      </LoadingOverlay>
    );
  }

  if (!user) {
    return null; // リダイレクト処理はuseAuthで実行
  }

  return (
    <Layout showTabNavigation={true}>
      <div className="min-h-screen bg-gray-50">
        <LoadingOverlay isLoading={isLoading} message="読み込み中...">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                こんにちは、{user?.user_metadata?.display_name || 'さん'}
              </h1>
              <p className="text-xl text-gray-600">
                今日も素敵な出会いとコミュニティをお楽しみください
              </p>
            </div>

            {error && (
              <div className="mb-8">
                <ErrorMessage
                  title="データ読み込みエラー"
                  message={error}
                  onRetry={() => fetchDashboardData()}
                />
              </div>
            )}

            {/* 統計カード */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600">
                      新しいマッチ
                    </p>
                    <p className="text-3xl font-bold text-primary-600">
                      {stats.newMatches}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icons.heart className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/matches">
                    <Button variant="ghost" size="sm" className="w-full">
                      確認する
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600">
                      未読メッセージ
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.unreadMessages}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icons.message className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/messages">
                    <Button variant="ghost" size="sm" className="w-full">
                      確認する
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600">
                      プロフィール閲覧
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.profileViews}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icons.user className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="w-full">
                      プロフィール
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-600">
                      参加予定イベント
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {stats.upcomingEvents}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icons.users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/communities">
                    <Button variant="ghost" size="sm" className="w-full">
                      確認する
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 最近のアクティビティ */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      最近のアクティビティ
                    </h2>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fetchDashboardData()}
                        disabled={isLoading}
                      >
                        <Icons.loader className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        更新
                      </Button>
                      <Button variant="ghost" size="sm">
                        すべて表示
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4">
                      <ErrorMessage
                        message={error}
                        onRetry={() => fetchDashboardData()}
                      />
                    </div>
                  )}

                  {recentActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <Icons.bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-xl text-gray-600 mb-2">
                        まだアクティビティがありません
                      </p>
                      <p className="text-lg text-gray-500">
                        プロフィールを充実させて、アクティブに参加してみましょう
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.map((activity) => {
                        // アクティビティタイプに応じたアイコンを選択
                        const getActivityIcon = (type: string) => {
                          switch (type) {
                            case 'MATCH':
                              return <Icons.heart className="w-5 h-5 text-pink-600" />;
                            case 'MESSAGE':
                              return <Icons.message className="w-5 h-5 text-blue-600" />;
                            case 'LIKE':
                              return <Icons.heart className="w-5 h-5 text-red-600" />;
                            case 'EVENT_PARTICIPATE':
                              return <Icons.calendar className="w-5 h-5 text-green-600" />;
                            default:
                              return <Icons.user className="w-5 h-5 text-gray-600" />;
                          }
                        };

                        // 時間を相対的な表示に変換
                        const formatRelativeTime = (dateString: string) => {
                          const date = new Date(dateString);
                          const now = new Date();
                          const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                          
                          if (diffInHours < 1) return '1時間未満';
                          if (diffInHours < 24) return `${diffInHours}時間前`;
                          const diffInDays = Math.floor(diffInHours / 24);
                          if (diffInDays < 7) return `${diffInDays}日前`;
                          return date.toLocaleDateString('ja-JP');
                        };

                        return (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                {getActivityIcon(activity.type)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-medium text-gray-900">
                                {activity.title}
                              </p>
                              <p className="text-gray-600">
                                {activity.description}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatRelativeTime(activity.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>

              {/* クイックアクション */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    クイックアクション
                  </h3>
                  <div className="space-y-3">
                    <Link href="/matches" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="lg"
                      >
                        <Icons.heart className="w-5 h-5 mr-3" />
                        お相手を探す
                      </Button>
                    </Link>

                    <Link href="/communities" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="lg"
                      >
                        <Icons.users className="w-5 h-5 mr-3" />
                        コミュニティ
                      </Button>
                    </Link>

                    <Link href="/profile/edit" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="lg"
                      >
                        <Icons.settings className="w-5 h-5 mr-3" />
                        プロフィール編集
                      </Button>
                    </Link>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    今日のTips
                  </h3>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icons.check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-lg font-medium text-primary-900">
                          プロフィール写真を追加しましょう
                        </p>
                        <p className="text-primary-700 mt-1">
                          写真があると、より多くの方からご覧いただけます
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    </Layout>
  );
}
