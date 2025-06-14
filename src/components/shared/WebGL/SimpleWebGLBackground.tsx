'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SimpleParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleGeometry = useMemo(() => {
    const count = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <pointsMaterial size={0.02} color="#f59e0b" transparent opacity={0.6} />
    </points>
  );
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime) * 0.2;
      meshRef.current.rotation.x = clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#ec4899" transparent opacity={0.7} />
    </mesh>
  );
}

export default function SimpleWebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        <SimpleParticles />
        <FloatingSphere position={[-2, 0, -1]} />
        <FloatingSphere position={[2, 1, -2]} />
        <FloatingSphere position={[0, -1, -1]} />
      </Canvas>
    </div>
  );
}