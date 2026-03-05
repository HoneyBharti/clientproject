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
export default function SaudiLogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in ${countryName}?`, content: `Accounting for Saudi logistics firms involves managing fleet depreciation, tracking fuel costs, handling driver payroll via Mudad/GOSI, and ensuring compliance with ZATCA rules for transport services.` },
        { title: "Who needs this service?", content: "Any KSA-based freight forwarder, 3PL provider, trucking company, or courier service involved in the Kingdom's booming infrastructure and trade ecosystem." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in KSA can range from SAR 6,000 for smaller operators to SAR 25,000+ for larger companies with complex fleet and customs operations." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of fleet financing, driver regulations (GOSI), and ZATCA's e-invoicing make outsourcing to a logistics accounting specialist essential." },
        { title: "Final Decision Summary", content: "To ensure compliance, accurately track per-vehicle profitability, and manage the high operational costs of a logistics business in KSA, outsourcing accounting is a necessary investment." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for logistics and freight companies in Saudi Arabia. We handle fleet management, ZATCA e-invoicing, and per-shipment profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Saudi Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "6000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Saudi Logistics Operator Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "25000",
                        "priceCurrency": "SAR",
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
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Freight Accounting in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master customs, VAT, and multi-currency transactions with specialized financial services for the Kingdom's transport sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Saudi Arabia's Vision 2030 is fueling one of the world's most ambitious logistics and transport infrastructure booms. The Kingdom's strategic location, combined with massive investment in ports, rail, and road networks, creates enormous opportunities for logistics providers. However, operating in this capital-intensive and highly regulated sector requires precise financial control. Success depends on managing fleet costs, navigating complex customs and ZATCA regulations, and analyzing profitability on a per-shipment basis. Standard accounting practices are insufficient for these demands. This guide details the essential, specialized accounting services that Saudi logistics and freight companies need to stay competitive and compliant.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi logistics accounting services are built for companies at the heart of the Kingdom's supply chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Freight Forwarders & Customs Brokers:</strong> Companies managing international shipments via King Abdulaziz Port or other major entry points, who must handle customs duties, VAT, and multi-currency transactions.</li>
                                <li><strong>Third-Party Logistics (3PL) & Warehousing Providers:</strong> Businesses offering storage and fulfillment services, especially for the booming e-commerce sector, who require robust inventory and billing systems.</li>
                                <li><strong>Trucking & Haulage Companies:</strong> Operators with fleets of vehicles transporting goods across the Kingdom, needing to track per-vehicle profitability, fuel costs, and driver wages.</li>
                                <li><strong>Project Logistics Providers:</strong> Companies providing specialized transport solutions for Saudi Arabia's giga-projects, requiring complex project accounting and cost management.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Import/Export Goods:</strong> This requires correct management of customs declarations, duties, and VAT on imports, all handled through the Fasah platform.</li>
                                <li><strong>You Hire Drivers:</strong> This triggers mandatory GOSI registration and use of the Mudad platform for WPS-compliant payroll.</li>
                                <li><strong>You Invest in a Fleet:</strong> Whether you own or lease vehicles, you need to manage complex depreciation schedules and financing arrangements.</li>
                                <li><strong>You Need to Understand True Profitability:</strong> To bid competitively on contracts, you must be able to accurately calculate all associated costs (freight, customs, fuel, insurance, driver salaries) for each shipment.</li>
                                <li><strong>You Face a ZATCA Audit:</strong> ZATCA closely scrutinizes VAT on transport services and requires ZATCA-compliant e-invoicing for all transactions. Accurate records are your only defense against penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for managing costs and compliance in this low-margin, high-stakes industry.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operators (low volume):</strong> SAR 6,000 - SAR 12,000 per month. This generally includes ZATCA-compliant bookkeeping, VAT returns, and basic fleet profitability tracking.</li>
                                <li><strong>Medium-Sized Forwarders/3PLs:</strong> SAR 12,000 - SAR 25,000 per month. This level adds more detailed reporting, cost analysis, and management of more complex customs and multi-currency transactions.</li>
                                <li><strong>Large Logistics Firms:</strong> Custom pricing starting at SAR 25,000+, often including virtual CFO services for strategic advice on fleet acquisition and financing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry in Saudi Arabia operates under strict customs and tax regulations, with significant risks for non-compliance:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Customs Declarations:</strong> Misclassifying goods or undervaluing shipments can lead to hefty fines, delays, and seizure of goods by Saudi Customs.</li>
                                <li><strong>ZATCA E-invoicing Violations:</strong> Failure to issue compliant e-invoices for all services is a direct violation of the law and results in penalties.</li>
                                <li><strong>VAT Errors on Transportation Services:</strong> The VAT treatment of domestic vs. international transport is different. Applying the wrong rate can lead to significant liabilities and FTA penalties.</li>
                                <li><strong>GOSI & Mudad Non-Compliance:</strong> Failure to correctly register employees for social insurance or pay them through the mandatory wage protection system can lead to fines and labor disputes.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance in KSA is not generic business accounting. It requires a deep understanding of customs law, ZATCA's e-invoicing system, and the financial drivers of the transport industry. Finding an in-house accountant with this specific expertise is both difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners provides an immediate, expert solution. We implement systems to track the profitability of every vehicle and shipment, ensure you are fully compliant with ZATCA and Saudi Customs, and manage your payroll and GOSI obligations correctly. We provide the financial clarity needed to bid on contracts confidently and make smart decisions about growing your fleet, allowing you to focus on your core mission: moving goods safely, on time, and profitably across the Kingdom.
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
