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
export default function DubaiLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in ${countryName}?`, content: `Accounting for Dubai logistics firms involves managing multi-currency freight charges, tracking warehouse and fleet costs, handling customs duties and VAT on shipments, and analyzing per-shipment profitability.` },
        { title: "Who needs this service?", content: "Any Dubai-based freight forwarder, 3PL provider, courier service, or trucking company operating in free zones like JAFZA or Dubai South." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in Dubai can range from AED 3,500 for smaller operators to AED 12,000+ for larger companies with complex international shipments." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of customs, multi-currency transactions, and asset management make outsourcing to a logistics accounting specialist essential." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track profitability, and manage the high operational costs of a logistics business in Dubai, outsourcing accounting is a necessary investment." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting and tax services for logistics and freight companies in Dubai, UAE. We handle multi-currency freight charges, customs/VAT, and per-shipment profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Dubai Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3500",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Dubai Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "12000",
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
                <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Freight Accounting in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master customs, VAT, and multi-currency transactions with specialized financial services for Dubai's logistics sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai's strategic position as a global crossroads, anchored by the massive Jebel Ali Port and Dubai International Airport, makes it a powerhouse for the logistics and freight forwarding industry. Companies operating here manage complex, high-volume supply chains that span the globe. Financial success in this capital-intensive sector depends on precise cost control, efficient management of multi-currency transactions, and expert navigation of customs duties and VAT. Standard accounting practices are ill-suited to the unique demands of logistics, where profitability is measured on a per-shipment basis and cash flow is king. This guide outlines the essential, specialized accounting services that logistics and freight companies in Dubai need to maintain a competitive edge.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dubai logistics accounting services are built for companies at the heart of the supply chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Freight Forwarders:</strong> Companies based in logistics-focused free zones like JAFZA or Dubai South that coordinate air and sea freight for international clients.</li>
                                <li><strong>Third-Party Logistics (3PL) Providers:</strong> Businesses offering integrated warehousing, fulfillment, and transportation services for e-commerce and retail clients.</li>
                                <li><strong>Trucking & Haulage Companies:</strong> Operators managing fleets of vehicles for land transportation within the UAE and across the GCC.</li>
                                <li><strong>Courier & Last-Mile Delivery Services:</strong> Companies focused on final-stage delivery, needing to manage high volumes of small transactions and driver payments.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Handle Your First Import/Export:</strong> This requires correct management of customs declarations, duties, and import VAT.</li>
                                <li><strong>You Begin Invoicing in Multiple Currencies:</strong> You need a system to manage foreign exchange fluctuations and record transactions accurately in AED for tax purposes.</li>
                                <li><strong>You Need to Understand Shipment Profitability:</strong> To make money, you must be able to accurately calculate all associated costs (freight, customs, insurance, transport) for each individual shipment and compare it to your revenue.</li>
                                <li><strong>You Invest in Assets:</strong> Whether it's a warehouse or a fleet of trucks, you need to manage depreciation schedules and financing arrangements.</li>
                                <li><strong>You Cross the VAT Threshold:</strong> Once your turnover exceeds AED 375,000, you must register for VAT and correctly apply the complex rules for domestic and international transportation services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for profitability in this asset-heavy, low-margin industry.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operators (low volume):</strong> AED 3,500 - AED 6,000 per month. This generally includes bookkeeping, VAT returns, and basic shipment profitability tracking.</li>
                                <li><strong>Medium-Sized Forwarders/3PLs:</strong> AED 6,000 - AED 15,000 per month. This level adds more detailed reporting, cost analysis, and management of more complex customs and multi-currency transactions.</li>
                                <li><strong>Large Logistics Firms:</strong> Custom pricing starting at AED 15,000+, often including fractional CFO services for strategic advice on asset acquisition and operational efficiency.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in Dubai operates under strict customs and tax regulations, with significant risks for non-compliance:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Customs Declarations:</strong> Misclassifying goods or undervaluing shipments can lead to hefty fines, delays, and seizure of goods by Dubai Customs.</li>
                                <li><strong>VAT Errors on Transportation Services:</strong> The VAT treatment of local vs. international transport is different. Applying the wrong rate can lead to significant liabilities and FTA penalties.</li>
                                <li><strong>Poor Cost Control:</strong> Without a precise understanding of all costs associated with a shipment, companies can easily quote unprofitable jobs, leading to financial losses.</li>
                                <li><strong>Cash Flow Gaps:</strong> The logistics industry often involves paying carriers and customs upfront while waiting for payment from clients. Without careful cash flow management, this can lead to a liquidity crisis.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not generic business accounting. It requires a deep understanding of incoterms, customs regulations, and the financial drivers of the supply chain. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every shipment, ensure you are compliant with Dubai Customs and the FTA, and manage multi-currency transactions effectively. We provide you with the financial clarity needed to price your services competitively, make smart decisions about asset investment, and manage your cash flow effectively in a demanding industry. This allows you to focus on your core mission: moving goods efficiently and reliably for your clients.
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

