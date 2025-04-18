
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import TravellerCard from "@/components/TravellerCard";
import TripCard from "@/components/TripCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Compass, SearchIcon } from "lucide-react";
import { travellers, trips, destinations } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [travelNowMode, setTravelNowMode] = useState(false);
  const [activeTab, setActiveTab] = useState("map");
  
  const handleToggleTravelMode = () => {
    setTravelNowMode(!travelNowMode);
    toast.success(
      travelNowMode ? "Travel Now mode disabled" : "Travel Now mode activated! You're now visible to other travelers.", 
      {
        description: travelNowMode 
          ? "You are no longer visible to other travelers." 
          : "You can now see other travelers who are ready to explore.",
      }
    );
  };
  
  const handleConnectTraveller = (id: number) => {
    toast.success("Connection request sent!", {
      description: "We'll notify you when they respond.",
    });
  };
  
  const handleJoinTrip = (id: number) => {
    toast.success("Trip request sent!", {
      description: "The organizer will review your request.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/90 to-travel-purple/90 z-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-[-1]" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="travel-container relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Better Together</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Connect with fellow travelers who are ready to explore the world right now. Turn on "Travel Now" mode and find your next adventure companion.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleToggleTravelMode}
                  size="lg"
                  className={`text-white ${
                    travelNowMode 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  } border border-white/30`}
                >
                  {travelNowMode ? "Traveling Now" : "Travel Now Mode"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white"
                >
                  <Compass className="mr-2 h-4 w-4" />
                  Explore Trips
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Tabs */}
        <section className="py-8">
          <div className="travel-container">
            <Tabs defaultValue="map" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="map" className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    Map View
                  </TabsTrigger>
                  <TabsTrigger value="travelers" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    Travelers
                  </TabsTrigger>
                  <TabsTrigger value="trips" className="flex items-center gap-1.5">
                    <Compass className="h-4 w-4" />
                    Trips
                  </TabsTrigger>
                </TabsList>
                
                <div className="hidden md:block">
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <SearchIcon className="h-3.5 w-3.5" />
                    Search
                  </Button>
                </div>
              </div>
              
              <TabsContent value="map" className="mt-0">
                {/* Map View Tab */}
                <MapView travelMode={travelNowMode} />
              </TabsContent>
              
              <TabsContent value="travelers" className="mt-0">
                {/* Travelers Tab */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Travelers Ready to Explore</h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travellers.map((traveller) => (
                      <TravellerCard
                        key={traveller.id}
                        traveller={traveller}
                        onConnect={handleConnectTraveller}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trips" className="mt-0">
                {/* Trips Tab */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Join Upcoming Trips</h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                      <TripCard
                        key={trip.id}
                        trip={trip}
                        onJoin={handleJoinTrip}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-12 bg-muted/30">
          <div className="travel-container">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Popular Destinations</h2>
                <Button variant="outline" size="sm">
                  View All Destinations
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <div 
                    key={destination.id}
                    className="group relative h-64 rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1"
                  >
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white font-bold text-xl mb-1">{destination.name}</h3>
                      <p className="text-white/90 text-sm mb-2">{destination.country}</p>
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 text-white/80" />
                        <span className="ml-1.5 text-sm text-white/80">{destination.travellersCount} travelers now</span>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Travel Companion?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Turn on "Travel Now" mode to connect with fellow travelers who share your wanderlust and are ready to explore right now.
            </p>
            <Button 
              onClick={handleToggleTravelMode}
              size="lg" 
              className={`text-white ${
                travelNowMode 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
              } border border-white/30`}
            >
              {travelNowMode ? "Traveling Now" : "Travel Now Mode"}
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
