import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { AdminViewContext } from "./types";

type ServiceStatus = "active" | "inactive";

type CoreService = {
  id: string;
  serviceName: string;
  slug: string;
  description: string;
  features: string[];
  price: number;
  category: string;
  icon: string;
  status: ServiceStatus;
  createdAt: string;
};

type AddOnService = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  icon: string;
  status: ServiceStatus;
  createdAt: string;
};

type CoreFormState = {
  serviceName: string;
  slug: string;
  description: string;
  features: string;
  price: string;
  category: string;
  icon: string;
  status: ServiceStatus;
};

type AddOnFormState = {
  name: string;
  category: string;
  description: string;
  price: string;
  icon: string;
  status: ServiceStatus;
};

type DeleteTarget =
  | { type: "core"; record: CoreService }
  | { type: "addon"; record: AddOnService }
  | null;

const statusClass: Record<ServiceStatus, string> = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-100 text-slate-700 border-slate-200",
};

const coreCategories = ["Formation", "Finance", "Tax", "Compliance"];
const addOnCategories = ["IP Protection", "Compliance", "Tax Strategy", "Expansion"];

const coreCategoryToBackend: Record<string, string> = {
  Formation: "formation",
  Finance: "accounting",
  Tax: "tax-compliance",
  Compliance: "annual-compliance",
};

const addOnCategoryToBackend: Record<string, string> = {
  "IP Protection": "audit-support",
  Compliance: "bookkeeping",
  "Tax Strategy": "virtual-cfo",
  Expansion: "payroll",
};

const backendToCoreCategory: Record<string, string> = {
  formation: "Formation",
  accounting: "Finance",
  "tax-compliance": "Tax",
  "annual-compliance": "Compliance",
};

const backendToAddOnCategory: Record<string, string> = {
  "audit-support": "IP Protection",
  bookkeeping: "Compliance",
  "virtual-cfo": "Tax Strategy",
  payroll: "Expansion",
};

const inferUiType = (service: any): "core" | "addon" => {
  if (service?.uiType === "core" || service?.uiType === "addon") {
    return service.uiType;
  }
  return backendToCoreCategory[service?.category] ? "core" : "addon";
};

const resolveUiCategory = (service: any, uiType: "core" | "addon") => {
  if (service?.uiCategory) return service.uiCategory;
  return uiType === "core"
    ? backendToCoreCategory[service?.category] || "Formation"
    : backendToAddOnCategory[service?.category] || "IP Protection";
};

const resolvePrice = (pricing: any) =>
  Number(pricing?.starter ?? pricing?.growth ?? pricing?.scale ?? 0);

const emptyCoreForm = (): CoreFormState => ({
  serviceName: "",
  slug: "",
  description: "",
  features: "",
  price: "",
  category: "Formation",
  icon: "",
  status: "active",
});

const emptyAddOnForm = (): AddOnFormState => ({
  name: "",
  category: "IP Protection",
  description: "",
  price: "",
  icon: "",
  status: "active",
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const placeholderIcon = (label: string) =>
  `https://placehold.co/64x64/e2e8f0/0f172a?text=${encodeURIComponent(label.slice(0, 12) || "Service")}`;

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));

const initialCoreServices: CoreService[] = [
  {
    id: "core_1",
    serviceName: "US LLC Formation",
    slug: "us-llc-formation",
    description: "Launch a US LLC with filing, registered agent support, and onboarding guidance.",
    features: ["State filing", "Registered agent", "Formation documents", "Founder onboarding"],
    price: 699,
    category: "Formation",
    icon: placeholderIcon("US LLC"),
    status: "active",
    createdAt: "2026-02-12T00:00:00Z",
  },
  {
    id: "core_2",
    serviceName: "C-Corp Formation",
    slug: "c-corp-formation",
    description: "Set up a Delaware C-Corp optimized for venture-backed startup structures.",
    features: ["Delaware filing", "Cap table starter", "Founder docs", "Compliance checklist"],
    price: 999,
    category: "Formation",
    icon: placeholderIcon("C-Corp"),
    status: "active",
    createdAt: "2026-02-15T00:00:00Z",
  },
  {
    id: "core_3",
    serviceName: "Bookkeeping",
    slug: "bookkeeping",
    description: "Monthly bookkeeping with reconciliations, reporting, and founder-ready financial views.",
    features: ["Monthly close", "P&L reporting", "Balance sheet", "Transaction cleanup"],
    price: 299,
    category: "Finance",
    icon: placeholderIcon("Books"),
    status: "active",
    createdAt: "2026-02-18T00:00:00Z",
  },
  {
    id: "core_4",
    serviceName: "Tax Filing",
    slug: "tax-filing",
    description: "Prepare and file business tax returns with review, schedules, and deadline support.",
    features: ["Return prep", "Tax schedules", "Filing support", "Deadline tracking"],
    price: 499,
    category: "Tax",
    icon: placeholderIcon("Tax"),
    status: "inactive",
    createdAt: "2026-02-22T00:00:00Z",
  },
];

const initialAddOnServices: AddOnService[] = [
  {
    id: "addon_1",
    name: "Trademark Registration",
    category: "IP Protection",
    description: "Trademark filing workflow and documentation support for founders.",
    price: 399,
    icon: placeholderIcon("TM"),
    status: "active",
    createdAt: "2026-02-17T00:00:00Z",
  },
  {
    id: "addon_2",
    name: "S-Corp Election (Form 2553)",
    category: "Tax Strategy",
    description: "Prepare and file Form 2553 to support S-Corp election planning.",
    price: 249,
    icon: placeholderIcon("2553"),
    status: "active",
    createdAt: "2026-02-20T00:00:00Z",
  },
  {
    id: "addon_3",
    name: "Certificate of Good Standing",
    category: "Compliance",
    description: "Request and secure official good standing documentation for the entity.",
    price: 149,
    icon: placeholderIcon("Good"),
    status: "inactive",
    createdAt: "2026-02-23T00:00:00Z",
  },
  {
    id: "addon_4",
    name: "ITIN Application",
    category: "Tax Strategy",
    description: "Application handling and document prep for ITIN submissions.",
    price: 299,
    icon: placeholderIcon("ITIN"),
    status: "active",
    createdAt: "2026-02-25T00:00:00Z",
  },
  {
    id: "addon_5",
    name: "Foreign Qualification",
    category: "Expansion",
    description: "Expand into additional states with qualification filing and support.",
    price: 349,
    icon: placeholderIcon("Expand"),
    status: "active",
    createdAt: "2026-02-27T00:00:00Z",
  },
  {
    id: "addon_6",
    name: "Articles of Amendment",
    category: "Compliance",
    description: "Update legal entity records with amendment filing and admin processing.",
    price: 199,
    icon: placeholderIcon("Amend"),
    status: "active",
    createdAt: "2026-03-01T00:00:00Z",
  },
];

export function ServicesView({ ctx }: { ctx: AdminViewContext }) {
  const { services, createService, updateService, deleteService } = ctx;
  const [activeTab, setActiveTab] = useState<"core" | "addon">("core");
  const [search, setSearch] = useState("");
  const [coreEditingId, setCoreEditingId] = useState<string | null>(null);
  const [addOnEditingId, setAddOnEditingId] = useState<string | null>(null);
  const [coreSlugDirty, setCoreSlugDirty] = useState(false);
  const [coreForm, setCoreForm] = useState<CoreFormState>(emptyCoreForm);
  const [addOnForm, setAddOnForm] = useState<AddOnFormState>(emptyAddOnForm);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
  const [message, setMessage] = useState("");

  const normalizedServices = useMemo(() => (Array.isArray(services) ? services : []), [services]);

  const { coreServices, addOnServices } = useMemo(() => {
    const cores: CoreService[] = [];
    const addons: AddOnService[] = [];

    normalizedServices.forEach((service: any) => {
      const uiType = inferUiType(service);
      const uiCategory = resolveUiCategory(service, uiType);
      const price = resolvePrice(service.pricing);

      if (uiType === "core") {
        cores.push({
          id: String(service._id || service.id),
          serviceName: service.name,
          slug: service.slug,
          description: service.description,
          features: Array.isArray(service.features) ? service.features : [],
          price,
          category: uiCategory,
          icon: service.icon || placeholderIcon(service.name || "Service"),
          status: service.isActive ? "active" : "inactive",
          createdAt: service.createdAt || new Date().toISOString(),
        });
      } else {
        addons.push({
          id: String(service._id || service.id),
          name: service.name,
          category: uiCategory,
          description: service.description,
          price,
          icon: service.icon || placeholderIcon(service.name || "Service"),
          status: service.isActive ? "active" : "inactive",
          createdAt: service.createdAt || new Date().toISOString(),
        });
      }
    });

    return { coreServices: cores, addOnServices: addons };
  }, [normalizedServices]);

  const filteredCoreServices = useMemo(
    () =>
      coreServices.filter((service) =>
        [service.serviceName, service.slug, service.description, service.category, service.features.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [coreServices, search]
  );

  const filteredAddOnServices = useMemo(
    () =>
      addOnServices.filter((service) =>
        [service.name, service.category, service.description].join(" ").toLowerCase().includes(search.toLowerCase())
      ),
    [addOnServices, search]
  );

  const resetCoreForm = () => {
    setCoreEditingId(null);
    setCoreSlugDirty(false);
    setCoreForm(emptyCoreForm());
  };

  const resetAddOnForm = () => {
    setAddOnEditingId(null);
    setAddOnForm(emptyAddOnForm());
  };

  const saveCoreService = async () => {
    if (!coreForm.serviceName.trim() || !coreForm.description.trim() || !coreForm.price.trim()) {
      setMessage("Complete service name, description, and price before saving the core service.");
      return;
    }

    if (Number.isNaN(Number(coreForm.price))) {
      setMessage("Enter a valid numeric price for the core service.");
      return;
    }

    const price = Number(coreForm.price);
    const payload = {
      name: coreForm.serviceName.trim(),
      slug: slugify(coreForm.slug || coreForm.serviceName),
      description: coreForm.description.trim(),
      features: coreForm.features.split(",").map((feature) => feature.trim()).filter(Boolean),
      pricing: { starter: price, growth: price, scale: price },
      category: coreCategoryToBackend[coreForm.category] || "formation",
      isActive: coreForm.status === "active",
      uiType: "core",
      uiCategory: coreForm.category,
      icon: coreForm.icon.trim() || placeholderIcon(coreForm.serviceName),
    };

    const result = coreEditingId
      ? await updateService(coreEditingId, payload)
      : await createService(payload);

    if (!result.success) {
      setMessage(result.error || "Unable to save core service.");
      return;
    }

    setMessage(`Core service "${payload.name}" ${coreEditingId ? "updated" : "created"}.`);
    resetCoreForm();
  };

  const saveAddOnService = async () => {
    if (!addOnForm.name.trim() || !addOnForm.description.trim() || !addOnForm.price.trim()) {
      setMessage("Complete name, description, and price before saving the add-on service.");
      return;
    }

    if (Number.isNaN(Number(addOnForm.price))) {
      setMessage("Enter a valid numeric price for the add-on service.");
      return;
    }

    const price = Number(addOnForm.price);
    const payload = {
      name: addOnForm.name.trim(),
      slug: slugify(addOnForm.name),
      description: addOnForm.description.trim(),
      features: [],
      pricing: { starter: price, growth: price, scale: price },
      category: addOnCategoryToBackend[addOnForm.category] || "audit-support",
      isActive: addOnForm.status === "active",
      uiType: "addon",
      uiCategory: addOnForm.category,
      icon: addOnForm.icon.trim() || placeholderIcon(addOnForm.name),
    };

    const result = addOnEditingId
      ? await updateService(addOnEditingId, payload)
      : await createService(payload);

    if (!result.success) {
      setMessage(result.error || "Unable to save add-on service.");
      return;
    }

    setMessage(`Add-on service "${payload.name}" ${addOnEditingId ? "updated" : "created"}.`);
    resetAddOnForm();
  };

  const editCoreService = (service: CoreService) => {
    setActiveTab("core");
    setCoreEditingId(service.id);
    setCoreSlugDirty(true);
    setCoreForm({
      serviceName: service.serviceName,
      slug: service.slug,
      description: service.description,
      features: service.features.join(", "),
      price: String(service.price),
      category: service.category,
      icon: service.icon,
      status: service.status,
    });
    setMessage("");
  };

  const editAddOnService = (service: AddOnService) => {
    setActiveTab("addon");
    setAddOnEditingId(service.id);
    setAddOnForm({
      name: service.name,
      category: service.category,
      description: service.description,
      price: String(service.price),
      icon: service.icon,
      status: service.status,
    });
    setMessage("");
  };

  const toggleCoreServiceStatus = async (serviceId: string, enabled: boolean) => {
    const target = coreServices.find((service) => service.id === serviceId);
    if (!target) return;
    const result = await updateService(serviceId, { isActive: enabled });
    if (!result.success) {
      setMessage(result.error || "Unable to update service status.");
      return;
    }
    setMessage(`Core service "${target.serviceName}" ${enabled ? "enabled" : "disabled"}.`);
  };

  const toggleAddOnServiceStatus = async (serviceId: string, enabled: boolean) => {
    const target = addOnServices.find((service) => service.id === serviceId);
    if (!target) return;
    const result = await updateService(serviceId, { isActive: enabled });
    if (!result.success) {
      setMessage(result.error || "Unable to update service status.");
      return;
    }
    setMessage(`Add-on service "${target.name}" ${enabled ? "enabled" : "disabled"}.`);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "core") {
      const result = await deleteService(deleteTarget.record.id);
      if (!result.success) {
        setMessage(result.error || "Unable to delete core service.");
        return;
      }
      if (coreEditingId === deleteTarget.record.id) resetCoreForm();
      setMessage(`Core service "${deleteTarget.record.serviceName}" deleted.`);
    } else {
      const result = await deleteService(deleteTarget.record.id);
      if (!result.success) {
        setMessage(result.error || "Unable to delete add-on service.");
        return;
      }
      if (addOnEditingId === deleteTarget.record.id) resetAddOnForm();
      setMessage(`Add-on service "${deleteTarget.record.name}" deleted.`);
    }

    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Total Services</CardDescription>
            <CardTitle className="text-xl sm:text-2xl">{coreServices.length + addOnServices.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Active Core Services</CardDescription>
            <CardTitle className="text-xl sm:text-2xl text-emerald-700">
              {coreServices.filter((service) => service.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Active Add-on Services</CardDescription>
            <CardTitle className="text-xl sm:text-2xl text-sky-700">
              {addOnServices.filter((service) => service.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {message ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-emerald-700">{message}</div>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "core" | "addon");
          setSearch("");
          setMessage("");
        }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Services</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage public core services before login and dashboard upsell add-on services after login.
            </p>
          </div>
          <TabsList className="grid h-auto w-full grid-cols-2 lg:w-[320px]">
            <TabsTrigger className="px-2 py-2 text-xs sm:text-sm" value="core">Core Services</TabsTrigger>
            <TabsTrigger className="px-2 py-2 text-xs sm:text-sm" value="addon">Add-on Services</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="core" className="space-y-4">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr] xl:grid-cols-[420px_minmax(0,1fr)]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">{coreEditingId ? "Edit Core Service" : "Create Core Service"}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">These services appear on the public website before login.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Service Name</label>
                  <Input
                    placeholder="US LLC Formation"
                    value={coreForm.serviceName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCoreForm((prev) => ({
                        ...prev,
                        serviceName: value,
                        slug: coreSlugDirty ? prev.slug : slugify(value),
                      }));
                    }}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Slug</label>
                  <Input
                    placeholder="us-llc-formation"
                    value={coreForm.slug}
                    onChange={(e) => {
                      setCoreSlugDirty(true);
                      setCoreForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                    }}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Description</label>
                  <Textarea
                    rows={4}
                    placeholder="Describe the public service offering."
                    value={coreForm.description}
                    onChange={(e) => setCoreForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Features</label>
                  <Textarea
                    rows={3}
                    placeholder="State filing, Registered agent, Formation documents"
                    value={coreForm.features}
                    onChange={(e) => setCoreForm((prev) => ({ ...prev, features: e.target.value }))}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Enter features separated by commas.</p>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700">Price</label>
                    <Input
                      placeholder="699"
                      value={coreForm.price}
                      onChange={(e) => setCoreForm((prev) => ({ ...prev, price: e.target.value }))}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700">Category</label>
                    <Select value={coreForm.category} onValueChange={(value) => setCoreForm((prev) => ({ ...prev, category: value }))}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {coreCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Icon / Image URL</label>
                  <Input
                    placeholder="https://example.com/service-image.png"
                    value={coreForm.icon}
                    onChange={(e) => setCoreForm((prev) => ({ ...prev, icon: e.target.value }))}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 rounded-lg border border-slate-200 px-3 py-2.5 sm:py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800">Service Status</p>
                    <p className="text-xs text-muted-foreground">Enable or disable this core service.</p>
                  </div>
                  <Switch
                    checked={coreForm.status === "active"}
                    onCheckedChange={(checked) => setCoreForm((prev) => ({ ...prev, status: checked ? "active" : "inactive" }))}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={saveCoreService} className="text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    {coreEditingId ? "Update Service" : "Create Service"}
                  </Button>
                  <Button variant="outline" onClick={resetCoreForm} className="text-sm">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="gap-3 flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">Core Services Table</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Public website services shown before login.</CardDescription>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-3 sm:top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 text-sm" placeholder="Search core services" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto rounded-lg border">
                  <Table className="min-w-[860px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCoreServices.length ? (
                        filteredCoreServices.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                  src={service.icon}
                                  alt={service.serviceName}
                                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border border-slate-200 object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="break-words font-medium text-slate-900 text-sm">{service.serviceName}</p>
                                  <p className="break-all text-xs text-muted-foreground">{service.slug}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{service.category}</TableCell>
                            <TableCell className="text-sm">${service.price}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Badge className={cn("border capitalize text-xs", statusClass[service.status])}>{service.status}</Badge>
                                <Switch
                                  checked={service.status === "active"}
                                  onCheckedChange={(checked) => toggleCoreServiceStatus(service.id, checked)}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm whitespace-nowrap">{formatDate(service.createdAt)}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <Button size="sm" variant="outline" onClick={() => editCoreService(service)} className="h-8 px-2 sm:px-3">
                                  <Pencil className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs">Edit</span>
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => setDeleteTarget({ type: "core", record: service })} className="h-8 px-2 sm:px-3">
                                  <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                            No core services match the current search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="addon" className="space-y-4">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr] xl:grid-cols-[420px_minmax(0,1fr)]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">{addOnEditingId ? "Edit Add-on Service" : "Create Add-on Service"}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">These services appear in the user dashboard after login under Services &amp; Add-ons.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Name</label>
                  <Input
                    placeholder="Trademark Registration"
                    value={addOnForm.name}
                    onChange={(e) => setAddOnForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Category</label>
                  <Select value={addOnForm.category} onValueChange={(value) => setAddOnForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {addOnCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700">Description</label>
                  <Textarea
                    rows={4}
                    placeholder="Describe the add-on service."
                    value={addOnForm.description}
                    onChange={(e) => setAddOnForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="text-sm"
                  />
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700">Price</label>
                    <Input
                      placeholder="399"
                      value={addOnForm.price}
                      onChange={(e) => setAddOnForm((prev) => ({ ...prev, price: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-slate-700">Icon / Image URL</label>
                    <Input
                      placeholder="https://example.com/addon-image.png"
                      value={addOnForm.icon}
                      onChange={(e) => setAddOnForm((prev) => ({ ...prev, icon: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 rounded-lg border border-slate-200 px-3 py-2.5 sm:py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800">Service Status</p>
                    <p className="text-xs text-muted-foreground">Enable or disable this dashboard add-on service.</p>
                  </div>
                  <Switch
                    checked={addOnForm.status === "active"}
                    onCheckedChange={(checked) => setAddOnForm((prev) => ({ ...prev, status: checked ? "active" : "inactive" }))}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={saveAddOnService} className="text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    {addOnEditingId ? "Update Add-on" : "Create Add-on"}
                  </Button>
                  <Button variant="outline" onClick={resetAddOnForm} className="text-sm">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="gap-3 flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">Add-on Services Table</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Dashboard upsell services shown after login.</CardDescription>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-3 sm:top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 text-sm" placeholder="Search add-on services" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto rounded-lg border">
                  <Table className="min-w-[860px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAddOnServices.length ? (
                        filteredAddOnServices.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <img src={service.icon} alt={service.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border border-slate-200 object-cover shrink-0" />
                                <div className="min-w-0">
                                  <p className="break-words font-medium text-slate-900 text-sm">{service.name}</p>
                                  <p className="break-words text-xs text-muted-foreground">{service.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{service.category}</TableCell>
                            <TableCell className="text-sm">${service.price}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Badge className={cn("border capitalize text-xs", statusClass[service.status])}>{service.status}</Badge>
                                <Switch
                                  checked={service.status === "active"}
                                  onCheckedChange={(checked) => toggleAddOnServiceStatus(service.id, checked)}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm whitespace-nowrap">{formatDate(service.createdAt)}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <Button size="sm" variant="outline" onClick={() => editAddOnService(service)} className="h-8 px-2 sm:px-3">
                                  <Pencil className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs">Edit</span>
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => setDeleteTarget({ type: "addon", record: service })} className="h-8 px-2 sm:px-3">
                                  <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                            No add-on services match the current search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              {deleteTarget?.type === "core"
                ? `Delete "${deleteTarget.record.serviceName}" from core services?`
                : deleteTarget?.type === "addon"
                  ? `Delete "${deleteTarget.record.name}" from add-on services?`
                  : "Delete this service?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
