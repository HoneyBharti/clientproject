"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  ChevronUp,
  ChevronDown,
  DollarSign,
  FileCheck2,
  History,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Menu,
  Package,
  PiggyBank,
  PenSquare,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import type { AdminUser, ClientStatus, ContentStage, QuickBooksStatus, UserRegion } from "@/components/admin/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ActivityView } from "@/components/admin/views/activity-view";
import { BlogsView } from "@/components/admin/views/blogs-view";
import { ClientDocumentsModal } from "@/components/admin/views/client-documents-modal";
import { ComplianceView } from "@/components/admin/views/compliance-view";
import { TaxesView } from "@/components/admin/views/taxes-view";
import { DocumentsView } from "@/components/admin/views/documents-view";
import { EmailsView } from "@/components/admin/views/emails-view";
import { FormationsView } from "@/components/admin/views/formations-view";
import { OrdersView } from "@/components/admin/views/orders-view";
import { OnboardingView } from "@/components/admin/views/onboarding-view";
import { OverviewView } from "@/components/admin/views/overview-view";
import { PaymentsView } from "@/components/admin/views/payments-view";
import { QuickbooksView } from "@/components/admin/views/quickbooks-view";
import { ReportsView } from "@/components/admin/views/reports-view";
import { ServicesView } from "@/components/admin/views/services-view";
import { SettingsView } from "@/components/admin/views/settings-view";
import { SubscriptionsView } from "@/components/admin/views/subscriptions-view";
import { TicketsView } from "@/components/admin/views/tickets-view";
import { UsersView } from "@/components/admin/views/users-view";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminData } from "@/hooks/useAdminData";
import { API_BASE_URL } from "@/lib/api-base";

type AdminView =
  | "overview"
  | "users"
  | "orders"
  | "onboarding"
  | "formations"
  | "documents"
  | "payments"
  | "subscriptions"
  | "tickets"
  | "emails"
  | "reports"
  | "activity"
  | "settings"
  | "blogs"
  | "services"
  | "quickbooks"
  | "compliance"
  | "taxes";
type DocumentStatus = "pending" | "verified" | "rejected" | "missing";
type DocumentSource = "client_uploads" | "legal_docs";
type DocumentCategory = "KYC" | "Tax" | "Compliance" | "Banking";
type ComplianceHealth = "overdue" | "due_7d" | "due_21d" | "on_track";
type OrderStatus = "pending" | "in_progress" | "waiting_documents" | "completed" | "cancelled";
type FormationStage = "application_received" | "documents_submitted" | "filed_with_government" | "approved" | "documents_delivered";
type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";
type PlanBilling = "one_time" | "monthly";
type CmsSection = "pricing" | "country_service" | "faq" | "blog" | "landing";

type OrderRecord = {
  id: string;
  userId: string;
  customerName: string;
  serviceType: string;
  country: UserRegion;
  status: OrderStatus;
  assignedStaff: string;
  paymentStatus: PaymentStatus;
  amount: number;
  documents: string;
  createdAt: string;
};

type FormationRecord = {
  id: string;
  companyName: string;
  country: UserRegion;
  formationType: string;
  userId: string;
  jurisdiction: string;
  stage: FormationStage;
  assignedAgent: string;
  ein?: string;
};

type PaymentRecord = {
  id: string;
  userId: string;
  userName: string;
  plan: string;
  amount: number;
  currency: string;
  stripePaymentId: string;
  status: PaymentStatus;
  date: string;
};

type PlanRecord = {
  id: string;
  name: string;
  pricing: number;
  billing: PlanBilling;
  features: string[];
  countries: UserRegion[];
  active: boolean;
};

type SupportTicket = {
  id: string;
  userName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  attachments: number;
  updatedAt: string;
};

type EmailLog = {
  id: string;
  type: string;
  user: string;
  status: "sent" | "failed";
  sentAt: string;
  to?: string;
  subject?: string;
  body?: string;
  template?: string;
};

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
};

type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullContent: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
};

type CmsRecord = {
  id: string;
  section: CmsSection;
  title: string;
  slug: string;
  updatedAt: string;
};

type ActivityLog = {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
};

type DashboardMetrics = {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  activeSubscriptions: number;
  pendingRequests: number;
  recentSignups: number;
  qbConnected: number;
  qbPercentage: number;
  totalRevenue: number;
  complianceRisk: number;
  awaitingDocs: number;
  activeIssues: number;
};

type DashboardSignup = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type DashboardPendingRequest = {
  id: string;
  customerName: string;
  serviceType: string;
  status: OrderStatus;
  createdAt: string;
};

type DashboardPayload = {
  stats: DashboardMetrics;
  recentSignupUsers: DashboardSignup[];
  pendingRequestItems: DashboardPendingRequest[];
  monthlyRevenueData: Array<{ month: string; revenue: number }>;
  ordersByCountryData: Array<{ country: string; count: number }>;
  userGrowthData: Array<{ month: string; users: number }>;
};

type LiveAdminUser = {
  id: string;
  name: string;
  email: string;
  companyName: string;
  region?: string;
  status: ClientStatus;
  servicePlan?: string;
  subscriptionStatus?: string;
  quickBooksConnected: boolean;
  quickBooksStatus: QuickBooksStatus;
  createdAt: string;
  lastActivityAt: string;
};

type LiveAdminPayment = {
  id: string;
  userId: string;
  plan: string;
  amount: number;
  stripePaymentId: string;
  status: PaymentStatus;
  createdAt: string;
  metadata?: Record<string, any>;
};

type LiveAdminDocument = {
  id: string;
  document: string;
  category: string;
  status: DocumentStatus;
  updatedAt: string;
  source: DocumentSource;
};

const viewMeta: Record<AdminView, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard", subtitle: "Business overview and quick metrics" },
  users: { title: "Users", subtitle: "Manage users, profiles, orders and payments" },
  orders: { title: "Orders", subtitle: "Track service requests and execution status" },
  onboarding: { title: "Onboarding", subtitle: "Review onboarding submissions before formation" },
  formations: { title: "Company Formations", subtitle: "Monitor formation progress by stage" },
  documents: { title: "Document Center", subtitle: "Track document collection and verification" },
  payments: { title: "Payments", subtitle: "Transactions, invoices, refunds and failures" },
  subscriptions: { title: "Subscriptions", subtitle: "Manage plans, pricing and availability" },
  tickets: { title: "Support Tickets", subtitle: "Respond to users and manage priorities" },
  emails: { title: "Emails", subtitle: "Templates, logs and resend controls" },
  reports: { title: "Reports", subtitle: "Revenue, growth and service analytics" },
  activity: { title: "Activity Logs", subtitle: "Audit trail of admin actions" },
  settings: { title: "Settings", subtitle: "Stripe, email, currency, tax and country settings" },
  blogs: { title: "Blog Posts", subtitle: "Legacy route: blog content queue" },
  services: { title: "Service Pages", subtitle: "Legacy route: service content queue" },
  quickbooks: { title: "QuickBooks Integration", subtitle: "Monitor accounting system connections" },
  compliance: { title: "Compliance Tracking", subtitle: "Monitor deadlines and risk levels" },
  taxes: { title: "Taxes & Filings", subtitle: "Manage government filings and submissions" },
};

const navItems: Array<{ key: AdminView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Users", icon: Users },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "onboarding", label: "Onboarding", icon: ClipboardList },
  { key: "formations", label: "Company Formations", icon: Building2 },
  { key: "documents", label: "Documents", icon: FileCheck2 },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "subscriptions", label: "Subscriptions", icon: Package },
  { key: "tickets", label: "Support Tickets", icon: LifeBuoy },
  { key: "emails", label: "Emails", icon: Mail },
  { key: "quickbooks", label: "QuickBooks", icon: ShieldCheck },
  { key: "compliance", label: "Compliance", icon: ShieldCheck },
  { key: "taxes", label: "Taxes & Filings", icon: PiggyBank },
  { key: "blogs", label: "Blog Posts", icon: PenSquare },
  { key: "services", label: "Service Pages", icon: Briefcase },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "activity", label: "Activity Logs", icon: History },
  { key: "settings", label: "Settings", icon: Settings },
];

const viewHref: Record<AdminView, string> = {
  overview: "/admin",
  users: "/admin/users",
  orders: "/admin/orders",
  onboarding: "/admin/onboarding",
  formations: "/admin/formations",
  payments: "/admin/payments",
  subscriptions: "/admin/subscriptions",
  tickets: "/admin/tickets",
  emails: "/admin/emails",
  reports: "/admin/reports",
  activity: "/admin/activity-logs",
  settings: "/admin/settings",
  blogs: "/admin/blogs",
  services: "/admin/services",
  documents: "/admin/documents",
  quickbooks: "/admin/quickbooks",
  compliance: "/admin/compliance",
  taxes: "/admin/taxes",
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
  category: DocumentCategory;
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

const orderStatusClass: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  waiting_documents: "bg-violet-100 text-violet-700 border-violet-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const paymentStatusClass: Record<PaymentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  succeeded: "bg-emerald-100 text-emerald-700 border-emerald-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  refunded: "bg-slate-100 text-slate-700 border-slate-200",
};

const formationStageClass: Record<FormationStage, string> = {
  application_received: "bg-sky-100 text-sky-700 border-sky-200",
  documents_submitted: "bg-indigo-100 text-indigo-700 border-indigo-200",
  filed_with_government: "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  documents_delivered: "bg-green-100 text-green-700 border-green-200",
};

const ticketStatusClass: Record<TicketStatus, string> = {
  open: "bg-red-100 text-red-700 border-red-200",
  in_progress: "bg-amber-100 text-amber-700 border-amber-200",
  resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
};

const ticketPriorityClass: Record<TicketPriority, string> = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-amber-100 text-amber-700 border-amber-200",
  urgent: "bg-red-100 text-red-700 border-red-200",
};

const initialOrders: OrderRecord[] = [
  {
    id: "ord_1001",
    userId: "usr_001",
    customerName: "Elena Vasquez",
    serviceType: "Register US LLC",
    country: "USA",
    status: "pending",
    assignedStaff: "Meera Patel",
    paymentStatus: "succeeded",
    amount: 899,
    documents: "Passport pending",
    createdAt: "2026-03-02T09:00:00Z",
  },
  {
    id: "ord_1002",
    userId: "usr_002",
    customerName: "Kenji Tanaka",
    serviceType: "Register UK Company",
    country: "UK",
    status: "waiting_documents",
    assignedStaff: "Ritika Shah",
    paymentStatus: "pending",
    amount: 799,
    documents: "Address proof missing",
    createdAt: "2026-03-01T10:30:00Z",
  },
  {
    id: "ord_1003",
    userId: "usr_003",
    customerName: "Priya Sinha",
    serviceType: "Bookkeeping",
    country: "Singapore",
    status: "in_progress",
    assignedStaff: "Kabir Nair",
    paymentStatus: "succeeded",
    amount: 299,
    documents: "All docs received",
    createdAt: "2026-02-27T15:00:00Z",
  },
  {
    id: "ord_1004",
    userId: "usr_004",
    customerName: "Omar Khalid",
    serviceType: "Tax filing",
    country: "UAE",
    status: "completed",
    assignedStaff: "Ari Sharma",
    paymentStatus: "succeeded",
    amount: 499,
    documents: "Filed",
    createdAt: "2026-02-24T12:00:00Z",
  },
  {
    id: "ord_1005",
    userId: "usr_005",
    customerName: "Rohan Mehta",
    serviceType: "Register US LLC",
    country: "India",
    status: "cancelled",
    assignedStaff: "Meera Patel",
    paymentStatus: "refunded",
    amount: 899,
    documents: "Cancelled by customer",
    createdAt: "2026-02-20T11:00:00Z",
  },
];

const initialFormations: FormationRecord[] = [
  {
    id: "frm_2001",
    companyName: "Acme Innovations LLC",
    country: "USA",
    formationType: "LLC",
    userId: "usr_001",
    jurisdiction: "Delaware",
    stage: "documents_submitted",
    assignedAgent: "Daniel Roy",
  },
  {
    id: "frm_2002",
    companyName: "Northbridge Labs Ltd",
    country: "UK",
    formationType: "Ltd",
    userId: "usr_002",
    jurisdiction: "England",
    stage: "application_received",
    assignedAgent: "Ari Sharma",
  },
  {
    id: "frm_2003",
    companyName: "DesertGrid FZ LLC",
    country: "UAE",
    formationType: "Free Zone LLC",
    userId: "usr_004",
    jurisdiction: "Dubai",
    stage: "filed_with_government",
    assignedAgent: "Nikhil Rao",
  },
  {
    id: "frm_2004",
    companyName: "FluxPay Pte Ltd",
    country: "Singapore",
    formationType: "Pte Ltd",
    userId: "usr_003",
    jurisdiction: "Singapore",
    stage: "approved",
    assignedAgent: "Ananya Verma",
  },
];

const initialPayments: PaymentRecord[] = [
  { id: "pay_3001", userId: "usr_001", userName: "Elena Vasquez", plan: "US Formation Premium", amount: 899, currency: "USD", stripePaymentId: "pi_3A1001", status: "succeeded", date: "2026-03-02T09:10:00Z" },
  { id: "pay_3002", userId: "usr_002", userName: "Kenji Tanaka", plan: "UK Formation Basic", amount: 799, currency: "USD", stripePaymentId: "pi_3A1002", status: "pending", date: "2026-03-01T10:40:00Z" },
  { id: "pay_3003", userId: "usr_003", userName: "Priya Sinha", plan: "Bookkeeping Monthly", amount: 299, currency: "USD", stripePaymentId: "pi_3A1003", status: "succeeded", date: "2026-02-27T15:10:00Z" },
  { id: "pay_3004", userId: "usr_004", userName: "Omar Khalid", plan: "Tax Filing Package", amount: 499, currency: "USD", stripePaymentId: "pi_3A1004", status: "failed", date: "2026-02-25T12:10:00Z" },
  { id: "pay_3005", userId: "usr_005", userName: "Rohan Mehta", plan: "US Formation Basic", amount: 899, currency: "USD", stripePaymentId: "pi_3A1005", status: "refunded", date: "2026-02-20T11:10:00Z" },
];

const initialPlans: PlanRecord[] = [
  { id: "pln_1", name: "US Formation Basic", pricing: 699, billing: "one_time", features: ["LLC filing", "Registered agent"], countries: ["USA"], active: true },
  { id: "pln_2", name: "US Formation Premium", pricing: 999, billing: "one_time", features: ["LLC filing", "EIN support", "Operating agreement"], countries: ["USA"], active: true },
  { id: "pln_3", name: "Bookkeeping Monthly", pricing: 299, billing: "monthly", features: ["Monthly bookkeeping", "P&L report"], countries: ["USA", "UK", "UAE", "Singapore", "India", "Australia", "Netherlands"], active: true },
  { id: "pln_4", name: "Tax Filing Package", pricing: 499, billing: "one_time", features: ["Tax filing", "Compliance review"], countries: ["USA", "UK"], active: true },
];

const initialTickets: SupportTicket[] = [
  { id: "tic_4001", userName: "Elena Vasquez", subject: "Need help with EIN", status: "open", priority: "high", attachments: 1, updatedAt: "2026-03-03T08:45:00Z" },
  { id: "tic_4002", userName: "Kenji Tanaka", subject: "Upload issue for address proof", status: "in_progress", priority: "urgent", attachments: 2, updatedAt: "2026-03-02T12:10:00Z" },
  { id: "tic_4003", userName: "Priya Sinha", subject: "Invoice mismatch", status: "resolved", priority: "medium", attachments: 0, updatedAt: "2026-03-01T10:00:00Z" },
];

const initialEmailLogs: EmailLog[] = [
  { id: "eml_1", type: "Signup confirmation", user: "Elena Vasquez", status: "sent", sentAt: "2026-03-03T08:00:00Z" },
  { id: "eml_2", type: "Order confirmation", user: "Kenji Tanaka", status: "sent", sentAt: "2026-03-02T10:00:00Z" },
  { id: "eml_3", type: "Document request", user: "Omar Khalid", status: "failed", sentAt: "2026-03-01T15:00:00Z" },
];

const initialEmailTemplates: EmailTemplate[] = [
  { id: "tmp_1", name: "Signup confirmation", subject: "Welcome to YourLegal", body: "Thanks for signing up. Your account is now active." },
  { id: "tmp_2", name: "Order completion", subject: "Your order is complete", body: "Your service request has been completed successfully." },
];

const initialCmsRecords: CmsRecord[] = [
  { id: "cms_1", section: "pricing", title: "US Pricing Page", slug: "/pricing/usa", updatedAt: "2026-03-03T08:00:00Z" },
  { id: "cms_2", section: "country_service", title: "UK Company Formation", slug: "/uk/company-formation", updatedAt: "2026-03-02T09:00:00Z" },
  { id: "cms_3", section: "faq", title: "Global FAQ", slug: "/faq", updatedAt: "2026-03-01T10:00:00Z" },
  { id: "cms_4", section: "blog", title: "US Compliance Guide", slug: "/blog/us-compliance-guide", updatedAt: "2026-03-01T07:00:00Z" },
  { id: "cms_5", section: "landing", title: "Founders Landing", slug: "/landing/founders", updatedAt: "2026-02-28T11:00:00Z" },
];

const initialActivityLogs: ActivityLog[] = [
  { id: "act_1", action: "Admin updated order status", actor: "Ari Sharma", createdAt: "2026-03-03T08:30:00Z" },
  { id: "act_2", action: "Admin refunded payment", actor: "Meera Patel", createdAt: "2026-03-02T16:20:00Z" },
  { id: "act_3", action: "Admin updated user status", actor: "Ritika Shah", createdAt: "2026-03-02T12:10:00Z" },
];

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
  const router = useRouter();
  const { checkAuth } = useAuth();
  const adminData = useAdminData();
  const [userRecords, setUserRecords] = useState<AdminUser[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");
  const [region, setRegion] = useState<"all" | UserRegion>("all");
  const [selectedId, setSelectedId] = useState("");
  const [userActionMessage, setUserActionMessage] = useState("");
  const [isUserDocumentModalOpen, setIsUserDocumentModalOpen] = useState(false);
  const [adminUploadFile, setAdminUploadFile] = useState<File | null>(null);
  const [adminUploadFileInputKey, setAdminUploadFileInputKey] = useState(0);
  const [adminUploadDocumentName, setAdminUploadDocumentName] = useState("");
  const [adminUploadDocumentCategory, setAdminUploadDocumentCategory] = useState<DocumentCategory>("Compliance");
  const [adminUploadMessage, setAdminUploadMessage] = useState("");

  const [contentQ, setContentQ] = useState("");
  const [contentStage, setContentStage] = useState<"all" | ContentStage>("all");

  const [documentRecords, setDocumentRecords] = useState<typeof initialDocumentQueue>([]);
  const [documentQ, setDocumentQ] = useState("");
  const [documentStatus, setDocumentStatus] = useState<"all" | DocumentStatus>("all");
  const [documentActionMessage, setDocumentActionMessage] = useState("");

  const [qbQ, setQbQ] = useState("");
  const [qbStatus, setQbStatus] = useState<"all" | QuickBooksStatus>("all");
  const [selectedQbId, setSelectedQbId] = useState("");
  const [qbActionMessage, setQbActionMessage] = useState("");

  const [complianceStatus, setComplianceStatus] = useState<"all" | ComplianceHealth>("all");
  const [complianceRegion, setComplianceRegion] = useState<"all" | UserRegion>("all");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [orderQ, setOrderQ] = useState("");
  const [orderStatus, setOrderStatus] = useState<"all" | OrderStatus>("all");

  const [formations, setFormations] = useState<FormationRecord[]>([]);
  const [formationQ, setFormationQ] = useState("");
  const [formationStage, setFormationStage] = useState<"all" | FormationStage>("all");

  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<"all" | PaymentStatus>("all");

  const [plans, setPlans] = useState<PlanRecord[]>([]);
  const [editingPlanId, setEditingPlanId] = useState("");
  const [planForm, setPlanForm] = useState({
    name: "",
    pricing: "",
    billing: "one_time" as PlanBilling,
    features: "",
    countries: "USA",
    active: true,
  });

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketStatus, setTicketStatus] = useState<"all" | TicketStatus>("all");
  const [ticketPriority, setTicketPriority] = useState<"all" | TicketPriority>("all");
  const [ticketReply, setTicketReply] = useState("");

  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(initialEmailTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialEmailTemplates[0]?.id ?? "");
  const [templateSubject, setTemplateSubject] = useState(initialEmailTemplates[0]?.subject ?? "");
  const [templateBody, setTemplateBody] = useState(initialEmailTemplates[0]?.body ?? "");

  const [blogs, setBlogs] = useState<BlogRecord[]>([]);

  const [cmsRecords, setCmsRecords] = useState<CmsRecord[]>([]);
  const [cmsSection, setCmsSection] = useState<"all" | CmsSection>("all");
  const [cmsQ, setCmsQ] = useState("");

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [activityQ, setActivityQ] = useState("");

  const [systemSettings, setSystemSettings] = useState({
    stripePublishableKey: "pk_test_xxxxxxxxxxxx",
    stripeSecretKey: "sk_test_xxxxxxxxxxxx",
    emailService: "SendGrid",
    currency: "USD",
    taxRate: "8.50",
    countryAvailability: {
      USA: true,
      UK: true,
      UAE: true,
      Singapore: true,
      India: true,
      Australia: true,
      Netherlands: true,
    } as Record<UserRegion, boolean>,
  });
  const [settingsMessage, setSettingsMessage] = useState("");
  const [dashboardPayload, setDashboardPayload] = useState<DashboardPayload | null>(null);
  const [isDashboardMetricsLoading, setIsDashboardMetricsLoading] = useState(true);
  const [dashboardMetricsError, setDashboardMetricsError] = useState("");
  const [liveUsers, setLiveUsers] = useState<LiveAdminUser[] | null>(null);
  const [livePayments, setLivePayments] = useState<LiveAdminPayment[]>([]);
  const [liveUserDocuments, setLiveUserDocuments] = useState<Record<string, LiveAdminDocument[]>>({});
  const [isUsersDataLoading, setIsUsersDataLoading] = useState(true);
  const [usersDataError, setUsersDataError] = useState("");

  const formatServiceType = useCallback((value?: string) => {
    if (!value) return "Service";
    return value
      .replace(/_/g, "-")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, []);

  const mapOrderStatusFromBackend = useCallback((status?: string): OrderStatus => {
    switch (status) {
      case "confirmed":
        return "waiting_documents";
      case "in_progress":
        return "in_progress";
      case "completed":
        return "completed";
      case "cancelled":
      case "refunded":
        return "cancelled";
      case "pending":
      default:
        return "pending";
    }
  }, []);

  const mapOrderStatusToBackend = useCallback((status: OrderStatus) => {
    switch (status) {
      case "waiting_documents":
        return "confirmed";
      case "in_progress":
        return "in_progress";
      case "completed":
        return "completed";
      case "cancelled":
        return "cancelled";
      case "pending":
      default:
        return "pending";
    }
  }, []);

  const mapFormationStatusFromBackend = useCallback((status?: string): FormationStage => {
    switch (status) {
      case "processing":
      case "documents_required":
        return "documents_submitted";
      case "filed":
        return "filed_with_government";
      case "approved":
        return "approved";
      case "completed":
        return "documents_delivered";
      case "pending":
      default:
        return "application_received";
    }
  }, []);

  const mapFormationStageToBackend = useCallback((stage: FormationStage) => {
    switch (stage) {
      case "documents_submitted":
        return "processing";
      case "filed_with_government":
        return "filed";
      case "approved":
        return "approved";
      case "documents_delivered":
        return "completed";
      case "application_received":
      default:
        return "pending";
    }
  }, []);

  const mapTicketStatusFromBackend = useCallback((status?: string): TicketStatus => {
    switch (status) {
      case "in_progress":
      case "waiting_customer":
        return "in_progress";
      case "resolved":
        return "resolved";
      case "closed":
        return "closed";
      case "open":
      default:
        return "open";
    }
  }, []);

  const mapTicketStatusToBackend = useCallback((status: TicketStatus) => {
    switch (status) {
      case "in_progress":
        return "in_progress";
      case "resolved":
        return "resolved";
      case "closed":
        return "closed";
      case "open":
      default:
        return "open";
    }
  }, []);

  const normalizeEmailStatus = useCallback(
    (status?: string): "sent" | "failed" => (status === "sent" ? "sent" : "failed"),
    []
  );

  useEffect(() => {
    adminData.loadOrders();
    adminData.loadOnboardingSubmissions();
    adminData.loadFormations();
    adminData.loadTickets();
    adminData.loadServices();
    adminData.loadEmails();
    adminData.loadBlogs();
    adminData.loadSettings();
    adminData.loadCompliance();
    adminData.loadActivityLogs();
  }, [
    adminData.loadBlogs,
    adminData.loadCompliance,
    adminData.loadActivityLogs,
    adminData.loadEmails,
    adminData.loadFormations,
    adminData.loadOnboardingSubmissions,
    adminData.loadOrders,
    adminData.loadServices,
    adminData.loadSettings,
    adminData.loadTickets,
  ]);

  const handleAdminLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");
    setMobileMenuOpen(false);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to log out from admin. Please try again.");
      }

      await checkAuth();
      router.replace("/login");
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Unable to log out from admin. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const loadAdminDashboardMetrics = async () => {
    setIsDashboardMetricsLoading(true);
    setDashboardMetricsError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        credentials: "include",
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to load live admin dashboard data.");
      }

      setDashboardPayload({
        stats: data.stats,
        recentSignupUsers: data.recentSignupUsers || [],
        pendingRequestItems: data.pendingRequestItems || [],
        monthlyRevenueData: data.monthlyRevenueData || [],
        ordersByCountryData: data.ordersByCountryData || [],
        userGrowthData: data.userGrowthData || [],
      });
    } catch (error) {
      setDashboardPayload(null);
      setDashboardMetricsError(error instanceof Error ? error.message : "Unable to load live admin dashboard data.");
    } finally {
      setIsDashboardMetricsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminDashboardMetrics();
  }, []);

  const loadAdminUsersData = async () => {
    setIsUsersDataLoading(true);
    setUsersDataError("");

    try {
      const [usersResponse, paymentsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/users`, {
          credentials: "include",
        }),
        fetch(`${API_BASE_URL}/payment/all`, {
          credentials: "include",
        }),
      ]);

      const usersData = await usersResponse.json().catch(() => null);
      const paymentsData = await paymentsResponse.json().catch(() => null);

      if (!usersResponse.ok || !usersData?.success) {
        throw new Error(usersData?.message || "Unable to load users from backend.");
      }

      const normalizedUsers: LiveAdminUser[] = (usersData.users || []).map((user: any) => ({
        id: String(user._id),
        name: user.name,
        email: user.email,
        companyName: user.companyName || "N/A",
        region: user.region,
        status: user.status || "lead",
        servicePlan: user.servicePlan || "N/A",
        subscriptionStatus: user.subscriptionStatus,
        quickBooksConnected: Boolean(user.quickBooksConnected),
        quickBooksStatus: user.quickBooksConnected ? "connected" : "disconnected",
        createdAt: user.createdAt,
        lastActivityAt: user.createdAt,
      }));

      setLiveUsers(normalizedUsers);

      if (paymentsResponse.ok && paymentsData?.success) {
        const normalizedPayments: LiveAdminPayment[] = (paymentsData.payments || []).map((payment: any) => ({
          id: String(payment._id),
          userId: String(payment.user?._id || payment.user),
          plan: payment.plan || "N/A",
          amount: Number(payment.amount || 0),
          stripePaymentId: payment.stripePaymentId,
          status: payment.status,
          createdAt: payment.createdAt,
          metadata: payment.metadata || {},
        }));
        setLivePayments(normalizedPayments);
      } else {
        setLivePayments([]);
      }
    } catch (error) {
      setLiveUsers(null);
      setLivePayments([]);
      setUsersDataError(error instanceof Error ? error.message : "Unable to load users from backend.");
    } finally {
      setIsUsersDataLoading(false);
    }
  };

  useEffect(() => {
    loadAdminUsersData();
  }, []);

  useEffect(() => {
    if (adminData.orders.length === 0) {
      setOrders([]);
      return;
    }

    const mapped = adminData.orders.map((order: any) => ({
      id: String(order._id || order.id),
      userId: String(order.user?._id || order.user || ""),
      customerName: order.user?.name || "Unknown",
      serviceType: formatServiceType(order.serviceType || order.plan),
      country: (order.metadata?.country || order.user?.region || "USA") as UserRegion,
      status: mapOrderStatusFromBackend(order.status),
      assignedStaff: order.assignedTo?.name || "Unassigned",
      paymentStatus: (order.payment?.status || "pending") as PaymentStatus,
      amount: Number(order.amount || 0),
      documents: String(order.deliverables?.length || 0),
      createdAt: order.createdAt,
    }));

    setOrders(mapped);
  }, [adminData.orders, formatServiceType, mapOrderStatusFromBackend]);

  useEffect(() => {
    if (adminData.formations.length === 0) {
      setFormations([]);
      return;
    }

    const mapped = adminData.formations.map((formation: any) => ({
      id: String(formation._id || formation.id),
      companyName: formation.companyName,
      country: (formation.country || "USA") as UserRegion,
      formationType: formation.entityType || "LLC",
      userId: String(formation.user?._id || formation.user || ""),
      jurisdiction: formation.state || "N/A",
      stage: mapFormationStatusFromBackend(formation.status),
      assignedAgent: formation.assignedTo?.name || "Unassigned",
      ein: formation.ein || "",
    }));

    setFormations(mapped);
  }, [adminData.formations, mapFormationStatusFromBackend]);

  useEffect(() => {
    if (adminData.tickets.length === 0) {
      setTickets([]);
      return;
    }

    const mapped = adminData.tickets.map((ticket: any) => ({
      id: String(ticket._id || ticket.id),
      userName: ticket.user?.name || "Unknown",
      subject: ticket.subject,
      status: mapTicketStatusFromBackend(ticket.status),
      priority: ticket.priority || "low",
      attachments: ticket.attachments?.length || 0,
      updatedAt: ticket.updatedAt || ticket.createdAt,
    }));

    setTickets(mapped);
  }, [adminData.tickets, mapTicketStatusFromBackend]);

  useEffect(() => {
    if (adminData.emails.length === 0) {
      setEmailLogs([]);
      return;
    }

    const mapped = adminData.emails.map((email: any) => ({
      id: String(email._id || email.id),
      type: email.template || email.subject || "Email",
      user: email.user?.name || email.to || "Unknown",
      status: normalizeEmailStatus(email.status),
      sentAt: email.sentAt || email.createdAt,
      to: email.to,
      subject: email.subject,
      body: email.body,
      template: email.template,
    }));

    setEmailLogs(mapped);
  }, [adminData.emails, normalizeEmailStatus]);

  useEffect(() => {
    if (adminData.blogs.length === 0) {
      setBlogs([]);
      return;
    }

    const mapped = adminData.blogs.map((blog: any) => {
      const authorValue =
        typeof blog.author === "string"
          ? blog.author
          : blog.author?.name || blog.author?.email || blog.author?._id || "Admin";

      return {
        id: String(blog._id || blog.id),
        title: blog.title,
        slug: blog.slug,
        image: blog.featuredImage || blog.image || `https://placehold.co/160x96/e2e8f0/0f172a?text=${encodeURIComponent(String(blog.title || "Blog").slice(0, 24))}`,
        shortDescription: blog.excerpt || blog.shortDescription || "",
        fullContent: blog.content || blog.fullContent || "",
        author: authorValue,
        category: blog.category || "General",
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        status: blog.status === "published" ? "published" : "draft",
        createdAt: blog.createdAt || blog.updatedAt || new Date().toISOString(),
      };
    });

    setBlogs(mapped);
  }, [adminData.blogs]);

  useEffect(() => {
    const userLookup = new Map((liveUsers || []).map((user) => [user.id, user]));
    if (livePayments.length === 0) {
      setPayments([]);
      return;
    }

    const mapped = livePayments.map((payment) => ({
      id: payment.id,
      userId: payment.userId,
      userName: userLookup.get(payment.userId)?.name || "Unknown",
      plan: payment.plan || "N/A",
      amount: Number(payment.amount || 0),
      currency: "USD",
      stripePaymentId: payment.stripePaymentId,
      status: payment.status,
      date: payment.createdAt,
    }));

    setPayments(mapped);
  }, [livePayments, liveUsers]);

  useEffect(() => {
    if (!adminData.settings.length) {
      return;
    }

    const settingsMap = new Map(adminData.settings.map((setting: any) => [setting.key, setting.value]));
    const countryAvailabilityValue = settingsMap.get("countryAvailability");

    setSystemSettings((prev) => ({
      ...prev,
      stripePublishableKey: settingsMap.get("stripePublishableKey") ?? prev.stripePublishableKey,
      stripeSecretKey: settingsMap.get("stripeSecretKey") ?? prev.stripeSecretKey,
      emailService: settingsMap.get("emailService") ?? prev.emailService,
      currency: settingsMap.get("currency") ?? prev.currency,
      taxRate: String(settingsMap.get("taxRate") ?? prev.taxRate),
      countryAvailability: {
        ...prev.countryAvailability,
        ...(countryAvailabilityValue && typeof countryAvailabilityValue === "object" ? countryAvailabilityValue : {}),
      },
    }));

    const storedPlans = settingsMap.get("plans");
    if (Array.isArray(storedPlans)) {
      setPlans(storedPlans as PlanRecord[]);
    }
  }, [adminData.settings]);

  useEffect(() => {
    if (!liveUsers?.length) return;
    if (!selectedId) {
      setSelectedId(liveUsers[0].id);
    }
    if (!selectedQbId) {
      setSelectedQbId(liveUsers[0].id);
    }
  }, [liveUsers, selectedId, selectedQbId]);

  const metricsUsers = liveUsers ?? userRecords;

  const metrics = useMemo(() => {
    const active = metricsUsers.filter((u) => u.status === "active").length;
    const totalUsers = metricsUsers.length;
    const totalOrders = orders.length;
    const activeSubscriptions = metricsUsers.filter((u) => u.status === "active").length;
    const totalRevenue = payments
      .filter((payment) => payment.status === "succeeded")
      .reduce((sum, payment) => sum + payment.amount, 0);
    const pendingRequests =
      orders.filter((order) => order.status === "pending" || order.status === "waiting_documents").length +
      tickets.filter((ticket) => ticket.status === "open" || ticket.status === "in_progress").length;
    const recentSignups = Math.min(6, metricsUsers.length);
    const qb = metricsUsers.length ? Math.round((metricsUsers.filter((u) => u.quickBooksStatus === "connected").length / metricsUsers.length) * 100) : 0;
    const complianceSoon = metricsUsers.filter((u: any) => isDueSoon(u.complianceDueAt || u.createdAt, 21)).length;
    const pending = blogs.filter((blog) => blog.status !== "published").length;
    const qbIssues = metricsUsers.filter((u) => u.quickBooksStatus !== "connected").length;
    const docsBacklog = documentRecords.filter((doc) => doc.status !== "verified").length;
    const overdueCompliance = metricsUsers.filter((u: any) => daysUntil(u.complianceDueAt || u.createdAt) < 0).length;
    return {
      active,
      totalUsers,
      totalOrders,
      activeSubscriptions,
      totalRevenue,
      pendingRequests,
      recentSignups,
      qb,
      complianceSoon,
      pending,
      qbIssues,
      docsBacklog,
      overdueCompliance,
    };
  }, [blogs, documentRecords, metricsUsers, orders, payments, tickets]);

  const recentSignupUsers = useMemo(
    () =>
      [...(metricsUsers as any[])].sort(
        (a, b) => new Date(b.lastActivityAt || b.createdAt).getTime() - new Date(a.lastActivityAt || a.createdAt).getTime()
      ).slice(0, 6),
    [metricsUsers]
  );

  const resolvedMetrics = dashboardPayload?.stats ?? metrics;
  const resolvedRecentSignupUsers = dashboardPayload?.recentSignupUsers ?? recentSignupUsers;
  const resolvedPendingRequestItems = dashboardPayload?.pendingRequestItems ?? [];

  const monthlyRevenueData = useMemo(
    () => [
      { month: "Oct", revenue: 28000 },
      { month: "Nov", revenue: 32400 },
      { month: "Dec", revenue: 37200 },
      { month: "Jan", revenue: 40100 },
      { month: "Feb", revenue: 43800 },
      { month: "Mar", revenue: 47200 },
    ],
    []
  );

  const ordersByCountryData = useMemo(() => {
    const map = new Map<UserRegion, number>();
    orders.forEach((order) => {
      map.set(order.country, (map.get(order.country) || 0) + 1);
    });
    return Array.from(map.entries()).map(([country, count]) => ({ country, count }));
  }, [orders]);

  const userGrowthData = useMemo(
    () => [
      { month: "Oct", users: 32 },
      { month: "Nov", users: 41 },
      { month: "Dec", users: 49 },
      { month: "Jan", users: 58 },
      { month: "Feb", users: 66 },
      { month: "Mar", users: 74 },
    ],
    []
  );

  const resolvedMonthlyRevenueData = dashboardPayload ? dashboardPayload.monthlyRevenueData : monthlyRevenueData;
  const resolvedOrdersByCountryData = dashboardPayload ? dashboardPayload.ordersByCountryData : ordersByCountryData;
  const resolvedUserGrowthData = dashboardPayload ? dashboardPayload.userGrowthData : userGrowthData;

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

  const usersForUsersView = useMemo(() => {
    if (!liveUsers) {
      return [];
    }

    return liveUsers.filter((u) => {
      const matchesQ = [u.name, u.companyName, u.email].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchesS = status === "all" || u.status === status;
      const matchesR = region === "all" || u.region === region;
      return matchesQ && matchesS && matchesR;
    });
  }, [liveUsers, q, region, status]);

  const selectedUserForUsersView = useMemo(
    () => usersForUsersView.find((u) => u.id === selectedId) ?? usersForUsersView[0],
    [selectedId, usersForUsersView]
  );

  const selectedClient = (liveUsers ? selectedUserForUsersView : undefined) ?? userRecords.find((u) => u.id === selectedId);

  useEffect(() => {
    if (!usersForUsersView.length) return;
    if (!usersForUsersView.some((user) => user.id === selectedId)) {
      setSelectedId(usersForUsersView[0].id);
    }
  }, [selectedId, usersForUsersView]);

  const loadUserDocuments = useCallback(
    async (userId: string, force = false) => {
      if (!userId) return;
      if (!force && liveUserDocuments[userId]) return;

      try {
        const response = await fetch(`${API_BASE_URL}/documents/admin/user/${userId}`, {
          credentials: "include",
        });
        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || "Unable to load user documents.");
        }

        const normalizedDocuments: LiveAdminDocument[] = (data.documents || []).map((document: any) => ({
          id: String(document.id || document._id),
          document: document.name,
          category: document.source === "client_uploads" ? "Client Upload" : "Admin Upload",
          status: document.status,
          updatedAt: document.updatedAt || document.uploadedAt,
          source: document.source,
        }));

        setLiveUserDocuments((prev) => ({
          ...prev,
          [userId]: normalizedDocuments,
        }));
      } catch {
        setLiveUserDocuments((prev) => ({
          ...prev,
          [userId]: [],
        }));
      }
    },
    [liveUserDocuments]
  );

  useEffect(() => {
    if (!liveUsers?.length) return;
    const missingUsers = liveUsers.filter((user) => !liveUserDocuments[user.id]);
    if (!missingUsers.length) return;
    Promise.allSettled(missingUsers.map((user) => loadUserDocuments(user.id)));
  }, [liveUsers, liveUserDocuments, loadUserDocuments]);

  useEffect(() => {
    if (!selectedUserForUsersView?.id) return;
    loadUserDocuments(selectedUserForUsersView.id);
  }, [loadUserDocuments, selectedUserForUsersView?.id]);

  useEffect(() => {
    if (!liveUsers?.length) {
      setDocumentRecords([]);
      return;
    }

    const userMap = new Map(liveUsers.map((user) => [user.id, user]));
    const nextRecords = Object.entries(liveUserDocuments).flatMap(([userId, docs]) => {
      const user = userMap.get(userId);
      if (!docs?.length) return [];
      return docs.map((doc) => ({
        id: String(doc.id),
        client: user?.name || "Unknown",
        company: user?.companyName || "N/A",
        document: doc.document,
        category: (doc.source === "client_uploads" ? "KYC" : "Compliance") as DocumentCategory,
        source: doc.source,
        status: doc.status,
        updatedAt: doc.updatedAt,
      }));
    });

    nextRecords.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setDocumentRecords(nextRecords);
  }, [liveUserDocuments, liveUsers]);

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
      (liveUsers || userRecords)
        .filter((u) => {
          const matchesQ = [u.name, u.companyName, u.email].join(" ").toLowerCase().includes(qbQ.toLowerCase());
          const matchesS = qbStatus === "all" || u.quickBooksStatus === qbStatus;
          return matchesQ && matchesS;
        })
        .map((u: any) => ({
          ...u,
          accountOwner: u.accountOwner || "N/A",
        })),
    [qbQ, qbStatus, liveUsers, userRecords]
  );

  const selectedQbUser = qbUsers.find((u) => u.id === selectedQbId) ?? qbUsers[0];

  const complianceRows = useMemo(() => {
    if (!adminData.complianceData || !liveUsers?.length) {
      return [];
    }

    const usersById = new Map(liveUsers.map((user) => [user.id, user]));
    const riskUsers = adminData.complianceData.complianceRiskUsers || [];
    const awaitingUsers = adminData.complianceData.awaitingDocsUsers || [];
    const pendingDocuments = adminData.complianceData.pendingDocuments || [];
    const pendingFormations = adminData.complianceData.pendingFormations || [];

    const documentDates = new Map<string, Date[]>();
    pendingDocuments.forEach((doc: any) => {
      const userId = String(doc.user?._id || doc.user || "");
      if (!userId) return;
      const date = new Date(doc.createdAt || doc.updatedAt || doc.uploadedAt || Date.now());
      documentDates.set(userId, [...(documentDates.get(userId) || []), date]);
    });

    const formationDates = new Map<string, Date[]>();
    pendingFormations.forEach((formation: any) => {
      const userId = String(formation.user?._id || formation.user || "");
      if (!userId) return;
      const date = new Date(formation.createdAt || formation.updatedAt || Date.now());
      formationDates.set(userId, [...(formationDates.get(userId) || []), date]);
    });

    const candidateIds = new Set<string>([
      ...riskUsers.map((user: any) => String(user._id)),
      ...awaitingUsers.map((user: any) => String(user._id)),
      ...documentDates.keys(),
      ...formationDates.keys(),
    ]);

    const rows = Array.from(candidateIds).map((userId) => {
      const liveUser = usersById.get(userId);
      const complianceUser = riskUsers.find((user: any) => String(user._id) === userId)
        || awaitingUsers.find((user: any) => String(user._id) === userId);

      const userName = liveUser?.name || complianceUser?.name || "Unknown";
      const companyName = liveUser?.companyName || complianceUser?.companyName || "N/A";
      const region = (liveUser?.region || complianceUser?.region || "USA") as UserRegion;
      const servicePlan = liveUser?.servicePlan || "N/A";

      const docDates = documentDates.get(userId) || [];
      const formDates = formationDates.get(userId) || [];
      const rawDate =
        [...docDates, ...formDates].sort((a, b) => a.getTime() - b.getTime())[0]
        || (liveUser?.createdAt ? new Date(liveUser.createdAt) : new Date());

      const complianceDueAt = rawDate.toISOString();
      const dueInDays = daysUntil(complianceDueAt);
      let health: ComplianceHealth = dueInDays < 0 ? "overdue" : dueInDays <= 7 ? "due_7d" : dueInDays <= 21 ? "due_21d" : "on_track";

      if (complianceUser?.status === "compliance_risk") {
        health = "overdue";
      } else if (complianceUser?.status === "awaiting_docs" && health === "on_track") {
        health = "due_7d";
      }

      return {
        id: userId,
        name: userName,
        companyName,
        region,
        servicePlan,
        complianceDueAt,
        dueInDays,
        health,
        escalationOwner: "N/A",
      };
    });

    return rows
      .filter((row) => {
        const matchesStatus = complianceStatus === "all" || row.health === complianceStatus;
        const matchesRegion = complianceRegion === "all" || row.region === complianceRegion;
        return matchesStatus && matchesRegion;
      })
      .sort((a, b) => a.dueInDays - b.dueInDays);
  }, [adminData.complianceData, complianceRegion, complianceStatus, liveUsers]);

  const complianceCounts = useMemo(
    () => ({
      overdue: complianceRows.filter((row) => row.health === "overdue").length,
      due_7d: complianceRows.filter((row) => row.health === "due_7d").length,
      due_21d: complianceRows.filter((row) => row.health === "due_21d").length,
      on_track: complianceRows.filter((row) => row.health === "on_track").length,
    }),
    [complianceRows]
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesQ = [order.id, order.customerName, order.serviceType, order.country].join(" ").toLowerCase().includes(orderQ.toLowerCase());
        const matchesS = orderStatus === "all" || order.status === orderStatus;
        return matchesQ && matchesS;
      }),
    [orderQ, orderStatus, orders]
  );

  const filteredFormations = useMemo(
    () =>
      formations.filter((formation) => {
        const matchesQ = [formation.companyName, formation.formationType, formation.jurisdiction].join(" ").toLowerCase().includes(formationQ.toLowerCase());
        const matchesS = formationStage === "all" || formation.stage === formationStage;
        return matchesQ && matchesS;
      }),
    [formationQ, formationStage, formations]
  );

  const filteredPayments = useMemo(
    () => payments.filter((payment) => paymentStatus === "all" || payment.status === paymentStatus),
    [paymentStatus, payments]
  );

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const matchesStatus = ticketStatus === "all" || ticket.status === ticketStatus;
        const matchesPriority = ticketPriority === "all" || ticket.priority === ticketPriority;
        return matchesStatus && matchesPriority;
      }),
    [ticketPriority, ticketStatus, tickets]
  );

  const selectedUserOrders = useMemo(
    () => {
      if (liveUsers && selectedUserForUsersView) {
        return livePayments
          .filter((payment) => payment.userId === selectedUserForUsersView.id)
          .map((payment) => ({
            id: payment.id,
            userId: payment.userId,
            customerName: selectedUserForUsersView.name,
            serviceType: payment.plan || payment.metadata?.serviceId || payment.metadata?.entityType || "Service request",
            status:
              payment.status === "pending"
                ? "pending"
                : payment.status === "succeeded"
                  ? "completed"
                  : payment.status === "failed"
                    ? "cancelled"
                    : "cancelled",
            createdAt: payment.createdAt,
          }));
      }

      return selected ? orders.filter((order) => order.userId === selected.id) : [];
    },
    [livePayments, liveUsers, orders, selected, selectedUserForUsersView]
  );

  const selectedUserPayments = useMemo(
    () => {
      if (liveUsers && selectedUserForUsersView) {
        return livePayments
          .filter((payment) => payment.userId === selectedUserForUsersView.id)
          .map((payment) => ({
            id: payment.id,
            plan: payment.plan,
            amount: payment.amount,
            stripePaymentId: payment.stripePaymentId,
            status: payment.status,
            createdAt: payment.createdAt,
          }));
      }

      return selected ? payments.filter((payment) => payment.userId === selected.id) : [];
    },
    [livePayments, liveUsers, payments, selected, selectedUserForUsersView]
  );

  const selectedUserDocuments = useMemo(
    () => {
      if (liveUsers && selectedUserForUsersView) {
        return liveUserDocuments[selectedUserForUsersView.id] || [];
      }

      return selected ? filteredDocuments.filter((document) => document.client === selected.name) : [];
    },
    [filteredDocuments, liveUserDocuments, liveUsers, selected, selectedUserForUsersView]
  );

  const selectedClientDocuments = useMemo(
    () => (selectedClient ? documentRecords.filter((document) => document.client === selectedClient.name) : []),
    [documentRecords, selectedClient]
  );

  const selectedClientUploadedDocuments = useMemo(
    () => selectedClientDocuments.filter((document) => document.source === "client_uploads"),
    [selectedClientDocuments]
  );

  const selectedClientAdminDocuments = useMemo(
    () => selectedClientDocuments.filter((document) => document.source === "legal_docs"),
    [selectedClientDocuments]
  );

  const activeCmsSection = activeView === "blogs" ? "blog" : activeView === "services" ? "country_service" : cmsSection;
  const filteredCmsRecords = useMemo(
    () =>
      cmsRecords.filter((record) => {
        const matchesQ = [record.title, record.slug, record.section].join(" ").toLowerCase().includes(cmsQ.toLowerCase());
        const matchesSection = activeCmsSection === "all" || record.section === activeCmsSection;
        return matchesQ && matchesSection;
      }),
    [activeCmsSection, cmsQ, cmsRecords]
  );

  const filteredActivityLogs = useMemo(
    () => activityLogs.filter((log) => [log.action, log.actor].join(" ").toLowerCase().includes(activityQ.toLowerCase())),
    [activityLogs, activityQ]
  );

  useEffect(() => {
    if (!adminData.activityLogs?.length) return;
    setActivityLogs((prev) => {
      if (!prev.length) {
        return adminData.activityLogs.map((log: any) => ({
          id: String(log._id || log.id),
          action: log.action,
          actor: log.user?.name || log.user?.email || "System",
          createdAt: log.createdAt,
        }));
      }
      return prev;
    });
  }, [adminData.activityLogs]);

  const revenueByCountry = useMemo(() => {
    const map = new Map<UserRegion, number>();
    orders.forEach((order) => {
      map.set(order.country, (map.get(order.country) || 0) + order.amount);
    });
    return Array.from(map.entries()).map(([country, revenue]) => ({ country, revenue }));
  }, [orders]);

  const servicePopularity = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((order) => {
      map.set(order.serviceType, (map.get(order.serviceType) || 0) + 1);
    });
    return Array.from(map.entries()).map(([service, count]) => ({ service, count }));
  }, [orders]);

  const addActivity = (action: string, entity: string = "settings", entityId?: string) => {
    const entry: ActivityLog = {
      id: `act_${Date.now()}`,
      action,
      actor: "Admin",
      createdAt: new Date().toISOString(),
    };
    setActivityLogs((prev) => [entry, ...prev].slice(0, 60));
    fetch(`${API_BASE_URL}/activity-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action, entity, entityId }),
    })
      .then(() => adminData.loadActivityLogs())
      .catch(() => null);
  };

  const setUserActivation = async (activate: boolean) => {
    const targetUser = liveUsers ? selectedUserForUsersView : selected;

    if (!targetUser) {
      setUserActionMessage("Select a user first.");
      return;
    }

    const nextStatus: ClientStatus = activate ? "active" : "paused";

    if (liveUsers) {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/users/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: targetUser.id, status: nextStatus }),
        });
        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || "Unable to update user status.");
        }

        setLiveUsers((prev) =>
          prev
            ? prev.map((user) =>
                user.id === targetUser.id
                  ? {
                      ...user,
                      status: data.user.status || nextStatus,
                      servicePlan: data.user.servicePlan || user.servicePlan,
                      region: data.user.region || user.region,
                      companyName: data.user.companyName || user.companyName,
                      quickBooksConnected: Boolean(data.user.quickBooksConnected),
                      quickBooksStatus: data.user.quickBooksConnected ? "connected" : "disconnected",
                    }
                  : user
              )
            : prev
        );

        setUserActionMessage(activate ? `${targetUser.name} activated.` : `${targetUser.name} deactivated.`);
        addActivity(activate ? `Activated user ${targetUser.name}` : `Deactivated user ${targetUser.name}`);
        loadAdminDashboardMetrics();
        return;
      } catch (error) {
        setUserActionMessage(error instanceof Error ? error.message : "Unable to update user status.");
        return;
      }
    }

    const nowIso = new Date().toISOString();

    setUserRecords((prev) =>
      prev.map((u) =>
        u.id === targetUser.id
          ? {
              ...u,
              status: nextStatus,
              lastActivityAt: nowIso,
            }
          : u
      )
    );

    setUserActionMessage(activate ? `${targetUser.name} activated.` : `${targetUser.name} deactivated.`);
    addActivity(activate ? `Activated user ${targetUser.name}` : `Deactivated user ${targetUser.name}`);
  };

  const resetUserPassword = () => {
    const targetUser = liveUsers ? selectedUserForUsersView : selected;

    if (!targetUser) {
      setUserActionMessage("Select a user first.");
      return;
    }
    if (liveUsers) {
      setUserActionMessage("Password reset endpoint is not configured in the backend yet.");
      return;
    }
    setUserActionMessage(`Password reset email sent to ${targetUser.email}.`);
    addActivity(`Sent password reset to ${targetUser.email}`);
  };

  const selectUser = (userId: string) => {
    setSelectedId(userId);
    setUserActionMessage("");
  };

  const openUserDocumentModal = (userId: string) => {
    selectUser(userId);
    setAdminUploadFile(null);
    setAdminUploadFileInputKey((prev) => prev + 1);
    setAdminUploadDocumentName("");
    setAdminUploadDocumentCategory("Compliance");
    setAdminUploadMessage("");
    setIsUserDocumentModalOpen(true);
  };

  const openDocumentModalForClient = (clientName: string) => {
    const client = (liveUsers || userRecords).find((user) => user.name === clientName);
    if (!client) {
      setDocumentActionMessage(`Client ${clientName} not found in user records.`);
      return;
    }
    openUserDocumentModal(client.id);
  };

  const readFileAsBase64 = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read file contents."));
        }
      };
      reader.onerror = () => reject(new Error("Unable to read file contents."));
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadDocumentForSelectedClient = async () => {
    if (!selectedClient) {
      setAdminUploadMessage("Select a client first.");
      return;
    }
    if (!adminUploadFile) {
      setAdminUploadMessage("Choose a file to upload.");
      return;
    }

    const uploadedFileName = adminUploadFile.name;
    try {
      const fileDataBase64 = await readFileAsBase64(adminUploadFile);
      const response = await fetch(`${API_BASE_URL}/documents/admin/user/${selectedClient.id}/upload-official`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fileName: adminUploadDocumentName.trim() || uploadedFileName,
          mimeType: adminUploadFile.type || "application/octet-stream",
          fileDataBase64,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to upload document.");
      }

      await loadUserDocuments(selectedClient.id, true);
      setAdminUploadFile(null);
      setAdminUploadFileInputKey((prev) => prev + 1);
      setAdminUploadDocumentName("");
      setAdminUploadMessage(`File "${uploadedFileName}" uploaded for ${selectedClient.name}.`);
      addActivity(`Uploaded file ${uploadedFileName} for ${selectedClient.name}`);
    } catch (error) {
      setAdminUploadMessage(error instanceof Error ? error.message : "Unable to upload document.");
    }
  };

  const setDocumentState = async (documentId: string, nextStatus: DocumentStatus) => {
    const target = documentRecords.find((doc) => doc.id === documentId);
    if (!target) return;
    if (target.source !== "client_uploads") {
      setDocumentActionMessage("Only client uploaded documents can be reviewed.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/documents/admin/${documentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to update document status.");
      }

      if (target) {
        await loadUserDocuments(
          (liveUsers || userRecords).find((user) => user.name === target.client)?.id || "",
          true
        );
      }
      setDocumentActionMessage(`Document status updated to ${nextStatus.replace("_", " ")}.`);
      addActivity(`Updated document ${documentId} to ${nextStatus}`);
    } catch (error) {
      setDocumentActionMessage(error instanceof Error ? error.message : "Unable to update document status.");
    }
  };

  const setQuickBooksStateForSelected = (nextStatus: QuickBooksStatus) => {
    if (!selectedQbUser) {
      setQbActionMessage("Select a client record first.");
      return;
    }

    const nowIso = new Date().toISOString();
    if (liveUsers) {
      setLiveUsers((prev) =>
        prev
          ? prev.map((u) =>
              u.id === selectedQbUser.id
                ? {
                    ...u,
                    quickBooksStatus: nextStatus,
                    lastActivityAt: nowIso,
                  }
                : u
            )
          : prev
      );
    } else {
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
    }

    setQbActionMessage(`${selectedQbUser.name}: QuickBooks marked as ${nextStatus.replace("_", " ")}.`);
    addActivity(`QuickBooks status updated for ${selectedQbUser.name}`);
  };

  const updateOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
    const backendStatus = mapOrderStatusToBackend(nextStatus);
    const result = await adminData.updateOrder(orderId, { status: backendStatus });
    if (result.success) {
      addActivity(`Order ${orderId} moved to ${nextStatus.replace("_", " ")}`);
    }
  };

  const updateFormationStage = async (formationId: string, nextStage: FormationStage) => {
    const backendStage = mapFormationStageToBackend(nextStage);
    const result = await adminData.updateFormation(formationId, { status: backendStage });
    if (result.success) {
      addActivity(`Formation ${formationId} stage updated`);
    }
  };

  const updateFormationEin = async (formationId: string, ein: string) => {
    const trimmed = ein.trim();
    const result = await adminData.updateFormation(formationId, { ein: trimmed });
    if (result.success) {
      addActivity(`Formation ${formationId} EIN updated`);
    }
  };

  const refundPayment = (paymentId: string) => {
    setPayments((prev) => prev.map((payment) => (payment.id === paymentId ? { ...payment, status: "refunded" } : payment)));
    addActivity(`Refunded payment ${paymentId}`);
  };

  const persistPlans = async (nextPlans: PlanRecord[]) => {
    const result = await adminData.updateSetting({
      key: "plans",
      value: nextPlans,
      category: "general",
      description: "Admin subscription plans",
    });
    if (!result.success) {
      setSettingsMessage(result.error || "Unable to save plans.");
      return false;
    }
    adminData.loadSettings();
    return true;
  };

  const savePlan = async () => {
    if (!planForm.name.trim()) return;
    const features = planForm.features.split(",").map((value) => value.trim()).filter(Boolean);
    const countries = planForm.countries
      .split(",")
      .map((value) => value.trim())
      .filter((value): value is UserRegion => ["USA", "UK", "UAE", "Singapore", "India", "Australia", "Netherlands"].includes(value));

    let nextPlans: PlanRecord[] = [];

    if (editingPlanId) {
      nextPlans = plans.map((plan) =>
        plan.id === editingPlanId
          ? {
              ...plan,
              name: planForm.name,
              pricing: Number(planForm.pricing || 0),
              billing: planForm.billing,
              features,
              countries,
              active: planForm.active,
            }
          : plan
      );
      addActivity(`Updated plan ${planForm.name}`);
    } else {
      nextPlans = [
        {
          id: `pln_${Date.now()}`,
          name: planForm.name,
          pricing: Number(planForm.pricing || 0),
          billing: planForm.billing,
          features,
          countries,
          active: planForm.active,
        },
        ...plans,
      ];
      addActivity(`Created plan ${planForm.name}`);
    }

    setPlans(nextPlans);
    await persistPlans(nextPlans);

    setEditingPlanId("");
    setPlanForm({ name: "", pricing: "", billing: "one_time", features: "", countries: "USA", active: true });
  };

  const editPlan = (plan: PlanRecord) => {
    setEditingPlanId(plan.id);
    setPlanForm({
      name: plan.name,
      pricing: String(plan.pricing),
      billing: plan.billing,
      features: plan.features.join(", "),
      countries: plan.countries.join(", "),
      active: plan.active,
    });
  };

  const deletePlan = async (planId: string) => {
    const nextPlans = plans.filter((plan) => plan.id !== planId);
    setPlans(nextPlans);
    addActivity(`Deleted plan ${planId}`);
    await persistPlans(nextPlans);
  };

  const updateTicketStatus = async (ticketId: string, nextStatus: TicketStatus) => {
    const backendStatus = mapTicketStatusToBackend(nextStatus);
    const result = await adminData.updateTicket(ticketId, { status: backendStatus });
    if (result.success) {
      addActivity(`Updated ticket ${ticketId}`);
    }
  };

  const replyTicket = async (ticketId: string) => {
    const message = ticketReply.trim();
    if (!message) return;
    setTicketReply("");
    const result = await adminData.addTicketMessage(ticketId, message, false);
    if (result.success) {
      addActivity(`Replied to ticket ${ticketId}`);
    }
  };

  const resendEmail = async (emailId: string) => {
    const target = emailLogs.find((entry) => entry.id === emailId);
    if (!target) return;

    const emailPayload = {
      to: target.to || target.user,
      subject: target.subject || target.type,
      body: target.body || "",
      template: target.template,
    };

    if (!emailPayload.to || !emailPayload.subject || !emailPayload.body) {
      addActivity(`Unable to resend email ${emailId}: missing email data`);
      return;
    }

    const result = await adminData.sendEmail(emailPayload);
    if (result.success) {
      addActivity(`Resent email ${emailId}`);
      adminData.loadEmails();
    }
  };

  const onTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = emailTemplates.find((entry) => entry.id === templateId);
    if (!template) return;
    setTemplateSubject(template.subject);
    setTemplateBody(template.body);
  };

  const saveTemplate = () => {
    setEmailTemplates((prev) =>
      prev.map((template) => (template.id === selectedTemplateId ? { ...template, subject: templateSubject, body: templateBody } : template))
    );
    addActivity(`Updated email template ${selectedTemplateId}`);
  };

  const updateCmsRecord = (recordId: string, nextTitle: string) => {
    setCmsRecords((prev) => prev.map((record) => (record.id === recordId ? { ...record, title: nextTitle, updatedAt: new Date().toISOString() } : record)));
    addActivity(`Updated CMS record ${recordId}`);
  };

  const saveSettings = async () => {
    setSettingsMessage("");
    const updates = [
      { key: "stripePublishableKey", value: systemSettings.stripePublishableKey, category: "payment" },
      { key: "stripeSecretKey", value: systemSettings.stripeSecretKey, category: "payment" },
      { key: "emailService", value: systemSettings.emailService, category: "email" },
      { key: "currency", value: systemSettings.currency, category: "general" },
      { key: "taxRate", value: systemSettings.taxRate, category: "general" },
      { key: "countryAvailability", value: systemSettings.countryAvailability, category: "general" },
    ];

    const results = await Promise.all(updates.map((setting) => adminData.updateSetting(setting)));
    const hasError = results.some((result) => !result.success);

    if (hasError) {
      setSettingsMessage("Some settings failed to save. Please retry.");
      return;
    }

    setSettingsMessage("System settings saved successfully.");
    addActivity("Updated system settings");
    adminData.loadSettings();
  };

  const viewCtx = {
    StatCard,
    metrics: resolvedMetrics,
    monthlyRevenueData: resolvedMonthlyRevenueData,
    ordersByCountryData: resolvedOrdersByCountryData,
    userGrowthData: resolvedUserGrowthData,
    filteredOrders,
    orderStatusClass,
    onboardingSubmissions: adminData.onboardingSubmissions,
    onboardingLoading: adminData.onboardingLoading,
    loadOnboardingSubmissions: adminData.loadOnboardingSubmissions,
    createFormationFromOnboarding: adminData.createFormationFromOnboarding,
    recentSignupUsers: resolvedRecentSignupUsers,
    pendingRequestItems: resolvedPendingRequestItems,
    activityLogs,
    d,
    dt,
    q,
    setQ,
    status,
    setStatus,
    region,
    setRegion,
    users: usersForUsersView,
    usersLoading: isUsersDataLoading,
    usersError: usersDataError,
    selectUser,
    openUserDocumentModal,
    selected: selectedUserForUsersView,
    qbClass,
    clientStatusClass,
    setUserActivation,
    resetUserPassword,
    userActionMessage,
    selectedUserOrders,
    selectedUserPayments,
    selectedUserDocuments,
    documentStatusClass,
    orderQ,
    setOrderQ,
    orderStatus,
    setOrderStatus,
    paymentStatusClass,
    updateOrderStatus,
    formationQ,
    setFormationQ,
    formationStage,
    setFormationStage,
    filteredFormations,
    updateFormationStage,
    updateFormationEin,
    paymentStatus,
    setPaymentStatus,
    filteredPayments,
    userRecords: liveUsers ?? userRecords,
    refundPayment,
    addActivity,
    planForm,
    setPlanForm,
    savePlan,
    editingPlanId,
    plans,
    editPlan,
    deletePlan,
    ticketStatus,
    setTicketStatus,
    ticketPriority,
    setTicketPriority,
    filteredTickets,
    ticketPriorityClass,
    updateTicketStatus,
    replyTicket,
    ticketReply,
    setTicketReply,
    emailLogs,
    resendEmail,
    emailTemplates,
    selectedTemplateId,
    onTemplateChange,
    templateSubject,
    setTemplateSubject,
    templateBody,
    setTemplateBody,
    saveTemplate,
    cmsQ,
    setCmsQ,
    activeCmsSection,
    setCmsSection,
    filteredCmsRecords,
    updateCmsRecord,
    blogs,
    createBlog: adminData.createBlog,
    updateBlog: adminData.updateBlog,
    deleteBlog: adminData.deleteBlog,
    services: adminData.services,
    createService: adminData.createService,
    updateService: adminData.updateService,
    deleteService: adminData.deleteService,
    revenueByCountry,
    servicePopularity,
    payments,
    activityQ,
    setActivityQ,
    filteredActivityLogs,
    systemSettings,
    setSystemSettings,
    settingsMessage,
    contentQ,
    setContentQ,
    contentStage,
    setContentStage,
    contentClass,
    documentQ,
    setDocumentQ,
    documentStatus,
    setDocumentStatus,
    documentActionMessage,
    filteredDocuments,
    sourceClass,
    setDocumentState,
    openDocumentModalForClient,
    qbQ,
    setQbQ,
    qbStatus,
    setQbStatus,
    qbUsers,
    setSelectedQbId,
    selectedQbUser,
    setQuickBooksStateForSelected,
    qbActionMessage,
    quickBooksModules,
    complianceStatus,
    setComplianceStatus,
    complianceRegion,
    setComplianceRegion,
    complianceRows,
    complianceClass,
    complianceCounts,
    isUserDocumentModalOpen,
    setIsUserDocumentModalOpen,
    setAdminUploadFile,
    setAdminUploadFileInputKey,
    setAdminUploadDocumentName,
    setAdminUploadMessage,
    selectedClient,
    adminUploadFileInputKey,
    adminUploadDocumentName,
    adminUploadDocumentCategory,
    setAdminUploadDocumentCategory,
    uploadDocumentForSelectedClient,
    adminUploadFile,
    adminUploadMessage,
    selectedClientUploadedDocuments,
    selectedClientAdminDocuments,
    saveSettings,
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
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm"
                  size="sm"
                  variant="outline"
                  onClick={handleAdminLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>

            {/* Remove the mobile navigation tabs since we now have hamburger menu */}
          </header>

          {logoutError ? (
            <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {logoutError}
            </div>
          ) : null}

          {dashboardMetricsError ? (
            <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
              {dashboardMetricsError}
            </div>
          ) : null}

          <main className="p-2 sm:p-4">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              <StatCard label="Total Users" value={isDashboardMetricsLoading ? "..." : resolvedMetrics.totalUsers} icon={Users} tone="text-blue-600" />
              <StatCard label="Total Orders" value={isDashboardMetricsLoading ? "..." : resolvedMetrics.totalOrders} icon={ClipboardList} tone="text-indigo-600" />
              <StatCard label="Active Subscriptions" value={isDashboardMetricsLoading ? "..." : resolvedMetrics.activeSubscriptions} icon={Package} tone="text-emerald-600" />
              <StatCard
                label="Revenue"
                value={isDashboardMetricsLoading ? "..." : `$${resolvedMetrics.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                tone="text-green-600"
              />
              <StatCard label="Pending Requests" value={isDashboardMetricsLoading ? "..." : resolvedMetrics.pendingRequests} icon={AlertTriangle} tone="text-amber-600" />
              <StatCard label="Recent Signups" value={isDashboardMetricsLoading ? "..." : resolvedMetrics.recentSignups} icon={TrendingUp} tone="text-cyan-600" />
            </div>

            {activeView === "overview" ? <OverviewView ctx={viewCtx} /> : null}
            {activeView === "users" ? <UsersView ctx={viewCtx} /> : null}
            {activeView === "orders" ? <OrdersView ctx={viewCtx} /> : null}
            {activeView === "onboarding" ? <OnboardingView ctx={viewCtx} /> : null}
            {activeView === "formations" ? <FormationsView ctx={viewCtx} /> : null}
            {activeView === "payments" ? <PaymentsView ctx={viewCtx} /> : null}
            {activeView === "subscriptions" ? <SubscriptionsView ctx={viewCtx} /> : null}
            {activeView === "tickets" ? <TicketsView ctx={viewCtx} /> : null}
            {activeView === "emails" ? <EmailsView ctx={viewCtx} /> : null}
            {activeView === "reports" ? <ReportsView ctx={viewCtx} /> : null}
            {activeView === "activity" ? <ActivityView ctx={viewCtx} /> : null}
            {activeView === "settings" ? <SettingsView ctx={viewCtx} /> : null}
            {activeView === "blogs" ? <BlogsView ctx={viewCtx} /> : null}
            {activeView === "services" ? <ServicesView ctx={viewCtx} /> : null}
            {activeView === "documents" ? <DocumentsView ctx={viewCtx} /> : null}
            {activeView === "quickbooks" ? <QuickbooksView ctx={viewCtx} /> : null}
            {activeView === "taxes" ? <TaxesView ctx={viewCtx} /> : null}
            {activeView === "compliance" ? <ComplianceView ctx={viewCtx} /> : null}

            <ClientDocumentsModal ctx={viewCtx} />
          </main>
        </div>
      </div>
    </div>
  );
}


