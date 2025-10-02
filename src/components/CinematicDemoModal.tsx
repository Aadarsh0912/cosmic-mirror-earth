import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Rocket, Zap, Globe, Camera, ArrowRight, X, Sparkles, Star } from "lucide-react";

interface CinematicDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const CinematicDemoModal = ({ isOpen, onClose, onComplete }: CinematicDemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const demoScenes = [
    {
      title: "🌌 Journey to the Stars",
      subtitle: "Episode 1: The Discovery",
      description: "Welcome, Space Explorer! You're about to embark on an incredible journey through the cosmos to understand how the Sun affects our daily lives.",
      visual: (
        <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-b from-black via-indigo-950 to-purple-950">
          {/* Stars background */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Rocket launch */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 movie-zoom">
            <Rocket className="w-20 h-20 text-white animate-bounce" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent opacity-80 animate-pulse" />
          </div>
          
          {/* Title text with epic effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl font-bold text-white epic-reveal">SPACE WEATHER</h1>
            <p className="text-xl text-yellow-300 mt-2 cinematic-fade" style={{ animationDelay: '0.5s' }}>EXPLORER</p>
          </div>
        </div>
      )
    },
    {
      title: "☀️ The Sun's Power",
      subtitle: "Episode 2: Solar Storms",
      description: "The Sun isn't just a bright light in the sky. It's a massive nuclear reactor sending powerful energy waves across space!",
      visual: (
        <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-radial from-yellow-500 via-orange-600 to-red-900">
          {/* Sun core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-yellow-300 rounded-full animate-pulse shadow-2xl">
              <div className="absolute inset-2 bg-yellow-400 rounded-full animate-cosmic-spin" />
              <div className="absolute inset-4 bg-yellow-500 rounded-full" />
            </div>
            
            {/* Solar flares */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-20 bg-gradient-to-t from-orange-500 to-transparent"
                style={{
                  transform: `rotate(${i * 60}deg) translateY(-50%)`,
                  transformOrigin: 'center bottom',
                  animation: `solar-flare ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            
            {/* Energy waves */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`wave-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-yellow-400 rounded-full opacity-0"
                style={{
                  animation: `cosmic-wave ${2}s ease-out infinite`,
                  animationDelay: `${i * 0.6}s`
                }}
              />
            ))}
          </div>
          
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "🌍 Earth's Shield",
      subtitle: "Episode 3: Magnetic Protection",
      description: "Earth has an invisible magnetic shield that protects us from solar storms. Sometimes, it creates beautiful auroras!",
      visual: (
        <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-b from-black via-blue-950 to-green-950">
          {/* Earth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-warp">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-500 rounded-full shadow-2xl relative">
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-green-600 rounded-full" />
              <div className="absolute top-3 left-3 w-4 h-4 bg-white/30 rounded-full" />
            </div>
            
            {/* Magnetic field lines */}
            <svg className="absolute -inset-20 w-64 h-64" viewBox="0 0 200 200">
              <ellipse cx="100" cy="100" rx="80" ry="40" fill="none" stroke="url(#aurora-gradient)" strokeWidth="2" opacity="0.6" className="animate-pulse" />
              <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="url(#aurora-gradient)" strokeWidth="2" opacity="0.5" transform="rotate(90 100 100)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <defs>
                <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Aurora effects */}
            <div className="absolute -inset-32">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-8 opacity-40"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${['#10b981', '#3b82f6', '#a855f7'][i % 3]}, transparent)`,
                    top: `${20 + i * 15}%`,
                    animation: `wave ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Solar wind particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-b from-yellow-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animation: `meteor-trail ${2 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "📱 Real-World Effects",
      subtitle: "Episode 4: Technology Impact",
      description: "Space weather affects our phones, GPS, power grids, and even airplanes! Let's see how.",
      visual: (
        <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(147,51,234,0.05)_25%,rgba(147,51,234,0.05)_26%,transparent_27%,transparent_74%,rgba(147,51,234,0.05)_75%,rgba(147,51,234,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
          </div>
          
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse shadow-2xl hologram-effect" />
            
            {/* Orbiting devices */}
            <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '10s' }}>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 p-3 bg-white/10 backdrop-blur rounded-lg border border-cyan-400/50 movie-zoom">
                <span className="text-3xl">📱</span>
                <p className="text-xs text-cyan-300 mt-1">GPS</p>
              </div>
            </div>
            
            <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '10s', animationDelay: '2.5s' }}>
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur rounded-lg border border-yellow-400/50 movie-zoom" style={{ animationDelay: '0.5s' }}>
                <span className="text-3xl">💡</span>
                <p className="text-xs text-yellow-300 mt-1">Power</p>
              </div>
            </div>
            
            <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '10s', animationDelay: '5s' }}>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 p-3 bg-white/10 backdrop-blur rounded-lg border border-purple-400/50 movie-zoom" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">✈️</span>
                <p className="text-xs text-purple-300 mt-1">Planes</p>
              </div>
            </div>
            
            <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '10s', animationDelay: '7.5s' }}>
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur rounded-lg border border-green-400/50 movie-zoom" style={{ animationDelay: '1.5s' }}>
                <span className="text-3xl">📡</span>
                <p className="text-xs text-green-300 mt-1">Satellites</p>
              </div>
            </div>
            
            {/* Connection lines */}
            <svg className="absolute -inset-32 w-64 h-64 animate-pulse">
              <circle cx="128" cy="128" r="60" fill="none" stroke="url(#tech-gradient)" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
              <defs>
                <linearGradient id="tech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Lightning effects */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0"
              style={{
                left: `${20 + i * 30}%`,
                animation: `lightning-flash ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "🚀 Your Mission",
      subtitle: "Final Episode: Become an Explorer",
      description: "Now it's your turn! Use your device's camera to discover how space weather affects everything around you. Ready to explore?",
      visual: (
        <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900">
          {/* Starfield */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-white animate-pulse"
                size={Math.random() * 3 + 1}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              />
            ))}
          </div>
          
          {/* Central portal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Portal rings */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    width: `${100 + i * 40}px`,
                    height: `${100 + i * 40}px`,
                    borderColor: ['#f59e0b', '#8b5cf6', '#3b82f6', '#10b981'][i],
                    animation: `cosmic-spin ${5 + i * 2}s linear infinite ${i % 2 ? 'reverse' : ''}`,
                    opacity: 0.6 - i * 0.1
                  }}
                />
              ))}
              
              {/* Camera icon in center */}
              <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl epic-reveal">
                <Camera className="w-12 h-12 text-white" />
              </div>
              
              {/* Sparkles around */}
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-300"
                  size={16}
                  style={{
                    top: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                    left: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                    animation: `particle-float ${2 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Motivational text */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white text-lg font-bold cinematic-fade">START YOUR ADVENTURE</p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setProgress((currentStep + 1) / demoScenes.length * 100);
    }
  }, [currentStep, isOpen, demoScenes.length]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep < demoScenes.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const currentScene = demoScenes[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] bg-black/95 backdrop-blur-xl border-aurora-blue/30 cosmic-shadow p-0 overflow-hidden">
        {/* Cinematic header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-aurora-blue uppercase tracking-wider">{currentScene.subtitle}</p>
              <h2 className="text-3xl font-bold text-white mt-1">{currentScene.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <Progress value={progress} className="h-1 bg-white/20 mt-4" />
        </div>

        {/* Main content */}
        <div className={`h-full flex flex-col justify-center items-center p-12 pt-32 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Visual scene */}
          <div className="w-full max-w-3xl mb-8">
            {currentScene.visual}
          </div>
          
          {/* Description */}
          <p className="text-xl text-white/90 text-center max-w-2xl mb-12 leading-relaxed cinematic-fade">
            {currentScene.description}
          </p>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 px-6 py-3"
            >
              Previous
            </Button>
            
            {/* Scene indicators */}
            <div className="flex gap-2">
              {demoScenes.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentStep 
                      ? "w-12 bg-gradient-to-r from-aurora-blue to-aurora-purple" 
                      : index < currentStep 
                        ? "w-2 bg-white/50" 
                        : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-aurora-blue to-aurora-purple text-white hover:from-aurora-blue/80 hover:to-aurora-purple/80 px-8 py-3 group"
            >
              {currentStep === demoScenes.length - 1 ? "Start Exploring!" : "Next Scene"}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Cinematic overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </DialogContent>
    </Dialog>
  );
};