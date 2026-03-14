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
  folder: 'client' | 'team';
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
          folder: doc.source === 'client_uploads' ? 'client' : 'team',
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

  const renderFileList = (title: string, docs: DocumentFile[], folderType: 'client' | 'team', isLoadingList: boolean) => {
    const folderDocs = docs.filter((d) => d.folder === folderType);
    const Icon = folderType === 'client' ? User : FolderDown;
    const iconColor = folderType === 'client' ? 'text-green-500' : 'text-indigo-500';

    return (
      <div className="mt-6">
        <h4 className="mb-4 flex items-center gap-2 font-medium">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </h4>
        {isLoadingList ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : folderDocs.length > 0 ? (
          <ul className="space-y-2">
            {folderDocs.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="h-6 w-6 flex-shrink-0 text-muted-foreground" />
                  <div className="truncate">
                    <button
                      type="button"
                      onClick={() => openDocument(doc, 'view')}
                      className="truncate font-medium hover:underline text-left"
                    >
                      {doc.name}
                    </button>
                    {doc.uploadDate && (
                      <p className="text-sm text-muted-foreground">
                        {formatSizeMb(doc.size)} - Uploaded on {doc.uploadDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openDocument(doc, 'view')}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View {doc.name}</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDocument(doc, 'download')}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download {doc.name}</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md border-2 border-dashed p-8 text-center">
            <p className="text-muted-foreground">No documents found in this folder.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Company Documents</span>
            </CardTitle>
            <CardDescription>
              {isAdmin
                ? 'Backend Portal: Manage documents for any client.'
                : 'Upload your documents and view files from the YourLegal team.'}
            </CardDescription>
          </div>
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
                Upload Your Document
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

        {!isAdmin || targetUserId ? (
          <>
            {renderFileList('Client Uploaded Documents', documents, 'client', isLoading)}
            {renderFileList('Official Documents from YourLegal', documents, 'team', isLoading)}
          </>
        ) : (
          <div className="mt-6 rounded-md border-2 border-dashed p-8 text-center">
            <p className="text-muted-foreground">Enter a client User ID above to begin managing their documents.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
