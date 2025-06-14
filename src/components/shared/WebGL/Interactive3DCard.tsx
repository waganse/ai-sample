'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Interactive3DCardProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  className?: string;
  glowColor?: string;
}

function Card3D({ title, icon, glowColor = '#ec4899' }: { title?: string; icon?: string; glowColor?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.01;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.01;
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.9}
          emissive={glowColor}
          emissiveIntensity={hovered ? 0.1 : 0.05}
        />
        
        {icon && (
          <Text
            position={[0, 0.5, 0.06]}
            fontSize={0.4}
            color={glowColor}
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
        
        {title && (
          <Text
            position={[0, -0.3, 0.06]}
            fontSize={0.12}
            color="#374151"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.5}
          >
            {title}
          </Text>
        )}
      </RoundedBox>
    </Float>
  );
}

export default function Interactive3DCard({
  children,
  title,
  icon,
  className = '',
  glowColor = '#ec4899'
}: Interactive3DCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} intensity={0.8} />
          <pointLight position={[-2, -2, -2]} intensity={0.3} color={glowColor} />
          
          <Card3D title={title} icon={icon} glowColor={glowColor} />
        </Canvas>
      </div>
      
      {/* 2D Content Overlay */}
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
    </div>
  );
}