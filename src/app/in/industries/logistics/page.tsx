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
export default function IndiaLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in ${countryName}?`, content: `Accounting for Indian logistics firms involves managing multi-currency freight charges, tracking fleet costs, handling complex GST rules on transportation, and analyzing per-shipment profitability.` },
        { title: "Who needs this service?", content: "Any India-based freight forwarder, 3PL provider, trucking company, or courier service dealing with domestic and international shipments." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in India can range from ₹40,000 for smaller operators to ₹1,50,000+ for larger companies with complex multi-state and international shipments." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of GST on GTA, e-way bills, and asset management make outsourcing to a logistics accounting specialist essential." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track profitability, and manage the high operational costs of a logistics business in India, outsourcing accounting is a necessary investment." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for logistics and freight companies in India. We handle multi-currency freight charges, GST on GTA, e-way bills, and per-shipment profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small India Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "40000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large India Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "150000",
                        "priceCurrency": "INR",
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
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Freight Accounting in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master GST, e-way bills, and multi-currency transactions with specialized financial services for India's logistics sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's logistics and supply chain sector is the engine of its economy, a vast and complex industry defined by high volumes, thin margins, and a web of inter-state regulations. Financial success depends on precise cost control, efficient management of domestic and international freight, and expert navigation of a complex GST regime specific to Goods Transport Agencies (GTAs). Standard accounting practices are ill-equipped to handle the unique demands of logistics, where profitability is determined on a per-shipment or per-vehicle basis and cash flow is paramount. This guide outlines the essential, specialized accounting services that logistics and freight companies in India need to maintain a competitive advantage and ensure compliance.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India logistics accounting services are built for companies at every point of the supply chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Freight Forwarders & Custom House Agents (CHAs):</strong> Companies coordinating air and sea freight for international clients, who need to manage multi-currency transactions and customs duties.</li>
                                <li><strong>Third-Party Logistics (3PL) & Warehousing Providers:</strong> Businesses offering storage, fulfillment, and transportation services, requiring robust inventory management and client billing systems.</li>
                                <li><strong>Trucking & Fleet Owners:</strong> Operators managing fleets of vehicles who must track per-vehicle profitability, fuel costs, and driver payments.</li>
                                <li><strong>Courier & Last-Mile Delivery Companies:</strong> Businesses focused on final-stage delivery, needing to manage high volumes of transactions and optimize route profitability.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first consignment, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Move Goods Across State Lines:</strong> This immediately triggers the need for e-way bill generation and compliance with inter-state GST rules.</li>
                                <li><strong>You are Classified as a Goods Transport Agency (GTA):</strong> This subjects you to specific GST rules, including options for forward charge (12%) or reverse charge mechanism (RCM at 5%).</li>
                                <li><strong>You Need to Understand Shipment Profitability:</strong> To be profitable, you must accurately calculate all associated costs (freight, insurance, fuel, tolls, driver salary) for each shipment and compare it to your revenue.</li>
                                <li><strong>You Invest in a Fleet:</strong> Whether you own or lease trucks, you need to manage depreciation, financing, and maintenance costs on a per-vehicle basis.</li>
                                <li><strong>You Face a GST Audit:</strong> The logistics sector is a key focus for tax authorities. Accurate, organized records for e-way bills, GST input tax credits, and RCM compliance are your primary defense against penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for profitability in this asset-heavy, low-margin industry.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operators (low volume):</strong> ₹40,000 - ₹75,000 per month. This generally includes GST-compliant bookkeeping, e-way bill reconciliation, and basic shipment profitability tracking.</li>
                                <li><strong>Medium-Sized Forwarders/3PLs:</strong> ₹75,000 - ₹1,50,000 per month. This level adds more detailed reporting, cost analysis, and management of more complex customs and multi-currency transactions.</li>
                                <li><strong>Large Logistics Firms:</strong> Custom pricing starting at ₹1,50,000+, often including virtual CFO services for strategic advice on fleet management and operational efficiency.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in India operates under strict GST and transport regulations, with significant risks for non-compliance:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>E-Way Bill Non-Compliance:</strong> Moving goods without a valid e-way bill can lead to seizure of the vehicle and goods, plus heavy penalties.</li>
                                <li><strong>GST Errors on GTA Services:</strong> Incorrectly applying the forward charge or RCM rules for Goods Transport Agencies is a major compliance risk that can lead to significant GST demands and penalties.</li>
                                <li><strong>Input Tax Credit (ITC) Mismatches:</strong> Failure to reconcile your purchase invoices with your suppliers' GST filings can lead to the denial of ITC, directly impacting your cash flow.</li>
                                <li><strong>Poor Cost Control:</strong> Without a precise understanding of all costs associated with a route or contract, companies can easily operate at a loss, leading to financial instability.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not generic business accounting. It requires a deep understanding of GST laws for transport, e-way bill systems, and the financial drivers of the supply chain. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every route and vehicle, ensure you are fully compliant with the complex GST rules for GTAs, and manage your e-way bill data effectively. We provide you with the financial clarity needed to price your services competitively and make smart decisions about fleet and network expansion. This allows you to focus on your core mission: moving goods across India efficiently and reliably.
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
