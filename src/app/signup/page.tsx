
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { format } from "date-fns"
import { Loader2, ArrowLeft, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [incorporationDate, setIncorporationDate] = useState<Date | undefined>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!fullName || !companyName || !incorporationDate) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName: fullName });

      const userDocRef = doc(firestore, 'users', newUser.uid);
      await setDoc(userDocRef, {
        id: newUser.uid,
        email: newUser.email,
        fullName: fullName,
      });

      const companyId = doc(collection(firestore, 'dummy')).id;
      const companyDocRef = doc(firestore, `users/${newUser.uid}/companies`, companyId);
      await setDoc(companyDocRef, {
        id: companyId,
        name: companyName,
        incorporationDate: incorporationDate.toISOString(),
        userId: newUser.uid,
        formationState: "Unknown",
        registeredAgent: "Unknown",
        ein: "Unknown"
      });

      toast({
        title: 'Account Created!',
        description: 'Welcome! You will now be redirected to your portal.',
      });

    } catch (error: any) {
      let friendlyMessage = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        friendlyMessage = "This email is already in use. Please log in instead.";
      } else if (error.code === 'auth/invalid-email') {
        friendlyMessage = "Please enter a valid email address.";
      }
      setError(friendlyMessage);
      setLoading(false);
    }
  };

  if (isUserLoading || user) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
        </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      <Link href="/" className="absolute top-8 left-8 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      <div className="mb-8">
        <Link href="/">
          <Image src="/logo.png" alt="YourLegal Logo" width={180} height={40} />
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-2xl border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Join thousands of global founders.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-50"
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="ACME Inc."
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-gray-50"
              />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="incorporationDate">Date of Incorporation</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50",
                        !incorporationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {incorporationDate ? format(incorporationDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={incorporationDate}
                      onSelect={setIncorporationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50"
                placeholder="6+ characters"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full font-bold shadow-lg shadow-blue-200" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account & Go to Portal
            </Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
