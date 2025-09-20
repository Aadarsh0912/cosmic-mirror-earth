import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Camera, Play } from "lucide-react";
import { SolarSystem } from "@/components/SolarSystem";
import cosmicHeroBg from "@/assets/cosmic-hero-bg.jpg";

export const Hero = () => {
  return (
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
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how space storms from the Sun affect things around you! 
            Use your phone to see how cosmic weather changes your world every day.
          </p>
          
          {/* Solar System Animation */}
          <div className="mb-8">
            <SolarSystem />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="aurora-glow text-lg px-8 py-6">
              <Camera className="w-5 h-5 mr-2" />
              🚀 Start Space Adventure
            </Button>
            <Button variant="outline" size="lg" className="border-aurora-blue/50 hover:bg-aurora-blue/10 text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              🎬 Watch Cool Demo
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
  );
};