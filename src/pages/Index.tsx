
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">Welcome to Auto Analytics</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Track and manage your auto fleet with real-time analytics.</p>
        
        <Link to="/analytics">
          <Button size="lg" className="bg-blue-900 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700 text-white">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Analytics
          </Button>
        </Link>
      </div>
      
      <div className="mt-16 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Track Fleet</h3>
            <p className="text-slate-500 dark:text-slate-400">Monitor all your autos in real-time across different pincodes.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Filter by Location</h3>
            <p className="text-slate-500 dark:text-slate-400">Use pincode filters to focus on specific service areas.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
            <p className="text-slate-500 dark:text-slate-400">View CPM and other important metrics for your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
