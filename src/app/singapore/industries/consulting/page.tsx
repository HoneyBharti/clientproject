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
export default function SingaporeConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for consulting firms in Singapore involves managing project-based revenue, tracking billable hours, ensuring correct GST treatment on services (especially for international clients), and complying with corporate tax laws.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., IT, business, marketing) operating a Pte. Ltd. company in Singapore to serve the APAC region." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in Singapore typically range from S$400 for a solo consultant to S$2,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky due to complex GST rules and tax regulations. Outsourcing ensures tax optimization and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For Singapore-based consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance with IRAS and ACRA, and reclaim valuable billable time." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in Singapore. We handle project accounting, GST on services, and tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Consulting Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Singapore Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "400",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Singapore Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
                        "priceCurrency": "SGD",
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
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for Singapore-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Singapore's reputation as a global hub of finance, technology, and commerce makes it an ideal base for independent consultants and professional service firms. The business model of selling expertise is highly profitable, but it comes with specific financial management needs. Success depends on efficient time tracking, accurate project costing, and navigating Singapore's tax landscape, particularly the Goods and Services Tax (GST) rules for services rendered to local and international clients. Standard bookkeeping often fails to provide the insights needed to run a profitable service business while ensuring full compliance with ACRA and IRAS. This guide details the specialized accounting and tax services essential for consultants and professional service firms to succeed in Singapore.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in Singapore's dynamic market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Freelancers:</strong> Solo professionals operating as Pte. Ltd. companies who need to manage their finances, optimize tax planning, and ensure compliance.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms in sectors like finance, tech, or marketing that require tracking of project profitability and management of multi-currency billing for regional clients.</li>
                                <li><strong>IT & Tech Consultants:</strong> Tech experts serving a regional client base who need to manage software expenses and correctly apply GST on digital services.</li>
                                <li><strong>Foreign Consultants using a Singapore Entity:</strong> International experts using a Singaporean company as a credible base for their APAC operations, benefiting from the country's stability and strong legal framework.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client contract, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Cross the GST Threshold:</strong> Once your taxable turnover exceeds S$1 million, GST registration is mandatory. This requires issuing GST-compliant invoices and filing quarterly returns.</li>
                                <li><strong>When You Hire Staff:</strong> This triggers payroll obligations, including mandatory Central Provident Fund (CPF) contributions for local employees.</li>
                                <li><strong>When You Invoice International Clients:</strong> Correctly determining the 'place of supply' for services to foreign clients is crucial for GST compliance. Services to overseas clients are often zero-rated, but must be reported correctly.</li>
                                <li><strong>At Year-End:</strong> For preparing Unaudited Financial Statements for ACRA and filing your annual Corporate Tax Return with IRAS, ensuring all deductions are claimed and tax liabilities are correctly calculated.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>Investing in outsourced accounting for a consultant is a high-ROI decision, freeing up billable hours and ensuring tax compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> S$400 - S$800 per month. This typically covers comprehensive bookkeeping, GST compliance, and preparation for annual tax filings.</li>
                                <li><strong>Small Firm (2-5 people):</strong> S$800 - S$2,500 per month. This service level adds payroll for the team and more detailed management reporting on project profitability.</li>
                                <li><strong>Growing Firms (5+ people):</strong> Custom pricing starting at S$2,500+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses in Singapore face unique compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Errors on Services:</strong> Incorrectly applying GST, especially for international services, can lead to under- or over-charging and result in penalties from IRAS.</li>
                                <li><strong>Missed Deductions:</strong> Failing to properly document and claim all legitimate business expenses leads to a higher corporate tax liability.</li>
                                <li><strong>Commingling Funds:</strong> Mixing business and personal expenses can create major issues during an audit and complicates the calculation of business profit.</li>
                                <li><strong>Late ACRA/IRAS Filings:</strong> Missing deadlines for annual returns or tax filings leads to automatic penalties and can affect the company's and directors' compliance records.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your inventory. Every hour spent on administration is an hour you cannot bill. Outsourcing your accounting to YourLegal frees up this valuable time while providing access to a team of experts in Singaporean tax and corporate law.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your contracts and invoicing for optimal GST compliance. We manage all your monthly and annual filings, ensuring you are always compliant with ACRA and IRAS. By taking the financial administration off your plate, we let you focus on what you do best: delivering exceptional service to your clients.
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
