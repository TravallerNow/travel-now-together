
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface TripCardProps {
  trip: {
    id: number;
    title: string;
    destination: string;
    image: string;
    startDate: string;
    duration: string;
    travellers: {
      count: number;
      images: string[];
    };
    activities: string[];
  };
  onJoin?: (id: number) => void;
}

const TripCard = ({ trip, onJoin }: TripCardProps) => {
  const handleJoin = () => {
    if (onJoin) {
      onJoin(trip.id);
    }
  };

  return (
    <Card className="overflow-hidden travel-card h-full flex flex-col">
      <div className="relative">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trip.destination}</span>
        </div>
        
        <div className="text-sm space-y-1 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-travel-blue" />
            <span>{trip.startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-travel-green" />
            <span>{trip.duration}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase font-medium text-muted-foreground mb-1.5">Activities</h4>
          <div className="flex flex-wrap gap-1.5">
            {trip.activities.map((activity, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {activity}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {trip.travellers.images.slice(0, 3).map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt="Traveller" 
                  className="w-7 h-7 rounded-full border-2 border-background object-cover"
                />
              ))}
              {trip.travellers.count > 3 && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  +{trip.travellers.count - 3}
                </div>
              )}
            </div>
            <span className="text-xs ml-2 text-muted-foreground">
              <Users className="h-3 w-3 inline mr-0.5" /> 
              {trip.travellers.count} travelers
            </span>
          </div>
          
          <Button
            onClick={handleJoin}
            className="bg-travel-indigo hover:bg-travel-indigo/80"
            size="sm"
          >
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
