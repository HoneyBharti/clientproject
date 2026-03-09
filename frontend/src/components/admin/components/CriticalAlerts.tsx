import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CriticalAlertsProps {
  qbIssues: number;
  overdueCompliance: number;
  docsBacklog: number;
}

export function CriticalAlerts({ qbIssues, overdueCompliance, docsBacklog }: CriticalAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Critical Alerts
        </CardTitle>
        <CardDescription>Requires immediate attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-red-800">QB Sync Failures</span>
            <span className="text-lg font-bold text-red-700">{qbIssues}</span>
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-amber-800">Overdue Compliance</span>
            <span className="text-lg font-bold text-amber-700">{overdueCompliance}</span>
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-800">Pending Documents</span>
            <span className="text-lg font-bold text-blue-700">{docsBacklog}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}