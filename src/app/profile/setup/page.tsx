'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorBoundary';
import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { calculateAge } from '@/lib/utils';
import {
  EDUCATION_OPTIONS,
  profileSetupSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from '@/lib/validations/profile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

interface FormData {
  displayName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other' | '';
  prefecture: string;
  city: string;
  occupation: string;
  education: string;
  introduction: string;
}

interface Prefecture {
  code: string;
  name: string;
  hiragana: string;
}

interface Municipality {
  code_as_string: string;
  name: string;
  prefecture_code: number;
}

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const [profileData, setProfileData] = useState<FormData>({
    displayName: '',
    birthDate: '',
    gender: '',
    prefecture: '',
    city: '',
    occupation: '',
    education: '',
    introduction: '',
  });

  // State for API data
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [prefecturesLoading, setPrefecturesLoading] = useState(false);
  const [municipalitiesLoading, setMunicipalitiesLoading] = useState(false);
  const [prefecturesError, setPrefecturesError] = useState<string>('');
  const [municipalitiesError, setMunicipalitiesError] = useState<string>('');

  // 都道府県データ取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      setPrefecturesLoading(true);
      setPrefecturesError('');
      try {
        const response = await fetch('/api/geo/prefectures');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch prefectures: ${response.status}`);
        }
        
        const data = await response.json();
        setPrefectures(data.prefectures || []);
      } catch (error) {
        console.error('Error fetching prefectures:', error);
        setPrefecturesError('都道府県データの取得に失敗しました');
      } finally {
        setPrefecturesLoading(false);
      }
    };

    fetchPrefectures();
  }, []);

  // 市区町村データ取得（都道府県選択時のみ）
  const selectedPrefecture = prefectures.find(
    (p) => p.name === profileData.prefecture
  );

  useEffect(() => {
    if (!selectedPrefecture) {
      setMunicipalities([]);
      return;
    }

    const fetchMunicipalities = async () => {
      setMunicipalitiesLoading(true);
      setMunicipalitiesError('');
      try {
        const response = await fetch(
          `/api/geo/municipalities?prefCode=${selectedPrefecture.code}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch municipalities: ${response.status}`);
        }
        const data = await response.json();
        setMunicipalities(data.municipalities || []);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
        setMunicipalitiesError('市区町村データの取得に失敗しました');
      } finally {
        setMunicipalitiesLoading(false);
      }
    };

    fetchMunicipalities();
  }, [selectedPrefecture]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 都道府県が変更された場合、市区町村をリセット
    if (field === 'prefecture') {
      setProfileData((prev) => ({
        ...prev,
        prefecture: value,
        city: '', // 市区町村をリセット
      }));

      // 市区町村のエラーもクリア
      if (fieldErrors.city) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.city;
          return newErrors;
        });
      }
    }

    // フィールドエラーをクリア
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    setFieldErrors({});

    try {
      switch (step) {
        case 1:
          step1Schema.parse(profileData);
          return true;
        case 2:
          step2Schema.parse(profileData);
          return true;
        case 3:
          step3Schema.parse(profileData);
          return true;
        case 4:
          step4Schema.parse(profileData);
          return true;
        case 5:
          step5Schema.parse(profileData);
          return true;
        default:
          return false;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFieldErrors(errors);
        setError('入力内容を確認してください');
      }
      return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    try {
      // 最終バリデーション
      const validatedData = profileSetupSchema.parse(profileData);

      // REST APIでプロフィール作成
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.details) {
          // バリデーションエラーの処理
          const validationErrors: Record<string, string> = {};
          data.details.forEach((err: any) => {
            validationErrors[err.field] = err.message;
          });
          setFieldErrors(validationErrors);
          setError('入力内容を確認してください');
          return;
        }
        throw new Error(data.error || 'プロフィールの作成に失敗しました');
      }

      if (data.success) {
        // 成功時はダッシュボードにリダイレクト
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        throw new Error('プロフィールの作成に失敗しました');
      }
    } catch (error: any) {
      console.error('Profile creation error:', error);

      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFieldErrors(errors);
        setError('入力内容を確認してください');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError(error.message || 'プロフィールの作成に失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // クライアントサイドでのリダイレクト処理
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">ト</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">トモリエ</h1>
              <p className="text-sm text-gray-600">心に灯りをともす</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            プロフィール設定
          </h2>
          <p className="text-lg text-gray-600">あなたのことを教えてください</p>
        </div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg
                  ${
                    step >= stepNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-600">ステップ {step} / 5</p>
          </div>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6">
              <ErrorMessage
                title="入力エラー"
                message={error}
                onRetry={() => setError('')}
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                基本情報
              </h3>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  表示名
                </label>
                <Input
                  value={profileData.displayName}
                  onChange={(e) =>
                    handleInputChange('displayName', e.target.value)
                  }
                  placeholder="たろうさん"
                  className={`text-lg ${fieldErrors.displayName ? 'border-red-500' : ''}`}
                />
                {fieldErrors.displayName && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.displayName}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  他のユーザーに表示される名前です。本名でなくても構いません。
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                詳細情報
              </h3>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  生年月日
                </label>
                <Input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) =>
                    handleInputChange('birthDate', e.target.value)
                  }
                  className={`text-lg ${fieldErrors.birthDate ? 'border-red-500' : ''}`}
                />
                {fieldErrors.birthDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.birthDate}
                  </p>
                )}
                {profileData.birthDate && !fieldErrors.birthDate && (
                  <p className="text-sm text-gray-500 mt-2">
                    年齢: {calculateAge(new Date(profileData.birthDate))}歳
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  性別
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.gender ? 'border-red-500' : ''}`}
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
                {fieldErrors.gender && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                住所情報
              </h3>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  都道府県
                </label>
                <select
                  value={profileData.prefecture}
                  onChange={(e) =>
                    handleInputChange('prefecture', e.target.value)
                  }
                  className={`w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.prefecture ? 'border-red-500' : ''}`}
                  disabled={prefecturesLoading}
                >
                  <option value="">
                    {prefecturesLoading ? '読み込み中...' : '選択してください'}
                  </option>
                  {prefectures.map((pref) => (
                    <option key={pref.code} value={pref.name}>
                      {pref.name}
                    </option>
                  ))}
                </select>
                {fieldErrors.prefecture && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.prefecture}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  市区町村
                </label>
                <select
                  value={profileData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    fieldErrors.city ? 'border-red-500' : ''
                  } ${!profileData.prefecture || (municipalities.length === 0 && !municipalitiesLoading) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  disabled={
                    !profileData.prefecture ||
                    (municipalities.length === 0 && !municipalitiesLoading)
                  }
                >
                  <option value="">
                    {!profileData.prefecture
                      ? '都道府県を先に選択してください'
                      : municipalitiesLoading
                        ? '読み込み中...'
                        : municipalities.length === 0
                          ? '選択可能な市区町村がありません'
                          : '市区町村を選択してください'}
                  </option>
                  {municipalities.map((municipality) => (
                    <option
                      key={municipality.code_as_string}
                      value={municipality.name}
                    >
                      {municipality.name}
                    </option>
                  ))}
                </select>
                {fieldErrors.city && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.city}
                  </p>
                )}
                {municipalities.length === 0 &&
                  profileData.prefecture &&
                  !municipalitiesLoading && (
                    <p className="text-sm text-gray-500 mt-1">
                      該当する市区町村が見つからない場合は、お近くの市区町村を選択してください
                    </p>
                  )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                職歴・学歴
              </h3>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  職業
                </label>
                <Input
                  value={profileData.occupation}
                  onChange={(e) =>
                    handleInputChange('occupation', e.target.value)
                  }
                  placeholder="会社員、公務員、自営業、主婦、退職者など"
                  className={`text-lg ${fieldErrors.occupation ? 'border-red-500' : ''}`}
                />
                {fieldErrors.occupation && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.occupation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  学歴
                </label>
                <select
                  value={profileData.education}
                  onChange={(e) =>
                    handleInputChange('education', e.target.value)
                  }
                  className={`w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.education ? 'border-red-500' : ''}`}
                >
                  <option value="">選択してください</option>
                  {EDUCATION_OPTIONS.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
                {fieldErrors.education && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.education}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                自己紹介
              </h3>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  自己紹介文
                </label>
                <textarea
                  value={profileData.introduction}
                  onChange={(e) =>
                    handleInputChange('introduction', e.target.value)
                  }
                  placeholder="あなたの趣味や関心事、どんな方との出会いを求めているかなど、自由にお書きください。"
                  rows={6}
                  className={`w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${fieldErrors.introduction ? 'border-red-500' : ''}`}
                />
                {fieldErrors.introduction && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldErrors.introduction}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {profileData.introduction.length}/500文字
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  プロフィール プレビュー
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">表示名:</span>{' '}
                    {profileData.displayName}
                  </p>
                  <p>
                    <span className="font-medium">年齢:</span>{' '}
                    {calculateAge(new Date(profileData.birthDate))}歳
                  </p>
                  <p>
                    <span className="font-medium">性別:</span>{' '}
                    {profileData.gender === 'male'
                      ? '男性'
                      : profileData.gender === 'female'
                        ? '女性'
                        : 'その他'}
                  </p>
                  <p>
                    <span className="font-medium">居住地:</span>{' '}
                    {profileData.prefecture} {profileData.city}
                  </p>
                  <p>
                    <span className="font-medium">職業:</span>{' '}
                    {profileData.occupation}
                  </p>
                  <p>
                    <span className="font-medium">学歴:</span>{' '}
                    {profileData.education}
                  </p>
                  {profileData.introduction && (
                    <p>
                      <span className="font-medium">自己紹介:</span>{' '}
                      {profileData.introduction}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={isLoading}
                className="flex items-center"
              >
                <Icons.chevronLeft className="w-5 h-5 mr-2" />
                戻る
              </Button>
            )}

            <div className="ml-auto">
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center"
                >
                  次へ
                  <Icons.chevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      作成中...
                    </>
                  ) : (
                    <>
                      <Icons.check className="w-5 h-5 mr-2" />
                      プロフィールを作成
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
