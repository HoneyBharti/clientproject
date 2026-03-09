import { Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function SubscriptionsView({ ctx }: { ctx: AdminViewContext }) {
  const { planForm, setPlanForm, savePlan, editingPlanId, plans, editPlan, deletePlan } = ctx;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Plan Editor</CardTitle>
          <CardDescription>Create, edit and publish plans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Plan name"
            value={planForm.name}
            onChange={(e) => setPlanForm((prev: any) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Pricing"
            value={planForm.pricing}
            onChange={(e) => setPlanForm((prev: any) => ({ ...prev, pricing: e.target.value }))}
          />
          <Select value={planForm.billing} onValueChange={(value) => setPlanForm((prev: any) => ({ ...prev, billing: value }))}>
            <SelectTrigger><SelectValue placeholder="Billing type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="one_time">One time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Features (comma separated)"
            value={planForm.features}
            onChange={(e) => setPlanForm((prev: any) => ({ ...prev, features: e.target.value }))}
          />
          <Input
            placeholder="Country availability (comma separated)"
            value={planForm.countries}
            onChange={(e) => setPlanForm((prev: any) => ({ ...prev, countries: e.target.value }))}
          />
          <div className="flex items-center justify-between rounded border p-2">
            <span className="text-sm">Active plan</span>
            <Switch checked={planForm.active} onCheckedChange={(checked) => setPlanForm((prev: any) => ({ ...prev, active: checked }))} />
          </div>
          <Button className="w-full" onClick={savePlan}>
            <Save className="mr-2 h-4 w-4" />
            {editingPlanId ? "Update Plan" : "Create Plan"}
          </Button>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Plans</CardTitle>
          <CardDescription>Pricing, features and country availability</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Countries</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan: any) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.pricing}</TableCell>
                  <TableCell>{plan.billing.replace("_", " ")}</TableCell>
                  <TableCell>{plan.features.join(", ")}</TableCell>
                  <TableCell>{plan.countries.join(", ")}</TableCell>
                  <TableCell>
                    <Badge className={cn("border", plan.active ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-700 border-slate-200")}>
                      {plan.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editPlan(plan)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deletePlan(plan.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
