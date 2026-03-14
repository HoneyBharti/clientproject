import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminViewContext } from "./types";
import { API_BASE_URL } from "@/lib/api-base";

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const resolveValue = (value?: string) => (value && String(value).trim() ? value : "-");

export function ZohoLeadsView({ ctx = {} }: { ctx?: AdminViewContext }) {
  const [localLeads, setLocalLeads] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const hasCtx = Boolean(ctx?.loadZohoLeads || ctx?.zohoLeads);
  const zohoLeads = useMemo(() => (hasCtx ? ctx.zohoLeads || [] : localLeads), [ctx?.zohoLeads, hasCtx, localLeads]);
  const zohoLeadsLoading = hasCtx ? ctx.zohoLeadsLoading : localLoading;
  const zohoLeadsError = hasCtx ? ctx.zohoLeadsError : localError;

  const loadLocalLeads = useCallback(async () => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/zoho/leads`, { credentials: "include" });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to load Zoho leads.");
      }
      setLocalLeads(data.leads || []);
    } catch (error) {
      setLocalLeads([]);
      setLocalError(error instanceof Error ? error.message : "Unable to load Zoho leads.");
    } finally {
      setLocalLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    if (ctx?.loadZohoLeads) {
      ctx.loadZohoLeads();
      return;
    }
    loadLocalLeads();
  }, [ctx?.loadZohoLeads, loadLocalLeads]);

  const didInitialLoad = useRef(false);
  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    handleRefresh();
  }, [handleRefresh]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Zoho CRM Leads</CardTitle>
          <CardDescription>Latest leads synced from Zoho CRM.</CardDescription>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {zohoLeadsError ? (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {zohoLeadsError}
          </div>
        ) : null}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Lead Source</TableHead>
              <TableHead>Created Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zohoLeadsLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                  Loading Zoho leads...
                </TableCell>
              </TableRow>
            ) : zohoLeads.length ? (
              zohoLeads.map((lead: any) => (
                <TableRow key={lead.id || `${lead.Full_Name}-${lead.Email}`}>
                  <TableCell className="font-medium">{resolveValue(lead.Full_Name)}</TableCell>
                  <TableCell>{resolveValue(lead.Email)}</TableCell>
                  <TableCell>{resolveValue(lead.Phone)}</TableCell>
                  <TableCell>{resolveValue(lead.Company)}</TableCell>
                  <TableCell>{resolveValue(lead.Lead_Source)}</TableCell>
                  <TableCell>{formatDate(lead.Created_Time)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                  No Zoho leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
