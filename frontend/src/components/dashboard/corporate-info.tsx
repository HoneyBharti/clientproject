import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Landmark } from "lucide-react";

const corporateData = {
    formationState: "Delaware",
    registeredAgent: "Corp-Pal Services, Inc.",
    ein: "XX-XXX-1234",
};

export function CorporateInfo() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-primary" />
                    <span>Corporate Info</span>
                </CardTitle>
                <CardDescription>Key details about your company.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    <li className="flex justify-between">
                        <span className="text-muted-foreground">State of Formation</span>
                        <span className="font-medium">{corporateData.formationState}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-muted-foreground">Registered Agent</span>
                        <span className="font-medium">{corporateData.registeredAgent}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-muted-foreground">EIN</span>
                        <code className="font-medium font-code">{corporateData.ein}</code>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}
