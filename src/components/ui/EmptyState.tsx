'use client';

import { ReactNode } from 'react';
import { Button } from './Button';
import { Icons } from './Icons';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      
      {description && (
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function EmptyMatches() {
  return (
    <EmptyState
      icon={<Icons.heart className="h-8 w-8 text-gray-400" />}
      title="まだお相手候補がいません"
      description="プロフィールを充実させて、素敵な出会いを見つけましょう。"
      action={{
        label: 'プロフィールを編集',
        onClick: () => window.location.href = '/profile/edit'
      }}
    />
  );
}

export function EmptyMessages() {
  return (
    <EmptyState
      icon={<Icons.message className="h-8 w-8 text-gray-400" />}
      title="メッセージがありません"
      description="お相手とマッチしたら、メッセージを送ってみましょう。"
      action={{
        label: 'お相手を探す',
        onClick: () => window.location.href = '/matches'
      }}
    />
  );
}

export function EmptyCommunities() {
  return (
    <EmptyState
      icon={<Icons.users className="h-8 w-8 text-gray-400" />}
      title="参加中のコミュニティがありません"
      description="興味のあるコミュニティに参加して、同じ趣味の仲間と繋がりましょう。"
      action={{
        label: 'コミュニティを探す',
        onClick: () => window.location.href = '/communities/explore'
      }}
    />
  );
}