
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Menu, MapPin, Search, MessageCircle, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  travelNowMode?: boolean;
  onTravelModeChange?: (mode: boolean) => void;
}

const Navbar = ({ travelNowMode = false, onTravelModeChange }: NavbarProps) => {
  const [isTravelMode, setIsTravelMode] = useState(travelNowMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes
  const location = useLocation();

  // Update internal state when prop changes
  useEffect(() => {
    setIsTravelMode(travelNowMode);
  }, [travelNowMode]);

  const handleTravelModeToggle = (checked: boolean) => {
    setIsTravelMode(checked);
    if (onTravelModeChange) {
      onTravelModeChange(checked);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="travel-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="h-5 w-5 text-primary" />
                  Home
                </Link>
                <Link to="/explore" className="flex items-center gap-2 text-lg font-semibold">
                  <Search className="h-5 w-5" />
                  Explore
                </Link>
                <Link to="/trips" className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="h-5 w-5" />
                  Trips
                </Link>
                <Link to="/messages" className="flex items-center gap-2 text-lg font-semibold">
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </Link>
                {isLoggedIn ? (
                  <Link to="/profile" className="flex items-center gap-2 text-lg font-semibold">
                    <Search className="h-5 w-5" />
                    Profile
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-lg font-semibold">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" strokeWidth={2.5} />
            <span className="text-xl font-bold hidden sm:inline-block bg-gradient-to-r from-travel-blue to-travel-purple bg-clip-text text-transparent">
              TravelNow
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}>
            Home
          </Link>
          <Link to="/explore" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/explore' ? 'text-primary' : ''}`}>
            Explore
          </Link>
          <Link to="/trips" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/trips' ? 'text-primary' : ''}`}>
            Trips
          </Link>
          <Link to="/messages" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/messages' ? 'text-primary' : ''}`}>
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isTravelMode ? "text-travel-green" : "text-muted-foreground"}`}>Travel Now</span>
            <Switch 
              checked={isTravelMode} 
              onCheckedChange={handleTravelModeToggle}
              className={`${isTravelMode ? "bg-travel-green" : ""}`}
            />
          </div>

          {isLoggedIn ? (
            <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
