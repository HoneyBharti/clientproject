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
export default function IndiaEcommerceIndustryPage() {
    const serviceName = "E-commerce & D2C Brands";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian e-commerce businesses involves managing inventory and Cost of Goods Sold (COGS), complex GST compliance (including TCS), and reconciling high-volume transactions from platforms like Shopify, Amazon, and Flipkart.` },
        { title: "Who needs this service?", content: "Any business selling goods online in India, including direct-to-consumer (DTC) brands, marketplace sellers, and international brands with an Indian entity." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in India range from ₹15,000 for smaller stores to ₹75,000+ for larger brands with complex inventory and multi-channel sales." },
        { title: "DIY vs. Outsourcing?", content: "DIY is highly risky due to complex GST laws (TCS, inter-state supply) and inventory accounting. Outsourcing to a firm that understands e-commerce is essential for compliance and profitability." },
        { title: "Final Decision Summary", content: "To navigate the complexities of GST, marketplace reconciliation, and inventory management in India, outsourcing accounting is a critical investment for any serious e-commerce business." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "E-commerce & D2C Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "description": `Outsourced E-commerce and D2C accounting and tax services in India. We handle inventory, COGS, GST/TCS compliance, and Shopify/Amazon/Flipkart reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India E-commerce Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small India E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth India E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "75000",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master GST, TCS, and inventory with expert financial services for India's online sellers and D2C brands.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's e-commerce market is one of the fastest-growing in the world, presenting a massive opportunity for online sellers and Direct-to-Consumer (D2C) brands. However, success in this vibrant market requires navigating a highly complex financial and regulatory landscape. E-commerce businesses in India face unique challenges, including mandatory GST registration from day one, complex rules for inter-state sales, and the requirement for marketplaces to collect Tax Collected at Source (TCS). Furthermore, managing inventory and reconciling high-volume transactions from multiple payment gateways and platforms like Shopify, Amazon, and Flipkart demands specialized expertise. Standard bookkeeping is ill-equipped to handle these demands. This guide details the essential accounting services that e-commerce businesses need to thrive in India.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India e-commerce accounting services are built for online sellers navigating the Indian market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>D2C Brands:</strong> Indian brands using platforms like Shopify or WooCommerce to sell directly to consumers across the country.</li>
                                <li><strong>Marketplace Sellers:</strong> Businesses selling on Amazon.in, Flipkart, Myntra, and other major platforms, who need to reconcile marketplace payments and manage TCS compliance.</li>
                                <li><strong>Subscription Box Businesses:</strong> Companies with recurring revenue models that require specific accounting for deferred revenue and customer lifetime value (LTV) analysis.</li>
                                <li><strong>International Brands with an Indian Entity:</strong> Foreign companies that have established an Indian Private Limited company to sell to the vast Indian consumer base.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your very first sale, specialized e-commerce accounting is a necessity. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Selling Online:</strong> Unlike other businesses, e-commerce operators making inter-state sales are required to register for GST from day one, regardless of turnover.</li>
                                <li><strong>You List on a Marketplace:</strong> Selling on platforms like Amazon or Flipkart immediately subjects you to Tax Collected at Source (TCS) rules, which must be correctly accounted for.</li>
                                <li><strong>You Hold Inventory:</strong> Properly accounting for Cost of Goods Sold (COGS) and inventory valuation is fundamental to understanding your true profit margins and is required for tax purposes.</li>
                                <li><strong>You Use Multiple Payment Gateways:</strong> Reconciling payouts from Razorpay, PayU, and Cash on Delivery (COD) partners is a complex task essential for accurate financial reporting.</li>
                                <li><strong>You Seek Funding:</strong> Investors will scrutinize your unit economics, COGS, and customer acquisition costs. Clean, accurate financials are a prerequisite for any funding discussion.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Outsourcing e-commerce accounting is a strategic investment in compliance and profitability. Costs in India are based on order volume and the number of sales channels.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Channel:</strong> ₹15,000 - ₹35,000 per month. This covers bookkeeping, reconciliation of one sales channel, and monthly GST/TCS compliance.</li>
                                <li><strong>Growing Brands / Multi-Channel:</strong> ₹35,000 - ₹80,000 per month. This typically includes management of more complex inventory systems and reconciliation across multiple platforms.</li>
                                <li><strong>Large-Scale Sellers:</strong> Custom pricing starting at ₹80,000+, often involving integration with advanced inventory management systems and fractional CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Indian e-commerce landscape is laden with compliance traps that can severely impact a growing business:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Non-Compliance:</strong> The biggest risk. Failure to register for GST, file monthly returns (GSTR-1, GSTR-3B) correctly, or mismatches in input tax credit can lead to heavy penalties and legal action.</li>
                                <li><strong>TCS Mismatches:</strong> Failure to correctly reconcile the TCS collected by marketplaces with your GST liability can result in lost tax credits and notices from the tax department.</li>
                                <li><strong>Incorrect COGS & Inventory Accounting:</strong> Improperly valuing inventory leads to an inaccurate profit figure, which can result in overpaying income tax and is a major red flag during an audit.</li>
                                <li><strong>Inter-State Supply Errors:</strong> Incorrectly applying IGST, CGST, and SGST for sales across different states is a common error that leads to significant compliance issues.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>E-commerce finance in India is a niche specialization. Most general accountants lack the specific knowledge to handle GST for online sellers, TCS reconciliation, and the fee structures of various marketplaces and payment gateways. Hiring a full-time e-commerce finance expert is often too expensive for a D2C brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective, expert solution. We utilize specialized software to automate GST and TCS reporting, integrate with your inventory systems (like Unicommerce or Browntape), and accurately reconcile all your sales data. This ensures you are always compliant with the tax authorities, have a clear view of your product-level profitability, and can make data-driven decisions about pricing and marketing. By handling the financial complexity, we free you to focus on building your brand and scaling your sales.
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

