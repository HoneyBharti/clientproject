
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const PlanCard = ({ title, price, features, isPopular, onSelect }) => {
    const bgColor = isPopular ? 'bg-indigo-600' : 'bg-white';
    const textColor = isPopular ? 'text-white' : 'text-gray-900';
    const subtitleColor = isPopular ? 'text-gray-300' : 'text-gray-600';
    const priceColor = isPopular ? 'text-white' : 'text-blue-600';
    const checkColor = isPopular ? 'text-white' : 'text-blue-600';
    const buttonClass = isPopular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700';

    return (
        <div className={`p-8 rounded-2xl shadow-lg relative flex flex-col h-full border ${isPopular ? 'border-blue-500' : 'border-gray-200'} ${bgColor}`}>
            {isPopular && (
                <span className="absolute top-0 right-4 -mt-3 px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow-md">
                    Most Popular
                </span>
            )}
            <h3 className={`text-2xl font-extrabold mb-2 ${textColor}`}>{title}</h3>
            <p className={`text-sm opacity-90 mb-4 ${subtitleColor}`}>{features.subtitle}</p>
            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>€{price.toLocaleString()}</span>
                    <span className={`ml-2 text-lg font-medium ${subtitleColor}`}>/year</span>
                </div>
            </div>
            <p className={`text-xs mb-6 ${subtitleColor}`}>
                + Mandatory Government Fees
            </p>
            
            <ul className="space-y-3 mb-8 flex-grow">
                {features.list.map((item, index) => (
                    <li key={index} className={`flex items-start text-sm ${subtitleColor}`}>
                        <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${checkColor}`} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={onSelect}
                className={`block text-center w-full py-3 mt-auto font-bold rounded-xl transition shadow-lg text-base ${buttonClass}`}
            >
                Get Started
            </button>
        </div>
    );
};

const NetherlandsFeeCalculator = () => {
    const fees = {
        incorporation: 250, // Notary fee estimate
        kvkRegistration: 50,
        addressService: 1200, // Annual
        annualAccounts: 600,
    };
    const oneTimeCost = fees.incorporation + fees.kvkRegistration;
    const annualCost = fees.addressService + fees.annualAccounts;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-orange-600" /> Netherlands Company Cost Calculator
            </h3>
            <p className="text-gray-600 mb-6">Estimate your one-time and recurring costs for a Dutch B.V. company.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Est. One-Time Setup Cost (EUR)</p>
                    <div className="text-4xl font-extrabold text-orange-600 mt-2">€{oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes Notary & KVK Registration fees. Excludes professional fees.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Annual Renewal Cost (EUR)</p>
                    <div className="text-3xl font-bold text-gray-800 mt-2">€{annualCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes Registered Address & Annual Accounts filing.</p>
                </div>
            </div>
        </div>
    );
};

export default function NetherlandsPricingPage() {
    const router = useRouter();

    const planData = {
        Formation: { title: 'Formation', price: 999, features: { subtitle: 'Core setup for your Dutch B.V.', list: ['Notarial Deed of Incorporation', 'KVK Registration', 'UBO Register Filing', 'Bank Account Assistance']}},
        Compliance: { title: 'Compliance', price: 1999, features: { subtitle: 'Formation plus ongoing annual compliance.', list: ['All Formation Features', 'Registered Office Address', 'Annual KVK Filings', 'Corporate Tax Registration']}, isPopular: true},
        AllInOne: { title: 'All-in-One', price: 3999, features: { subtitle: 'Complete package with bookkeeping and tax.', list: ['All Compliance Features', 'Monthly Bookkeeping', 'Quarterly BTW (VAT) Returns', 'Annual Corporate Income Tax Return (VPB)']}},
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-orange-50 via-gray-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-blue-600">Netherlands Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and tax in the Netherlands.</p>
                </div>
            </section>
            
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="mb-16">
                        <NetherlandsFeeCalculator />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard {...planData.Formation} onSelect={() => router.push('/onboarding?planName=Formation&state=Netherlands&entityType=BV&country=Netherlands&amount=999')} />
                        <PlanCard {...planData.Compliance} onSelect={() => router.push('/onboarding?planName=Compliance&state=Netherlands&entityType=BV&country=Netherlands&amount=1999')} />
                        <PlanCard {...planData.AllInOne} onSelect={() => router.push('/onboarding?planName=AllInOne&state=Netherlands&entityType=BV&country=Netherlands&amount=3999')} />
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}

