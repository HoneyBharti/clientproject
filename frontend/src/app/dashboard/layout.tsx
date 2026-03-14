'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import PortalPage from './page';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const needsLogin = !loading && !user;
  const needsPlan = !loading && user && user.role !== 'admin' && !user.servicePlan;

  useEffect(() => {
    if (needsLogin) {
      router.push('/login');
      return;
    }
    if (needsPlan) {
      router.replace('/usa/pricing');
    }
  }, [needsLogin, needsPlan, router]);

  if (loading || needsLogin || needsPlan) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return <PortalPage onLogout={logout} />;
}
