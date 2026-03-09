
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

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
                    <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>£{price.toLocaleString()}</span>
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

const UKFeeCalculator = () => {
    const fees = {
        incorporation: 100,
        registeredOffice: 150,
        confirmationStatement: 75,
        annualAccounts: 400,
    };
    const oneTimeCost = fees.incorporation;
    const annualCost = fees.registeredOffice + fees.confirmationStatement + fees.annualAccounts;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-800" /> UK Company Cost Calculator
            </h3>
            <p className="text-gray-600 mb-6">Estimate your one-time and recurring costs for a UK Private Limited company.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Est. One-Time Setup Cost (GBP)</p>
                    <div className="text-4xl font-extrabold text-blue-800 mt-2">£{oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes Companies House Fee.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                     <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Annual Renewal Cost (GBP)</p>
                    <div className="text-3xl font-bold text-gray-800 mt-2">£{annualCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes Registered Office, Confirmation Statement & Annual Accounts.</p>
                </div>
            </div>
        </div>
    );
};

export default function UkPricingPage() {
    const router = useRouter();

    const planData = {
        Formation: { title: 'Formation', price: 499, features: { subtitle: 'Core setup for your UK Limited company.', list: ['Companies House Registration', 'Registered Office Address (London)', 'Director Service Address', 'Bank Account Support']}},
        Compliance: { title: 'Compliance', price: 999, features: { subtitle: 'Formation plus ongoing annual compliance.', list: ['All Formation Features', 'Confirmation Statement Filing', 'Statutory Register Maintenance', 'HMRC Corporation Tax Registration']}, isPopular: true},
        AllInOne: { title: 'All-in-One', price: 2499, features: { subtitle: 'Complete package with bookkeeping and tax.', list: ['All Compliance Features', 'Monthly Bookkeeping (MTD)', 'Quarterly VAT Returns', 'Annual Accounts & CT600 Filing']}},
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
             <section className="bg-gradient-to-r from-blue-100 via-gray-50 to-red-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">UK Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and tax in the United Kingdom.</p>
                </div>
            </section>
            
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="mb-16">
                        <UKFeeCalculator />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard {...planData.Formation} onSelect={() => router.push('/checkout?planName=Formation&state=UK&entityType=Limited&country=UK&amount=499')} />
                        <PlanCard {...planData.Compliance} onSelect={() => router.push('/checkout?planName=Compliance&state=UK&entityType=Limited&country=UK&amount=999')} />
                        <PlanCard {...planData.AllInOne} onSelect={() => router.push('/checkout?planName=AllInOne&state=UK&entityType=Limited&country=UK&amount=2499')} />
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
