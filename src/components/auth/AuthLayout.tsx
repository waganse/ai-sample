import { Card } from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorBoundary';
import { AuthHeader } from './AuthHeader';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  error?: string;
  onErrorClear?: () => void;
  children: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  error,
  onErrorClear,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader title={title} subtitle={subtitle} />

        <Card className="p-8">
          {error && (
            <div className="mb-6">
              <ErrorMessage
                title={`${title}エラー`}
                message={error}
                onRetry={onErrorClear}
              />
            </div>
          )}

          {children}
        </Card>
      </div>
    </div>
  );
}
