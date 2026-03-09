import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminViewContext } from "./types";

export function CmsView({ ctx }: { ctx: AdminViewContext }) {
  const { cmsQ, setCmsQ, activeCmsSection, setCmsSection, filteredCmsRecords, updateCmsRecord, dt } = ctx;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management (CMS)</CardTitle>
        <CardDescription>Pricing pages, country services, FAQ, blog and landing pages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search section, title or slug" value={cmsQ} onChange={(e) => setCmsQ(e.target.value)} />
          </div>
          <div className="lg:col-span-5">
            <Select value={activeCmsSection} onValueChange={(value) => setCmsSection(value as any)}>
              <SelectTrigger><SelectValue placeholder="Section" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sections</SelectItem>
                <SelectItem value="pricing">Pricing pages</SelectItem>
                <SelectItem value="country_service">Country service pages</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="landing">Landing pages</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCmsRecords.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell className="capitalize">{record.section.replace("_", " ")}</TableCell>
                <TableCell>
                  <Input
                    value={record.title}
                    onChange={(e) => updateCmsRecord(record.id, e.target.value)}
                    className="h-8"
                  />
                </TableCell>
                <TableCell>{record.slug}</TableCell>
                <TableCell>{dt(record.updatedAt)}</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Editable</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
