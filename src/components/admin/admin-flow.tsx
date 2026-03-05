"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardList,
  FileCheck2,
  FileText,
  LayoutDashboard,
  Link2,
  Newspaper,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
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

type AdminView = "overview" | "users" | "pages" | "blogs" | "services" | "documents" | "quickbooks" | "compliance";
type DocumentStatus = "pending" | "verified" | "rejected" | "missing";
type DocumentSource = "client_uploads" | "legal_docs";
type PageStage = "draft" | "review" | "published" | "archived";
type ComplianceHealth = "overdue" | "due_7d" | "due_21d" | "on_track";

const viewMeta: Record<AdminView, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "High-level operations, risk alerts, and QuickBooks health." },
  users: { title: "User Management", subtitle: "Client status, plans, and account activation controls." },
  pages: { title: "Pages", subtitle: "Manage key static pages and publishing workflow." },
  blogs: { title: "Blog Management", subtitle: "Editorial workflow for blog publishing." },
  services: { title: "Service Page Management", subtitle: "Control service landing content and publishing states." },
  documents: { title: "Documents", subtitle: "Track document intake, verification, and collection gaps." },
  quickbooks: { title: "QuickBooks Operations", subtitle: "Connection health and action queue for accounting sync." },
  compliance: { title: "Compliance Control", subtitle: "Deadline monitoring, risk levels, and escalation ownership." },
};

const navItems: Array<{ key: AdminView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "users", label: "User Management", icon: Users },
  { key: "pages", label: "Pages", icon: ClipboardList },
  { key: "blogs", label: "Blogs", icon: Newspaper },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "documents", label: "Documents", icon: FileCheck2 },
  { key: "quickbooks", label: "QuickBooks", icon: Link2 },
  { key: "compliance", label: "Compliance", icon: ShieldCheck },
];

const viewHref: Record<AdminView, string> = {
  overview: "/admin",
  users: "/admin/users",
  pages: "/admin/pages",
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

const pageStageClass: Record<PageStage, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  review: "bg-amber-100 text-amber-700 border-amber-200",
  published: "bg-emerald-100 text-emerald-700 border-emerald-200",
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

const pageQueue: Array<{ id: string; title: string; path: string; section: "Landing" | "Country" | "Support" | "Product"; stage: PageStage; owner: string; updatedAt: string }> = [
  { id: "pg_001", title: "Home", path: "/", section: "Landing", stage: "published", owner: "Content Team", updatedAt: "2026-03-02T10:20:00Z" },
  { id: "pg_002", title: "Products", path: "/products", section: "Product", stage: "review", owner: "Growth Team", updatedAt: "2026-03-02T16:00:00Z" },
  { id: "pg_003", title: "USA Market Page", path: "/usa", section: "Country", stage: "published", owner: "Regional Team", updatedAt: "2026-03-01T08:45:00Z" },
  { id: "pg_004", title: "UK Market Page", path: "/uk", section: "Country", stage: "published", owner: "Regional Team", updatedAt: "2026-03-01T09:05:00Z" },
  { id: "pg_005", title: "Australia Market Page", path: "/australia", section: "Country", stage: "review", owner: "Regional Team", updatedAt: "2026-03-03T05:30:00Z" },
  { id: "pg_006", title: "Contact Sales", path: "/support/contact-sales", section: "Support", stage: "published", owner: "Support Team", updatedAt: "2026-02-27T15:15:00Z" },
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

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }>; tone: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <Icon className={cn("h-5 w-5", tone)} />
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminFlow({ activeView = "overview" }: { activeView?: AdminView }) {
  const [userRecords, setUserRecords] = useState<AdminUser[]>(adminUsers);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");
  const [region, setRegion] = useState<"all" | UserRegion>("all");
  const [selectedId, setSelectedId] = useState(adminUsers[0]?.id ?? "");
  const [userActionMessage, setUserActionMessage] = useState("");

  const [pageQ, setPageQ] = useState("");
  const [pageStage, setPageStage] = useState<"all" | PageStage>("all");

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

  const filteredPages = useMemo(
    () =>
      pageQueue.filter((p) => {
        const matchesQ = [p.title, p.path, p.section].join(" ").toLowerCase().includes(pageQ.toLowerCase());
        const matchesStage = pageStage === "all" || p.stage === pageStage;
        return matchesQ && matchesStage;
      }),
    [pageQ, pageStage]
  );

  const filteredBlogs = useMemo(
    () =>
      contentQueue.filter((c) => {
        if (c.type !== "blog") return false;
        const matchesQ = [c.title, c.slug].join(" ").toLowerCase().includes(contentQ.toLowerCase());
        const matchesS = contentStage === "all" || c.stage === contentStage;
        return matchesQ && matchesS;
      }),
    [contentQ, contentStage]
  );

  const filteredServices = useMemo(
    () =>
      contentQueue.filter((c) => {
        if (c.type !== "service") return false;
        const matchesQ = [c.title, c.slug].join(" ").toLowerCase().includes(contentQ.toLowerCase());
        const matchesS = contentStage === "all" || c.stage === contentStage;
        return matchesQ && matchesS;
      }),
    [contentQ, contentStage]
  );

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
        <aside className="hidden w-72 flex-col border-r border-gray-200 bg-white lg:flex">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">YourLegal</p>
                <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.key;
              return (
                <Link
                  key={item.key}
                  href={viewHref[item.key]}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-gray-100 p-4 text-xs text-muted-foreground">Admin workspace v2</div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{viewMeta[activeView].title}</h1>
                <p className="text-sm text-muted-foreground">{viewMeta[activeView].subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {d(new Date().toISOString())}
                </Button>
                <Button size="sm" className="gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <Link
                    key={item.key}
                    href={viewHref[item.key]}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium whitespace-nowrap",
                      isActive ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-700"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </header>

          <main className="space-y-4 p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <StatCard label="Active Clients" value={metrics.active} icon={Users} tone="text-blue-600" />
              <StatCard label="QB Connected" value={`${metrics.qb}%`} icon={Link2} tone="text-emerald-600" />
              <StatCard label="QB Issues" value={metrics.qbIssues} icon={RefreshCw} tone="text-red-600" />
              <StatCard label="Compliance Due (21d)" value={metrics.complianceSoon} icon={CalendarDays} tone="text-amber-600" />
              <StatCard label="Docs Backlog" value={metrics.docsBacklog} icon={FileCheck2} tone="text-indigo-600" />
              <StatCard label="Content Pending" value={metrics.pending} icon={FileText} tone="text-violet-600" />
            </div>

            {activeView === "overview" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Client Pipeline</CardTitle>
                      <CardDescription>Lifecycle and workload visibility</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {pipelineStages.map((s) => (
                        <div key={s.key} className="flex items-center justify-between rounded-lg border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className={cn("rounded px-2 py-1 text-xs font-semibold", s.colorClass)}>{s.count}</span>
                            <span className="text-sm font-medium">{s.label}</span>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">QuickBooks Health</CardTitle>
                      <CardDescription>Connection quality across active users</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Connected ratio</span>
                          <span>{metrics.qb}%</span>
                        </div>
                        <Progress value={metrics.qb} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-md border p-2"><p className="text-muted-foreground">Connected</p><p className="font-semibold text-emerald-700">{qbBreakdown.connected}</p></div>
                        <div className="rounded-md border p-2"><p className="text-muted-foreground">Token Expired</p><p className="font-semibold text-amber-700">{qbBreakdown.token_expired}</p></div>
                        <div className="rounded-md border p-2"><p className="text-muted-foreground">Sync Error</p><p className="font-semibold text-red-700">{qbBreakdown.sync_error}</p></div>
                        <div className="rounded-md border p-2"><p className="text-muted-foreground">Disconnected</p><p className="font-semibold text-slate-700">{qbBreakdown.disconnected}</p></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Operational Alerts</CardTitle>
                      <CardDescription>Priority items requiring admin attention</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center justify-between rounded border border-red-100 bg-red-50 px-3 py-2">
                        <span className="flex items-center gap-2 text-red-700"><AlertTriangle className="h-4 w-4" />QB connection issues</span>
                        <span className="font-semibold">{metrics.qbIssues}</span>
                      </div>
                      <div className="flex items-center justify-between rounded border border-amber-100 bg-amber-50 px-3 py-2">
                        <span className="flex items-center gap-2 text-amber-700"><CalendarDays className="h-4 w-4" />Overdue compliance</span>
                        <span className="font-semibold">{metrics.overdueCompliance}</span>
                      </div>
                      <div className="flex items-center justify-between rounded border border-indigo-100 bg-indigo-50 px-3 py-2">
                        <span className="flex items-center gap-2 text-indigo-700"><FileCheck2 className="h-4 w-4" />Document backlog</span>
                        <span className="font-semibold">{metrics.docsBacklog}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-base">Recent Content Activity</CardTitle>
                      <CardDescription>Latest updates across blog and service content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Updated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentContent.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell><Badge variant="outline" className="capitalize">{item.type}</Badge></TableCell>
                              <TableCell className="font-medium">{item.title}</TableCell>
                              <TableCell><Badge className={cn("border capitalize", contentClass[item.stage])}>{item.stage.replace("_", " ")}</Badge></TableCell>
                              <TableCell className="text-sm text-muted-foreground">{dt(item.updatedAt)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : null}

            {activeView === "users" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>Browse users and control account activation status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                    <div className="relative lg:col-span-6">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search client/company/email" value={q} onChange={(e) => setQ(e.target.value)} />
                    </div>
                    <div className="lg:col-span-3">
                      <Select value={status} onValueChange={(v: "all" | ClientStatus) => setStatus(v)}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
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

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>QuickBooks</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((u) => (
                            <TableRow key={u.id} onClick={() => setSelectedId(u.id)} className="cursor-pointer" data-state={selected?.id === u.id ? "selected" : undefined}>
                              <TableCell><p className="font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.companyName}</p></TableCell>
                              <TableCell>{u.region}</TableCell>
                              <TableCell><Badge className={cn("border capitalize", qbClass[u.quickBooksStatus])}>{u.quickBooksStatus.replace("_", " ")}</Badge></TableCell>
                              <TableCell>{u.servicePlan}</TableCell>
                              <TableCell><Badge className={cn("border capitalize", clientStatusClass[u.status])}>{u.status.replace("_", " ")}</Badge></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-base">User Controls</CardTitle>
                        <CardDescription>Activate or deactivate selected user</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => setUserActivation(true)} disabled={!selected || selected.status === "active"}>Activate</Button>
                          <Button size="sm" variant="destructive" onClick={() => setUserActivation(false)} disabled={!selected || selected.status === "paused"}>Deactivate</Button>
                        </div>

                        {userActionMessage ? (
                          <p className={cn("text-xs", userActionMessage.includes("first") ? "text-red-600" : "text-emerald-600")}>{userActionMessage}</p>
                        ) : null}

                        {selected ? (
                          <div className="rounded bg-gray-50 p-3">
                            <p className="text-xs text-muted-foreground">Selected User</p>
                            <p className="font-medium text-gray-900">{selected.name} ({selected.id})</p>
                            <p className="text-xs text-muted-foreground">Current status: {selected.status}</p>
                            <p className="text-xs text-muted-foreground">Last activity: {dt(selected.lastActivityAt)}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No users for this filter.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {activeView === "pages" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pages Management</CardTitle>
                  <CardDescription>Track main pages across landing, country, support, and product sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                    <div className="relative lg:col-span-8">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search by title/path/section" value={pageQ} onChange={(e) => setPageQ(e.target.value)} />
                    </div>
                    <div className="lg:col-span-4">
                      <Select value={pageStage} onValueChange={(v: "all" | PageStage) => setPageStage(v)}>
                        <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All stages</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Path</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.title}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{p.path}</TableCell>
                          <TableCell>{p.section}</TableCell>
                          <TableCell><Badge className={cn("border capitalize", pageStageClass[p.stage])}>{p.stage}</Badge></TableCell>
                          <TableCell>{p.owner}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(p.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : null}

            {activeView === "blogs" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blog Management</CardTitle>
                  <CardDescription>Editorial workflow for blog publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                    <div className="relative lg:col-span-8">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search by title or slug" value={contentQ} onChange={(e) => setContentQ(e.target.value)} />
                    </div>
                    <div className="lg:col-span-4">
                      <Select value={contentStage} onValueChange={(v: "all" | ContentStage) => setContentStage(v)}>
                        <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
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
                      {filteredBlogs.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell><p className="font-medium">{c.title}</p><p className="text-xs text-muted-foreground">/{c.slug}</p></TableCell>
                          <TableCell>{c.region}</TableCell>
                          <TableCell><Badge className={cn("border capitalize", contentClass[c.stage])}>{c.stage.replace("_", " ")}</Badge></TableCell>
                          <TableCell>{c.owner}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(c.updatedAt)}</TableCell>
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
                  <CardTitle className="text-lg">Service Page Management</CardTitle>
                  <CardDescription>Manage service pages separately from blogs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                    <div className="relative lg:col-span-8">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search service title or slug" value={contentQ} onChange={(e) => setContentQ(e.target.value)} />
                    </div>
                    <div className="lg:col-span-4">
                      <Select value={contentStage} onValueChange={(v: "all" | ContentStage) => setContentStage(v)}>
                        <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
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
                      {filteredServices.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell><p className="font-medium">{c.title}</p><p className="text-xs text-muted-foreground">/{c.slug}</p></TableCell>
                          <TableCell>{c.region}</TableCell>
                          <TableCell><Badge className={cn("border capitalize", contentClass[c.stage])}>{c.stage.replace("_", " ")}</Badge></TableCell>
                          <TableCell>{c.owner}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(c.updatedAt)}</TableCell>
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
