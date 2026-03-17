'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  FolderDown,
  Eye,
  Download,
  User,
  Shield,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Table,
  Grid3X3,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/lib/api-base';

interface DocumentFile {
  id: string;
  name: string;
  size?: number;
  uploadDate?: string;
  status?: string;
  folder?: string;
  subfolder?: string;
  documentType?: string;
  source: 'client_uploads' | 'legal_docs';
}

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result;
      if (typeof value !== 'string') {
        reject(new Error('Could not read file.'));
        return;
      }
      const payload = value.includes(',') ? value.split(',')[1] : value;
      resolve(payload);
    };
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });

const parseErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data = await response.json();
    return data?.message || fallback;
  } catch {
    return fallback;
  }
};

  const formatSizeMb = (size?: number) => {
    if (!size) return '0.00 MB';
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };

  const resolveDocumentUrl = (docId: string, forceDownload = false) =>
    `${API_BASE_URL}/documents/${docId}/download${forceDownload ? '?download=1' : ''}`;

export function CompanyDocuments() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetUserId, setTargetUserId] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'folders'>('folders');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['KYC', 'Compliance']));

  const { user: authUser } = useAuth();
  const isAdmin = authUser?.role === 'admin';
  const openDocument = useCallback(
    async (doc: DocumentFile, mode: 'view' | 'download') => {
      try {
        const response = await fetch(resolveDocumentUrl(doc.id, mode === 'download'), {
          credentials: 'include',
        });
        if (!response.ok) {
          const message = await parseErrorMessage(response, 'Unable to fetch document.');
          throw new Error(message);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        if (mode === 'view') {
          const opened = window.open(blobUrl, '_blank', 'noopener,noreferrer');
          if (!opened) {
            const fallback = document.createElement('a');
            fallback.href = blobUrl;
            fallback.download = doc.name || 'document';
            document.body.appendChild(fallback);
            fallback.click();
            fallback.remove();
          }
        } else {
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = doc.name || 'document';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }

        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000);
      } catch (openError: any) {
        if (openError instanceof TypeError) {
          const fallbackUrl = resolveDocumentUrl(doc.id, mode === 'download');
          window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
          return;
        }

        toast({
          variant: 'destructive',
          title: 'Unable to open document',
          description: openError?.message || 'Could not open this file.',
        });
      }
    },
    [toast]
  );

  const fetchDocuments = useCallback(
    async (userId?: string) => {
      setIsLoading(true);
      setDocuments([]);

      try {
        const endpoint = isAdmin && userId
          ? `${API_BASE_URL}/documents/admin/user/${userId}`
          : `${API_BASE_URL}/documents/me`;

        const response = await fetch(endpoint, { credentials: 'include' });
        if (!response.ok) {
          const message = await parseErrorMessage(response, 'Could not fetch documents.');
          throw new Error(message);
        }

        const data = await response.json();
        const fetchedDocs: DocumentFile[] = (data.documents || []).map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          folder: doc.folder || 'KYC',
          subfolder: doc.subfolder,
          documentType: doc.documentType,
          source: doc.source,
          size: doc.size,
          status: doc.status,
          uploadDate: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : undefined,
        }));
        setDocuments(fetchedDocs);
      } catch (fetchError: any) {
        console.error('Error fetching documents:', fetchError);
        toast({
          variant: 'destructive',
          title: 'Could not fetch documents',
          description: fetchError?.message || 'There was an issue retrieving files.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin, toast]
  );

  useEffect(() => {
    if (isAdmin) {
      if (targetUserId) {
        fetchDocuments(targetUserId);
      } else {
        setDocuments([]);
      }
      return;
    }
    fetchDocuments();
  }, [isAdmin, targetUserId, fetchDocuments]);

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFolderStructure = (sourceDocs: DocumentFile[]) => {
    const structure: { [key: string]: { [key: string]: DocumentFile[] } } = {};

    sourceDocs.forEach(doc => {
      const folder = doc.folder || 'KYC';
      const subfolder = doc.subfolder || 'General';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    if (isAdmin && !targetUserId) {
      setError('Admins must specify a target user ID.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const fileDataBase64 = await toBase64(file);
      const payload = {
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileDataBase64,
        folder: 'KYC', // Default folder for user uploads
        subfolder: 'General', // Default subfolder
        documentType: 'other', // Default document type
      };

      const endpoint = isAdmin
        ? `${API_BASE_URL}/documents/admin/user/${targetUserId}/upload-official`
        : `${API_BASE_URL}/documents/me/upload-client`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response, 'Upload failed. Please try again.');
        throw new Error(message);
      }

      toast({
        title: 'Upload Complete',
        description: `${file.name} has been uploaded successfully.`,
      });

      setFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';

      if (isAdmin) {
        await fetchDocuments(targetUserId);
      } else {
        await fetchDocuments();
      }
    } catch (uploadError: any) {
      console.error('Upload Error:', uploadError);
      setError(uploadError?.message || 'Upload failed. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: uploadError?.message || 'Upload failed. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderDocumentRow = (doc: DocumentFile) => (
    <tr key={doc.id} className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-gray-400" />
          <div>
            <button
              type="button"
              onClick={() => openDocument(doc, 'view')}
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left"
            >
              {doc.name}
            </button>
            <div className="text-sm text-gray-500">
              {doc.documentType && <span className="mr-2">Type: {doc.documentType}</span>}
              {doc.uploadDate && <span>Uploaded: {doc.uploadDate}</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {doc.folder}/{doc.subfolder}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatSizeMb(doc.size)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <span className={`px-2 py-1 rounded-full text-xs ${
          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {doc.status || 'Unknown'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openDocument(doc, 'view')}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => openDocument(doc, 'download')}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  const renderFolderSection = (title: string, sourceDocs: DocumentFile[]) => {
    const folderStructure = getFolderStructure(sourceDocs);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span>{title}</span>
          <span className="text-xs text-gray-500">({sourceDocs.length})</span>
        </div>
        {Object.entries(folderStructure).map(([folderName, subfolders]) => (
          <div key={folderName} className="border rounded-lg">
            <button
              onClick={() => toggleFolder(folderName)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedFolders.has(folderName) ? (
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                ) : (
                  <Folder className="h-5 w-5 text-blue-600" />
                )}
                <span className="font-medium text-gray-900">{folderName}</span>
                <span className="text-sm text-gray-500">
                  ({Object.values(subfolders).flat().length} documents)
                </span>
              </div>
              {expandedFolders.has(folderName) ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {expandedFolders.has(folderName) && (
              <div className="border-t">
                {Object.entries(subfolders).map(([subfolderName, docs]) => (
                  <div key={subfolderName} className="border-b last:border-b-0">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border-l-4 border-blue-200">
                      <Folder className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-gray-700">{subfolderName}</span>
                      <span className="text-xs text-gray-500">({docs.length} files)</span>
                    </div>
                    <div className="pl-8 pr-4 pb-2">
                      {docs.length > 0 ? (
                        <div className="space-y-2">
                          {docs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() => openDocument(doc, 'view')}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline truncate block"
                                  >
                                    {doc.name}
                                  </button>
                                  <div className="text-xs text-gray-500">
                                    {doc.documentType && <span>Type: {doc.documentType} • </span>}
                                    {formatSizeMb(doc.size)} • {doc.uploadDate}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <Button variant="ghost" size="sm" onClick={() => openDocument(doc, 'view')}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => openDocument(doc, 'download')}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                          No documents in this folder
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(folderStructure).length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No documents found.
          </div>
        )}
      </div>
    );
  };

  const renderFolderView = () => {
    const clientDocs = documents.filter((doc) => doc.source === 'client_uploads');
    const legalDocs = documents.filter((doc) => doc.source === 'legal_docs');

    return (
      <div className="space-y-6">
        {renderFolderSection('Client Uploaded Documents', clientDocs)}
        {renderFolderSection('YourLegal Documents', legalDocs)}
      </div>
    );
  };

  const renderTableSection = (title: string, sourceDocs: DocumentFile[]) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <span>{title}</span>
        <span className="text-xs text-gray-500">({sourceDocs.length})</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Document</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Location</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Size</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sourceDocs.map(renderDocumentRow)}
          </tbody>
        </table>
        {sourceDocs.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No documents found.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>My Documents</span>
            </CardTitle>
            <CardDescription>
              {isAdmin
                ? 'Backend Portal: Manage documents for any client.'
                : 'View and manage your uploaded documents in organized folders.'}
            </CardDescription>
          </div>
          {!isAdmin && (
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'folders' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('folders')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Folders
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table className="h-4 w-4 mr-2" />
                Table
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 border-t pt-4">
          {isAdmin ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <Label htmlFor="target-user-id" className="flex items-center gap-2 font-bold text-blue-800">
                  <Shield className="h-5 w-5" /> Super Admin: Backend Control
                </Label>
                <p className="mb-2 text-xs text-blue-700">Enter the client&apos;s User ID to load their documents or upload new ones on their behalf.</p>
                <Input
                  id="target-user-id"
                  placeholder="Enter client User ID..."
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="flex w-full items-center space-x-2">
                <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-1" disabled={isUploading || !targetUserId} />
                <Button onClick={handleUpload} disabled={!file || isUploading || !targetUserId}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload to Client
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center space-x-2">
              <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-1" disabled={isUploading} />
              <Button onClick={handleUpload} disabled={!file || isUploading}>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Upload Document
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-3 text-muted-foreground">Loading documents...</p>
          </div>
        ) : (!isAdmin || targetUserId) ? (
          viewMode === 'table' ? (
            <div className="space-y-6">
              {renderTableSection('Client Uploaded Documents', documents.filter((doc) => doc.source === 'client_uploads'))}
              {renderTableSection('YourLegal Documents', documents.filter((doc) => doc.source === 'legal_docs'))}
            </div>
          ) : renderFolderView()
        ) : (
          <div className="mt-6 rounded-md border-2 border-dashed p-8 text-center">
            <p className="text-muted-foreground">Enter a client User ID above to begin managing their documents.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
