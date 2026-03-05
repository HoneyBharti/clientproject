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
export default function RealEstateIndustryPage() {
    const serviceName = "Real Estate";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for US real estate investors involves property-level bookkeeping, managing depreciation schedules, tracking capital expenditures vs. repairs, and structuring entities (like LLCs) for liability protection and tax efficiency.` },
        { title: "Who needs this service?", content: "Any individual or company that owns, develops, or manages investment properties in the US, including rental property owners, house flippers, real estate developers, and foreign investors." },
        { title: "What is the cost range?", content: "Costs typically range from $400/month for a few properties to $2,000+/month for larger portfolios or development projects, reflecting the complexity of property-level accounting." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex tax rules around depreciation, capital gains, and 1031 exchanges. Outsourcing to a real estate accounting specialist is crucial for maximizing returns and compliance." },
        { title: "Final Decision Summary", content: "To effectively manage property performance, maximize tax deductions like depreciation, and ensure legal compliance, outsourcing real estate accounting is a necessary investment." }
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
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for US real estate investors. We manage property-level bookkeeping, depreciation, 1031 exchanges, and LLC structuring.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Rental Property Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "400",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Real Estate Development Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for US real estate investors. We handle depreciation, 1031 exchanges, and LLC structuring.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Real estate investment in the United States offers powerful wealth-building opportunities, but it is governed by a highly specialized and complex set of tax laws. Unlike other businesses, real estate accounting revolves around the asset itself—the property. Success depends on much more than just collecting rent; it requires meticulous tracking of income and expenses on a per-property basis, correctly distinguishing between deductible repairs and capital improvements, and maximizing one of the most powerful tools in the tax code: depreciation. For both domestic and foreign investors, navigating these rules without expert guidance can lead to significant lost tax savings and serious compliance issues. This guide details the essential accounting and tax services for real estate investors in the USA.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our real estate accounting services are designed for investors across the spectrum of property ownership in the US:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Rental Property Investors:</strong> Individuals and companies holding long-term residential or commercial rental properties who need to track income, expenses, and depreciation for each unit.</li>
                                <li><strong>House Flippers & Wholesalers:</strong> Short-term investors who need to accurately calculate the cost basis of a property, track renovation costs, and manage capital gains taxes.</li>
                                <li><strong>Real Estate Developers:</strong> Companies undertaking construction projects that require complex job costing, construction loan management, and capitalization of development costs.</li>
                                <li><strong>Foreign Investors in US Property:</strong> Non-residents who need to navigate FIRPTA (Foreign Investment in Real Property Tax Act), manage withholding taxes, and structure their holdings in tax-efficient LLCs.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you acquire your first investment property, specialized accounting is essential. It becomes non-negotiable at these key points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>At Property Purchase:</strong> To correctly establish the cost basis of the property, which is crucial for calculating depreciation and future capital gains.</li>
                                <li><strong>During Tax Season:</strong> To accurately calculate rental income/loss, claim all eligible deductions (mortgage interest, property taxes, repairs), and correctly apply depreciation.</li>
                                <li><strong>When Selling a Property:</strong> To calculate your capital gain or loss and to explore tax-deferral strategies like a 1031 exchange.</li>
                                <li><strong>When Structuring Your Holdings:</strong> To create separate LLCs for each property to isolate liability and to choose the most advantageous tax structure.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>The cost of professional real estate accounting is an investment in maximizing your after-tax returns. Pricing is typically based on the number of properties or units managed.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Portfolio (1-5 units):</strong> $400 - $900 per month. This covers property-level bookkeeping, bank reconciliation, and monthly financial reports.</li>
                                <li><strong>Medium Portfolio (6-20 units):</strong> $900 - $2,500 per month. This level often includes more detailed performance reporting and cash flow analysis.</li>
                                <li><strong>Development Projects & Large Portfolios:</strong> Custom pricing starting at $2,500+, involving complex job costing and/or virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Real estate investing carries unique and costly compliance risks if not handled by a professional:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Improper Depreciation:</strong> Failing to claim depreciation, or claiming it incorrectly, is a major audit trigger and results in leaving significant tax savings on the table.</li>
                                <li><strong>Misclassifying Expenses:</strong> Incorrectly deducting a capital improvement (which must be depreciated) as a repair (which is immediately deductible) can lead to IRS penalties.</li>
                                <li><strong>Passive Activity Loss (PAL) Rule Violations:</strong> The IRS has complex rules limiting the ability to deduct rental losses against other income. Violating these can result in disallowed deductions.</li>
                                <li><strong>Failed 1031 Exchange:</strong> The rules for a 1031 "like-kind" exchange to defer capital gains tax are extremely strict. A small mistake can invalidate the entire exchange, triggering a massive tax bill.</li>
                                <li><strong>FIRPTA Non-Compliance:</strong> Foreign investors who fail to follow FIRPTA rules can face significant withholding taxes and penalties upon selling a property.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>The US tax code for real estate is a labyrinth of rules that even seasoned investors find challenging. Outsourcing your accounting to YourLegal provides access to a team that lives and breathes real estate finance. We ensure every transaction is correctly categorized, every property has a detailed depreciation schedule, and your legal entities are structured for optimal tax treatment and liability protection.</p>
                            <p className="mt-4">
                                We go beyond just bookkeeping; we act as a strategic partner, helping you analyze property performance, model cash flow for future acquisitions, and plan tax-efficient exit strategies. By handling the complex financial administration, we empower you to focus on what you do best: finding and managing great properties. Our services are the foundation for building a profitable and compliant US real estate portfolio.
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
