import { useEffect, useState } from 'react';

interface UseAnimationOptions {
  enabled?: boolean;
  delay?: number;
  threshold?: number;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const { enabled = true, delay = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, delay]);

  const getAnimationClass = (
    baseClass: string = 'animate-fade-in-up',
    staticClass: string = 'opacity-0'
  ) => {
    if (!enabled) return '';
    return isVisible ? baseClass : staticClass;
  };

  const getAnimationStyle = (index: number, baseDelay: number = 100) => {
    if (!enabled || !isVisible) return {};
    return { animationDelay: `${index * baseDelay}ms` };
  };

  return {
    isVisible,
    getAnimationClass,
    getAnimationStyle,
  };
}

