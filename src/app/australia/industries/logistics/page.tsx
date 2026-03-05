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
export default function AustraliaLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in ${countryName}?`, content: `Accounting for Australian logistics firms involves managing complex fleet depreciation, tracking fuel costs and claiming Fuel Tax Credits, handling driver payroll, and analyzing per-kilometer profitability.` },
        { title: "Who needs this service?", content: "Any Australian-based freight forwarder, 3PL provider, trucking company, or courier service dealing with domestic and international shipments." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in Australia can range from AUD $1,000 for smaller operators to AUD $6,000+ for larger companies with complex international shipments." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of Fuel Tax Credits, asset depreciation, and driver awards make outsourcing to a logistics accounting specialist essential." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track profitability, and manage the high operational costs of a logistics business in Australia, outsourcing accounting is a necessary investment." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Logistics & Freight Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for logistics and freight companies in Australia. We handle fleet depreciation, Fuel Tax Credits, and per-kilometer profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Australia Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1000",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Australia Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "6000",
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
                <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Freight Accounting in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master fuel tax credits, fleet costs, and multi-currency transactions with specialized financial services for Australia's transport sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's vast geography makes its logistics and transport industry a vital economic artery. However, operating in this capital-intensive sector means navigating high operational costs, complex asset management, and a unique tax credit system. Financial success depends on precise control over variable costs—especially fuel—and maximizing the efficiency of every vehicle. Standard accounting practices often fail to capture the detailed, per-vehicle data needed to make profitable decisions or to claim all available tax benefits, like the Fuel Tax Credit. This guide outlines the essential, specialized accounting services that Australian logistics and freight companies need to stay competitive and compliant.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian logistics accounting services are built for companies at every stage of the supply chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Road Freight & Haulage Companies:</strong> From owner-operators to large fleet managers, businesses that need to track per-kilometer profitability, fuel consumption, and driver wages.</li>
                                <li><strong>Freight Forwarders & Customs Brokers:</strong> Companies coordinating international shipments that must manage multi-currency transactions, import/export documentation, and GST on taxable importations.</li>
                                <li><strong>Third-Party Logistics (3PL) & Warehousing Providers:</strong> Businesses offering storage and fulfillment services that require robust inventory management systems for their clients and efficient billing processes.</li>
                                <li><strong>Courier & Last-Mile Delivery Services:</strong> Companies managing a large fleet of smaller vehicles and drivers, needing to track delivery profitability and contractor payments.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the first delivery, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Purchase Your First Vehicle:</strong> You must establish a depreciation schedule for the asset and meticulously track all related costs, from registration and insurance to repairs and maintenance.</li>
                                <li><strong>You Become Eligible for Fuel Tax Credits:</strong> Businesses using fuel in heavy vehicles on public roads can claim a credit for the excise paid. This requires detailed records of fuel purchased and kilometers traveled.</li>
                                <li><strong>You Hire Drivers:</strong> This triggers complex payroll obligations under specific transport industry awards, including managing allowances for overtime and long-distance travel.</li>
                                <li><strong>You Need to Understand True Profitability:</strong> To determine if a freight route or client contract is profitable, you must be able to accurately calculate all associated costs and compare them to your revenue.</li>
                                <li><strong>You Face an ATO Audit:</strong> The ATO closely scrutinizes Fuel Tax Credit claims. Accurate, contemporaneous records are your only defense against claim adjustments and penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for managing costs and maximizing tax credits in this low-margin industry.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operators (low volume):</strong> AUD $1,000 - $2,500 per month. This generally includes GST-compliant bookkeeping, BAS preparation including Fuel Tax Credits, and basic fleet profitability tracking.</li>
                                <li><strong>Medium-Sized Fleets:</strong> AUD $2,500 - $6,000 per month. This level adds more detailed reporting on asset performance, cost analysis, and management of more complex payroll and international shipments.</li>
                                <li><strong>Large Logistics Firms:</strong> Custom pricing starting at AUD $6,000+, often including virtual CFO services for strategic advice on fleet acquisition, financing, and operational efficiency.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in Australia operates under strict tax and safety regulations, with significant risks for non-compliance:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Rejected Fuel Tax Credit Claims:</strong> This is a major financial risk. Claims rejected by the ATO due to inadequate record-keeping result in a direct loss of cash back to the business.</li>
                                <li><strong>Chain of Responsibility (CoR) Laws:</strong> All parties in the supply chain can be held legally liable for safety breaches, such as overloading or driver fatigue. Strong financial and operational records are part of demonstrating compliance.</li>
                                <li><strong>Incorrect Employee vs. Contractor Classification:</strong> Misclassifying a driver as a contractor when they are legally an employee can lead to large liabilities for unpaid superannuation and other entitlements.</li>
                                <li><strong>Poor Cost Control:</strong> Without a precise understanding of your cost-per-kilometer, it is easy to accept unprofitable contracts, which can quickly lead to financial distress.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not generic business accounting. It requires a deep understanding of asset depreciation, the Fuel Tax Credit system, and the financial drivers of the transport industry. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every vehicle and route, ensure you are maximizing your Fuel Tax Credit claims, and manage your complex asset schedules correctly. We provide the financial clarity needed to bid on contracts confidently and make smart decisions about growing your fleet. This allows you to focus on your core mission: moving goods safely, on time, and profitably across Australia.
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
