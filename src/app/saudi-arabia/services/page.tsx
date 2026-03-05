'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Building, Briefcase, ShieldCheck, ChevronLeft, Zap, Users, BarChart3, FileCheck, Landmark, Shield, TrendingUp, Globe, BookOpen } from 'lucide-react';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in Saudi Arabia?</h4>
                <p className="text-gray-600">Compliance in KSA is a multi-agency process. It involves MISA for investment licensing, the Ministry of Commerce for commercial registration (CR), and ZATCA for tax and VAT. A critical component is labor law compliance via the MHRSD, which enforces Saudization (Nitaqat) quotas and manages employment through the Qiwa and GOSI platforms.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in Saudi Arabia?</h4>
                <p className="text-gray-600">Every company in Saudi Arabia requires accounting services. It's legally mandated to maintain SOCPA-compliant books for Zakat and tax purposes. Proper accounting is critical for managing the 15% VAT, calculating corporate tax for foreign shareholders, and for the annual audits often required for MISA license renewals.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in Saudi Arabia?</h4>
                <p className="text-gray-600">Non-compliance in KSA has severe consequences: hefty fines from ZATCA and other ministries, inability to renew the MISA license or CR (which halts all operations), blockage of work visas for failing to meet Nitaqat quotas, and potential blacklisting from lucrative government contracts.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
        <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 text-green-700 rounded-xl mr-4">
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

export default function SaudiServicesPage() {
    const services = [
        {
            category: "Formation & Licensing",
            icon: Building,
            description: "Navigate the complexities of establishing your legal presence in the Kingdom.",
            items: [
                { title: "MISA License & LLC Formation", path: "/saudi-arabia/company-formation", desc: "End-to-end service to obtain your foreign investment license and register your LLC.", icon: Building, features: ["MISA License Application", "Commercial Registration (CR)", "Articles of Association (AoA)", "Chamber of Commerce Registration", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "SOCPA-compliant bookkeeping to ensure your business is ready for ZATCA audits.",
            items: [
                { title: "VAT & E-invoicing Bookkeeping", path: "/saudi-arabia/bookkeeping", desc: "We manage your books to comply with ZATCA's strict e-invoicing (Fatoorah) and VAT requirements.", icon: Zap, features: ["ZATCA-compliant Bookkeeping", "E-invoicing Setup & Management", "Monthly Financial Reporting", "Audit Support"] },
                { title: "Accounting", path: "/saudi-arabia/accounting", desc: "Preparation of annual financial statements for ZATCA filings and MISA renewals.", icon: BookOpen, features: ["SOCPA-compliant Financials", "Zakat & Tax Calculation", "Audit Coordination"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Handle the critical ongoing compliance for tax, labor law, and government portals.",
            items: [
                { title: "Annual Compliance", path: "/saudi-arabia/annual-compliance", desc: "We manage license renewals and government portal updates to keep your business operational.", icon: FileCheck, features: ["MISA & CR License Renewal", "National Address Renewal", "Chamber of Commerce Subscription"] },
                { title: "Tax & HR Compliance", path: "/saudi-arabia/tax-compliance", desc: "Full management of your Zakat/Tax, VAT, and HR obligations to avoid penalties.", icon: Landmark, features: ["VAT Return Filing", "Annual Zakat/Tax Filing", "GOSI & Mudad Payroll Management", "Nitaqat (Saudization) Advisory"] },
                { title: "Payroll", path: "/saudi-arabia/payroll", desc: "Manage salaries and GOSI contributions via the mandatory Mudad platform.", icon: Users, features: ["GOSI Registration & Filing", "Mudad Platform Management", "Employee Contract Management", "End-of-Service Benefit Calculation"] },
            ]
        },
        {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth in the Kingdom.",
            items: [
                 { title: "Virtual CFO", path: "/saudi-arabia/virtual-cfo", desc: "Strategic financial leadership for fundraising, M&A, and business planning in KSA.", icon: TrendingUp, features: ["Financial Modeling & Forecasting", "Investor Reporting", "Cash Flow Management", "Strategic Planning"] },
                 { title: "Cross-Border Accounting", path: "/saudi-arabia/cross-border-accounting", desc: "Manage multi-currency transactions, withholding tax, and international tax complexities.", icon: Globe, features: ["Transfer Pricing Advisory", "Withholding Tax Compliance", "Tax Treaty Analysis", "Financial Consolidation"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/saudi-arabia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Saudi Arabia Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in Saudi Arabia</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your KSA business from anywhere in the world.
                            </p>
                        </div>

                        {services.map((serviceCategory) => (
                            <section key={serviceCategory.category} className="py-16 bg-green-50/20 rounded-2xl mb-16 border border-green-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center mb-12">
                                        <div className="p-4 bg-green-100 text-green-700 rounded-full mr-6"><serviceCategory.icon className="w-10 h-10" /></div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900">{serviceCategory.category}</h2>
                                            <p className="text-lg text-gray-600 mt-2">{serviceCategory.description}</p>
                                        </div>
                                    </div>
                                    <div className={`grid grid-cols-1 md:grid-cols-2 ${serviceCategory.items.length > 2 ? 'lg:grid-cols-3' : ''} gap-8`}>
                                        {serviceCategory.items.map((item) => (
                                            <div key={item.title} className="flex">
                                                <Link href={item.path} className="w-full">
                                                    <ServiceCard {...item} />
                                                </Link>
                                            </div>
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
