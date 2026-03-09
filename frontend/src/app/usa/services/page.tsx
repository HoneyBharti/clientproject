'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Building, Briefcase, ShieldCheck, ChevronLeft, Zap, Users, BarChart3, FileCheck, Landmark, Shield, TrendingUp, Globe, BookOpen, ChevronRight } from 'lucide-react';
import { HubspotForm } from '@/components/forms/hubspot-form';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">TL;DR:</h4>
                <p className="text-gray-600">YourLegal offers an integrated suite of services for US businesses covering three core pillars: Formation (LLC & C-Corp incorporation, Registered Agent), Bookkeeping & Finance (automated and human-led bookkeeping, financial reporting), and Taxes & Compliance (state annual filings, federal tax returns, and FinCEN BOI reporting).</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What services does YourLegal offer for the USA?</h4>
                <p className="text-gray-600">YourLegal provides a full range of services to launch and manage a US business. This includes legal entity formation, mandatory Registered Agent services, automated and dedicated bookkeeping, investor-grade financial reporting, annual state compliance filings, federal and state tax preparation, and Beneficial Ownership Information (BOI) reporting.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, path }) => (
    <Link href={path} className="block bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full hover:-translate-y-1 group">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
                {Icon && <Icon className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">{title}</h3>
        </div>
        <p className="text-gray-600 flex-grow">{desc}</p>
        <div className="mt-4 text-sm text-blue-600 font-semibold flex items-center">
            Learn More <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
    </Link>
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

export default function UsaServicesPage() {
    const services = [
        {
            category: "Formation & Legal",
            icon: Building,
            description: "Launch your US legal entity with a complete package designed for non-resident founders.",
            items: [
                { title: "Company Formation", path: "/usa/company-formation", desc: "LLC & C-Corp formation in DE & WY. Includes EIN, legal docs, and bank account support.", icon: Building },
                { title: "Annual Compliance", path: "/usa/annual-compliance", desc: "We manage mandatory annual reports and franchise tax filings to keep your company in Good Standing.", icon: FileCheck },
            ]
        },
        {
            category: "Finance & Accounting",
            icon: Briefcase,
            description: "Keep your books audit-ready and clearly understand your financial health with expert support.",
            items: [
                { title: "Bookkeeping", path: "/usa/bookkeeping", desc: "Accurate, compliant bookkeeping to form the foundation of your financial operations.", icon: Zap },
                { title: "Accounting", path: "/usa/accounting", desc: "Go beyond bookkeeping with GAAP-compliant financial statements and investor-grade reporting.", icon: BookOpen },
            ]
        },
        {
            category: "Taxes & Payroll",
            icon: ShieldCheck,
            description: "Navigate the complexities of US state and federal regulations with confidence.",
            items: [
                { title: "Tax Compliance", path: "/usa/tax-compliance", desc: "Comprehensive preparation and filing of your annual US corporate income tax returns (Forms 1120, 1065, 5472).", icon: Landmark },
                { title: "Payroll", path: "/usa/payroll", desc: "Manage salaries, benefits, and tax withholding for your US employees and contractors.", icon: Users },
            ]
        },
        {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth and fundraising goals.",
            items: [
                 { title: "Virtual CFO", path: "/usa/virtual-cfo", desc: "Strategic financial leadership for fundraising, M&A, and business planning.", icon: TrendingUp },
                 { title: "Cross-Border Accounting", path: "/usa/cross-border-accounting", desc: "Expert management of multi-currency transactions, transfer pricing, and international tax.", icon: Globe },
                 { title: "Audit Support", path: "/usa/audit-support", desc: "Prepare for and navigate financial statement audits, SOC 2, or IRS inquiries with confidence.", icon: Shield },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/usa" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to USA Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in the USA</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your US business from anywhere in the world.
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
                                    <div className={`grid grid-cols-1 md:grid-cols-2 ${serviceCategory.items.length > 2 ? 'lg:grid-cols-3' : ''} gap-8`}>
                                        {serviceCategory.items.map((item) => (
                                            <ServiceCard key={item.title} {...item} />
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

