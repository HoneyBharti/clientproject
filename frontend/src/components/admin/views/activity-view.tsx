"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { activityLogsAPI } from "@/lib/admin-api";
import type { AdminViewContext } from "./types";

export function ActivityView({ ctx }: { ctx: AdminViewContext }) {
  const { activityQ, setActivityQ, dt } = ctx;
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await activityLogsAPI.getAll({ limit: 100 });
      setLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || "Failed to load activity logs");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(
    () =>
      logs.filter((log) =>
        [log.action, log.user?.name || "System", log.entity]
          .join(" ")
          .toLowerCase()
          .includes(activityQ.toLowerCase())
      ),
    [logs, activityQ]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>Track all admin and user actions</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadLogs}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search logs..."
            value={activityQ}
            onChange={(e) => setActivityQ(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading activity logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {activityQ ? "No logs match your search" : "No activity logs yet"}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log: any) => (
                <TableRow key={log._id}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="capitalize">{log.entity}</TableCell>
                  <TableCell>{log.user?.name || "System"}</TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {log.ipAddress || "N/A"}
                  </TableCell>
                  <TableCell>{dt(log.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="text-xs text-gray-500 text-right">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
      </CardContent>
    </Card>
  );
}
