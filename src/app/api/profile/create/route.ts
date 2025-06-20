import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { profileCreateApiSchema } from '@/lib/validations/profile';
import { Gender, LookingFor } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // Zodバリデーション
    let validatedData;
    try {
      validatedData = profileCreateApiSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(', ');
        return NextResponse.json(
          { error: `バリデーションエラー: ${errorMessages}` },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'リクエストデータが無効です' },
        { status: 400 }
      );
    }

    const {
      displayName,
      birthDate,
      gender,
      prefecture,
      city,
      occupation,
      education,
      introduction,
    } = validatedData;

    // 性別のマッピング
    let genderEnum: Gender;
    switch (gender.toLowerCase()) {
      case 'male':
        genderEnum = Gender.MALE;
        break;
      case 'female':
        genderEnum = Gender.FEMALE;
        break;
      case 'other':
        genderEnum = Gender.OTHER;
        break;
      default:
        return NextResponse.json(
          { error: '無効な性別が指定されました' },
          { status: 400 }
        );
    }

    // プロフィール作成
    const user = await prisma.user.create({
      data: {
        authId: session.user.id,
        email: session.user.email!,
        displayName: displayName,
        birthDate: new Date(birthDate),
        gender: genderEnum,
        prefecture: prefecture,
        city: city,
        occupation: occupation,
        education: education,
        bio: introduction || null,
        interests: [],
        lookingFor: LookingFor.FRIENDSHIP,
        isVerified: false,
      },
    });

    // Supabaseのユーザーメタデータを更新
    await supabase.auth.updateUser({
      data: {
        profile_completed: true,
        display_name: displayName,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        displayName: user.displayName,
        birthDate: user.birthDate.toISOString(),
        prefecture: user.prefecture,
        city: user.city,
      },
    });
  } catch (error) {
    console.error('Profile creation error:', error);

    // Prismaエラーの処理
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'このメールアドレスは既に使用されています' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'プロフィールの作成に失敗しました' },
      { status: 500 }
    );
  }
}
