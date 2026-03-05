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
export default function IndiaStartupsIndustryPage() {
    const serviceName = "Startups";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian startups focuses on investor-readiness. This includes preparing MIS reports, managing cash burn, ensuring FEMA/RBI compliance for foreign funding, and managing equity instruments like ESOPs and convertible notes.` },
        { title: "Who needs this service?", content: "Any high-growth Indian startup that is raising or has raised equity financing from angel investors or VCs and needs to establish a professional finance function." },
        { title: "What is the cost range?", content: "Monthly costs range from ₹50,000 for seed-stage startups to ₹2,00,000+ for Series A/B companies requiring more complex reporting, forecasting, and fractional CFO support." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible for a venture-backed startup in India. Investors and auditors require financials prepared by experienced professionals. Outsourcing is the industry standard." },
        { title: "Final Decision Summary", content: "To successfully raise venture capital and scale in India, outsourcing to a startup-focused accounting firm is essential for building a compliant and investor-ready financial infrastructure." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for venture-backed startups in India. We handle investor MIS, FEMA/RBI compliance for funding, and ESOP/convertible note accounting.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Seed-Stage India Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "50000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Series A India Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "200000",
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Venture-Backed {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Investor-ready financials for high-growth Indian startups. We manage your MIS reporting, FEMA compliance, and ESOPs so you can focus on scaling.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           India's startup ecosystem is one of the most dynamic in the world, defined by ambitious founders, rapid innovation, and a vibrant venture capital market. For these high-growth companies, the financial function is not about historical record-keeping; it's a strategic tool for managing cash burn, demonstrating traction, and securing the next round of funding. Startup accounting in India requires specialized expertise in managing foreign investment (FDI), navigating complex regulations from the RBI and FEMA, accounting for equity instruments like ESOPs and convertible notes, and producing the detailed MIS reports that investors demand. This guide details the critical accounting services every ambitious Indian startup needs to attract funding and scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India startup accounting services are designed for high-growth companies at every stage of their funding journey:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Pre-Seed & Seed Stage Startups:</strong> Companies raising their first external capital from angel investors or VCs and needing to establish a professional, investor-ready finance function.</li>
                                <li><strong>Startups with Foreign Investment:</strong> Companies that have received FDI and must ensure strict compliance with FEMA and RBI reporting requirements, such as filing Form FC-GPR.</li>
                                <li><strong>Venture-Backed Companies (Series A and beyond):</strong> Startups that have closed institutional rounds and are now accountable for providing detailed monthly management accounts, cash flow forecasts, and KPI dashboards to their board of directors.</li>
                                <li><strong>Companies Building a Team:</strong> Startups looking to attract top talent by offering Employee Stock Option Plans (ESOPs), which require careful legal structuring and accounting treatment.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized startup accounting is mandatory from the moment you decide to raise external equity capital. It becomes critical at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Approaching Investors:</strong> You need a solid business plan with defendable financial projections. Investors will expect a clean, organized set of books from day one.</li>
                                <li><strong>When You Receive Foreign Funding:</strong> You must immediately comply with RBI reporting requirements. Failure to file forms like FC-GPR within the specified timeline leads to significant penalties.</li>
                                <li><strong>When You Issue SAFEs or Convertible Notes:</strong> These fundraising instruments have specific accounting treatments and need to be correctly reflected on your balance sheet and cap table.</li>
                                <li><strong>After Closing a Funding Round:</strong> Your new investors will require professional, timely, and accurate financial reporting (MIS) as a condition of their investment.</li>
                                <li><strong>During a Due Diligence Process:</strong> A potential investor or acquirer will conduct a thorough review of your financial history, statutory compliance, and cap table. Any discrepancies or compliance gaps can kill the deal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Accounting for venture-backed startups is a strategic function that directly supports fundraising and valuation. The pricing reflects this high level of expertise and reporting requirements.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Seed-Stage Package:</strong> ₹50,000 - ₹1,25,000 per month. This covers Ind AS-compliant bookkeeping, GST/TDS compliance, payroll, and preparation of a monthly MIS pack for investors.</li>
                                <li><strong>Series A Package:</strong> ₹1,25,000 - ₹2,50,000+ per month. This includes everything in the seed package plus detailed monthly investor reporting, departmental budgets, cash flow forecasting, and support for board meetings.</li>
                                <li><strong>Virtual CFO for Startups:</strong> Often starting from ₹2,00,000+, this provides fractional CFO services for strategic planning, fundraising, and M&A advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For an Indian startup, financial and regulatory missteps can be fatal to its fundraising ambitions.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>FEMA/RBI Non-Compliance:</strong> This is a major risk. Failure to report foreign investment correctly and on time can lead to heavy penalties and make it difficult to raise future rounds.</li>
                                <li><strong>Failed Due Diligence:</strong> Messy financials, a disorganized data room, or a history of statutory non-compliance are the fastest ways to fail an investor's due diligence process.</li>
                                <li><strong>Cap Table & ESOP Errors:</strong> Mismanaging your capitalization table or incorrectly structuring your ESOP pool can create serious legal disputes and complicate future financing.</li>
                                <li><strong>Inaccurate Investor Reporting:</strong> Providing incorrect or unreliable financial data to your board and investors destroys trust and can lead to a loss of founder control and future funding.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring a full-time CFO with startup experience in India is a major expense, often exceeding ₹40-50 lakhs per year—capital that is better spent on product and growth. Outsourcing to a specialized firm like YourLegal provides access to an entire team of startup finance experts at a fraction of the cost.</p>
                            <p className="mt-4">
                                We are your strategic finance partners. We manage the entire financial back-office, from day-to-day bookkeeping to complex FEMA compliance. We prepare the exact MIS reports that top VCs in India and abroad expect to see. Our service scales with you, providing basic support in your early days and growing into a full-fledged virtual CFO function as you raise larger rounds. By partnering with us, you ensure your financial house is always in order, giving you the solid foundation you need to build a category-defining company.
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
