import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function QuickbooksView({ ctx }: { ctx: AdminViewContext }) {
  const {
    qbQ,
    setQbQ,
    qbStatus,
    setQbStatus,
    qbUsers,
    setSelectedQbId,
    selectedQbUser,
    qbClass,
    dt,
    setQuickBooksStateForSelected,
    qbActionMessage,
    quickBooksModules,
  } = ctx;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">QuickBooks Client Queue</CardTitle>
          <CardDescription>Connection and sync status for each client account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-7">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search client/company/email" value={qbQ} onChange={(e) => setQbQ(e.target.value)} />
            </div>
            <div className="lg:col-span-5">
              <Select value={qbStatus} onValueChange={(v) => setQbStatus(v as any)}>
                <SelectTrigger><SelectValue placeholder="Connection Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="token_expired">Token Expired</SelectItem>
                  <SelectItem value="sync_error">Sync Error</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qbUsers.map((u: any) => (
                <TableRow key={u.id} onClick={() => setSelectedQbId(u.id)} className="cursor-pointer" data-state={selectedQbUser?.id === u.id ? "selected" : undefined}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.companyName}</TableCell>
                  <TableCell><Badge className={cn("border capitalize", qbClass[u.quickBooksStatus])}>{u.quickBooksStatus.replace("_", " ")}</Badge></TableCell>
                  <TableCell>{u.accountOwner}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{dt(u.lastActivityAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connection Actions</CardTitle>
          <CardDescription>Update selected client QuickBooks state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setQuickBooksStateForSelected("connected")}>Mark Connected</Button>
            <Button size="sm" variant="outline" onClick={() => setQuickBooksStateForSelected("token_expired")}>Mark Token Expired</Button>
            <Button size="sm" variant="destructive" onClick={() => setQuickBooksStateForSelected("disconnected")}>Disconnect</Button>
          </div>

          {qbActionMessage ? <p className="text-xs text-blue-700">{qbActionMessage}</p> : null}

          {selectedQbUser ? (
            <div className="rounded bg-gray-50 p-3">
              <p className="text-xs text-muted-foreground">Selected Client</p>
              <p className="font-medium text-gray-900">{selectedQbUser.name}</p>
              <p className="text-xs text-muted-foreground">{selectedQbUser.companyName}</p>
              <p className="mt-1 text-xs text-muted-foreground">Status: {selectedQbUser.quickBooksStatus.replace("_", " ")}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No records for this filter.</p>
          )}

          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground">API Coverage (from backend functions)</p>
            {quickBooksModules.map((mod: any) => (
              <div key={mod.id} className="rounded border p-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{mod.label}</p>
                  <Badge className={cn("border", mod.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200")}>{mod.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{mod.endpoints} endpoints</p>
                <p className="text-xs text-muted-foreground">Verified: {dt(mod.lastVerifiedAt)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
