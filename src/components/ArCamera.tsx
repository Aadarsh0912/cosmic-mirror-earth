import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, CameraOff, RotateCcw, Zap, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ArCamera = () => {
  const [isCamera, setIsCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isStormDetected, setIsStormDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate storm effects based on device orientation/movement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCamera) {
      interval = setInterval(() => {
        // Simulate GPS drift and storm detection
        const stormChance = Math.random();
        if (stormChance > 0.7) {
          setIsStormDetected(true);
          toast({
            title: "⚡ Solar Storm Detected!",
            description: "Your device is experiencing cosmic interference",
          });
        } else {
          setIsStormDetected(false);
        }
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCamera]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { 
          facingMode: 'environment', // Use back camera for AR
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsCamera(true);
      setHasPermission(true);
      
      toast({
        title: "🚀 AR Mode Activated!",
        description: "Point your camera at objects to see storm effects",
      });
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
      toast({
        title: "Camera Access Required",
        description: "Please allow camera access to use AR features",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCamera(false);
    setIsStormDetected(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Add AR overlay effects
        ctx.fillStyle = 'rgba(255, 100, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Save or share the image
        const dataURL = canvas.toDataURL('image/png');
        // In a real app, you could download or share this image
        
        toast({
          title: "📸 AR Snapshot Captured!",
          description: "Cosmic storm effects saved to image",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          AR Cosmic Mirror Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Use your device camera to see how objects around you would react during a solar storm. 
          AR overlays show real-time cosmic interference effects.
        </p>
      </div>

      {/* Camera Interface */}
      <Card className="max-w-4xl mx-auto cosmic-shadow border-aurora-blue/20 bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-video bg-space-navy rounded-lg overflow-hidden">
          {isCamera ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              
              {/* AR Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Storm Effect Overlay */}
                {isStormDetected && (
                  <>
                    <div className="absolute inset-0 bg-solar-orange/20 animate-power-flicker"></div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        Storm Detected
                      </Badge>
                    </div>
                  </>
                )}
                
                {/* GPS Drift Indicator */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className={isStormDetected ? 'animate-gps-drift' : ''}>
                    📍 GPS: {isStormDetected ? 'DRIFTING' : 'STABLE'}
                  </Badge>
                </div>
                
                {/* Object Detection Frames */}
                <div className="absolute inset-0">
                  {/* Simulated object detection boxes */}
                  <div className="absolute top-1/3 left-1/4 w-32 h-24 border-2 border-aurora-blue animate-pulse">
                    <span className="text-xs bg-aurora-blue text-black px-1 rounded">
                      Device Detected
                    </span>
                  </div>
                  
                  {isStormDetected && (
                    <div className="absolute bottom-1/3 right-1/4 w-24 h-16 border-2 border-solar-orange animate-storm-shake">
                      <span className="text-xs bg-solar-orange text-black px-1 rounded">
                        Interference
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 border-2 border-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-24 h-24 rounded-full bg-aurora-blue/20 flex items-center justify-center mb-6 aurora-glow">
                <Camera className="w-12 h-12 text-aurora-blue" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Ready for AR Experience
              </h3>
              
              {hasPermission === false && (
                <div className="mb-4">
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Camera Access Required
                  </Badge>
                </div>
              )}
              
              <p className="text-muted-foreground mb-6 max-w-md">
                Grant camera access to start the AR experience. Point your camera at objects 
                to see how they react during solar storms.
              </p>
            </div>
          )}
        </div>
        
        {/* Camera Controls */}
        <div className="p-4 flex justify-center gap-4">
          {!isCamera ? (
            <Button onClick={startCamera} className="aurora-glow">
              <Camera className="w-4 h-4 mr-2" />
              Start AR Camera
            </Button>
          ) : (
            <>
              <Button onClick={stopCamera} variant="outline">
                <CameraOff className="w-4 h-4 mr-2" />
                Stop Camera
              </Button>
              <Button onClick={captureSnapshot} className="solar-glow">
                <Camera className="w-4 h-4 mr-2" />
                Capture AR Shot
              </Button>
              <Button onClick={startCamera} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Hidden canvas for snapshots */}
      <canvas ref={canvasRef} className="hidden" />

      {/* AR Instructions */}
      <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="p-4 text-center cosmic-shadow border-aurora-blue/20 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl mb-2">📱</div>
          <h4 className="font-semibold mb-2 text-foreground">Point at Devices</h4>
          <p className="text-sm text-muted-foreground">
            Aim camera at phones, tablets, or electronics to see GPS drift effects
          </p>
        </Card>
        
        <Card className="p-4 text-center cosmic-shadow border-solar-orange/20 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl mb-2">💡</div>
          <h4 className="font-semibold mb-2 text-foreground">Find Light Sources</h4>
          <p className="text-sm text-muted-foreground">
            Target lamps or lights to witness power grid flicker simulations
          </p>
        </Card>
        
        <Card className="p-4 text-center cosmic-shadow border-aurora-purple/20 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl mb-2">📺</div>
          <h4 className="font-semibold mb-2 text-foreground">Scan Screens</h4>
          <p className="text-sm text-muted-foreground">
            Point at TVs or monitors to see communication disruption overlays
          </p>
        </Card>
      </div>
    </div>
  );
};