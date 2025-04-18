
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Calendar, Users } from "lucide-react";

interface TravellerCardProps {
  traveller: {
    id: number;
    name: string;
    age: number;
    location: string;
    destination: string;
    dates: string;
    interests: string[];
    image: string;
    travelStyle: string;
  };
  onConnect?: (id: number) => void;
}

const TravellerCard = ({ traveller, onConnect }: TravellerCardProps) => {
  const handleConnect = () => {
    if (onConnect) {
      onConnect(traveller.id);
    }
  };

  return (
    <Card className="overflow-hidden travel-card h-full flex flex-col">
      <div className="relative">
        <img
          src={traveller.image}
          alt={traveller.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-travel-purple hover:bg-travel-purple">
            {traveller.travelStyle}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{traveller.name}, {traveller.age}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{traveller.location}</span>
        </div>
        
        <div className="text-sm mb-3">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="h-3.5 w-3.5 text-travel-blue" />
            <span>Traveling to <strong>{traveller.destination}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-travel-green" />
            <span>{traveller.dates}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase font-medium text-muted-foreground mb-1.5">Interests</h4>
          <div className="flex flex-wrap gap-1.5">
            {traveller.interests.map((interest, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-auto flex gap-2">
          <Button 
            onClick={handleConnect}
            className="flex-1 bg-travel-blue hover:bg-travel-blue/80" 
            size="sm"
          >
            <Users className="h-3.5 w-3.5 mr-1.5" /> 
            Connect
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="sr-only">Message</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravellerCard;
