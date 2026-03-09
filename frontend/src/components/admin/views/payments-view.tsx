import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function PaymentsView({ ctx }: { ctx: AdminViewContext }) {
  const { paymentStatus, setPaymentStatus, filteredPayments, paymentStatusClass, userRecords, refundPayment, addActivity, d } = ctx;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>Transactions, statuses, invoices and refunds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Select value={paymentStatus} onValueChange={(value) => setPaymentStatus(value as any)}>
              <SelectTrigger><SelectValue placeholder="Payment status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="succeeded">Succeeded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Stripe Payment ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment: any) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.userName}</TableCell>
                <TableCell>{payment.plan}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.currency}</TableCell>
                <TableCell className="font-mono text-xs">{payment.stripePaymentId}</TableCell>
                <TableCell>
                  <Badge className={cn("border capitalize", paymentStatusClass[payment.status])}>{payment.status}</Badge>
                </TableCell>
                <TableCell>
                  {userRecords.find((user: any) => user.id === payment.userId)?.status === "active" ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>{d(payment.date)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => refundPayment(payment.id)}
                      disabled={payment.status !== "succeeded"}
                    >
                      Refund
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addActivity(`Viewed invoice for ${payment.id}`)}>
                      View Invoice
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
