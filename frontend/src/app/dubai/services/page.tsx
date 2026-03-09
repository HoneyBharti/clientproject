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
                <h4 className="font-semibold text-gray-700">How does business compliance work in the UAE?</h4>
                <p className="text-gray-600">Compliance in the UAE depends on the jurisdiction (Mainland vs. Free Zone). It includes obtaining the correct trade license, renewing it annually, and adhering to ESR (Economic Substance Regulations). For tax, businesses must register for VAT if they meet the threshold and for Corporate Tax. Audited financial statements are often required for license renewal.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in the UAE?</h4>
                <p className="text-gray-600">All companies in the UAE are legally required to maintain proper accounting records. Accounting services are essential for managing VAT obligations, preparing for the 9% Corporate Tax, and providing the audited financials often required by free zones and banks. It is crucial for financial visibility and compliance.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the UAE?</h4>
                <p className="text-gray-600">Non-compliance in the UAE can result in substantial fines from the FTA for tax violations, penalties for late license renewals, and potential blacklisting of the company and its managers. It can also lead to the non-renewal of visas and the freezing of corporate bank accounts, effectively halting business operations.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
        <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
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

export default function DubaiServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your UAE business with the right structure and jurisdiction.",
            items: [
                { title: "Free Zone & Mainland Setup", desc: "We guide you through choosing the optimal jurisdiction (Free Zone or Mainland) and handle the entire registration process.", icon: Building, features: ["Jurisdiction Advisory", "Trade License Application", "MOA Notarization", "Establishment Card", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "IFRS-compliant bookkeeping to ensure your business is audit-ready and financially sound.",
            items: [
                { title: "VAT & Tax Bookkeeping", desc: "Our accountants manage your books using cloud software, ensuring full compliance with FTA regulations.", icon: Zap, features: ["IFRS-Standard Bookkeeping", "Bank Feed Reconciliation", "VAT-compliant Record Keeping", "Monthly Financial Reports (P&L, Balance Sheet)"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate the UAE's tax landscape, including VAT and the new Corporate Tax regime.",
            items: [
                { title: "Annual Compliance", desc: "We manage mandatory license renewals and filings to keep your company in good standing.", icon: FileCheck, features: ["Trade License Renewal", "Office/Lease Renewal Coordination", "Economic Substance Regulations (ESR) Filing"] },
                { title: "VAT & Corporate Tax", desc: "Full management of your VAT and Corporate Tax obligations with the Federal Tax Authority (FTA).", icon: Landmark, features: ["VAT & Corporate Tax Registration", "Quarterly VAT Return Filing", "Annual Corporate Tax Return Filing", "Qualifying Free Zone Person Advisory"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/dubai" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Dubai Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in Dubai (UAE)</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your UAE business from anywhere in the world.
                            </p>
                        </div>

                        {services.map((serviceCategory) => (
                            <section key={serviceCategory.category} className="py-16 bg-blue-50/20 rounded-2xl mb-16 border border-blue-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center mb-12">
                                        <div className="p-4 bg-blue-100 text-blue-600 rounded-full mr-6"><serviceCategory.icon className="w-10 h-10" /></div>
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

