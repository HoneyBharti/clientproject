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
export default function SaudiEcommerceIndustryPage() {
    const serviceName = "E-commerce & Retail";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Saudi e-commerce involves managing inventory, ensuring every transaction has a ZATCA-compliant e-invoice, handling VAT on sales, and reconciling payments from gateways like Mada and Tamara.` },
        { title: "Who needs this service?", content: "Any business selling goods online to Saudi customers, including local D2C brands, marketplace sellers (e.g., on Noon, Amazon.sa), and international brands with a KSA entity." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in KSA range from SAR 4,000 for smaller stores to SAR 15,000+ for larger brands with complex inventory and multi-channel sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible due to the mandatory and complex ZATCA e-invoicing (Fatoorah) system. Outsourcing to a firm with ZATCA-approved software is essential for legal operation." },
        { title: "Final Decision Summary", content: "To comply with Saudi Arabia's mandatory e-invoicing laws and manage VAT correctly, outsourcing accounting is not just a choice but a legal necessity for any e-commerce business." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "E-commerce & Retail Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia"
        },
        "description": `Outsourced E-commerce and Retail accounting in Saudi Arabia. We handle ZATCA e-invoicing, inventory (COGS), VAT compliance, and Mada/Tamara payment reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia E-commerce Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Saudi E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Saudi E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master ZATCA e-invoicing, VAT, and inventory with expert financial services for the Kingdom's online sellers and retail brands.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Saudi Arabia's e-commerce market is one of the fastest-growing and most dynamic in the Middle East, driven by a young, digitally-native population with high disposable income. However, tapping into this lucrative market requires navigating a uniquely strict and technologically advanced regulatory environment. The centerpiece of this is the Zakat, Tax and Customs Authority's (ZATCA) mandatory e-invoicing system (Fatoorah), which requires all B2C and B2B invoices to be generated in a specific format and reported to the authority. For e-commerce businesses with high transaction volumes, this, combined with VAT compliance and inventory management, makes specialized accounting an absolute necessity, not a choice. This guide outlines the essential accounting services that e-commerce and retail companies need to succeed in the Kingdom.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi e-commerce accounting services are built for businesses selling goods in the KSA market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>D2C Brands:</strong> Brands using platforms like Shopify or the local Salla and Zid, who must ensure their checkout process generates ZATCA-compliant e-invoices.</li>
                                <li><strong>Marketplace Sellers:</strong> Businesses selling on Noon, Amazon.sa, and other marketplaces, who need to reconcile payouts and manage VAT correctly.</li>
                                <li><strong>Omnichannel Retailers:</strong> Traditional retailers with physical stores who are expanding into e-commerce and need to integrate their online and offline financial systems.</li>
                                <li><strong>International Brands with a KSA Entity:</strong> Foreign companies that have established a Saudi LLC to sell directly to local consumers and must comply with all local tax and invoicing laws.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your very first sale in Saudi Arabia, specialized e-commerce accounting is a legal requirement. It becomes critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Make Your First Sale:</strong> You are legally required to issue a ZATCA-compliant tax invoice for every transaction. This cannot be a simple PDF; it must be in a specific XML format.</li>
                                <li><strong>You Cross the VAT Registration Threshold:</strong> Once your turnover exceeds SAR 375,000, you must register for VAT and begin filing quarterly returns.</li>
                                <li><strong>You Hold Inventory:</strong> Properly accounting for Cost of Goods Sold (COGS) is fundamental to understanding your true profit margin and is required for Zakat/Tax filing.</li>
                                <li><strong>You Use Local Payment Gateways:</strong> Reconciling payouts from Mada, Tamara, Tabby, and other local payment providers is a complex task essential for accurate financial reporting.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Outsourcing e-commerce accounting is a critical investment in legal compliance. Costs in KSA are based on transaction volume and the complexity of integrations.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> SAR 4,000 - SAR 8,000 per month. This covers ZATCA-compliant bookkeeping, VAT return filing, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> SAR 8,000 - SAR 18,000 per month. This typically includes management of more complex inventory and reconciliation across multiple platforms and payment gateways.</li>
                                <li><strong>Large-Scale Retailers:</strong> Custom pricing starting at SAR 18,000+, often involving direct ERP integration and fractional CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Saudi e-commerce landscape has severe compliance risks for businesses that are not prepared:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>E-invoicing (Fatoorah) Violations:</strong> This is the single biggest risk. Failure to issue a compliant e-invoice for every sale can lead to substantial and immediate penalties from ZATCA.</li>
                                <li><strong>VAT Non-Compliance:</strong> Failure to register for VAT when required, or filing incorrect returns, can lead to heavy fines and back-taxes.</li>
                                <li><strong>Inaccurate COGS and Inventory Accounting:</strong> Incorrectly valuing inventory leads to a flawed profit figure, which can result in overpaying Zakat/Tax and is a major red flag during an audit.</li>
                                <li><strong>Payment Gateway Reconciliation Errors:</strong> Failing to correctly reconcile payouts can mask high refund rates, hidden fees, or fraud, distorting your true financial performance.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>The ZATCA e-invoicing system is a complex, technical requirement that is impossible to manage with standard, off-the-shelf accounting software. It requires a specific, ZATCA-approved solution. Most general accountants lack the specific knowledge to handle this, along with the nuances of e-commerce inventory and payment reconciliation.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance partners provides a compliant-from-day-one solution. We use ZATCA-approved software to ensure every transaction is correctly invoiced and reported. Our team manages your VAT returns, reconciles your payment gateways, and tracks your inventory accurately. This ensures you are always compliant with the authorities, have a clear view of your product-level profitability, and can make data-driven decisions on pricing and marketing. For any business serious about selling online in Saudi Arabia, professional outsourcing is not a choice—it's a legal and operational necessity.
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
