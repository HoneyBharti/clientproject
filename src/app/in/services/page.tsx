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
                <h4 className="font-semibold text-gray-700">How does business compliance work in India?</h4>
                <p className="text-gray-600">Compliance in India is multi-faceted. It involves corporate law filings with the MCA (Ministry of Corporate Affairs), tax compliance with the Income Tax Department and GST authorities, and labor law compliance (PF, ESI). For foreign investment, FEMA/RBI regulations are also critical.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in India?</h4>
                <p className="text-gray-600">Every Private Limited company in India legally requires accounting services to prepare annual financial statements for the statutory audit and to file income tax returns. It's also essential for managing monthly GST filings and TDS compliance.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in India?</h4>
                <p className="text-gray-600">Non-compliance in India leads to heavy financial penalties from the MCA, GST, and Income Tax departments. Late filings attract daily penalties. Severe failures, especially in reporting foreign investment, can lead to significant fines from the RBI, and director disqualification is a real risk for persistent non-compliance.</p>
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

export default function IndiaServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your Indian Pvt. Ltd. company with a compliant structure.",
            items: [
                { title: "Pvt. Ltd. Company Formation", path: "/in/company-formation", desc: "The standard, scalable entity for startups and foreign investors in India.", icon: Building, features: ["Director Identification Number (DIN)", "Name Approval (RUN)", "SPICe+ MCA Filing", "PAN/TAN Registration", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "Maintain Ind AS-compliant books for accurate reporting and tax filing.",
            items: [
                { title: "GST & TDS Bookkeeping", path: "/in/bookkeeping", desc: "We manage your accounts using cloud software to ensure GST and TDS compliance.", icon: Zap, features: ["Ind AS-Compliant Bookkeeping", "Bank & Payment Gateway Reconciliation", "GST & TDS Record Keeping", "Monthly Financial Reports"] },
                { title: "Accounting", path: "/in/accounting", desc: "Preparation of annual financial statements for statutory audit and tax filing.", icon: BookOpen, features: ["Statutory Financial Statements", "Tax Computation", "Audit File Preparation"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate India's complex web of corporate and tax regulations.",
            items: [
                { title: "Annual Compliance (MCA)", path: "/in/annual-compliance", desc: "We manage all mandatory annual filings with the Ministry of Corporate Affairs.", icon: FileCheck, features: ["Annual General Meeting (AGM) Documentation", "Forms AOC-4 (Financials) & MGT-7 (Annual Return)", "Maintenance of Statutory Registers"] },
                { title: "Tax Compliance", path: "/in/tax-compliance", desc: "Comprehensive management of your direct and indirect tax obligations.", icon: Landmark, features: ["Monthly GST Returns", "Quarterly TDS Returns", "Annual Income Tax Return Filing", "Advance Tax Calculation"] },
                { title: "Payroll", path: "/in/payroll", desc: "Manage salaries, TDS, and statutory contributions like PF and ESI for your team.", icon: Users, features: ["PF & ESI Registration & Filing", "TDS on Salary Compliance", "Monthly Payslips", "Professional Tax (State-specific)"] },
            ]
        },
        {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth in the Indian market.",
            items: [
                 { title: "Virtual CFO", path: "/in/virtual-cfo", desc: "Strategic financial leadership for fundraising, M&A, and business planning in India.", icon: TrendingUp, features: ["Financial Modeling & Forecasting", "Investor MIS Reporting", "Cash Flow Management", "Strategic Planning"] },
                 { title: "Cross-Border Accounting", path: "/in/cross-border-accounting", desc: "Manage foreign investment (FDI), transfer pricing, and FEMA/RBI compliance.", icon: Globe, features: ["FEMA/RBI Compliance (FDI)", "Transfer Pricing Advisory", "Withholding Tax (TDS) on Foreign Payments", "Tax Treaty Analysis"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/in" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to India Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in India</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your Indian business from anywhere in the world.
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
