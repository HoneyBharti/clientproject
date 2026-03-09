import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QBBreakdown {
  connected: number;
  token_expired: number;
  sync_error: number;
  disconnected: number;
}

interface SystemHealthProps {
  qbPercentage: number;
  qbBreakdown: QBBreakdown;
}

export function SystemHealth({ qbPercentage, qbBreakdown }: SystemHealthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>QuickBooks integration status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Health</span>
            <span className="font-semibold text-green-600">{qbPercentage}%</span>
          </div>
          <Progress value={qbPercentage} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-2xl font-bold text-green-700">{qbBreakdown.connected}</p>
            <p className="text-xs text-green-600">Connected</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
            <p className="text-2xl font-bold text-amber-700">{qbBreakdown.token_expired}</p>
            <p className="text-xs text-amber-600">Expired</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
            <p className="text-2xl font-bold text-red-700">{qbBreakdown.sync_error}</p>
            <p className="text-xs text-red-600">Errors</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <p className="text-2xl font-bold text-gray-700">{qbBreakdown.disconnected}</p>
            <p className="text-xs text-gray-600">Offline</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}