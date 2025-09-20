import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, User, Plane, Rocket, Zap, Tractor } from "lucide-react";
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

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setCurrentPage(0);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const Icon = currentStoryData.icon;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          📚 Stellar Stories: Space Weather Adventures
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet amazing people and discover how space weather affects their daily lives! 
          Each story teaches you something cool about space and Earth.
        </p>
      </div>

      {/* Story Selection */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {stories.map((story, index) => (
          <Button
            key={story.id}
            variant={index === currentStory ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCurrentStory(index);
              setCurrentPage(0);
            }}
            className={cn(
              "text-xs",
              index === currentStory && "aurora-glow"
            )}
          >
            <story.icon className="w-3 h-3 mr-1" />
            {story.character}
          </Button>
        ))}
      </div>

      {/* Main Story Card */}
      <Card className={cn("p-8 mb-6 cosmic-shadow backdrop-blur-sm", currentStoryData.color)}>
        {/* Story Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/20 flex items-center justify-center">
            <Icon className="w-8 h-8 text-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">{currentStoryData.title}</h3>
          <Badge variant="secondary" className="mb-4">
            {currentStoryData.profession}
          </Badge>
        </div>

        {/* Story Content */}
        <div className="bg-background/30 rounded-lg p-6 mb-6 min-h-[200px] flex items-center">
          <div className="w-full">
            <p className="text-lg text-foreground leading-relaxed text-center">
              {currentStoryData.story[currentPage]}
            </p>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === currentPage ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="opacity-70 hover:opacity-100"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Fun Fact */}
        {currentPage === totalPages - 1 && (
          <div className="bg-aurora-blue/10 border border-aurora-blue/30 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-aurora-blue mb-2">🤓 Cool Space Fact!</h4>
            <p className="text-sm text-muted-foreground">{currentStoryData.funFact}</p>
          </div>
        )}
      </Card>

      {/* Story Navigation */}
      <div className="flex justify-center gap-4">
        <Button onClick={prevStory} variant="outline" className="aurora-glow">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous Story
        </Button>
        <Button onClick={nextStory} variant="outline" className="solar-glow">
          Next Story
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Educational Footer */}
      <div className="mt-8 text-center">
        <Card className="p-6 cosmic-shadow border-nebula-pink/20 bg-card/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            🌟 About These Stories
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These stories are inspired by real space weather events! Space weather happens when the Sun sends 
            energy and particles toward Earth, affecting technology and creating beautiful auroras. 
            Scientists study space weather to help keep everyone safe and prepared.
          </p>
        </Card>
      </div>
    </div>
  );
};