import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Sun, Earth, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryStep {
  id: number;
  title: string;
  description: string;
  location: 'sun' | 'space' | 'earth' | 'you';
  icon: React.ComponentType<any>;
  duration: number;
  effects: string[];
}

export const StorytellingMode = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wavePosition, setWavePosition] = useState(0);

  const storySteps: StoryStep[] = [
    {
      id: 1,
      title: "🌞 Sun Goes BOOM!",
      description: "The Sun shoots super-fast sparkly particles into space!",
      location: 'sun',
      icon: Sun,
      duration: 3000,
      effects: ["✨ Bright flash", "🌊 Space waves"]
    },
    {
      id: 2,
      title: "🚀 Racing Through Space", 
      description: "Space particles zoom toward Earth faster than rockets!",
      location: 'space',
      icon: ArrowRight,
      duration: 3000,
      effects: ["💨 Super speed", "🌌 Space magic"]
    },
    {
      id: 3,
      title: "🌍 Earth Says Hello",
      description: "Earth's invisible shield creates beautiful dancing lights!",
      location: 'earth',
      icon: Earth,
      duration: 3000,
      effects: ["🌈 Pretty auroras", "🧲 Magnetic hugs"]
    },
    {
      id: 4,
      title: "🏠 Your World Changes",
      description: "Space weather affects phones, lights, and planes around you!",
      location: 'you',
      icon: Zap,
      duration: 3000,
      effects: ["📱 Phone wobbles", "💡 Lights blink"]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < storySteps.length) {
      const step = storySteps[currentStep];
      const increment = 100 / (step.duration / 50);
      
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            if (currentStep < storySteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setWavePosition(prev => prev + 25);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, storySteps.length]);

  const playStory = () => {
    if (currentStep >= storySteps.length - 1 && progress >= 100) {
      resetStory();
    }
    setIsPlaying(true);
  };

  const pauseStory = () => {
    setIsPlaying(false);
  };

  const resetStory = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    setWavePosition(0);
  };

  const step = storySteps[currentStep];
  const Icon = step?.icon || Sun;

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          🌟 Amazing Space Adventure: From Sun to You!
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Come on an exciting journey! Watch how a space storm travels from the Sun all the way to Earth, 
          and see how it affects things in your everyday life. It's like magic, but it's real science!
        </p>
      </div>

      {/* Story Visualization */}
      <Card className="p-8 mb-8 cosmic-shadow border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
        {/* Journey Timeline */}
        <div className="relative mb-8">
          <div className="flex justify-between items-center relative">
            {/* Timeline line with pulsing effect */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/30 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-solar-orange via-aurora-blue to-nebula-pink rounded-full transition-all duration-1000 animate-pulse"
              style={{ width: `${wavePosition}%` }}
            ></div>
            
            {/* Energy pulse effect */}
            {isPlaying && (
              <div 
                className="absolute top-1/2 left-0 w-4 h-4 -mt-2 bg-aurora-blue rounded-full animate-pulse shadow-lg shadow-aurora-blue/50"
                style={{ 
                  left: `${wavePosition}%`, 
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 20px hsl(var(--aurora-blue) / 0.8), 0 0 40px hsl(var(--aurora-blue) / 0.4)`
                }}
              ></div>
            )}
            
            {/* Journey points with enhanced effects */}
            {storySteps.map((s, index) => (
              <div 
                key={s.id}
                className={cn(
                  "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 transform",
                  index <= currentStep 
                    ? "bg-gradient-to-br from-primary to-aurora-blue scale-110 animate-pulse" 
                    : "bg-muted/50 scale-100",
                  index === currentStep && isPlaying && "animate-bounce"
                )}
                style={index <= currentStep ? {
                  boxShadow: `0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--aurora-blue) / 0.3)`
                } : {}}
              >
                <s.icon className={cn(
                  "w-8 h-8 transition-all duration-500",
                  index <= currentStep ? "text-primary-foreground animate-pulse" : "text-muted-foreground",
                  index === currentStep && isPlaying && "animate-spin"
                )} />
                
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                  <p className={cn(
                    "text-xs font-medium whitespace-nowrap transition-colors duration-300",
                    index <= currentStep ? "text-primary" : "text-muted-foreground"
                  )}>
                    {s.location.charAt(0).toUpperCase() + s.location.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Details */}
        {step && (
          <div className="text-center mb-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {storySteps.length}
              </p>
            </div>

            {/* Current Effects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {step.effects.map((effect, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-3 rounded-lg border text-sm transition-all duration-500",
                    isPlaying && index <= Math.floor(progress / 25)
                      ? "bg-aurora-blue/20 border-aurora-blue/50 text-foreground animate-pulse"
                      : "bg-muted/30 border-muted/50 text-muted-foreground"
                  )}
                >
                  {effect}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Controls */}
        <div className="flex justify-center gap-4">
          {!isPlaying ? (
            <Button onClick={playStory} className="aurora-glow">
              <Play className="w-4 h-4 mr-2" />
              {currentStep >= storySteps.length - 1 && progress >= 100 ? 'Restart Journey' : 'Start Journey'}
            </Button>
          ) : (
            <Button onClick={pauseStory} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button onClick={resetStory} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </Card>

      {/* Cosmic Wave Visualization */}
      {isPlaying && (
        <Card className="p-6 cosmic-shadow border-primary/20 bg-card/30 backdrop-blur-sm overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">🌊 Space Wave Detector</h3>
            <p className="text-sm text-muted-foreground">
              Wave speed: {(1.5 + currentStep * 0.3).toFixed(1)} million mph (That's SUPER fast! 🚀)
            </p>
          </div>
          
          {/* Simplified cosmic space */}
          <div className="relative h-24 overflow-hidden rounded-lg bg-gradient-to-r from-space-navy/90 via-space-navy/70 to-space-navy/90 border border-primary/20">
            {/* Solar wave animation */}
            <div className="absolute inset-0">
              <div className="cosmic-wave h-full bg-gradient-to-r from-transparent via-solar-orange/80 to-transparent animate-pulse"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-full animate-bounce",
                    i % 3 === 0 && "w-1 h-1 bg-solar-orange/80",
                    i % 3 === 1 && "w-0.5 h-0.5 bg-aurora-blue/70", 
                    i % 3 === 2 && "w-1.5 h-1.5 bg-white/60"
                  )}
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${20 + (i * 4) % 60}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1 + (i % 2)}s`
                  }}
                />
              ))}
            </div>
            
            {/* Realistic celestial bodies */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-solar-orange via-yellow-400 to-red-500 rounded-full animate-spin shadow-lg shadow-solar-orange/50" style={{ animationDuration: '4s' }}>
              <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 rounded-full shadow-lg shadow-blue-400/50">
              <div className="absolute inset-0.5 bg-gradient-to-br from-green-300 to-blue-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-solar-orange rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Solar Wind: {Math.round(400 + progress * 3)} km/s</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-aurora-blue rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Magnetic Field: {Math.round(5 + progress / 10)} nT</span>
            </div>
          </div>
        </Card>
      )}

      {/* Educational Information */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-foreground">🤩 Cool Space Facts!</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>🏃‍♂️ Space storms are faster than the fastest race car!</li>
            <li>⚡ Some space storms reach Earth in less than one day!</li>
            <li>🌈 Space storms create beautiful colored lights in the sky!</li>
            <li>🌍 Space weather affects the whole planet at once!</li>
          </ul>
        </Card>

        <Card className="p-6 cosmic-shadow border-nebula-pink/20 bg-card/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-foreground">🌟 Real Examples</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>🏠 In 1989, space weather turned off lights for 9 hours!</li>
            <li>✈️ Airplanes sometimes change routes to avoid space storms!</li>
            <li>📍 GPS can get confused by a few meters during storms!</li>
            <li>👨‍🚀 Astronauts hide in special rooms during big space storms!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};