import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Home,
  Activity,
  Calendar,
  FileText,
  Shield,
  HelpCircle,
  MessageCircle,
  Send,
  ArrowRight
} from "lucide-react";

interface FooterProps {
  onNavigate?: (href: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (href: string) => {
    console.log(`Navigating to: ${href}`);
    onNavigate?.(href);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter signup clicked');
    // Handle newsletter signup
  };

  return (
    <footer className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-t">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Stay Updated with Health Tips & News
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the latest health insights, symptom management tips, and wellness advice delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-background/80 backdrop-blur-sm"
              />
              <Button onClick={handleNewsletterSubmit} className="sm:px-8">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">SymptoCare</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering individuals to take control of their health journey through AI-powered insights and comprehensive care management.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">123 Health Street, Medical District</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+1 (555) 123-CARE</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">hello@symptocare.com</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-3">
              {[
                { icon: Home, label: "Dashboard", href: "/" },
                { icon: Activity, label: "Track Symptoms", href: "/symptoms" },
                { icon: Calendar, label: "Appointments", href: "/appointments" },
                { icon: FileText, label: "Health History", href: "/history" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group w-full text-left"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <div className="space-y-3">
              {[
                { icon: HelpCircle, label: "Help Center", href: "/help" },
                { icon: MessageCircle, label: "Contact Support", href: "/support" },
                { icon: Shield, label: "Privacy Policy", href: "/privacy" },
                { icon: FileText, label: "Terms of Service", href: "/terms" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group w-full text-left"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Health Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Health Resources</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer group">
                <button
                  onClick={() => handleNavigation('/tips')}
                  className="w-full text-left"
                >
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Daily Health Tips
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expert advice for better living
                  </p>
                  <ArrowRight className="w-4 h-4 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Card>
              
              <Card className="p-4 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer group">
                <button
                  onClick={() => handleNavigation('/emergency')}
                  className="w-full text-left"
                >
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Emergency Contacts
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    24/7 medical assistance
                  </p>
                  <ArrowRight className="w-4 h-4 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background/20">
        <div className="container mx-auto px-6 max-w-6xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 SymptoCare. All rights reserved. | Made with ❤️ for better health
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => handleNavigation(social.href)}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}