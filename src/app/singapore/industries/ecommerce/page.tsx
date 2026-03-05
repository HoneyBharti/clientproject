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
export default function SingaporeEcommerceIndustryPage() {
    const serviceName = "E-commerce & Trading";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Singapore e-commerce and trading involves managing inventory, accounting for GST on local sales and imports, handling multi-currency transactions, and reconciling high-volume sales from platforms like Shopify and Lazada.` },
        { title: "Who needs this service?", content: "Any business selling goods online to Singaporean customers or using Singapore as a logistics hub for the APAC region, including DTC brands and marketplace sellers." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in Singapore range from S$500 for smaller sellers to S$3,000+ for larger businesses with complex logistics and international sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex GST rules on imports and low-value goods, as well as inventory accounting. Outsourcing to a firm that understands e-commerce is essential for compliance and profitability." },
        { title: "Final Decision Summary", content: "To navigate the complexities of GST, import duties, and inventory management in Singapore, outsourcing accounting is a critical investment for any serious e-commerce or trading business." }
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
            "name": "Singapore"
        },
        "description": `Outsourced E-commerce and Trading accounting and tax services in Singapore. We handle inventory, GST on imports, multi-currency sales, and Shopify/Lazada reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore E-commerce Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Singapore E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Singapore E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
                        "priceCurrency": "SGD",
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
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master GST, inventory, and customs with expert financial services for Singapore's online sellers and trading companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Singapore stands as a world-class hub for e-commerce and regional trade, thanks to its strategic location, efficient port, and pro-business environment. For online sellers and trading companies, a Singaporean entity provides a credible and stable base to serve the booming Southeast Asian market. However, this opportunity comes with specific financial complexities. Success requires mastering inventory management, navigating the Goods and Services Tax (GST) on both local sales and imported goods, and reconciling high-volume transactions from multiple currencies and payment gateways. Standard bookkeeping is insufficient for the demands of a modern trading or e-commerce business. Specialized accounting is the essential engine for profitability and compliance in this fast-paced sector. This guide outlines the critical accounting services that e-commerce and trading companies need to succeed in Singapore.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Singapore e-commerce and trading accounting services are built for businesses that buy and sell goods:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> Brands using Shopify or other platforms to sell to customers in Singapore and across the APAC region.</li>
                                <li><strong>Marketplace Sellers:</strong> Businesses leveraging regional marketplaces like Lazada, Shopee, and Amazon.sg, requiring careful tracking of marketplace fees and payouts.</li>
                                <li><strong>Import/Export Trading Companies:</strong> Businesses using Singapore as a base to import goods and re-export them to neighboring countries like Malaysia, Indonesia, and Australia.</li>
                                <li><strong>International Brands Using Singapore as an APAC Hub:</strong> Foreign companies that have established a Singaporean entity to manage their regional warehousing, logistics, and distribution.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, accurate financial tracking is key. Specialized e-commerce accounting becomes non-negotiable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Import Goods into Singapore:</strong> This immediately triggers the need to manage customs declarations and account for import GST, which can often be claimed back if you are GST-registered.</li>
                                <li><strong>You Cross the GST Registration Threshold:</strong> Once your taxable turnover exceeds S$1 million in a 12-month period, you must register for GST and begin filing quarterly returns with IRAS.</li>
                                <li><strong>You Hold Inventory:</strong> Properly accounting for the Cost of Goods Sold (COGS) is fundamental to understanding your true profit margin on each product sold, a requirement under Singapore Financial Reporting Standards (SFRS).</li>
                                <li><strong>You Sell on Multiple Channels:</strong> Reconciling sales, fees, and payouts from your own website, Lazada, and Shopee becomes a complex task requiring specialized software and expertise.</li>
                                <li><strong>You Seek Financing:</strong> Banks and investors will require detailed financial statements, including an accurate inventory valuation and gross margin analysis, before providing capital.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>Outsourcing e-commerce accounting is a critical investment in compliance and profitability. Costs in Singapore are based on transaction volume and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> S$500 - S$1,200 per month. This covers bookkeeping, GST return filing, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> S$1,200 - S$3,500 per month. This typically includes management of more complex inventory and reconciliation across multiple platforms.</li>
                                <li><strong>Large-Scale Traders:</strong> Custom pricing starting at S$3,500+, often involving integration with advanced inventory management systems and strategic advice on supply chain financing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The e-commerce and trading sector in Singapore has specific compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Non-Compliance:</strong> The biggest risk. Failure to register for GST when required, or filing incorrect returns, can lead to substantial penalties from IRAS. The rules for imported goods and sales to overseas customers are particularly complex.</li>
                                <li><strong>Incorrect Customs Valuation:</strong> Improperly declaring the value of imported goods can lead to fines and delays at Singapore Customs.</li>
                                <li><strong>Inaccurate COGS and Inventory Accounting:</strong> Incorrectly valuing inventory and calculating Cost of Goods Sold leads to a flawed profit figure, which can result in overpaying corporate tax and is a major red flag during an audit.</li>
                                <li><strong>Poor Cash Flow Management:</strong> The capital-intensive nature of holding inventory means that poor management of stock levels and supplier payments can quickly lead to a cash crunch.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance is a niche specialization. Most general accountants lack the specific knowledge to handle GST on imported goods, multi-channel inventory, and the complex fee structures of modern marketplaces. Hiring a full-time e-commerce finance expert is often too expensive for a growing brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective, expert solution. We utilize specialized software (like A2X) to automate GST tracking and reporting, integrate with your inventory systems, and accurately reconcile all your sales data. This ensures you are always compliant with IRAS, have a clear view of your product-level profitability, and can make data-driven decisions on pricing, marketing, and inventory management.
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
