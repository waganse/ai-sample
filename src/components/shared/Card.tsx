'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'gradient' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}: CardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'default':
        return 'bg-white rounded-xl shadow-sm';
      case 'hover':
        return 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg';
      case 'elevated':
        return 'bg-white rounded-2xl shadow-xl';
      default:
        return 'bg-white rounded-xl shadow-sm';
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const cardClass = `${getVariantClass()} ${getPaddingClass()} ${className}`;

  if (onClick) {
    return (
      <button className={`${cardClass} cursor-pointer`} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={cardClass}>{children}</div>;
}