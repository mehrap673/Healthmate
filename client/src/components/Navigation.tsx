import { useState, useEffect } from "react";
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
  activeStateUrl?: string; // URL to fetch current active state from
}

export default function Navigation({ 
  currentUser,
  onNavigate,
  onLogout,
  activeStateUrl
}: NavigationProps) {
  const [activeItem, setActiveItem] = useState("/");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from stored preference or system preference
  useEffect(() => {
    const initializeTheme = () => {
      // First check if there's a stored preference
      const storedTheme = window.localStorage?.getItem('theme');
      
      if (storedTheme) {
        const isDark = storedTheme === 'dark';
        setIsDarkMode(isDark);
        applyTheme(isDark);
      } else {
        // Fall back to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        applyTheme(prefersDark);
      }
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a manual preference
      const storedTheme = window.localStorage?.getItem('theme');
      if (!storedTheme) {
        setIsDarkMode(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  const applyTheme = (isDark: boolean) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  };

  // Toggle theme function
  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    applyTheme(newTheme);
    
    // Persist preference
    try {
      window.localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Fetch active state from URL
  useEffect(() => {
    const fetchActiveState = async () => {
      if (!activeStateUrl) return;
      
      try {
        const response = await fetch(activeStateUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Assuming the API returns { activeRoute: "/some-route" }
        // Adjust this based on your actual API response format
        if (data.activeRoute) {
          setActiveItem(data.activeRoute);
        }
      } catch (error) {
        console.error('Failed to fetch active navigation state:', error);
        // Fallback to current location if available
        if (typeof window !== 'undefined') {
          setActiveItem(window.location.pathname);
        }
      }
    };

    fetchActiveState();
  }, [activeStateUrl]);

  // Update active state when URL changes (for SPA routing)
  useEffect(() => {
    const updateActiveStateFromUrl = () => {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        setActiveItem(currentPath);
      }
    };

    // Listen for browser navigation changes
    window.addEventListener('popstate', updateActiveStateFromUrl);
    
    // Initial check
    updateActiveStateFromUrl();

    return () => {
      window.removeEventListener('popstate', updateActiveStateFromUrl);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setActiveItem(href);
    console.log(`Navigating to: ${href}`);
    onNavigate?.(href);

    // Update browser URL if needed
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', href);
    }
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
              onClick={handleToggleTheme}
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