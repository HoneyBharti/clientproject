import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";

export function ClientDocumentsModal({ ctx }: { ctx: AdminViewContext }) {
  const {
    isUserDocumentModalOpen,
    setIsUserDocumentModalOpen,
    setAdminUploadFile,
    setAdminUploadFileInputKey,
    setAdminUploadDocumentName,
    setAdminUploadMessage,
    selectedClient,
    adminUploadFileInputKey,
    adminUploadDocumentName,
    adminUploadDocumentCategory,
    setAdminUploadDocumentCategory,
    uploadDocumentForSelectedClient,
    adminUploadFile,
    adminUploadMessage,
    selectedClientUploadedDocuments,
    selectedClientAdminDocuments,
    documentStatusClass,
    dt,
  } = ctx;

  return (
    <Dialog
      open={isUserDocumentModalOpen}
      onOpenChange={(open) => {
        setIsUserDocumentModalOpen(open);
        if (!open) {
          setAdminUploadFile(null);
          setAdminUploadFileInputKey((prev: number) => prev + 1);
          setAdminUploadDocumentName("");
          setAdminUploadMessage("");
        }
      }}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Client Documents</DialogTitle>
          <DialogDescription>
            {selectedClient
              ? `${selectedClient.name} (${selectedClient.companyName})`
              : "Select a user to manage documents"}
          </DialogDescription>
        </DialogHeader>

        {selectedClient ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 rounded border p-3 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Input
                  key={adminUploadFileInputKey}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={(e) => setAdminUploadFile(e.target.files?.[0] ?? null)}
                />
              </div>
              <div className="lg:col-span-3">
                <Input
                  placeholder="Document name (optional)"
                  value={adminUploadDocumentName}
                  onChange={(e) => setAdminUploadDocumentName(e.target.value)}
                />
              </div>
              <div className="lg:col-span-3">
                <Select
                  value={adminUploadDocumentCategory}
                  onValueChange={(value) => setAdminUploadDocumentCategory(value as any)}
                >
                  <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KYC">KYC</SelectItem>
                    <SelectItem value="Tax">Tax</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Button className="w-full" onClick={uploadDocumentForSelectedClient}>
                  Upload File
                </Button>
              </div>
            </div>

            {adminUploadFile ? (
              <p className="text-xs text-muted-foreground">Selected file: {adminUploadFile.name}</p>
            ) : null}
            {adminUploadMessage ? <p className="text-xs text-emerald-700">{adminUploadMessage}</p> : null}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Client Uploaded Documents</CardTitle>
                <CardDescription>Documents uploaded by the client account</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedClientUploadedDocuments.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedClientUploadedDocuments.map((doc: any) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.document}</TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>
                            <Badge className={cn("border capitalize", documentStatusClass[doc.status])}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(doc.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-sm text-muted-foreground">No client uploaded documents for this account.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Admin Uploaded Files</CardTitle>
                <CardDescription>Files uploaded to this client by admin</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedClientAdminDocuments.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedClientAdminDocuments.map((doc: any) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.document}</TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>
                            <Badge className={cn("border capitalize", documentStatusClass[doc.status])}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{dt(doc.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-sm text-muted-foreground">No admin uploaded files for this account.</p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No user selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
