
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';

// Note: In a real app, you would need to get your own Mapbox API key
// For now, we'll use a placeholder that will show a development map
// The user would need to replace this with their own API key
const MAPBOX_TOKEN = "pk.placeholder-token-replace-with-your-own";

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
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
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

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [travelMode]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <div ref={mapContainer} className="absolute inset-0" />
      
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
