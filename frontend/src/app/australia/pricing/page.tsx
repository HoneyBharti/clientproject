
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
                    <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>${price.toLocaleString()}</span>
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

const AustraliaFeeCalculator = () => {
    const fees = {
        registration: 576, // ASIC fee
        nomineeDirector: 4000,
        registeredOffice: 300,
        annualReview: 310, // ASIC annual review fee
        taxFiling: 800,
    };
    const [needsDirector, setNeedsDirector] = useState(true);

    const oneTimeCost = fees.registration + (needsDirector ? fees.nomineeDirector : 0);
    const annualCost = fees.annualReview + fees.registeredOffice + fees.taxFiling + (needsDirector ? fees.nomineeDirector : 0);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-yellow-800" /> Australia Company Cost Calculator
            </h3>
            <p className="text-gray-600 mb-6">Estimate your one-time and recurring costs for an Australian Pty Ltd company.</p>
            <div className="flex items-center space-x-2 mb-6">
                <Switch id="nominee-director" checked={needsDirector} onCheckedChange={setNeedsDirector} />
                <Label htmlFor="nominee-director">I need a Nominee Resident Director service</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Est. One-Time Setup Cost (AUD)</p>
                    <div className="text-4xl font-extrabold text-yellow-800 mt-2">${oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes ASIC Fee + Nominee Director Setup.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Annual Renewal Cost (AUD)</p>
                    <div className="text-3xl font-bold text-gray-800 mt-2">${annualCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes ASIC Fee, Nominee, Office & Tax Filing.</p>
                </div>
            </div>
        </div>
    );
};

export default function AustraliaPricingPage() {
    const router = useRouter();

    const planData = {
        Formation: { title: 'Formation', price: 999, features: { subtitle: 'Core setup for your Australian Pty Ltd company.', list: ['ASIC Company Registration', 'ABN, TFN, and GST Registration', 'Nominee Director Service', 'Registered Office Address']}},
        Compliance: { title: 'Compliance', price: 2499, features: { subtitle: 'Formation plus ongoing annual compliance.', list: ['All Formation Features', 'Annual ASIC Company Statement', 'ASIC Registered Agent Service', 'Annual Solvency Resolution']}, isPopular: true},
        AllInOne: { title: 'All-in-One', price: 4999, features: { subtitle: 'Complete package with bookkeeping and tax.', list: ['All Compliance Features', 'Monthly Bookkeeping', 'BAS Lodgement', 'Annual Company Tax Return (ATO)']}},
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500">Australia Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and tax in Australia.</p>
                </div>
            </section>
            
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <AustraliaFeeCalculator />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard {...planData.Formation} onSelect={() => router.push('/onboarding?planName=Formation&state=Australia&entityType=PtyLtd&country=Australia&amount=999')} />
                        <PlanCard {...planData.Compliance} onSelect={() => router.push('/onboarding?planName=Compliance&state=Australia&entityType=PtyLtd&country=Australia&amount=2499')} />
                        <PlanCard {...planData.AllInOne} onSelect={() => router.push('/onboarding?planName=AllInOne&state=Australia&entityType=PtyLtd&country=Australia&amount=4999')} />
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}

