import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";

const upcomingDates = [
  { id: 1, task: "Annual Report Filing", due: "2025-03-01", status: "Upcoming" },
  { id: 2, task: "Franchise Tax Payment", due: "2025-04-15", status: "Upcoming" },
];

const completedDates = [
  { id: 3, task: "Q2 Estimated Tax", due: "2024-06-15", status: "Completed" },
  { id: 4, task: "Q1 Payroll Report", due: "2024-04-30", status: "Completed" },
];

export function ComplianceDates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <span>Compliance Dates</span>
        </CardTitle>
        <CardDescription>Never miss an important deadline.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="mb-2 font-medium">Upcoming</h4>
            <ul className="space-y-2">
                {upcomingDates.map(item => (
                    <li key={item.id} className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                        <div>
                            <p className="font-medium">{item.task}</p>
                            <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                        </div>
                        <Badge variant="secondary">{item.status}</Badge>
                    </li>
                ))}
            </ul>
        </div>
         <div>
            <h4 className="mb-2 font-medium">Completed</h4>
            <ul className="space-y-2">
                {completedDates.map(item => (
                    <li key={item.id} className="flex items-center justify-between rounded-md p-3">
                        <div>
                            <p className="font-medium text-muted-foreground line-through">{item.task}</p>
                            <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                        </div>
                        <Badge variant="outline" className="text-muted-foreground">{item.status}</Badge>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
