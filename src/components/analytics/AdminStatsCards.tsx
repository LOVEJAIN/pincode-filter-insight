
import { Car, MapPin, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminStatsCardsProps {
  totalAutos: number;
  totalActivePincodes: number;
  totalActiveAutos: number;
  averageCpm: number;
}

const AdminStatsCards = ({ 
  totalAutos, 
  totalActivePincodes, 
  totalActiveAutos, 
  averageCpm 
}: AdminStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Autos</p>
              <h3 className="text-3xl font-bold">{totalAutos}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <Car className="h-6 w-6 text-blue-800 dark:text-blue-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Pincodes</p>
              <h3 className="text-3xl font-bold">{totalActivePincodes}</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full dark:bg-emerald-900">
              <MapPin className="h-6 w-6 text-emerald-800 dark:text-emerald-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Autos</p>
              <h3 className="text-3xl font-bold">{totalActiveAutos}</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
              <Activity className="h-6 w-6 text-amber-800 dark:text-amber-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Average CPM</p>
              <h3 className="text-3xl font-bold">{averageCpm}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
              <TrendingUp className="h-6 w-6 text-purple-800 dark:text-purple-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatsCards;
