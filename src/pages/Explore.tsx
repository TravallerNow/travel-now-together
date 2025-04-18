
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TravellerCard from "@/components/TravellerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchIcon, MapPin, Filter } from "lucide-react";
import { travellers } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  
  const handleConnectTraveller = (id: number) => {
    toast.success("Connection request sent!", {
      description: "We'll notify you when they respond.",
    });
  };
  
  // Filter travellers by search query
  const filteredTravellers = travellers.filter(traveller => 
    traveller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    traveller.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    traveller.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    traveller.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-8">
          <div className="travel-container">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Explore Travelers</h1>
                <p className="text-muted-foreground">
                  Find travelers who share your interests and are ready to explore together.
                </p>
              </div>
              
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location, interests, or destination..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="date-asc">Date: Soonest</SelectItem>
                    <SelectItem value="date-desc">Date: Latest</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filter Panel */}
              {filterOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-background">
                  <div className="space-y-4">
                    <h3 className="font-medium">Travel Style</h3>
                    <div className="space-y-2">
                      {["Adventure", "Cultural", "Relaxation", "Budget", "Luxury"].map((style) => (
                        <div key={style} className="flex items-center space-x-2">
                          <Checkbox id={`style-${style}`} />
                          <Label htmlFor={`style-${style}`}>{style}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Interests</h3>
                    <div className="space-y-2">
                      {["Photography", "Food", "Hiking", "Nightlife", "Museums", "Beach", "Shopping"].map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox id={`interest-${interest}`} />
                          <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Age Range</h3>
                      <Slider defaultValue={[20, 40]} min={18} max={65} step={1} />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">18</span>
                        <span className="text-sm text-muted-foreground">65+</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Trip Duration</h3>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Any duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any duration</SelectItem>
                          <SelectItem value="weekend">Weekend (1-3 days)</SelectItem>
                          <SelectItem value="short">Short trip (4-7 days)</SelectItem>
                          <SelectItem value="medium">Medium (1-2 weeks)</SelectItem>
                          <SelectItem value="long">Long trip (2+ weeks)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setFilterOpen(false)}>Cancel</Button>
                      <Button onClick={() => setFilterOpen(false)}>Apply Filters</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {filteredTravellers.length > 0 ? (
                  filteredTravellers.map((traveller) => (
                    <TravellerCard
                      key={traveller.id}
                      traveller={traveller}
                      onConnect={handleConnectTraveller}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No travelers found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search for a different location.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="travel-container">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does "Travel Now" mode work?</AccordionTrigger>
                <AccordionContent>
                  When you enable "Travel Now" mode, you become visible to other travelers in the area 
                  who are also looking for travel companions. This feature uses your location to match 
                  you with people nearby who share similar interests and travel destinations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my personal information safe?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take privacy very seriously. Your exact location is never shared with other users,
                  only your general area. You can control what information is visible on your profile, 
                  and you can disable "Travel Now" mode at any time.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I connect with other travelers?</AccordionTrigger>
                <AccordionContent>
                  You can send a connection request to any traveler whose profile interests you. If they 
                  accept, you'll be able to message each other through our secure in-app messaging system 
                  to coordinate your travel plans.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I join trips that are already planned?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Browse the "Trips" section to find planned adventures that you can join. 
                  You'll need to send a request to the trip organizer, who will review your profile 
                  and accept or decline your request to join.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What safety measures does the app provide?</AccordionTrigger>
                <AccordionContent>
                  We verify all user accounts through multiple methods, allow users to rate and review 
                  each other after traveling together, provide an emergency contact feature, and offer 
                  a 24/7 support line for any issues that may arise during your travels.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
