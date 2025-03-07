
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import AutoMarker from './AutoMarker';
import { EnhancedAuto } from '@/data/mockData';
import { Card } from '@/components/ui/card';

// Temporary public token - in a real app you would use environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xwaTV4cGY3MG5nMjJrcGIybW1hc2EyaiJ9.Rvj3f1RxRbXxzGH7nj_6kA';

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

  // Filter autos by pincode if selected
  const filteredAutos = selectedPincode 
    ? autos.filter(auto => auto.pincode === selectedPincode)
    : autos;

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.12, 28.74], // Default to Delhi area
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
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
    </Card>
  );
};

export default MapView;
