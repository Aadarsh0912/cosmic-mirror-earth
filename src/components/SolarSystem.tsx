import { useEffect, useState } from "react";

export const SolarSystem = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative w-80 h-80 mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Orbit path */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-muted/30 rounded-full animate-pulse"></div>
      
      {/* Sun */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 sun-spin">
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-solar-orange to-red-500 rounded-full shadow-lg relative overflow-hidden">
            {/* Sun surface details */}
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"></div>
            {/* Solar flares */}
            <div className="absolute -inset-2 bg-solar-orange/30 rounded-full animate-pulse"></div>
            <div className="absolute -inset-4 bg-solar-orange/10 rounded-full animate-aurora-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Earth orbital container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 earth-orbit">
        <div className="w-10 h-10 earth-spin">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 rounded-full shadow-lg relative overflow-hidden">
            {/* Earth continents */}
            <div className="absolute top-1 left-1 w-3 h-2 bg-green-500 rounded-full opacity-80"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full opacity-70"></div>
            <div className="absolute top-2 right-2 w-2 h-1 bg-green-600 rounded-full opacity-60"></div>
            {/* Atmosphere glow */}
            <div className="absolute -inset-1 bg-blue-300/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Solar wind particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-solar-orange/60 rounded-full animate-pulse"
            style={{
              left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 45}%`,
              top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 45}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + (i % 3) * 0.5}s`
            }}
          />
        ))}
      </div>
      
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