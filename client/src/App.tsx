import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import HeroSection from "@/components/HeroSection";
import HealthTipsSection from "@/components/HealthTipsSection";
import SymptomForm from "@/components/SymptomForm";
import AppointmentForm from "@/components/AppointmentForm";
import EmergencyContacts from "@/components/EmergencyContacts";
import HealthHistory from "@/components/HealthHistory";
import UserProfile from "@/components/UserProfile";
import AuthForms from "@/components/AuthForms";
import NotFound from "@/pages/not-found";
import Footer from "./components/footer";
import TipsSection from "./components/TipsSection";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function Router({ 
  currentUser, 
  onNavigate 
}: { 
  currentUser: User | null;
  onNavigate: (path: string) => void;
}) {
  return (
    <Switch>
      <Route path="/" component={() => (
        <div className="space-y-0">
          <HeroSection />
          <div className="container mx-auto px-6 max-w-6xl py-16">
            <Dashboard 
              onNavigateToSymptoms={() => onNavigate('/symptoms')}
              onNavigateToAppointments={() => onNavigate('/appointments')}
              onNavigateToEmergency={() => onNavigate('/emergency')}
              onNavigateToHistory={() => onNavigate('/history')}
            />
          </div>
          <HealthTipsSection />
        </div>
      )} />
      
      <Route path="/symptoms" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <SymptomForm />
        </div>
      )} />
      
      <Route path="/appointments" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <AppointmentForm />
        </div>
      )} />
      
      <Route path="/history" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <HealthHistory />
        </div>
      )} />

      <Route path="/tips" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <TipsSection />
        </div>
      )} />
      
      <Route path="/emergency" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <EmergencyContacts />
        </div>
      )} />
      
      <Route path="/profile" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <UserProfile />
        </div>
      )} />
      
      <Route path="/settings" component={() => (
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <UserProfile />
        </div>
      )} />
      
      <Route path="/login" component={() => <AuthForms />} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Mock user state - in real app this would come from auth context
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: ""
  });

  const handleNavigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In real app, this would use the router's navigation
    window.location.href = path;
  };

  const handleLogin = async (loginData: any) => {
    console.log("Login:", loginData);
    // Simulate successful login
    setCurrentUser({
      id: "1",
      name: "John Doe",
      email: loginData.email,
      avatar: ""
    });
    handleNavigate('/');
  };

  const handleSignup = async (signupData: any) => {
    console.log("Signup:", signupData);
    // Simulate successful signup
    setCurrentUser({
      id: "1",
      name: signupData.name,
      email: signupData.email,
      avatar: ""
    });
    handleNavigate('/');
  };

  const handleLogout = () => {
    console.log("User logged out");
    setCurrentUser(null);
    handleNavigate('/login');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Navigation - only show if user is logged in and not on login page */}
          {currentUser && window.location.pathname !== '/login' && (
            <Navigation
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}
          
          {/* Main Content */}
          <main className={currentUser && window.location.pathname !== '/login' ? 'pt-0' : ''}>
            <Router 
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
            <Footer />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;