import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function UsersView({ ctx }: { ctx: AdminViewContext }) {
  const {
    q,
    setQ,
    status,
    setStatus,
    region,
    setRegion,
    users,
    usersLoading,
    usersError,
    selectUser,
    openUserDocumentModal,
    selected,
    qbClass,
    clientStatusClass,
    setUserActivation,
    resetUserPassword,
    userActionMessage,
    selectedUserOrders,
    d,
    selectedUserPayments,
    selectedUserDocuments,
    documentStatusClass,
  } = ctx;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Management</CardTitle>
        <CardDescription>Manage client accounts and activation status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 h-11"
              placeholder="Search client, company, or email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="lg:col-span-3">
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="awaiting_docs">Awaiting Docs</SelectItem>
                <SelectItem value="compliance_risk">Compliance Risk</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-3">
            <Select value={region} onValueChange={(v) => setRegion(v as any)}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Region" /></SelectTrigger>
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

        {usersError ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {usersError}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Region</TableHead>
                    <TableHead className="font-semibold">QuickBooks</TableHead>
                    <TableHead className="font-semibold">Plan</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                        Loading users...
                      </TableCell>
                    </TableRow>
                  ) : users.length ? (
                    users.map((u: any) => (
                      <TableRow
                        key={u.id}
                        onClick={() => selectUser(u.id)}
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-gray-50/50",
                          selected?.id === u.id && "bg-blue-50/50 border-l-4 border-l-blue-600"
                        )}
                      >
                        <TableCell>
                          <div>
                            <p className="font-semibold text-gray-900">{u.name}</p>
                            <p className="text-sm text-muted-foreground">{u.companyName || "N/A"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{u.region || "N/A"}</TableCell>
                        <TableCell>
                          <Badge className={cn("border capitalize font-medium", qbClass[u.quickBooksStatus])}>
                            {u.quickBooksStatus.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{u.servicePlan || "N/A"}</TableCell>
                        <TableCell>
                          <Badge className={cn("border capitalize font-medium", clientStatusClass[u.status])}>
                            {u.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                        No users match the current filter criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">User Controls</CardTitle>
              <CardDescription>Manage selected user account status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  onClick={() => setUserActivation(true)}
                  disabled={!selected || selected.status === "active"}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Activate Account
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setUserActivation(false)}
                  disabled={!selected || selected.status === "paused"}
                >
                  Deactivate Account
                </Button>
                <Button size="sm" variant="outline" onClick={resetUserPassword} disabled={!selected}>
                  Reset Password
                </Button>
                <Button size="sm" variant="outline" onClick={() => selected && openUserDocumentModal(selected.id)} disabled={!selected}>
                  View Documents
                </Button>
              </div>

              {userActionMessage ? (
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm font-medium",
                    userActionMessage.includes("first")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  )}
                >
                  {userActionMessage}
                </div>
              ) : null}

              {selected ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-gray-50 p-4 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User Profile</p>
                    <p className="text-sm"><span className="font-medium">Name:</span> {selected.name}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {selected.email}</p>
                    <p className="text-sm"><span className="font-medium">Country:</span> {selected.region || "N/A"}</p>
                    <p className="text-sm"><span className="font-medium">Signup date:</span> {d(selected.createdAt || selected.lastActivityAt)}</p>
                    <p className="text-sm"><span className="font-medium">Plan:</span> {selected.servicePlan || "N/A"}</p>
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Order History</p>
                    {selectedUserOrders.length ? (
                      <div className="space-y-2">
                        {selectedUserOrders.slice(0, 3).map((order: any) => (
                          <div key={order.id} className="rounded border p-2 text-sm">
                            <p className="font-medium">{order.serviceType}</p>
                            <p className="text-xs text-muted-foreground">{order.id} - {d(order.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No orders for this user.</p>
                    )}
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Payment History</p>
                    {selectedUserPayments.length ? (
                      <div className="space-y-2">
                        {selectedUserPayments.slice(0, 3).map((payment: any) => (
                          <div key={payment.id} className="rounded border p-2 text-sm">
                            <p className="font-medium">{payment.plan} - ${payment.amount}</p>
                            <p className="text-xs text-muted-foreground">{payment.stripePaymentId}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No payments for this user.</p>
                    )}
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Documents</p>
                    {selectedUserDocuments.length ? (
                      <div className="space-y-2">
                        {selectedUserDocuments.slice(0, 3).map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between rounded border p-2 text-sm">
                            <p>{doc.document}</p>
                            <Badge className={cn("border capitalize", documentStatusClass[doc.status])}>{doc.status}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No document records linked yet.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-muted-foreground">No users match the current filter criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
