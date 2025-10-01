import { Rocket, User, LogOut, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data) setProfile(data);
  };

  return (
    <nav className="relative z-20 bg-background/80 backdrop-blur-md border-b border-aurora-blue/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-blue to-cosmic-purple flex items-center justify-center animate-pulse">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold aurora-gradient bg-clip-text text-transparent">
                🌟 Cosmic Mirror Earth
              </h1>
              <p className="text-sm text-muted-foreground">Learn How Space Weather Affects You!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Badge variant="secondary" className="aurora-glow animate-pulse">
              <span className="mr-1">🔴</span>
              Live NASA Data
            </Badge>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-aurora-blue/50">
                    <User className="w-4 h-4 mr-2" />
                    {profile?.username || user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Star className="w-4 h-4 mr-2" />
                    Score: {profile?.quiz_score || 0} ⭐
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Rocket className="w-4 h-4 mr-2" />
                    Stories: {profile?.stories_completed || 0}/5
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-aurora-blue to-cosmic-purple hover:opacity-90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};