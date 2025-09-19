import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArCamera } from "@/components/ArCamera";
import { InteractiveObjects } from "@/components/InteractiveObjects";
import { SpaceWeatherDashboard } from "@/components/SpaceWeatherDashboard";
import { StorytellingMode } from "@/components/StorytellingMode";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Camera, Zap, Globe, Rocket, Play } from "lucide-react";

const Index = () => {
  const [activeMode, setActiveMode] = useState<'explore' | 'ar' | 'story' | 'data'>('explore');
  const [isStormActive, setIsStormActive] = useState(false);

  // Simulate space weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly trigger storm effects
      setIsStormActive(prev => Math.random() > 0.7 ? !prev : prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderActiveMode = () => {
    switch (activeMode) {
      case 'ar':
        return <ArCamera />;
      case 'story':
        return <StorytellingMode />;
      case 'data':
        return <SpaceWeatherDashboard />;
      default:
        return <InteractiveObjects isStormActive={isStormActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary rounded-full animate-star-twinkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Navigation />
      
      {activeMode === 'explore' && <Hero />}
      
      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Mode Selection */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant={activeMode === 'explore' ? 'default' : 'secondary'}
              onClick={() => setActiveMode('explore')}
              className="aurora-glow"
            >
              <Globe className="w-4 h-4 mr-2" />
              Explore Objects
            </Button>
            <Button
              variant={activeMode === 'ar' ? 'default' : 'secondary'}
              onClick={() => setActiveMode('ar')}
              className="purple-glow"
            >
              <Camera className="w-4 h-4 mr-2" />
              AR Experience
            </Button>
            <Button
              variant={activeMode === 'story' ? 'default' : 'secondary'}
              onClick={() => setActiveMode('story')}
              className="solar-glow"
            >
              <Play className="w-4 h-4 mr-2" />
              Cosmic Journey
            </Button>
            <Button
              variant={activeMode === 'data' ? 'default' : 'secondary'}
              onClick={() => setActiveMode('data')}
              className="purple-glow"
            >
              <Zap className="w-4 h-4 mr-2" />
              Live NASA Data
            </Button>
          </div>

          {/* Storm Status Indicator */}
          {isStormActive && (
            <div className="text-center mb-6">
              <Badge variant="destructive" className="animate-pulse solar-glow">
                <Zap className="w-4 h-4 mr-2" />
                Solar Storm Active!
              </Badge>
            </div>
          )}

          {/* Active Mode Content */}
          <div className="cosmic-shadow rounded-xl overflow-hidden">
            <Card className="border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
              {renderActiveMode()}
            </Card>
          </div>
        </section>

        {/* Features Overview */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 aurora-gradient bg-clip-text text-transparent">
            How Cosmic Storms Affect Your World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 cosmic-shadow border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aurora-blue/20 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-aurora-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">GPS Disruption</h3>
                <p className="text-muted-foreground">
                  Watch your navigation drift as solar particles interfere with satellite signals
                </p>
              </div>
            </Card>

            <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-solar-orange/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-solar-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Power Grid Surges</h3>
                <p className="text-muted-foreground">
                  Experience how lights flicker when solar storms create electrical disturbances
                </p>
              </div>
            </Card>

            <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aurora-purple/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-aurora-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Flight Disruptions</h3>
                <p className="text-muted-foreground">
                  See aircraft icons shake as radiation affects aviation systems
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* NASA Data Attribution */}
        <section className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Powered by real-time NASA Space Weather data and NOAA Space Weather Prediction Center
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;