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
export default function DubaiConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for consulting firms in Dubai involves managing retainer or project-based revenue, tracking billable hours, ensuring correct VAT treatment on services (especially for international clients), and complying with UAE Corporate Tax.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., IT, business, marketing) operating in a UAE Free Zone or on the Mainland." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in Dubai typically range from AED 1,500 for a solo consultant to AED 5,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky due to complex UAE VAT and Corporate Tax rules. Outsourcing ensures tax optimization and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For Dubai-based consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance, and reclaim valuable billable time." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in Dubai, UAE. We handle project accounting, VAT on services, and UAE Corporate Tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Consulting Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Dubai Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dubai Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
                        "priceCurrency": "AED",
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
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for Dubai-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai's position as a global business hub has made it a prime location for consultants and professional service firms. Selling expertise and time is a lucrative business model, but it comes with specific financial management needs. Profitability hinges on efficient time tracking, accurate project costing, and navigating the UAE's tax landscape, particularly VAT on services and the new Corporate Tax regime. Standard bookkeeping often fails to provide the insights needed to run a profitable service business in this unique, low-tax environment. This guide details the specialized accounting and tax services essential for consultants and professional service firms to succeed in Dubai.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in the UAE's dynamic market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Freelancers:</strong> Solo professionals, often operating from a free zone, who need to manage their finances efficiently and comply with VAT and Corporate Tax rules.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms in hubs like DIFC or DMCC that require tracking of project profitability and management of multi-currency billing.</li>
                                <li><strong>IT & Tech Consultants:</strong> Tech experts serving a regional client base who need to manage software expenses and correctly apply VAT on digital services.</li>
                                <li><strong>Marketing & PR Professionals:</strong> Individuals and small teams managing client retainers and needing clear financial reporting to demonstrate value.</li>
                                <li><strong>Foreign Consultants using a UAE entity:</strong> International experts using a Dubai free zone company as a base for their global operations, benefiting from the 0% tax on 'Qualifying Income'.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client contract, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Register for VAT:</strong> Once your taxable turnover exceeds AED 375,000, you must register for VAT and begin filing quarterly returns. This requires accurate, FTA-compliant bookkeeping.</li>
                                <li><strong>When the Corporate Tax Applies:</strong> All businesses must register for Corporate Tax. Proper accounting is necessary to calculate your taxable income and determine if you can benefit from the 0% rate for free zone entities.</li>
                                <li><strong>When You Hire Staff:</strong> This triggers WPS-compliant payroll and end-of-service gratuity obligations.</li>
                                <li><strong>When You Invoice International Clients:</strong> Correctly applying the 'place of supply' rules for VAT on services to overseas clients is complex and requires expert guidance to avoid errors.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>Investing in outsourced accounting for a consultant is a high-ROI decision, freeing up billable hours and ensuring tax compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> AED 1,500 - AED 3,000 per month. This typically covers bookkeeping, VAT returns, and preparation for the Corporate Tax filing.</li>
                                <li><strong>Small Firm (2-5 people):</strong> AED 3,000 - AED 7,000 per month. This service level adds payroll for a small team and more detailed management reporting on project profitability.</li>
                                <li><strong>Growing Firms (5+ people):</strong> Custom pricing starting at AED 7,000+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses in Dubai face unique compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>VAT Errors on Services:</strong> Incorrectly determining the place of supply for services to foreign clients can lead to under- or over-charging VAT, resulting in penalties from the FTA.</li>
                                <li><strong>Loss of 0% Corporate Tax Rate:</strong> For free zone consultants, earning even a small amount of non-qualifying income (e.g., from a Mainland client) without proper structuring can risk the 0% tax rate on all income.</li>
                                <li><strong>Failure to Maintain Records:</strong> UAE law requires businesses to maintain proper accounting records for at least five years. Failure to do so can result in fines.</li>
                                <li><strong>Commingling Funds:</strong> Mixing business and personal expenses can create major issues during an audit and complicates the calculation of taxable business profit.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your inventory. Every hour spent on administration is an hour you cannot bill. Outsourcing your accounting to YourLegal frees up this valuable time while providing access to a team of experts in UAE tax law.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your contracts and invoicing to align with the UAE's Corporate Tax rules for 'Qualifying Income', maximizing your eligibility for the 0% rate. We manage your VAT filings, ensuring compliance with complex service-related rules. By taking the financial administration off your plate, we let you focus on what you do best: delivering exceptional service to your clients.
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
