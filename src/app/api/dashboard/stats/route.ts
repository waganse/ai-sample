import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // 認証確認
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session?.user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

    // ユーザーのプロフィールを取得
    const userProfile = await prisma.user.findUnique({
      where: { authId: session.user.id },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'ユーザープロフィールが見つかりません' },
        { status: 404 }
      );
    }

    // 統計データを並列で取得
    const [
      newMatchesCount,
      unreadMessagesCount,
      profileViewsCount,
      upcomingEventsCount
    ] = await Promise.all([
      // 新しいマッチ数（過去7日間）
      prisma.match.count({
        where: {
          OR: [
            { user1Id: userProfile.id },
            { user2Id: userProfile.id }
          ],
          matchedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // 未読メッセージ数
      // Messageテーブルには receiverId がないため、マッチから計算
      prisma.message.count({
        where: {
          match: {
            OR: [
              { user1Id: userProfile.id },
              { user2Id: userProfile.id }
            ]
          },
          senderId: { not: userProfile.id },
          isRead: false
        }
      }),

      // プロフィール閲覧数（代替として今月受けたいいね数）
      prisma.like.count({
        where: {
          toUserId: userProfile.id,
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // 参加予定イベント数（今後のイベント）
      prisma.eventParticipant.count({
        where: {
          userId: userProfile.id,
          event: {
            startDatetime: {
              gte: new Date()
            }
          }
        }
      })
    ]);

    return NextResponse.json({
      newMatches: newMatchesCount,
      unreadMessages: unreadMessagesCount,
      profileViews: profileViewsCount,
      upcomingEvents: upcomingEventsCount,
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: '統計データの取得に失敗しました' },
      { status: 500 }
    );
  }
}