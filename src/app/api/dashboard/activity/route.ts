import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // 認証確認
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
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

    // 最近のアクティビティを取得（過去14日間）
    const recentDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const [recentMatches, recentMessages, recentLikes, recentEvents] =
      await Promise.all([
        // 新しいマッチ
        prisma.match.findMany({
          where: {
            OR: [{ user1Id: userProfile.id }, { user2Id: userProfile.id }],
            matchedAt: { gte: recentDate },
          },
          include: {
            user1: { select: { displayName: true } },
            user2: { select: { displayName: true } },
          },
          orderBy: { matchedAt: 'desc' },
          take: 3,
        }),

        // 新しいメッセージ（自分が受信したもの）
        prisma.message.findMany({
          where: {
            match: {
              OR: [{ user1Id: userProfile.id }, { user2Id: userProfile.id }],
            },
            senderId: { not: userProfile.id },
            createdAt: { gte: recentDate },
          },
          include: {
            sender: { select: { displayName: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        }),

        // 新しいいいね
        prisma.like.findMany({
          where: {
            toUserId: userProfile.id,
            createdAt: { gte: recentDate },
          },
          include: {
            fromUser: { select: { displayName: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        }),

        // 新しいイベント参加
        prisma.eventParticipant.findMany({
          where: {
            userId: userProfile.id,
            registeredAt: { gte: recentDate },
          },
          include: {
            event: {
              select: {
                title: true,
                startDatetime: true,
                community: {
                  select: { name: true },
                },
              },
            },
          },
          orderBy: { registeredAt: 'desc' },
          take: 3,
        }),
      ]);

    // アクティビティを統合してソート
    const activities: any[] = [];

    // マッチを追加
    recentMatches.forEach((match) => {
      const otherUser =
        match.user1Id === userProfile.id ? match.user2 : match.user1;
      activities.push({
        id: `match-${match.id}`,
        type: 'match',
        title: '新しいマッチ',
        description: `${otherUser.displayName}さんとマッチしました`,
        time: formatRelativeTime(match.matchedAt),
        avatar: null,
        createdAt: match.matchedAt,
      });
    });

    // メッセージを追加
    recentMessages.forEach((message) => {
      activities.push({
        id: `message-${message.id}`,
        type: 'message',
        title: '新しいメッセージ',
        description: `${message.sender.displayName}さんからメッセージが届きました`,
        time: formatRelativeTime(message.createdAt),
        avatar: null,
        createdAt: message.createdAt,
      });
    });

    // いいねを追加
    recentLikes.forEach((like) => {
      activities.push({
        id: `like-${like.id}`,
        type: 'like',
        title: 'いいねをもらいました',
        description: `${like.fromUser.displayName}さんがあなたにいいねしました`,
        time: formatRelativeTime(like.createdAt),
        avatar: null,
        createdAt: like.createdAt,
      });
    });

    // イベント参加を追加
    recentEvents.forEach((eventParticipant) => {
      activities.push({
        id: `event-${eventParticipant.id}`,
        type: 'event',
        title: 'イベントに参加',
        description: `${eventParticipant.event.community?.name || 'コミュニティ'}の「${eventParticipant.event.title}」に参加しました`,
        time: formatRelativeTime(eventParticipant.registeredAt),
        avatar: null,
        createdAt: eventParticipant.registeredAt,
      });
    });

    // 時間順でソートして最新10件を返す
    const sortedActivities = activities
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10)
      .map(({ createdAt, ...activity }) => activity); // createdAtを除去

    return NextResponse.json(sortedActivities);
  } catch (error) {
    console.error('Dashboard activity error:', error);
    return NextResponse.json(
      { error: 'アクティビティデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'たった今';
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;

  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  });
}
