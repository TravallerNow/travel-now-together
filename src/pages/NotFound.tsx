
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="text-center max-w-md px-4">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <MapPin className="h-24 w-24 text-muted-foreground animate-bounce" />
            <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              ?
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-xl text-muted-foreground mb-6">
          Oops! It seems you've wandered off the travel path.
        </p>
        
        <p className="text-muted-foreground mb-8">
          The destination you're looking for doesn't exist or has been moved to a new location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/explore">
              Explore Travelers
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
