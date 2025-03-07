
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EnhancedAuto, clientData } from '@/data/mockData';

const itemTypeColors = {
  'Groceries': 'bg-green-500',
  'Medicines': 'bg-red-500',
  'Food': 'bg-yellow-500',
  'Electronics': 'bg-blue-500',
  'Clothing': 'bg-purple-500'
};

interface AutoMarkerProps {
  auto: EnhancedAuto;
  isAdmin?: boolean;
}

const AutoMarker: React.FC<AutoMarkerProps> = ({ auto, isAdmin }) => {
  const getClientName = (clientId?: string) => {
    if (!clientId) return 'Unknown Client';
    const client = clientData.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className={`w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer flex items-center justify-center ${itemTypeColors[auto.itemType] || 'bg-gray-500'}`}
          aria-label={`Auto ${auto.id}`}
          title={`Auto ${auto.id} - ${auto.itemType}`}
        >
          <span className="text-xs font-bold text-white">{auto.id.split('-')[1]}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">Auto {auto.id}</h3>
            <span className={`px-2 py-1 rounded text-xs text-white ${auto.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
              {auto.status.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div><span className="font-semibold">Driver:</span> {auto.driverName}</div>
            <div><span className="font-semibold">Contact:</span> {auto.driverPhone}</div>
            <div><span className="font-semibold">Pincode:</span> {auto.pincode}</div>
            <div><span className="font-semibold">CPM:</span> ₹{auto.cpm}</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Carrying:</span> 
              <span className={`px-2 py-1 rounded text-xs text-white ${itemTypeColors[auto.itemType] || 'bg-gray-500'}`}>
                {auto.itemType}
              </span>
            </div>
            {isAdmin && auto.clientId && (
              <div><span className="font-semibold">Client:</span> {getClientName(auto.clientId)}</div>
            )}
            <div><span className="font-semibold">Location:</span> {auto.location.lat.toFixed(6)}, {auto.location.lng.toFixed(6)}</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AutoMarker;
