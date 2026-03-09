'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Building, Briefcase, ShieldCheck, ChevronLeft, MapPin, Zap, Users, BarChart3, FileCheck, Landmark, Shield } from 'lucide-react';
import { HubspotForm } from '@/components/forms/hubspot-form';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in Australia?</h4>
                <p className="text-gray-600">Compliance in Australia involves company registration with ASIC, appointing at least one resident director, and registering for an Australian Business Number (ABN) and Tax File Number (TFN) with the ATO. Annually, companies must lodge an annual statement with ASIC and a company tax return with the ATO. GST registration and BAS lodgement are required if turnover exceeds A$75,000.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in Australia?</h4>
                <p className="text-gray-600">Every Australian company legally requires accounting services to maintain accurate financial records for annual tax returns and to manage Goods and Services Tax (GST) obligations. It's crucial for tracking financial performance, ensuring ATO compliance, and making informed business decisions.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in Australia?</h4>
                <p className="text-gray-600">Non-compliance in Australia can lead to significant penalties from the ATO and ASIC, potential director liability, and the company being struck off the register. Failure to meet resident director rules can invalidate the company structure. It also complicates financing and damages business reputation.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
        <div className="flex items-center mb-6">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl mr-4">
                {Icon && <Icon className="w-8 h-8" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6 text-lg flex-grow">{desc}</p>
        <div className="flex-grow">
            <h4 className="font-semibold text-gray-800 mb-4 border-b pb-2">Key Features:</h4>
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const HubspotCtaSection = () => (
    <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to Get Started?</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions about our plans, partnerships, or unique business needs? Our team is here to help. Fill out the form, and we'll be in touch shortly.
                    </p>
                     <div className="mt-6">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">Schedule a Free Consultation</Button>
                        </a>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Contact Sales</h3>
                    <HubspotForm portalId="46429315" formId="8933411b-31d7-4638-8924-4a4b2b192801" />
                </div>
            </div>
        </div>
    </section>
);

export default function AustraliaServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your Australian Pty Ltd company correctly from day one.",
            items: [
                { title: "Pty Ltd Company Formation", desc: "The standard structure for Australian businesses, offering limited liability and a credible local presence.", icon: Building, features: ["ASIC Registration", "Company Constitution", "ABN & TFN Registration", "Nominee Resident Director", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "Maintain ATO-compliant books and understand your financial health.",
            items: [
                { title: "Monthly Bookkeeping", desc: "Our experts manage your books using cloud software like Xero, ensuring accuracy for BAS and tax time.", icon: Zap, features: ["ATO-Compliant Bookkeeping", "Bank Feed Reconciliation", "BAS Preparation & Lodgement", "Monthly P&L and Balance Sheet"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate Australia's tax and corporate compliance regulations with ease.",
            items: [
                { title: "Annual Compliance", desc: "We handle mandatory ASIC and ATO filings to keep your company in good standing.", icon: FileCheck, features: ["Annual ASIC Company Statement", "Annual Solvency Resolution", "ASIC Registered Agent Service"] },
                { title: "Company Tax", desc: "Complete preparation and filing of your annual Australian company tax return with the ATO.", icon: Landmark, features: ["Annual Company Tax Return Filing", "Tax-deductible Expense Advisory", "GST Reconciliation", "R&D Tax Incentive Advice"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/australia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Australia Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in Australia</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your Australian business from anywhere in the world.
                            </p>
                        </div>

                        {services.map((serviceCategory) => (
                            <section key={serviceCategory.category} className="py-16 bg-yellow-50/20 rounded-2xl mb-16 border border-yellow-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center mb-12">
                                        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full mr-6"><serviceCategory.icon className="w-10 h-10" /></div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900">{serviceCategory.category}</h2>
                                            <p className="text-lg text-gray-600 mt-2">{serviceCategory.description}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {serviceCategory.items.map((item) => (
                                            <ServiceCard 
                                                key={item.title}
                                                {...item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ))}
                        
                        <AiAnswerBlock />
                    </div>
                </div>
                <HubspotCtaSection />
            </main>
            <AppFooter />
        </div>
    );
}

