import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Apple, Brain, X, ExternalLink, ChevronRight, LucideIcon } from "lucide-react";

import exerciseImage from "@assets/generated_images/Exercise_wellness_thumbnail_9961c442.png";
import nutritionImage from "@assets/generated_images/Nutrition_wellness_thumbnail_8263bebc.png";
import meditationImage from "@assets/generated_images/Meditation_wellness_thumbnail_151b5788.png";

interface Resource {
  name: string;
  url: string;
}

interface HealthTip {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  color: string;
  fullDescription: string;
  steps: string[];
  tips: string[];
  resources: Resource[];
  additionalImage: string;
}

const healthTips: HealthTip[] = [
  {
    id: 1,
    title: "Daily Exercise Routine",
    description: "Simple exercises you can do at home to stay fit and healthy",
    image: exerciseImage,
    icon: Dumbbell,
    color: "text-primary",
    fullDescription: "Transform your health with a consistent daily exercise routine that requires no gym membership or expensive equipment.",
    steps: [
      "Start with 5-10 minutes of light stretching to warm up your muscles",
      "Perform 20 bodyweight squats to strengthen your legs and glutes",
      "Do 10-15 push-ups (modify on knees if needed) for upper body strength",
      "Hold a plank position for 30-60 seconds to engage your core",
      "Complete with 5 minutes of walking or light cardio",
      "Cool down with gentle stretches for 5 minutes"
    ],
    tips: [
      "Consistency is more important than intensity - aim for daily movement",
      "Listen to your body and rest when needed",
      "Stay hydrated throughout your workout",
      "Track your progress to stay motivated"
    ],
    resources: [
      { name: "Bodyweight Exercise Guide", url: "#" },
      { name: "Beginner Workout Videos", url: "#" },
      { name: "Exercise Tracking App", url: "#" }
    ],
    additionalImage: exerciseImage
  },
  {
    id: 2,
    title: "Balanced Nutrition",
    description: "Essential nutrients and meal planning for optimal health",
    image: nutritionImage,
    icon: Apple,
    color: "text-chart-3",
    fullDescription: "Fuel your body with proper nutrition through balanced meals that provide all essential nutrients for optimal health and energy.",
    steps: [
      "Fill half your plate with colorful vegetables and fruits",
      "Include lean proteins like chicken, fish, beans, or tofu",
      "Add whole grains such as brown rice, quinoa, or oats",
      "Include healthy fats from avocados, nuts, or olive oil",
      "Stay hydrated with 8-10 glasses of water daily",
      "Plan and prep meals in advance for better choices"
    ],
    tips: [
      "Eat the rainbow - different colored foods provide various nutrients",
      "Practice portion control using your hand as a guide",
      "Read nutrition labels to make informed choices",
      "Avoid processed foods and opt for whole, natural ingredients"
    ],
    resources: [
      { name: "Meal Planning Templates", url: "#" },
      { name: "Nutrition Calculator", url: "#" },
      { name: "Healthy Recipe Database", url: "#" }
    ],
    additionalImage: nutritionImage
  },
  {
    id: 3,
    title: "Mental Wellness",
    description: "Mindfulness techniques to reduce stress and improve focus",
    image: meditationImage,
    icon: Brain,
    color: "text-chart-2",
    fullDescription: "Cultivate mental wellness through proven mindfulness techniques that reduce stress, improve focus, and enhance overall well-being.",
    steps: [
      "Find a quiet, comfortable space for your practice",
      "Start with 5 minutes of deep breathing exercises",
      "Practice body scan meditation to release tension",
      "Use guided meditation apps for structured sessions",
      "Practice gratitude by writing down 3 positive things daily",
      "End with intention setting for the day ahead"
    ],
    tips: [
      "Start small - even 2-3 minutes of meditation is beneficial",
      "Be patient with yourself as you develop the habit",
      "Use apps or guided meditations when starting out",
      "Create a consistent time and space for practice"
    ],
    resources: [
      { name: "Meditation Apps Guide", url: "#" },
      { name: "Stress Management Techniques", url: "#" },
      { name: "Mindfulness Exercises", url: "#" }
    ],
    additionalImage: meditationImage
  }
];

interface TipsSectionProps {
  onTipClick?: (tipId: number) => void;
  onModalOpen?: (tipId: number) => void;
}

export default function TipsSection({ onTipClick, onModalOpen }: TipsSectionProps): JSX.Element {
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = (tip: HealthTip): void => {
    setSelectedTip(tip);
    setIsModalOpen(true);
    onTipClick?.(tip.id);
    onModalOpen?.(tip.id);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTip(null), 300); // Delay to allow animation
  };

  return (
    <>
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
                      onClick={() => openModal(tip)}
                      data-testid={`button-read-tip-${tip.id}`}
                      aria-label={`Read more about ${tip.title}`}
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

      {/* Modal */}
      {isModalOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />
          
          {/* Modal Content */}
          <div className={`relative bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 transform ${
            isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}>
            {selectedTip && (
              <>
                {/* Header */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={selectedTip.additionalImage || selectedTip.image} 
                    alt={selectedTip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <selectedTip.icon className={`w-6 h-6 ${selectedTip.color}`} />
                      <h2 id="modal-title" className="text-2xl font-bold text-white">
                        {selectedTip.title}
                      </h2>
                    </div>
                    <p className="text-white/90 text-lg">
                      {selectedTip.fullDescription}
                    </p>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                  <div className="space-y-8">
                    {/* Steps */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-primary" />
                        Step-by-Step Guide
                      </h3>
                      <div className="space-y-3">
                        {selectedTip.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <selectedTip.icon className={`w-5 h-5 ${selectedTip.color}`} />
                        Pro Tips
                      </h3>
                      <div className="grid gap-3">
                        {selectedTip.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-primary/30 bg-background">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-chart-1" />
                        Additional Resources
                      </h3>
                      <div className="grid gap-3">
                        {selectedTip.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="font-medium">{resource.name}</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}