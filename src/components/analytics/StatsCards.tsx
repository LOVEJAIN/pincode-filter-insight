
import { Car, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalAutos: number;
  activeAutos: number;
  averageCpm: number;
  selectedPincode?: string | null;
}

const StatsCards = ({ totalAutos, activeAutos, averageCpm, selectedPincode }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Autos</p>
              <h3 className="text-3xl font-bold">{activeAutos}</h3>
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
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {selectedPincode ? `CPM (${selectedPincode})` : "Average CPM"}
              </p>
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

export default StatsCards;
