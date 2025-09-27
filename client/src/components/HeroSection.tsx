import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Heart, Calendar, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Healthcare_professionals_background_488d2e4e.png";

export default function HeroSection() {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-primary/10 to-chart-2/10 overflow-hidden rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Healthcare professionals" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Take Control of Your 
              <span className="text-primary"> Health Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SymptoCare provides AI-powered health insights, symptom tracking, and appointment management 
              to help you make informed decisions about your health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-3"
                data-testid="button-start-journey"
              >
                <Activity className="w-5 h-5 mr-2" />
                Start Your Health Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-3 bg-background/80 backdrop-blur-sm"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-background/90 backdrop-blur-sm hover-elevate">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-symptoms-logged">247</p>
                  <p className="text-sm text-muted-foreground">Symptoms Logged</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-background/90 backdrop-blur-sm hover-elevate">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-appointments-booked">89</p>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-background/90 backdrop-blur-sm hover-elevate col-span-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Users className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-users-helped">12,847</p>
                  <p className="text-sm text-muted-foreground">Users Helped Worldwide</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}