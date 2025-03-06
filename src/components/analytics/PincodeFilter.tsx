
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PincodeFilterProps {
  pincodes: string[];
  selectedPincode: string | null;
  onSelectPincode: (pincode: string | null) => void;
}

const PincodeFilter = ({ pincodes, selectedPincode, onSelectPincode }: PincodeFilterProps) => {
  const handleValueChange = (value: string) => {
    if (value === "all") {
      onSelectPincode(null);
    } else {
      onSelectPincode(value);
    }
  };

  return (
    <div className="w-full sm:w-64">
      <Select
        value={selectedPincode || "all"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by pincode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Pincodes</SelectItem>
          {pincodes.map((pincode) => (
            <SelectItem key={pincode} value={pincode}>
              {pincode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PincodeFilter;
