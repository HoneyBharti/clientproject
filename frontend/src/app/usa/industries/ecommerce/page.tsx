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
export default function EcommerceIndustryPage() {
    const serviceName = "E-commerce";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Specialized accounting for US e-commerce businesses involves managing multi-state sales tax nexus, complex inventory valuation (COGS), and reconciling high-volume transactions from platforms like Shopify and Amazon.` },
        { title: "Who needs this service?", content: "Any business selling physical or digital goods online to US customers, including direct-to-consumer (DTC) brands, Amazon FBA sellers, and international companies entering the US market." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in the US range from $500 for small stores to $3,000+ for larger brands with multi-state tax obligations and complex inventory." },
        { title: "DIY vs. Outsourcing?", content: "DIY is extremely risky due to complex sales tax laws that vary by state. Outsourcing to a firm that understands e-commerce is essential for compliance and accurate financial reporting." },
        { title: "Final Decision Summary", content: "To navigate the complexities of sales tax nexus, inventory management, and high-volume reconciliation, outsourcing accounting is a crucial investment for any serious US e-commerce business." }
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
            "name": "USA"
        },
        "description": `Outsourced E-commerce accounting and tax services in the USA. We handle multi-state sales tax nexus, inventory management (COGS), and Shopify/Amazon reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "E-commerce Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
                        "priceCurrency": "USD",
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
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master multi-state sales tax, inventory accounting, and marketplace reconciliation with our expert financial services for US online sellers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The US e-commerce market offers immense opportunity, but it comes with a level of financial complexity that can quickly overwhelm unprepared businesses. Unlike other industries, e-commerce companies face a triple threat: managing the cost of physical goods (inventory), navigating a labyrinth of state-specific sales tax laws, and reconciling high-volume transaction data from multiple payment gateways and platforms. Accurate e-commerce accounting is the backbone of a profitable online store, enabling you to understand your true margins, manage cash flow effectively, and stay compliant in a rapidly evolving regulatory landscape. This guide outlines the essential accounting and tax services for e-commerce businesses operating in the USA.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our e-commerce accounting services are tailored for online sellers at every stage of their journey in the US market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> Businesses running on platforms like Shopify, BigCommerce, or WooCommerce that need to manage their own sales tax collection and inventory accounting.</li>
                                <li><strong>Amazon FBA & Marketplace Sellers:</strong> Entrepreneurs leveraging platforms like Amazon, Walmart, or Etsy, who face the complexities of marketplace facilitator laws and multi-state inventory tracking.</li>
                                <li><strong>Subscription Box Companies:</strong> Businesses with recurring revenue models that require specialized accounting for deferred revenue and customer lifetime value (LTV) analysis.</li>
                                <li><strong>International Sellers Entering the US:</strong> Foreign businesses using a US LLC or C-Corp to tap into the American market, who need expert guidance on nexus, import duties, and US tax compliance.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your very first sale, accurate bookkeeping is essential. However, specialized e-commerce accounting becomes critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Approach Sales Tax Nexus:</strong> Once your sales in a particular state exceed its economic threshold (e.g., $100,000 in sales or 200 transactions), you must register to collect and remit sales tax there. This requires immediate professional oversight.</li>
                                <li><strong>You Start Holding Inventory:</strong> Properly accounting for Cost of Goods Sold (COGS) is fundamental to understanding your profitability. This is not optional.</li>
                                <li><strong>You Use Multiple Sales Channels:</strong> Selling on your website, Amazon, and social media simultaneously creates complex reconciliation challenges that demand a robust accounting system.</li>
                                <li><strong>You Seek Financing or Acquisition:</strong> Lenders and potential buyers will scrutinize your inventory valuation, sales tax compliance, and profit margins. Clean books are a prerequisite for any deal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Outsourcing e-commerce accounting is an investment in compliance and profitability. Costs vary based on transaction volume, number of sales channels, and sales tax complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> $500 - $1,200 per month. This covers core bookkeeping, reconciliation, and basic financial reporting.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> $1,200 - $3,500 per month. This typically includes management of multi-state sales tax filings and more complex inventory accounting.</li>
                                <li><strong>Large-Scale Sellers:</strong> Custom pricing starting at $3,500+ per month, often incorporating advanced inventory management systems and fractional CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The e-commerce landscape is riddled with compliance traps that can cripple a growing business:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Sales Tax Non-Compliance:</strong> This is the biggest risk. Failing to register, collect, and remit sales tax in states where you have nexus can lead to audits and crippling bills for back taxes, penalties, and interest.</li>
                                <li><strong>Incorrect COGS Calculation:</strong> Improperly accounting for inventory and cost of goods sold leads to an inaccurate picture of your gross profit and can result in overpaying income tax.</li>
                                <li><strong>Platform Reconciliation Errors:</strong> Failing to correctly reconcile payouts from platforms like Shopify Payments or Amazon can mask issues like high refund rates or missing funds.</li>
                                <li><strong>Mismanagement of Cash Flow:</strong> Without a clear understanding of your inventory holding costs, shipping expenses, and marketing ROI, it's easy to run out of cash even when sales are growing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance is a specialized field. Most general bookkeepers lack the expertise to handle multi-state sales tax, inventory valuation across different channels, and the nuances of various e-commerce platforms. Hiring a full-time e-commerce accountant is often too expensive for a growing brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective solution. We leverage specialized software to automate sales tax tracking and filings, integrate with your inventory management systems, and reconcile your sales data accurately. This ensures you are always compliant, have a clear view of your profitability on a per-product basis, and can make data-driven decisions about pricing, marketing, and growth. Our services work hand-in-hand with our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">US tax compliance</Link> solutions to provide a complete financial picture for your online business.
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

