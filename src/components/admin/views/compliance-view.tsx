import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function ComplianceView({ ctx }: { ctx: AdminViewContext }) {
  const { complianceStatus, setComplianceStatus, complianceRegion, setComplianceRegion, complianceRows, d, complianceClass, complianceCounts } = ctx;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Compliance Deadline Queue</CardTitle>
          <CardDescription>Track all client compliance due dates and escalation owners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Select value={complianceStatus} onValueChange={(v) => setComplianceStatus(v as any)}>
                <SelectTrigger><SelectValue placeholder="Risk level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All risk levels</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="due_7d">Due in 7d</SelectItem>
                  <SelectItem value="due_21d">Due in 21d</SelectItem>
                  <SelectItem value="on_track">On track</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-6">
              <Select value={complianceRegion} onValueChange={(v) => setComplianceRegion(v as any)}>
                <SelectTrigger><SelectValue placeholder="Region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="UAE">UAE</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Netherlands">Netherlands</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Escalation Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceRows.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.companyName}</p></TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.servicePlan}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d(row.complianceDueAt)}</TableCell>
                  <TableCell className={cn("font-medium", row.dueInDays < 0 ? "text-red-600" : "text-gray-700")}>{row.dueInDays < 0 ? `${Math.abs(row.dueInDays)} days overdue` : `${row.dueInDays} days`}</TableCell>
                  <TableCell><Badge className={cn("border capitalize", complianceClass[row.health])}>{row.health.replace("_", " ")}</Badge></TableCell>
                  <TableCell>{row.escalationOwner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Compliance Snapshot</CardTitle>
          <CardDescription>Risk distribution for current filter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded border border-red-100 bg-red-50 p-3"><p className="text-xs text-red-700">Overdue</p><p className="text-xl font-semibold text-red-700">{complianceCounts.overdue}</p></div>
          <div className="rounded border border-amber-100 bg-amber-50 p-3"><p className="text-xs text-amber-700">Due in 7 days</p><p className="text-xl font-semibold text-amber-700">{complianceCounts.due_7d}</p></div>
          <div className="rounded border border-yellow-100 bg-yellow-50 p-3"><p className="text-xs text-yellow-700">Due in 21 days</p><p className="text-xl font-semibold text-yellow-700">{complianceCounts.due_21d}</p></div>
          <div className="rounded border border-emerald-100 bg-emerald-50 p-3"><p className="text-xs text-emerald-700">On track</p><p className="text-xl font-semibold text-emerald-700">{complianceCounts.on_track}</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
