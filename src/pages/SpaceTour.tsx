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
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full star-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
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
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              {scene.visual.objects.map((obj, index) => (
                <div
                  key={index}
                  className={`absolute ${obj.position} ${obj.size} ${obj.animation}`}
                >
                  {obj.emoji}
                </div>
              ))}
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
