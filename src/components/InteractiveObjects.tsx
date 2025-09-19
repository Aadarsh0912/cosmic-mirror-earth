import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Lightbulb, Plane, Wifi, Router, Satellite } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveObjectsProps {
  isStormActive: boolean;
}

export const InteractiveObjects = ({ isStormActive }: InteractiveObjectsProps) => {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [stormIntensity, setStormIntensity] = useState(0);

  useEffect(() => {
    if (isStormActive) {
      const interval = setInterval(() => {
        setStormIntensity(Math.random() * 100);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setStormIntensity(0);
    }
  }, [isStormActive]);

  const objects = [
    {
      id: 'gps',
      name: 'GPS Navigation',
      icon: Smartphone,
      description: 'Solar storms interfere with GPS satellites, causing location drift and navigation errors.',
      effect: 'GPS signals can be off by several meters during geomagnetic storms.',
      severity: stormIntensity > 70 ? 'high' : stormIntensity > 30 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 30 ? 'animate-gps-drift' : '',
    },
    {
      id: 'power',
      name: 'Power Grid',
      icon: Lightbulb,
      description: 'Geomagnetic storms induce currents in power lines, causing fluctuations and outages.',
      effect: 'Voltage variations can damage transformers and cause blackouts.',
      severity: stormIntensity > 80 ? 'high' : stormIntensity > 40 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 40 ? 'animate-power-flicker' : '',
    },
    {
      id: 'aviation',
      name: 'Aircraft Systems',
      icon: Plane,
      description: 'High-energy particles affect avionics and increase radiation exposure.',
      effect: 'Flights may be rerouted away from polar regions during severe storms.',
      severity: stormIntensity > 60 ? 'high' : stormIntensity > 25 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 25 ? 'animate-storm-shake' : '',
    },
    {
      id: 'radio',
      name: 'Radio Communications',
      icon: Wifi,
      description: 'Solar flares disrupt radio waves, affecting communication systems.',
      effect: 'HF radio blackouts can last for hours after a solar flare.',
      severity: stormIntensity > 50 ? 'high' : stormIntensity > 20 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 20 ? 'animate-storm-shake' : '',
    },
    {
      id: 'internet',
      name: 'Internet Infrastructure',
      icon: Router,
      description: 'Undersea cables and satellites experience disruptions during storms.',
      effect: 'Internet latency increases and some connections may fail.',
      severity: stormIntensity > 65 ? 'high' : stormIntensity > 35 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 35 ? 'animate-gps-drift' : '',
    },
    {
      id: 'satellite',
      name: 'Satellites',
      icon: Satellite,
      description: 'Charged particles damage solar panels and electronic components.',
      effect: 'Satellites may go into safe mode to protect critical systems.',
      severity: stormIntensity > 75 ? 'high' : stormIntensity > 45 ? 'medium' : 'low',
      animation: isStormActive && stormIntensity > 45 ? 'animate-storm-shake' : '',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-solar-orange';
      case 'low': return 'text-aurora-green';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Interactive Cosmic Mirror Objects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Click on any object to see how solar storms affect technology in your daily life. 
          Objects react in real-time to current space weather conditions.
        </p>
        {isStormActive && (
          <div className="mt-4">
            <Badge variant="destructive" className="animate-pulse">
              Solar Storm Intensity: {Math.round(stormIntensity)}%
            </Badge>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objects.map((object) => {
          const Icon = object.icon;
          const isSelected = selectedObject === object.id;
          
          return (
            <Card 
              key={object.id}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:scale-105",
                isSelected ? "border-primary aurora-glow" : "hover:border-primary/50",
                object.animation
              )}
              onClick={() => setSelectedObject(isSelected ? null : object.id)}
            >
              <div className="text-center">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors",
                  isStormActive ? "bg-destructive/20" : "bg-primary/20"
                )}>
                  <Icon className={cn(
                    "w-8 h-8 transition-colors",
                    isStormActive ? getSeverityColor(object.severity) : "text-primary"
                  )} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">{object.name}</h3>
                
                {isStormActive && (
                  <Badge 
                    variant={getSeverityBadge(object.severity) as any}
                    className="mb-3 capitalize"
                  >
                    {object.severity} Impact
                  </Badge>
                )}
                
                <p className="text-sm text-muted-foreground mb-4">
                  {object.description}
                </p>
                
                {isSelected && (
                  <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm font-medium text-foreground mb-2">Storm Effect:</p>
                    <p className="text-xs text-muted-foreground">{object.effect}</p>
                  </div>
                )}
                
                <Button 
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="mt-4"
                >
                  {isSelected ? "Hide Details" : "Learn More"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Storm Visualization */}
      {isStormActive && (
        <div className="mt-12 text-center">
          <div className="relative">
            <div className="cosmic-wave absolute inset-0 h-2 bg-gradient-to-r from-transparent via-solar-orange to-transparent opacity-60 rounded-full"></div>
            <p className="text-sm text-muted-foreground mt-6">
              🌊 Cosmic wave visualization - Solar particles traveling from Sun to Earth
            </p>
          </div>
        </div>
      )}
    </div>
  );
};