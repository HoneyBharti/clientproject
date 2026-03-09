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
export default function NetherlandsLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in the ${countryName}?`, content: `Accounting for Dutch logistics firms involves managing multi-currency freight charges, tracking fleet costs, handling complex BTW (VAT) rules for EU and international transport, and analyzing per-shipment profitability.` },
        { title: "Who needs this service?", content: "Any Dutch-based freight forwarder, 3PL provider, or trucking company leveraging the Port of Rotterdam and Schiphol Airport for European logistics." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in the Netherlands can range from €700 for smaller operators to €4,000+ for larger companies with complex EU-wide shipments." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of EU VAT on transport, customs, and asset management make outsourcing to a logistics accounting specialist essential." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track profitability, and manage the high operational costs of a logistics business in the Netherlands, outsourcing accounting is a necessary investment." }
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
            "name": "Netherlands"
        },
        "description": `Outsourced accounting and tax services for logistics and freight companies in the Netherlands. We handle multi-currency freight charges, BTW (VAT) on EU transport, and profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Netherlands Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "700",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Netherlands Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "EUR",
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
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Freight Accounting in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master EU BTW (VAT), customs, and multi-currency transactions with specialized financial services for the Dutch transport sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The Netherlands is Europe's undisputed logistics champion. With the Port of Rotterdam (Europe's largest) and Schiphol Airport (a major air cargo hub), the country serves as the primary entry point and distribution center for goods flowing into the European Union. Financial success in this capital-intensive sector depends on precise cost control, efficient management of multi-currency freight charges, and expert navigation of complex EU-wide BTW (VAT) and customs regulations. Standard accounting practices are ill-suited to the unique demands of logistics, where profitability is measured on a per-shipment basis and cash flow is critical. This guide outlines the essential, specialized accounting services that Dutch logistics and freight companies need to maintain a competitive edge.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dutch logistics accounting services are built for companies at the heart of the European supply chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Freight Forwarders:</strong> Companies coordinating air and sea freight from around the world into the EU via Dutch ports and airports.</li>
                                <li><strong>Third-Party Logistics (3PL) & E-commerce Fulfillment Centers:</strong> Businesses offering warehousing and pan-European distribution for online retailers.</li>
                                <li><strong>Trucking & Haulage Companies:</strong> Operators managing fleets of vehicles for road transportation from the Netherlands to other EU member states.</li>
                                <li><strong>Customs Brokers:</strong> Agents specializing in navigating Dutch customs and ensuring smooth clearance of goods into the EU single market.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Import Goods into the EU:</strong> You need an Article 23 license to defer import BTW, a critical cash flow advantage for importers.</li>
                                <li><strong>You Transport Goods Across EU Borders:</strong> This requires correctly applying the BTW reverse-charge mechanism and managing digital transport documents (e-CMR).</li>
                                <li><strong>You Need to Understand Shipment Profitability:</strong> To be profitable, you must be able to accurately calculate all associated costs (freight, customs duties, insurance, transport) for each individual shipment and compare it to your revenue.</li>
                                <li><strong>You Invest in Assets:</strong> Whether it's a warehouse or a fleet of trucks, you need to manage depreciation schedules and financing arrangements.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for profitability in this asset-heavy, low-margin industry.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operators (low volume):</strong> €700 - €1,600 per month. This generally includes BTW-compliant bookkeeping, import/export transaction processing, and basic shipment profitability tracking.</li>
                                <li><strong>Medium-Sized Forwarders/3PLs:</strong> €1,600 - €4,000 per month. This level adds more detailed reporting, cost analysis, and management of more complex customs and multi-currency transactions.</li>
                                <li><strong>Large Logistics Firms:</strong> Custom pricing starting at €4,000+, often including virtual CFO services for strategic advice on fleet acquisition and operational efficiency.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in the Netherlands operates under strict customs and tax regulations, with significant risks for non-compliance:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect BTW on EU Transport:</strong> The BTW rules for transport services within the EU are complex. Incorrect application of zero-rating or reverse charges can lead to significant penalties from the Belastingdienst.</li>
                                <li><strong>Customs Errors:</strong> Misclassifying goods or undervaluing shipments can lead to hefty fines and delays, damaging your reputation as a reliable logistics partner.</li>
                                <li><strong>Loss of Article 23 License:</strong> Failure to maintain compliant records can lead to the revocation of your import BTW deferment license, creating a severe cash flow disadvantage.</li>
                                <li><strong>Poor Cost Control:</strong> Without a precise understanding of all costs associated with a shipment or route, companies can easily take on unprofitable contracts, leading to financial distress.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not generic business accounting. It requires a deep understanding of EU customs law, the pan-European BTW system, and the financial drivers of the supply chain. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every shipment, ensure you are fully compliant with the Belastingdienst and EU customs authorities, and manage your multi-currency transactions effectively. We provide you with the financial clarity needed to price your services competitively and make smart decisions about operational efficiency, allowing you to focus on your core mission: moving goods through Europe's premier logistics gateway.
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

