import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { AdminViewContext } from "./types";

export function FormationsView({ ctx }: { ctx: AdminViewContext }) {
  const {
    formationQ,
    setFormationQ,
    formationStage,
    setFormationStage,
    filteredFormations,
    updateFormationEin,
    updateFormationProgress,
    updateFormationDetails,
  } = ctx;
  const [einDrafts, setEinDrafts] = useState<Record<string, string>>({});
  const [editFormation, setEditFormation] = useState<any | null>(null);
  const [detailsDraft, setDetailsDraft] = useState({
    companyName: "",
    state: "",
    incorporationDate: "",
    ein: "",
    registeredAgent: "",
    mailingAddress: "",
    authorizedMembers: "",
    internalId: "",
    goodStandingStatus: "",
  });
  const [detailsSaving, setDetailsSaving] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const getEinValue = (formation: any) =>
    einDrafts[formation.id] ?? formation.ein ?? "";

  const formationStepOrder = ["nameCheck", "filingPrep", "stateFiling", "approved"];
  const einStepOrder = ["ss4Application", "irsSubmission", "processing", "allotment"];
  const complianceStepOrder = ["operatingAgreement", "initialResolutions", "boiReport", "goodStanding"];

  const formationStepLabels: Record<string, string> = {
    nameCheck: "Name Check",
    filingPrep: "Filing Prep",
    stateFiling: "State Filing",
    approved: "Approved",
  };
  const einStepLabels: Record<string, string> = {
    ss4Application: "SS-4 Application",
    irsSubmission: "IRS Submission",
    processing: "Processing",
    allotment: "Allotment",
  };
  const complianceStepLabels: Record<string, string> = {
    operatingAgreement: "Operating Agreement",
    initialResolutions: "Initial Resolutions",
    boiReport: "BOI Report",
    goodStanding: "Good Standing",
  };

  const resolveCurrentStep = (progress: any, order: string[]) =>
    order.find((key) => progress?.[key]?.status !== "completed") || order[order.length - 1];

  const isStepCompleted = (progress: any, step: string) =>
    progress?.[step]?.status === "completed";

  const renderProgressManager = (
    formationId: string,
    section: string,
    stepOrder: string[],
    stepLabels: Record<string, string>,
    progress: any
  ) => {
    const currentStep = resolveCurrentStep(progress, stepOrder);
    const allDone = stepOrder.every((step) => isStepCompleted(progress, step));

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {stepOrder.map((step) => {
            const completed = isStepCompleted(progress, step);
            const isCurrent = step === currentStep && !completed;
            const label = stepLabels[step] || step;
            const badgeClass = completed
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : isCurrent
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-slate-200 bg-slate-50 text-slate-600";
            const dotClass = completed
              ? "bg-emerald-500"
              : isCurrent
                ? "bg-amber-500"
                : "bg-slate-300";

            return (
              <span key={step} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${badgeClass}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                {label}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="h-8 min-w-[190px] rounded-md border border-slate-200 bg-white px-2 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                const [action, step] = e.target.value.split(":");
                const status = action === "complete" ? "completed" : "pending";
                handleProgressUpdate(formationId, section, step, status);
                e.currentTarget.value = "";
              }
            }}
          >
            <option value="" disabled>Update step</option>
            {stepOrder.map((step) => {
              const completed = isStepCompleted(progress, step);
              const label = stepLabels[step] || step;
              return (
                <option key={step} value={`${completed ? "unmark" : "complete"}:${step}`}>
                  {completed ? "Unmark" : "Complete"} {label}
                </option>
              );
            })}
          </select>
          <span className="text-[11px] text-muted-foreground">
            {allDone ? "All steps completed." : `Next: ${stepLabels[currentStep] || currentStep}`}
          </span>
        </div>
      </div>
    );
  };

  const handleProgressUpdate = async (formationId: string, section: string, step: string, status: string = "completed") => {
    if (!updateFormationProgress) return;
    await updateFormationProgress(formationId, section, step, status);
  };

  const openEditDetails = (formation: any) => {
    const incorporationDate = formation?.incorporationDate
      ? new Date(formation.incorporationDate).toISOString().slice(0, 10)
      : "";
    const stateValue = (formation?.state || formation?.jurisdiction || "").trim();
    const membersValue = Array.isArray(formation?.authorizedMembers)
      ? formation.authorizedMembers.join(", ")
      : formation?.authorizedMembers || "";
    setDetailsError("");
    setEditFormation(formation);
    setDetailsDraft({
      companyName: formation?.companyName || "",
      state: stateValue === "N/A" ? "" : stateValue,
      incorporationDate,
      ein: formation?.ein || "",
      registeredAgent: formation?.registeredAgent || "",
      mailingAddress: formation?.mailingAddress || "",
      authorizedMembers: membersValue,
      internalId: formation?.internalId || "",
      goodStandingStatus: formation?.goodStandingStatus || "",
    });
  };

  const saveDetails = async () => {
    if (!editFormation || !updateFormationDetails) return;
    const companyName = detailsDraft.companyName.trim();
    const formationState = detailsDraft.state.trim();
    if (!companyName || !formationState) {
      setDetailsError("Legal entity name and formation state are required.");
      return;
    }

    setDetailsSaving(true);
    setDetailsError("");
    try {
      const payload: Record<string, any> = {
        companyName,
        state: formationState,
        registeredAgent: detailsDraft.registeredAgent.trim(),
        mailingAddress: detailsDraft.mailingAddress.trim(),
        internalId: detailsDraft.internalId.trim(),
        goodStandingStatus: detailsDraft.goodStandingStatus.trim(),
        authorizedMembers: detailsDraft.authorizedMembers
          ? detailsDraft.authorizedMembers.split(",").map((value) => value.trim()).filter(Boolean)
          : [],
      };

      if (detailsDraft.incorporationDate) {
        payload.incorporationDate = detailsDraft.incorporationDate;
      } else {
        payload.incorporationDate = null;
      }

      const result = await updateFormationDetails(editFormation.id, payload);
      if (!result?.success) {
        setDetailsError(result?.error || "Unable to save formation details.");
        setDetailsSaving(false);
        return;
      }

      const nextEin = detailsDraft.ein.trim();
      if (nextEin && nextEin !== (editFormation?.ein || "")) {
        await updateFormationEin?.(editFormation.id, nextEin);
      }

      setEditFormation(null);
    } catch (error: any) {
      setDetailsError(error?.message || "Unable to save formation details.");
    } finally {
      setDetailsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Formation Management</CardTitle>
        <CardDescription>Track formation progress from application to delivery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search company, type or jurisdiction" value={formationQ} onChange={(e) => setFormationQ(e.target.value)} />
          </div>
          <div className="lg:col-span-4">
            <Select value={formationStage} onValueChange={(value) => setFormationStage(value as any)}>
              <SelectTrigger><SelectValue placeholder="Formation stage" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stages</SelectItem>
                <SelectItem value="name_check">Name check</SelectItem>
                <SelectItem value="filing_prep">Filing prep</SelectItem>
                <SelectItem value="state_filing">State filing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>EIN</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Formation Progress</TableHead>
              <TableHead>EIN Progress</TableHead>
              <TableHead>Initial Compliance</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFormations.map((formation: any) => {
              const formationProgress = formation.formationProgress || {};
              const einProgress = formation.einProgress || {};
              const initialCompliance = formation.initialCompliance || {};

              return (
                <TableRow key={formation.id}>
                  <TableCell className="font-medium">{formation.companyName}</TableCell>
                  <TableCell>{formation.country}</TableCell>
                  <TableCell>{formation.formationType}</TableCell>
                  <TableCell>{formation.userId}</TableCell>
                  <TableCell>{formation.jurisdiction}</TableCell>
                  <TableCell>
                    <Input
                      value={getEinValue(formation)}
                      placeholder="EIN"
                      className="h-8 w-[160px] font-mono"
                      onChange={(e) =>
                        setEinDrafts((prev) => ({ ...prev, [formation.id]: e.target.value }))
                      }
                      onBlur={() => updateFormationEin?.(formation.id, getEinValue(formation))}
                    />
                  </TableCell>
                  <TableCell>{formation.assignedAgent}</TableCell>
                  <TableCell>
                    {renderProgressManager(
                      formation.id,
                      "formationProgress",
                      formationStepOrder,
                      formationStepLabels,
                      formationProgress
                    )}
                  </TableCell>
                  <TableCell>
                    {renderProgressManager(
                      formation.id,
                      "einProgress",
                      einStepOrder,
                      einStepLabels,
                      einProgress
                    )}
                  </TableCell>
                  <TableCell>
                    {renderProgressManager(
                      formation.id,
                      "initialCompliance",
                      complianceStepOrder,
                      complianceStepLabels,
                      initialCompliance
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDetails(formation)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Dialog open={!!editFormation} onOpenChange={(open) => { if (!open) setEditFormation(null); }}>
          <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Corporate Information</DialogTitle>
              <DialogDescription>
                Edit the legal and formation details for this company.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="corp-company">Legal Entity Name</Label>
                <Input
                  id="corp-company"
                  value={detailsDraft.companyName}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corp-state">Formation State</Label>
                <Input
                  id="corp-state"
                  value={detailsDraft.state}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, state: e.target.value }))}
                  placeholder="State or jurisdiction"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corp-filing-date">Filing Date</Label>
                <Input
                  id="corp-filing-date"
                  type="date"
                  value={detailsDraft.incorporationDate}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, incorporationDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corp-ein">Employer ID (EIN)</Label>
                <Input
                  id="corp-ein"
                  value={detailsDraft.ein}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, ein: e.target.value }))}
                  placeholder="EIN"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corp-standing">Good Standing Status</Label>
                <Input
                  id="corp-standing"
                  value={detailsDraft.goodStandingStatus}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, goodStandingStatus: e.target.value }))}
                  placeholder="Active / Good Standing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corp-internal-id">Internal ID</Label>
                <Input
                  id="corp-internal-id"
                  value={detailsDraft.internalId}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, internalId: e.target.value }))}
                  placeholder="Internal identifier"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="corp-registered-agent">Registered Agent</Label>
                <Input
                  id="corp-registered-agent"
                  value={detailsDraft.registeredAgent}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, registeredAgent: e.target.value }))}
                  placeholder="Registered agent name"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="corp-mailing">Mailing Address</Label>
                <Textarea
                  id="corp-mailing"
                  value={detailsDraft.mailingAddress}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, mailingAddress: e.target.value }))}
                  placeholder="Mailing address"
                  rows={3}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="corp-members">Authorized Members</Label>
                <Textarea
                  id="corp-members"
                  value={detailsDraft.authorizedMembers}
                  onChange={(e) => setDetailsDraft((prev) => ({ ...prev, authorizedMembers: e.target.value }))}
                  placeholder="Comma-separated names"
                  rows={2}
                />
              </div>
            </div>

            {detailsError ? (
              <p className="text-sm text-red-600">{detailsError}</p>
            ) : null}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditFormation(null)} disabled={detailsSaving}>
                Cancel
              </Button>
              <Button onClick={saveDetails} disabled={detailsSaving}>
                {detailsSaving ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
