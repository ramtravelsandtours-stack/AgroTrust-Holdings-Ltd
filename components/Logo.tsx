
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ className = "w-16", variant = 'dark' }) => {
  const isLight = variant === 'light';
  const primaryColor = isLight ? "#FFFFFF" : "#166534";
  const secondaryColor = isLight ? "#E2E8F0" : "#78350F";
  const accentColor = isLight ? "#FACC15" : "#15803D";

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${className}`}>
      <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
        {/* Sun Background */}
        <circle cx="200" cy="110" r="50" fill="url(#sun_gradient)" />
        <g stroke={isLight ? "#FDE047" : "#EAB308"} strokeWidth="3" strokeLinecap="round">
          {[...Array(18)].map((_, i) => {
            const angle = (i * 20) * (Math.PI / 180);
            return (
              <line 
                key={i} 
                x1={200 + Math.cos(angle) * 55} 
                y1={110 + Math.sin(angle) * 55} 
                x2={200 + Math.cos(angle) * 85} 
                y2={110 + Math.sin(angle) * 85} 
              />
            );
          })}
        </g>

        {/* Green Fields / Oval Shape */}
        <path d="M40 220C40 160 360 160 360 220C360 280 40 280 40 220Z" fill={isLight ? "rgba(255,255,255,0.05)" : "white"} />
        <path d="M50 220C50 170 350 170 350 220C350 250 50 250 50 220Z" fill={isLight ? "rgba(255,255,255,0.1)" : "#F0FDF4"} />
        
        {/* Hills Layered */}
        <path d="M150 210C220 180 340 180 350 220H50C60 180 120 185 150 210Z" fill={isLight ? "#10B981" : "#166534"} />
        <path d="M200 220C260 200 350 200 350 240H50C50 210 120 200 200 220Z" fill={isLight ? "#059669" : "#15803D"} />

        {/* Farm Elements on the right */}
        <path d="M280 200L300 180L320 200V220H280V200Z" fill={isLight ? "#F1F5F9" : "#78350F"} />
        <path d="M330 200L340 170L350 200H330Z" fill={isLight ? "#94A3B8" : "#44403C"} />

        {/* Leaves on the left */}
        <path d="M60 180Q40 140 80 140Q100 160 80 190L60 180Z" fill={isLight ? "#34D399" : "#166534"} />
        <path d="M85 165Q70 130 100 130Q120 150 100 180L85 165Z" fill={isLight ? "#10B981" : "#15803D"} />

        {/* Animals Silhouettes */}
        <path d="M100 215C100 195 130 195 145 205C150 210 145 235 130 235H110C100 235 100 215 100 215Z" fill={isLight ? "#FFFFFF" : "#064E3B"} />
        <path d="M165 220C165 210 185 210 190 220C190 230 180 235 175 235C165 235 165 220 165 220Z" fill={isLight ? "#FDBA74" : "#92400E"} />
        <path d="M210 225Q230 210 255 225L265 215V235L255 225Q230 240 210 225Z" fill={isLight ? "#2DD4BF" : "#0D9488"} />

        <defs>
          <linearGradient id="sun_gradient" x1="200" y1="60" x2="200" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Brand Text */}
      <div className="text-center -mt-4">
        <h1 className="text-2xl font-black tracking-tighter flex items-center justify-center">
          <span style={{ color: primaryColor }}>Agro</span>
          <span style={{ color: secondaryColor }}>Trust</span>
        </h1>
        <div className="flex items-center justify-center gap-1 -mt-1">
          <div className={`h-[1px] w-4 ${isLight ? 'bg-white/20' : 'bg-[#166534] opacity-40'}`}></div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: primaryColor }}>Holdings Ltd.</p>
          <div className={`h-[1px] w-4 ${isLight ? 'bg-white/20' : 'bg-[#166534] opacity-40'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
