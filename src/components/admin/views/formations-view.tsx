import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminViewContext } from "./types";

export function FormationsView({ ctx }: { ctx: AdminViewContext }) {
  const { formationQ, setFormationQ, formationStage, setFormationStage, filteredFormations, updateFormationStage } = ctx;

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
                <SelectItem value="application_received">Application received</SelectItem>
                <SelectItem value="documents_submitted">Documents submitted</SelectItem>
                <SelectItem value="filed_with_government">Filed with government</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="documents_delivered">Documents delivered</SelectItem>
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
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFormations.map((formation: any) => (
              <TableRow key={formation.id}>
                <TableCell className="font-medium">{formation.companyName}</TableCell>
                <TableCell>{formation.country}</TableCell>
                <TableCell>{formation.formationType}</TableCell>
                <TableCell>{formation.userId}</TableCell>
                <TableCell>{formation.jurisdiction}</TableCell>
                <TableCell>{formation.assignedAgent}</TableCell>
                <TableCell>
                  <Select value={formation.stage} onValueChange={(value) => updateFormationStage(formation.id, value as any)}>
                    <SelectTrigger className="h-8 w-[210px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application_received">Application received</SelectItem>
                      <SelectItem value="documents_submitted">Documents submitted</SelectItem>
                      <SelectItem value="filed_with_government">Filed with government</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="documents_delivered">Documents delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
