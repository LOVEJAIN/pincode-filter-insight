
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Shield } from "lucide-react";
import { format } from "date-fns";
import AutosList from "@/components/analytics/AutosList";
import AdminStatsCards from "@/components/analytics/AdminStatsCards";
import InfoPopover from "@/components/analytics/InfoPopover";
import { mockAnalyticsData } from "@/data/mockData";
import { Auto } from "@/pages/Analytics";

const AdminAnalytics = () => {
  const { toast } = useToast();
  const [autos, setAutos] = useState<Auto[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all auto data for admin (no filtering)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an admin-specific API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = mockAnalyticsData;
      setAutos(data);
      
      setLastRefreshed(new Date());
      toast({
        title: "Data refreshed",
        description: "Admin analytics data has been updated.",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch admin analytics data.",
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

  // Calculate admin stats
  const totalAutos = autos.length;
  const totalActivePincodes = [...new Set(autos.map(auto => auto.pincode))].length;
  const totalActiveAutos = autos.filter(auto => auto.status === "active").length;
  const averageCpm = autos.length > 0 
    ? Math.round(autos.reduce((acc, auto) => acc + auto.cpm, 0) / autos.length) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <div className="flex items-center">
            <Shield className="h-7 w-7 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">ADMIN DASHBOARD</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            All autos data as on {format(lastRefreshed, "MMMM d, yyyy, h:mm a")}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Button 
            variant="outline" 
            className="bg-red-700 text-white hover:bg-red-600 border-none min-w-24"
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <InfoPopover className="ml-2" />
        </div>
      </div>

      <AdminStatsCards 
        totalAutos={totalAutos} 
        totalActivePincodes={totalActivePincodes}
        totalActiveAutos={totalActiveAutos}
        averageCpm={averageCpm} 
      />

      <div className="mt-6">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center mb-4 sm:mb-0">
              <Database className="mr-2 h-5 w-5 text-slate-500" />
              All Autos Database
            </h2>
          </div>
          
          <AutosList autos={autos} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
