import { Users, FileCheck2, AlertTriangle, Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityFeed() {
  const activities = [
    {
      type: 'success',
      icon: Users,
      title: 'New client onboarded',
      description: 'Elena Vasquez - Acme Innovations LLC',
      time: '2 hours ago',
      color: 'green'
    },
    {
      type: 'info',
      icon: FileCheck2,
      title: 'Document verified',
      description: 'Certificate of Formation - FluxPay Pte Ltd',
      time: '4 hours ago',
      color: 'blue'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'QuickBooks sync issue',
      description: 'DesertGrid FZ LLC - Token expired',
      time: '6 hours ago',
      color: 'amber'
    },
    {
      type: 'info',
      icon: Newspaper,
      title: 'Content published',
      description: 'UAE Corporate Tax Filing Timeline',
      time: '1 day ago',
      color: 'purple'
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; iconBg: string }> = {
    green: { border: 'border-green-500', bg: 'bg-green-50', iconBg: 'bg-green-500' },
    blue: { border: 'border-blue-500', bg: 'bg-blue-50', iconBg: 'bg-blue-500' },
    amber: { border: 'border-amber-500', bg: 'bg-amber-50', iconBg: 'bg-amber-500' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-50', iconBg: 'bg-purple-500' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity Feed</CardTitle>
        <CardDescription>Latest system events and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const colors = colorMap[activity.color];
            return (
              <div 
                key={index}
                className={`flex items-start gap-3 rounded-lg border-l-4 ${colors.border} ${colors.bg} p-3`}
              >
                <div className={`rounded-full ${colors.iconBg} p-1`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}