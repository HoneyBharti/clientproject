import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface PipelineStage {
  key: string;
  label: string;
  count: number;
}

interface DashboardChartsProps {
  pipelineStages: PipelineStage[];
}

export function DashboardCharts({ pipelineStages }: DashboardChartsProps) {
  const revenueData = [
    { month: 'Jul', revenue: 32000 },
    { month: 'Aug', revenue: 35000 },
    { month: 'Sep', revenue: 38000 },
    { month: 'Oct', revenue: 42000 },
    { month: 'Nov', revenue: 45000 },
    { month: 'Dec', revenue: 47200 }
  ];

  const planData = [
    { name: 'Scale', value: 45, color: '#2563eb' },
    { name: 'Growth', value: 35, color: '#16a34a' },
    { name: 'Starter', value: 20, color: '#ea580c' }
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Distribution</CardTitle>
            <CardDescription>By service plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {planData.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                    <span>{plan.name} Plan</span>
                  </div>
                  <span className="font-medium">{plan.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Pipeline</CardTitle>
            <CardDescription>Current status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineStages.map(s => ({ name: s.label.replace(' Accounts', ''), count: s.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                <span className="text-lg font-bold text-red-700">3</span>
              </div>
            </div>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-amber-800">Overdue Compliance</span>
                <span className="text-lg font-bold text-amber-700">2</span>
              </div>
            </div>
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800">Pending Documents</span>
                <span className="text-lg font-bold text-blue-700">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}