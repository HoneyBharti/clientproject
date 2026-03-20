
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api-base";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

const COMPLIANCE_API_BASE = `${API_BASE_URL}/admin/compliance`;

const statusStyles: Record<string, string> = {
  upcoming: "bg-slate-100 text-slate-700 border-slate-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  documents_requested: "bg-amber-100 text-amber-700 border-amber-200",
  filed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  overdue: "bg-red-100 text-red-700 border-red-200",
};

const fetchJson = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};

export function ComplianceView({ ctx }: { ctx: AdminViewContext }) {
  const [activeTab, setActiveTab] = useState<"overview" | "rules" | "events" | "tasks">("overview");
  const [rules, setRules] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ruleMessage, setRuleMessage] = useState("");
  const [seedMessage, setSeedMessage] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [manualMessage, setManualMessage] = useState("");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestingEventId, setRequestingEventId] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("all");
  const [eventSort, setEventSort] = useState("due_asc");
  const [companyFilter, setCompanyFilter] = useState("all");

  const [ruleForm, setRuleForm] = useState({
    name: "",
    description: "",
    jurisdiction: "federal",
    state: "",
    frequency: "annual",
    dueRuleType: "fixed_date",
    dueMonth: "",
    dueDay: "",
    dueMonths: "",
    entityTypes: "",
    createTaxFiling: false,
    filingName: "",
    filingType: "",
    applyToExisting: false,
  });
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  const [taskForm, setTaskForm] = useState({
    eventId: "",
    taskName: "",
    assignedTo: "",
    status: "pending",
    dueDate: "",
    notes: "",
  });

  const [manualForm, setManualForm] = useState({
    companyId: "",
    name: "",
    description: "",
    jurisdiction: "federal",
    state: "",
    dueDate: "",
    status: "upcoming",
    notes: "",
    assignedAdmin: "",
  });

  const loadRules = async () => {
    const data = await fetchJson(`${COMPLIANCE_API_BASE}/rules`);
    setRules(data.rules || []);
  };

  const loadEvents = async () => {
    const data = await fetchJson(`${COMPLIANCE_API_BASE}/events`);
    setEvents(data.events || []);
  };

  const loadTasks = async () => {
    const data = await fetchJson(`${COMPLIANCE_API_BASE}/tasks`);
    setTasks(data.tasks || []);
  };

  const loadFormations = async () => {
    const data = await fetchJson(`${API_BASE_URL}/formations?limit=200`);
    setFormations(data.formations || []);
  };

  const loadAdminUsers = async () => {
    const data = await fetchJson(`${API_BASE_URL}/admin/admin-users`);
    setAdminUsers(data.users || []);
  };

  const loadAll = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await Promise.all([loadRules(), loadEvents(), loadTasks(), loadFormations(), loadAdminUsers()]);
    } catch (error: any) {
      setErrorMessage(error?.message || "Unable to load compliance data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!manualForm.companyId) return;
    const formation = formations.find((item) => item._id === manualForm.companyId);
    if (!formation) return;
    if (manualForm.jurisdiction === "state") {
      const nextState = formation.state || "";
      if (manualForm.state !== nextState) {
        setManualForm((prev) => ({ ...prev, state: nextState }));
      }
    } else if (manualForm.state) {
      setManualForm((prev) => ({ ...prev, state: "" }));
    }
  }, [manualForm.companyId, manualForm.jurisdiction, manualForm.state, formations]);

  const resolveClientName = (event: any) =>
    event.company?.companyName || event.user?.companyName || event.user?.name || "Unknown";

  const resolveCompanyKey = (event: any) => {
    if (event.company?._id) return String(event.company._id);
    if (event.company) return String(event.company);
    if (event.user?._id) return String(event.user._id);
    if (event.user) return String(event.user);
    return "";
  };

  const companyOptions = useMemo(() => {
    const options = new Map<string, string>();
    events.forEach((event) => {
      const key = resolveCompanyKey(event);
      const label = resolveClientName(event);
      if (!key || !label) return;
      if (!options.has(key)) {
        options.set(key, label);
      }
    });
    return Array.from(options.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [events]);

  const formationOptions = useMemo(() => {
    return formations
      .map((formation) => ({
        id: formation._id,
        label: `${formation.companyName || "Company"} · ${formation.user?.email || formation.user?.name || "User"}`,
        state: formation.state,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [formations]);

  const companyFilteredEvents = useMemo(() => {
    if (companyFilter === "all") return events;
    return events.filter((event) => resolveCompanyKey(event) === companyFilter);
  }, [events, companyFilter]);

  const complianceStats = useMemo(() => {
    const now = new Date();
    const upcoming = companyFilteredEvents.filter((event) => new Date(event.dueDate) >= now && event.status !== "completed").length;
    const dueThisWeek = companyFilteredEvents.filter((event) => {
      const diff = (new Date(event.dueDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7 && event.status !== "completed";
    }).length;
    const overdue = companyFilteredEvents.filter((event) => event.status === "overdue").length;
    const inProgress = companyFilteredEvents.filter((event) => event.status === "in_progress" || event.status === "documents_requested").length;
    return { upcoming, dueThisWeek, overdue, inProgress };
  }, [companyFilteredEvents]);

  const filteredEvents = useMemo(() => {
    if (eventStatusFilter === "all") return companyFilteredEvents;
    return companyFilteredEvents.filter((event) => event.status === eventStatusFilter);
  }, [companyFilteredEvents, eventStatusFilter]);

  const sortEventsList = (list: any[]) => {
    const cloned = [...list];
    switch (eventSort) {
      case "client_asc":
        return cloned.sort((a, b) => resolveClientName(a).localeCompare(resolveClientName(b)));
      case "client_desc":
        return cloned.sort((a, b) => resolveClientName(b).localeCompare(resolveClientName(a)));
      case "due_desc":
        return cloned.sort((a, b) => {
          const aTime = new Date(a.dueDate || 0).getTime();
          const bTime = new Date(b.dueDate || 0).getTime();
          return bTime - aTime;
        });
      case "due_asc":
      default:
        return cloned.sort((a, b) => {
          const aTime = new Date(a.dueDate || 0).getTime();
          const bTime = new Date(b.dueDate || 0).getTime();
          return aTime - bTime;
        });
    }
  };

  const sortedEvents = useMemo(() => sortEventsList(filteredEvents), [filteredEvents, eventSort]);
  const sortedOverviewEvents = useMemo(() => sortEventsList(companyFilteredEvents), [companyFilteredEvents, eventSort]);

  const resetRuleForm = () => {
    setEditingRuleId(null);
    setRuleForm({
      name: "",
      description: "",
      jurisdiction: "federal",
      state: "",
      frequency: "annual",
      dueRuleType: "fixed_date",
      dueMonth: "",
      dueDay: "",
      dueMonths: "",
      entityTypes: "",
      createTaxFiling: false,
      filingName: "",
      filingType: "",
      applyToExisting: false,
    });
    setRuleMessage("");
  };

  const handleSaveRule = async () => {
    if (!ruleForm.name.trim()) {
      setRuleMessage("Rule name is required.");
      return;
    }

    const payload = {
      name: ruleForm.name.trim(),
      description: ruleForm.description.trim(),
      jurisdiction: ruleForm.jurisdiction,
      state: ruleForm.jurisdiction === "state" ? ruleForm.state.trim() : "",
      frequency: ruleForm.frequency,
      dueRule: {
        type:
          ruleForm.frequency === "annual"
            ? ruleForm.dueRuleType
            : ruleForm.frequency === "quarterly"
              ? "quarterly_fixed"
              : "monthly_fixed",
        month: ruleForm.dueMonth ? Number(ruleForm.dueMonth) : undefined,
        day: ruleForm.dueDay ? Number(ruleForm.dueDay) : undefined,
        months: ruleForm.dueMonths
          ? ruleForm.dueMonths
              .split(",")
              .map((month) => Number(month.trim()))
              .filter((month) => Number.isFinite(month))
          : undefined,
      },
      entityTypes: ruleForm.entityTypes
        ? ruleForm.entityTypes.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      createTaxFiling: ruleForm.createTaxFiling,
      filingName: ruleForm.filingName.trim(),
      filingType: ruleForm.filingType.trim(),
      applyToExisting: ruleForm.applyToExisting,
    };

    try {
      if (editingRuleId) {
        await fetchJson(`${COMPLIANCE_API_BASE}/rules/${editingRuleId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setRuleMessage("Rule updated.");
      } else {
        await fetchJson(`${COMPLIANCE_API_BASE}/rules`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setRuleMessage("Rule created.");
      }
      await loadRules();
      resetRuleForm();
    } catch (error: any) {
      setRuleMessage(error?.message || "Unable to save rule.");
    }
  };
  const handleEditRule = (rule: any) => {
    setEditingRuleId(rule._id);
    setRuleForm({
      name: rule.name || "",
      description: rule.description || "",
      jurisdiction: rule.jurisdiction || "federal",
      state: rule.state || "",
      frequency: rule.frequency || "annual",
      dueRuleType: rule.dueRule?.type || "fixed_date",
      dueMonth: rule.dueRule?.month?.toString() || "",
      dueDay: rule.dueRule?.day?.toString() || "",
      dueMonths: rule.dueRule?.months ? rule.dueRule.months.join(", ") : "",
      entityTypes: rule.entityTypes ? rule.entityTypes.join(", ") : "",
      createTaxFiling: Boolean(rule.createTaxFiling),
      filingName: rule.filingName || "",
      filingType: rule.filingType || "",
      applyToExisting: false,
    });
    setRuleMessage("");
  };

  const handleSeedDefaults = async () => {
    try {
      const data = await fetchJson(`${COMPLIANCE_API_BASE}/rules/seed`, {
        method: "POST",
        body: JSON.stringify({ applyToExisting: true }),
      });
      setSeedMessage(`Default rules loaded (${data.created || 0} created).`);
      await loadRules();
      await loadEvents();
    } catch (error: any) {
      setSeedMessage(error?.message || "Unable to load default rules.");
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/rules/${ruleId}`, { method: "DELETE" });
      await loadRules();
    } catch (error: any) {
      setRuleMessage(error?.message || "Unable to delete rule.");
    }
  };

  const handleUpdateEventStatus = async (eventId: string, status: string) => {
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/events/${eventId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadEvents();
      setEventMessage("Event status updated.");
    } catch (error: any) {
      setEventMessage(error?.message || "Unable to update event status.");
    }
  };

  const handleAssignEvent = async (eventId: string, adminId: string) => {
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/events/${eventId}/assign`, {
        method: "POST",
        body: JSON.stringify({ adminId }),
      });
      await loadEvents();
      setEventMessage("Assigned admin updated.");
    } catch (error: any) {
      setEventMessage(error?.message || "Unable to assign admin.");
    }
  };

  const openRequestDialog = (eventId: string) => {
    setRequestingEventId(eventId);
    setRequestMessage("");
    setIsRequestDialogOpen(true);
  };

  const handleRequestDocuments = async () => {
    if (!requestingEventId) return;
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/events/${requestingEventId}/request-documents`, {
        method: "POST",
        body: JSON.stringify({ message: requestMessage.trim() }),
      });
      await loadEvents();
      setEventMessage("Document request sent.");
      setIsRequestDialogOpen(false);
    } catch (error: any) {
      setEventMessage(error?.message || "Unable to request documents.");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm("Delete this compliance filing? This cannot be undone.")) return;
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/events/${eventId}`, { method: "DELETE" });
      await Promise.all([loadEvents(), loadTasks()]);
      setEventMessage("Compliance filing deleted.");
    } catch (error: any) {
      setEventMessage(error?.message || "Unable to delete compliance filing.");
    }
  };

  const handleCreateManualEvent = async () => {
    if (!manualForm.companyId || !manualForm.name.trim() || !manualForm.dueDate) {
      setManualMessage("Select a company, enter a name, and choose a due date.");
      return;
    }

    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/events/manual`, {
        method: "POST",
        body: JSON.stringify({
          companyId: manualForm.companyId,
          name: manualForm.name.trim(),
          description: manualForm.description.trim() || undefined,
          jurisdiction: manualForm.jurisdiction,
          state: manualForm.jurisdiction === "state" ? manualForm.state.trim() : undefined,
          dueDate: manualForm.dueDate,
          status: manualForm.status,
          notes: manualForm.notes.trim() || undefined,
          assignedAdmin: manualForm.assignedAdmin || undefined,
        }),
      });
      setManualMessage("Manual compliance added.");
      setManualForm({
        companyId: "",
        name: "",
        description: "",
        jurisdiction: "federal",
        state: "",
        dueDate: "",
        status: "upcoming",
        notes: "",
        assignedAdmin: "",
      });
      await loadEvents();
    } catch (error: any) {
      setManualMessage(error?.message || "Unable to create manual compliance.");
    }
  };

  const handleCreateTask = async () => {
    if (!taskForm.eventId || !taskForm.taskName.trim()) {
      setTaskMessage("Select an event and enter a task name.");
      return;
    }
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/tasks`, {
        method: "POST",
        body: JSON.stringify({
          event: taskForm.eventId,
          taskName: taskForm.taskName.trim(),
          assignedTo: taskForm.assignedTo || undefined,
          status: taskForm.status,
          dueDate: taskForm.dueDate || undefined,
          notes: taskForm.notes.trim() || undefined,
        }),
      });
      setTaskMessage("Task created.");
      setTaskForm({
        eventId: "",
        taskName: "",
        assignedTo: "",
        status: "pending",
        dueDate: "",
        notes: "",
      });
      await loadTasks();
    } catch (error: any) {
      setTaskMessage(error?.message || "Unable to create task.");
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    try {
      await fetchJson(`${COMPLIANCE_API_BASE}/tasks/${taskId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadTasks();
      setTaskMessage("Task updated.");
    } catch (error: any) {
      setTaskMessage(error?.message || "Unable to update task.");
    }
  };

  const formatDueRule = (rule: any) => {
    if (rule.frequency === "quarterly") {
      const months = rule.dueRule?.months?.length ? rule.dueRule.months.join(", ") : "1,4,6,9";
      return `Quarterly on day ${rule.dueRule?.day || 15} (months ${months})`;
    }
    if (rule.frequency === "monthly") {
      return `Monthly on day ${rule.dueRule?.day || 1}`;
    }
    if (rule.dueRule?.type === "anniversary") {
      return "Anniversary date";
    }
    if (rule.dueRule?.month && rule.dueRule?.day) {
      return `Fixed ${rule.dueRule.month}/${rule.dueRule.day}`;
    }
    return "Fixed date";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["overview", "rules", "events", "tasks"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading compliance data...</div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total upcoming filings</CardDescription>
              <CardTitle className="text-2xl">{complianceStats.upcoming}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Due this week</CardDescription>
              <CardTitle className="text-2xl">{complianceStats.dueThisWeek}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Overdue filings</CardDescription>
              <CardTitle className="text-2xl text-red-600">{complianceStats.overdue}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>In progress</CardDescription>
              <CardTitle className="text-2xl text-blue-600">{complianceStats.inProgress}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      {activeTab === "overview" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance Deadline Queue</CardTitle>
            <CardDescription>Monitor due dates, assignments, and workflow status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="h-10 w-full sm:w-64"><SelectValue placeholder="All companies" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All companies</SelectItem>
                  {companyOptions.map((company) => (
                    <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={eventSort} onValueChange={setEventSort}>
                <SelectTrigger className="h-10 w-full sm:w-56"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="due_asc">Due date (soonest)</SelectItem>
                  <SelectItem value="due_desc">Due date (latest)</SelectItem>
                  <SelectItem value="client_asc">Client (A-Z)</SelectItem>
                  <SelectItem value="client_desc">Client (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Admin</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOverviewEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>
                      <p className="font-medium">{event.company?.companyName || event.user?.companyName || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{event.company?.state || event.rule?.state || "Federal"}</p>
                    </TableCell>
                    <TableCell>{event.rule?.name || "Compliance filing"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {event.dueDate ? new Date(event.dueDate).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border capitalize text-xs", statusStyles[event.status] || "")}>
                        {event.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.assignedAdmin?.name || "Unassigned"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => openRequestDialog(event._id)}>
                          Request Docs
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event._id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {activeTab === "rules" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr,1.4fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{editingRuleId ? "Edit Compliance Rule" : "Create Compliance Rule"}</CardTitle>
              <CardDescription>Define the filings your clients must complete.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button variant="outline" size="sm" onClick={handleSeedDefaults}>
                  Load Default Rules
                </Button>
                {seedMessage ? (
                  <span className="text-xs text-muted-foreground">{seedMessage}</span>
                ) : null}
              </div>
              <div className="space-y-1">
                <Label>Rule Name</Label>
                <Input value={ruleForm.name} onChange={(e) => setRuleForm((prev) => ({ ...prev, name: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea value={ruleForm.description} onChange={(e) => setRuleForm((prev) => ({ ...prev, description: e.target.value }))} rows={3} />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Jurisdiction</Label>
                  <Select value={ruleForm.jurisdiction} onValueChange={(value) => setRuleForm((prev) => ({ ...prev, jurisdiction: value }))}>
                    <SelectTrigger><SelectValue placeholder="Jurisdiction" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>State</Label>
                  <Input
                    value={ruleForm.state}
                    onChange={(e) => setRuleForm((prev) => ({ ...prev, state: e.target.value }))}
                    placeholder="Optional (e.g., WY)"
                    disabled={ruleForm.jurisdiction !== "state"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Frequency</Label>
                  <Select value={ruleForm.frequency} onValueChange={(value) => setRuleForm((prev) => ({ ...prev, frequency: value }))}>
                    <SelectTrigger><SelectValue placeholder="Frequency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Due Rule</Label>
                  <Select
                    value={ruleForm.frequency === "annual" ? ruleForm.dueRuleType : ruleForm.frequency === "quarterly" ? "quarterly_fixed" : "monthly_fixed"}
                    onValueChange={(value) => setRuleForm((prev) => ({ ...prev, dueRuleType: value }))}
                    disabled={ruleForm.frequency !== "annual"}
                  >
                    <SelectTrigger><SelectValue placeholder="Due rule" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed_date">Fixed Date</SelectItem>
                      <SelectItem value="anniversary">Anniversary Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label>Month</Label>
                  <Input value={ruleForm.dueMonth} onChange={(e) => setRuleForm((prev) => ({ ...prev, dueMonth: e.target.value }))} placeholder="1-12" />
                </div>
                <div className="space-y-1">
                  <Label>Day</Label>
                  <Input value={ruleForm.dueDay} onChange={(e) => setRuleForm((prev) => ({ ...prev, dueDay: e.target.value }))} placeholder="1-31" />
                </div>
                <div className="space-y-1">
                  <Label>Quarter Months</Label>
                  <Input
                    value={ruleForm.dueMonths}
                    onChange={(e) => setRuleForm((prev) => ({ ...prev, dueMonths: e.target.value }))}
                    placeholder="1,4,6,9"
                    disabled={ruleForm.frequency !== "quarterly"}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Entity Types</Label>
                <Input
                  value={ruleForm.entityTypes}
                  onChange={(e) => setRuleForm((prev) => ({ ...prev, entityTypes: e.target.value }))}
                  placeholder="LLC, C-Corp, S-Corp"
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={ruleForm.createTaxFiling}
                  onChange={(e) => setRuleForm((prev) => ({ ...prev, createTaxFiling: e.target.checked }))}
                />
                <span>Create Tax Filing when events are generated</span>
              </div>
              {ruleForm.createTaxFiling && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Filing Name</Label>
                    <Input
                      value={ruleForm.filingName}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, filingName: e.target.value }))}
                      placeholder="IRS Form 1120"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Filing Type</Label>
                    <Input
                      value={ruleForm.filingType}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, filingType: e.target.value }))}
                      placeholder="Tax Return"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={ruleForm.applyToExisting}
                  onChange={(e) => setRuleForm((prev) => ({ ...prev, applyToExisting: e.target.checked }))}
                />
                <span>Generate events for existing companies</span>
              </div>
              {ruleMessage ? <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{ruleMessage}</div> : null}
              <div className="flex gap-2">
                <Button onClick={handleSaveRule}>{editingRuleId ? "Update Rule" : "Create Rule"}</Button>
                <Button variant="outline" onClick={resetRuleForm}>Reset</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Rules</CardTitle>
              <CardDescription>Active filing templates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Due Rule</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule._id}>
                      <TableCell>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-xs text-muted-foreground">{rule.description}</p>
                      </TableCell>
                      <TableCell>{rule.jurisdiction === "state" ? rule.state || "State" : "Federal"}</TableCell>
                      <TableCell className="capitalize">{rule.frequency}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDueRule(rule)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditRule(rule)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteRule(rule._id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "events" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Manual Compliance</CardTitle>
              <CardDescription>Create a one-off compliance item for a specific client.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Company</Label>
                  <Select value={manualForm.companyId} onValueChange={(value) => setManualForm((prev) => ({ ...prev, companyId: value }))}>
                    <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                    <SelectContent>
                      {formationOptions.map((formation) => (
                        <SelectItem key={formation.id} value={formation.id}>{formation.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Compliance Name</Label>
                  <Input value={manualForm.name} onChange={(e) => setManualForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="e.g., BOI Report Follow-up" />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={manualForm.description}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional details for the client"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label>Jurisdiction</Label>
                  <Select value={manualForm.jurisdiction} onValueChange={(value) => setManualForm((prev) => ({ ...prev, jurisdiction: value }))}>
                    <SelectTrigger><SelectValue placeholder="Jurisdiction" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>State</Label>
                  <Input
                    value={manualForm.state}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, state: e.target.value }))}
                    placeholder="Optional (e.g., WY)"
                    disabled={manualForm.jurisdiction !== "state"}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Due Date</Label>
                  <Input type="date" value={manualForm.dueDate} onChange={(e) => setManualForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Status</Label>
                  <Select value={manualForm.status} onValueChange={(value) => setManualForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(statusStyles).map((status) => (
                        <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Assign Admin</Label>
                  <Select
                    value={manualForm.assignedAdmin || "unassigned"}
                    onValueChange={(value) => setManualForm((prev) => ({ ...prev, assignedAdmin: value === "unassigned" ? "" : value }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Assign admin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {adminUsers.map((admin: any) => (
                        <SelectItem key={admin.id || admin._id} value={admin.id || admin._id}>
                          {admin.name || admin.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Internal Notes</Label>
                <Textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Optional internal notes"
                />
              </div>
              {manualMessage ? <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{manualMessage}</div> : null}
              <Button onClick={handleCreateManualEvent}>Create Compliance</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Events</CardTitle>
              <CardDescription>Assign admins, update status, and request documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventMessage ? <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{eventMessage}</div> : null}
              <div className="flex flex-wrap gap-3">
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger className="h-10 w-full sm:w-64"><SelectValue placeholder="All companies" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All companies</SelectItem>
                    {companyOptions.map((company) => (
                      <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={eventStatusFilter} onValueChange={setEventStatusFilter}>
                  <SelectTrigger className="h-10 w-full sm:w-56"><SelectValue placeholder="Filter status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {Object.keys(statusStyles).map((status) => (
                      <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={eventSort} onValueChange={setEventSort}>
                  <SelectTrigger className="h-10 w-full sm:w-56"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_asc">Due date (soonest)</SelectItem>
                    <SelectItem value="due_desc">Due date (latest)</SelectItem>
                    <SelectItem value="client_asc">Client (A-Z)</SelectItem>
                    <SelectItem value="client_desc">Client (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Admin</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEvents.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>
                        <p className="font-medium">{event.company?.companyName || event.user?.companyName || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{event.company?.state || event.rule?.state || "Federal"}</p>
                      </TableCell>
                      <TableCell>{event.rule?.name || "Compliance filing"}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{event.dueDate ? new Date(event.dueDate).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>
                        <Select value={event.status} onValueChange={(value) => handleUpdateEventStatus(event._id, value)}>
                          <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.keys(statusStyles).map((status) => (
                              <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={event.assignedAdmin?._id || "unassigned"}
                          onValueChange={(value) => handleAssignEvent(event._id, value === "unassigned" ? "" : value)}
                        >
                          <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {adminUsers.map((admin: any) => (
                              <SelectItem key={admin.id || admin._id} value={admin.id || admin._id}>
                                {admin.name || admin.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => openRequestDialog(event._id)}>Request Docs</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr,1.4fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create Compliance Task</CardTitle>
              <CardDescription>Break filings into internal tasks and assign owners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label>Compliance Event</Label>
                <Select value={taskForm.eventId} onValueChange={(value) => setTaskForm((prev) => ({ ...prev, eventId: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select event" /></SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event._id} value={event._id}>
                        {event.company?.companyName || "Company"} - {event.rule?.name || "Compliance"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Task Name</Label>
                <Input value={taskForm.taskName} onChange={(e) => setTaskForm((prev) => ({ ...prev, taskName: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Assign To</Label>
                  <Select
                    value={taskForm.assignedTo || "unassigned"}
                    onValueChange={(value) => setTaskForm((prev) => ({ ...prev, assignedTo: value === "unassigned" ? "" : value }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Assign admin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {adminUsers.map((admin: any) => (
                        <SelectItem key={admin.id || admin._id} value={admin.id || admin._id}>
                          {admin.name || admin.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Status</Label>
                  <Select value={taskForm.status} onValueChange={(value) => setTaskForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label>Due Date</Label>
                  <Input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label>Notes</Label>
                  <Input value={taskForm.notes} onChange={(e) => setTaskForm((prev) => ({ ...prev, notes: e.target.value }))} />
                </div>
              </div>
              {taskMessage ? <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{taskMessage}</div> : null}
              <Button onClick={handleCreateTask}>Create Task</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Tasks</CardTitle>
              <CardDescription>Track internal execution tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>
                        <p className="font-medium">{task.taskName}</p>
                        <p className="text-xs text-muted-foreground">{task.notes}</p>
                      </TableCell>
                      <TableCell>
                        <Select value={task.status} onValueChange={(value) => handleUpdateTaskStatus(task._id, value)}>
                          <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>{task.assignedTo?.name || "Unassigned"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Documents</DialogTitle>
            <DialogDescription>Ask the client to upload documents for this compliance filing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Request message</Label>
            <Textarea value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestDocuments}>Send Request</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
