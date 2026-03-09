'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Building, Briefcase, ShieldCheck, ChevronLeft, Zap, Users, BarChart3, FileCheck, Landmark, Shield, TrendingUp, Globe, BookOpen } from 'lucide-react';
import { HubspotForm } from '@/components/forms/hubspot-form';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in the Netherlands?</h4>
                <p className="text-gray-600">Compliance in the Netherlands involves registering a B.V. with the KVK (Chamber of Commerce) via a notary, obtaining a BTW (VAT) number, and registering UBOs. Annually, companies must file corporate income tax (VPB) returns, VAT returns, and submit annual accounts to the KVK. There is no resident director requirement.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in the Netherlands?</h4>
                <p className="text-gray-600">Every Dutch B.V. is legally required to maintain accurate financial records according to Dutch GAAP. Accounting services are crucial for managing BTW (VAT) obligations, calculating corporate income tax (VPB), and preparing the annual financial statements that must be filed with the KVK.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the Netherlands?</h4>
                <p className="text-gray-600">Non-compliance in the Netherlands can lead to fines from the Belastingdienst (Tax Authority) for late or incorrect tax filings and penalties from the KVK for late submission of annual accounts. This can result in director liability and harm the company's reputation, affecting its ability to secure financing or partnerships.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
        <div className="flex items-center mb-6">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl mr-4">
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
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
        </div>
    </section>
);

export default function NetherlandsServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your Dutch B.V. and establish your European headquarters.",
            items: [
                { title: "Dutch B.V. Formation", desc: "The premier choice for international business in Europe, offering flexibility and limited liability.", icon: Building, features: ["Notarial Deed of Incorporation", "KVK Registration", "UBO Register Filing", "BTW (VAT) Number Registration", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "Maintain Dutch GAAP-compliant books for accurate reporting and tax filing.",
            items: [
                { title: "Monthly Bookkeeping", desc: "We manage your accounts using cloud platforms like Exact or Xero for real-time financial insight.", icon: Zap, features: ["Dutch GAAP Compliant Bookkeeping", "Bank Reconciliation", "BTW (VAT) Preparation", "Monthly Financial Statements"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate the Dutch tax system, from BTW (VAT) to corporate income tax (VPB).",
            items: [
                { title: "Annual Compliance", desc: "We handle mandatory KVK filings to keep your company compliant and in good standing.", icon: FileCheck, features: ["Filing of Annual Accounts with KVK", "Maintenance of Shareholder Register", "Corporate Housekeeping"] },
                { title: "Tax Filing Services", desc: "Full management of your tax obligations with the Belastingdienst (Dutch Tax Authority).", icon: Landmark, features: ["Quarterly BTW (VAT) Returns", "Annual Corporate Income Tax (VPB) Return", "Dividend Withholding Tax Advisory", "30% Ruling Application Support"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/netherlands" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Netherlands Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in the Netherlands</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your Dutch business and expand into Europe.
                            </p>
                        </div>

                        {services.map((serviceCategory) => (
                            <section key={serviceCategory.category} className="py-16 bg-orange-50/20 rounded-2xl mb-16 border border-orange-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center mb-12">
                                        <div className="p-4 bg-orange-100 text-orange-600 rounded-full mr-6"><serviceCategory.icon className="w-10 h-10" /></div>
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

