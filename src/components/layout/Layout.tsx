'use client';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { TabNavigation } from '@/components/common/TabNavigation';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showTabNavigation?: boolean;
}

export function Layout({ children, showTabNavigation = false }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 relative">{children}</main>

      {/* タブナビゲーション（認証済みユーザーのみ、モバイル表示） */}
      {user && showTabNavigation && <TabNavigation />}

      <Footer />
    </div>
  );
}
