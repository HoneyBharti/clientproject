import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function BankingInfo() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>Banking</span>
        </CardTitle>
        <CardDescription>Connected to your Mercury account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold">$125,832.19</div>
        <p className="text-xs text-muted-foreground">
          Available balance as of today.
        </p>
      </CardContent>
    </Card>
  );
}
