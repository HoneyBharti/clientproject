export type ClientStatus =
  | "lead"
  | "active"
  | "awaiting_docs"
  | "compliance_risk"
  | "paused"
  | "closed";

export type QuickBooksStatus =
  | "connected"
  | "token_expired"
  | "sync_error"
  | "disconnected";

export type UserRegion =
  | "USA"
  | "UK"
  | "UAE"
  | "Singapore"
  | "India"
  | "Australia"
  | "Netherlands";

export type ServicePlan = "Starter" | "Growth" | "Scale";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  region: UserRegion;
  companyName: string;
  companyType: "LLC" | "C-Corp" | "Ltd" | "Pte Ltd";
  status: ClientStatus;
  servicePlan: ServicePlan;
  services: string[];
  quickBooksStatus: QuickBooksStatus;
  accountOwner: string;
  assignedAdmin: string;
  escalationOwner: string;
  nextSlaDueAt: string;
  complianceDueAt: string;
  lastActivityAt: string;
}

export type AssignmentPriority = "low" | "medium" | "high" | "critical";
export type AssignmentStatus =
  | "not_started"
  | "in_progress"
  | "awaiting_client"
  | "completed"
  | "overdue";

export interface AssignmentItem {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  category: "onboarding" | "bookkeeping" | "tax" | "compliance" | "support";
  status: AssignmentStatus;
  priority: AssignmentPriority;
  accountOwner: string;
  assignedAdmin: string;
  escalationOwner: string;
  slaDueAt: string;
}

export type ContentType = "blog" | "service";
export type ContentStage =
  | "draft"
  | "review"
  | "legal_review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  region: "Global" | UserRegion;
  stage: ContentStage;
  seoScore: number;
  owner: string;
  updatedAt: string;
  publishAt?: string;
}

export interface PipelineStage {
  key: string;
  label: string;
  count: number;
  colorClass: string;
}
