"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, DollarSign, Link2, AlertTriangle, LayoutDashboard, FileCheck2, ShieldCheck, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/admin/components/StatCard";
import { AdminSidebar } from "@/components/admin/components/AdminSidebar";
import { AdminHeader } from "@/components/admin/components/AdminHeader";

type AdminView = "overview" | "users" | "documents" | "quickbooks" | "compliance";

const viewMeta: Record<AdminView, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard", subtitle: "System overview and key metrics" },
  users: { title: "Client Management", subtitle: "Manage client accounts and status" },
  documents: { title: "Document Center", subtitle: "Track document collection and verification" },
  quickbooks: { title: "QuickBooks Integration", subtitle: "Monitor accounting system connections" },
  compliance: { title: "Compliance Tracking", subtitle: "Monitor deadlines and risk levels" },
};

const navItems = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Clients", icon: Users },
  { key: "documents", label: "Documents", icon: FileCheck2 },
  { key: "quickbooks", label: "QuickBooks", icon: Link2 },
  { key: "compliance", label: "Compliance", icon: ShieldCheck },
];

const viewHref: Record<AdminView, string> = {
  overview: "/admin",
  users: "/admin/users",
  documents: "/admin/documents",
  quickbooks: "/admin/quickbooks",
  compliance: "/admin/compliance",
};

const statusClass: Record<string, string> = {
  lead: "bg-sky-100 text-sky-700 border-sky-200",
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  awaiting_docs: "bg-amber-100 text-amber-700 border-amber-200",
  compliance_risk: "bg-red-100 text-red-700 border-red-200",
  paused: "bg-slate-100 text-slate-700 border-slate-200",
  closed: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const dt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

const d = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));

export function AdminFlowReal({ activeView = "overview" }: { activeView?: AdminView }) {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [selectedId, setSelectedId] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, statsRes, paymentsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/users', { credentials: 'include' }),
        fetch('http://localhost:5000/api/admin/stats', { credentials: 'include' }),
        fetch('http://localhost:5000/api/payment/all', { credentials: 'include' })
      ]);

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users || []);
        if (data.users?.length > 0) setSelectedId(data.users[0]._id);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats || {});
      }

      if (paymentsRes.ok) {
        const data = await paymentsRes.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const matchesQ = [u.name, u.companyName, u.email].join(" ").toLowerCase().includes(q.toLowerCase());
        const matchesS = status === "all" || u.status === status;
        const matchesR = region === "all" || u.region === region;
        return matchesQ && matchesS && matchesR;
      }),
    [q, region, status, users]
  );

  const selected = filteredUsers.find((u) => u._id === selectedId) || filteredUsers[0];

  const qbUsers = useMemo(
    () => users.filter((u) => u.quickBooksConnected),
    [users]
  );

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, status: newStatus })
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(prev => prev.map(u => u._id === userId ? data.user : u));
        setActionMessage(`User status updated to ${newStatus}`);
      }
    } catch (error) {
      setActionMessage('Failed to update user status');
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <AdminSidebar 
              navItems={navItems} 
              activeView={activeView} 
              viewHref={viewHref} 
              isMobile 
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        <AdminSidebar navItems={navItems} activeView={activeView} viewHref={viewHref} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader 
            title={viewMeta[activeView].title}
            subtitle={viewMeta[activeView].subtitle}
            date={d(new Date().toISOString())}
            onMenuClick={() => setMobileMenuOpen(true)}
          />

          <main className="p-2 sm:p-4">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                label="Total Clients" 
                value={stats.totalUsers || 0} 
                icon={Users} 
                tone="text-blue-600" 
              />
              <StatCard 
                label="Monthly Revenue" 
                value={`$${((stats.totalRevenue || 0) / 1000).toFixed(1)}K`} 
                icon={DollarSign} 
                tone="text-green-600" 
              />
              <StatCard 
                label="QB Connected" 
                value={`${stats.qbPercentage || 0}%`} 
                icon={Link2} 
                tone="text-emerald-600" 
              />
              <StatCard 
                label="Active Issues" 
                value={stats.activeIssues || 0} 
                icon={AlertTriangle} 
                tone="text-red-600" 
              />
            </div>

            {activeView === "overview" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.slice(0, 5).map((p) => (
                          <TableRow key={p._id}>
                            <TableCell>{p.user?.name || 'N/A'}</TableCell>
                            <TableCell>{p.plan}</TableCell>
                            <TableCell>${p.amount}</TableCell>
                            <TableCell>{dt(p.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Users</span>
                      <span className="font-bold">{stats.activeUsers || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>QuickBooks Connected</span>
                      <span className="font-bold">{stats.qbConnected || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Compliance Risk</span>
                      <span className="font-bold text-red-600">{stats.complianceRisk || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Awaiting Docs</span>
                      <span className="font-bold text-amber-600">{stats.awaitingDocs || 0}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === "users" && (
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
                      <Select value={status} onValueChange={setStatus}>
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
                      <Select value={region} onValueChange={setRegion}>
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
                            {filteredUsers.map((u) => (
                              <TableRow 
                                key={u._id} 
                                onClick={() => setSelectedId(u._id)} 
                                className={cn(
                                  "cursor-pointer transition-colors hover:bg-gray-50/50",
                                  selected?._id === u._id && "bg-blue-50/50 border-l-4 border-l-blue-600"
                                )}
                              >
                                <TableCell>
                                  <div>
                                    <p className="font-semibold text-gray-900">{u.name}</p>
                                    <p className="text-sm text-muted-foreground">{u.companyName || 'N/A'}</p>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{u.region || 'N/A'}</TableCell>
                                <TableCell>
                                  <Badge className={cn("border capitalize font-medium", 
                                    u.quickBooksConnected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                                  )}>
                                    {u.quickBooksConnected ? 'Connected' : 'Disconnected'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{u.servicePlan || 'N/A'}</TableCell>
                                <TableCell>
                                  <Badge className={cn("border capitalize font-medium", statusClass[u.status] || statusClass.lead)}>
                                    {u.status?.replace("_", " ") || 'lead'}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
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
                            onClick={() => selected && updateUserStatus(selected._id, 'active')} 
                            disabled={!selected || selected.status === "active"}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Activate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => selected && updateUserStatus(selected._id, 'paused')} 
                            disabled={!selected || selected.status === "paused"}
                          >
                            Deactivate
                          </Button>
                        </div>

                        {actionMessage && (
                          <div className="rounded-lg p-3 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {actionMessage}
                          </div>
                        )}

                        {selected && (
                          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Selected User</p>
                            <p className="font-semibold text-gray-900">{selected.name}</p>
                            <p className="text-sm text-muted-foreground">{selected.email}</p>
                            <div className="pt-2 space-y-1">
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Status:</span> {selected.status?.replace("_", " ") || 'lead'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Created:</span> {dt(selected.createdAt)}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeView === "quickbooks" && (
              <Card>
                <CardHeader>
                  <CardTitle>QuickBooks Connections</CardTitle>
                  <CardDescription>Monitor client QuickBooks integration status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u._id}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell>{u.companyName || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge className={cn("border", 
                              u.quickBooksConnected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                            )}>
                              {u.quickBooksConnected ? 'Connected' : 'Disconnected'}
                            </Badge>
                          </TableCell>
                          <TableCell>{u.servicePlan || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeView === "compliance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Monitor client compliance and risk levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u._id}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell>{u.companyName || 'N/A'}</TableCell>
                          <TableCell>{u.region || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge className={cn("border capitalize", statusClass[u.status] || statusClass.lead)}>
                              {u.status?.replace("_", " ") || 'lead'}
                            </Badge>
                          </TableCell>
                          <TableCell>{u.servicePlan || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeView === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle>Document Status</CardTitle>
                  <CardDescription>Track client document collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Region</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.filter(u => u.status === 'awaiting_docs').map((u) => (
                        <TableRow key={u._id}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                              Awaiting Documents
                            </Badge>
                          </TableCell>
                          <TableCell>{u.region || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
