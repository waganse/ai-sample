'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  interval?: number;
  className?: string;
}

export function ImageCarousel({ images, interval = 4000, className = '' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // フェードアウト時間の半分
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex && !isTransitioning 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={600}
            height={600}
            className="w-full h-auto rounded-2xl shadow-2xl"
            priority={index === 0}
          />
        </div>
      ))}
      
    </div>
  );
}