import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function OrdersView({ ctx }: { ctx: AdminViewContext }) {
  const { orderQ, setOrderQ, orderStatus, setOrderStatus, filteredOrders, paymentStatusClass, updateOrderStatus } = ctx;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order / Service Requests</CardTitle>
        <CardDescription>Track all user requests and operational status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search order, user or service" value={orderQ} onChange={(e) => setOrderQ(e.target.value)} />
          </div>
          <div className="lg:col-span-4">
            <Select value={orderStatus} onValueChange={(value) => setOrderStatus(value as any)}>
              <SelectTrigger><SelectValue placeholder="Order status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="waiting_documents">Waiting for Documents</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Assigned Staff</TableHead>
              <TableHead>Customer Documents</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.serviceType}</TableCell>
                <TableCell>{order.country}</TableCell>
                <TableCell>{order.assignedStaff}</TableCell>
                <TableCell>{order.documents}</TableCell>
                <TableCell>
                  <Badge className={cn("border capitalize", paymentStatusClass[order.paymentStatus])}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value as any)}>
                    <SelectTrigger className="h-8 w-[170px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="waiting_documents">Waiting for Documents</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
