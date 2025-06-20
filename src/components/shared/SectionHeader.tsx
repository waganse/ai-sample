'use client';

import { ReactNode } from 'react';

interface SectionHeaderProps {
  badge?: {
    icon?: string;
    text: string;
    bgColor?: string;
    textColor?: string;
  };
  title: string;
  description?: string | ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  titleBreakpoints?: {
    mobile?: boolean;
    desktop?: boolean;
  };
}

export default function SectionHeader({
  badge,
  title,
  description,
  titleClassName = 'text-3xl lg:text-4xl font-bold text-gray-900 mb-6',
  descriptionClassName = 'text-lg text-gray-600 max-w-2xl mx-auto',
  containerClassName = 'text-center mb-16',
  titleBreakpoints,
}: SectionHeaderProps) {
  const formatTitle = (title: string) => {
    if (!titleBreakpoints) return title;

    // Simple title formatting for line breaks
    if (titleBreakpoints.mobile || titleBreakpoints.desktop) {
      return title; // Title will be processed with breakpoints in JSX
    }

    return title;
  };

  const renderTitle = () => {
    if (titleBreakpoints?.mobile || titleBreakpoints?.desktop) {
      // Handle complex title formatting with breakpoints
      const parts = title.split('、');
      if (parts.length > 1) {
        return (
          <h2 className={titleClassName}>
            {parts[0]}
            {titleBreakpoints.mobile && <br className="md:hidden" />}
            {parts.slice(1).join('、')}
          </h2>
        );
      }
    }

    return <h2 className={titleClassName}>{title}</h2>;
  };

  return (
    <div className={containerClassName}>
      {badge && (
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm mb-6 ${
            badge.bgColor || 'bg-primary-100'
          } ${badge.textColor || 'text-primary-800'}`}
        >
          {badge.icon && <span className="mr-1">{badge.icon}</span>}
          {badge.text}
        </div>
      )}

      {renderTitle()}

      {description && <p className={descriptionClassName}>{description}</p>}
    </div>
  );
}
