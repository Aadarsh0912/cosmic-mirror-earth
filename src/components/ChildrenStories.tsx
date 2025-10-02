import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, User, Plane, Rocket, Zap, Tractor, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: number;
  title: string;
  character: string;
  profession: string;
  icon: React.ComponentType<any>;
  story: string[];
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
        "🌾 Farmer Sam was working in his cornfield when something amazing happened! The sky started dancing with beautiful green and purple lights.",
        "📡 'Oh no!' said Sam. 'My GPS tractor is going in circles instead of straight lines!' The space storm was making his farming equipment confused.",
        "🌱 But Sam was smart! He knew that space weather sometimes affects technology. So he used his old compass and planted his seeds the traditional way.",
        "🌈 That night, Sam and his family watched the most beautiful aurora lights dancing in the sky. 'Space weather can be tricky, but it sure is beautiful!' Sam smiled."
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
        "✈️ Captain Maya was flying her airplane high above the clouds when mission control called: 'Maya, there's a space storm coming!'",
        "📻 'What does that mean?' asked her co-pilot. Maya explained: 'Space storms can make our radio fuzzy and our navigation wobbly!'",
        "🛣️ Maya was super smart and changed her flight path away from the North Pole, where space storms are strongest. 'Safety first!' she said with a smile.",
        "🌟 Her passengers got to see amazing northern lights through the windows. 'Thanks to space weather, you're seeing nature's most beautiful light show!' Maya announced."
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
        "🚀 Astronaut Alex was floating in the International Space Station when the computer beeped: 'Space storm alert!'",
        "🛡️ 'Time to go to our special safe room!' Alex told the crew. The space station has thick walls that protect astronauts from space radiation.",
        "🌍 From their safe spot, Alex looked down at Earth and saw the most incredible auroras covering the whole planet like a glowing blanket.",
        "⭐ 'Space storms remind us how connected Earth and space really are,' Alex said, taking amazing photos to share with kids back on Earth."
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
        "⚡ Engineer Emma worked at the power plant that brings electricity to thousands of homes. One night, her computers started beeping loudly!",
        "'Space weather is causing extra electricity in our power lines!' Emma explained to her team. 'We need to be extra careful tonight.'",
        "🔧 Emma and her team worked like superheroes, adjusting the power systems to keep everyone's lights on during the space storm.",
        "🏠 The next morning, all the families woke up with power in their homes. 'Thanks to Emma, we stayed safe and cozy!' they cheered."
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
        "📱 Little Luna was using her mom's phone to find the playground when something funny happened - the GPS dot kept jumping around!",
        "'Mom, why is the map being silly?' Luna asked. Her mom smiled: 'There's a space storm happening, sweetie. It makes technology act funny!'",
        "🧭 Luna's mom taught her how to use landmarks instead: 'See the big red house? The playground is just past it!' Luna felt like a real explorer.",
        "🌟 That night, Luna saw her first aurora through her bedroom window. 'Space weather is like magic!' she whispered, making a wish on the dancing lights."
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

        {/* Story Content */}
        <div className={cn(
          "bg-background/40 backdrop-blur-sm rounded-lg p-8 mb-6 min-h-[220px] flex items-center relative overflow-hidden",
          "border border-primary/20 shadow-inner"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className={cn(
            "w-full relative z-10 transition-all duration-500",
            isTransitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0 cinematic-fade"
          )}>
            <p className="text-lg md:text-xl text-foreground leading-relaxed text-center font-medium">
              {currentStoryData.story[currentPage]}
            </p>
          </div>
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