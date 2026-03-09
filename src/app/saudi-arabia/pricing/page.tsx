
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

const SaudiFeeCalculator = () => {
    const fees = {
        misaLicense: 12000, // Annual MISA license fee (can vary)
        crRegistration: 1200,
        chamberOfCommerce: 2000,
        gosiRegistration: 500,
    };
    const oneTimeCost = fees.misaLicense + fees.crRegistration + fees.chamberOfCommerce + fees.gosiRegistration;
    const annualCost = fees.misaLicense + fees.chamberOfCommerce;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-green-800" /> Saudi Arabia Company Cost Calculator
            </h3>
            <p className="text-gray-600 mb-6">Estimate your setup and annual costs for a Saudi Limited Liability Company (LLC).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Est. One-Time Setup Cost (SAR)</p>
                    <div className="text-4xl font-extrabold text-green-800 mt-2">{oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes MISA, CR, CoC, and GOSI fees. Excludes legal/advisory fees.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Annual Renewal Cost (SAR)</p>
                    <div className="text-3xl font-bold text-gray-800 mt-2">{annualCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes MISA License & Chamber of Commerce renewal.</p>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic text-center">Note: These are government fees estimates. Our service packages are separate.</p>
        </div>
    );
};

export default function SaudiPricingPage() {
    const router = useRouter();

    const planData = {
        Formation: { title: 'Formation', price: 4999, features: { subtitle: 'Core setup for your KSA business.', list: ['MISA License Application', 'Commercial Registration (CR)', 'Articles of Association (AoA)', 'Bank Account Assistance']}},
        Compliance: { title: 'Compliance', price: 7999, features: { subtitle: 'Formation plus ongoing annual compliance.', list: ['All Formation Features', 'MISA & CR Renewals', 'GOSI & ZATCA Registration', 'Nitaqat Advisory']}, isPopular: true},
        AllInOne: { title: 'All-in-One', price: 12999, features: { subtitle: 'Complete package with bookkeeping and tax.', list: ['All Compliance Features', 'Monthly Bookkeeping', 'Quarterly VAT Filing', 'Annual Zakat/Tax Filing']}},
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-green-50 via-gray-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-900">Saudi Arabia Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and tax in the Kingdom of Saudi Arabia.</p>
                </div>
            </section>
            
             <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="mb-16">
                        <SaudiFeeCalculator />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard {...planData.Formation} onSelect={() => router.push('/checkout?planName=Formation&state=SaudiArabia&entityType=LLC&country=SaudiArabia&amount=4999')} />
                        <PlanCard {...planData.Compliance} onSelect={() => router.push('/checkout?planName=Compliance&state=SaudiArabia&entityType=LLC&country=SaudiArabia&amount=7999')} />
                        <PlanCard {...planData.AllInOne} onSelect={() => router.push('/checkout?planName=AllInOne&state=SaudiArabia&entityType=LLC&country=SaudiArabia&amount=12999')} />
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
