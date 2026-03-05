"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronUp,
  ChevronDown,
  DollarSign,
  FileCheck2,
  LayoutDashboard,
  Link2,
  Menu,
  Newspaper,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { adminUsers, contentQueue, pipelineStages } from "@/components/admin/mock-data";
import type { AdminUser, ClientStatus, ContentStage, QuickBooksStatus, UserRegion } from "@/components/admin/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

type AdminView = "overview" | "users" | "blogs" | "services" | "documents" | "quickbooks" | "compliance";
type DocumentStatus = "pending" | "verified" | "rejected" | "missing";
type DocumentSource = "client_uploads" | "legal_docs";
type ComplianceHealth = "overdue" | "due_7d" | "due_21d" | "on_track";

const viewMeta: Record<AdminView, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard", subtitle: "System overview and key metrics" },
  users: { title: "Client Management", subtitle: "Manage client accounts and status" },
  blogs: { title: "Blog Posts", subtitle: "Manage blog content and publishing" },
  services: { title: "Service Pages", subtitle: "Manage service landing pages" },
  documents: { title: "Document Center", subtitle: "Track document collection and verification" },
  quickbooks: { title: "QuickBooks Integration", subtitle: "Monitor accounting system connections" },
  compliance: { title: "Compliance Tracking", subtitle: "Monitor deadlines and risk levels" },
};

const navItems: Array<{ key: AdminView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Clients", icon: Users },
  { key: "blogs", label: "Blog Posts", icon: Newspaper },
  { key: "services", label: "Service Pages", icon: Briefcase },
  { key: "documents", label: "Documents", icon: FileCheck2 },
  { key: "quickbooks", label: "QuickBooks", icon: Link2 },
  { key: "compliance", label: "Compliance", icon: ShieldCheck },
];

const viewHref: Record<AdminView, string> = {
  overview: "/admin",
  users: "/admin/users",
  blogs: "/admin/blogs",
  services: "/admin/services",
  documents: "/admin/documents",
  quickbooks: "/admin/quickbooks",
  compliance: "/admin/compliance",
};

const clientStatusClass: Record<ClientStatus, string> = {
  lead: "bg-sky-100 text-sky-700 border-sky-200",
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  awaiting_docs: "bg-amber-100 text-amber-700 border-amber-200",
  compliance_risk: "bg-red-100 text-red-700 border-red-200",
  paused: "bg-slate-100 text-slate-700 border-slate-200",
  closed: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const qbClass: Record<QuickBooksStatus, string> = {
  connected: "bg-emerald-100 text-emerald-700 border-emerald-200",
  token_expired: "bg-amber-100 text-amber-700 border-amber-200",
  sync_error: "bg-red-100 text-red-700 border-red-200",
  disconnected: "bg-slate-100 text-slate-700 border-slate-200",
};

const contentClass: Record<ContentStage, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  review: "bg-blue-100 text-blue-700 border-blue-200",
  legal_review: "bg-violet-100 text-violet-700 border-violet-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  scheduled: "bg-cyan-100 text-cyan-700 border-cyan-200",
  published: "bg-green-100 text-green-700 border-green-200",
  archived: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const documentStatusClass: Record<DocumentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  missing: "bg-slate-100 text-slate-700 border-slate-200",
};

const sourceClass: Record<DocumentSource, string> = {
  client_uploads: "bg-blue-100 text-blue-700 border-blue-200",
  legal_docs: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

const complianceClass: Record<ComplianceHealth, string> = {
  overdue: "bg-red-100 text-red-700 border-red-200",
  due_7d: "bg-amber-100 text-amber-700 border-amber-200",
  due_21d: "bg-yellow-100 text-yellow-700 border-yellow-200",
  on_track: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const initialDocumentQueue: Array<{
  id: string;
  client: string;
  company: string;
  document: string;
  category: "KYC" | "Tax" | "Compliance" | "Banking";
  source: DocumentSource;
  status: DocumentStatus;
  updatedAt: string;
}> = [
  { id: "doc_001", client: "Elena Vasquez", company: "Acme Innovations LLC", document: "Certificate of Formation", category: "Compliance", source: "legal_docs", status: "verified", updatedAt: "2026-03-03T08:35:00Z" },
  { id: "doc_002", client: "Kenji Tanaka", company: "Northbridge Labs Ltd", document: "Q1 Bank Statements", category: "Banking", source: "client_uploads", status: "pending", updatedAt: "2026-03-02T14:10:00Z" },
  { id: "doc_003", client: "Omar Khalid", company: "DesertGrid FZ LLC", document: "VAT Registration Letter", category: "Tax", source: "client_uploads", status: "missing", updatedAt: "2026-03-01T11:45:00Z" },
  { id: "doc_004", client: "Priya Sinha", company: "FluxPay Pte Ltd", document: "Shareholder Register", category: "Compliance", source: "legal_docs", status: "verified", updatedAt: "2026-03-03T05:40:00Z" },
  { id: "doc_005", client: "Rohan Mehta", company: "JetLedger Technologies Pvt Ltd", document: "Director KYC Passport Copy", category: "KYC", source: "client_uploads", status: "rejected", updatedAt: "2026-03-02T07:20:00Z" },
];

const quickBooksModules = [
  { id: "qb_mod_001", label: "Bills API", endpoints: 4, status: "active", lastVerifiedAt: "2026-03-02T18:00:00Z" },
  { id: "qb_mod_002", label: "Customers API", endpoints: 4, status: "active", lastVerifiedAt: "2026-03-02T18:05:00Z" },
  { id: "qb_mod_003", label: "Accounts API", endpoints: 3, status: "active", lastVerifiedAt: "2026-03-02T18:10:00Z" },
  { id: "qb_mod_004", label: "Company Info API", endpoints: 1, status: "beta", lastVerifiedAt: "2026-03-01T12:00:00Z" },
] as const;

const dt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

const d = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

const isDueSoon = (iso: string, days: number) => {
  const diffDays = (new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
};

function StatCard({ label, value, icon: Icon, tone, change, changeType }: { 
  label: string; 
  value: string | number; 
  icon: React.ComponentType<{ className?: string }>; 
  tone: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 sm:text-sm font-medium">{label}</p>
            <p className="text-xl font-bold sm:text-2xl">{value}</p>
            {change && (
              <div className={cn("flex items-center text-xs mt-1", 
                changeType === 'increase' ? "text-green-600" : "text-red-600"
              )}>
                {changeType === 'increase' ? 
                  <ChevronUp className="h-3 w-3 mr-1" /> : 
                  <ChevronDown className="h-3 w-3 mr-1" />
                }
                {change}% vs last month
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", tone.replace("text-", "bg-").replace("-600", "-100"))}>
            <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", tone)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminFlow({ activeView = "overview" }: { activeView?: AdminView }) {
  const [userRecords, setUserRecords] = useState<AdminUser[]>(adminUsers);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");
  const [region, setRegion] = useState<"all" | UserRegion>("all");
  const [selectedId, setSelectedId] = useState(adminUsers[0]?.id ?? "");
  const [userActionMessage, setUserActionMessage] = useState("");

  const [contentQ, setContentQ] = useState("");
  const [contentStage, setContentStage] = useState<"all" | ContentStage>("all");

  const [documentRecords, setDocumentRecords] = useState(initialDocumentQueue);
  const [documentQ, setDocumentQ] = useState("");
  const [documentStatus, setDocumentStatus] = useState<"all" | DocumentStatus>("all");
  const [documentActionMessage, setDocumentActionMessage] = useState("");

  const [qbQ, setQbQ] = useState("");
  const [qbStatus, setQbStatus] = useState<"all" | QuickBooksStatus>("all");
  const [selectedQbId, setSelectedQbId] = useState(adminUsers[0]?.id ?? "");
  const [qbActionMessage, setQbActionMessage] = useState("");

  const [complianceStatus, setComplianceStatus] = useState<"all" | ComplianceHealth>("all");
  const [complianceRegion, setComplianceRegion] = useState<"all" | UserRegion>("all");

  const metrics = useMemo(() => {
    const active = userRecords.filter((u) => u.status === "active").length;
    const qb = userRecords.length ? Math.round((userRecords.filter((u) => u.quickBooksStatus === "connected").length / userRecords.length) * 100) : 0;
    const complianceSoon = userRecords.filter((u) => isDueSoon(u.complianceDueAt, 21)).length;
    const pending = contentQueue.filter((c) => c.stage !== "published" && c.stage !== "archived").length;
    const qbIssues = userRecords.filter((u) => u.quickBooksStatus !== "connected").length;
    const docsBacklog = documentRecords.filter((doc) => doc.status !== "verified").length;
    const overdueCompliance = userRecords.filter((u) => daysUntil(u.complianceDueAt) < 0).length;
    return { active, qb, complianceSoon, pending, qbIssues, docsBacklog, overdueCompliance };
  }, [documentRecords, userRecords]);

  const qbBreakdown = useMemo(
    () => ({
      connected: userRecords.filter((u) => u.quickBooksStatus === "connected").length,
      token_expired: userRecords.filter((u) => u.quickBooksStatus === "token_expired").length,
      sync_error: userRecords.filter((u) => u.quickBooksStatus === "sync_error").length,
      disconnected: userRecords.filter((u) => u.quickBooksStatus === "disconnected").length,
    }),
    [userRecords]
  );

  const users = useMemo(
    () =>
      userRecords.filter((u) => {
        const matchesQ = [u.name, u.companyName, u.email].join(" ").toLowerCase().includes(q.toLowerCase());
        const matchesS = status === "all" || u.status === status;
        const matchesR = region === "all" || u.region === region;
        return matchesQ && matchesS && matchesR;
      }),
    [q, region, status, userRecords]
  );

  const selected = users.find((u) => u.id === selectedId) ?? users[0];

  const filteredDocuments = useMemo(
    () =>
      documentRecords.filter((doc) => {
        const matchesQ = [doc.client, doc.company, doc.document].join(" ").toLowerCase().includes(documentQ.toLowerCase());
        const matchesS = documentStatus === "all" || doc.status === documentStatus;
        return matchesQ && matchesS;
      }),
    [documentQ, documentRecords, documentStatus]
  );

  const qbUsers = useMemo(
    () =>
      userRecords.filter((u) => {
        const matchesQ = [u.name, u.companyName, u.email].join(" ").toLowerCase().includes(qbQ.toLowerCase());
        const matchesS = qbStatus === "all" || u.quickBooksStatus === qbStatus;
        return matchesQ && matchesS;
      }),
    [qbQ, qbStatus, userRecords]
  );

  const selectedQbUser = qbUsers.find((u) => u.id === selectedQbId) ?? qbUsers[0];

  const complianceRows = useMemo(
    () =>
      userRecords
        .map((u) => {
          const dueInDays = daysUntil(u.complianceDueAt);
          const health: ComplianceHealth = dueInDays < 0 ? "overdue" : dueInDays <= 7 ? "due_7d" : dueInDays <= 21 ? "due_21d" : "on_track";
          return { ...u, dueInDays, health };
        })
        .filter((row) => {
          const matchesStatus = complianceStatus === "all" || row.health === complianceStatus;
          const matchesRegion = complianceRegion === "all" || row.region === complianceRegion;
          return matchesStatus && matchesRegion;
        })
        .sort((a, b) => a.dueInDays - b.dueInDays),
    [complianceRegion, complianceStatus, userRecords]
  );

  const complianceCounts = useMemo(
    () => ({
      overdue: complianceRows.filter((row) => row.health === "overdue").length,
      due_7d: complianceRows.filter((row) => row.health === "due_7d").length,
      due_21d: complianceRows.filter((row) => row.health === "due_21d").length,
      on_track: complianceRows.filter((row) => row.health === "on_track").length,
    }),
    [complianceRows]
  );

  const recentContent = useMemo(
    () => [...contentQueue].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5),
    []
  );

  const setUserActivation = (activate: boolean) => {
    if (!selected) {
      setUserActionMessage("Select a user first.");
      return;
    }

    const nextStatus: ClientStatus = activate ? "active" : "paused";
    const nowIso = new Date().toISOString();

    setUserRecords((prev) =>
      prev.map((u) =>
        u.id === selected.id
          ? {
              ...u,
              status: nextStatus,
              lastActivityAt: nowIso,
            }
          : u
      )
    );

    setUserActionMessage(activate ? `${selected.name} activated.` : `${selected.name} deactivated.`);
  };

  const setDocumentState = (documentId: string, nextStatus: DocumentStatus) => {
    setDocumentRecords((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            }
          : doc
      )
    );
    setDocumentActionMessage(`Document status updated to ${nextStatus.replace("_", " ")}.`);
  };

  const setQuickBooksStateForSelected = (nextStatus: QuickBooksStatus) => {
    if (!selectedQbUser) {
      setQbActionMessage("Select a client record first.");
      return;
    }

    const nowIso = new Date().toISOString();

    setUserRecords((prev) =>
      prev.map((u) =>
        u.id === selectedQbUser.id
          ? {
              ...u,
              quickBooksStatus: nextStatus,
              lastActivityAt: nowIso,
            }
          : u
      )
    );

    setQbActionMessage(`${selectedQbUser.name}: QuickBooks marked as ${nextStatus.replace("_", " ")}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <aside className="fixed left-0 top-0 h-full w-64 bg-white">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-blue-600 p-2 text-white">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">YourLegal</p>
                      <p className="text-xs text-gray-500">Admin Panel</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <nav className="flex-1 space-y-1 p-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={viewHref[item.key]}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium",
                        isActive 
                          ? "bg-blue-600 text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t p-3">
                <p className="text-xs text-gray-500">v2.1.0</p>
              </div>
            </aside>
          </div>
        )}

        {/* Desktop sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-white lg:flex">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="rounded bg-blue-600 p-2 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">YourLegal</p>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.key;
              return (
                <Link
                  key={item.key}
                  href={viewHref[item.key]}
                  className={cn(
                    "flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-3">
            <p className="text-xs text-gray-500">v2.1.0</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">{viewMeta[activeView].title}</h1>
                  <p className="hidden text-xs text-gray-600 sm:block sm:text-sm">{viewMeta[activeView].subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-gray-500 sm:block">{d(new Date().toISOString())}</span>
                <Button className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm" size="sm" variant="outline">
                  Logout
                </Button>
              </div>
            </div>

            {/* Remove the mobile navigation tabs since we now have hamburger menu */}
          </header>

          <main className="p-2 sm:p-4">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                label="Total Clients" 
                value={metrics.active + 15} 
                icon={Users} 
                tone="text-blue-600" 
                change={12}
                changeType="increase"
              />
              <StatCard 
                label="Monthly Revenue" 
                value="$47.2K" 
                icon={DollarSign} 
                tone="text-green-600" 
                change={8}
                changeType="increase"
              />
              <StatCard 
                label="QB Connected" 
                value={`${metrics.qb}%`} 
                icon={Link2} 
                tone="text-emerald-600" 
                change={5}
                changeType="increase"
              />
              <StatCard 
                label="Active Issues" 
                value={metrics.qbIssues + metrics.overdueCompliance} 
                icon={AlertTriangle} 
                tone="text-red-600" 
                change={15}
                changeType="decrease"
              />
            </div>

            {activeView === "overview" ? (
              <div className="space-y-6">
                {/* Charts Row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={[
                          { month: 'Jul', revenue: 32000 },
                          { month: 'Aug', revenue: 35000 },
                          { month: 'Sep', revenue: 38000 },
                          { month: 'Oct', revenue: 42000 },
                          { month: 'Nov', revenue: 45000 },
                          { month: 'Dec', revenue: 47200 }
                        ]}>
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
                            data={[
                              { name: 'Scale', value: 45, color: '#2563eb' },
                              { name: 'Growth', value: 35, color: '#16a34a' },
                              { name: 'Starter', value: 20, color: '#ea580c' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {[
                              { name: 'Scale', value: 45, color: '#2563eb' },
                              { name: 'Growth', value: 35, color: '#16a34a' },
                              { name: 'Starter', value: 20, color: '#ea580c' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                            <span>Scale Plan</span>
                          </div>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-600"></div>
                            <span>Growth Plan</span>
                          </div>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-600"></div>
                            <span>Starter Plan</span>
                          </div>
                          <span className="font-medium">20%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pipeline and QuickBooks Row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <Card>
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
                      <CardTitle>System Health</CardTitle>
                      <CardDescription>QuickBooks integration status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Overall Health</span>
                          <span className="font-semibold text-green-600">{metrics.qb}%</span>
                        </div>
                        <Progress value={metrics.qb} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                          <p className="text-2xl font-bold text-green-700">{qbBreakdown.connected}</p>
                          <p className="text-xs text-green-600">Connected</p>
                        </div>
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                          <p className="text-2xl font-bold text-amber-700">{qbBreakdown.token_expired}</p>
                          <p className="text-xs text-amber-600">Expired</p>
                        </div>
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                          <p className="text-2xl font-bold text-red-700">{qbBreakdown.sync_error}</p>
                          <p className="text-xs text-red-600">Errors</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                          <p className="text-2xl font-bold text-gray-700">{qbBreakdown.disconnected}</p>
                          <p className="text-xs text-gray-600">Offline</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alerts and Activity Row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                          <span className="text-lg font-bold text-red-700">{metrics.qbIssues}</span>
                        </div>
                      </div>
                      <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-amber-800">Overdue Compliance</span>
                          <span className="text-lg font-bold text-amber-700">{metrics.overdueCompliance}</span>
                        </div>
                      </div>
                      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-blue-800">Pending Documents</span>
                          <span className="text-lg font-bold text-blue-700">{metrics.docsBacklog}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity Feed</CardTitle>
                      <CardDescription>Latest system events and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg border-l-4 border-green-500 bg-green-50 p-3">
                          <div className="rounded-full bg-green-500 p-1">
                            <Users className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">New client onboarded</p>
                            <p className="text-xs text-gray-600">Elena Vasquez - Acme Innovations LLC</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
                          <div className="rounded-full bg-blue-500 p-1">
                            <FileCheck2 className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Document verified</p>
                            <p className="text-xs text-gray-600">Certificate of Formation - FluxPay Pte Ltd</p>
                            <p className="text-xs text-gray-500">4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
                          <div className="rounded-full bg-amber-500 p-1">
                            <AlertTriangle className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">QuickBooks sync issue</p>
                            <p className="text-xs text-gray-600">DesertGrid FZ LLC - Token expired</p>
                            <p className="text-xs text-gray-500">6 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-3">
                          <div className="rounded-full bg-purple-500 p-1">
                            <Newspaper className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Content published</p>
                            <p className="text-xs text-gray-600">UAE Corporate Tax Filing Timeline</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : null}

            {activeView === "users" ? (
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
                      <Select value={status} onValueChange={(v: "all" | ClientStatus) => setStatus(v)}>
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
                      <Select value={region} onValueChange={(v: "all" | UserRegion) => setRegion(v)}>
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
                            {users.map((u) => (
                              <TableRow 
                                key={u.id} 
                                onClick={() => setSelectedId(u.id)} 
                                className={cn(
                                  "cursor-pointer transition-colors hover:bg-gray-50/50",
                                  selected?.id === u.id && "bg-blue-50/50 border-l-4 border-l-blue-600"
                                )}
                              >
                                <TableCell>
                                  <div>
                                    <p className="font-semibold text-gray-900">{u.name}</p>
                                    <p className="text-sm text-muted-foreground">{u.companyName}</p>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{u.region}</TableCell>
                                <TableCell>
                                  <Badge className={cn("border capitalize font-medium", qbClass[u.quickBooksStatus])}>
                                    {u.quickBooksStatus.replace("_", " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{u.servicePlan}</TableCell>
                                <TableCell>
                                  <Badge className={cn("border capitalize font-medium", clientStatusClass[u.status])}>
                                    {u.status.replace("_", " ")}
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
                        </div>

                        {userActionMessage ? (
                          <div className={cn(
                            "rounded-lg p-3 text-sm font-medium",
                            userActionMessage.includes("first") 
                              ? "bg-red-50 text-red-700 border border-red-200" 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          )}>
                            {userActionMessage}
                          </div>
                        ) : null}

                        {selected ? (
                          <div className="rounded-xl bg-gray-50 p-4 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Selected User</p>
                            <p className="font-semibold text-gray-900">{selected.name}</p>
                            <p className="text-sm text-muted-foreground">{selected.companyName}</p>
                            <div className="pt-2 space-y-1">
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Status:</span> {selected.status.replace("_", " ")}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Last activity:</span> {dt(selected.lastActivityAt)}
                              </p>
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
            ) : null}

            {activeView === "blogs" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage blog content and publishing workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search posts..." value={contentQ} onChange={(e) => setContentQ(e.target.value)} />
                    </div>
                    <Select value={contentStage} onValueChange={(v: "all" | ContentStage) => setContentStage(v)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All stages</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="legal_review">Legal Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentQueue.filter((c) => {
                        if (c.type !== "blog") return false;
                        const matchesQ = [c.title, c.slug].join(" ").toLowerCase().includes(contentQ.toLowerCase());
                        const matchesS = contentStage === "all" || c.stage === contentStage;
                        return matchesQ && matchesS;
                      }).map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{c.title}</p>
                              <p className="text-sm text-gray-500">/{c.slug}</p>
                            </div>
                          </TableCell>
                          <TableCell>{c.region}</TableCell>
                          <TableCell>
                            <Badge className={cn("capitalize", contentClass[c.stage])}>
                              {c.stage.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{c.owner}</TableCell>
                          <TableCell className="text-sm text-gray-500">{dt(c.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : null}

            {activeView === "services" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Service Pages</CardTitle>
                  <CardDescription>Manage service landing pages and content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search services..." value={contentQ} onChange={(e) => setContentQ(e.target.value)} />
                    </div>
                    <Select value={contentStage} onValueChange={(v: "all" | ContentStage) => setContentStage(v)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All stages</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="legal_review">Legal Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentQueue.filter((c) => {
                        if (c.type !== "service") return false;
                        const matchesQ = [c.title, c.slug].join(" ").toLowerCase().includes(contentQ.toLowerCase());
                        const matchesS = contentStage === "all" || c.stage === contentStage;
                        return matchesQ && matchesS;
                      }).map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{c.title}</p>
                              <p className="text-sm text-gray-500">/{c.slug}</p>
                            </div>
                          </TableCell>
                          <TableCell>{c.region}</TableCell>
                          <TableCell>
                            <Badge className={cn("capitalize", contentClass[c.stage])}>
                              {c.stage.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{c.owner}</TableCell>
                          <TableCell className="text-sm text-gray-500">{dt(c.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : null}

            {activeView === "documents" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <CardDescription>Track collection and verification by client</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                    <div className="relative lg:col-span-8">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search client/company/document" value={documentQ} onChange={(e) => setDocumentQ(e.target.value)} />
                    </div>
                    <div className="lg:col-span-4">
                      <Select value={documentStatus} onValueChange={(v: "all" | DocumentStatus) => setDocumentStatus(v)}>
                        <SelectTrigger><SelectValue placeholder="Document Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="missing">Missing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {documentActionMessage ? <p className="text-xs text-emerald-700">{documentActionMessage}</p> : null}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.client}</TableCell>
                          <TableCell>{doc.company}</TableCell>
                          <TableCell><p>{doc.document}</p><p className="text-xs text-muted-foreground">{doc.category}</p></TableCell>
                          <TableCell><Badge className={cn("border", sourceClass[doc.source])}>{doc.source}</Badge></TableCell>
                          <TableCell><Badge className={cn("border capitalize", documentStatusClass[doc.status])}>{doc.status}</Badge></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(doc.updatedAt)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setDocumentState(doc.id, "verified")}>Verify</Button>
                              <Button size="sm" variant="destructive" onClick={() => setDocumentState(doc.id, "rejected")}>Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : null}

            {activeView === "quickbooks" ? (
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
                        <Select value={qbStatus} onValueChange={(v: "all" | QuickBooksStatus) => setQbStatus(v)}>
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
                        {qbUsers.map((u) => (
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
                      {quickBooksModules.map((mod) => (
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
            ) : null}

            {activeView === "compliance" ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Deadline Queue</CardTitle>
                    <CardDescription>Track all client compliance due dates and escalation owners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                      <div className="lg:col-span-6">
                        <Select value={complianceStatus} onValueChange={(v: "all" | ComplianceHealth) => setComplianceStatus(v)}>
                          <SelectTrigger><SelectValue placeholder="Risk level" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All risk levels</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="due_7d">Due in 7d</SelectItem>
                            <SelectItem value="due_21d">Due in 21d</SelectItem>
                            <SelectItem value="on_track">On track</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="lg:col-span-6">
                        <Select value={complianceRegion} onValueChange={(v: "all" | UserRegion) => setComplianceRegion(v)}>
                          <SelectTrigger><SelectValue placeholder="Region" /></SelectTrigger>
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

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Days Left</TableHead>
                          <TableHead>Health</TableHead>
                          <TableHead>Escalation Owner</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complianceRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.companyName}</p></TableCell>
                            <TableCell>{row.region}</TableCell>
                            <TableCell>{row.servicePlan}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{d(row.complianceDueAt)}</TableCell>
                            <TableCell className={cn("font-medium", row.dueInDays < 0 ? "text-red-600" : "text-gray-700")}>{row.dueInDays < 0 ? `${Math.abs(row.dueInDays)} days overdue` : `${row.dueInDays} days`}</TableCell>
                            <TableCell><Badge className={cn("border capitalize", complianceClass[row.health])}>{row.health.replace("_", " ")}</Badge></TableCell>
                            <TableCell>{row.escalationOwner}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Compliance Snapshot</CardTitle>
                    <CardDescription>Risk distribution for current filter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded border border-red-100 bg-red-50 p-3"><p className="text-xs text-red-700">Overdue</p><p className="text-xl font-semibold text-red-700">{complianceCounts.overdue}</p></div>
                    <div className="rounded border border-amber-100 bg-amber-50 p-3"><p className="text-xs text-amber-700">Due in 7 days</p><p className="text-xl font-semibold text-amber-700">{complianceCounts.due_7d}</p></div>
                    <div className="rounded border border-yellow-100 bg-yellow-50 p-3"><p className="text-xs text-yellow-700">Due in 21 days</p><p className="text-xl font-semibold text-yellow-700">{complianceCounts.due_21d}</p></div>
                    <div className="rounded border border-emerald-100 bg-emerald-50 p-3"><p className="text-xs text-emerald-700">On track</p><p className="text-xl font-semibold text-emerald-700">{complianceCounts.on_track}</p></div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
