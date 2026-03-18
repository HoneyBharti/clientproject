'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PlanSelector from '@/components/payment/PlanSelector';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { useAuth } from '@/contexts/AuthContext';

function PricingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const normalizeCountry = (value?: string | null) => {
    if (!value) return null;
    const normalized = String(value).trim();
    if (!normalized) return null;
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
    return map[normalized] || normalized;
  };

  const countryOptions = [
    { value: 'USA', label: 'United States (USA)' },
    { value: 'UK', label: 'United Kingdom (UK)' },
    { value: 'UAE', label: 'United Arab Emirates (UAE)' },
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  ];

  const countryConfig: Record<string, { planCountry: string; state: string; entityType: string }> = {
    USA: { planCountry: 'USA', state: 'Wyoming', entityType: 'LLC' },
    UK: { planCountry: 'UK', state: 'UK', entityType: 'Limited' },
    UAE: { planCountry: 'UAE', state: 'Dubai', entityType: 'FreeZone' },
    India: { planCountry: 'India', state: 'India', entityType: 'PvtLtd' },
    Australia: { planCountry: 'Australia', state: 'Australia', entityType: 'PtyLtd' },
    Netherlands: { planCountry: 'Netherlands', state: 'Netherlands', entityType: 'BV' },
    Singapore: { planCountry: 'Singapore', state: 'Singapore', entityType: 'PteLtd' },
    'Saudi Arabia': { planCountry: 'SaudiArabia', state: 'SaudiArabia', entityType: 'LLC' },
  };

  const initialCountry = useMemo(() => {
    const fromQuery = normalizeCountry(searchParams.get('country'));
    const fromUser = normalizeCountry(user?.region);
    return fromQuery || fromUser || 'USA';
  }, [searchParams, user?.region]);

  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedState, setSelectedState] = useState(countryConfig[initialCountry]?.state || 'Wyoming');
  const [selectedEntity, setSelectedEntity] = useState(countryConfig[initialCountry]?.entityType || 'LLC');
  const [hasChosenCountry, setHasChosenCountry] = useState(false);

  const handleCountryChange = (nextCountry: string) => {
    setHasChosenCountry(true);
    setSelectedCountry(nextCountry);
    const nextConfig = countryConfig[nextCountry] || countryConfig.USA;
    setSelectedState(nextConfig.state);
    setSelectedEntity(nextConfig.entityType);
  };

  useEffect(() => {
    if (hasChosenCountry) return;
    const nextCountry = initialCountry;
    if (nextCountry !== selectedCountry) {
      const nextConfig = countryConfig[nextCountry] || countryConfig.USA;
      setSelectedCountry(nextCountry);
      setSelectedState(nextConfig.state);
      setSelectedEntity(nextConfig.entityType);
    }
  }, [hasChosenCountry, initialCountry, selectedCountry]);

  const handleSelectPlan = (plan) => {
    const config = countryConfig[selectedCountry] || countryConfig.USA;
    const planCountry = selectedCountry === 'USA' ? 'USA' : config.planCountry;
    const planState = selectedCountry === 'USA' ? selectedState : config.state;
    const planEntityType = selectedCountry === 'USA' ? selectedEntity : config.entityType;
    router.push(
      `/checkout?planName=${plan.name}&amount=${plan.price}&state=${planState}&entityType=${planEntityType}&country=${planCountry}`
    );
  };

  const activeConfig = countryConfig[selectedCountry] || countryConfig.USA;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader 
        onLoginClick={() => router.push('/login')} 
        onSignupClick={() => router.push('/signup')} 
      />
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 mb-8">
              Select the perfect plan for your business needs
            </p>

            <div className="flex flex-col items-center gap-4 mb-8">
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="px-4 py-2 border rounded-lg min-w-[260px]"
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {selectedCountry === 'USA' ? (
                <div className="flex justify-center gap-4">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="Wyoming">Wyoming</option>
                    <option value="Delaware">Delaware</option>
                  </select>

                  <select
                    value={selectedEntity}
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="LLC">LLC</option>
                    <option value="C-Corp">C-Corp</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                  <span className="rounded-full border px-3 py-1 bg-white">
                    Jurisdiction: {activeConfig.state}
                  </span>
                  <span className="rounded-full border px-3 py-1 bg-white">
                    Entity type: {activeConfig.entityType}
                  </span>
                </div>
              )}
            </div>
          </div>

          <PlanSelector onSelectPlan={handleSelectPlan} country={selectedCountry} />
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><span>Loading...</span></div>}>
      <PricingPageContent />
    </Suspense>
  );
}

