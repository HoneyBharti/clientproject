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

const TAX_API_BASE = `${API_BASE_URL}/admin/tax-filings`;

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  waiting_for_documents: "bg-amber-100 text-amber-700 border-amber-200",
  ready_to_file: "bg-sky-100 text-sky-700 border-sky-200",
  filed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  overdue: "bg-red-100 text-red-700 border-red-200",
};

const fetchJson = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};

export function TaxesView({ ctx }: { ctx: AdminViewContext }) {
  const [activeTab, setActiveTab] = useState<"overview" | "all" | "create" | "details">("overview");
  const [filings, setFilings] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedFiling, setSelectedFiling] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("dueDate:asc");
  const [companySearch, setCompanySearch] = useState("");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [reportFileKey, setReportFileKey] = useState(0);
  const [reportType, setReportType] = useState("irs_documents");
  const [reportMessage, setReportMessage] = useState("");
  const [reportError, setReportError] = useState("");
  const [isReportUploading, setIsReportUploading] = useState(false);

  const [form, setForm] = useState({
    companyId: "",
    filingName: "",
    filingType: "",
    taxYear: "",
    jurisdiction: "",
    dueDate: "",
    assignedAdmin: "",
    notes: "",
  });

  const adminUsers = useMemo(() => ctx?.userRecords || [], [ctx]);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const loadFilings = async () => {
    const data = await fetchJson(TAX_API_BASE);
    setFilings(data.filings || []);
  };

  const loadFilingDetails = async (filingId: string) => {
    setDetailLoading(true);
    setReportMessage("");
    setReportError("");
    try {
      const data = await fetchJson(`${TAX_API_BASE}/${filingId}`);
      setSelectedFiling(data.filing || null);
      setActiveTab("details");
    } catch (error: any) {
      setMessage(error?.message || "Unable to load filing details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const loadCompanies = async () => {
    const response = await fetchJson(`${API_BASE_URL}/formations?limit=200`);
    setCompanies(response.formations || []);
  };

  const loadAll = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadFilings(), loadCompanies()]);
    } catch (error: any) {
      setMessage(error?.message || "Unable to load tax filings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredFilings = useMemo(() => {
    return filings.filter((filing) => {
      const matchesStatus = statusFilter === "all" || filing.status === statusFilter;
      const matchesSearch = [
        filing.filingName,
        filing.filingType,
        filing.company?.companyName,
        filing.taxYear,
        filing.jurisdiction,
        filing.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filings, search, statusFilter]);

  const sortedFilings = useMemo(() => {
    const [key, direction] = sortOption.split(":");
    const dir = direction === "desc" ? -1 : 1;
    const compareText = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

    const list = [...filteredFilings];
    list.sort((a, b) => {
      if (key === "dueDate") {
        const aMissing = !a.dueDate;
        const bMissing = !b.dueDate;
        if (aMissing && bMissing) return 0;
        if (aMissing) return 1;
        if (bMissing) return -1;
        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir;
      }
      if (key === "company") {
        return compareText(a.company?.companyName || "", b.company?.companyName || "") * dir;
      }
      if (key === "taxYear") {
        return compareText(a.taxYear || "", b.taxYear || "") * dir;
      }
      if (key === "status") {
        return compareText(a.status || "", b.status || "") * dir;
      }
      if (key === "filing") {
        return compareText(a.filingName || "", b.filingName || "") * dir;
      }
      if (key === "jurisdiction") {
        return compareText(a.jurisdiction || "", b.jurisdiction || "") * dir;
      }
      return 0;
    });
    return list;
  }, [filteredFilings, sortOption]);

  const filteredCompanies = useMemo(() => {
    const query = companySearch.trim().toLowerCase();
    if (!query) return companies;
    return companies.filter((company) =>
      [company.companyName, company.state, company.entityType, company.country]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [companies, companySearch]);

  const stats = useMemo(() => {
    const total = filings.length;
    const pending = filings.filter((f) => f.status === "pending").length;
    const filed = filings.filter((f) => f.status === "filed").length;
    const overdue = filings.filter((f) => f.status !== "filed" && new Date(f.dueDate) < new Date()).length;
    return { total, pending, filed, overdue };
  }, [filings]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      companyId: "",
      filingName: "",
      filingType: "",
      taxYear: "",
      jurisdiction: "",
      dueDate: "",
      assignedAdmin: "",
      notes: "",
    });
  };

  const handleSave = async () => {
    if (!form.companyId || !form.filingName || !form.filingType || !form.taxYear || !form.jurisdiction || !form.dueDate) {
      setMessage("Complete all required fields.");
      return;
    }
    try {
      if (editingId) {
        await fetchJson(`${TAX_API_BASE}/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setMessage("Filing updated.");
      } else {
        await fetchJson(TAX_API_BASE, {
          method: "POST",
          body: JSON.stringify(form),
        });
        setMessage("Filing created.");
      }
      await loadFilings();
      resetForm();
      setActiveTab("all");
    } catch (error: any) {
      setMessage(error?.message || "Unable to save filing.");
    }
  };

  const handleEdit = (filing: any) => {
    setEditingId(filing._id);
    setForm({
      companyId: filing.company?._id || "",
      filingName: filing.filingName || "",
      filingType: filing.filingType || "",
      taxYear: filing.taxYear || "",
      jurisdiction: filing.jurisdiction || "",
      dueDate: filing.dueDate ? filing.dueDate.slice(0, 10) : "",
      assignedAdmin: filing.assignedAdmin?._id || "",
      notes: filing.notes || "",
    });
    setActiveTab("create");
  };

  const handleView = (filing: any) => {
    if (!filing?._id) return;
    loadFilingDetails(filing._id);
  };

  const handleAssign = async (filingId: string, adminId: string) => {
    await fetchJson(`${TAX_API_BASE}/${filingId}/assign`, {
      method: "POST",
      body: JSON.stringify({ adminId }),
    });
    await loadFilings();
  };

  const handleStatusUpdate = async (filingId: string, status: string) => {
    await fetchJson(`${TAX_API_BASE}/${filingId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await loadFilings();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await fetchJson(`${TAX_API_BASE}/${deleteTarget._id}`, { method: "DELETE" });
      setMessage("Filing deleted.");
      if (selectedFiling?._id === deleteTarget._id) {
        setSelectedFiling(null);
        setActiveTab("all");
      }
      await loadFilings();
    } catch (error: any) {
      setMessage(error?.message || "Unable to delete filing.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const openRequestDialog = (filingId: string) => {
    setRequestingId(filingId);
    setRequestMessage("");
    setRequestDialogOpen(true);
  };

  const handleRequestDocs = async () => {
    if (!requestingId) return;
    await fetchJson(`${TAX_API_BASE}/${requestingId}/request-documents`, {
      method: "POST",
      body: JSON.stringify({ message: requestMessage.trim() }),
    });
    await loadFilings();
    setRequestDialogOpen(false);
  };

  const handleReportUpload = async () => {
    if (!selectedFiling?._id) return;
    if (!reportFile) {
      setReportError("Select a report file to upload.");
      return;
    }
    setReportError("");
    setReportMessage("");
    setIsReportUploading(true);
    try {
      const fileDataBase64 = await toBase64(reportFile);
      await fetchJson(`${TAX_API_BASE}/${selectedFiling._id}/documents`, {
        method: "POST",
        body: JSON.stringify({
          fileName: reportFile.name,
          mimeType: reportFile.type || "application/octet-stream",
          fileDataBase64,
          documentType: reportType,
        }),
      });
      setReportMessage("Report uploaded and attached to this filing.");
      setReportFile(null);
      setReportFileKey((prev) => prev + 1);
      await loadFilingDetails(selectedFiling._id);
      await loadFilings();
    } catch (error: any) {
      setReportError(error?.message || "Unable to upload report.");
    } finally {
      setIsReportUploading(false);
    }
  };

  const selectedFilingDocuments = useMemo(() => {
    if (!selectedFiling?.documents) return [];
    return Array.isArray(selectedFiling.documents) ? selectedFiling.documents : [];
  }, [selectedFiling]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["overview", "all", "create", "details"].map((tab) => (
          <Button key={tab} variant={activeTab === tab ? "default" : "outline"} size="sm" onClick={() => setActiveTab(tab as any)}>
            {tab === "all" ? "All Filings" : tab === "create" ? "Create Filing" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading filings...</div>
      ) : null}

      {message ? (
        <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{message}</div>
      ) : null}

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Filings</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl text-amber-600">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Filed</CardDescription>
              <CardTitle className="text-2xl text-emerald-600">{stats.filed}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Overdue</CardDescription>
              <CardTitle className="text-2xl text-red-600">{stats.overdue}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      {activeTab === "all" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Filings</CardTitle>
            <CardDescription>Track state, federal, and quarterly filings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Input placeholder="Search filings..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[220px]"><SelectValue placeholder="Sort filings" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate:asc">Due date (soonest)</SelectItem>
                  <SelectItem value="dueDate:desc">Due date (latest)</SelectItem>
                  <SelectItem value="company:asc">Company (A-Z)</SelectItem>
                  <SelectItem value="company:desc">Company (Z-A)</SelectItem>
                  <SelectItem value="filing:asc">Filing name (A-Z)</SelectItem>
                  <SelectItem value="filing:desc">Filing name (Z-A)</SelectItem>
                  <SelectItem value="taxYear:desc">Tax year (newest)</SelectItem>
                  <SelectItem value="taxYear:asc">Tax year (oldest)</SelectItem>
                  <SelectItem value="status:asc">Status (A-Z)</SelectItem>
                  <SelectItem value="jurisdiction:asc">Jurisdiction (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="waiting_for_documents">Waiting for docs</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="ready_to_file">Ready to file</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Filing</TableHead>
                  <TableHead>Tax Year</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Admin</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedFilings.map((filing) => (
                  <TableRow key={filing._id}>
                    <TableCell>
                      <p className="font-medium">{filing.company?.companyName || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{filing.jurisdiction}</p>
                    </TableCell>
                    <TableCell>{filing.filingName}</TableCell>
                    <TableCell>{filing.taxYear}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{filing.dueDate ? new Date(filing.dueDate).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={cn("border capitalize text-xs", statusStyles[filing.status] || "")}>
                        {filing.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={filing.assignedAdmin?._id || "unassigned"} onValueChange={(value) => handleAssign(filing._id, value === "unassigned" ? "" : value)}>
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
                        <Button size="sm" variant="outline" onClick={() => handleView(filing)}>View</Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(filing)}>Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => openRequestDialog(filing._id)}>Request Docs</Button>
                        <Button size="sm" variant="default" onClick={() => handleStatusUpdate(filing._id, "filed")}>Mark Filed</Button>
                        <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(filing)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{editingId ? "Edit Filing" : "Create Filing"}</CardTitle>
            <CardDescription>Manually add a tax filing for a client.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Search Entities</Label>
                <Input
                  placeholder="Search by company, state, or type"
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Company</Label>
                <Select value={form.companyId} onValueChange={(value) => setForm((prev) => ({ ...prev, companyId: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                  <SelectContent>
                    {filteredCompanies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>{company.companyName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Filing Name</Label>
                <Input value={form.filingName} onChange={(e) => setForm((prev) => ({ ...prev, filingName: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Filing Type</Label>
                <Input value={form.filingType} onChange={(e) => setForm((prev) => ({ ...prev, filingType: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Tax Year</Label>
                <Input value={form.taxYear} onChange={(e) => setForm((prev) => ({ ...prev, taxYear: e.target.value }))} placeholder="2025" />
              </div>
              <div className="space-y-1">
                <Label>Jurisdiction</Label>
                <Input value={form.jurisdiction} onChange={(e) => setForm((prev) => ({ ...prev, jurisdiction: e.target.value }))} placeholder="Federal / State" />
              </div>
              <div className="space-y-1">
                <Label>Due Date</Label>
                <Input type="date" value={form.dueDate} onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Assign Admin</Label>
                <Select value={form.assignedAdmin || "unassigned"} onValueChange={(value) => setForm((prev) => ({ ...prev, assignedAdmin: value === "unassigned" ? "" : value }))}>
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
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} rows={3} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>{editingId ? "Update Filing" : "Create Filing"}</Button>
              <Button variant="outline" onClick={resetForm}>Reset</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "details" && detailLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loading filing details...</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Please wait while we fetch the latest data.</CardContent>
        </Card>
      )}

      {activeTab === "details" && !detailLoading && selectedFiling && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{selectedFiling.filingName}</CardTitle>
            <CardDescription>{selectedFiling.company?.companyName} • {selectedFiling.taxYear}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold">{selectedFiling.status.replace("_", " ")}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="font-semibold">{selectedFiling.dueDate ? new Date(selectedFiling.dueDate).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Assigned Admin</p>
                <p className="font-semibold">{selectedFiling.assignedAdmin?.name || "Unassigned"}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Jurisdiction</p>
                <p className="font-semibold">{selectedFiling.jurisdiction}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Timeline</p>
              <div className="space-y-2">
                {(selectedFiling.timeline || []).map((item: any, idx: number) => (
                  <div key={idx} className="rounded border px-3 py-2 text-sm">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Documents</p>
              {selectedFilingDocuments.length ? (
                <div className="space-y-2">
                  {selectedFilingDocuments.map((doc: any) => {
                    const docId = doc?._id || doc?.id;
                    return (
                      <div key={docId || doc.originalName} className="flex flex-wrap items-center justify-between gap-2 rounded border px-3 py-2 text-sm">
                        <div>
                          <p className="font-medium">{doc.originalName || doc.name || "Document"}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.source === "legal_docs" ? "Admin Upload" : "Client Upload"} · {doc.documentType || doc.folder || "File"}
                          </p>
                        </div>
                        {docId ? (
                          <a href={`${API_BASE_URL}/documents/${docId}/download`} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline">Download</Button>
                          </a>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No documents attached yet.</p>
              )}
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">Upload Report</p>
                {reportMessage ? <span className="text-xs text-emerald-600">{reportMessage}</span> : null}
              </div>
              {reportError ? (
                <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {reportError}
                </div>
              ) : null}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="irs_documents">IRS Document</SelectItem>
                      <SelectItem value="state_filings">State Filing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label>Report File</Label>
                  <Input
                    key={reportFileKey}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx,.xls"
                    onChange={(event) => setReportFile(event.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleReportUpload} disabled={isReportUploading || !reportFile}>
                  {isReportUploading ? "Uploading..." : "Upload Report"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "details" && !detailLoading && !selectedFiling && (
        <div className="text-sm text-muted-foreground">Select a filing to view details.</div>
      )}

      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Documents</DialogTitle>
            <DialogDescription>Ask the client to upload documents for this filing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Request message</Label>
            <Textarea value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestDocs}>Send Request</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Filing</DialogTitle>
            <DialogDescription>
              {deleteTarget ? `Delete "${deleteTarget.filingName}" for ${deleteTarget.company?.companyName || "this company"}? This cannot be undone.` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
