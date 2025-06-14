'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingOrbsProps {
  count?: number;
  color?: string;
}

export default function FloatingOrbs({ count = 5, color = '#ec4899' }: FloatingOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  const orbs = Array.from({ length: count }, (_, i) => {
    const radius = 3 + i * 1.5;
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 3) * 0.5;

    return (
      <Sphere
        key={i}
        position={[x, y, z]}
        args={[0.1 + Math.random() * 0.1, 16, 16]}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    );
  });

  return <group ref={groupRef}>{orbs}</group>;
}