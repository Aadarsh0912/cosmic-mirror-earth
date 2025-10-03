import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, User, Plane, Rocket, Zap, Tractor, Sparkles, Radio, Navigation, Shield, Cloud, Wifi, MapPin, Compass, Sun, Moon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryPage {
  text: string;
  visuals: {
    icon: React.ComponentType<any>;
    color: string;
    animation: string;
    particles?: string;
  }[];
}

interface Story {
  id: number;
  title: string;
  character: string;
  profession: string;
  icon: React.ComponentType<any>;
  story: StoryPage[];
  funFact: string;
  color: string;
}

export const ChildrenStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const stories: Story[] = [
    {
      id: 1,
      title: "Farmer Sam and the Magical Sky Lights",
      character: "Farmer Sam",
      profession: "Farmer",
      icon: Tractor,
      color: "border-green-400/50 bg-green-400/10",
      story: [
        {
          text: "🌾 Farmer Sam was working in his cornfield when something amazing happened! The sky started dancing with beautiful green and purple lights.",
          visuals: [
            { icon: Tractor, color: "text-green-500", animation: "animate-bounce", particles: "aurora" },
            { icon: Sun, color: "text-yellow-400", animation: "cosmic-spin", particles: "stars" },
            { icon: Sparkles, color: "text-purple-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "📡 'Oh no!' said Sam. 'My GPS tractor is going in circles instead of straight lines!' The space storm was making his farming equipment confused.",
          visuals: [
            { icon: Navigation, color: "text-red-500", animation: "animate-spin", particles: "error" },
            { icon: Radio, color: "text-orange-400", animation: "animate-pulse" },
            { icon: Tractor, color: "text-green-500", animation: "movie-zoom" }
          ]
        },
        {
          text: "🌱 But Sam was smart! He knew that space weather sometimes affects technology. So he used his old compass and planted his seeds the traditional way.",
          visuals: [
            { icon: Compass, color: "text-blue-500", animation: "cosmic-spin", particles: "light" },
            { icon: Sparkles, color: "text-green-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "🌈 That night, Sam and his family watched the most beautiful aurora lights dancing in the sky. 'Space weather can be tricky, but it sure is beautiful!' Sam smiled.",
          visuals: [
            { icon: Moon, color: "text-blue-300", animation: "aurora-pulse", particles: "aurora" },
            { icon: Star, color: "text-yellow-300", animation: "star-twinkle" },
            { icon: Sparkles, color: "text-purple-400", animation: "star-twinkle" }
          ]
        }
      ],
      funFact: "Farmers use GPS to plant crops in perfectly straight lines!"
    },
    {
      id: 2,
      title: "Captain Maya's Sky Adventure",
      character: "Captain Maya",
      profession: "Pilot",
      icon: Plane,
      color: "border-blue-400/50 bg-blue-400/10",
      story: [
        {
          text: "✈️ Captain Maya was flying her airplane high above the clouds when mission control called: 'Maya, there's a space storm coming!'",
          visuals: [
            { icon: Plane, color: "text-blue-500", animation: "meteor-trail", particles: "clouds" },
            { icon: Cloud, color: "text-gray-300", animation: "cinematic-fade" },
            { icon: Radio, color: "text-red-400", animation: "animate-pulse" }
          ]
        },
        {
          text: "📻 'What does that mean?' asked her co-pilot. Maya explained: 'Space storms can make our radio fuzzy and our navigation wobbly!'",
          visuals: [
            { icon: Radio, color: "text-orange-500", animation: "lightning-flash", particles: "error" },
            { icon: Wifi, color: "text-red-500", animation: "animate-ping" },
            { icon: Navigation, color: "text-yellow-400", animation: "animate-bounce" }
          ]
        },
        {
          text: "🛣️ Maya was super smart and changed her flight path away from the North Pole, where space storms are strongest. 'Safety first!' she said with a smile.",
          visuals: [
            { icon: MapPin, color: "text-green-500", animation: "movie-zoom", particles: "light" },
            { icon: Navigation, color: "text-blue-400", animation: "cosmic-spin" },
            { icon: Plane, color: "text-blue-500", animation: "meteor-trail" }
          ]
        },
        {
          text: "🌟 Her passengers got to see amazing northern lights through the windows. 'Thanks to space weather, you're seeing nature's most beautiful light show!' Maya announced.",
          visuals: [
            { icon: Sparkles, color: "text-purple-400", animation: "star-twinkle", particles: "aurora" },
            { icon: Star, color: "text-yellow-300", animation: "star-twinkle" },
            { icon: Moon, color: "text-blue-300", animation: "aurora-pulse" }
          ]
        }
      ],
      funFact: "Pilots sometimes fly different routes to avoid space weather!"
    },
    {
      id: 3,
      title: "Astronaut Alex's Space Shield",
      character: "Astronaut Alex",
      profession: "Astronaut",
      icon: Rocket,
      color: "border-purple-400/50 bg-purple-400/10",
      story: [
        {
          text: "🚀 Astronaut Alex was floating in the International Space Station when the computer beeped: 'Space storm alert!'",
          visuals: [
            { icon: Rocket, color: "text-purple-500", animation: "space-warp", particles: "stars" },
            { icon: Radio, color: "text-red-500", animation: "lightning-flash" },
            { icon: Sparkles, color: "text-yellow-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "🛡️ 'Time to go to our special safe room!' Alex told the crew. The space station has thick walls that protect astronauts from space radiation.",
          visuals: [
            { icon: Shield, color: "text-blue-500", animation: "hologram", particles: "light" },
            { icon: Rocket, color: "text-purple-400", animation: "movie-zoom" }
          ]
        },
        {
          text: "🌍 From their safe spot, Alex looked down at Earth and saw the most incredible auroras covering the whole planet like a glowing blanket.",
          visuals: [
            { icon: Moon, color: "text-blue-400", animation: "cosmic-spin", particles: "aurora" },
            { icon: Sparkles, color: "text-green-400", animation: "aurora-pulse" },
            { icon: Star, color: "text-purple-300", animation: "star-twinkle" }
          ]
        },
        {
          text: "⭐ 'Space storms remind us how connected Earth and space really are,' Alex said, taking amazing photos to share with kids back on Earth.",
          visuals: [
            { icon: Star, color: "text-yellow-400", animation: "star-twinkle", particles: "stars" },
            { icon: Sparkles, color: "text-purple-400", animation: "star-twinkle" },
            { icon: Sun, color: "text-orange-400", animation: "aurora-pulse" }
          ]
        }
      ],
      funFact: "Astronauts have a special safe room in the space station!"
    },
    {
      id: 4,
      title: "Engineer Emma and the Dancing Lights",
      character: "Engineer Emma",
      profession: "Power Grid Operator",
      icon: Zap,
      color: "border-yellow-400/50 bg-yellow-400/10",
      story: [
        {
          text: "⚡ Engineer Emma worked at the power plant that brings electricity to thousands of homes. One night, her computers started beeping loudly!",
          visuals: [
            { icon: Zap, color: "text-yellow-500", animation: "lightning-flash", particles: "electric" },
            { icon: Radio, color: "text-red-500", animation: "animate-pulse" },
            { icon: Sparkles, color: "text-yellow-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "'Space weather is causing extra electricity in our power lines!' Emma explained to her team. 'We need to be extra careful tonight.'",
          visuals: [
            { icon: Zap, color: "text-orange-500", animation: "lightning-flash", particles: "error" },
            { icon: Zap, color: "text-red-500", animation: "lightning-flash" },
            { icon: Radio, color: "text-yellow-400", animation: "animate-ping" }
          ]
        },
        {
          text: "🔧 Emma and her team worked like superheroes, adjusting the power systems to keep everyone's lights on during the space storm.",
          visuals: [
            { icon: Zap, color: "text-blue-500", animation: "hologram", particles: "light" },
            { icon: Shield, color: "text-green-400", animation: "movie-zoom" },
            { icon: Sparkles, color: "text-yellow-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "🏠 The next morning, all the families woke up with power in their homes. 'Thanks to Emma, we stayed safe and cozy!' they cheered.",
          visuals: [
            { icon: Sun, color: "text-yellow-400", animation: "cosmic-spin", particles: "light" },
            { icon: Star, color: "text-green-400", animation: "star-twinkle" },
            { icon: Sparkles, color: "text-blue-400", animation: "aurora-pulse" }
          ]
        }
      ],
      funFact: "Space storms can create extra electricity in power lines!"
    },
    {
      id: 5,
      title: "Little Luna's Phone Goes Wiggle",
      character: "Little Luna",
      profession: "Student",
      icon: User,
      color: "border-pink-400/50 bg-pink-400/10",
      story: [
        {
          text: "📱 Little Luna was using her mom's phone to find the playground when something funny happened - the GPS dot kept jumping around!",
          visuals: [
            { icon: MapPin, color: "text-pink-500", animation: "animate-bounce", particles: "error" },
            { icon: Navigation, color: "text-red-500", animation: "animate-ping" },
            { icon: Wifi, color: "text-orange-400", animation: "lightning-flash" }
          ]
        },
        {
          text: "'Mom, why is the map being silly?' Luna asked. Her mom smiled: 'There's a space storm happening, sweetie. It makes technology act funny!'",
          visuals: [
            { icon: Radio, color: "text-purple-500", animation: "animate-pulse", particles: "stars" },
            { icon: Sparkles, color: "text-pink-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "🧭 Luna's mom taught her how to use landmarks instead: 'See the big red house? The playground is just past it!' Luna felt like a real explorer.",
          visuals: [
            { icon: Compass, color: "text-blue-500", animation: "cosmic-spin", particles: "light" },
            { icon: MapPin, color: "text-green-400", animation: "movie-zoom" },
            { icon: Star, color: "text-yellow-400", animation: "star-twinkle" }
          ]
        },
        {
          text: "🌟 That night, Luna saw her first aurora through her bedroom window. 'Space weather is like magic!' she whispered, making a wish on the dancing lights.",
          visuals: [
            { icon: Moon, color: "text-blue-300", animation: "aurora-pulse", particles: "aurora" },
            { icon: Star, color: "text-purple-400", animation: "star-twinkle" },
            { icon: Sparkles, color: "text-pink-400", animation: "star-twinkle" }
          ]
        }
      ],
      funFact: "Kids can learn to navigate using landmarks when GPS gets confused!"
    }
  ];

  const currentStoryData = stories[currentStory];
  const totalPages = currentStoryData.story.length;

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const nextStory = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
      setCurrentPage(0);
      setIsTransitioning(false);
    }, 500);
  };

  const prevStory = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
      setCurrentPage(0);
      setIsTransitioning(false);
    }, 500);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const Icon = currentStoryData.icon;

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `particle-float ${8 + particle.delay}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="text-center mb-8 cinematic-fade relative">
        <div className="inline-block relative mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground hologram-effect">
            📚 Stellar Stories: Space Weather Adventures
          </h2>
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl -z-10 aurora-pulse" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Meet amazing people and discover how space weather affects their daily lives! 
          Each story teaches you something cool about space and Earth.
        </p>
        <Sparkles className="inline-block w-6 h-6 text-primary ml-2 star-twinkle" />
      </div>

      {/* Story Selection */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 relative">
        {stories.map((story, index) => (
          <Button
            key={story.id}
            variant={index === currentStory ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentStory(index);
                setCurrentPage(0);
                setIsTransitioning(false);
              }, 500);
            }}
            className={cn(
              "text-xs transition-all duration-300 hover:scale-110 hover:-translate-y-1",
              index === currentStory && "aurora-glow scale-110 shadow-lg"
            )}
          >
            <story.icon className={cn(
              "w-3 h-3 mr-1 transition-transform",
              index === currentStory && "animate-pulse"
            )} />
            {story.character}
          </Button>
        ))}
      </div>

      {/* Main Story Card */}
      <Card className={cn(
        "p-8 mb-6 cosmic-shadow backdrop-blur-sm relative overflow-hidden transition-all duration-500",
        currentStoryData.color,
        isTransitioning ? "scale-95 opacity-50" : "scale-100 opacity-100"
      )}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 aurora-pulse pointer-events-none" />
        
        {/* Story Header */}
        <div className={cn(
          "text-center mb-6 relative z-10 transition-all duration-700",
          isTransitioning ? "movie-zoom" : "cinematic-fade"
        )}>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl group-hover:blur-2xl transition-all aurora-pulse" />
            <Icon className="w-10 h-10 text-foreground relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            {currentStoryData.title}
          </h3>
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1 shadow-lg">
            {currentStoryData.profession}
          </Badge>
        </div>

        {/* Cinematic Story Scene */}
        <div className={cn(
          "relative rounded-lg p-8 mb-6 min-h-[400px] flex flex-col items-center justify-center overflow-hidden",
          "border border-primary/30 shadow-2xl"
        )}>
          {/* Dynamic Background based on story context */}
          <div className={cn(
            "absolute inset-0 transition-all duration-1000",
            isTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
          )}>
            <div className={cn(
              "absolute inset-0",
              currentPage === 0 && "bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-green-900/40",
              currentPage === 1 && "bg-gradient-to-br from-red-900/40 via-orange-900/40 to-yellow-900/40",
              currentPage === 2 && "bg-gradient-to-br from-green-900/40 via-blue-900/40 to-teal-900/40",
              currentPage === 3 && "bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40"
            )}>
              <div className="absolute inset-0 backdrop-blur-3xl" />
            </div>
            
            {/* Animated particles matching scene mood */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute rounded-full",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "aurora" && "bg-gradient-to-r from-purple-500/30 to-green-500/30",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "stars" && "bg-yellow-400/40",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "error" && "bg-red-500/30",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "light" && "bg-blue-400/30",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "electric" && "bg-yellow-500/40",
                  currentStoryData.story[currentPage].visuals[0]?.particles === "clouds" && "bg-gray-300/20"
                )}
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particle-float ${5 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Cinematic Icon Scene */}
          <div className={cn(
            "relative z-10 mb-8 transition-all duration-1000 perspective-1000",
            isTransitioning ? "opacity-0 translate-y-20 scale-75" : "opacity-100 translate-y-0 scale-100"
          )}>
            <div className="flex gap-8 items-center justify-center relative">
              {currentStoryData.story[currentPage].visuals.map((visual, idx) => {
                const VisualIcon = visual.icon;
                const isCenter = idx === 1;
                return (
                  <div 
                    key={idx}
                    className={cn(
                      "relative transition-all duration-1000 ease-out",
                      isCenter ? "scale-125 z-20" : "scale-100 z-10"
                    )}
                    style={{
                      animationDelay: `${idx * 300}ms`,
                      transform: isTransitioning 
                        ? `translateX(${(idx - 1) * 200}px) translateY(100px) scale(0)` 
                        : `translateX(0) translateY(0) scale(1)`
                    }}
                  >
                    {/* Dramatic glow effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-2xl opacity-60 transition-all duration-700",
                      visual.particles === "aurora" && "bg-gradient-to-r from-purple-500 to-green-500 animate-pulse",
                      visual.particles === "stars" && "bg-yellow-400 star-twinkle",
                      visual.particles === "error" && "bg-red-500 lightning-flash",
                      visual.particles === "light" && "bg-blue-400 aurora-pulse",
                      visual.particles === "electric" && "bg-yellow-500 lightning-flash",
                      visual.particles === "clouds" && "bg-gray-300/40"
                    )} 
                    style={{
                      transform: isCenter ? 'scale(2)' : 'scale(1.5)',
                      animation: isCenter ? `${visual.animation} 2s ease-in-out infinite` : visual.animation
                    }}
                    />
                    
                    {/* Icon container with movie-like entrance */}
                    <div className={cn(
                      "relative rounded-full flex items-center justify-center",
                      "bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl",
                      "border-2 transition-all duration-500",
                      isCenter ? "w-32 h-32 border-primary shadow-2xl" : "w-24 h-24 border-primary/50 shadow-xl",
                      visual.animation
                    )}>
                      <VisualIcon 
                        className={cn(
                          "relative z-10 transition-all duration-500",
                          visual.color,
                          isCenter ? "w-16 h-16" : "w-12 h-12"
                        )} 
                      />
                    </div>

                    {/* Light rays */}
                    {isCenter && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45 animate-spin" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-45 animate-spin" style={{ animationDuration: '4s' }} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cinematic Story Text with typewriter reveal */}
          <div className={cn(
            "relative z-10 max-w-3xl mx-auto transition-all duration-1000",
            isTransitioning 
              ? "opacity-0 translate-y-10 blur-md scale-95" 
              : "opacity-100 translate-y-0 blur-0 scale-100 cinematic-fade"
          )}>
            <div className="relative">
              {/* Text shadow glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
              
              <p className={cn(
                "relative text-xl md:text-2xl text-foreground leading-relaxed text-center font-semibold",
                "drop-shadow-2xl"
              )}>
                {currentStoryData.story[currentPage].text}
              </p>
            </div>
          </div>

          {/* Cinematic borders */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="opacity-70 hover:opacity-100 transition-all hover:scale-110 hover:-translate-x-1 disabled:hover:scale-100 disabled:hover:translate-x-0"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === currentPage 
                    ? "w-8 h-2 bg-primary shadow-lg shadow-primary/50" 
                    : "w-2 h-2 bg-muted hover:bg-muted-foreground/50 cursor-pointer",
                  i < currentPage && "bg-primary/50"
                )}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentPage(i);
                    setIsTransitioning(false);
                  }, 400);
                }}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="opacity-70 hover:opacity-100 transition-all hover:scale-110 hover:translate-x-1 disabled:hover:scale-100 disabled:hover:translate-x-0"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Fun Fact */}
        {currentPage === totalPages - 1 && (
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/40 rounded-lg p-5 text-center relative overflow-hidden cinematic-fade shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent aurora-pulse pointer-events-none" />
            <h4 className="font-bold text-primary mb-2 text-lg relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 star-twinkle" />
              🤓 Cool Space Fact!
              <Sparkles className="w-5 h-5 star-twinkle" />
            </h4>
            <p className="text-base text-foreground font-medium relative z-10">{currentStoryData.funFact}</p>
          </div>
        )}
      </Card>

      {/* Story Navigation */}
      <div className="flex justify-center gap-4 relative z-10">
        <Button 
          onClick={prevStory} 
          variant="outline" 
          className="aurora-glow transition-all hover:scale-110 hover:-translate-x-2 group"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Previous Story
        </Button>
        <Button 
          onClick={nextStory} 
          variant="outline" 
          className="solar-glow transition-all hover:scale-110 hover:translate-x-2 group"
          disabled={isTransitioning}
        >
          Next Story
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Educational Footer */}
      <div className="mt-8 text-center relative z-10">
        <Card className="p-8 cosmic-shadow border-primary/30 bg-card/40 backdrop-blur-md relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-16 translate-x-16 aurora-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl translate-y-16 -translate-x-16 aurora-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 text-foreground flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6 text-primary star-twinkle" />
              🌟 About These Stories
              <BookOpen className="w-6 h-6 text-primary star-twinkle" />
            </h3>
            <p className="text-base text-foreground/90 max-w-2xl mx-auto leading-relaxed">
              These stories are inspired by <span className="font-semibold text-primary">real space weather events</span>! 
              Space weather happens when the Sun sends energy and particles toward Earth, affecting technology and creating beautiful auroras. 
              Scientists study space weather to help keep everyone safe and prepared.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};