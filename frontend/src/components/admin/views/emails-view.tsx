import { RefreshCw, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function EmailsView({ ctx }: { ctx: AdminViewContext }) {
  const {
    emailLogs,
    resendEmail,
    dt,
    emailTemplates,
    selectedTemplateId,
    onTemplateChange,
    templateSubject,
    setTemplateSubject,
    templateBody,
    setTemplateBody,
    saveTemplate,
  } = ctx;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Email Logs</CardTitle>
          <CardDescription>Signup, order, document and invoice notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailLogs.map((entry: any) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.type}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>
                    <Badge className={cn("border", entry.status === "sent" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200")}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dt(entry.sentAt)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => resendEmail(entry.id)}>
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Resend
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Edit and save template content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={selectedTemplateId} onValueChange={onTemplateChange}>
            <SelectTrigger><SelectValue placeholder="Template" /></SelectTrigger>
            <SelectContent>
              {emailTemplates.map((template: any) => (
                <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input value={templateSubject} onChange={(e) => setTemplateSubject(e.target.value)} placeholder="Email subject" />
          <Textarea value={templateBody} onChange={(e) => setTemplateBody(e.target.value)} rows={8} />
          <Button className="w-full" onClick={saveTemplate}>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
