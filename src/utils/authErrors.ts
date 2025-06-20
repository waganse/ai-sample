import { AuthError, AuthErrorType } from '@/types/auth';

// 認証エラーメッセージの定義
export const AUTH_ERROR_MESSAGES = {
  [AuthErrorType.USER_NOT_FOUND]:
    'このメールアドレスは登録されていません。先にアカウントを作成してください。',
  [AuthErrorType.EMAIL_NOT_CONFIRMED]:
    'メールアドレスがまだ確認されていません。登録時のメールをご確認ください。',
  [AuthErrorType.USER_ALREADY_EXISTS]:
    'このメールアドレスは既に登録済みです。ログインページからサインインしてください。',
  [AuthErrorType.INVALID_CREDENTIALS]:
    '認証情報が正しくありません。もう一度お試しください。',
  [AuthErrorType.NETWORK_ERROR]:
    'ネットワークエラーが発生しました。接続を確認してもう一度お試しください。',
  [AuthErrorType.UNKNOWN_ERROR]:
    '予期しないエラーが発生しました。しばらく待ってからもう一度お試しください。',
} as const;

// カスタム認証エラーを作成
export function createAuthError(
  type: AuthErrorType,
  message?: string,
  details?: Record<string, any>
): AuthError {
  const error = new Error(message || AUTH_ERROR_MESSAGES[type]) as AuthError;
  error.type = type;
  error.details = details;
  error.name = 'AuthError';
  return error;
}

// Supabaseエラーを認証エラーに変換
export function mapSupabaseError(error: any): AuthError {
  const message = error?.message || error?.error_description || '';

  // エラーメッセージに基づいてエラータイプを判定
  if (
    message.includes('User not found') ||
    message.includes('Invalid login credentials')
  ) {
    return createAuthError(AuthErrorType.USER_NOT_FOUND, message);
  }

  if (message.includes('Email not confirmed')) {
    return createAuthError(AuthErrorType.EMAIL_NOT_CONFIRMED, message);
  }

  if (message.includes('User already registered')) {
    return createAuthError(AuthErrorType.USER_ALREADY_EXISTS, message);
  }

  if (message.includes('Invalid credentials')) {
    return createAuthError(AuthErrorType.INVALID_CREDENTIALS, message);
  }

  if (error?.name === 'NetworkError' || message.includes('network')) {
    return createAuthError(AuthErrorType.NETWORK_ERROR, message);
  }

  return createAuthError(AuthErrorType.UNKNOWN_ERROR, message, {
    originalError: error,
  });
}

// ユーザー確認結果に基づいてエラーを生成
export function createUserCheckError(userCheckResult: {
  exists: boolean;
  confirmed: boolean;
}): AuthError | null {
  if (!userCheckResult.exists) {
    return createAuthError(AuthErrorType.USER_NOT_FOUND);
  }

  if (!userCheckResult.confirmed) {
    return createAuthError(AuthErrorType.EMAIL_NOT_CONFIRMED);
  }

  return null;
}

// サインアップ時のユーザー確認エラー
export function createSignUpUserCheckError(userCheckResult: {
  exists: boolean;
  confirmed: boolean;
}): AuthError | null {
  if (userCheckResult.exists) {
    if (userCheckResult.confirmed) {
      return createAuthError(AuthErrorType.USER_ALREADY_EXISTS);
    } else {
      return createAuthError(
        AuthErrorType.EMAIL_NOT_CONFIRMED,
        'このメールアドレスは既に登録されていますが、メール確認が完了していません。登録時のメールをご確認ください。'
      );
    }
  }

  return null;
}

// エラー情報の取得
export function getErrorInfo(error: any): {
  type: AuthErrorType;
  message: string;
  details?: any;
} {
  if (error && error.type) {
    return {
      type: error.type,
      message: error.message,
      details: error.details,
    };
  }

  const mappedError = mapSupabaseError(error);
  return {
    type: mappedError.type,
    message: mappedError.message,
    details: mappedError.details,
  };
}

// エラーのレベル判定（ユーザー表示用）
export function getErrorSeverity(
  errorType: AuthErrorType
): 'error' | 'warning' | 'info' {
  switch (errorType) {
    case AuthErrorType.USER_NOT_FOUND:
    case AuthErrorType.EMAIL_NOT_CONFIRMED:
    case AuthErrorType.USER_ALREADY_EXISTS:
      return 'info';
    case AuthErrorType.INVALID_CREDENTIALS:
      return 'warning';
    case AuthErrorType.NETWORK_ERROR:
    case AuthErrorType.UNKNOWN_ERROR:
      return 'error';
    default:
      return 'error';
  }
}
