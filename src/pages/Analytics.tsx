import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, BarChart3, Map } from "lucide-react";
import { format } from "date-fns";
import PincodeFilter from "@/components/analytics/PincodeFilter";
import AutosList from "@/components/analytics/AutosList";
import StatsCards from "@/components/analytics/StatsCards";
import InfoPopover from "@/components/analytics/InfoPopover";
import { mockAnalyticsData, EnhancedAuto } from "@/data/mockData";
import MapView from "@/components/map/MapView";

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
  const [autos, setAutos] = useState<EnhancedAuto[]>([]);
  const [filteredAutos, setFilteredAutos] = useState<EnhancedAuto[]>([]);
  const [selectedPincode, setSelectedPincode] = useState<string>("");
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Fetch data (mock implementation)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      const data = mockAnalyticsData;
      setAutos(data);
      
      // If no pincode filter is selected, show all autos
      if (!selectedPincode) {
        setFilteredAutos(data);
      } else {
        // Otherwise, filter by selected pincode
        setFilteredAutos(data.filter(auto => auto.pincode === selectedPincode));
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

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Handle pincode filter change
  const handlePincodeChange = (pincode: string) => {
    setSelectedPincode(pincode);
    
    if (!pincode) {
      setFilteredAutos(autos);
    } else {
      setFilteredAutos(autos.filter(auto => auto.pincode === pincode));
    }
  };

  // Calculate statistics
  const totalAutos = filteredAutos.length;
  const activeAutos = filteredAutos.filter(auto => auto.status === "active").length;
  const averageCpm = filteredAutos.length > 0
    ? Math.round(filteredAutos.reduce((acc, auto) => acc + auto.cpm, 0) / filteredAutos.length)
    : 0;

  // Get unique pincodes for the filter
  const uniquePincodes = [...new Set(autos.map(auto => auto.pincode))];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Auto Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Data as on {format(lastRefreshed, "MMMM d, yyyy, h:mm a")}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Button 
            variant="outline" 
            className="min-w-24"
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
        activeAutos={activeAutos} 
        averageCpm={averageCpm} 
        selectedPincode={selectedPincode}
      />

      <div className="mt-6">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">Autos Data</h2>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <PincodeFilter 
                pincodes={uniquePincodes}
                selectedPincode={selectedPincode}
                onChange={handlePincodeChange}
              />
              <Tabs defaultValue="list" className="w-48" onValueChange={(value) => setViewMode(value as "list" | "map")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="map">
                    <Map className="h-4 w-4 mr-2" />
                    Map
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {viewMode === "list" ? (
            <AutosList autos={filteredAutos} isLoading={isLoading} />
          ) : (
            <MapView autos={filteredAutos} selectedPincode={selectedPincode} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
