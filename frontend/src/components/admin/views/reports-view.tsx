import { AlertTriangle, BarChart3, Briefcase, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import type { AdminViewContext } from "./types";

export function ReportsView({ ctx }: { ctx: AdminViewContext }) {
  const { StatCard, metrics, userGrowthData, revenueByCountry, servicePopularity, payments } = ctx;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Revenue Report" value={`$${metrics.totalRevenue.toLocaleString()}`} icon={DollarSign} tone="text-green-600" />
        <StatCard label="User Growth" value={userGrowthData[userGrowthData.length - 1]?.users || 0} icon={TrendingUp} tone="text-blue-600" />
        <StatCard label="Country Sales" value={revenueByCountry.length} icon={BarChart3} tone="text-indigo-600" />
        <StatCard label="Service Popularity" value={servicePopularity.length} icon={Briefcase} tone="text-cyan-600" />
        <StatCard label="Refund Reports" value={payments.filter((payment: any) => payment.status === "refunded").length} icon={AlertTriangle} tone="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Country Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueByCountry}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={servicePopularity} dataKey="count" nameKey="service" outerRadius={90} fill="#2563eb">
                  {servicePopularity.map((entry: any, index: number) => (
                    <Cell key={`svc-${index}`} fill={["#2563eb", "#0891b2", "#14b8a6", "#6366f1", "#f59e0b"][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
