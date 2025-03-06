
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface InfoPopoverProps {
  className?: string;
}

const InfoPopover = ({ className }: InfoPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Info className="h-5 w-5" />
          <span className="sr-only">Info</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dashboard Help</h4>
          <p className="text-sm text-muted-foreground">
            This dashboard shows all your auto holdings with real-time metrics.
          </p>
          <div className="pt-2">
            <h5 className="text-sm font-medium mb-1">New Features:</h5>
            <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
              <li>Pincode filtering now available</li>
              <li>Export data feature coming soon</li>
              <li>Driver performance metrics in development</li>
            </ul>
          </div>
          <div className="pt-2">
            <h5 className="text-sm font-medium mb-1">Tips:</h5>
            <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
              <li>Use the refresh button to get the latest data</li>
              <li>Filter by pincode to focus on specific areas</li>
              <li>Click on auto IDs to see detailed history (coming soon)</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;
