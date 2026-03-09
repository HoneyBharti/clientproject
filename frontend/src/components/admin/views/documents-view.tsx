import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function DocumentsView({ ctx }: { ctx: AdminViewContext }) {
  const {
    documentQ,
    setDocumentQ,
    documentStatus,
    setDocumentStatus,
    documentActionMessage,
    filteredDocuments,
    sourceClass,
    documentStatusClass,
    dt,
    openDocumentModalForClient,
    setDocumentState,
  } = ctx;

  return (
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
            <Select value={documentStatus} onValueChange={(v) => setDocumentStatus(v as any)}>
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
            {filteredDocuments.map((doc: any) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.client}</TableCell>
                <TableCell>{doc.company}</TableCell>
                <TableCell><p>{doc.document}</p><p className="text-xs text-muted-foreground">{doc.category}</p></TableCell>
                <TableCell><Badge className={cn("border", sourceClass[doc.source])}>{doc.source}</Badge></TableCell>
                <TableCell><Badge className={cn("border capitalize", documentStatusClass[doc.status])}>{doc.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{dt(doc.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openDocumentModalForClient(doc.client)}>
                      Manage
                    </Button>
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
  );
}
