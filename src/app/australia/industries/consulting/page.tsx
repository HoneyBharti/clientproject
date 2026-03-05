'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// AI Answer Block Component
const AiAnswerBlock = ({ blocks }) => (
    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-6">
            {blocks.map((block, index) => (
                <div key={index}>
                    <h4 className="font-semibold text-gray-700">{block.title}</h4>
                    <p className="text-gray-600">{block.content}</p>
                </div>
            ))}
        </div>
    </div>
);

// Content Section Component
const ContentSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

// Main Page Component
export default function AustraliaConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian consulting firms involves managing project-based revenue, tracking billable hours, ensuring correct GST treatment on services, and navigating Personal Services Income (PSI) rules.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., IT, business, marketing) operating as a company or sole trader in Australia." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in Australia typically range from AUD $600 for a solo consultant to AUD $3,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky due to complex PSI and GST rules. Outsourcing ensures tax optimization and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For Australian consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance, and reclaim valuable billable time." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Consulting & Professional Services Accounting & Tax",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in Australia. We handle project accounting, GST on services, and Personal Services Income (PSI) compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Consulting Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Australia Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "600",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Australia Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                }
            ]
        }
    };
    
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": aiBlocks.map(block => ({
            "@type": "Question",
            "name": block.title,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": block.content
            }
        }))
    };

    return (
        <div className="bg-white font-inter">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

            <main>
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for Australian consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's robust economy provides fertile ground for independent consultants and professional service firms. The business model of leveraging expertise and time is highly effective, but it comes with a unique set of financial and tax challenges. Profitability depends on efficient time tracking, accurate project costing, and navigating Australia's tax landscape, particularly the rules around Goods and Services Tax (GST) and, critically, the Personal Services Income (PSI) rules. Standard bookkeeping is often insufficient to provide the strategic insights needed to run a profitable service business while ensuring full compliance with the Australian Taxation Office (ATO). This guide details the specialized accounting and tax services essential for consultants and professional service firms to succeed in Australia.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in the Australian market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Contractors:</strong> Solo professionals, often operating through a company structure, who need to manage their finances, optimize tax planning, and ensure they are compliant with PSI rules.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms in sectors like technology, marketing, or management that need to track project profitability and manage payroll for a small team.</li>
                                <li><strong>IT & Tech Consultants:</strong> Experts providing software development or tech advisory services who need to manage software expenses and correctly apply GST on their services.</li>
                                <li><strong>Non-Resident Consultants with an Australian company:</strong> Foreign experts using an Australian entity to service local clients, who need guidance on cross-border tax issues and compliance.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client engagement, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Cross the GST Threshold:</strong> Once your turnover exceeds AUD $75,000, GST registration is mandatory. This requires issuing tax invoices and filing regular Business Activity Statements (BAS).</li>
                                <li><strong>When You Hire Staff or Contractors:</strong> This triggers PAYG (Pay As You Go) withholding and Superannuation Guarantee obligations for employees, or requires careful management of contractor agreements.</li>
                                <li><strong>When Considering Your Business Structure:</strong> The PSI rules can limit the tax deductions available to individuals operating through a company. Professional advice is needed to determine if you pass the PSI tests and can access company tax benefits.</li>
                                <li><strong>At Year-End:</strong> For preparing financial statements and filing your annual company or individual tax return, ensuring all eligible deductions are claimed and tax liabilities are correctly calculated.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Investing in outsourced accounting is a high-ROI decision for consultants, freeing up valuable billable hours and ensuring tax compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Contractor:</strong> AUD $600 - $1,500 per month. This typically covers comprehensive bookkeeping, BAS preparation, payroll for one director, and annual tax planning.</li>
                                <li><strong>Small Firm (2-10 people):</strong> AUD $1,500 - $4,000 per month. This service level adds payroll for more employees and more detailed management reporting on project profitability.</li>
                                <li><strong>Growing Firms (10+ people):</strong> Custom pricing starting at AUD $4,000+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses in Australia face unique compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>PSI Rule Breaches:</strong> If the ATO determines your company is earning Personal Services Income and you don't meet the required tests, you can lose access to company tax rates and many business deductions, resulting in a large, unexpected tax bill.</li>
                                <li><strong>GST Errors:</strong> Incorrectly charging GST, especially on services provided to overseas clients (which are often GST-free), can lead to penalties and compliance costs.</li>
                                <li>**Missed Deductions:** Failing to properly document and claim all legitimate business expenses—like home office costs, vehicle use, and professional development—results in a higher income tax liability.</li>
                                <li><strong>Superannuation Non-Compliance:</strong> The definition of an 'employee' for superannuation purposes can sometimes include contractors. Failing to pay super for eligible workers leads to significant penalties (the Superannuation Guarantee Charge).</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your most valuable commodity. Every hour spent on administration is an hour you cannot bill. Outsourcing your accounting to YourLegal frees up this time while providing access to a team of experts in Australian tax law, especially the complex PSI rules.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your business and contracts to ensure you are as tax-effective as possible. We manage your GST and superannuation obligations, ensuring you are always compliant with the ATO. By taking the financial administration off your plate, we let you focus on what you do best: delivering exceptional service to your clients.
                            </p>
                        </ContentSection>

                        <AiAnswerBlock blocks={aiBlocks} />
                    </div>
                </section>
            </main>

            <AppFooter />
        </div>
    );
}
