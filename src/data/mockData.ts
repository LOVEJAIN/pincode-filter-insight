
import { Auto } from "@/pages/Analytics";

// Define the item types that autos can carry
export type ItemType = "Groceries" | "Medicines" | "Food" | "Electronics" | "Clothing";

// Enhanced Auto interface with location data and item type
export interface EnhancedAuto extends Auto {
  location: {
    lat: number;
    lng: number;
  };
  itemType: ItemType;
  clientId?: string; // Only for admin view
}

export const mockAnalyticsData: EnhancedAuto[] = [
  {
    id: "A-1001",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 9876543210",
    pincode: "110001",
    cpm: 125,
    status: "active",
    lastActive: "2023-05-10T08:30:00Z",
    location: { lat: 28.704060, lng: 77.102493 },
    itemType: "Groceries"
  },
  {
    id: "A-1002",
    driverName: "Sunil Verma",
    driverPhone: "+91 9876543211",
    pincode: "110001",
    cpm: 118,
    status: "active",
    lastActive: "2023-05-10T09:15:00Z",
    location: { lat: 28.714060, lng: 77.112493 },
    itemType: "Medicines",
    clientId: "CL-101"
  },
  {
    id: "A-1003",
    driverName: "Amit Singh",
    driverPhone: "+91 9876543212",
    pincode: "110002",
    cpm: 132,
    status: "active",
    lastActive: "2023-05-10T07:45:00Z",
    location: { lat: 28.694060, lng: 77.092493 },
    itemType: "Food",
    clientId: "CL-102"
  },
  {
    id: "A-1004",
    driverName: "Pradeep Sharma",
    driverPhone: "+91 9876543213",
    pincode: "110002",
    cpm: 105,
    status: "inactive",
    lastActive: "2023-05-09T18:20:00Z",
    location: { lat: 28.684060, lng: 77.082493 },
    itemType: "Electronics",
    clientId: "CL-101"
  },
  {
    id: "A-1005",
    driverName: "Vijay Mehta",
    driverPhone: "+91 9876543214",
    pincode: "110003",
    cpm: 143,
    status: "active",
    lastActive: "2023-05-10T10:05:00Z",
    location: { lat: 28.724060, lng: 77.122493 },
    itemType: "Clothing",
    clientId: "CL-103"
  },
  {
    id: "A-1006",
    driverName: "Santosh Patil",
    driverPhone: "+91 9876543215",
    pincode: "110003",
    cpm: 127,
    status: "active",
    lastActive: "2023-05-10T08:50:00Z",
    location: { lat: 28.734060, lng: 77.132493 },
    itemType: "Groceries",
    clientId: "CL-102"
  },
  {
    id: "A-1007",
    driverName: "Rakesh Gupta",
    driverPhone: "+91 9876543216",
    pincode: "110004",
    cpm: 115,
    status: "inactive",
    lastActive: "2023-05-09T15:30:00Z",
    location: { lat: 28.744060, lng: 77.142493 },
    itemType: "Medicines",
    clientId: "CL-103"
  },
  {
    id: "A-1008",
    driverName: "Dinesh Yadav",
    driverPhone: "+91 9876543217",
    pincode: "110004",
    cpm: 138,
    status: "active",
    lastActive: "2023-05-10T09:40:00Z",
    location: { lat: 28.754060, lng: 77.152493 },
    itemType: "Food",
    clientId: "CL-101"
  },
  {
    id: "A-1009",
    driverName: "Manoj Tiwari",
    driverPhone: "+91 9876543218",
    pincode: "110005",
    cpm: 130,
    status: "active",
    lastActive: "2023-05-10T08:15:00Z",
    location: { lat: 28.764060, lng: 77.162493 },
    itemType: "Electronics",
    clientId: "CL-102"
  },
  {
    id: "A-1010",
    driverName: "Rahul Mishra",
    driverPhone: "+91 9876543219",
    pincode: "110005",
    cpm: 122,
    status: "active",
    lastActive: "2023-05-10T10:20:00Z",
    location: { lat: 28.774060, lng: 77.172493 },
    itemType: "Clothing",
    clientId: "CL-103"
  }
];

// Add client data for admin view
export const clientData = [
  { id: "CL-101", name: "FastDeliveries Ltd" },
  { id: "CL-102", name: "Urban Logistics" },
  { id: "CL-103", name: "Metro Carriers" }
];
