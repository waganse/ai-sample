import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma';
import { profileSetupSchema } from '@/lib/validations/profile';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Supabase clientの作成
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
        },
      }
    );

    // 認証チェック
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // リクエストボディの取得とバリデーション
    const body = await request.json();
    
    try {
      const validatedData = profileSetupSchema.parse(body);

      // プロフィールが既に存在するかチェック
      const existingProfile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (existingProfile) {
        return NextResponse.json(
          { error: 'Profile already exists' },
          { status: 409 }
        );
      }

      // プロフィールの作成
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          displayName: validatedData.displayName,
          birthDate: new Date(validatedData.birthDate),
          gender: validatedData.gender.toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER',
          prefecture: validatedData.prefecture,
          city: validatedData.city,
          occupation: validatedData.occupation,
          education: validatedData.education,
          introduction: validatedData.introduction || null,
        },
      });

      // Supabaseのuser_metadataを更新
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          profile_completed: true,
          display_name: validatedData.displayName,
        },
      });

      if (updateError) {
        console.error('Failed to update user metadata:', updateError);
      }

      return NextResponse.json({
        success: true,
        profile: {
          id: profile.id,
          displayName: profile.displayName,
          prefecture: profile.prefecture,
          city: profile.city,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Validation error',
            details: error.errors.map((e) => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}