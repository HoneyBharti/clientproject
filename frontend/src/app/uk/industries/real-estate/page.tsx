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
export default function UKRealEstateIndustryPage() {
    const serviceName = "Real Estate";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK real estate investors involves managing property-level financials, navigating complex VAT rules (e.g., on commercial property), handling Capital Gains Tax, and structuring investments via tax-efficient Limited Companies.` },
        { title: "Who needs this service?", content: "Any individual or company that owns, develops, or manages investment properties in the UK, including buy-to-let landlords, property developers, and foreign investors." },
        { title: "What is the cost range?", content: "Costs can range from £300/month for a small portfolio to £1,500+/month for larger portfolios or development projects, reflecting the complexity of property-level accounting and tax planning." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex UK tax laws around property, including Stamp Duty Land Tax (SDLT), Capital Gains Tax, and specific VAT rules. Outsourcing to a specialist is crucial for compliance and tax efficiency." },
        { title: "Final Decision Summary", content: "To effectively manage property performance, navigate the UK's complex property tax system, and ensure legal compliance, outsourcing real estate accounting is a necessary investment." }
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
            "name": "United Kingdom"
        },
        "description": `Outsourced accounting and tax services for UK real estate investors. We manage property-level bookkeeping, VAT on property, Capital Gains Tax, and SPV (Limited Company) structuring.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK Real Estate Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "UK Rental Property Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "300",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "UK Real Estate Development Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for UK real estate investors. We handle SDLT, Capital Gains, and SPV structuring.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Investing in UK real estate is a popular strategy for wealth creation, but it is governed by a highly specific and ever-changing set of tax laws. Unlike other investments, property involves complex rules around Stamp Duty Land Tax (SDLT), Capital Gains Tax (CGT), and the tax treatment of rental income. For both UK-based and international investors, structuring property ownership correctly—often through a Special Purpose Vehicle (SPV) Limited Company—is critical for tax efficiency and liability protection. Standard accounting services are not equipped to provide the specialist advice needed to navigate this landscape. This guide details the essential accounting and tax services required for successful real estate investment in the UK.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK real estate accounting services are designed for a range of property investors:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Buy-to-Let Landlords:</strong> Individuals holding one or more rental properties who need to track rental income, claim allowable expenses, and manage their income tax obligations.</li>
                                <li><strong>Portfolio Landlords:</strong> Investors holding multiple properties within a Limited Company (SPV) to optimize their mortgage interest relief and tax planning.</li>
                                <li><strong>Property Developers & 'Flippers':</strong> Businesses acquiring property for renovation and resale, who need to accurately track project costs and manage Capital Gains Tax or Corporation Tax on their profits.</li>
                                <li><strong>Foreign Investors in UK Property:</strong> Non-residents who need guidance on UK tax obligations, the Annual Tax on Enveloped Dwellings (ATED), and structuring their investment in a compliant and tax-efficient manner.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the day you consider purchasing your first investment property, specialist advice is crucial. It becomes non-negotiable at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Purchase:</strong> To decide on the optimal ownership structure (personal name vs. Limited Company) and to calculate the correct Stamp Duty Land Tax (SDLT), including any surcharges for additional properties or non-resident buyers.</li>
                                <li><strong>During Ownership:</strong> To accurately track all rental income and differentiate between immediately deductible repairs and capital improvements that must be treated differently for tax purposes.</li>
                                <li><strong>At Tax Time:</strong> To prepare and file your Self-Assessment tax return or the company's Corporation Tax return, ensuring all reliefs and allowances are correctly claimed.</li>
                                <li><strong>When Selling the Property:</strong> To calculate the Capital Gains Tax (CGT) owed and ensure all records are in place to support the cost basis of the property.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>The cost of professional real estate accounting is a vital investment in maximizing your net rental yield and ensuring compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Portfolio (1-3 properties):</strong> £300 - £700 per month. This covers property-level bookkeeping, annual accounts, and tax return for the SPV.</li>
                                <li><strong>Medium Portfolio (4-10 properties):</strong> £700 - £1,500 per month. This level often includes more detailed portfolio performance reporting and tax planning.</li>
                                <li><strong>Development Projects & Large Portfolios:</strong> Custom pricing starting at £1,500+, including project cost management and strategic tax advice.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The UK property market is heavily taxed and regulated, with significant risks for uninformed investors:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Mortgage Interest Relief:</strong> Since recent law changes, the way mortgage interest relief can be claimed differs significantly for personal owners versus limited companies. Getting this wrong leads to overpaid tax.</li>
                                <li><strong>Capital Gains Tax Miscalculation:</strong> Failing to correctly calculate the cost basis of your property or not claiming all available reliefs can result in a much larger CGT bill upon sale.</li>
                                <li><strong>VAT on Property:</strong> The rules for VAT on commercial property transactions are notoriously complex. Errors can lead to huge, unexpected VAT liabilities.</li>
                                <li><strong>Non-Resident Landlord Scheme:</strong> Foreign investors who don't register correctly with HMRC may have tenants or letting agents withhold basic rate tax from their rental income.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Property tax is a minefield. The rules are complex and constantly changing. Outsourcing your accounting to YourLegal's property specialists ensures you are always compliant and maximizing your tax efficiency. We help you from the very beginning, advising on the right ownership structure for your goals.</p>
                            <p className="mt-4">
                                We manage the bookkeeping for your property portfolio, prepare your annual accounts and tax returns, and provide proactive advice on how to grow your portfolio in a tax-efficient way. By handling the complex financial and tax administration, we empower you to focus on what you do best: finding and managing great investment properties.
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

