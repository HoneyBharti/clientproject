'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanSelector from '@/components/payment/PlanSelector';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

export default function PricingPage() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('Wyoming');
  const [selectedEntity, setSelectedEntity] = useState('LLC');

  const handleSelectPlan = (plan) => {
    router.push(
      `/onboarding?planName=${plan.name}&amount=${plan.price}&state=${selectedState}&entityType=${selectedEntity}&country=USA`
    );
  };

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

            <div className="flex justify-center gap-4 mb-8">
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
          </div>

          <PlanSelector onSelectPlan={handleSelectPlan} />
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

