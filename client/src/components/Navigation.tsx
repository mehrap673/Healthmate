import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Activity, 
  Calendar, 
  FileText, 
  Heart, 
  Home, 
  Menu, 
  Phone, 
  Settings, 
  User,
  LogOut,
  Moon,
  Sun
} from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true },
  { icon: Activity, label: "Symptoms", href: "/symptoms" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: FileText, label: "History", href: "/history" },
  { icon: Heart, label: "Health Tips", href: "/tips" },
  { icon: Phone, label: "Emergency", href: "/emergency" },
  { icon: Settings, label: "Settings", href: "/settings" }
];

interface NavigationProps {
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function Navigation({ 
  currentUser,
  onNavigate,
  onLogout,
  isDarkMode = false,
  onToggleTheme
}: NavigationProps) {
  const [activeItem, setActiveItem] = useState("/");

  const handleNavigation = (href: string) => {
    setActiveItem(href);
    console.log(`Navigating to: ${href}`);
    onNavigate?.(href);
  };

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? 'flex flex-col space-y-2' : 'hidden md:flex md:justify-between md:w-full md:px-4'}`}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.href;
        
        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
            size={mobile ? "default" : "sm"}
            className={`${mobile ? 'justify-start w-full' : 'flex-1 mx-1'} ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => handleNavigation(item.href)}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SymptoCare</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 mx-8 max-w-4xl">
            <NavItems />
          </div>

          {/* User Menu and Mobile Nav */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>
                        {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => handleNavigation('/login')} data-testid="button-login">
                Login
              </Button>
            )}

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden"
                  size="icon"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">SymptoCare</h2>
                  </div>
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}