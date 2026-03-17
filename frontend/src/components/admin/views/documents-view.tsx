import { Search, Folder, FolderOpen, FileText, ChevronRight, ChevronDown, Eye, Download, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AdminViewContext } from "./types";
import { useState } from "react";

type DocumentItem = {
  id: string;
  client: string;
  company: string;
  document: string;
  category: string;
  source: string;
  status: string;
  updatedAt: string;
  folder: string;
  subfolder?: string;
  documentType?: string;
};

type FolderStructure = {
  [folder: string]: {
    [subfolder: string]: DocumentItem[];
  };
};

export function DocumentsView({ ctx }: { ctx: AdminViewContext }) {
  const {
    documentQ,
    setDocumentQ,
    documentStatus,
    setDocumentStatus,
    documentActionMessage,
    filteredDocuments,
    sourceClass,
    documentStatusClass,
    dt,
    openDocumentModalForClient,
    setDocumentState,
  } = ctx;

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'folders'>('folders');

  // Organize documents into folder structure
  const organizeDocumentsIntoFolders = (docs: any[]): FolderStructure => {
    const structure: FolderStructure = {};

    docs.forEach((doc) => {
      const folder = doc.folder || (doc.source === "client_uploads" ? "KYC" : "Compliance");
      const subfolder = doc.subfolder || doc.client;

      if (!structure[folder]) {
        structure[folder] = {};
      }
      if (!structure[folder][subfolder]) {
        structure[folder][subfolder] = [];
      }
      structure[folder][subfolder].push(doc);
    });

    return structure;
  };

  const folderStructure = organizeDocumentsIntoFolders(filteredDocuments);

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const getFolderIcon = (folderName: string, isOpen: boolean) => {
    if (isOpen) return <FolderOpen className="w-5 h-5 text-blue-600" />;
    return <Folder className="w-5 h-5 text-blue-600" />;
  };

  const getDocumentIcon = (docType?: string) => {
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  const renderTableView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search client/company/document" value={documentQ} onChange={(e) => setDocumentQ(e.target.value)} />
          </div>
          <div className="lg:col-span-4">
            <Select value={documentStatus} onValueChange={(v) => setDocumentStatus(v as any)}>
              <SelectTrigger><SelectValue placeholder="Document Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setViewMode('folders')}
          className="ml-4"
        >
          <Folder className="w-4 h-4 mr-2" />
          Folder View
        </Button>
      </div>

      {documentActionMessage ? <p className="text-xs text-emerald-700">{documentActionMessage}</p> : null}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folder</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc: any) => (
              <tr key={doc.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.client}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{doc.company}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getDocumentIcon(doc.documentType)}
                    <span className="ml-2 text-sm text-gray-900">{doc.document}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {doc.category}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.folder || (doc.source === "client_uploads" ? "KYC" : "Compliance")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge className={cn("border capitalize", documentStatusClass[doc.status])}>{doc.status}</Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">{dt(doc.updatedAt)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openDocumentModalForClient(doc.client)}>
                      Manage
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setDocumentState(doc.id, "verified")}>Verify</Button>
                    <Button size="sm" variant="destructive" onClick={() => setDocumentState(doc.id, "rejected")}>Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFolderView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search client/company/document" value={documentQ} onChange={(e) => setDocumentQ(e.target.value)} />
          </div>
          <div className="lg:col-span-4">
            <Select value={documentStatus} onValueChange={(v) => setDocumentStatus(v as any)}>
              <SelectTrigger><SelectValue placeholder="Document Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setViewMode('table')}
          className="ml-4"
        >
          <FileText className="w-4 h-4 mr-2" />
          Table View
        </Button>
      </div>

      {documentActionMessage ? <p className="text-xs text-emerald-700">{documentActionMessage}</p> : null}

      <div className="space-y-2">
        {Object.entries(folderStructure).map(([folderName, subfolders]) => (
          <div key={folderName} className="border rounded-lg overflow-hidden">
            {/* Main Folder */}
            <div
              className="bg-blue-50 px-4 py-3 cursor-pointer hover:bg-blue-100 transition-colors flex items-center"
              onClick={() => toggleFolder(`folder-${folderName}`)}
            >
              {expandedFolders.has(`folder-${folderName}`) ? (
                <ChevronDown className="w-5 h-5 text-blue-600 mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 text-blue-600 mr-2" />
              )}
              {getFolderIcon(folderName, expandedFolders.has(`folder-${folderName}`))}
              <span className="ml-2 font-medium text-blue-900">{folderName}</span>
              <Badge variant="secondary" className="ml-2">
                {Object.values(subfolders).reduce((total, docs) => total + docs.length, 0)} documents
              </Badge>
            </div>

            {/* Subfolders */}
            {expandedFolders.has(`folder-${folderName}`) && (
              <div className="bg-gray-50">
                {Object.entries(subfolders).map(([subfolderName, documents]) => (
                  <div key={subfolderName}>
                    <div
                      className="px-6 py-2 cursor-pointer hover:bg-gray-100 transition-colors flex items-center border-l-2 border-blue-200"
                      onClick={() => toggleFolder(`subfolder-${folderName}-${subfolderName}`)}
                    >
                      {expandedFolders.has(`subfolder-${folderName}-${subfolderName}`) ? (
                        <ChevronDown className="w-4 h-4 text-gray-600 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      <Folder className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-800">{subfolderName}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {documents.length} files
                      </Badge>
                    </div>

                    {/* Documents */}
                    {expandedFolders.has(`subfolder-${folderName}-${subfolderName}`) && (
                      <div className="bg-white border-t border-gray-200">
                        {documents.map((doc) => (
                          <div key={doc.id} className="px-8 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center flex-1">
                                {getDocumentIcon(doc.documentType)}
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{doc.document}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {doc.category}
                                    </Badge>
                                    <Badge className={cn("border capitalize text-xs", documentStatusClass[doc.status])}>
                                      {doc.status}
                                    </Badge>
                                    <span className="text-xs text-gray-500">{dt(doc.updatedAt)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => openDocumentModalForClient(doc.client)}>
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setDocumentState(doc.id, "verified")}>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verify
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setDocumentState(doc.id, "rejected")}>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Documents</CardTitle>
        <CardDescription>Track collection and verification by client</CardDescription>
      </CardHeader>
      <CardContent>
        {viewMode === 'table' ? renderTableView() : renderFolderView()}
      </CardContent>
    </Card>
  );
}
