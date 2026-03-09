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
                <h4 className="font-semibold text-gray-700">How does business compliance work in Singapore?</h4>
                <p className="text-gray-600">Compliance in Singapore involves registering a Pte. Ltd. company with ACRA, appointing a resident director and a company secretary, and maintaining a local registered office. Annually, companies must file an Annual Return with ACRA and a corporate tax return with IRAS. GST registration is required if turnover exceeds S$1 million.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Who needs accounting services in Singapore?</h4>
                <p className="text-gray-600">Every company in Singapore must maintain proper accounting records as per the Companies Act. Accounting services are essential for preparing the Unaudited Financial Statements required for the Annual General Meeting (AGM), filing annual tax returns with IRAS, and managing GST if applicable. They are vital for compliance and financial oversight.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in Singapore?</h4>
                <p className="text-gray-600">Non-compliance in Singapore can lead to fines and penalties from ACRA and IRAS for late filings. Directors can be held personally liable for breaches of their duties. Severe non-compliance can lead to the company being struck off the register, damaging its reputation and ability to operate, and potentially leading to legal action against the directors.</p>
            </div>
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, features }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
        <div className="flex items-center mb-6">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl mr-4">
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

export default function SingaporeServicesPage() {
    const services = [
        {
            category: "Formation Services",
            icon: Building,
            description: "Launch your Singapore Pte. Ltd. company to access Asia's premier business hub.",
            items: [
                { title: "Company Formation", path: "/singapore/company-formation", desc: "The gold standard for businesses in Singapore, offering credibility and limited liability.", icon: Building, features: ["ACRA Name Reservation & Filing", "Company Constitution", "Nominee Director Service", "Company Secretary Appointment", "Bank Account Assistance"] },
            ]
        },
        {
            category: "Bookkeeping & Finance",
            icon: Briefcase,
            description: "Maintain accurate books compliant with Singapore Financial Reporting Standards (SFRS).",
            items: [
                { title: "Bookkeeping", path: "/singapore/bookkeeping", desc: "We use cloud software to manage your accounts, ensuring they are always up-to-date and compliant.", icon: Zap, features: ["SFRS-compliant Bookkeeping", "Bank Reconciliation", "GST-compliant Record Keeping", "Monthly Financial Reports"] },
                { title: "Accounting", path: "/singapore/accounting", desc: "Preparation of annual financial statements for ACRA and IRAS filing.", icon: BookOpen, features: ["Unaudited Financial Statements (UFS)", "SFRS Compliance", "Audit Liaison (if required)"] },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Expert handling of your obligations with ACRA and IRAS.",
            items: [
                { title: "Annual Compliance", path: "/singapore/annual-compliance", desc: "We manage all mandatory annual filings to keep your company compliant.", icon: FileCheck, features: ["Annual General Meeting (AGM) Documentation", "Annual Return Filing with ACRA", "Registered Office Address Service", "Corporate Secretary Services"] },
                { title: "Tax Compliance", path: "/singapore/tax-compliance", desc: "Comprehensive preparation and filing of your corporate taxes to maximize incentives like SUTE.", icon: Landmark, features: ["Estimated Chargeable Income (ECI) Filing", "Annual Corporate Tax Return (Form C-S/C)", "Start-up Tax Exemption (SUTE) Advisory", "GST Registration & Filing"] },
                { title: "Payroll", path: "/singapore/payroll", desc: "Manage salaries and mandatory CPF contributions for your Singaporean team.", icon: Users, features: ["CPF Registration & Filing", "Monthly Payslips", "Skills Development Levy (SDL)", "IR8A Form Preparation"] },
            ]
        },
        {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth in Asia.",
            items: [
                 { title: "Virtual CFO", path: "/singapore/virtual-cfo", desc: "Strategic financial leadership for fundraising, M&A, and APAC expansion.", icon: TrendingUp, features: ["Financial Modeling & Forecasting", "Investor Reporting", "Cash Flow Management", "Strategic Planning"] },
                 { title: "Cross-Border Accounting", path: "/singapore/cross-border-accounting", desc: "Manage multi-currency transactions and international tax complexities.", icon: Globe, features: ["Transfer Pricing Advisory", "Tax Treaty Analysis", "Financial Consolidation", "Foreign Exchange Management"] },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/singapore" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Singapore Overview
                        </Link>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services in Singapore</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                An integrated suite of services to start, run, and grow your Singapore business from anywhere in the world.
                            </p>
                        </div>

                        {services.map((serviceCategory) => (
                            <section key={serviceCategory.category} className="py-16 bg-red-50/20 rounded-2xl mb-16 border border-red-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center mb-12">
                                        <div className="p-4 bg-red-100 text-red-600 rounded-full mr-6"><serviceCategory.icon className="w-10 h-10" /></div>
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

