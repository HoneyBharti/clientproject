'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calculator, Info, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const PlanCard = ({
    title,
    price,
    subtitle,
    features,
    isPopular,
    onSelect,
}: {
    title: string;
    price: number;
    subtitle: string;
    features: string[];
    isPopular?: boolean;
    onSelect?: () => void;
}) => {
    const bgColor = isPopular ? 'bg-indigo-600' : 'bg-white';
    const textColor = isPopular ? 'text-white' : 'text-gray-900';
    const subtitleColor = isPopular ? 'text-indigo-100' : 'text-gray-500';
    const priceColor = isPopular ? 'text-white' : 'text-orange-600';
    const checkColor = isPopular ? 'text-indigo-300' : 'text-orange-500';
    const buttonClass = isPopular ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-orange-600 text-white hover:bg-orange-700';

    return (
        <div className={`p-8 rounded-3xl shadow-xl relative flex flex-col h-full border ${isPopular ? 'border-indigo-500' : 'border-gray-100'} ${bgColor} transition-transform hover:-translate-y-1`}>
            {isPopular && (
                <span className="absolute top-0 right-8 -mt-3 px-4 py-1 text-xs font-bold text-white bg-emerald-500 rounded-full shadow-lg">
                    Recommended
                </span>
            )}
            <h3 className={`text-2xl font-extrabold mb-2 ${textColor}`}>{title}</h3>
            <p className={`text-sm mb-8 font-medium ${subtitleColor}`}>{subtitle}</p>
            <div className="mb-8">
                <div className="flex items-baseline">
                    <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>₹{price.toLocaleString()}</span>
                    <span className={`ml-2 text-lg font-medium ${subtitleColor}`}>/year</span>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-60">Professional Fees Only</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
                {features.map((item, index) => (
                    <li key={index} className={`flex items-start text-sm font-medium ${isPopular ? 'text-white' : 'text-gray-600'}`}>
                        <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${checkColor}`} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={onSelect}
                className={`block text-center w-full py-4 font-bold rounded-2xl transition shadow-lg text-base ${buttonClass}`}
            >
                Get Started
            </button>
        </div>
    );
};

const IndiaFeeCalculator = () => {
    const fees = {
        incorporation: 5000,
        dsc: 2000,
        registeredOffice: 12000,
        mcaAnnual: 15000,
        taxFiling: 10000,
    };
    const [numDirectors, setNumDirectors] = useState(2);

    const oneTimeCost = fees.incorporation + numDirectors * fees.dsc;
    const annualCost = fees.mcaAnnual + fees.taxFiling + fees.registeredOffice;

    return (
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Calculator className="w-7 h-7 text-orange-600" /> Statutory Fee Estimator
                    </h3>
                    <p className="text-gray-500 font-medium mt-1">Estimate your one-time and recurring government & auxiliary costs.</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border">
                    <Label className="pl-4 font-bold text-gray-600 uppercase text-[10px] tracking-wider">Number of Directors</Label>
                    <Input
                        type="number"
                        min="2"
                        value={numDirectors}
                        onChange={(e) => setNumDirectors(Math.max(2, parseInt(e.target.value, 10) || 2))}
                        className="w-20 bg-white font-bold text-center rounded-xl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-orange-50 rounded-2xl border border-orange-100 relative overflow-hidden group">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">Estimated Initial Setup (INR)</p>
                    <div className="text-5xl font-black text-orange-800 mt-2">₹{oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-orange-600 mt-4 font-medium flex items-center gap-1.5">
                        <Info size={12} /> Includes MCA Filing, DSC & Name Approval.
                    </p>
                </div>
                <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 relative overflow-hidden group">
                    <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Estimated Annual Renewal (INR)</p>
                    <div className="text-5xl font-black text-indigo-800 mt-2">₹{annualCost.toLocaleString()}</div>
                    <p className="text-xs text-indigo-600 mt-4 font-medium flex items-center gap-1.5">
                        <Info size={12} /> Includes MCA Returns, Tax Filing & Office Address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function IndiaPricingPage() {
    const router = useRouter();
    const planData = {
        Startup: {
            title: 'Startup',
            price: 24999,
            subtitle: 'Perfect for new ventures getting registered.',
            features: ['Pvt. Ltd. Incorporation (MCA)', 'DSC & DIN for 2 Directors', 'PAN & TAN Allotment', 'GST Registration', 'Commencement Certificate (20A)'],
        },
        Compliance: {
            title: 'Compliance',
            price: 49999,
            subtitle: 'Ongoing accounting and statutory returns.',
            features: ['Everything in Startup', 'Monthly Bookkeeping', 'Monthly GST Returns', 'Quarterly TDS Returns', 'Annual MCA Compliance (AOC-4/MGT-7)'],
            isPopular: true,
        },
        Growth: {
            title: 'Growth',
            price: 99999,
            subtitle: 'Complete financial back-office & strategy.',
            features: ['Everything in Compliance', 'Audit Liaison & Coordination', 'Annual Income Tax Return', 'Virtual CFO (Strategic Reviews)', 'FEMA/RBI Compliance (FDI)'],
        },
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

            <section className="bg-gradient-to-br from-orange-50 via-white to-indigo-50 py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none mb-6 px-4 py-1.5 font-bold uppercase tracking-widest">Pricing - India</Badge>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                        Transparent <span className="text-orange-600">Pvt. Ltd.</span> Pricing
                    </h1>
                    <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto font-medium">All-in-one plans for formation, compliance, and taxes in India. No hidden costs or surprise invoices.</p>
                </div>
            </section>

            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-20">
                        <IndiaFeeCalculator />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard
                            {...planData.Startup}
                            onSelect={() => router.push('/onboarding?planName=Startup&state=India&entityType=PvtLtd&country=India&amount=24999')}
                        />
                        <PlanCard
                            {...planData.Compliance}
                            onSelect={() => router.push('/onboarding?planName=Compliance&state=India&entityType=PvtLtd&country=India&amount=49999')}
                        />
                        <PlanCard
                            {...planData.Growth}
                            onSelect={() => router.push('/onboarding?planName=Growth&state=India&entityType=PvtLtd&country=India&amount=99999')}
                        />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">Why Founders Choose Our Plans</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex gap-4">
                            <div className="p-3 bg-orange-100 rounded-2xl h-fit"><CheckCircle className="text-orange-600" /></div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Guaranteed Compliance</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">We handle all MCA and Tax deadlines automatically. We focus on accuracy so you can focus on building.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-indigo-100 rounded-2xl h-fit"><Users className="text-indigo-600" /></div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Dedicated CA Support</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">Our Compliance and Growth plans include direct access to qualified professionals who understand your business.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
