'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Micro',
    price: 499,
    description: 'Perfect for getting started',
    features: [
      'Company Formation',
      'Registered Agent (1 year)',
      'Portal Access',
      'Document Storage',
      'Email Support'
    ]
  },
  {
    name: 'Vitals',
    price: 2388,
    description: 'Most popular for growing businesses',
    features: [
      'Everything in Micro',
      'Bookkeeping Services',
      'Tax Filing Assistance',
      'Compliance Monitoring',
      'Priority Support',
      'Quarterly Reports'
    ],
    popular: true
  },
  {
    name: 'Elite',
    price: 3588,
    description: 'Complete business management',
    features: [
      'Everything in Vitals',
      'Dedicated Account Manager',
      'CFO Advisory Services',
      'Custom Financial Reports',
      'Strategic Planning',
      '24/7 Priority Support'
    ]
  }
];

export default function PlanSelector({ onSelectPlan }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.name);
    if (onSelectPlan) {
      onSelectPlan(plan);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl border-2 p-8 ${
            plan.popular
              ? 'border-blue-600 shadow-xl scale-105'
              : 'border-gray-200'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
          )}
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="text-4xl font-bold mb-2">
              ${plan.price.toLocaleString()}
            </div>
            <p className="text-gray-500 text-sm">first year</p>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleSelectPlan(plan)}
            className={`w-full ${
              plan.popular
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            Select {plan.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
