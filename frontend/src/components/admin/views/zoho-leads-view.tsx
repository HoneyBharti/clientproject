import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminViewContext } from "./types";
import { API_BASE_URL } from "@/lib/api-base";

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const resolveValue = (value?: string) => (value && String(value).trim() ? value : "-");

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  qualified: "bg-green-100 text-green-700 border-green-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-gray-100 text-gray-700 border-gray-200",
};

export function ZohoLeadsView({ ctx = {} }: { ctx?: AdminViewContext }) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 });

  const loadStoredLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/zoho/stored-leads?status=${statusFilter}&search=${searchQuery}`, { 
        credentials: "include" 
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to load Zoho leads.");
      }
      setLeads(data.leads || []);
      
      // Calculate stats
      const allLeads = data.leads || [];
      setStats({
        total: allLeads.length,
        new: allLeads.filter((l: any) => l.status === 'new').length,
        contacted: allLeads.filter((l: any) => l.status === 'contacted').length,
        qualified: allLeads.filter((l: any) => l.status === 'qualified').length,
        converted: allLeads.filter((l: any) => l.status === 'converted').length,
      });
    } catch (error) {
      setLeads([]);
      setError(error instanceof Error ? error.message : "Unable to load Zoho leads.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  const syncLeads = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/zoho/sync`, { 
        method: 'POST',
        credentials: "include" 
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to sync Zoho leads.");
      }
      
      // Show success message
      setError(null);
      
      // Reload leads
      await loadStoredLeads();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to sync Zoho leads.");
    } finally {
      setSyncing(false);
    }
  }, [loadStoredLeads]);

  const didInitialLoad = useRef(false);
  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    loadStoredLeads();
  }, [loadStoredLeads]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStoredLeads();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Leads</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">New</div>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Contacted</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Qualified</div>
            <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Converted</div>
            <div className="text-2xl font-bold text-emerald-600">{stats.converted}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Zoho CRM Leads</CardTitle>
            <CardDescription>Auto-syncs every 30 minutes. Last sync: {formatDate(leads[0]?.lastSyncedAt)}</CardDescription>
          </div>
          <Button variant="outline" onClick={syncLeads} disabled={syncing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by name, email, company, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Lead Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                      Loading leads...
                    </TableCell>
                  </TableRow>
                ) : leads.length ? (
                  leads.map((lead: any) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-medium">{resolveValue(lead.fullName)}</TableCell>
                      <TableCell>{resolveValue(lead.email)}</TableCell>
                      <TableCell>{resolveValue(lead.phone)}</TableCell>
                      <TableCell>{resolveValue(lead.company)}</TableCell>
                      <TableCell>{resolveValue(lead.leadSource)}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status] || statusColors.new}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(lead.zohoCreatedTime)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                      No leads found. Click "Sync Now" to fetch from Zoho CRM.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
