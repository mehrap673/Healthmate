import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Apple, Brain } from "lucide-react";
import exerciseImage from "@assets/generated_images/Exercise_wellness_thumbnail_9961c442.png";
import nutritionImage from "@assets/generated_images/Nutrition_wellness_thumbnail_8263bebc.png";
import meditationImage from "@assets/generated_images/Meditation_wellness_thumbnail_151b5788.png";

const healthTips = [
  {
    id: 1,
    title: "Daily Exercise Routine",
    description: "Simple exercises you can do at home to stay fit and healthy",
    image: exerciseImage,
    icon: Dumbbell,
    color: "text-primary"
  },
  {
    id: 2,
    title: "Balanced Nutrition",
    description: "Essential nutrients and meal planning for optimal health",
    image: nutritionImage,
    icon: Apple,
    color: "text-chart-3"
  },
  {
    id: 3,
    title: "Mental Wellness",
    description: "Mindfulness techniques to reduce stress and improve focus",
    image: meditationImage,
    icon: Brain,
    color: "text-chart-2"
  }
];

interface HealthTipsSectionProps {
  onTipClick?: (tipId: number) => void;
}

export default function HealthTipsSection({ onTipClick }: HealthTipsSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Health Tips & Wellness
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover expert advice and practical tips to improve your overall health and wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="hover-elevate cursor-pointer group">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={tip.image} 
                      alt={tip.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-lg">
                      <IconComponent className={`w-5 h-5 ${tip.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2" data-testid={`text-tip-title-${tip.id}`}>
                    {tip.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-4">
                    {tip.description}
                  </CardDescription>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-0 h-auto font-medium text-primary hover:text-primary"
                    onClick={() => {
                      console.log(`Reading tip: ${tip.title}`);
                      onTipClick?.(tip.id);
                    }}
                    data-testid={`button-read-tip-${tip.id}`}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}