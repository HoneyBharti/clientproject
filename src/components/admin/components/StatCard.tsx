import { ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export function StatCard({ label, value, icon: Icon, tone, change, changeType }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 sm:text-sm font-medium">{label}</p>
            <p className="text-xl font-bold sm:text-2xl">{value}</p>
            {change && (
              <div className={cn("flex items-center text-xs mt-1", 
                changeType === 'increase' ? "text-green-600" : "text-red-600"
              )}>
                {changeType === 'increase' ? 
                  <ChevronUp className="h-3 w-3 mr-1" /> : 
                  <ChevronDown className="h-3 w-3 mr-1" />
                }
                {change}% vs last month
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", tone.replace("text-", "bg-").replace("-600", "-100"))}>
            <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", tone)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}