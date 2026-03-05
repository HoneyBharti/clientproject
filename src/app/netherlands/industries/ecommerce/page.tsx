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
export default function NetherlandsEcommerceIndustryPage() {
    const serviceName = "E-commerce & Trading";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for Dutch e-commerce involves managing inventory, handling BTW (VAT) on sales within the EU (including OSS returns), leveraging import VAT deferment schemes, and reconciling payments from gateways like iDEAL and Klarna.` },
        { title: "Who needs this service?", content: "Any business using a Dutch B.V. to sell goods online to customers in the Netherlands and across the European Union, including DTC brands and marketplace sellers." },
        { title: "What is the cost range?", content: "Monthly costs for e-commerce accounting in the Netherlands range from €500 for smaller stores to €3,000+ for larger businesses with complex EU-wide sales and logistics." },
        { title: "DIY vs. Outsourcing?", content: "DIY is highly risky due to complex EU VAT rules (OSS, IOSS) and inventory accounting. Outsourcing to a firm that understands e-commerce is essential for compliance and profitability." },
        { title: "Final Decision Summary", content: "To navigate the complexities of EU VAT, customs, and inventory management from a Dutch hub, outsourcing accounting is a critical investment for any serious e-commerce or trading business." }
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
            "name": "Netherlands"
        },
        "description": `Outsourced E-commerce and Trading accounting in the Netherlands. We handle inventory, BTW (VAT) on EU sales (OSS), import VAT deferment, and iDEAL/Klarna reconciliation.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands E-commerce Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Netherlands E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Netherlands E-commerce Store Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
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
                <section className="bg-gradient-to-r from-green-50 to-teal-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master EU VAT, inventory, and customs with expert financial services for online sellers and trading companies using a Dutch hub.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The Netherlands is a premier gateway to the European Union's vast consumer market. Its world-class logistics infrastructure, including the Port of Rotterdam, and favorable tax schemes make it an ideal hub for e-commerce and trading companies. However, selling goods within the EU single market requires navigating a complex and harmonized BTW (VAT) system. Success depends on mastering inventory management, understanding the rules for cross-border B2C sales (including the One-Stop-Shop system), and efficiently managing import VAT. Standard bookkeeping is insufficient for these demands. Specialized e-commerce accounting is the essential engine for profitability and compliance in this fast-paced sector. This guide outlines the critical accounting services that e-commerce and trading companies need to succeed from their Dutch base.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dutch e-commerce and trading accounting services are built for businesses that buy and sell goods across Europe:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Direct-to-Consumer (DTC) Brands:</strong> Brands using Shopify or other platforms to sell to customers across multiple EU countries from a central Dutch warehouse.</li>
                                <li><strong>Marketplace Sellers:</strong> Businesses leveraging platforms like Amazon.nl, Bol.com, or Zalando, who need to reconcile marketplace payouts and manage multi-country inventory.</li>
                                <li><strong>Import/Export Trading Companies:</strong> Businesses that import goods into the EU via the Netherlands and distribute them to other member states.</li>
                                <li><strong>International Brands Using a Dutch Hub:</strong> Non-EU companies that have established a Dutch B.V. to act as their European headquarters for sales and distribution.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first shipment, accurate financial tracking is key. Specialized e-commerce accounting becomes non-negotiable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Import Goods into the EU:</strong> You need an "Article 23" license to defer import BTW, a critical cash flow advantage that requires compliant accounting.</li>
                                <li><strong>You Start Selling to Consumers in Other EU Countries:</strong> Once your total cross-border B2C sales within the EU exceed €10,000, you must register for the VAT One-Stop-Shop (OSS) system to declare and pay VAT in your customers' home countries.</li>
                                <li><strong>You Hold Inventory in the Netherlands:</strong> Properly accounting for the Cost of Goods Sold (COGS) is fundamental to understanding your true profit margin and is required for tax reporting.</li>
                                <li><strong>You Use Local Payment Gateways:</strong> Reconciling payouts from iDEAL, Klarna, and other European payment providers is a complex task essential for accurate financial reporting.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>Outsourcing e-commerce accounting is a critical investment in EU compliance and profitability. Costs are based on transaction volume and the complexity of your sales channels.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Stores / Single Market:</strong> €500 - €1,200 per month. This covers bookkeeping, Dutch BTW returns, and reconciliation for one sales channel.</li>
                                <li><strong>Growing Brands / Multi-Country EU Sales:</strong> €1,200 - €3,000 per month. This typically includes management of OSS returns and more complex inventory accounting.</li>
                                <li><strong>Large-Scale Traders:</strong> Custom pricing starting at €3,000+, often involving integration with advanced inventory management systems and strategic advice on EU supply chain.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The EU e-commerce environment has specific compliance risks that can lead to significant penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>OSS & IOSS Non-Compliance:</strong> Failure to correctly use the One-Stop-Shop systems for reporting cross-border VAT can lead to audits and penalties from multiple EU tax authorities.</li>
                                <li><strong>Incorrect Customs Valuation:</strong> Improperly declaring the value of goods imported into the EU can lead to fines and delays at customs.</li>
                                <li><strong>Inaccurate COGS and Inventory Accounting:</strong> Incorrectly valuing inventory leads to a flawed profit figure, which can result in overpaying corporate tax and is a major red flag for auditors.</li>
                                <li><strong>Loss of Article 23 License:</strong> Non-compliant bookkeeping can lead to the revocation of your import VAT deferment license, creating a major cash flow problem.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>European e-commerce finance is a highly specialized field. Most general accountants lack the specific knowledge to handle multi-country VAT reporting through OSS, import VAT deferment schemes, and the fee structures of European marketplaces. Hiring a full-time expert is often too expensive for a growing brand.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's e-commerce finance team provides a cost-effective, expert solution. We utilize specialized software to automate BTW and OSS reporting, integrate with your inventory systems, and accurately reconcile all your sales data. This ensures you are always compliant with the Belastingdienst and other EU tax authorities, have a clear view of your product-level profitability, and can make data-driven decisions on pricing and market expansion.
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
