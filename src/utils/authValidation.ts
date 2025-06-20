import { VALIDATION_CONFIG } from '@/config/auth';
import { AuthErrorType } from '@/types/auth';
import { createAuthError } from '@/utils/authErrors';

// バリデーション結果の型
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// メールアドレスのバリデーション
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return {
      isValid: false,
      error: 'メールアドレスを入力してください。',
    };
  }

  if (email.length > VALIDATION_CONFIG.EMAIL.MAX_LENGTH) {
    return {
      isValid: false,
      error: 'メールアドレスが長すぎます。',
    };
  }

  if (!VALIDATION_CONFIG.EMAIL.REGEX.test(email)) {
    return {
      isValid: false,
      error: '有効なメールアドレスを入力してください。',
    };
  }

  return { isValid: true };
}

// OTPコードのバリデーション
export function validateOtp(otp: string): ValidationResult {
  if (!otp) {
    return {
      isValid: false,
      error: '認証コードを入力してください。',
    };
  }

  if (otp.length !== VALIDATION_CONFIG.OTP.LENGTH) {
    return {
      isValid: false,
      error: `認証コードは${VALIDATION_CONFIG.OTP.LENGTH}桁で入力してください。`,
    };
  }

  if (!VALIDATION_CONFIG.OTP.REGEX.test(otp)) {
    return {
      isValid: false,
      error: '認証コードは数字のみで入力してください。',
    };
  }

  return { isValid: true };
}

// パスワードのバリデーション
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return {
      isValid: false,
      error: 'パスワードを入力してください。',
    };
  }

  if (password.length < VALIDATION_CONFIG.PASSWORD.MIN_LENGTH) {
    return {
      isValid: false,
      error: `パスワードは${VALIDATION_CONFIG.PASSWORD.MIN_LENGTH}文字以上で入力してください。`,
    };
  }

  if (!VALIDATION_CONFIG.PASSWORD.REGEX.test(password)) {
    return {
      isValid: false,
      error: 'パスワードには大文字、小文字、数字を含めてください。',
    };
  }

  return { isValid: true };
}

// パスワード確認のバリデーション
export function validatePasswordConfirm(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword) {
    return {
      isValid: false,
      error: 'パスワード確認を入力してください。',
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: 'パスワードが一致しません。',
    };
  }

  return { isValid: true };
}

// 認証プロバイダーのバリデーション
export function validateAuthProvider(provider: string): ValidationResult {
  const validProviders = ['google', 'facebook', 'line'];

  if (!provider) {
    return {
      isValid: false,
      error: '認証プロバイダーを選択してください。',
    };
  }

  if (!validProviders.includes(provider)) {
    return {
      isValid: false,
      error: '無効な認証プロバイダーです。',
    };
  }

  return { isValid: true };
}

// フォーム全体のバリデーション
export function validateSignInForm(email: string): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  return { isValid: true };
}

export function validateSignUpForm(email: string): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  return { isValid: true };
}

export function validateOtpForm(email: string, otp: string): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const otpValidation = validateOtp(otp);
  if (!otpValidation.isValid) {
    return otpValidation;
  }

  return { isValid: true };
}

// エラーからバリデーションエラーを作成
export function createValidationError(message: string) {
  return createAuthError(AuthErrorType.INVALID_CREDENTIALS, message);
}

// サニタイズ関数
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizeOtp(otp: string): string {
  return otp.replace(/\D/g, ''); // 数字以外を除去
}

// 認証フィールドの正規化
export function normalizeAuthInput(
  input: string,
  type: 'email' | 'otp'
): string {
  switch (type) {
    case 'email':
      return sanitizeEmail(input);
    case 'otp':
      return sanitizeOtp(input);
    default:
      return input.trim();
  }
}
