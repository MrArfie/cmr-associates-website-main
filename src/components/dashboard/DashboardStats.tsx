
import { ArrowDown, ArrowUp, Clock, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

const StatCard = ({ title, value, icon, change, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              {change.type === 'increase' ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={cn(
                "text-xs",
                change.type === 'increase' ? "text-green-500" : "text-red-500"
              )}>
                {change.value}
              </span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-full", colorClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in">
      <StatCard 
        title="Active Clients" 
        value="48" 
        icon={<Users className="h-5 w-5" />}
        change={{ value: "12%", type: "increase" }}
        color="blue"
      />
      <StatCard 
        title="Pending Tax Returns" 
        value="23" 
        icon={<FileText className="h-5 w-5" />}
        change={{ value: "5%", type: "decrease" }}
        color="orange"
      />
      <StatCard 
        title="Completed This Month" 
        value="19" 
        icon={<FileText className="h-5 w-5" />}
        change={{ value: "8%", type: "increase" }}
        color="green"
      />
      <StatCard 
        title="Upcoming Deadlines" 
        value="7" 
        icon={<Clock className="h-5 w-5" />}
        color="purple"
      />
    </div>
  );
};

export default DashboardStats;
