import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { AdminViewContext } from "./types";

export function OnboardingView({ ctx }: { ctx: AdminViewContext }) {
  const {
    onboardingSubmissions,
    onboardingLoading,
    loadOnboardingSubmissions,
    createFormationFromOnboarding,
  } = ctx;
  const [creatingIds, setCreatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadOnboardingSubmissions?.();
  }, [loadOnboardingSubmissions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Submissions</CardTitle>
        <CardDescription>Review onboarding forms and create formations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardingLoading && (
              <TableRow>
                <TableCell colSpan={8} className="text-sm text-muted-foreground">
                  Loading onboarding submissions...
                </TableCell>
              </TableRow>
            )}
            {!onboardingLoading && (!onboardingSubmissions || onboardingSubmissions.length === 0) && (
              <TableRow>
                <TableCell colSpan={8} className="text-sm text-muted-foreground">
                  No onboarding submissions yet.
                </TableCell>
              </TableRow>
            )}
            {(onboardingSubmissions || []).map((submission: any) => {
              const companyName =
                submission.formData?.existingCompany?.name ||
                submission.formData?.nameChoice1 ||
                submission.formData?.nameChoice2 ||
                submission.formData?.nameChoice3 ||
                "New Company";
              const country = submission.planCountry || submission.destination || submission.formData?.existingCompany?.country || "USA";
              const entity = submission.entityType || submission.planEntityType || submission.formData?.existingCompany?.entityType || "LLC";
              const submissionId = String(submission._id || submission.id);
              const isProcessing = submission.status === "processing" || creatingIds.has(submissionId);
              const canCreate = !submission.formation && submission.status !== "completed" && !isProcessing;
              return (
                <TableRow key={submissionId}>
                  <TableCell className="font-medium">{companyName}</TableCell>
                  <TableCell>{submission.user?.name || "Unknown user"}</TableCell>
                  <TableCell>{submission.plan || "-"}</TableCell>
                  <TableCell>{country}</TableCell>
                  <TableCell>{entity}</TableCell>
                  <TableCell>{submission.status || "submitted"}</TableCell>
                  <TableCell>{submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      disabled={!canCreate}
                      onClick={async () => {
                        if (!canCreate) return;
                        setCreatingIds((prev) => new Set(prev).add(submissionId));
                        try {
                          await createFormationFromOnboarding?.(submissionId);
                        } finally {
                          setCreatingIds((prev) => {
                            const next = new Set(prev);
                            next.delete(submissionId);
                            return next;
                          });
                        }
                      }}
                    >
                      {submission.formation
                        ? "Formation Created"
                        : isProcessing
                          ? "Creating..."
                          : "Create Formation"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
