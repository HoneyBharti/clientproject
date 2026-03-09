
'use client';

import React, { useState } from 'react';
import {
  Building, Briefcase, Zap, Users, BarChart3, ShieldCheck, FileCheck, Landmark, Shield, MapPin, CheckCircle, ChevronRight, TrendingUp, Globe, BookOpen
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { HubspotForm } from '@/components/forms/hubspot-form';
import Link from 'next/link';

const FaqSection = () => {
    const faqItems = [
        { title: "What services does YourLegal offer?", content: "YourLegal provides a full range of services to launch and manage a business. This includes legal entity formation, mandatory Registered Agent services, automated and dedicated bookkeeping, investor-grade financial reporting, annual state compliance filings, federal and state tax preparation, and Beneficial Ownership Information (BOI) reporting." },
        { title: "What are the core service areas?", content: "YourLegal's integrated suite of services covers three core areas: Formation (LLC & C-Corp incorporation, Registered Agent), Bookkeeping & Finance (automated and dedicated bookkeeping, financial reporting), and Taxes & Compliance (state annual filings, federal tax returns, and FinCEN BOI reporting)." }
    ];

    return (
        <section className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


const ProductDetailCard = ({ title, desc, icon: Icon, onLearnMore }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition flex flex-col h-full hover:-translate-y-1">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                {Icon && <Icon className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 flex-grow">{desc}</p>
        <button onClick={onLearnMore} className="mt-6 w-full py-2 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition text-sm flex items-center justify-center gap-2">
            Learn More <ChevronRight className="w-4 h-4" />
        </button>
    </div>
);

const productDetailsContent = {
    'Company Formation': {
        suitableFor: 'Founders launching a new business in a jurisdiction like the USA, UK, or UAE and needing a formal legal structure.',
        faq: [
            { q: 'What entity type should I choose?', a: 'It depends on your goals. We typically recommend a C-Corp for startups seeking venture capital and an LLC for most other businesses.' },
            { q: 'Can I form a company as a non-resident?', a: 'Yes. Our entire platform is built to help non-residents form and manage companies remotely.' }
        ],
        process: ['Select Jurisdiction', 'Submit Your Details', 'We File All Documents', 'Receive Legal Docs & EIN']
    },
    'Registered Agent': {
        suitableFor: 'All U.S. companies. It is a legal requirement in every state to have a registered agent to receive official mail.',
        faq: [
            { q: 'Why can\'t I use a PO Box?', a: 'The state requires a physical address where legal documents can be served in person during business hours.' },
        ],
        process: ['Appoint Us During Formation', 'We Receive Legal Mail', 'Mail is Scanned to Your Portal', 'You Receive Real-time Alerts']
    },
    'Bookkeeping': {
        suitableFor: 'Any business needing accurate, up-to-date financial records for tax purposes and decision-making.',
        faq: [
            { q: 'Which accounting software do you use?', a: 'We primarily work with QuickBooks Online and Xero, the industry standards for cloud accounting.' },
            { q: 'Is this accrual or cash basis?', a: 'We support both, but strongly recommend and implement accrual basis accounting for GAAP/IFRS compliance and investor readiness.' }
        ],
        process: ['Connect Bank Accounts', 'Transactions are Synced', 'AI & Human Categorization', 'Review Monthly Reports']
    },
    'Accounting & Reporting': {
        suitableFor: 'Businesses that have moved beyond basic bookkeeping and need formal financial statements for investors, lenders, or internal analysis.',
        faq: [
            { q: 'What is the difference between bookkeeping and accounting?', a: 'Bookkeeping is the recording of data. Accounting is the process of turning that data into insightful financial statements and analysis.' },
        ],
        process: ['Data Sync & Reconciliation', 'Financial Statements Generated', 'Key Metrics Analyzed', 'Reports Delivered to Portal']
    },
    'Annual & Tax Compliance': {
        suitableFor: 'All active companies. Failure to file can lead to penalties and the company being dissolved.',
        faq: [
            { q: 'What is a franchise tax?', a: 'It\'s a fee some states (like Delaware) charge for the privilege of being incorporated there. It\'s not based on profit.' },
            { q: 'What about international forms like Form 5472?', a: 'Yes, our tax compliance service for foreign-owned companies includes the preparation and filing of all required international informational returns.' }
        ],
        process: ['Monitor Due Dates', 'Prepare State & Federal Returns', 'File with Authorities', 'Confirm Good Standing']
    },
    'Payroll': {
        suitableFor: 'Any company hiring W-2 employees or paying 1099 contractors in the US and abroad.',
        faq: [
            { q: 'Can you handle multi-state payroll in the US?', a: 'Yes, our payroll partners are equipped to handle tax withholding and filings in all 50 states.' },
            { q: 'What about international employees?', a: 'For employees outside your primary country, we typically facilitate this through Employer of Record (EOR) partners.' }
        ],
        process: ['Onboard Employees', 'Run Payroll', 'Taxes Calculated & Filed', 'Direct Deposits Sent']
    },
    'Virtual CFO': {
        suitableFor: 'Growth-stage startups and SMEs that need strategic financial leadership but are not ready for a full-time, six-figure CFO.',
        faq: [
            { q: 'What is the main benefit of a vCFO?', a: 'Access to executive-level strategic advice for fundraising and growth at a fraction of the cost of a full-time hire.' }
        ],
        process: ['Strategic Kick-off', 'Build Financial Model', 'Monthly Reporting & Analysis', 'Fundraising & Board Support']
    },
    'Cross-Border Accounting': {
        suitableFor: 'Businesses with international subsidiaries, multi-currency revenue streams, or inter-company transactions.',
        faq: [
            { q: 'What is transfer pricing?', a: 'It is the set of rules for pricing transactions between related companies (e.g., a US subsidiary and its UK parent). We help you set and document a compliant policy.' }
        ],
        process: ['Global Structure Review', 'Policy Implementation', 'Multi-currency Consolidation', 'Tax Treaty Optimization']
    },
};

const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    const details = productDetailsContent[product.title] || {};

    return (
        <Dialog open={!!product} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{product.title}</DialogTitle>
                    <DialogDescription>{product.desc}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {details.suitableFor && (
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Best For:</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{details.suitableFor}</p>
                        </div>
                    )}
                    {details.process && (
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Our Process:</h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                {details.process.map((step, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-col items-center">
                                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">{index+1}</div>
                                          <p className="mt-1 text-center">{step}</p>
                                        </div>
                                        {index < details.process.length - 1 && <ChevronRight className="w-4 h-4 mt-[-16px] text-gray-300" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                    {details.faq && details.faq.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">FAQs:</h4>
                            <Accordion type="single" collapsible className="w-full">
                                {details.faq.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
                                        <AccordionContent className="text-sm">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

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

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            category: "Formation",
            icon: Building,
            description: "Launch your legal entity in key global hubs with a complete, compliant package.",
            items: [
                { title: "Company Formation", desc: "Fast, remote incorporation for LLCs and C-Corps in top jurisdictions like the USA, UK, and UAE.", icon: Building },
                { title: "Registered Agent", desc: "A mandatory address for official legal mail in your state of incorporation. We handle your correspondence securely.", icon: MapPin }
            ]
        },
        {
            category: "Finance & Accounting",
            icon: Briefcase,
            description: "Keep your books audit-ready and clearly understand your financial health with expert support.",
            items: [
                { title: "Bookkeeping", desc: "Accurate, compliant bookkeeping powered by AI and reviewed by human experts.", icon: Zap },
                { title: "Accounting & Reporting", desc: "Go beyond bookkeeping with GAAP/IFRS-compliant financial statements and investor-grade reporting.", icon: BarChart3 },
            ]
        },
        {
            category: "Taxes & Compliance",
            icon: ShieldCheck,
            description: "Navigate the complexities of global tax and corporate compliance with confidence.",
            items: [
                { title: "Annual & Tax Compliance", desc: "We manage all mandatory state/federal reports and tax returns to keep you in good standing.", icon: FileCheck },
                { title: "Payroll", desc: "Manage salaries, benefits, and tax withholding for your US and international employees.", icon: Users },
            ]
        },
        {
            category: "Strategic Advisory",
            icon: TrendingUp,
            description: "High-level financial guidance to support your growth and fundraising goals.",
            items: [
                 { title: "Virtual CFO", desc: "Get executive-level financial strategy for fundraising, M&A, and business planning.", icon: TrendingUp },
                 { title: "Cross-Border Accounting", desc: "Expert management of multi-currency transactions, transfer pricing, and international tax.", icon: Globe },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <main>
                <div className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Global Services Overview</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            An integrated suite of services to start, run, and grow your business from anywhere in the world.
                        </p>
                    </div>
                </div>

                {products.map((serviceCategory) => (
                    <section key={serviceCategory.category} className="py-16 bg-white border-b border-gray-100">
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
                                    <ProductDetailCard 
                                        key={item.title}
                                        {...item}
                                        onLearnMore={() => setSelectedProduct(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <FaqSection />
                </div>

                <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                <HubspotCtaSection />
            </main>
            <AppFooter />
        </div>
    );
}

