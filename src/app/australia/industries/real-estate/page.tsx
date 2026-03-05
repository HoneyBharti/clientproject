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
export default function AustraliaRealEstateIndustryPage() {
    const serviceName = "Real Estate & Holding Companies";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `This involves managing rental income, tracking property expenses, navigating Capital Gains Tax (CGT) and negative gearing, and structuring investments in a tax-efficient company or trust structure.` },
        { title: "Who needs this service?", content: "Any individual or company that owns, develops, or manages investment properties in Australia, and international businesses using an Australian entity to hold assets." },
        { title: "What is the cost range?", content: "Costs can range from AUD $500/month for a small property portfolio to AUD $3,000+/month for larger portfolios or development projects requiring detailed project accounting." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex Australian tax laws around property, including CGT, depreciation, and land tax. Outsourcing to a specialist is crucial for compliance and tax efficiency." },
        { title: "Final Decision Summary", content: "To effectively manage property performance, maximize tax benefits like negative gearing, and ensure compliance, outsourcing real estate accounting is a necessary investment in Australia." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Real Estate Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting for Australian real estate and holding companies. We manage rental income, CGT, negative gearing, and tax-efficient structures.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Real Estate Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Australia Small Property Portfolio Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Australia Real Estate Development Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for Australian real estate investors and international holding structures.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's stable property market has long been a favored asset class for both domestic and international investors. Additionally, the country's robust legal system makes it a secure jurisdiction for establishing holding companies to manage regional or global assets. However, both activities are governed by a highly specific and complex set of tax laws. For real estate, this includes navigating Capital Gains Tax (CGT), negative gearing, and depreciation rules. For holding companies, it involves careful structuring to manage dividend flows and tax consolidation. Standard accounting services often lack the specialist knowledge required to navigate this landscape effectively. This guide covers the essential accounting services for both real estate investors and holding companies in Australia.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our services cater to two distinct but related groups:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Real Estate Investors:</strong> Individuals and companies holding residential or commercial properties in Australia for rental income ('negative gearing') or capital growth.</li>
                                <li><strong>Property Developers:</strong> Businesses undertaking construction projects who need to manage project costs, GST on development, and margin schemes.</li>
                                <li><strong>International Holding Companies:</strong> Businesses that use an Australian Pty. Ltd. company to hold shares in foreign subsidiaries (particularly in the APAC region).</li>
                                <li><strong>Foreign Investors in Australian Property:</strong> Non-residents who need guidance on Foreign Investment Review Board (FIRB) approval and specific tax rules for foreign owners.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment of acquisition or incorporation, specialized accounting is essential. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Acquiring Property or Assets:</strong> To advise on the optimal ownership structure—whether personal, company, or trust—to minimize tax and protect assets.</li>
                                <li><strong>During Property Ownership:</strong> To track all income and expenses, prepare quantity surveyor reports for depreciation schedules, and manage land tax obligations.</li>
                                <li><strong>For Holding Companies:</strong> To document inter-company loans and ensure compliance with transfer pricing rules and foreign income tax offsets.</li>
                                <li><strong>At Year-End:</strong> To prepare financial statements for the company and provide the necessary information for filing company and personal tax returns, ensuring all deductions are maximized.</li>
                                <li><strong>When Selling an Asset:</strong> To accurately calculate the Capital Gains Tax (CGT), apply any eligible discounts or exemptions, and manage GST implications.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>The cost of professional real estate accounting is an investment in compliance and maximizing your after-tax return.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Real Estate Portfolio (1-3 properties):</strong> AUD $500 - $1,200 per month for bookkeeping, reporting, and tax planning.</li>
                                <li><strong>Simple Holding Company:</strong> AUD $800 - $1,500 per month to manage compliance and basic reporting.</li>
                                <li><strong>Development Projects or Complex Portfolios:</strong> Custom pricing from AUD $3,000+, involving detailed project accounting and strategic tax advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Investing in Australian property or using a holding company without expert financial management carries significant risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect CGT Calculation:</strong> This is a major ATO audit trigger. Failing to correctly calculate the cost base of a property or applying the wrong CGT discount can lead to substantial tax adjustments and penalties.</li>
                                <li>**Improperly Claimed Deductions:** Incorrectly claiming capital works vs. standard repairs, or miscalculating negative gearing benefits, can result in significant tax liabilities.</li>
                                <li><strong>Land Tax Non-Compliance:</strong> Each state has its own land tax regime. Failing to register and pay on time leads to penalties.</li>
                                <li><strong>FIRB Approval Failure:</strong> Foreign investors who purchase property without the required Foreign Investment Review Board (FIRB) approval can face severe penalties, including forced divestment of the property.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Australian property tax law is a minefield of complex legislation that is constantly changing. Outsourcing your accounting to YourLegal's property specialists ensures you are always compliant and maximizing your tax efficiency. We help you from the very beginning, advising on the right ownership structure for your goals.</p>
                            <p className="mt-4">
                                For holding companies, we provide the critical expertise to structure your entity to manage dividend flows efficiently and comply with Australia's international tax rules. By handling the complex financial administration, we empower you to focus on what you do best: finding and managing valuable assets.
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
