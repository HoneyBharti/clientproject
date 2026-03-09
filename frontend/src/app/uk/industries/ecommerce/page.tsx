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
export default function UKEcommerceIndustryPage() {
    const serviceName = "E-commerce";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK e-commerce businesses involves managing VAT compliance (including Making Tax Digital), accounting for inventory and Cost of Goods Sold (COGS), and reconciling high-volume transactions from platforms like Shopify and Amazon.` },
        { title: "Who needs this service?", content: "Any business selling goods online to UK customers, including direct-to-consumer (DTC) brands, Amazon FBA sellers, and international companies storing inventory in the UK." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in the UK range from £400 for small stores to £2,500+ for larger brands with complex inventory and international sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is highly risky due to complex UK VAT rules and inventory accounting requirements. Outsourcing to a firm that understands e-commerce is essential for compliance and accurate financial reporting." },
        { title: "Final Decision Summary", content: "To navigate the complexities of UK VAT, inventory management, and high-volume reconciliation, outsourcing accounting is a critical investment for any serious UK e-commerce business." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "E-commerce Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "description": `Outsourced E-commerce accounting and tax services in the UK. We handle UK VAT, Making Tax Digital (MTD), inventory management (COGS), and Shopify/Amazon reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK E-commerce Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small UK E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "400",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth UK E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2500",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master UK VAT, inventory accounting, and marketplace reconciliation with our expert financial services for UK online sellers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The UK e-commerce market is one of the most mature and lucrative in the world, but its sophistication brings significant financial complexity for online sellers. Success requires mastering three key areas: managing the cost of physical inventory, navigating the UK's strict Value Added Tax (VAT) system and its Making Tax Digital (MTD) mandate, and reconciling high-volume transaction data from multiple platforms like Shopify, Amazon, and Stripe. Standard bookkeeping is simply not equipped to handle the unique challenges of e-commerce finance. Specialized accounting is the essential backbone for a profitable and compliant online store, allowing you to understand your true profit margins and stay on the right side of HMRC. This guide covers the essential accounting services that e-commerce businesses need to succeed in the UK.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK e-commerce accounting services are built for online sellers navigating the British market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> UK-based brands selling via Shopify, BigCommerce, or WooCommerce who need to manage inventory, process returns, and comply with UK VAT laws.</li>
                                <li><strong>Amazon FBA Sellers:</strong> Businesses using Amazon's UK fulfillment network, requiring careful tracking of FBA fees, inventory stored in the UK, and VAT on sales.</li>
                                <li><strong>Subscription Box Businesses:</strong> Companies with a recurring revenue model needing specialized accounting for deferred revenue and analysis of customer lifetime value (LTV).</li>
                                <li><strong>International Brands Entering the UK:</strong> Foreign companies that have formed a UK Limited Company to sell to British customers and need expert guidance on import VAT, customs duties, and UK tax compliance.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first sale, accurate bookkeeping is essential. However, specialized e-commerce accounting becomes critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Approach the VAT Threshold:</strong> Once your UK sales exceed £90,000 in a rolling 12-month period, you must register for VAT. This is a non-negotiable legal requirement that brings with it quarterly MTD filing obligations.</li>
                                <li><strong>When You Hold Inventory:</strong> Properly accounting for Cost of Goods Sold (COGS) is fundamental to understanding your gross profit. This is not optional; it's a core part of business accounting.</li>
                                <li><strong>When You Sell on Multiple Channels:</strong> Selling on your own site and Amazon UK creates complex reconciliation challenges, as each platform has different fee structures and payout schedules.</li>
                                <li><strong>When You Import Goods:</strong> Importing products into the UK requires managing import VAT and customs duties, which must be correctly accounted for to be reclaimed or expensed.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>Outsourcing your e-commerce accounting is a direct investment in your compliance and profitability. Costs in the UK vary based on transaction volume and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> £400 - £900 per month. This covers MTD-compliant bookkeeping, VAT return filing, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> £900 - £2,500 per month. This typically includes management of more complex inventory and reconciliation across multiple platforms (e.g., Shopify + Amazon).</li>
                                <li><strong>Large-Scale Sellers:</strong> Custom pricing starting at £2,500+, often involving integration with advanced inventory management systems and fractional CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The UK e-commerce environment has several compliance pitfalls that can lead to significant penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>VAT Non-Compliance:</strong> This is the single biggest risk. Failing to register for VAT when required, or filing incorrect or late MTD returns, leads to automatic and escalating penalties from HMRC.</li>
                                <li><strong>Incorrect COGS Calculation:</strong> Improperly valuing your inventory or miscalculating Cost of Goods Sold leads to an inaccurate profit figure and can result in overpaying Corporation Tax.</li>
                                <li><strong>Marketplace Reconciliation Errors:</strong> Failing to correctly reconcile payouts from platforms like Amazon can mask hidden costs, high refund rates, or even fraud.</li>
                                <li><strong>Post-Brexit Trade Complexities:</strong> Since Brexit, new rules apply to selling goods between the UK and the EU, adding another layer of VAT and customs complexity that must be managed.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance, particularly in the UK, is a niche specialism. Most general accountants lack the specific knowledge required to handle MTD for VAT, multi-channel inventory systems, and the fee structures of platforms like Shopify and Amazon. Hiring a full-time e-commerce specialist is often too costly for a growing brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective solution. We leverage specialized software to automate VAT tracking and MTD filings, integrate with your inventory systems, and accurately reconcile all your sales data. This ensures you are always compliant with HMRC, have a crystal-clear view of your product-profitability, and can make data-driven decisions about pricing, advertising, and expansion. Our services integrate seamlessly with our core <Link href="/uk/tax-compliance" className="text-blue-600 hover:underline">UK tax compliance</Link> solutions, providing a complete financial back-office for your online store.
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

