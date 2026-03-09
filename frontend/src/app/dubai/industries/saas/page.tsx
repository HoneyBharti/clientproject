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
export default function DubaiSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Dubai SaaS companies involves managing recurring revenue under IFRS 15, tracking key metrics like MRR and Churn, and structuring the business to benefit from the 0% Corporate Tax rate on 'Qualifying Income'.` },
        { title: "Who needs this service?", content: "Any SaaS company based in a UAE Free Zone targeting international customers, from early-stage startups to established tech firms." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in Dubai range from AED 3,000 for early-stage startups to AED 15,000+ for growth-stage companies with complex revenue streams." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of IFRS 15 and the new UAE Corporate Tax law require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For Dubai-based SaaS companies, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure tax efficiency, compliance, and investor-readiness." }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "SaaS & Technology Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Arab Emirates"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in Dubai, UAE. We handle IFRS 15 revenue recognition, UAE Corporate Tax compliance for 'Qualifying Income', and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup Dubai SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Dubai SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate IFRS 15 revenue recognition, Corporate Tax, and key SaaS metrics with our specialized financial services for UAE tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Dubai's rise as a global technology hub is built on its business-friendly environment, strategic location, and, most importantly, its favorable tax regime. For Software as a Service (SaaS) companies, a UAE Free Zone entity offers the powerful potential of a 0% Corporate Tax rate. However, capitalizing on this benefit requires a sophisticated approach to financial management. SaaS accounting in the UAE is not just about tracking cash; it's about adhering to IFRS 15 for recurring revenue, managing multi-currency subscriptions, and meticulously structuring operations to meet the 'Qualifying Income' requirements under the new Corporate Tax law. This guide details the essential, specialized accounting and tax services that tech companies in Dubai need to scale successfully while remaining compliant and tax-efficient.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dubai SaaS & Technology accounting services are built for tech companies leveraging the UAE as a global or regional hub:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Global SaaS Companies:</strong> Businesses with customers worldwide that use a Dubai Free Zone company to benefit from the 0% tax on foreign-sourced income.</li>
                                <li><strong>Bootstrapped & Seed-Stage Startups:</strong> Early-stage tech companies that need to establish proper revenue recognition and SaaS metrics to attract future investment.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that require IFRS-compliant financials, detailed cohort analysis, and robust financial models for board reporting.</li>
                                <li><strong>Companies with Development Teams in Dubai:</strong> Tech firms that need to track and potentially capitalize software development costs in compliance with IFRS.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from day one. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Sign Your First Annual Contract:</strong> Under IFRS 15, revenue from a subscription must be recognized over the life of the contract, not upfront. This requires deferred revenue accounting.</li>
                                <li><strong>When You Register for Corporate Tax:</strong> To benefit from the 0% free zone regime, you must prove your income is 'Qualifying Income'. This requires meticulous record-keeping and transaction analysis.</li>
                                <li><strong>Before You Seek Investment:</strong> Investors will scrutinize your key SaaS metrics like Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), and Lifetime Value (LTV). These can only be calculated from clean, well-structured financial data.</li>
                                <li><strong>Before Your First Audit:</strong> Many free zones require an annual audit for license renewal. Your financial statements must be IFRS-compliant, particularly regarding revenue recognition.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in tax optimization and supporting valuation. The ROI from securing a 0% tax rate is immense.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups (&lt;$1M ARR):</strong> AED 3,000 - AED 7,000 per month. This covers IFRS-compliant bookkeeping, VAT returns, and initial Corporate Tax compliance support.</li>
                                <li><strong>Growth-Stage Companies ($1M - $5M ARR):</strong> AED 7,000 - AED 15,000 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and investor-ready reporting packs.</li>
                                <li><strong>Mature Tech Companies (&gt;$5M ARR):</strong> Custom pricing starting at AED 15,000+, often including fractional CFO services for strategic planning and fundraising support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For Dubai tech companies, financial compliance risks can directly impact their tax status and ability to operate.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Loss of 0% Corporate Tax Rate:</strong> This is the single biggest risk. Earning a small amount of 'non-qualifying' income (e.g., from a Mainland client) or having inadequate 'substance' in the free zone can make all profits subject to the 9% tax rate.</li>
                                <li><strong>IFRS 15 Non-Compliance:</strong> Improper revenue recognition is a major red flag for auditors and can lead to a qualified audit report, jeopardizing your trade license renewal.</li>
                                <li><strong>VAT on Digital Services:</strong> Incorrectly determining the 'place of supply' for VAT on software sold to customers in different countries can lead to significant penalties from the FTA.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors destroys credibility and can derail fundraising efforts.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific expertise in IFRS 15, UAE Corporate Tax law, and SaaS metrics is extremely expensive. Outsourcing to YourLegal provides immediate access to a team that specializes in the Dubai tech ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We help you structure your operations and contracts to maximize your eligibility for the 0% Corporate Tax rate. We implement systems to track your SaaS metrics accurately and ensure your revenue is recognized correctly. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a great product, confident that your financial operations are robust, compliant, and highly tax-efficient.
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

