'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import PortalPage from './page';
import { API_BASE_URL } from '@/lib/api-base';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const needsLogin = !loading && !user;
  const isStandardUser = !loading && user && user.role !== 'admin';

  const resolvePricingCountry = (value?: string) => {
    if (!value) return 'USA';
    const normalized = String(value).trim();
    if (!normalized) return 'USA';
    const map: Record<string, string> = {
      US: 'USA',
      USA: 'USA',
      'United States': 'USA',
      UK: 'UK',
      'U.K.': 'UK',
      'United Kingdom': 'UK',
      UAE: 'UAE',
      Dubai: 'UAE',
      'United Arab Emirates': 'UAE',
      India: 'India',
      Singapore: 'Singapore',
      Australia: 'Australia',
      Netherlands: 'Netherlands',
      SaudiArabia: 'Saudi Arabia',
      'Saudi Arabia': 'Saudi Arabia',
    };
    return map[normalized] || normalized || 'USA';
  };

  const resolvePricingPath = (value?: string) => {
    const country = resolvePricingCountry(value);
    const pathMap: Record<string, string> = {
      USA: '/usa/pricing',
      UK: '/uk/pricing',
      UAE: '/dubai/pricing',
      India: '/in/pricing',
      Singapore: '/singapore/pricing',
      Australia: '/australia/pricing',
      Netherlands: '/netherlands/pricing',
      'Saudi Arabia': '/saudi-arabia/pricing',
    };
    return pathMap[country] || '/usa/pricing';
  };

  const onboardingConfig = useMemo(
    () => ({
      USA: { state: 'Wyoming', entityType: 'LLC', planCountry: 'USA' },
      UK: { state: 'UK', entityType: 'Limited', planCountry: 'UK' },
      UAE: { state: 'Dubai', entityType: 'FreeZone', planCountry: 'UAE' },
      India: { state: 'India', entityType: 'PvtLtd', planCountry: 'India' },
      Australia: { state: 'Australia', entityType: 'PtyLtd', planCountry: 'Australia' },
      Netherlands: { state: 'Netherlands', entityType: 'BV', planCountry: 'Netherlands' },
      Singapore: { state: 'Singapore', entityType: 'PteLtd', planCountry: 'Singapore' },
      'Saudi Arabia': { state: 'SaudiArabia', entityType: 'LLC', planCountry: 'SaudiArabia' },
    }),
    []
  );

  const [onboardingStatus, setOnboardingStatus] = useState({
    loading: false,
    hasSubmission: false,
    submission: null as any,
  });

  const [recentOnboarding, setRecentOnboarding] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState({
    loading: false,
    latest: null as any,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const submittedAt = sessionStorage.getItem('onboarding_submitted_at');
    if (!submittedAt) return;
    const submittedTime = new Date(submittedAt).getTime();
    if (Number.isNaN(submittedTime)) {
      sessionStorage.removeItem('onboarding_submitted_at');
      sessionStorage.removeItem('onboarding_submission_id');
      return;
    }
    const maxAgeMs = 10 * 60 * 1000;
    if (Date.now() - submittedTime <= maxAgeMs) {
      setRecentOnboarding(true);
    } else {
      sessionStorage.removeItem('onboarding_submitted_at');
      sessionStorage.removeItem('onboarding_submission_id');
    }
  }, []);

  useEffect(() => {
    if (!isStandardUser) return;
    let isActive = true;
    setOnboardingStatus((prev) => ({ ...prev, loading: true }));
    fetch(`${API_BASE_URL}/onboarding/me`, { credentials: 'include' })
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (!isActive) return;
        const submission = data?.submission || null;
        setOnboardingStatus({
          loading: false,
          hasSubmission: Boolean(submission),
          submission,
        });
        if (submission && typeof window !== 'undefined') {
          sessionStorage.removeItem('onboarding_submitted_at');
          sessionStorage.removeItem('onboarding_submission_id');
          setRecentOnboarding(false);
        }
      })
      .catch(() => {
        if (!isActive) return;
        setOnboardingStatus({ loading: false, hasSubmission: false, submission: null });
      });

    return () => {
      isActive = false;
    };
  }, [isStandardUser]);

  useEffect(() => {
    if (!isStandardUser) return;
    let isActive = true;
    setPaymentStatus((prev) => ({ ...prev, loading: true }));
    fetch(`${API_BASE_URL}/payment/my-payments`, { credentials: 'include' })
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (!isActive) return;
        const payments = Array.isArray(data?.payments) ? data.payments : [];
        const succeeded = payments.filter((payment) => payment?.status === 'succeeded');
        const latest =
          succeeded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;
        setPaymentStatus({ loading: false, latest });
      })
      .catch(() => {
        if (!isActive) return;
        setPaymentStatus({ loading: false, latest: null });
      });

    return () => {
      isActive = false;
    };
  }, [isStandardUser]);

  const paymentLoaded = !paymentStatus.loading;
  const onboardingLoaded = !onboardingStatus.loading;
  const paidByPlan = Boolean(user?.servicePlan);
  const paidByPayment = Boolean(paymentStatus.latest);
  const hasPaid = paidByPlan || paidByPayment;

  const needsPlan = isStandardUser && !user?.bypassPlan && paymentLoaded && !hasPaid;
  const needsOnboarding =
    isStandardUser &&
    !user?.bypassPlan &&
    paymentLoaded &&
    onboardingLoaded &&
    hasPaid &&
    !onboardingStatus.hasSubmission &&
    !recentOnboarding;

  const buildOnboardingUrl = () => {
    const latestPayment = paymentStatus.latest;
    const regionKey = resolvePricingCountry(user?.region);
    const config = onboardingConfig[regionKey] || onboardingConfig.USA;

    const planName = latestPayment?.plan || latestPayment?.metadata?.serviceName || user?.servicePlan || '';
    const state = latestPayment?.metadata?.state || config.state;
    const entityType = latestPayment?.metadata?.entityType || config.entityType;
    const country = latestPayment?.metadata?.country || config.planCountry;
    const amount = latestPayment?.amount;

    if (!planName || !state || !entityType) {
      return resolvePricingPath(user?.region);
    }

    const params = new URLSearchParams({
      planName,
      state,
      entityType,
      country: country || 'USA',
    });
    if (amount) {
      params.set('amount', String(amount));
    }
    return `/onboarding?${params.toString()}`;
  };

  useEffect(() => {
    if (needsLogin) {
      router.push('/login');
      return;
    }
    if (needsPlan) {
      const pricingPath = resolvePricingPath(user?.region);
      router.replace(pricingPath);
      return;
    }
    if (needsOnboarding) {
      router.replace(buildOnboardingUrl());
    }
  }, [needsLogin, needsPlan, needsOnboarding, router, user?.region]);

  const gateLoading = loading || (isStandardUser && (!paymentLoaded || !onboardingLoaded));

  if (gateLoading || needsLogin || needsPlan || needsOnboarding) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return <PortalPage onLogout={logout} />;
}
