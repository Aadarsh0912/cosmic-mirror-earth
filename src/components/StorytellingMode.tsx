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
  const [particleIntensity, setParticleIntensity] = useState(0);

  const storySteps: StoryStep[] = [
    {
      id: 1,
      title: "Solar Eruption",
      description: "A massive solar flare unleashes billions of charged particles at incredible speeds.",
      location: 'sun',
      icon: Sun,
      duration: 2500,
      effects: ["Magnetic field snaps", "X-ray spike", "Plasma ejection"]
    },
    {
      id: 2,
      title: "Cosmic Wave",
      description: "Particles race through space at 2 million mph, creating a shockwave toward Earth.",
      location: 'space',
      icon: ArrowRight,
      duration: 3000,
      effects: ["Solar wind surge", "Shockwave forms", "Magnetic compression"]
    },
    {
      id: 3,
      title: "Magnetosphere Impact",
      description: "Earth's magnetic shield deflects the storm, creating spectacular auroras.",
      location: 'earth',
      icon: Earth,
      duration: 2500,
      effects: ["Aurora formation", "Magnetic disturbance", "Radiation belt activation"]
    },
    {
      id: 4,
      title: "Your World",
      description: "Technology around you reacts - GPS drifts, power fluctuates, communications disrupt.",
      location: 'you',
      icon: Zap,
      duration: 3000,
      effects: ["GPS drift", "Power instability", "Radio interference", "Satellite disruption"]
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
          setParticleIntensity(Math.sin((newProgress / 100) * Math.PI) * 100);
          
          if (newProgress >= 100) {
            if (currentStep < storySteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setWavePosition(prev => prev + 25);
              return 0;
            } else {
              setIsPlaying(false);
              setParticleIntensity(0);
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
  }, [isPlaying, currentStep]);

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
    setParticleIntensity(0);
  };

  const step = storySteps[currentStep];
  const Icon = step?.icon || Sun;

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Cosmic Journey: From Sun to You
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the incredible journey of a solar storm as it travels from the Sun to Earth, 
          affecting your daily life through this interactive storytelling experience.
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
        <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/30 backdrop-blur-sm overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Cosmic Wave Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Solar particles racing through space at {(1 + currentStep * 0.5).toFixed(1)} million mph
            </p>
          </div>
          
          <div className="relative h-20 overflow-hidden rounded-lg bg-gradient-to-r from-space-navy/80 via-space-navy/50 to-space-navy/80 border border-aurora-blue/20">
            {/* Multiple wave layers for depth */}
            {[...Array(3)].map((_, layerIndex) => (
              <div key={layerIndex} className="absolute inset-y-0 w-full">
                <div 
                  className={cn(
                    "cosmic-wave h-full opacity-80",
                    layerIndex === 0 && "bg-gradient-to-r from-transparent via-solar-orange/80 to-transparent",
                    layerIndex === 1 && "bg-gradient-to-r from-transparent via-aurora-blue/60 to-transparent",
                    layerIndex === 2 && "bg-gradient-to-r from-transparent via-nebula-pink/40 to-transparent"
                  )}
                  style={{ 
                    animationDuration: `${step.duration - layerIndex * 200}ms`,
                    animationDelay: `${layerIndex * 100}ms`,
                    animationIterationCount: 'infinite',
                    filter: `blur(${layerIndex}px)`,
                    transform: `scale(${1 - layerIndex * 0.1})`
                  }}
                ></div>
              </div>
            ))}
            
            {/* Enhanced particle effects */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-full animate-pulse",
                    i % 4 === 0 && "w-1 h-1 bg-solar-orange",
                    i % 4 === 1 && "w-0.5 h-0.5 bg-aurora-blue", 
                    i % 4 === 2 && "w-1.5 h-1.5 bg-nebula-pink opacity-60",
                    i % 4 === 3 && "w-0.5 h-0.5 bg-white opacity-80"
                  )}
                  style={{
                    left: `${(i * 2.5) % 100}%`,
                    top: `${10 + (i * 3) % 70}%`,
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: `${0.5 + (i % 3) * 0.5}s`,
                    transform: `scale(${0.5 + (particleIntensity / 200)})`,
                    opacity: Math.max(0.3, particleIntensity / 100),
                    boxShadow: i % 4 === 0 ? `0 0 6px hsl(var(--solar-orange) / 0.8)` : 
                              i % 4 === 1 ? `0 0 4px hsl(var(--aurora-blue) / 0.6)` :
                              i % 4 === 2 ? `0 0 8px hsl(var(--nebula-pink) / 0.4)` :
                              `0 0 3px rgba(255,255,255,0.8)`
                  }}
                />
              ))}
            </div>
            
            {/* Energy field effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-aurora-blue/10 to-transparent animate-pulse"
              style={{
                opacity: particleIntensity / 300,
                filter: 'blur(1px)'
              }}
            ></div>
          </div>
          
          {/* Real-time effects display */}
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-solar-orange rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Solar Wind: {Math.round(400 + particleIntensity * 2)} km/s</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-aurora-blue rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Magnetic Field: {Math.round(5 + particleIntensity / 10)} nT</span>
            </div>
          </div>
        </Card>
      )}

      {/* Educational Information */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Did You Know?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Solar storms can travel at speeds of 1-3 million mph</li>
            <li>• The fastest recorded solar storm reached Earth in just 17 hours</li>
            <li>• Geomagnetic storms can cause auroras visible as far south as Florida</li>
            <li>• A major solar storm could cause trillions in economic damage</li>
          </ul>
        </Card>

        <Card className="p-6 cosmic-shadow border-nebula-pink/20 bg-card/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Real-World Impact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 1989 Quebec blackout affected 6 million people for 9 hours</li>
            <li>• Airlines reroute polar flights during severe space weather</li>
            <li>• GPS accuracy can degrade by several meters during storms</li>
            <li>• Astronauts take shelter during major radiation events</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};