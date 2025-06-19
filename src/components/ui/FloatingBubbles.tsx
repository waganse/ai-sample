interface FloatingBubblesProps {
  className?: string;
}

export function FloatingBubbles({ className = "" }: FloatingBubblesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* 大きなバブル */}
      <div className="absolute top-16 left-10 w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 animate-bubble-float"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-40 animate-bubble-float-delay"></div>
      <div className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-35 animate-bubble-float-reverse"></div>
      
      {/* 中サイズのバブル */}
      <div className="absolute top-20 left-1/3 w-12 h-12 bg-gradient-to-br from-primary-300 to-orange-200 rounded-full opacity-25 animate-bubble-float-reverse-delay"></div>
      <div className="absolute bottom-24 right-1/4 w-14 h-14 bg-gradient-to-br from-orange-300 to-primary-200 rounded-full opacity-30 animate-bubble-float"></div>
      <div className="absolute top-1/2 left-8 w-10 h-10 bg-gradient-to-br from-teal-300 to-primary-300 rounded-full opacity-40 animate-pulse-gentle"></div>
      
      {/* 小さなバブル */}
      <div className="absolute top-40 right-1/3 w-8 h-8 bg-gradient-to-br from-primary-400 to-orange-300 rounded-full opacity-35 animate-bubble-float-delay"></div>
      <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-gradient-to-br from-orange-400 to-primary-300 rounded-full opacity-45 animate-bubble-float-reverse"></div>
      <div className="absolute top-1/3 right-10 w-7 h-7 bg-gradient-to-br from-teal-400 to-orange-300 rounded-full opacity-30 animate-pulse-gentle-delay"></div>
      <div className="absolute bottom-1/3 right-1/2 w-9 h-9 bg-gradient-to-br from-primary-300 to-teal-300 rounded-full opacity-35 animate-bubble-float"></div>
      
      {/* 極小バブル */}
      <div className="absolute top-24 left-1/2 w-4 h-4 bg-gradient-to-br from-orange-300 to-primary-400 rounded-full opacity-50 animate-bubble-float-reverse-delay"></div>
      <div className="absolute bottom-16 left-1/3 w-5 h-5 bg-gradient-to-br from-primary-400 to-teal-300 rounded-full opacity-40 animate-pulse-gentle"></div>
      <div className="absolute top-3/4 right-12 w-4 h-4 bg-gradient-to-br from-teal-400 to-orange-400 rounded-full opacity-45 animate-bubble-float-delay"></div>
    </div>
  );
}