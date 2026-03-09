import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { AdminViewContext } from "./types";

export function SettingsView({ ctx }: { ctx: AdminViewContext }) {
  const { systemSettings, setSystemSettings, saveSettings, settingsMessage } = ctx;

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Stripe keys, email, currency, tax and country availability</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            value={systemSettings.stripePublishableKey}
            onChange={(e) => setSystemSettings((prev: any) => ({ ...prev, stripePublishableKey: e.target.value }))}
            placeholder="Stripe publishable key"
          />
          <Input
            value={systemSettings.stripeSecretKey}
            onChange={(e) => setSystemSettings((prev: any) => ({ ...prev, stripeSecretKey: e.target.value }))}
            placeholder="Stripe secret key"
          />
          <Input
            value={systemSettings.emailService}
            onChange={(e) => setSystemSettings((prev: any) => ({ ...prev, emailService: e.target.value }))}
            placeholder="Email service"
          />
          <Input
            value={systemSettings.currency}
            onChange={(e) => setSystemSettings((prev: any) => ({ ...prev, currency: e.target.value }))}
            placeholder="Currency"
          />
          <Input
            value={systemSettings.taxRate}
            onChange={(e) => setSystemSettings((prev: any) => ({ ...prev, taxRate: e.target.value }))}
            placeholder="Tax rate"
          />
        </div>

        <div className="rounded border p-4 space-y-2">
          <p className="text-sm font-medium">Country availability</p>
          {Object.keys(systemSettings.countryAvailability).map((country) => (
            <div key={country} className="flex items-center justify-between rounded border p-2">
              <span>{country}</span>
              <Switch
                checked={systemSettings.countryAvailability[country as keyof typeof systemSettings.countryAvailability]}
                onCheckedChange={(checked) =>
                  setSystemSettings((prev: any) => ({
                    ...prev,
                    countryAvailability: { ...prev.countryAvailability, [country]: checked },
                  }))
                }
              />
            </div>
          ))}
        </div>

        <Button onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
        {settingsMessage ? <p className="text-sm text-emerald-700">{settingsMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
