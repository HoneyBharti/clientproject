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
export default function DubaiEcommerceIndustryPage() {
    const serviceName = "E-commerce & Trading";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Dubai e-commerce and trading involves managing inventory, accounting for customs duties and VAT on imports, handling multi-currency sales, and ensuring compliance with UAE Corporate Tax.` },
        { title: "Who needs this service?", content: "Any business selling goods online or trading internationally from a Dubai Free Zone or Mainland entity. This includes Amazon FBA sellers, DTC brands, and import/export businesses." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in Dubai range from AED 2,000 for smaller sellers to AED 8,000+ for larger businesses with complex logistics and international sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex VAT rules, customs duties, and inventory accounting. Outsourcing to a firm that understands e-commerce is essential for compliance and profitability." },
        { title: "Final Decision Summary", content: "To navigate the complexities of VAT, import duties, and inventory management in the UAE, outsourcing accounting is a critical investment for any serious e-commerce or trading business." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced E-commerce and Trading accounting and tax services in Dubai, UAE. We handle inventory, customs duties, VAT, multi-currency sales, and UAE Corporate Tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai E-commerce Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Dubai E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Dubai E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "8000",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master VAT, inventory, and customs with expert financial services for Dubai's online sellers and trading companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai has cemented its status as a premier global hub for e-commerce and international trade. Its strategic location, world-class logistics infrastructure, and business-friendly environment—particularly within its many free zones—make it an ideal base for businesses selling goods across the Middle East, Europe, and Asia. However, this opportunity comes with unique financial complexities. Success requires mastering inventory management, navigating UAE VAT and customs duties, and reconciling high-volume transactions from multiple currencies and payment gateways. Standard bookkeeping is insufficient for the demands of a modern trading or e-commerce business. Specialized accounting is the essential engine for profitability and compliance in this fast-paced sector. This guide outlines the critical accounting services that e-commerce and trading companies need to succeed in Dubai.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dubai e-commerce and trading accounting services are built for businesses that buy and sell goods:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> Brands using Shopify or other platforms to sell to customers in the UAE and internationally from a Dubai-based entity.</li>
                                <li><strong>Amazon FBA & Noon Sellers:</strong> Businesses leveraging regional marketplaces, requiring careful tracking of marketplace fees, inventory, and payouts.</li>
                                <li><strong>Import/Export Trading Companies:</strong> Businesses based in free zones like JAFZA or Dubai CommerCity that import goods, store them in the UAE, and re-export them to other markets.</li>
                                <li><strong>International Brands Using Dubai as a Hub:</strong> Foreign companies that have established a UAE free zone company to manage their regional distribution and logistics.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, accurate financial tracking is key. Specialized e-commerce accounting becomes non-negotiable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Import Goods into the UAE:</strong> This immediately triggers the need to manage customs declarations and account for import VAT, which can often be recovered.</li>
                                <li><strong>You Cross the VAT Registration Threshold:</strong> Once your taxable supplies in the UAE exceed AED 375,000 in a 12-month period, you must register for VAT and begin filing quarterly returns.</li>
                                <li><strong>You Hold Inventory:</strong> Properly accounting for the Cost of Goods Sold (COGS) is fundamental to understanding your true profit margin on each product sold.</li>
                                <li><strong>You Sell on Multiple Channels:</strong> Reconciling sales, fees, and payouts from your own website, Amazon, and other marketplaces becomes a complex task requiring specialized software and expertise.</li>
                                <li><strong>You Seek Financing:</strong> Banks and investors will require detailed financial statements, including an accurate inventory valuation and gross margin analysis, before providing capital.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>Outsourcing e-commerce accounting is a critical investment in compliance and profitability. Costs in Dubai are based on transaction volume and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> AED 2,000 - AED 4,500 per month. This covers bookkeeping, VAT return filing, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> AED 4,500 - AED 10,000 per month. This typically includes management of more complex inventory and reconciliation across multiple platforms.</li>
                                <li><strong>Large-Scale Traders:</strong> Custom pricing starting at AED 10,000+, often involving advanced inventory management systems and strategic advice on supply chain and customs.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The e-commerce and trading sector in Dubai has specific compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>VAT Non-Compliance:</strong> The biggest risk. Failure to register for VAT when required, or filing incorrect returns, can lead to substantial penalties from the FTA.</li>
                                <li><strong>Incorrect Customs Valuation:</strong> Improperly declaring the value of imported goods can lead to fines and delays at customs.</li>
                                <li><strong>Inaccurate COGS and Inventory Accounting:</strong> Incorrectly valuing inventory and calculating Cost of Goods Sold leads to a flawed profit figure, which can result in overpaying Corporate Tax.</li>
                                <li><strong>Corporate Tax for Mainland Sales:</strong> Free zone trading companies must be extremely careful. Selling goods to UAE Mainland customers can create 'non-qualifying income', making profits subject to the 9% Corporate Tax rate.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance is a niche specialization. Most general accountants lack the specific knowledge to handle multi-channel inventory, VAT on imported goods, and the complex fee structures of modern marketplaces. Hiring a full-time e-commerce finance expert is often too expensive for a growing business.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective, expert solution. We utilize specialized software to automate VAT tracking and reporting, integrate with your inventory systems (like A2X), and accurately reconcile your sales data. This ensures you are always compliant with the FTA, have a clear view of your product-level profitability, and can make data-driven decisions on pricing, marketing, and inventory management.
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

