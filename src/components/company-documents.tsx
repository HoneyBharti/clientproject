
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  UploadTask,
  getMetadata,
} from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Upload,
  MoreVertical,
  Loader2,
  AlertCircle,
  FolderDown,
  User,
  Shield,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface DocumentFile {
  name: string;
  url: string;
  size?: number;
  uploadDate?: string;
  folder: 'client' | 'team';
}

// HINDI COMMENT: यह एडमिन का ईमेल पता है। Super Admin की पहचान इसी से होती है।
const ADMIN_EMAIL = 'contactus@yourlegal.in';

export function CompanyDocuments() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // HINDI COMMENT: यह State एडमिन द्वारा दर्ज की गई क्लाइंट User ID को स्टोर करता है।
  const [targetUserId, setTargetUserId] = useState('');
  // HINDI COMMENT: यहाँ हम जांचते हैं कि क्या लॉग इन किया हुआ उपयोगकर्ता Super Admin है।
  const isSuperAdmin = user?.email === ADMIN_EMAIL;

  const fetchDocuments = useCallback(async (userId: string) => {
    if (!userId || !firestore) return;
    setIsLoading(true);
    setDocuments([]);
    
    const storage = getStorage();
    const fetchedDocs: DocumentFile[] = [];

    try {
      // 1. Fetch from client_uploads folder
      const clientUploadsRef = ref(storage, `companies/${userId}/client_uploads`);
      const clientUploadsRes = await listAll(clientUploadsRef);
      for (const itemRef of clientUploadsRes.items) {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        fetchedDocs.push({
          name: itemRef.name,
          url,
          folder: 'client',
          size: metadata.size,
          uploadDate: metadata.timeCreated ? new Date(metadata.timeCreated).toLocaleDateString() : undefined,
        });
      }

      // 2. Fetch from legal_docs folder (where admin uploads go)
      const legalDocsRef = ref(storage, `companies/${userId}/legal_docs`);
      const legalDocsRes = await listAll(legalDocsRef);
      for (const itemRef of legalDocsRes.items) {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        fetchedDocs.push({
          name: itemRef.name,
          url,
          folder: 'team',
          size: metadata.size,
          uploadDate: metadata.timeCreated ? new Date(metadata.timeCreated).toLocaleDateString() : undefined
        });
      }
      
      setDocuments(fetchedDocs);

    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        variant: 'destructive',
        title: 'Could not fetch documents',
        description: 'There was an issue retrieving files. Ensure the User ID is correct.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [firestore, toast]);

  useEffect(() => {
    const userIdToFetch = isSuperAdmin ? targetUserId : user?.uid;
    if (userIdToFetch) {
      fetchDocuments(userIdToFetch);
    } else {
      setDocuments([]);
    }
  }, [user, fetchDocuments, isSuperAdmin, targetUserId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    const uploadUserId = isSuperAdmin ? targetUserId : user?.uid;

    if (!file || !uploadUserId || !firestore) {
      setError('Please select a file. Admins must specify a target user ID.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const storage = getStorage();
    // HINDI COMMENT: अगर एडमिन है, तो 'legal_docs' फोल्डर में अपलोड करें, वर्ना 'client_uploads' में।
    const folderType = isSuperAdmin ? 'legal_docs' : 'client_uploads';
    const storagePath = `companies/${uploadUserId}/${folderType}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (uploadError) => {
        console.error('Upload Error:', uploadError);
        let errorMessage = 'Upload failed. Please try again.';
        if (uploadError.code === 'storage/unauthorized') {
          errorMessage = "Permission Denied. Your 'storage.rules' backend rejected this request.";
        }
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: errorMessage,
        });
        setIsUploading(false);
        setUploadProgress(null);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const documentsColRef = collection(firestore, `users/${uploadUserId}/companies/mock-company-id/documents`);
          
          await addDoc(documentsColRef, {
            name: file.name,
            fileUrl: downloadURL,
            uploadDate: serverTimestamp(),
            size: file.size,
            companyId: 'mock-company-id',
          });
          
          toast({
            title: 'Upload Complete',
            description: `${file.name} has been successfully uploaded for user ${uploadUserId}.`,
          });
          fetchDocuments(uploadUserId);
        } catch (firestoreError: any) {
          console.error('Firestore Error:', firestoreError);
          setError('Failed to save document metadata.');
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not save document information after upload.',
          });
        } finally {
          setIsUploading(false);
          setUploadProgress(null);
          setFile(null);
          const fileInput = document.getElementById('file-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        }
      }
    );
  };

  const renderFileList = (title: string, docs: DocumentFile[], folderType: 'client' | 'team', isLoading: boolean) => {
    const folderDocs = docs.filter(d => d.folder === folderType);
    const Icon = folderType === 'client' ? User : FolderDown;
    const iconColor = folderType === 'client' ? "text-green-500" : "text-indigo-500";

    return (
      <div className="mt-6">
        <h4 className={`font-medium mb-4 flex items-center gap-2`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </h4>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : folderDocs.length > 0 ? (
          <ul className="space-y-2">
            {folderDocs.map((doc, index) => (
              <li
                key={`${doc.name}-${index}`}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div className="truncate">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="font-medium truncate hover:underline">
                      {doc.name}
                    </a>
                    {doc.uploadDate && doc.size && (
                      <p className="text-sm text-muted-foreground">
                        {`${(doc.size / 1024 / 1024).toFixed(2)} MB`} - 
                        Uploaded on {doc.uploadDate}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options for {doc.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8 border-dashed border-2 rounded-md">
            <p className="text-muted-foreground">No documents found in this folder.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Company Documents</span>
              </CardTitle>
              <CardDescription>
                {/* HINDI COMMENT: एडमिन और क्लाइंट के लिए अलग-अलग विवरण दिखाना। */}
                {isSuperAdmin
                  ? "Backend Portal: Manage documents for any client."
                  : "Upload your documents and view files from the YourLegal team."}
              </CardDescription>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          {/* HINDI COMMENT: यह Super Admin का इंटरफ़ेस है। */}
          {isSuperAdmin ? (
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Label htmlFor="target-user-id" className="font-bold text-blue-800 flex items-center gap-2">
                        <Shield className="h-5 w-5" /> Super Admin: Backend Control
                    </Label>
                    <p className="text-xs text-blue-700 mb-2">Enter the client's User ID to load their documents or upload new ones on their behalf.</p>
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
            // HINDI COMMENT: यह नियमित क्लाइंट का इंटरफ़ेस है।
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
        {isUploading && uploadProgress !== null && (
          <div className="mb-4 space-y-2">
            <p className="text-sm font-medium">Uploading: {file?.name}</p>
            <Progress value={uploadProgress} />
          </div>
        )}
        {error && (
            <div className="mb-4 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
            </div>
        )}
        
        {(!isSuperAdmin || targetUserId) ? (
          <>
            {renderFileList("Client Uploaded Documents", documents, 'client', isLoading)}
            {renderFileList("Official Documents from YourLegal", documents, 'team', isLoading)}
          </>
        ) : (
           <div className="text-center p-8 border-dashed border-2 rounded-md mt-6">
            <p className="text-muted-foreground">Enter a client User ID above to begin managing their documents.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
