import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 シードデータの投入を開始します...');

  // カテゴリデータ
  const categories = [
    'ガーデニング', '料理', '旅行', '音楽', '読書', 
    '手芸', 'ウォーキング', 'アート', '写真', '映画・演劇',
    '社交ダンス', '囲碁・将棋', 'ヨガ', '語学学習', 'ボランティア'
  ];

  // 都道府県データ
  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  // サンプルユーザーの作成
  const sampleUsers = [];
  
  for (let i = 1; i <= 20; i++) {
    const randomPrefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
    const randomInterests = categories
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 2);
    
    const birthYear = 1950 + Math.floor(Math.random() * 15); // 1950-1964年生まれ
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;
    
    const user = await prisma.user.create({
      data: {
        authId: `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`,
        email: `user${i}@example.com`,
        displayName: `テストユーザー${i}`,
        birthDate: new Date(birthYear, birthMonth - 1, birthDay),
        gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
        prefecture: randomPrefecture,
        city: `${randomPrefecture.replace('県', '').replace('府', '').replace('都', '')}市`,
        bio: `はじめまして。${randomInterests.join('や')}が趣味です。素敵な出会いを楽しみにしています。`,
        interests: randomInterests,
        lookingFor: Math.random() > 0.7 ? 'ROMANCE' : 'FRIENDSHIP',
        isVerified: Math.random() > 0.2, // 80%のユーザーを認証済みに
        verificationStatus: Math.random() > 0.2 ? 'APPROVED' : 'PENDING',
        subscriptionPlan: 'MONTHLY',
        subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
      },
    });
    
    sampleUsers.push(user);
    
    // プロフィール写真を追加
    await prisma.userPhoto.create({
      data: {
        userId: user.id,
        photoUrl: `https://via.placeholder.com/400x400?text=User${i}`,
        isPrimary: true,
        orderIndex: 0,
      },
    });
  }

  console.log(`✅ ${sampleUsers.length}人のサンプルユーザーを作成しました`);

  // サンプルコミュニティの作成
  const sampleCommunities = [];
  
  const communityData = [
    {
      name: 'ガーデニング愛好会',
      description: '季節の花や野菜を育てることが好きな方のコミュニティです。',
      category: 'ガーデニング',
    },
    {
      name: 'お料理サークル',
      description: '美味しい料理のレシピを共有し、みんなで料理を楽しみましょう。',
      category: '料理',
    },
    {
      name: '旅行好き集まれ',
      description: '国内・海外問わず、旅行の情報交換をするコミュニティです。',
      category: '旅行',
    },
    {
      name: '音楽を楽しむ会',
      description: 'クラシックからポップスまで、音楽好きが集まるコミュニティです。',
      category: '音楽',
    },
    {
      name: '読書クラブ',
      description: '本好きの方々で読書感想や おすすめ本を共有しましょう。',
      category: '読書',
    },
  ];

  for (const communityInfo of communityData) {
    const creator = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    
    const community = await prisma.community.create({
      data: {
        name: communityInfo.name,
        description: communityInfo.description,
        category: communityInfo.category,
        creatorId: creator.id,
        memberCount: Math.floor(Math.random() * 50) + 10,
        isPublic: true,
        isActive: true,
      },
    });
    
    sampleCommunities.push(community);
    
    // 作成者をメンバーに追加
    await prisma.communityMember.create({
      data: {
        communityId: community.id,
        userId: creator.id,
        role: 'ADMIN',
      },
    });
    
    // ランダムメンバーを追加
    const memberCount = Math.floor(Math.random() * 10) + 5;
    const shuffledUsers = [...sampleUsers].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(memberCount, shuffledUsers.length); i++) {
      if (shuffledUsers[i].id !== creator.id) {
        await prisma.communityMember.create({
          data: {
            communityId: community.id,
            userId: shuffledUsers[i].id,
            role: 'MEMBER',
          },
        });
      }
    }
  }

  console.log(`✅ ${sampleCommunities.length}のサンプルコミュニティを作成しました`);

  // サンプルイベントの作成
  const sampleEvents = [];
  
  for (let i = 0; i < 10; i++) {
    const organizer = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    const community = sampleCommunities[Math.floor(Math.random() * sampleCommunities.length)];
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + Math.floor(Math.random() * 3) + 1);
    
    const event = await prisma.event.create({
      data: {
        title: `${community.category}イベント ${i + 1}`,
        description: `${community.name}主催のイベントです。皆さんでお楽しみいただけます。`,
        eventType: Math.random() > 0.5 ? 'OFFLINE' : 'ONLINE',
        location: Math.random() > 0.5 ? '東京都渋谷区' : null,
        prefecture: '東京都',
        city: '渋谷区',
        startDatetime: startDate,
        endDatetime: endDate,
        maxParticipants: Math.floor(Math.random() * 20) + 10,
        currentParticipants: Math.floor(Math.random() * 10) + 3,
        fee: Math.random() > 0.5 ? Math.floor(Math.random() * 3000) : 0,
        organizerId: organizer.id,
        communityId: community.id,
        isActive: true,
        registrationDeadline: new Date(startDate.getTime() - 24 * 60 * 60 * 1000),
      },
    });
    
    sampleEvents.push(event);
  }

  console.log(`✅ ${sampleEvents.length}のサンプルイベントを作成しました`);

  // サンプルいいね・マッチの作成
  let matchCount = 0;
  
  for (let i = 0; i < 30; i++) {
    const fromUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    const toUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    
    if (fromUser.id !== toUser.id && fromUser.lookingFor === 'ROMANCE' && toUser.lookingFor === 'ROMANCE') {
      try {
        await prisma.like.create({
          data: {
            fromUserId: fromUser.id,
            toUserId: toUser.id,
          },
        });
        
        // 30%の確率で相互いいね（マッチ）を作成
        if (Math.random() > 0.7) {
          await prisma.like.create({
            data: {
              fromUserId: toUser.id,
              toUserId: fromUser.id,
            },
          });
          
          // マッチを作成
          const user1Id = fromUser.id < toUser.id ? fromUser.id : toUser.id;
          const user2Id = fromUser.id < toUser.id ? toUser.id : fromUser.id;
          
          const match = await prisma.match.create({
            data: {
              user1Id,
              user2Id,
              matchedAt: new Date(),
            },
          });
          
          matchCount++;
          
          // サンプルメッセージを作成
          await prisma.message.create({
            data: {
              matchId: match.id,
              senderId: fromUser.id,
              content: 'はじめまして！よろしくお願いします。',
              messageType: 'TEXT',
            },
          });
          
          await prisma.message.create({
            data: {
              matchId: match.id,
              senderId: toUser.id,
              content: 'こちらこそ、よろしくお願いします！',
              messageType: 'TEXT',
            },
          });
        }
      } catch (error) {
        // 重複エラーは無視
        continue;
      }
    }
  }

  console.log(`✅ ${matchCount}のマッチとサンプルメッセージを作成しました`);

  // サンプル投稿の作成
  for (const community of sampleCommunities) {
    const members = await prisma.communityMember.findMany({
      where: { communityId: community.id },
      include: { user: true },
    });
    
    for (let i = 0; i < 5; i++) {
      const author = members[Math.floor(Math.random() * members.length)];
      
      await prisma.communityPost.create({
        data: {
          communityId: community.id,
          authorId: author.userId,
          title: `${community.category}について ${i + 1}`,
          content: `${community.category}に関する投稿です。皆さんのご意見をお聞かせください。`,
          postType: 'DISCUSSION',
          likeCount: Math.floor(Math.random() * 10),
          commentCount: Math.floor(Math.random() * 5),
        },
      });
    }
  }

  console.log('✅ サンプル投稿を作成しました');

  // Stripeプランの作成
  const stripePlans = [
    {
      planType: 'MONTHLY',
      stripePriceId: 'price_monthly_tomorie_jp',
      stripeProductId: 'prod_tomorie_premium',
      amount: 980,
      interval: 'month',
      intervalCount: 1,
    },
    {
      planType: 'THREE_MONTH',
      stripePriceId: 'price_3month_tomorie_jp',
      stripeProductId: 'prod_tomorie_premium',
      amount: 2700,
      interval: 'month',
      intervalCount: 3,
    },
    {
      planType: 'SIX_MONTH',
      stripePriceId: 'price_6month_tomorie_jp',
      stripeProductId: 'prod_tomorie_premium',
      amount: 5100,
      interval: 'month',
      intervalCount: 6,
    },
    {
      planType: 'YEARLY',
      stripePriceId: 'price_yearly_tomorie_jp',
      stripeProductId: 'prod_tomorie_premium',
      amount: 10000,
      interval: 'year',
      intervalCount: 1,
    },
  ];

  for (const plan of stripePlans) {
    await prisma.stripePlan.create({
      data: plan,
    });
  }

  console.log('✅ Stripeプランを作成しました');

  // サンプル決済履歴の作成
  const samplePayments = [];
  
  for (let i = 0; i < 10; i++) {
    const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    const plan = stripePlans[Math.floor(Math.random() * stripePlans.length)];
    
    const payment = await prisma.paymentHistory.create({
      data: {
        userId: user.id,
        amount: plan.amount,
        currency: 'JPY',
        paymentProvider: 'STRIPE',
        paymentMethod: 'card',
        stripePaymentIntentId: `pi_sample_${i + 1}_${Math.random().toString(36).substring(7)}`,
        stripeChargeId: `ch_sample_${i + 1}_${Math.random().toString(36).substring(7)}`,
        status: Math.random() > 0.1 ? 'COMPLETED' : 'PENDING',
        paidAt: Math.random() > 0.1 ? new Date() : null,
      },
    });
    
    samplePayments.push(payment);
  }

  console.log(`✅ ${samplePayments.length}のサンプル決済履歴を作成しました`);

  console.log('🎉 シードデータの投入が完了しました！');
}

main()
  .catch((e) => {
    console.error('❌ シードデータの投入中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });