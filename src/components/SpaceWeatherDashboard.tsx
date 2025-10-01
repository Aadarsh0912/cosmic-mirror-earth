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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SpaceWeatherData {
  solarFlares: {
    current: string;
    intensity: number;
    lastFlare: string;
    forecast: string;
  };
  geomagneticStorm: {
    kpIndex: number;
    status: string;
    aurora: string;
    impact: string;
  };
  solarWind: {
    speed: number;
    density: number;
    temperature: number;
    magneticField: number;
  };
  particleRadiation: {
    protonFlux: number;
    electronFlux: number;
    radiationLevel: string;
  };
  alerts: Array<{
    type: string;
    severity: string;
    message: string;
    timestamp: string;
  }>;
  lastUpdate: string;
}

export const SpaceWeatherDashboard = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<SpaceWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchSpaceWeatherData();
    const interval = setInterval(fetchSpaceWeatherData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchSpaceWeatherData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-space-weather');
      
      if (error) throw error;
      
      setWeatherData(data);
      setLastUpdate(new Date());
      
      // Save to cache
      await supabase
        .from('space_weather_cache')
        .upsert({
          data_type: 'dashboard_data',
          data: data,
          fetched_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 3600000).toISOString(),
        });
        
    } catch (error: any) {
      console.error('Error fetching space weather data:', error);
      
      // Try to get cached data
      const { data: cachedData } = await supabase
        .from('space_weather_cache')
        .select('*')
        .eq('data_type', 'dashboard_data')
        .order('fetched_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (cachedData && cachedData.data) {
        setWeatherData(cachedData.data as any);
        toast({
          title: "Using cached data",
          description: "Live data temporarily unavailable",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchSpaceWeatherData();
    toast({
      title: "🔄 Refreshing data",
      description: "Fetching latest space weather information",
    });
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

  if (!weatherData) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-aurora-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading space weather data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            🛰️ NASA Space Weather Dashboard  
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
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <Card className="p-4 mb-6 border-destructive/50 bg-destructive/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive">⚠️ Space Weather Alerts</h3>
          </div>
          <div className="space-y-1">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="text-sm">
                <Badge variant={alert.severity === 'Severe' ? 'destructive' : 'secondary'} className="mr-2">
                  {alert.severity}
                </Badge>
                <span className="text-destructive/90">{alert.message}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Main Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 cosmic-shadow border-solar-orange/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-solar-orange/20 flex items-center justify-center solar-glow">
                <Sun className="w-6 h-6 text-solar-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">☀️ Solar Flares</h3>
                <p className="text-sm text-muted-foreground">X-ray intensity</p>
              </div>
            </div>
            <Badge variant={getStatusBadge(weatherData.solarFlares.intensity, 10) as any}>
              {weatherData.solarFlares.current}
            </Badge>
          </div>
          <Progress 
            value={(weatherData.solarFlares.intensity / 10) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            {weatherData.solarFlares.forecast}
          </p>
        </Card>

        <Card className="p-6 cosmic-shadow border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aurora-blue/20 flex items-center justify-center aurora-glow">
                <Globe className="w-6 h-6 text-aurora-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">🌍 Geomagnetic Storm</h3>
                <p className="text-sm text-muted-foreground">Earth's magnetosphere</p>
              </div>
            </div>
            <Badge variant={getStatusBadge(weatherData.geomagneticStorm.kpIndex, 9) as any}>
              {weatherData.geomagneticStorm.status}
            </Badge>
          </div>
          <Progress 
            value={(weatherData.geomagneticStorm.kpIndex / 9) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            🌌 Aurora: {weatherData.geomagneticStorm.aurora}
          </p>
        </Card>

        <Card className="p-6 cosmic-shadow border-aurora-purple/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aurora-purple/20 flex items-center justify-center purple-glow">
                <Activity className="w-6 h-6 text-aurora-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">💨 Solar Wind</h3>
                <p className="text-sm text-muted-foreground">Particle velocity</p>
              </div>
            </div>
            <Badge variant="secondary">
              {weatherData.solarWind.speed} km/s
            </Badge>
          </div>
          <Progress 
            value={(weatherData.solarWind.speed / 800) * 100} 
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            Density: {weatherData.solarWind.density} p/cm³
          </p>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 cosmic-shadow border-border/20 bg-card/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            ⚡ Particle Radiation
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Proton Flux</span>
                <span className="text-sm font-medium text-foreground">
                  {weatherData.particleRadiation.protonFlux} pfu
                </span>
              </div>
              <Progress value={(weatherData.particleRadiation.protonFlux / 10) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Electron Flux</span>
                <span className="text-sm font-medium text-foreground">
                  {weatherData.particleRadiation.electronFlux} × 10⁹
                </span>
              </div>
              <Progress value={(weatherData.particleRadiation.electronFlux / 5000) * 100} />
            </div>
            
            <Badge variant="outline" className="w-full justify-center">
              {weatherData.particleRadiation.radiationLevel}
            </Badge>
          </div>
        </Card>

        <Card className="p-6 cosmic-shadow border-border/20 bg-card/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            📡 Impact Assessment
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">📍 GPS Accuracy</span>
              <Badge variant={weatherData.geomagneticStorm.kpIndex > 5 ? "destructive" : "outline"}>
                {weatherData.geomagneticStorm.kpIndex > 5 ? "Degraded" : "Normal"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">📻 Radio Communications</span>
              <Badge variant={weatherData.solarFlares.intensity > 5 ? "secondary" : "outline"}>
                {weatherData.solarFlares.intensity > 5 ? "Disrupted" : "Clear"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">🛰️ Satellite Operations</span>
              <Badge variant={weatherData.particleRadiation.protonFlux > 5 ? "destructive" : "outline"}>
                {weatherData.particleRadiation.protonFlux > 5 ? "At Risk" : "Nominal"}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">⚡ Power Grids</span>
              <Badge variant={weatherData.geomagneticStorm.kpIndex > 7 ? "destructive" : "outline"}>
                {weatherData.geomagneticStorm.kpIndex > 7 ? "Voltage Issues" : "Stable"}
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
              <p className="text-sm font-medium text-foreground">🚀 Data Sources</p>
              <p className="text-xs text-muted-foreground">
                NASA Space Weather Database • NOAA Space Weather Prediction Center • GOES Satellites
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Updated every minute</p>
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