
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, PlusCircle, MapPin, Calendar, Globe, ArrowRight } from "lucide-react";
import { trips, destinations } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

const Trips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleJoinTrip = (id: number) => {
    toast.success("Trip request sent!", {
      description: "The organizer will review your request.",
    });
  };
  
  const handleCreateTrip = () => {
    toast.success("Coming Soon!", {
      description: "The trip creation feature will be available soon.",
    });
  };

  // Filter trips by search query
  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.activities.some(activity => 
      activity.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 bg-muted/30">
          <div className="travel-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Discover Trips</h1>
                <p className="text-muted-foreground">
                  Join exciting trips with fellow travelers or create your own adventure.
                </p>
              </div>
              
              <Button onClick={handleCreateTrip} className="bg-travel-indigo hover:bg-travel-indigo/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Trip
              </Button>
            </div>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="pt-8 pb-4">
          <div className="travel-container">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by destination, activity, or trip name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trip duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All durations</SelectItem>
                  <SelectItem value="weekend">Weekend trip</SelectItem>
                  <SelectItem value="short">Short (4-7 days)</SelectItem>
                  <SelectItem value="medium">Medium (1-2 weeks)</SelectItem>
                  <SelectItem value="long">Long trip (2+ weeks)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="date-asc">Date: Soonest</SelectItem>
                  <SelectItem value="popularity">Most popular</SelectItem>
                  <SelectItem value="travelers">Most travelers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        
        {/* Trip Categories */}
        <section className="py-4">
          <div className="travel-container">
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Trips</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="weekend">Weekend Getaways</TabsTrigger>
                <TabsTrigger value="adventure">Adventure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => (
                      <TripCard
                        key={trip.id}
                        trip={trip}
                        onJoin={handleJoinTrip}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No trips found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or create a new trip.
                      </p>
                      <Button onClick={handleCreateTrip} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Trip
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.slice(0, 3).map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onJoin={handleJoinTrip}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.slice(1, 4).map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onJoin={handleJoinTrip}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weekend" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.slice(2, 4).map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onJoin={handleJoinTrip}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="adventure" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.slice(0, 2).map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onJoin={handleJoinTrip}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Top Destinations */}
        <section className="py-12 bg-muted/30">
          <div className="travel-container">
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Top Destinations</h2>
                <Button variant="link" className="flex items-center gap-1">
                  View all destinations
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destinations.slice(0, 6).map((destination) => (
                  <div 
                    key={destination.id}
                    className="group rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/80 text-foreground hover:bg-white/90 backdrop-blur-sm">
                          {destination.travellersCount} travelers
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{destination.name}</h3>
                        <span className="text-sm text-muted-foreground">{destination.country}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-3.5 w-3.5 text-travel-blue" />
                        <span className="text-xs text-muted-foreground truncate">
                          {destination.description.substring(0, 40)}...
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-travel-gradient text-white">
          <div className="travel-container text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 animate-float" />
            <h2 className="text-3xl font-bold mb-4">Start Your Next Adventure</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Create your own trip itinerary or join an existing one. Connect with like-minded travelers and explore the world together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-travel-purple hover:bg-white/90"
                onClick={handleCreateTrip}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a Trip
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Browse Destinations
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trips;
