
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// Traveler pins for demo purposes
const TRAVELERS = [
  { id: 1, lat: 28.6139, lng: 77.2090, name: "Alex", destination: "Delhi", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, lat: 19.0760, lng: 72.8777, name: "Taylor", destination: "Mumbai", img: "https://i.pravatar.cc/150?img=2" },
  { id: 3, lat: 12.9716, lng: 77.5946, name: "Jordan", destination: "Bangalore", img: "https://i.pravatar.cc/150?img=3" },
  { id: 4, lat: 22.5726, lng: 88.3639, name: "Morgan", destination: "Kolkata", img: "https://i.pravatar.cc/150?img=4" },
  { id: 5, lat: 17.3850, lng: 78.4867, name: "Casey", destination: "Hyderabad", img: "https://i.pravatar.cc/150?img=5" },
];

// This component displays a popup card for a selected traveler
const TravelerPopup = ({ traveler, onClose }: { traveler: any, onClose: () => void }) => {
  return (
    <Card className="w-72 absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 rounded-full w-6 h-6 bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300"
      >
        ✕
      </button>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <img src={traveler.img} alt={traveler.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-medium">{traveler.name}</h4>
            <p className="text-sm text-muted-foreground">Traveling to {traveler.destination}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="travel-button travel-button-primary px-3 py-1 text-xs rounded-full">
            Connect
          </button>
          <button className="travel-button bg-muted hover:bg-muted/80 px-3 py-1 text-xs rounded-full">
            View Profile
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

interface MapViewProps {
  travelMode?: boolean;
}

const MapView = ({ travelMode = false }: MapViewProps) => {
  const [selectedTraveler, setSelectedTraveler] = useState<any>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // Initialize map when component mounts
  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.getElementById('mapmyindia-script');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://apis.mapmyindia.com/advancedmaps/v1/caf55097051a59c0835c79d375cd9e45/map_load?v=1.5';
      script.id = 'mapmyindia-script';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = initializeMap;
      
      return () => {
        document.body.removeChild(script);
      };
    } else if (!mapInitialized) {
      initializeMap();
    }
  }, [mapInitialized]);

  // Update markers when travel mode changes
  useEffect(() => {
    if (map && mapInitialized) {
      // Clear existing markers
      markers.forEach(marker => marker.remove());
      setMarkers([]);
      
      // Add markers if in travel mode
      if (travelMode) {
        const newMarkers = TRAVELERS.map(traveler => {
          // @ts-ignore - MapmyIndia API doesn't have TypeScript definitions
          const marker = new window.MapmyIndia.Marker({
            map: map,
            position: {lat: traveler.lat, lng: traveler.lng},
            draggable: false,
            title: traveler.name
          });
          
          marker.addListener('click', () => {
            setSelectedTraveler(traveler);
          });
          
          return marker;
        });
        
        setMarkers(newMarkers);
      }
    }
  }, [map, travelMode, mapInitialized]);

  const initializeMap = () => {
    if (window.MapmyIndia && !mapInitialized) {
      // @ts-ignore - MapmyIndia API doesn't have TypeScript definitions
      const mapInstance = new window.MapmyIndia.Map('map-container', {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        zoomControl: true,
        hybrid: false
      });

      setMap(mapInstance);
      setMapInitialized(true);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <div 
        id="map-container" 
        style={{ width: '100%', height: '100%' }}
      />

      {!travelMode && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg max-w-xs">
          <h3 className="text-lg font-semibold mb-2">Enable "Travel Now" mode</h3>
          <p className="text-sm text-muted-foreground mb-4">Toggle "Travel Now" in the navbar to see nearby travelers and connect with them.</p>
        </div>
      )}
      
      {selectedTraveler && (
        <TravelerPopup 
          traveler={selectedTraveler} 
          onClose={() => setSelectedTraveler(null)} 
        />
      )}
    </div>
  );
};

export default MapView;
