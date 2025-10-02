import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Rocket, Zap, Globe, Camera, ArrowRight, X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const DemoModal = ({ isOpen, onClose, onComplete }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      title: "🚀 Welcome to Space Weather Explorer!",
      description: "Discover how space storms from the Sun affect Earth and everything around us!",
      icon: <Rocket className="w-12 h-12 text-solar-orange animate-pulse" />,
      animation: "animate-scale-in"
    },
    {
      title: "☀️ Solar Storms Explained",
      description: "The Sun sends out powerful bursts of energy called solar flares. These travel through space and can reach Earth!",
      icon: <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-solar-orange rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-solar-yellow rounded-full"></div>
      </div>,
      animation: "animate-fade-in"
    },
    {
      title: "📱 Use Your Camera",
      description: "Point your phone at everyday objects to see how space weather affects them in real-time!",
      icon: <Camera className="w-12 h-12 text-aurora-blue animate-bounce" />,
      animation: "animate-slide-in-right"
    },
    {
      title: "📖 Interactive Stories",
      description: "Follow fun characters as they experience space weather effects in their daily lives!",
      icon: <div className="flex space-x-2">
        <span className="text-3xl animate-bounce" style={{ animationDelay: "0.1s" }}>👨‍🚀</span>
        <span className="text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>👩‍✈️</span>
        <span className="text-3xl animate-bounce" style={{ animationDelay: "0.3s" }}>👷</span>
      </div>,
      animation: "animate-scale-in"
    },
    {
      title: "📊 Real NASA Data",
      description: "See actual space weather data from NASA satellites and learn what it means!",
      icon: <Globe className="w-12 h-12 text-aurora-purple animate-orbit" />,
      animation: "animate-fade-in"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setProgress((currentStep + 1) / demoSteps.length * 100);
    }
  }, [currentStep, isOpen, demoSteps.length]);

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentDemo = demoSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-aurora-blue/30 cosmic-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <span className="aurora-gradient bg-clip-text text-transparent">
              Space Adventure Tutorial
            </span>
          </DialogTitle>
          <DialogDescription>
            Step {currentStep + 1} of {demoSteps.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={progress} className="h-2 bg-muted" />

          <Card className={`p-8 text-center space-y-6 border-aurora-blue/20 bg-card/50 ${currentDemo.animation}`}>
            <div className="flex justify-center">
              {currentDemo.icon}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                {currentDemo.title}
              </h3>
              <p className="text-muted-foreground text-lg">
                {currentDemo.description}
              </p>
            </div>

            {/* Visual demo elements */}
            {currentStep === 1 && (
              <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-solar-orange/20 to-solar-yellow/20">
                <div className="absolute top-4 left-4 w-8 h-8 bg-solar-orange rounded-full animate-solar-flare"></div>
                <div className="absolute top-8 right-8 w-6 h-6 bg-aurora-blue rounded-full animate-gps-drift"></div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-aurora-purple/50 rounded-full animate-aurora-pulse"></div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-aurora-blue/10 border border-aurora-blue/30 animate-pulse">
                  <span className="text-2xl">📱</span>
                  <p className="text-xs mt-1">Phone</p>
                </div>
                <div className="p-4 rounded-lg bg-solar-orange/10 border border-solar-orange/30 animate-pulse" style={{ animationDelay: "0.2s" }}>
                  <span className="text-2xl">💡</span>
                  <p className="text-xs mt-1">Lights</p>
                </div>
                <div className="p-4 rounded-lg bg-aurora-purple/10 border border-aurora-purple/30 animate-pulse" style={{ animationDelay: "0.4s" }}>
                  <span className="text-2xl">✈️</span>
                  <p className="text-xs mt-1">Planes</p>
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-aurora-blue/30 hover:bg-aurora-blue/10"
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {demoSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? "bg-primary w-8" 
                      : index < currentStep 
                        ? "bg-primary/50" 
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="aurora-glow group"
            >
              {currentStep === demoSteps.length - 1 ? "Start Exploring!" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};