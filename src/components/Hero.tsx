import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Camera, Play, Sparkles } from "lucide-react";
import { SolarSystem } from "@/components/SolarSystem";
import { CinematicDemoModal } from "@/components/CinematicDemoModal";
import cosmicHeroBg from "@/assets/cosmic-hero-bg.jpg";
import { useNavigate } from "react-router-dom";

export const Hero = ({ onModeChange }: { onModeChange?: (mode: string) => void }) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartAdventure = () => {
    // Animate button click and navigate to tour
    const button = document.querySelector('.adventure-button');
    button?.classList.add('animate-scale-out');
    
    setTimeout(() => {
      navigate('/space-tour');
    }, 300);
  };

  const handleWatchDemo = () => {
    setIsDemoOpen(true);
  };

  const handleDemoComplete = () => {
    setIsDemoOpen(false);
    if (onModeChange) {
      onModeChange('stories');
    }
  };

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center justify-center py-20">
      {/* Cosmic background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${cosmicHeroBg})` }}
      ></div>
      
      {/* Aurora overlay effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 aurora-gradient rounded-full blur-3xl animate-aurora-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 nebula-gradient rounded-full blur-3xl animate-aurora-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="aurora-gradient bg-clip-text text-transparent">
              Space Weather Explorer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Discover how space storms from the Sun affect things around you! 
            Use your phone to see how cosmic weather changes your world every day.
          </p>
          
          
          {/* Solar System Animation */}
          <div className="mb-8">
            <SolarSystem />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative group">
              {/* Animated particle effects around button */}
              <div className="absolute -inset-2 opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-1/4 w-3 h-3 bg-aurora-blue rounded-full animate-float-particle"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-solar-orange rounded-full animate-float-particle" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-aurora-purple rounded-full animate-float-particle" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-cosmic-teal rounded-full animate-float-particle" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Pulsing glow rings */}
              <div className="absolute -inset-1 bg-gradient-to-r from-aurora-blue via-solar-orange to-aurora-purple rounded-lg blur-lg animate-pulse-glow opacity-50"></div>
              
              <Button 
                size="lg" 
                className="adventure-button relative overflow-hidden text-lg px-8 py-6 group hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-aurora-blue border-0"
                onClick={handleStartAdventure}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-blue via-solar-orange to-aurora-purple animate-gradient-shift"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out shimmer-effect"></div>
                
                {/* Button content */}
                <span className="relative flex items-center text-white font-bold">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  🚀 Start Space Adventure
                </span>
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="demo-button border-aurora-blue/50 hover:bg-aurora-blue/10 text-lg px-8 py-6 group hover:scale-105 transition-all duration-300 hover:border-aurora-blue hover:shadow-lg hover:shadow-aurora-blue/30"
              onClick={handleWatchDemo}
            >
              <Play className="w-5 h-5 mr-2 group-hover:animate-spin" />
              🎬 Quick Preview (30s)
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 cosmic-shadow border-aurora-blue/20 bg-card/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-aurora-blue/20 flex items-center justify-center">
                  📱
                </div>
                <h3 className="font-semibold mb-2 text-foreground">📱 Phone Gets Confused</h3>
                <p className="text-sm text-muted-foreground">Watch your GPS wobble during space storms!</p>
              </div>
            </Card>

            <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-solar-orange/20 flex items-center justify-center">
                  💡
                </div>
                <h3 className="font-semibold mb-2 text-foreground">💡 Lights Go Blink</h3>
                <p className="text-sm text-muted-foreground">See how space weather makes lights flicker!</p>
              </div>
            </Card>

            <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-aurora-purple/20 flex items-center justify-center">
                  ✈️
                </div>
                <h3 className="font-semibold mb-2 text-foreground">✈️ Planes Get Shaky</h3>
                <p className="text-sm text-muted-foreground">Airplanes feel space weather too!</p>
              </div>
            </Card>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
    
    {/* Demo Modal */}
    <CinematicDemoModal 
      isOpen={isDemoOpen}
      onClose={() => setIsDemoOpen(false)}
      onComplete={handleDemoComplete}
    />
    </>
  );
};