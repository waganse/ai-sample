'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, size }: { position: [number, number, number], color: string, size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.elapsedTime + position[0]) * 0.01;
      meshRef.current.rotation.x = clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function HeartParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // ハート形状の数式
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = x * 0.1;
      positions[i * 3 + 1] = y * 0.1;
      positions[i * 3 + 2] = z;
      
      // ピンクとレッドのグラデーション
      const color = new THREE.Color();
      color.setHSL(0.9 + Math.random() * 0.1, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.1;
      ref.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingElements() {
  return (
    <>
      <AnimatedSphere position={[-3, 2, -2]} color="#f59e0b" size={0.3} />
      <AnimatedSphere position={[3, -1, -1]} color="#ec4899" size={0.4} />
      <AnimatedSphere position={[2, 3, -3]} color="#8b5cf6" size={0.2} />
      <AnimatedSphere position={[-2, -2, -2]} color="#ef4444" size={0.35} />
      <AnimatedSphere position={[0, 2, -4]} color="#06b6d4" size={0.25} />
    </>
  );
}

export default function HeroWebGL() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* ライティング */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#a855f7" />

        {/* ハート型パーティクル */}
        <HeartParticles />

        {/* 浮遊する要素 */}
        <FloatingElements />

        {/* 背景のグラデーション球体 */}
        <Sphere position={[0, 0, -10]} args={[15, 64, 64]}>
          <meshBasicMaterial
            color="#fef3c7"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}