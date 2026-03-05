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
export default function AustraliaStartupsIndustryPage() {
    const serviceName = "Startups & Global Entrepreneurs";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian startups focuses on investor-readiness. This includes managing cash burn, preparing financial models, ensuring compliance with ASIC, and maximizing valuable government incentives like the R&D Tax Incentive and ESIC tax breaks.` },
        { title: "Who needs this service?", content: "Any high-growth Australian startup that is raising or has raised equity financing from angel investors or VCs and needs to establish a professional finance function." },
        { title: "What is the cost range?", content: "Monthly costs range from AUD $1,500 for seed-stage startups to AUD $7,000+ for Series A/B companies requiring more complex reporting, forecasting, and fractional CFO support." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible for a venture-backed startup. Investors, auditors, and the ATO require financials prepared by experienced professionals. Outsourcing is the industry standard." },
        { title: "Final Decision Summary", content: "To successfully raise venture capital and scale in Australia, outsourcing to a startup-focused accounting firm is essential for building a compliant, tax-efficient, and investor-ready financial infrastructure." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Startup Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for venture-backed startups in Australia. We handle investor reporting, R&D Tax Incentive claims, and ESIC compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Seed-Stage Australia Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Series A Australia Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "7000",
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Venture-Backed {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Investor-ready financials for high-growth Australian startups. We manage your cash burn, R&D tax claims, and ESOPs so you can focus on scaling.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Australia's startup ecosystem is a vibrant and growing force, backed by a strong venture capital community and generous government incentives. For high-growth companies, the financial journey is a high-stakes game of managing cash burn, demonstrating traction to investors, and leveraging powerful tax schemes like the R&D Tax Incentive and concessions for Early Stage Innovation Companies (ESICs). In this environment, accounting is not about historical record-keeping; it's a strategic function that directly influences a startup's ability to raise capital, attract talent, and extend its runway. This guide details the critical accounting services every ambitious Australian startup needs to attract funding and scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian startup accounting services are designed for high-growth companies at every stage of their funding journey:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Pre-Seed & Seed Stage Startups:</strong> Companies raising their first capital from angel investors or VCs and needing to establish a professional, investor-ready finance function.</li>
                                <li><strong>R&D-Intensive Tech Startups:</strong> Companies investing heavily in developing new technology who can claim a significant cash refund through the R&D Tax Incentive.</li>
                                <li><strong>Early Stage Innovation Companies (ESICs):</strong> Startups that meet specific criteria, making them highly attractive to investors who can receive significant tax offsets.</li>
                                <li><strong>Venture-Backed Companies (Series A and beyond):</strong> Startups that have closed institutional rounds and are now accountable for providing detailed monthly management accounts, cash flow forecasts, and KPI dashboards to their board.</li>
                                <li><strong>Companies Building a Team:</strong> Startups looking to attract top talent by offering equity through an Employee Share Option Plan (ESOP).</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized startup accounting is mandatory from the moment you decide to raise external equity capital. It becomes critical at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Approaching Investors:</strong> To attract sophisticated investors, you need a solid business plan with defendable financial projections and a strategy for accessing tax incentives like ESIC status.</li>
                                <li><strong>When You Incur R&D Costs:</strong> To maximize your R&D Tax Incentive claim, you must have detailed, contemporaneous records of your eligible activities and expenditure.</li>
                                <li><strong>When You Issue a SAFE Note or Equity:</strong> Fundraising instruments must be correctly recorded on your balance sheet and cap table.</li>
                                <li><strong>After Closing a Funding Round:</strong> Your new investors will require professional, timely, and accurate financial reporting (a "board pack" or MIS) as a condition of their investment.</li>
                                <li><strong>During a Due Diligence Process:</strong> A potential investor or acquirer will conduct a thorough review of your financial history, ASIC compliance, and cap table. Any discrepancies can kill the deal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Accounting for venture-backed startups is a strategic function that supports fundraising and unlocks valuable tax refunds. The pricing reflects this high level of expertise.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Seed-Stage Package:</strong> AUD $1,500 - $3,500 per month. This covers AASB-compliant bookkeeping, payroll, BAS, and preparation for R&D tax claims.</li>
                                <li><strong>Series A Package:</strong> AUD $3,500 - $8,000 per month. This includes everything in the seed package plus detailed monthly investor reporting, departmental budgeting, cash flow forecasting, and ESOP administration.</li>
                                <li><strong>Virtual CFO for Startups:</strong> Often starting from AUD $8,000+, this provides fractional CFO services for strategic planning, board meeting participation, and fundraising support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For an Australian startup, financial and regulatory missteps can be fatal to its fundraising ambitions.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Failed R&D Claim:</strong> A claim rejected by the ATO due to poor record-keeping means losing a critical source of non-dilutive funding, which can shorten a startup's runway by months or even years.</li>
                                <li><strong>Failed Due Diligence:</strong> Messy financials, a disorganized data room, or a history of ASIC non-compliance are the fastest ways to fail an investor's due diligence process.</li>
                                <li><strong>ESIC Non-Compliance:</strong> If your company fails to maintain its ESIC status after taking investment, your investors could lose their valuable tax incentives, causing catastrophic reputational damage.</li>
                                <li><strong>Cap Table & ESOP Errors:</strong> Mismanaging your capitalization table or incorrectly accounting for share options can create serious legal disputes and complicate future funding rounds.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring a full-time CFO with startup experience in Australia is a major expense, often exceeding AUD $250,000 per year—capital far better spent on product development and growth. Outsourcing to a specialized firm like YourLegal provides access to an entire team of startup finance experts at a fraction of the cost.</p>
                            <p className="mt-4">
                                We are your strategic finance partners. We manage the entire process of preparing and lodging your R&D Tax Incentive claim. We prepare the exact board reports that top VCs in Australia expect to see. Our service scales with you, providing basic support in your early days and growing into a full-fledged virtual CFO function as you raise larger rounds. By partnering with us, you ensure your financial house is always in order, giving you the solid foundation you need to build a category-defining company.
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
