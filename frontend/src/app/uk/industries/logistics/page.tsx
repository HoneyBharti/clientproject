'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
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
export default function UKLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in the ${countryName}?`, content: `Accounting for UK logistics and haulage companies involves managing complex fleet depreciation, tracking fuel costs and VAT, handling driver payroll or contractor payments, and analyzing per-mile profitability.` },
        { title: "Who needs this service?", content: "Any UK-based haulage company, freight forwarder, third-party logistics (3PL) provider, or courier service that needs to manage vehicle assets and operational costs effectively." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in the UK can range from £600 for a small fleet to £4,000+ for larger operations with complex asset management and reporting needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not recommended. The complexities of asset depreciation, VAT on fuel, and driver pay structures make outsourcing to a logistics accounting specialist essential for financial control." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track profitability, and manage the high variable costs of a fleet, outsourcing logistics accounting is a necessary operational investment in the UK." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Logistics & Haulage Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "description": `Outsourced accounting and tax services for UK logistics and haulage companies. We handle fleet depreciation, fuel cost and VAT tracking, and profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small UK Fleet Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "600",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large UK Fleet Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "GBP",
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
                <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Haulage Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master fleet cost analysis, fuel VAT reclaim, and driver payroll with specialized financial services for the UK transportation sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The UK's logistics and haulage industry is the lifeblood of its economy, a capital-intensive sector that operates on thin margins and depends on operational efficiency. Financial success is determined by the ability to precisely manage variable costs—especially fuel—and maximize the utilization of expensive assets like trucks and trailers. Standard accounting often fails to provide the detailed, per-vehicle analysis required to make profitable decisions. Specialized logistics accounting, on the other hand, focuses on tracking the profitability of each vehicle and route, managing complex asset depreciation, and ensuring compliance with specific tax rules related to fuel and transport, providing the critical data needed to stay competitive. This guide outlines the essential accounting services UK logistics and haulage companies need to thrive.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK logistics accounting services are built for companies that move goods on Britain's roads:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Owner-Operators & Small Hauliers:</strong> Small firms that need to manage fuel costs, track maintenance expenses, and optimize their tax position.</li>
                                <li><strong>Medium to Large Fleet Operators:</strong> Companies requiring sophisticated management of asset depreciation, fleet financing, and detailed profitability analysis per vehicle.</li>
                                <li><strong>Freight Forwarders & 3PL Providers:</strong> Businesses that manage complex supply chains for clients, needing to track costs and margins across multiple transport modes.</li>
                                <li><strong>Courier & Last-Mile Delivery Services:</strong> Companies managing a large number of vehicles and drivers, requiring efficient payroll and expense management systems.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you acquire your first vehicle, specialized logistics accounting is necessary. It becomes indispensable at these key stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Purchase Your First Truck:</strong> You must establish a depreciation schedule for the asset and begin meticulously tracking all related costs, from insurance to repairs.</li>
                                <li><strong>When You Hire Your First Driver:</strong> This triggers PAYE payroll obligations and the need to manage expenses like overnight allowances and fuel cards.</li>
                                <li><strong>When You Need to Reclaim Fuel VAT:</strong> Correctly accounting for fuel expenses is essential for maximizing VAT reclaims, a significant factor in managing cash flow.</li>
                                <li><strong>When You Need to Secure Asset Finance:</strong> Lenders will require detailed financial statements and cash flow projections to approve financing for new vehicles.</li>
                                <li><strong>When You Want to Understand True Profitability:</strong> To determine if your business is truly making money, you must be able to calculate your revenue and cost on a per-mile or per-job basis.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>Outsourcing your logistics accounting provides access to a specialized skillset crucial for profitability in this low-margin industry. Costs are typically based on fleet size and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Fleet (1-5 vehicles):</strong> £600 - £1,500 per month. This generally includes specialized bookkeeping, VAT returns, and basic fleet P&L reporting.</li>
                                <li><strong>Medium Fleet (6-25 vehicles):</strong> £1,500 - £4,000 per month. This level adds more detailed asset management, depreciation schedules, and profitability analysis.</li>
                                <li><strong>Large Fleets:</strong> Custom pricing starting at £4,000+, often including fractional CFO services for strategic advice on fleet acquisition and financing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in the UK has specific financial risks that can severely impact operations:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect VAT Reclaims on Fuel:</strong> HMRC has complex rules about reclaiming VAT on fuel used for private vs. business mileage. Errors can lead to audits and penalties.</li>
                                <li><strong>Improper Asset Depreciation:</strong> Failing to correctly depreciate high-value assets like trucks and trailers can distort your company's financial position and tax liability.</li>
                                <li><strong>Poor Cost Control:</strong> Without a precise understanding of cost-per-mile, haulage companies can easily take on unprofitable contracts, leading to financial distress.</li>
                                <li><strong>Driver Expense Mismanagement:</strong> Inconsistently handling driver expenses and allowances can lead to disputes and payroll compliance issues.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not generic business accounting. It requires a deep understanding of asset management, capital allowances, and VAT on road fuel. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every vehicle in your fleet, ensure you are maximizing your VAT reclaims, and manage complex depreciation schedules correctly. We provide you with the financial clarity needed to bid on contracts confidently and make smart decisions about growing your fleet. By handling the complex financial administration, we let you focus on your core mission: delivering goods safely, on time, and profitably.
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

