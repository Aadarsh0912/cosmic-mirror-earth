import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

interface TourScene {
  id: number;
  title: string;
  description: string;
  visual: {
    background: string;
    objects: Array<{
      emoji: string;
      animation: string;
      position: string;
      size: string;
    }>;
  };
  narration: string;
}

const tourScenes: TourScene[] = [
  {
    id: 1,
    title: "Welcome to Space! 🚀",
    description: "Let's begin our journey through the cosmos",
    visual: {
      background: "from-space-navy via-cosmic-purple to-space-navy",
      objects: [
        { emoji: "🌍", animation: "earth-spin", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "✨", animation: "star-twinkle", position: "top-20 left-20", size: "text-4xl" },
        { emoji: "✨", animation: "star-twinkle", position: "top-32 right-32", size: "text-3xl" },
        { emoji: "✨", animation: "star-twinkle", position: "bottom-40 left-40", size: "text-2xl" },
      ],
    },
    narration: "You're standing on planet Earth, about to witness how invisible forces from space affect our daily lives!",
  },
  {
    id: 2,
    title: "The Sun: Our Star ☀️",
    description: "Meet the powerhouse of our solar system",
    visual: {
      background: "from-solar-orange via-yellow-500 to-solar-orange",
      objects: [
        { emoji: "☀️", animation: "sun-spin scale-150", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "🔥", animation: "aurora-pulse", position: "top-1/3 left-1/3", size: "text-6xl" },
        { emoji: "🔥", animation: "aurora-pulse", position: "top-2/3 right-1/3", size: "text-5xl" },
        { emoji: "⚡", animation: "lightning-flash", position: "bottom-1/4 left-1/2", size: "text-7xl" },
      ],
    },
    narration: "The Sun is constantly releasing energy and particles. Sometimes it has huge eruptions called solar flares!",
  },
  {
    id: 3,
    title: "Solar Wind Blast 💨",
    description: "Invisible particles racing toward Earth",
    visual: {
      background: "from-aurora-blue via-aurora-purple to-cosmic-purple",
      objects: [
        { emoji: "💨", animation: "cosmic-wave", position: "top-1/4 left-0", size: "text-8xl" },
        { emoji: "💨", animation: "cosmic-wave", position: "top-1/2 left-10", size: "text-7xl" },
        { emoji: "💨", animation: "cosmic-wave", position: "top-3/4 left-5", size: "text-6xl" },
        { emoji: "⚡", animation: "lightning-flash", position: "top-1/3 right-1/4", size: "text-9xl" },
        { emoji: "✨", animation: "particle-float", position: "bottom-1/4 right-1/3", size: "text-5xl" },
      ],
    },
    narration: "Solar wind is like a super-fast river of particles flowing from the Sun. When these hit Earth, amazing things happen!",
  },
  {
    id: 4,
    title: "Earth's Magnetic Shield 🛡️",
    description: "Our planet's invisible protector",
    visual: {
      background: "from-space-navy via-aurora-blue to-space-navy",
      objects: [
        { emoji: "🌍", animation: "earth-spin", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "🛡️", animation: "aurora-pulse scale-125", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-[12rem]" },
        { emoji: "💫", animation: "space-warp", position: "top-20 left-20", size: "text-6xl" },
        { emoji: "💫", animation: "space-warp", position: "bottom-20 right-20", size: "text-5xl" },
      ],
    },
    narration: "Earth has a magnetic field like an invisible shield that protects us from harmful space radiation!",
  },
  {
    id: 5,
    title: "Aurora Magic 🌌",
    description: "When space meets atmosphere",
    visual: {
      background: "from-aurora-green via-aurora-blue to-aurora-purple",
      objects: [
        { emoji: "🌌", animation: "aurora-pulse", position: "top-1/4 left-1/2 -translate-x-1/2", size: "text-9xl" },
        { emoji: "✨", animation: "particle-float", position: "top-1/3 left-1/4", size: "text-6xl" },
        { emoji: "✨", animation: "particle-float", position: "top-1/2 right-1/4", size: "text-5xl" },
        { emoji: "💚", animation: "aurora-pulse", position: "bottom-1/3 left-1/3", size: "text-7xl" },
        { emoji: "💙", animation: "aurora-pulse", position: "bottom-1/3 right-1/3", size: "text-6xl" },
      ],
    },
    narration: "When solar particles hit Earth's atmosphere near the poles, they create beautiful northern and southern lights!",
  },
  {
    id: 6,
    title: "Your Phone Gets Confused 📱",
    description: "GPS signals go wobbly",
    visual: {
      background: "from-space-navy via-cosmic-purple to-space-navy",
      objects: [
        { emoji: "📱", animation: "gps-drift", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "📡", animation: "storm-shake", position: "top-1/4 left-1/4", size: "text-7xl" },
        { emoji: "🛰️", animation: "storm-shake", position: "top-1/4 right-1/4", size: "text-6xl" },
        { emoji: "❓", animation: "float", position: "bottom-1/4 left-1/3", size: "text-8xl" },
      ],
    },
    narration: "During space storms, GPS satellites can get confused, making your phone's location wobble around!",
  },
  {
    id: 7,
    title: "Power Grid Shakes ⚡",
    description: "Electricity systems feel the storm",
    visual: {
      background: "from-yellow-600 via-solar-orange to-destructive",
      objects: [
        { emoji: "💡", animation: "power-flicker", position: "top-1/3 left-1/4", size: "text-8xl" },
        { emoji: "💡", animation: "power-flicker", position: "top-1/3 right-1/4", size: "text-7xl" },
        { emoji: "⚡", animation: "lightning-flash", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "🏭", animation: "storm-shake", position: "bottom-1/4 left-1/3", size: "text-6xl" },
        { emoji: "🔌", animation: "storm-shake", position: "bottom-1/4 right-1/3", size: "text-5xl" },
      ],
    },
    narration: "Strong space weather can cause power lines to surge and lights to flicker. Engineers work hard to keep everything safe!",
  },
  {
    id: 8,
    title: "Airplanes Change Routes ✈️",
    description: "Pilots navigate around space storms",
    visual: {
      background: "from-aurora-blue via-space-navy to-cosmic-purple",
      objects: [
        { emoji: "✈️", animation: "float", position: "top-1/3 left-1/4", size: "text-8xl" },
        { emoji: "✈️", animation: "float", position: "top-1/2 right-1/4", size: "text-7xl" },
        { emoji: "☁️", animation: "aurora-pulse", position: "bottom-1/4 left-1/2 -translate-x-1/2", size: "text-9xl" },
        { emoji: "🌐", animation: "earth-spin", position: "bottom-1/3 right-1/4", size: "text-6xl" },
      ],
    },
    narration: "During space storms, pilots may change flight paths to avoid areas with more radiation, keeping passengers safe!",
  },
  {
    id: 9,
    title: "You're a Space Explorer! 🌟",
    description: "Understanding our cosmic connection",
    visual: {
      background: "from-aurora-purple via-cosmic-purple to-nebula-pink",
      objects: [
        { emoji: "🌟", animation: "cosmic-spin", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "text-9xl" },
        { emoji: "👨‍🚀", animation: "space-warp", position: "top-1/3 left-1/4", size: "text-7xl" },
        { emoji: "👩‍🚀", animation: "space-warp", position: "top-1/3 right-1/4", size: "text-7xl" },
        { emoji: "🚀", animation: "float", position: "bottom-1/4 left-1/3", size: "text-6xl" },
        { emoji: "🛸", animation: "float", position: "bottom-1/4 right-1/3", size: "text-6xl" },
      ],
    },
    narration: "Now you understand how space weather connects the Sun, Earth, and everything in between. You're a space explorer!",
  },
];

export default function SpaceTour() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const scene = tourScenes[currentScene];
  const totalScenes = tourScenes.length;

  useEffect(() => {
    setProgress((currentScene / (totalScenes - 1)) * 100);
  }, [currentScene, totalScenes]);

  const handleNext = () => {
    if (currentScene < totalScenes - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentScene(currentScene + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentScene > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentScene(currentScene - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${scene.visual.background} transition-all duration-1000`}
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full star-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Floating Cosmic Dust Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute w-2 h-2 bg-aurora-blue/30 rounded-full animate-float-particle blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Meteor Showers */}
        {currentScene > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={`meteor-${i}`}
                className="absolute w-1 h-20 bg-gradient-to-b from-white via-aurora-blue to-transparent"
                style={{
                  top: `${Math.random() * 50}%`,
                  left: `${Math.random() * 100}%`,
                  transform: 'rotate(45deg)',
                  animation: `meteor-trail ${3 + Math.random() * 2}s ease-in infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Cosmic Energy Waves */}
        {currentScene >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-1/4 left-0 w-full h-32 bg-gradient-to-r from-transparent via-aurora-blue to-transparent animate-cosmic-wave blur-xl"></div>
              <div className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r from-transparent via-solar-orange to-transparent animate-cosmic-wave blur-lg" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-3/4 left-0 w-full h-20 bg-gradient-to-r from-transparent via-aurora-purple to-transparent animate-cosmic-wave blur-md" style={{ animationDelay: '4s' }}></div>
            </div>
          </div>
        )}

        {/* Pulsing Light Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className={`absolute rounded-full blur-3xl animate-pulse-glow ${
                i % 3 === 0 ? 'bg-aurora-blue/10' : i % 3 === 1 ? 'bg-solar-orange/10' : 'bg-aurora-purple/10'
              }`}
              style={{
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2 bg-white/20" />
          <div className="flex justify-between items-center mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/20"
            >
              <Home className="w-4 h-4 mr-2" />
              Exit Tour
            </Button>
            <span className="text-white text-sm font-medium">
              Scene {currentScene + 1} of {totalScenes}
            </span>
          </div>
        </div>
      </div>

      {/* Scene Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Visual Area */}
          <div className="relative h-[60vh] mb-8">
            {/* Holographic Frame */}
            <div className="absolute inset-0 border-2 border-aurora-blue/30 rounded-lg backdrop-blur-sm hologram-effect"></div>
            
            {/* 3D Perspective Container */}
            <div className="absolute inset-0 perspective-1000">
              <div
                className={`absolute inset-0 transition-all duration-700 transform-gpu ${
                  isAnimating ? "opacity-0 scale-75 rotate-y-90" : "opacity-100 scale-100 rotate-y-0"
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {scene.visual.objects.map((obj, index) => (
                  <div
                    key={index}
                    className={`absolute ${obj.position} ${obj.size} ${obj.animation} transition-all duration-500 hover:scale-125 cursor-pointer`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      filter: 'drop-shadow(0 0 20px currentColor)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {obj.emoji}
                    
                    {/* Glow Ring Effect */}
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute inset-0 bg-current opacity-20 rounded-full blur-xl animate-pulse-glow"></div>
                    </div>
                  </div>
                ))}

                {/* Scene-specific Extra Effects */}
                {currentScene === 2 && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-solar-orange/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-yellow-500/20 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
                  </>
                )}

                {currentScene === 4 && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-aurora-blue/40 rounded-full animate-pulse-glow"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-2 border-aurora-blue/30 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                  </>
                )}

                {currentScene === 6 && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`signal-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-aurora-blue to-transparent"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px)`,
                          animation: 'aurora-pulse 2s ease-in-out infinite',
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Narration Card */}
          <Card
            className={`p-8 bg-card/80 backdrop-blur-lg border-aurora-blue/30 transition-all duration-500 ${
              isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 aurora-gradient bg-clip-text text-transparent">
              {scene.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              {scene.description}
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              {scene.narration}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentScene === 0 || isAnimating}
                className="border-aurora-blue/50 hover:bg-aurora-blue/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {currentScene < totalScenes - 1 ? (
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="aurora-glow hover:scale-105 transition-transform"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleComplete}
                  className="aurora-glow hover:scale-105 transition-transform"
                >
                  Finish Tour 🎉
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
