import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api-base";
import type { AdminViewContext } from "./types";

export function PaymentsView({ ctx }: { ctx: AdminViewContext }) {
  const { paymentStatus, setPaymentStatus, filteredPayments, paymentStatusClass, userRecords, addActivity, d } = ctx;

  const handleViewInvoice = async (payment: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/${payment.id}/receipt`, {
        credentials: 'include',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.receiptUrl) {
        addActivity(`Invoice not available for ${payment.id}`);
        return;
      }
      window.open(data.receiptUrl, "_blank", "noopener,noreferrer");
      addActivity(`Viewed invoice for ${payment.id}`);
    } catch (error) {
      addActivity(`Invoice lookup failed for ${payment.id}`);
    }
  };

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
                      onClick={() => handleViewInvoice(payment)}
                      disabled={payment.status !== "succeeded"}
                    >
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
