import { z } from 'zod';

// 年齢計算関数
const calculateAge = (birthDateString: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// プロフィール設定のZodスキーマ
export const profileSetupSchema = z.object({
  displayName: z
    .string()
    .min(1, '表示名を入力してください')
    .min(2, '表示名は2文字以上で入力してください')
    .max(20, '表示名は20文字以内で入力してください')
    .regex(
      /^[^\s].*[^\s]$|^.{1}$/,
      '表示名の前後に空白を含めることはできません'
    ),

  birthDate: z
    .string()
    .min(1, '生年月日を入力してください')
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, '有効な日付を入力してください')
    .refine((date) => {
      const age = calculateAge(date);
      return age >= 60 && age <= 85;
    }, '60歳から85歳までの方がご利用いただけます'),

  gender: z.enum(['male', 'female', 'other'], {
    required_error: '性別を選択してください',
    invalid_type_error: '有効な性別を選択してください',
  }),

  prefecture: z.string().min(1, '都道府県を選択してください'),

  city: z
    .string()
    .min(1, '市区町村を入力してください')
    .max(50, '市区町村は50文字以内で入力してください'),

  occupation: z
    .string()
    .min(1, '職業を入力してください')
    .max(100, '職業は100文字以内で入力してください'),

  education: z.string().min(1, '学歴を選択してください'),

  introduction: z
    .string()
    .max(500, '自己紹介は500文字以内で入力してください')
    .optional()
    .or(z.literal('')),
});

// ステップ別のバリデーションスキーマ
export const step1Schema = profileSetupSchema.pick({
  displayName: true,
});

export const step2Schema = profileSetupSchema.pick({
  birthDate: true,
  gender: true,
});

export const step3Schema = profileSetupSchema.pick({
  prefecture: true,
  city: true,
});

export const step4Schema = profileSetupSchema.pick({
  occupation: true,
  education: true,
});

export const step5Schema = profileSetupSchema.pick({
  introduction: true,
});

// API用のスキーマ（完全なバリデーション）
export const profileCreateApiSchema = profileSetupSchema;

// 型定義
export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;


// 学歴の選択肢
export const EDUCATION_OPTIONS = [
  '中学校卒業',
  '高等学校卒業',
  '専門学校卒業',
  '短期大学卒業',
  '大学卒業',
  '大学院修了',
  'その他',
] as const;
