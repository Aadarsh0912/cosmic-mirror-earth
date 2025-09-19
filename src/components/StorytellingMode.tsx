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
      title: "Solar Eruption",
      description: "A massive solar flare erupts from the Sun's surface, releasing billions of tons of charged particles into space at incredible speeds.",
      location: 'sun',
      icon: Sun,
      duration: 3000,
      effects: ["Solar flare intensity increases", "Magnetic field lines snap", "X-ray and UV radiation spike"]
    },
    {
      id: 2,
      title: "Cosmic Wave Journey",
      description: "The cosmic wave of particles travels through space at 1-3 million mph, creating a shockwave that will reach Earth in 1-3 days.",
      location: 'space',
      icon: ArrowRight,
      duration: 4000,
      effects: ["Solar wind accelerates", "Magnetic field compression", "Interplanetary shock wave forms"]
    },
    {
      id: 3,
      title: "Earth's Magnetosphere",
      description: "The cosmic wave collides with Earth's protective magnetic field, causing geomagnetic storms and creating beautiful auroras.",
      location: 'earth',
      icon: Earth,
      duration: 3500,
      effects: ["Magnetosphere compression", "Auroras appear at lower latitudes", "Van Allen radiation belts energize"]
    },
    {
      id: 4,
      title: "Your Daily Life",
      description: "The space weather event affects technology around you - GPS drifts, power grids fluctuate, and communication systems experience interference.",
      location: 'you',
      icon: Zap,
      duration: 4000,
      effects: ["GPS accuracy decreases", "Power grid instability", "Radio communication disruption", "Satellite operations affected"]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < storySteps.length) {
      const step = storySteps[currentStep];
      const increment = 100 / (step.duration / 100);
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentStep < storySteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setWavePosition(prev => prev + 25);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + increment;
        });
      }, 100);
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
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/30 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-solar-orange to-aurora-blue rounded-full transition-all duration-1000"
              style={{ width: `${wavePosition}%` }}
            ></div>
            
            {/* Journey points */}
            {storySteps.map((s, index) => (
              <div 
                key={s.id}
                className={cn(
                  "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                  index <= currentStep 
                    ? "bg-primary aurora-glow scale-110" 
                    : "bg-muted/50 scale-100"
                )}
              >
                <s.icon className={cn(
                  "w-8 h-8 transition-colors",
                  index <= currentStep ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-xs font-medium text-foreground whitespace-nowrap">
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
        <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/30 backdrop-blur-sm">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Cosmic Wave Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Watch the solar particles travel through space
            </p>
          </div>
          
          <div className="relative h-16 overflow-hidden rounded-lg bg-space-navy/50">
            {/* Animated cosmic wave */}
            <div className="absolute inset-y-0 w-full">
              <div 
                className="cosmic-wave h-full bg-gradient-to-r from-transparent via-solar-orange/60 to-transparent"
                style={{ 
                  animationDuration: `${step.duration}ms`,
                  animationIterationCount: 'infinite'
                }}
              ></div>
            </div>
            
            {/* Particle effects */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-aurora-blue rounded-full animate-star-twinkle"
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${20 + (i * 7) % 60}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
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