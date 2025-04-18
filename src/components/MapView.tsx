
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// Traveler pins for demo purposes
const TRAVELERS = [
  { id: 1, lat: 37.7749, lng: -122.4194, name: "Alex", destination: "San Francisco", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, lat: 34.0522, lng: -118.2437, name: "Taylor", destination: "Los Angeles", img: "https://i.pravatar.cc/150?img=2" },
  { id: 3, lat: 51.5074, lng: -0.1278, name: "Jordan", destination: "London", img: "https://i.pravatar.cc/150?img=3" },
  { id: 4, lat: 48.8566, lng: 2.3522, name: "Morgan", destination: "Paris", img: "https://i.pravatar.cc/150?img=4" },
  { id: 5, lat: 35.6762, lng: 139.6503, name: "Casey", destination: "Tokyo", img: "https://i.pravatar.cc/150?img=5" },
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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedTraveler, setSelectedTraveler] = React.useState<any>(null);
  const [mapboxToken, setMapboxToken] = useState(() => {
    // Try to get token from localStorage if available
    return localStorage.getItem('mapbox_token') || '';
  });
  const [isTokenSet, setIsTokenSet] = useState(!!localStorage.getItem('mapbox_token'));
  const [isMapLoading, setIsMapLoading] = useState(false);
  
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    setIsMapLoading(true);
    
    try {
      // Clear previous map instance if it exists
      if (map.current) {
        map.current.remove();
      }
      
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 20],
        zoom: 1.5,
      });

      // Add controls
      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, 'top-right');

      // Load map
      map.current.on('load', () => {
        setIsMapLoading(false);
        
        // Add traveler markers
        if (travelMode) {
          TRAVELERS.forEach(traveler => {
            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'traveler-marker';
            el.style.backgroundImage = `url(${traveler.img})`;
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.borderRadius = '50%';
            el.style.border = '2px solid #0EA5E9';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.style.cursor = 'pointer';
            el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            
            // Add a pulsing animation for the active traveler marker
            el.style.animation = 'pulse-slow 2s infinite';
            
            // Add marker to map
            new mapboxgl.Marker(el)
              .setLngLat([traveler.lng, traveler.lat])
              .addTo(map.current!);
              
            // Add click listener
            el.addEventListener('click', () => {
              setSelectedTraveler(traveler);
            });
          });
        }
      });
      
      map.current.on('error', () => {
        setIsMapLoading(false);
        toast.error("Error loading map. Please check your Mapbox token.");
      });
      
    } catch (error) {
      console.error("Map initialization error:", error);
      setIsMapLoading(false);
      toast.error("Could not initialize map. Please check your Mapbox token.");
    }
  };
  
  const handleTokenSave = () => {
    if (!mapboxToken.trim()) {
      toast.error("Please enter a valid Mapbox token");
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('mapbox_token', mapboxToken);
    setIsTokenSet(true);
    
    // Initialize map
    initializeMap();
    toast.success("Mapbox token saved successfully!");
  };
  
  // Initialize map when component mounts (if token is available)
  useEffect(() => {
    if (isTokenSet) {
      initializeMap();
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [travelMode, isTokenSet]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {!isTokenSet ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10">
          <h3 className="text-lg font-semibold mb-4">Enter your Mapbox Access Token</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the map, you need to provide your Mapbox access token. 
            You can get one for free at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>.
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox token"
              className="flex-1"
            />
            <Button onClick={handleTokenSave}>Save</Button>
          </div>
        </div>
      ) : isMapLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-blue mx-auto mb-4"></div>
          <p>Loading map...</p>
        </div>
      ) : null}
      
      {!travelMode && isTokenSet && !isMapLoading && (
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
