import { useEffect, useState } from "react";

export const SolarSystem = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative w-80 h-80 mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Orbit path with glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-solar-orange/20 rounded-full animate-pulse shadow-[0_0_20px_rgba(251,146,60,0.3)]"></div>
      
      {/* Sun with realistic corona and flares */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {/* Outer corona glow */}
        <div className="absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="w-32 h-32 bg-gradient-radial from-solar-orange/40 via-yellow-400/20 to-transparent rounded-full animate-aurora-pulse blur-xl"></div>
        </div>
        
        {/* Solar corona rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-solar-orange/60 to-transparent origin-left animate-pulse"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          />
        ))}
        
        <div className="w-20 h-20 sun-spin relative">
          {/* Main sun body with realistic gradient */}
          <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-solar-orange to-red-600 rounded-full shadow-[0_0_40px_rgba(251,146,60,0.8)] relative overflow-hidden">
            {/* Photosphere texture */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 via-transparent to-transparent opacity-60 rounded-full"></div>
            
            {/* Solar granulation spots */}
            <div className="absolute top-2 left-3 w-2 h-2 bg-orange-600/40 rounded-full"></div>
            <div className="absolute top-5 right-2 w-3 h-3 bg-red-600/30 rounded-full"></div>
            <div className="absolute bottom-3 left-4 w-2 h-2 bg-yellow-600/40 rounded-full"></div>
            
            {/* Chromosphere layer */}
            <div className="absolute inset-1 bg-gradient-to-bl from-yellow-300/40 via-transparent to-red-500/20 rounded-full"></div>
            
            {/* Solar prominence */}
            <div className="absolute -top-1 right-2 w-4 h-4 bg-red-500/50 rounded-full blur-sm animate-pulse"></div>
            
            {/* Hot spot highlight */}
            <div className="absolute top-3 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
          </div>
          
          {/* Inner glow layers */}
          <div className="absolute -inset-2 bg-gradient-radial from-solar-orange/40 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full animate-aurora-pulse"></div>
        </div>
      </div>
      
      {/* Earth orbital container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 earth-orbit">
        <div className="w-12 h-12 earth-spin relative">
          {/* Space shadow side */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40 rounded-full z-10"></div>
          
          {/* Main Earth body */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] relative overflow-hidden">
            {/* Ocean base with realistic gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 rounded-full"></div>
            
            {/* Realistic continents - North America */}
            <div className="absolute top-2 left-1 w-3 h-3 bg-green-600 rounded-tl-full rounded-br-lg opacity-90 shadow-inner"></div>
            
            {/* Europe/Africa */}
            <div className="absolute top-3 right-2 w-2.5 h-3 bg-gradient-to-b from-green-500 to-amber-700 opacity-85" style={{ borderRadius: '40% 60% 30% 70%' }}></div>
            
            {/* South America */}
            <div className="absolute top-5 left-2 w-1.5 h-2.5 bg-green-500 opacity-80" style={{ borderRadius: '60% 40% 50% 50%' }}></div>
            
            {/* Asia */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-green-600 opacity-75 rounded-tr-full"></div>
            
            {/* Antarctica ice cap */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-white/90 rounded-t-full blur-[0.5px]"></div>
            
            {/* Cloud layers */}
            <div className="absolute top-1 right-3 w-2 h-1 bg-white/60 rounded-full blur-[0.5px]"></div>
            <div className="absolute bottom-2 left-2 w-2.5 h-1 bg-white/50 rounded-full blur-[0.5px]"></div>
            <div className="absolute top-4 left-0 w-2 h-0.5 bg-white/40 rounded-full blur-[0.5px]"></div>
            
            {/* Atmospheric refraction */}
            <div className="absolute inset-1 bg-gradient-to-tl from-transparent via-white/5 to-transparent rounded-full"></div>
          </div>
          
          {/* Atmospheric glow layers */}
          <div className="absolute -inset-1 bg-gradient-radial from-cyan-300/30 to-transparent rounded-full"></div>
          <div className="absolute -inset-2 bg-gradient-radial from-blue-400/20 to-transparent rounded-full"></div>
        </div>
      </div>
      
      {/* Enhanced solar wind with varying speeds */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`wind-${i}`}
            className="absolute bg-solar-orange rounded-full animate-pulse"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${50 + Math.cos(i * 18 * Math.PI / 180) * 40}%`,
              top: `${50 + Math.sin(i * 18 * Math.PI / 180) * 40}%`,
              opacity: 0.4 - (i % 3) * 0.1,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${1.5 + (i % 4) * 0.4}s`
            }}
          />
        ))}
      </div>
      
      {/* Magnetic field lines */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`field-${i}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            animation: `aurora-pulse ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      
      {/* Fun labels for kids */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
        <div className="text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
          🌞 Our Sun
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0">
        <div className="text-xs font-medium text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
          🌍 Earth (Home!)
        </div>
      </div>
    </div>
  );
};