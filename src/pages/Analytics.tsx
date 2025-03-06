
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Filter, Info } from "lucide-react";
import { format } from "date-fns";
import PincodeFilter from "@/components/analytics/PincodeFilter";
import AutosList from "@/components/analytics/AutosList";
import StatsCards from "@/components/analytics/StatsCards";
import InfoPopover from "@/components/analytics/InfoPopover";
import { mockAnalyticsData } from "@/data/mockData";

export interface Auto {
  id: string;
  driverName: string;
  driverPhone: string;
  pincode: string;
  cpm: number;
  status: "active" | "inactive";
  lastActive: string;
}

const Analytics = () => {
  const { toast } = useToast();
  const [autos, setAutos] = useState<Auto[]>([]);
  const [filteredAutos, setFilteredAutos] = useState<Auto[]>([]);
  const [selectedPincode, setSelectedPincode] = useState<string | null>(null);
  const [availablePincodes, setAvailablePincodes] = useState<string[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data (mock implementation)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = mockAnalyticsData;
      setAutos(data);
      
      // Extract unique pincodes
      const pincodes = [...new Set(data.map(auto => auto.pincode))];
      setAvailablePincodes(pincodes);
      
      // Update filtered autos based on selected pincode
      if (selectedPincode) {
        setFilteredAutos(data.filter(auto => auto.pincode === selectedPincode));
      } else {
        setFilteredAutos(data);
      }
      
      setLastRefreshed(new Date());
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated.",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pincode selection
  const handlePincodeSelect = (pincode: string | null) => {
    setSelectedPincode(pincode);
    if (pincode) {
      setFilteredAutos(autos.filter(auto => auto.pincode === pincode));
    } else {
      setFilteredAutos(autos);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate stats
  const totalAutos = autos.length;
  const activePincodes = [...new Set(autos.map(auto => auto.pincode))].length;
  const averageCpm = filteredAutos.length > 0 
    ? Math.round(filteredAutos.reduce((acc, auto) => acc + auto.cpm, 0) / filteredAutos.length) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">MY HOLDINGS</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Holdings as on {format(lastRefreshed, "MMMM d, yyyy, h:mm a")}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Button 
            variant="outline" 
            className="bg-blue-900 text-white hover:bg-blue-800 border-none min-w-24"
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <InfoPopover className="ml-2" />
        </div>
      </div>

      <StatsCards 
        totalAutos={totalAutos} 
        activePincodes={activePincodes} 
        averageCpm={averageCpm} 
        selectedPincode={selectedPincode}
      />

      <div className="mt-6">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center mb-4 sm:mb-0">
              <Filter className="mr-2 h-5 w-5 text-slate-500" />
              Filter by Pincode
            </h2>
            <PincodeFilter 
              pincodes={availablePincodes} 
              selectedPincode={selectedPincode}
              onSelectPincode={handlePincodeSelect}
            />
          </div>
          
          <AutosList autos={filteredAutos} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
