import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if we have cached data that's still valid
    const { data: cachedData } = await supabase
      .from('space_weather_cache')
      .select('*')
      .eq('data_type', 'solar_flare')
      .gte('expires_at', new Date().toISOString())
      .single();

    if (cachedData) {
      console.log('Returning cached data');
      return new Response(
        JSON.stringify(cachedData.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch fresh data from NASA API (simulated for demo)
    // In production, you would fetch from actual NASA APIs
    const spaceWeatherData = {
      solarFlares: {
        current: 'M-class',
        intensity: 6.5,
        lastFlare: new Date(Date.now() - 3600000).toISOString(),
        forecast: 'Moderate activity expected',
      },
      geomagneticStorm: {
        kpIndex: 5,
        status: 'Minor Storm',
        aurora: 'Visible at 55° latitude',
        impact: 'GPS and radio disruptions possible',
      },
      solarWind: {
        speed: 450,
        density: 8.2,
        temperature: 150000,
        magneticField: 12,
      },
      particleRadiation: {
        protonFlux: 2.1,
        electronFlux: 1500,
        radiationLevel: 'S1 - Minor',
      },
      alerts: [
        {
          type: 'Solar Flare',
          severity: 'Moderate',
          message: 'M6.5 flare detected, minor radio blackouts possible',
          timestamp: new Date().toISOString(),
        }
      ],
      lastUpdate: new Date().toISOString(),
    };

    // Cache the data
    await supabase
      .from('space_weather_cache')
      .upsert({
        data_type: 'solar_flare',
        data: spaceWeatherData,
        fetched_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      });

    console.log('Fetched and cached fresh data');

    return new Response(
      JSON.stringify(spaceWeatherData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-space-weather function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});