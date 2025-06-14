'use client';

import { useAnimation } from './hooks/useAnimation';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  details?: string[];
  badge?: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  variant?: 'simple' | 'detailed' | 'card';
  layout?: 'grid-2' | 'grid-3' | 'grid-4';
  showAnimations?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function FeatureGrid({
  features,
  variant = 'simple',
  layout = 'grid-3',
  showAnimations = false,
  className = '',
  itemClassName = '',
}: FeatureGridProps) {
  const { getAnimationClass, getAnimationStyle } = useAnimation({ enabled: showAnimations });

  const getGridClass = () => {
    switch (layout) {
      case 'grid-2':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      case 'grid-3':
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
      case 'grid-4':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
      default:
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
    }
  };

  const getItemClass = () => {
    const baseClass = 'transition-all duration-300';

    switch (variant) {
      case 'simple':
        return `${baseClass} text-center p-8 bg-primary-50 rounded-2xl`;
      case 'detailed':
        return `${baseClass} group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105`;
      case 'card':
        return `${baseClass} flex items-start p-8 bg-white rounded-2xl shadow`;
      default:
        return baseClass;
    }
  };

  const renderSimpleFeature = (feature: FeatureItem, index: number) => (
    <div
      key={index}
      className={`${getItemClass()} ${getAnimationClass()} ${itemClassName}`}
      style={getAnimationStyle(index)}
    >
      <div className="text-6xl mb-6">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
    </div>
  );

  const renderDetailedFeature = (feature: FeatureItem, index: number) => (
    <div
      key={index}
      className={`${getItemClass()} ${getAnimationClass()} ${itemClassName}`}
      style={getAnimationStyle(index, 100)}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {feature.title}
        </h3>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

      {feature.details && (
        <ul className="space-y-2 mb-4">
          {feature.details.map((detail, detailIndex) => (
            <li key={detailIndex} className="flex items-center text-sm text-gray-500">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
              {detail}
            </li>
          ))}
        </ul>
      )}

      {feature.badge && (
        <div className="p-3 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
          <div className="text-xs text-primary-700 font-medium">{feature.badge}</div>
        </div>
      )}
    </div>
  );

  const renderCardFeature = (feature: FeatureItem, index: number) => (
    <div
      key={index}
      className={`${getItemClass()} ${getAnimationClass()} ${itemClassName}`}
      style={getAnimationStyle(index)}
    >
      <div className="text-4xl mr-6 flex-shrink-0">{feature.icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
        {feature.details && (
          <ul className="mt-3 space-y-1">
            {feature.details.map((detail, detailIndex) => (
              <li key={detailIndex} className="text-sm text-gray-600">
                • {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderFeature = (feature: FeatureItem, index: number) => {
    switch (variant) {
      case 'simple':
        return renderSimpleFeature(feature, index);
      case 'detailed':
        return renderDetailedFeature(feature, index);
      case 'card':
        return renderCardFeature(feature, index);
      default:
        return renderSimpleFeature(feature, index);
    }
  };

  return (
    <div className={`${getGridClass()} ${className}`}>
      {features.map((feature, index) => renderFeature(feature, index))}
    </div>
  );
}
