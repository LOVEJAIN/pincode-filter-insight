
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, User, Phone, MapPin, Activity } from "lucide-react";
import type { Auto } from "@/pages/Analytics";

interface AutosListProps {
  autos: Auto[];
  isLoading: boolean;
}

const AutosList = ({ autos, isLoading }: AutosListProps) => {
  if (isLoading) {
    return (
      <div className="mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton className="h-12 w-full mb-2" />
          </div>
        ))}
      </div>
    );
  }

  if (autos.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500">
        No autos found for the selected filter.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-white dark:bg-slate-800">
          <TableRow>
            <TableHead className="w-[100px]"><div className="flex items-center"><Car className="mr-2 h-4 w-4" /> Auto ID</div></TableHead>
            <TableHead><div className="flex items-center"><User className="mr-2 h-4 w-4" /> Driver Name</div></TableHead>
            <TableHead><div className="flex items-center"><Phone className="mr-2 h-4 w-4" /> Contact</div></TableHead>
            <TableHead><div className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Pincode</div></TableHead>
            <TableHead><div className="flex items-center"><Activity className="mr-2 h-4 w-4" /> CPM</div></TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {autos.map((auto) => (
            <TableRow key={auto.id}>
              <TableCell className="font-medium">{auto.id}</TableCell>
              <TableCell>{auto.driverName}</TableCell>
              <TableCell>{auto.driverPhone}</TableCell>
              <TableCell>{auto.pincode}</TableCell>
              <TableCell>{auto.cpm}</TableCell>
              <TableCell>
                <Badge 
                  variant={auto.status === "active" ? "success" : "secondary"}
                  className={auto.status === "active" ? "bg-green-500" : "bg-slate-400"}
                >
                  {auto.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default AutosList;
