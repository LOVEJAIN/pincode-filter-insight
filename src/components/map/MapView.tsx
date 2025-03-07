
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import AutoMarker from './AutoMarker';
import { EnhancedAuto } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// We'll let users add their own token
let mapboxToken = '';

interface MapViewProps {
  autos: EnhancedAuto[];
  isAdmin?: boolean;
  selectedPincode?: string;
}

const MapView: React.FC<MapViewProps> = ({ autos, isAdmin = false, selectedPincode }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [token, setToken] = useState(mapboxToken);
  const [tokenInput, setTokenInput] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Filter autos by pincode if selected
  const filteredAutos = selectedPincode 
    ? autos.filter(auto => auto.pincode === selectedPincode)
    : autos;

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;
    
    // Set the access token
    mapboxgl.accessToken = token;
    mapboxToken = token;

    // Check if map is already initialized
    if (map.current) {
      map.current.remove();
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [77.12, 28.74], // Default to Delhi area
        zoom: 11,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
        setIsMapInitialized(true);
        toast({
          title: "Map loaded successfully",
          description: "Mapbox map has been initialized.",
        });
      });

      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        toast({
          title: "Map Error",
          description: "Invalid Mapbox token or connection issue",
          variant: "destructive",
        });
        setIsMapInitialized(false);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Initialization Error",
        description: "Could not initialize Mapbox map",
        variant: "destructive",
      });
      setIsMapInitialized(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  };

  // Initialize map when token is set
  useEffect(() => {
    if (token) {
      initializeMap();
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [token]);

  // Handle markers when map is loaded or autos change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for each auto
    filteredAutos.forEach(auto => {
      if (!map.current) return;

      // Create a DOM element for the marker
      const markerElement = document.createElement('div');
      const root = createRoot(markerElement);
      root.render(<AutoMarker auto={auto} isAdmin={isAdmin} />);

      // Create and add the marker
      const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat([auto.location.lng, auto.location.lat])
        .addTo(map.current);

      markersRef.current[auto.id] = marker;
    });

    // Fit map to markers if there are any
    if (filteredAutos.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      filteredAutos.forEach(auto => {
        bounds.extend([auto.location.lng, auto.location.lat]);
      });

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [mapLoaded, filteredAutos, isAdmin]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setToken(tokenInput.trim());
    }
  };

  // Legend for item types
  const itemTypes = ['Groceries', 'Medicines', 'Food', 'Electronics', 'Clothing'];
  const itemTypeColors = {
    'Groceries': 'bg-green-500',
    'Medicines': 'bg-red-500',
    'Food': 'bg-yellow-500',
    'Electronics': 'bg-blue-500',
    'Clothing': 'bg-purple-500'
  };

  return (
    <Card className="relative h-[500px] w-full overflow-hidden">
      {!token && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/95 p-4">
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
              <p className="text-sm text-muted-foreground">
                Please enter your Mapbox public token to view the map. You can get one from
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                  Mapbox.com
                </a>
              </p>
            </div>
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Load Map
            </Button>
          </form>
        </div>
      )}
      
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
      {isMapInitialized && (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md z-10">
          <div className="text-xs font-semibold mb-1">Item Types:</div>
          <div className="grid gap-1">
            {itemTypes.map(type => (
              <div key={type} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${itemTypeColors[type as keyof typeof itemTypeColors]}`}></div>
                <span className="text-xs">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default MapView;
