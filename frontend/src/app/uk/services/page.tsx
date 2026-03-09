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
                <h4 className="font-semibold text-gray-700">How does business compliance work in the UK?</h4>
                <p className="text-gray-600">UK compliance is managed by two primary bodies: Companies House for corporate governance and HMRC for taxes. Key annual requirements include filing a Confirmation Statement (CS01) with Companies House, and filing statutory accounts and a Company Tax Return (CT600) with HMRC. VAT registration is required if turnover exceeds £90,000.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in the UK?</h4>
                <p className="text-gray-600">Every UK company legally needs accounting services to maintain accurate records ("books") for preparing and filing annual statutory accounts and the Corporation Tax return. This is essential for meeting HMRC and Companies House requirements and for calculating tax liability correctly.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the UK?</h4>
                <p className="text-gray-600">Non-compliance in the UK results in automatic, escalating penalties from HMRC for late tax filing and from Companies House for late accounts filing. Continued failure can lead to director disqualification, legal action, and the company being forcibly dissolved and struck off the official register, which harms credit and banking relationships.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features, path }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full hover:-translate-y-1">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
                {Icon && <Icon className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 flex-grow">{desc}</p>
        <Link href={path} className="mt-4 text-sm text-blue-600 font-semibold flex items-center">
            Learn More <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
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

export default function UKServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your UK Limited company with a prestigious London address.",
            items: [
                { title: "Ltd Company Formation", path: "/uk/company-formation", desc: "The most common and credible structure for businesses in the UK, recognized globally.", icon: Building, features: ["Companies House Registration", "Articles of Association", "London Registered Office Address", "Corporation Tax (HMRC) Registration", "Bank Account Support"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "Keep your books compliant with UK accounting standards (FRS).",
            items: [
                { title: "MTD-Compliant Bookkeeping", path: "/uk/bookkeeping", desc: "We use 'Making Tax Digital' compliant software like Xero to manage your books accurately.", icon: Zap, features: ["FRS-compliant Bookkeeping", "Bank Reconciliation", "VAT Record Keeping (MTD)", "Monthly P&L and Balance Sheet"] },
                { title: "Accounting", path: "/uk/accounting", desc: "Preparation of annual statutory accounts and financial statements.", icon: BookOpen, features: ["Statutory Accounts (FRS 102/105)", "Management Accounts", "Audit Liaison"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate UK's complex tax and corporate filing landscape with confidence.",
            items: [
                { title: "Annual Compliance", path: "/uk/annual-compliance", desc: "We manage mandatory annual filings with Companies House to keep your company active and compliant.", icon: FileCheck, features: ["Confirmation Statement (CS01) Filing", "Statutory Accounts Filing", "Maintenance of PSC Register"] },
                { title: "Tax Filing Services", path: "/uk/tax-compliance", desc: "Comprehensive management of your Corporation Tax and VAT obligations with HMRC.", icon: Landmark, features: ["Quarterly VAT Returns (MTD)", "Annual Corporation Tax Return (CT600)", "iXBRL Statutory Accounts Submission to HMRC", "PAYE Registration & Management"] },
                { title: "Payroll", path: "/uk/payroll", desc: "Manage salaries and PAYE for your UK team.", icon: Users, features: ["PAYE Scheme Registration", "Monthly Payslips & Filings", "P60 & P45 Forms", "Pension Auto-enrollment"] },
            ]
        },
         {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth in the UK and Europe.",
            items: [
                 { title: "Virtual CFO", path: "/uk/virtual-cfo", desc: "Strategic financial leadership for fundraising, M&A, and business planning.", icon: TrendingUp, features: ["Financial Modeling & Forecasting", "Investor Reporting", "Cash Flow Management", "Strategic Planning"] },
                 { title: "Cross-Border Accounting", path: "/uk/cross-border-accounting", desc: "Manage multi-currency transactions and international tax complexities.", icon: Globe, features: ["Transfer Pricing Advisory", "Tax Treaty Analysis", "Financial Consolidation", "Foreign Exchange Management"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/uk" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to UK Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in the UK</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your UK business from anywhere in the world.
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

