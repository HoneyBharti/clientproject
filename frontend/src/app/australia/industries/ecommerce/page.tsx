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
export default function AustraliaEcommerceIndustryPage() {
    const serviceName = "E-commerce & Trading";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian e-commerce involves managing inventory and Cost of Goods Sold (COGS), handling GST on domestic sales and imported goods, and reconciling high-volume transactions from platforms like Shopify and Amazon.` },
        { title: "Who needs this service?", content: "Any business selling goods online to Australian customers, including local DTC brands, Amazon FBA sellers, and international companies importing goods into Australia." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in Australia range from AUD $800 for smaller stores to AUD $4,000+ for larger brands with complex inventory and multi-channel sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex GST rules on imported goods and inventory accounting. Outsourcing to a firm that understands e-commerce is essential for compliance and profitability." },
        { title: "Final Decision Summary", content: "To navigate the complexities of GST, import duties, and inventory management in Australia, outsourcing accounting is a critical investment for any serious e-commerce or trading business." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "E-commerce & Trading Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced E-commerce and Trading accounting and tax services in Australia. We handle inventory, COGS, GST on imports, and Shopify/Amazon reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia E-commerce Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Australia E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Australia E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master GST, inventory, and customs with expert financial services for Australia's online sellers and trading companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Australia's thriving e-commerce market offers a significant opportunity for online sellers, but it comes with a unique set of financial and regulatory challenges. Success in this sector requires more than just a great product; it demands a mastery of inventory management, careful navigation of the Goods and Services Tax (GST) system—especially for imported goods—and the ability to reconcile high-volume transactions from platforms like Shopify and Amazon. Standard accounting practices are often insufficient for the dynamic nature of e-commerce, where understanding per-product profitability and managing cash flow tied up in stock is paramount. This guide outlines the essential accounting services that Australian e-commerce and trading companies need to ensure compliance and achieve sustainable growth.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian e-commerce accounting services are designed for businesses that buy and sell goods in the local market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> Australian brands using platforms like Shopify or WooCommerce to sell directly to a national customer base.</li>
                                <li><strong>Amazon FBA Sellers:</strong> Businesses leveraging Amazon Australia's fulfillment network, who need to accurately track FBA fees, inventory levels, and reconcile payouts.</li>
                                <li><strong>Importers and Wholesalers:</strong> Companies importing goods into Australia for resale, requiring expert management of customs duties and GST on taxable importations.</li>
                                <li><strong>International Brands Entering Australia:</strong> Foreign companies that have established an Australian Pty Ltd company to sell to local consumers and need guidance on local tax and compliance.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first product order, accurate financial tracking is key. Specialized e-commerce accounting becomes non-negotiable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Cross the GST Registration Threshold:</strong> Once your turnover exceeds AUD $75,000 in a 12-month period, you must register for GST and start filing Business Activity Statements (BAS).</li>
                                <li><strong>You Begin Importing Goods:</strong> This triggers the need to manage customs declarations and account for GST on imports, which can often be claimed back on your BAS.</li>
                                <li><strong>You Hold Significant Inventory:</strong> Properly accounting for the Cost of Goods Sold (COGS) is fundamental to understanding your true profit margin and is a requirement for accurate tax reporting.</li>
                                <li><strong>You Sell on Multiple Channels:</strong> Reconciling sales, fees, and payouts from your own website, Amazon.com.au, and other marketplaces becomes a complex task requiring specialized software and expertise.</li>
                                <li><strong>You Seek Financing for Stock:</strong> Lenders and investors will require detailed financial statements, including an accurate inventory valuation and gross margin analysis, before providing capital.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Outsourcing e-commerce accounting is a critical investment in compliance and profitability. Costs in Australia are based on transaction volume and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> AUD $800 - $1,800 per month. This covers bookkeeping, BAS preparation, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> AUD $1,800 - $4,500 per month. This typically includes management of more complex inventory systems and reconciliation across multiple platforms.</li>
                                <li><strong>Large-Scale Traders:</strong> Custom pricing starting at AUD $4,500+, often involving integration with advanced inventory management systems and strategic advice on supply chain financing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Australian e-commerce environment has specific compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Non-Compliance:</strong> This is the biggest risk. Failure to register for GST when required, or filing incorrect BAS, can lead to substantial penalties and back-taxes from the Australian Taxation Office (ATO).</li>
                                <li><strong>Incorrect Customs Valuation:</strong> Improperly declaring the value of imported goods can lead to fines and delays at the border.</li>
                                <li>**Inaccurate COGS and Inventory Accounting:** Incorrectly valuing inventory leads to a flawed profit figure, which can result in overpaying company tax and is a major red flag during an ATO audit.</li>
                                <li><strong>Marketplace Reconciliation Errors:</strong> Failing to correctly reconcile payouts from platforms like Amazon can mask hidden costs, high refund rates, or even fraud.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance is a specialized field. Most general accountants lack the specific knowledge to handle GST on imports, multi-channel inventory systems (like Cin7 or DEAR), and the complex fee structures of modern marketplaces. Hiring a full-time e-commerce finance expert is often too expensive for a growing brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective, expert solution. We utilize specialized software to automate GST tracking and BAS preparation, integrate with your inventory systems, and accurately reconcile all your sales data. This ensures you are always compliant with the ATO, have a clear view of your per-product profitability, and can make data-driven decisions on pricing, marketing, and inventory management.
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

