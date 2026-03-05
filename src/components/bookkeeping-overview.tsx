"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import type { ChartConfig } from "@/components/ui/chart";

const transactions = [
  { id: 'txn_1', date: "2024-07-20", description: "SaaS Subscription", amount: -49.99, status: "Cleared" },
  { id: 'txn_2', date: "2024-07-19", description: "Client Payment", amount: 2500.00, status: "Cleared" },
  { id: 'txn_3', date: "2024-07-18", description: "Office Supplies", amount: -152.71, status: "Cleared" },
  { id: 'txn_4', date: "2024-07-18", description: "Stripe Payout", amount: 1200.00, status: "Pending" },
  { id: 'txn_5', date: "2024-07-17", description: "Cloud Hosting Services", amount: -350.00, status: "Cleared" },
];

const invoices = [
  { id: 'inv_1', number: "INV-007", client: "Innovate Corp", date: "2024-07-15", amount: 5000, status: "Paid" },
  { id: 'inv_2', number: "INV-008", client: "Future Tech", date: "2024-07-20", amount: 7500, status: "Sent" },
  { id: 'inv_3', number: "INV-009", client: "Synergy LLC", date: "2024-08-01", amount: 3200, status: "Draft" },
];

const chartData = [
  { category: "Salaries", expense: 12000 },
  { category: "Marketing", expense: 4500 },
  { category: "Software", expense: 2200 },
  { category: "Rent", expense: 5000 },
  { category: "Utilities", expense: 800 },
  { category: "Other", expense: 1500 },
];

const chartConfig = {
  expense: {
    label: "Expense",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function BookkeepingOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookkeeping Overview</CardTitle>
        <CardDescription>
          A summary of your company's financial activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell>{txn.date}</TableCell>
                        <TableCell className="font-medium">{txn.description}</TableCell>
                        <TableCell>
                          <Badge variant={txn.status === 'Cleared' ? 'default' : 'secondary'} className={txn.status === 'Cleared' ? 'bg-accent text-accent-foreground' : ''}>{txn.status}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${txn.amount > 0 ? 'text-green-600' : ''}`}>
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(txn.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expenses">
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Expenses</CardTitle>
                    <CardDescription>July 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                            <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${Number(value) / 1000}k`}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="expense" fill="var(--color-expense)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.number}</TableCell>
                        <TableCell>{inv.client}</TableCell>
                        <TableCell>{inv.date}</TableCell>
                        <TableCell>
                          <Badge variant={inv.status === 'Paid' ? 'default' : (inv.status === 'Sent' ? 'secondary' : 'outline')} className={inv.status === 'Paid' ? 'bg-accent text-accent-foreground' : ''}>
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(inv.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
