'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PricingCard3DProps {
  plan: {
    name: string;
    price: string;
    period: string;
    badge: string;
    color: string;
    description: string;
  };
  index: number;
}

function Card3D({ plan, index, onHover }: { 
  plan: PricingCard3DProps['plan'], 
  index: number,
  onHover: (hovered: boolean) => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const getColor = () => {
    switch (plan.color) {
      case 'primary': return '#ef4444';
      case 'blue': return '#3b82f6';
      case 'purple': return '#8b5cf6';
      case 'green': return '#10b981';
      default: return '#ef4444';
    }
  };

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.elapsedTime;
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.02;
      meshRef.current.position.y = Math.sin(time + index * 0.5) * 0.05;
      
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    onHover(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    onHover(false);
  };

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <RoundedBox
        ref={meshRef}
        args={[1.8, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.95}
          emissive={getColor()}
          emissiveIntensity={hovered ? 0.15 : 0.05}
          roughness={0.1}
          metalness={0.1}
        />
        
        {/* バッジ */}
        <Text
          position={[0, 1, 0.06]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          <meshStandardMaterial
            color={getColor()}
            emissive={getColor()}
            emissiveIntensity={0.3}
          />
          {plan.badge}
        </Text>
        
        {/* プラン名 */}
        <Text
          position={[0, 0.6, 0.06]}
          fontSize={0.12}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
        >
          {plan.name}
        </Text>
        
        {/* 価格 */}
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.2}
          color={getColor()}
          anchorX="center"
          anchorY="middle"
        >
          {plan.price}
        </Text>
        
        {/* 期間 */}
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.08}
          color="#6b7280"
          anchorX="center"
          anchorY="middle"
        >
          {plan.period}
        </Text>
        
        {/* 説明 */}
        <Text
          position={[0, -0.5, 0.06]}
          fontSize={0.06}
          color="#4b5563"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {plan.description}
        </Text>
      </RoundedBox>
    </Float>
  );
}

export default function PricingCard3D({ plan, index }: PricingCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-80 cursor-pointer">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={0.8} />
        <pointLight 
          position={[-2, -2, -2]} 
          intensity={0.4} 
          color={plan.color === 'primary' ? '#ef4444' : 
                 plan.color === 'blue' ? '#3b82f6' :
                 plan.color === 'purple' ? '#8b5cf6' : '#10b981'} 
        />
        
        <Card3D plan={plan} index={index} onHover={setIsHovered} />
      </Canvas>
      
      {/* ホバー時のボタン */}
      {isHovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <button className={`px-6 py-2 rounded-lg font-bold text-white transition-all duration-300 ${
            plan.color === 'primary' ? 'bg-red-500 hover:bg-red-600' :
            plan.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
            plan.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
            'bg-green-500 hover:bg-green-600'
          }`}>
            {plan.name}を選ぶ
          </button>
        </div>
      )}
    </div>
  );
}