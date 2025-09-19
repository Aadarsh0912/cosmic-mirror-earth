import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Zap } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="relative z-20 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-aurora-blue/20 flex items-center justify-center aurora-glow">
            <Rocket className="w-6 h-6 text-aurora-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Cosmic Mirror</h1>
            <p className="text-sm text-muted-foreground">NASA Space Weather AR</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="aurora-glow">
            <Zap className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Button variant="outline" size="sm" className="border-aurora-blue/50 hover:bg-aurora-blue/10">
            Learn More
          </Button>
        </div>
      </div>
    </nav>
  );
};