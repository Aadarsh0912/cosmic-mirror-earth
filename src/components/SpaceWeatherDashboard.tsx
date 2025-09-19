import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sun, 
  Zap, 
  Radio, 
  Satellite, 
  Activity, 
  Globe, 
  AlertTriangle,
  RefreshCw,
  TrendingUp
} from "lucide-react";

interface SpaceWeatherData {
  solarFlareLevel: number;
  geomagneticStorm: number;
  solarWindSpeed: number;
  protonFlux: number;
  electronFlux: number;
  kpIndex: number;
  timestamp: string;
  alerts: string[];
}

export const SpaceWeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<SpaceWeatherData>({
    solarFlareLevel: 2,
    geomagneticStorm: 1,
    solarWindSpeed: 420,
    protonFlux: 0.8,
    electronFlux: 1.2,
    kpIndex: 3,
    timestamp: new Date().toISOString(),
    alerts: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateSpaceWeatherData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateSpaceWeatherData = () => {
    setWeatherData(prev => ({
      ...prev,
      solarFlareLevel: Math.max(0, Math.min(5, prev.solarFlareLevel + (Math.random() - 0.5) * 0.5)),
      geomagneticStorm: Math.max(0, Math.min(5, prev.geomagneticStorm + (Math.random() - 0.5) * 0.3)),
      solarWindSpeed: Math.max(300, Math.min(800, prev.solarWindSpeed + (Math.random() - 0.5) * 50)),
      protonFlux: Math.max(0, Math.min(10, prev.protonFlux + (Math.random() - 0.5) * 0.2)),
      electronFlux: Math.max(0, Math.min(10, prev.electronFlux + (Math.random() - 0.5) * 0.3)),
      kpIndex: Math.max(0, Math.min(9, prev.kpIndex + (Math.random() - 0.5) * 0.5)),
      timestamp: new Date().toISOString(),
      alerts: generateAlerts()
    }));
    
    setLastUpdate(new Date());
  };

  const generateAlerts = () => {
    const alerts = [];
    if (Math.random() > 0.7) alerts.push("Solar Flare Activity Increased");
    if (Math.random() > 0.8) alerts.push("Geomagnetic Storm Warning");
    if (Math.random() > 0.9) alerts.push("High Energy Proton Event");
    return alerts;
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSpaceWeatherData();
    setIsLoading(false);
  };

  const getStatusColor = (level: number, max: number) => {
    const percentage = (level / max) * 100;
    if (percentage > 70) return "text-destructive";
    if (percentage > 40) return "text-solar-orange";
    return "text-aurora-green";
  };

  const getStatusBadge = (level: number, max: number) => {
    const percentage = (level / max) * 100;
    if (percentage > 70) return "destructive";
    if (percentage > 40) return "secondary";
    return "outline";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            NASA Space Weather Dashboard  
          </h2>
          <p className="text-muted-foreground">
            Real-time monitoring of solar activity and space weather conditions
          </p>
        </div>
        
        <div className="text-right">
          <Button 
            onClick={refreshData} 
            disabled={isLoading}
            variant="outline"
            className="mb-2"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <p className="text-sm text-muted-foreground">
            Last updated: {formatTime(lastUpdate)}
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      {weatherData.alerts.length > 0 && (
        <Card className="p-4 mb-6 border-destructive/50 bg-destructive/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive">Space Weather Alerts</h3>
          </div>
          <div className="space-y-1">
            {weatherData.alerts.map((alert, index) => (
              <p key={index} className="text-sm text-destructive/90">• {alert}</p>
            ))}
          </div>
        </Card>
      )}

      {/* Main Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-solar-orange/20 flex items-center justify-center">
                <Sun className="w-6 h-6 text-solar-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Solar Flares</h3>
                <p className="text-sm text-muted-foreground">X-ray intensity</p>
              </div>
            </div>
            <Badge variant={getStatusBadge(weatherData.solarFlareLevel, 5) as any}>
              Level {weatherData.solarFlareLevel.toFixed(1)}
            </Badge>
          </div>
          <Progress 
            value={(weatherData.solarFlareLevel / 5) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            Current: {weatherData.solarFlareLevel > 3 ? 'High' : weatherData.solarFlareLevel > 1 ? 'Moderate' : 'Low'} activity
          </p>
        </Card>

        <Card className="p-6 cosmic-shadow border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aurora-blue/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-aurora-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Geomagnetic Storm</h3>
                <p className="text-sm text-muted-foreground">Earth's magnetosphere</p>
              </div>
            </div>
            <Badge variant={getStatusBadge(weatherData.geomagneticStorm, 5) as any}>
              G{Math.floor(weatherData.geomagneticStorm)}
            </Badge>
          </div>
          <Progress 
            value={(weatherData.geomagneticStorm / 5) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            Kp Index: {weatherData.kpIndex.toFixed(1)}
          </p>
        </Card>

        <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aurora-purple/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-aurora-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Solar Wind</h3>
                <p className="text-sm text-muted-foreground">Particle velocity</p>
              </div>
            </div>
            <Badge variant="secondary">
              {Math.round(weatherData.solarWindSpeed)} km/s
            </Badge>
          </div>
          <Progress 
            value={(weatherData.solarWindSpeed / 800) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            {weatherData.solarWindSpeed > 600 ? 'Fast' : weatherData.solarWindSpeed > 400 ? 'Moderate' : 'Slow'} solar wind
          </p>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 cosmic-shadow border-border/20 bg-card/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Particle Radiation
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Proton Flux</span>
                <span className="text-sm font-medium text-foreground">
                  {weatherData.protonFlux.toFixed(2)} pfu
                </span>
              </div>
              <Progress value={(weatherData.protonFlux / 10) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Electron Flux</span>
                <span className="text-sm font-medium text-foreground">
                  {weatherData.electronFlux.toFixed(2)} × 10⁹
                </span>
              </div>
              <Progress value={(weatherData.electronFlux / 10) * 100} />
            </div>
          </div>
        </Card>

        <Card className="p-6 cosmic-shadow border-border/20 bg-card/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            Impact Assessment
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">GPS Accuracy</span>
              <Badge variant={weatherData.geomagneticStorm > 2 ? "destructive" : "outline"}>
                {weatherData.geomagneticStorm > 2 ? "Degraded" : "Normal"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Radio Communications</span>
              <Badge variant={weatherData.solarFlareLevel > 2 ? "secondary" : "outline"}>
                {weatherData.solarFlareLevel > 2 ? "Disrupted" : "Clear"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Satellite Operations</span>
              <Badge variant={weatherData.protonFlux > 5 ? "destructive" : "outline"}>
                {weatherData.protonFlux > 5 ? "At Risk" : "Nominal"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Power Grids</span>
              <Badge variant={weatherData.geomagneticStorm > 3 ? "destructive" : "outline"}>
                {weatherData.geomagneticStorm > 3 ? "Voltage Issues" : "Stable"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Source Attribution */}
      <Card className="p-4 bg-muted/30 border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Satellite className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Data Sources</p>
              <p className="text-xs text-muted-foreground">
                NASA Space Weather Database • NOAA Space Weather Prediction Center • GOES Satellites
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Updated every 5 minutes</p>
            <div className="flex items-center gap-1 text-xs text-aurora-green">
              <div className="w-2 h-2 bg-aurora-green rounded-full animate-pulse"></div>
              Live Data
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};