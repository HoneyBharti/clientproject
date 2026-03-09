import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function OverviewView({ ctx }: { ctx: AdminViewContext }) {
  const {
    monthlyRevenueData,
    ordersByCountryData,
    userGrowthData,
    filteredOrders,
    pendingRequestItems,
    orderStatusClass,
    recentSignupUsers,
    activityLogs,
    d,
    dt,
  } = ctx;

  const visiblePendingRequests =
    pendingRequestItems?.length
      ? pendingRequestItems
      : filteredOrders
          .filter((order: any) => order.status === "pending" || order.status === "waiting_documents")
          .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Per Country</CardTitle>
            <CardDescription>Current request distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ordersByCountryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user growth trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Orders waiting action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {visiblePendingRequests.map((order: any) => (
                <div key={order.id} className="rounded border p-2 text-sm">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">{order.serviceType}</p>
                  <Badge className={cn("mt-2 border capitalize", orderStatusClass[order.status])}>
                    {order.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest user activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSignupUsers.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between rounded border p-2">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">{d(user.createdAt || user.lastActivityAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Admin actions log</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityLogs.slice(0, 6).map((log: any) => (
              <div key={log.id} className="rounded border p-2 text-sm">
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-muted-foreground">
                  {log.actor} - {dt(log.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
