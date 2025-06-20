'use client';

interface SakuraAnimationProps {
  /** 各レイヤーの花びら数をカスタマイズ */
  layers?: {
    main?: number;
    offset?: number;
    slow?: number;
    micro?: number;
  };
  /** アニメーションの強度 (subtle, normal, intense) */
  intensity?: 'subtle' | 'normal' | 'intense';
  /** 花びらのサイズ調整 */
  size?: 'small' | 'medium' | 'large';
  /** 背景に表示するかどうか */
  asBackground?: boolean;
  /** カスタムクラス名 */
  className?: string;
}

export default function SakuraAnimation({
  layers = {
    main: 8,
    offset: 6,
    slow: 5,
    micro: 4,
  },
  intensity = 'normal',
  size = 'medium',
  asBackground = true,
  className = '',
}: SakuraAnimationProps) {
  // サイズ設定
  const sizeConfig = {
    small: { base: 16, variation: 4 },
    medium: { base: 24, variation: 6 },
    large: { base: 32, variation: 8 },
  };

  const currentSize = sizeConfig[size];

  // アニメーション強度設定
  const intensityConfig = {
    subtle: { opacity: 'opacity-30', duration: { min: 25, max: 40 } },
    normal: { opacity: 'opacity-40', duration: { min: 20, max: 35 } },
    intense: { opacity: 'opacity-60', duration: { min: 15, max: 30 } },
  };

  const currentIntensity = intensityConfig[intensity];

  return (
    <div
      className={`${asBackground ? 'absolute inset-0' : 'relative'} overflow-hidden pointer-events-none ${className}`}
    >
      {/* Layer 1: Main gentle flow */}
      {Array.from({ length: layers.main || 8 }).map((_, i) => (
        <div
          key={`main-${i}`}
          className="absolute animate-sakura-gentle"
          style={{
            left: `${5 + i * 12}%`,
            top: `-20vh`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${currentIntensity.duration.min}s`,
            width: `${currentSize.base + (i % 3) * currentSize.variation}px`,
            height: `${currentSize.base + (i % 3) * currentSize.variation}px`,
          }}
        >
          <img
            src="/images/sakura.png"
            alt="桜の花びら"
            className={`w-full h-full ${currentIntensity.opacity} drop-shadow-sm`}
            style={{
              filter: 'hue-rotate(0deg) saturate(1.2) brightness(1.1)',
            }}
          />
        </div>
      ))}

      {/* Layer 2: Offset gentle flow */}
      {Array.from({ length: layers.offset || 6 }).map((_, i) => (
        <div
          key={`offset-${i}`}
          className="absolute animate-sakura-sway"
          style={{
            left: `${10 + i * 15}%`,
            top: `-25vh`,
            animationDelay: `${i * 4 + 10}s`,
            animationDuration: `${currentIntensity.duration.min + 4}s`,
            width: `${currentSize.base - 4 + (i % 2) * (currentSize.variation - 1)}px`,
            height: `${currentSize.base - 4 + (i % 2) * (currentSize.variation - 1)}px`,
          }}
        >
          <img
            src="/images/sakura.png"
            alt="桜の花びら"
            className={`w-full h-full opacity-50 drop-shadow-md`}
            style={{
              filter: 'hue-rotate(5deg) saturate(1.1) brightness(1.05)',
            }}
          />
        </div>
      ))}

      {/* Layer 3: Slow dreamy flow */}
      {Array.from({ length: layers.slow || 5 }).map((_, i) => (
        <div
          key={`slow-${i}`}
          className="absolute animate-sakura-drift"
          style={{
            left: `${15 + i * 18}%`,
            top: `-30vh`,
            animationDelay: `${i * 6 + 5}s`,
            animationDuration: `${currentIntensity.duration.max}s`,
            width: `${currentSize.base - 6 + (i % 2) * (currentSize.variation - 2)}px`,
            height: `${currentSize.base - 6 + (i % 2) * (currentSize.variation - 2)}px`,
          }}
        >
          <img
            src="/images/sakura.png"
            alt="桜の花びら"
            className="w-full h-full opacity-40 drop-shadow-lg"
            style={{
              filter: 'hue-rotate(10deg) saturate(0.9) brightness(1)',
            }}
          />
        </div>
      ))}

      {/* Layer 4: Micro gentle flow */}
      {Array.from({ length: layers.micro || 4 }).map((_, i) => (
        <div
          key={`micro-${i}`}
          className="absolute animate-sakura-whisper"
          style={{
            left: `${20 + i * 20}%`,
            top: `-35vh`,
            animationDelay: `${i * 8 + 15}s`,
            animationDuration: `${currentIntensity.duration.max + 5}s`,
            width: `${currentSize.base - 8 + i * 3}px`,
            height: `${currentSize.base - 8 + i * 3}px`,
          }}
        >
          <img
            src="/images/sakura.png"
            alt="桜の花びら"
            className="w-full h-full opacity-35 drop-shadow-xl"
            style={{
              filter: 'hue-rotate(-5deg) saturate(0.8) brightness(0.95)',
            }}
          />
        </div>
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes sakura-gentle {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          3% {
            opacity: 0.6;
          }
          8% {
            transform: translateY(8vh) translateX(-8px) rotate(15deg)
              scale(1.02) rotateX(10deg) rotateY(5deg);
          }
          16% {
            transform: translateY(16vh) translateX(12px) rotate(-20deg)
              scale(0.98) rotateX(-8deg) rotateY(-10deg);
          }
          24% {
            transform: translateY(24vh) translateX(-10px) rotate(25deg)
              scale(1.01) rotateX(15deg) rotateY(8deg);
          }
          32% {
            transform: translateY(32vh) translateX(15px) rotate(-18deg)
              scale(0.99) rotateX(-12deg) rotateY(-6deg);
          }
          40% {
            transform: translateY(40vh) translateX(-12px) rotate(30deg)
              scale(1.03) rotateX(18deg) rotateY(12deg);
          }
          48% {
            transform: translateY(48vh) translateX(18px) rotate(-15deg)
              scale(0.97) rotateX(-10deg) rotateY(-8deg);
          }
          56% {
            transform: translateY(56vh) translateX(-8px) rotate(22deg)
              scale(1.01) rotateX(12deg) rotateY(5deg);
          }
          64% {
            transform: translateY(64vh) translateX(14px) rotate(-25deg)
              scale(0.98) rotateX(-15deg) rotateY(-10deg);
          }
          72% {
            transform: translateY(72vh) translateX(-14px) rotate(18deg)
              scale(1.02) rotateX(8deg) rotateY(6deg);
          }
          80% {
            transform: translateY(80vh) translateX(10px) rotate(-12deg)
              scale(0.99) rotateX(-6deg) rotateY(-4deg);
          }
          88% {
            transform: translateY(88vh) translateX(-6px) rotate(8deg)
              scale(1.01) rotateX(4deg) rotateY(3deg);
          }
          96% {
            transform: translateY(96vh) translateX(8px) rotate(-5deg)
              scale(0.98) rotateX(-3deg) rotateY(-2deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-sway {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          4% {
            opacity: 0.5;
          }
          10% {
            transform: translateY(10vh) translateX(-12px) rotate(20deg)
              scale(1.05) rotateX(15deg) rotateY(10deg);
          }
          20% {
            transform: translateY(20vh) translateX(18px) rotate(-28deg)
              scale(0.95) rotateX(-20deg) rotateY(-15deg);
          }
          30% {
            transform: translateY(30vh) translateX(-15px) rotate(35deg)
              scale(1.08) rotateX(25deg) rotateY(18deg);
          }
          40% {
            transform: translateY(40vh) translateX(22px) rotate(-22deg)
              scale(0.92) rotateX(-18deg) rotateY(-12deg);
          }
          50% {
            transform: translateY(50vh) translateX(-18px) rotate(30deg)
              scale(1.06) rotateX(22deg) rotateY(15deg);
          }
          60% {
            transform: translateY(60vh) translateX(20px) rotate(-32deg)
              scale(0.94) rotateX(-25deg) rotateY(-18deg);
          }
          70% {
            transform: translateY(70vh) translateX(-14px) rotate(25deg)
              scale(1.04) rotateX(18deg) rotateY(12deg);
          }
          80% {
            transform: translateY(80vh) translateX(16px) rotate(-18deg)
              scale(0.96) rotateX(-15deg) rotateY(-10deg);
          }
          90% {
            transform: translateY(90vh) translateX(-10px) rotate(12deg)
              scale(1.02) rotateX(8deg) rotateY(6deg);
          }
          96% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(115vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-drift {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.4;
          }
          12% {
            transform: translateY(12vh) translateX(-20px) rotate(30deg)
              scale(1.1) rotateX(25deg) rotateY(20deg);
          }
          24% {
            transform: translateY(24vh) translateX(28px) rotate(-40deg)
              scale(0.9) rotateX(-30deg) rotateY(-25deg);
          }
          36% {
            transform: translateY(36vh) translateX(-25px) rotate(45deg)
              scale(1.12) rotateX(35deg) rotateY(28deg);
          }
          48% {
            transform: translateY(48vh) translateX(32px) rotate(-35deg)
              scale(0.88) rotateX(-28deg) rotateY(-20deg);
          }
          60% {
            transform: translateY(60vh) translateX(-28px) rotate(38deg)
              scale(1.08) rotateX(30deg) rotateY(22deg);
          }
          72% {
            transform: translateY(72vh) translateX(30px) rotate(-25deg)
              scale(0.92) rotateX(-22deg) rotateY(-18deg);
          }
          84% {
            transform: translateY(84vh) translateX(-18px) rotate(20deg)
              scale(1.04) rotateX(15deg) rotateY(12deg);
          }
          95% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(120vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes sakura-whisper {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
          6% {
            opacity: 0.35;
          }
          15% {
            transform: translateY(15vh) translateX(-30px) rotate(50deg)
              scale(1.15) rotateX(40deg) rotateY(30deg);
          }
          30% {
            transform: translateY(30vh) translateX(38px) rotate(-60deg)
              scale(0.85) rotateX(-45deg) rotateY(-35deg);
          }
          45% {
            transform: translateY(45vh) translateX(-35px) rotate(70deg)
              scale(1.2) rotateX(50deg) rotateY(40deg);
          }
          60% {
            transform: translateY(60vh) translateX(42px) rotate(-45deg)
              scale(0.8) rotateX(-38deg) rotateY(-28deg);
          }
          75% {
            transform: translateY(75vh) translateX(-25px) rotate(35deg)
              scale(1.1) rotateX(28deg) rotateY(22deg);
          }
          90% {
            transform: translateY(90vh) translateX(20px) rotate(-20deg)
              scale(0.9) rotateX(-18deg) rotateY(-15deg);
          }
          94% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(125vh) translateX(0px) rotate(0deg) scale(1)
              rotateX(0deg) rotateY(0deg);
            opacity: 0;
          }
        }

        .animate-sakura-gentle {
          animation: sakura-gentle ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-sway {
          animation: sakura-sway ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-drift {
          animation: sakura-drift ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-sakura-whisper {
          animation: sakura-whisper ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
