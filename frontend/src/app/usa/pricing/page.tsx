
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  X,
  Search,
  BookOpen,
  Award,
  RefreshCw,
  Key,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const stateFees = {
    'Wyoming LLC': { initial: 100, annual: 60, annualDesc: 'Minimum annual report fee', processingTime: '1-3 Business Days' },
    'Delaware LLC': { initial: 160, annual: 300, annualDesc: 'Flat annual tax', processingTime: '2-4 Business Days' },
    'Wyoming C-Corp': { initial: 100, annual: 60, annualDesc: 'Minimum annual report fee', processingTime: '1-3 Business Days' },
    'Delaware C-Corp': { initial: 160, annual: 175, annualDesc: 'Minimum franchise tax', processingTime: '2-4 Business Days' },
};

const PlanCard = ({ title, price, year2price, features, isPopular, onSelect, originalPrice, discount }) => {
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
                 {originalPrice ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-baseline">
                            <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>${price.toLocaleString()}</span>
                             {year2price && <span className={`ml-2 text-lg font-medium ${subtitleColor}`}>/month</span>}
                        </div>
                        <div>
                             <p className={`text-lg font-medium line-through ${subtitleColor}`}>${originalPrice}</p>
                            {discount && <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{discount}% OFF</span>}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-baseline">
                        <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>${price.toLocaleString()}</span>
                        <span className={`ml-2 text-lg font-medium ${subtitleColor}`}>/first year</span>
                    </div>
                )}
                 {year2price ? (
                    <p className={`text-sm font-medium mt-1 ${priceColor}`}>Billed annually at $${year2price.toLocaleString()}/yr</p>
                ) : originalPrice && (
                     <p className={`text-sm font-medium mt-1 ${priceColor}`}>Billed annually</p>
                )}
            </div>
            <p className={`text-xs mb-6 ${subtitleColor}`}>
                + Mandatory State Fees
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
                onClick={() => onSelect(title)}
                className={`block text-center w-full py-3 mt-auto font-bold rounded-xl transition shadow-lg text-base ${buttonClass}`}
            >
                Select Plan
            </button>
        </div>
    );
};

const FaqSection = () => {
    const faqs = [
        {
            category: "General & Formation",
            items: [
                { q: "How long does it take to form my company?", a: "Typically, state processing takes 2-5 business days. Wyoming is often faster than Delaware." },
                { q: "What's the difference between Wyoming and Delaware?", a: "Wyoming is excellent for privacy and low fees, making it ideal for most online businesses and LLCs. Delaware is the gold standard for C-Corps seeking venture capital, due to its established corporate law." },
                { q: "Do I need to be a US resident to start a company?", a: "No. You can form and own a US company from anywhere in the world. Our platform is built specifically for international founders." }
            ]
        },
        {
            category: "Taxes & Compliance",
            items: [
                { q: "What tax forms do you file for me?", a: "Our Vitals and Elite plans include federal tax filings (Form 1120 for C-Corps, Form 1065 for multi-member LLCs) and required state filings. We also handle Form 5472 for foreign-owned single-member LLCs." },
                { q: "Do I have to file taxes if I have no revenue?", a: "Yes. All US companies have an annual filing obligation with the IRS, even with zero revenue. Foreign-owned LLCs also have specific information returns that are mandatory." },
                { q: "What is a Registered Agent and is it included?", a: "A Registered Agent is a mandatory point of contact in your formation state to receive official legal mail. Your first year of Registered Agent service is included in all of our formation plans." }
            ]
        },
        {
            category: "Billing & Plans",
            items: [
                { q: "What do the state fees cover?", a: "State fees are one-time payments made directly to the Secretary of State to register your company. They are passed through to you without any markup." },
                { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade from Micro to Vitals or Elite at any time from your dashboard to add tax, bookkeeping, or dedicated support services." },
                { q: "What is your refund policy?", a: "We offer a 30-day money-back guarantee on all YourLegal service fees. State fees are non-refundable once they have been submitted to the state." }
            ]
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
                    Find quick answers to common questions about forming and managing your US company with YourLegal.
                </p>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((category) => (
                        <div key={category.category} className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Search className="w-6 h-6 mr-3 text-blue-600" />
                                {category.category}
                            </h3>
                            <Accordion type="single" collapsible className="w-full bg-gray-50 p-2 rounded-xl border border-gray-100">
                                {category.items.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg mb-2 shadow-sm">
                                        <AccordionTrigger className="px-6 text-left">{item.q}</AccordionTrigger>
                                        <AccordionContent className="px-6 text-gray-700">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StateFeeCalculator = ({ onSelectionChange }) => {
    const [entityType, setEntityType] = useState('LLC');
    const [state, setState] = useState('Wyoming');

    const entityOptions = ['LLC', 'C-Corp'];
    const stateOptions = ['Wyoming', 'Delaware'];
    
    const entityStateKey = `${state} ${entityType}`;
    const data = stateFees[entityStateKey] || { initial: 0, annual: 0, annualDesc: '', processingTime: 'Unknown' };

    useEffect(() => {
        onSelectionChange(state, entityType);
    }, [state, entityType, onSelectionChange]);


    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-600" /> Comprehensive State Fee Calculator
            </h3>
            <p className="text-gray-600 mb-6">Accurate estimates for your initial filing and future annual compliance.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                    <select
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        {entityOptions.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Formation State</label>
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                         Initial State Filing Fee
                    </p>
                    <div className="text-3xl font-extrabold text-blue-600 mt-1">
                        ${data.initial}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        One-time payment to the state.
                    </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                         Est. Annual State Tax
                    </p>
                    <div className="text-2xl font-bold text-gray-800 mt-1">
                        ${data.annual}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {data.annualDesc}
                    </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                         Processing Time
                    </p>
                    <div className="text-lg font-bold text-gray-800 mt-2">
                        {data.processingTime}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Average state turnaround.
                    </p>
                </div>
            </div>
        </div>
    );
};

const PricingSection = () => {
    const router = useRouter();
    const [selectedState, setSelectedState] = useState('Wyoming');
    const [selectedEntityType, setSelectedEntityType] = useState('LLC');

    const handleSelectionChange = useCallback((state, entityType) => {
        setSelectedState(state);
        setSelectedEntityType(entityType);
    }, []);

    const handleSelectPlan = (planName) => {
        router.push(`/checkout?planName=${planName}&state=${selectedState}&entityType=${selectedEntityType}`);
    };

    const planData = {
        Micro: {
            title: 'Micro',
            price: 499,
            originalPrice: 999,
            discount: 50,
            features: {
                subtitle: 'For first-time founders who need the basics to launch with confidence.',
                list: ['Company Formation (LLC/C-Corp)', 'Registered Agent Service', 'Portal Access & Document Storage'],
            },
            isPopular: false,
        },
        Vitals: {
            title: 'Vitals',
            price: 199,
            year2price: 2388,
            originalPrice: 399,
            discount: 50,
            features: {
                subtitle: 'Stay 100% compliant with tax, legal, and regulatory rules.',
                list: ['All Micro Features', 'IRS Business Tax Filings (e.g., Form 1120/1065)', 'State Annual Report Filing', 'Automated Bookkeeping & Analytics'],
            },
            isPopular: true,
        },
        Elite: {
            title: 'Elite',
            price: 299,
            year2price: 3588,
            originalPrice: 499,
            discount: 40,
            features: {
                subtitle: 'For founders who want full legal + compliance, plus a dedicated bookkeeper.',
                list: ['All Vitals Features', 'Dedicated Human Bookkeeper', 'Priority Legal Support', 'Quarterly Financial Reviews'],
            },
            isPopular: false,
        },
    };
    
    return (
        <section id="pricing-content" className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-16">
                    <StateFeeCalculator onSelectionChange={handleSelectionChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    <PlanCard {...planData.Micro} onSelect={handleSelectPlan} />
                    <PlanCard {...planData.Vitals} onSelect={handleSelectPlan} />
                    <PlanCard {...planData.Elite} onSelect={handleSelectPlan} />
                </div>
            </div>
        </section>
    );
};

export default function UsaPricingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-blue-50 via-gray-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">USA Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and taxes. No hidden fees.</p>
                     <div className="mt-10">
                        <Link href="/usa" className="text-sm font-semibold text-gray-600 hover:text-gray-800">
                           &larr; Back to USA Overview
                        </Link>
                    </div>
                </div>
            </section>
            
            <PricingSection />
            
            <FaqSection />

            <AppFooter />
        </div>
    );
}

