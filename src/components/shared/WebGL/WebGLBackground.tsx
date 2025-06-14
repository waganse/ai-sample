'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FloatingParticles from './FloatingParticles';
import FloatingOrbs from './FloatingOrbs';
import { Suspense } from 'react';

interface WebGLBackgroundProps {
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  theme?: 'warm' | 'cool' | 'primary';
}

export default function WebGLBackground({ 
  interactive = false, 
  intensity = 'medium',
  theme = 'warm'
}: WebGLBackgroundProps) {
  const getColors = () => {
    switch (theme) {
      case 'warm':
        return {
          particles: '#f59e0b',
          orbs: '#ec4899',
          background: '#fef3c7'
        };
      case 'cool':
        return {
          particles: '#3b82f6',
          orbs: '#8b5cf6',
          background: '#dbeafe'
        };
      case 'primary':
        return {
          particles: '#ef4444',
          orbs: '#f97316',
          background: '#fef2f2'
        };
      default:
        return {
          particles: '#f59e0b',
          orbs: '#ec4899',
          background: '#fef3c7'
        };
    }
  };

  const getIntensitySettings = () => {
    switch (intensity) {
      case 'low':
        return { particles: 300, orbCount: 3, speed: 0.3 };
      case 'medium':
        return { particles: 800, orbCount: 5, speed: 0.5 };
      case 'high':
        return { particles: 1500, orbCount: 8, speed: 0.8 };
      default:
        return { particles: 800, orbCount: 5, speed: 0.5 };
    }
  };

  const colors = getColors();
  const settings = getIntensitySettings();

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* 環境光 */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color={colors.orbs} />

          {/* パーティクル */}
          <FloatingParticles
            count={settings.particles}
            color={colors.particles}
            speed={settings.speed}
            size={0.003}
          />

          {/* 浮遊オーブ */}
          <FloatingOrbs
            count={settings.orbCount}
            color={colors.orbs}
          />

          {/* 環境マップ */}
          <Environment preset="sunset" />

          {/* インタラクティブコントロール */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}