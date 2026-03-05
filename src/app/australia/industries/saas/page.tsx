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
export default function AustraliaSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian SaaS companies involves managing recurring revenue under AASB 15, tracking key metrics like MRR and Churn, capitalizing software development costs, and claiming the valuable R&D Tax Incentive.` },
        { title: "Who needs this service?", content: "Any SaaS company based in Australia, from early-stage startups to established tech firms, needing investor-grade financials and expert tax advice to maximize government incentives." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in Australia range from AUD $1,200 for early-stage startups to AUD $5,000+ for growth-stage companies with complex revenue streams and reporting needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of AASB 15, R&D tax claims, and investor metrics require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For Australian SaaS companies seeking growth and investment, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure compliance, maximize tax savings, and produce investor-grade financials." }
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
            "name": "Australia"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in Australia. We handle AASB 15 revenue recognition, R&D Tax Incentive claims, and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup Australia SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1200",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Australia SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate AASB 15 revenue recognition, R&D Tax Incentives, and key SaaS metrics with our specialized financial services for Australian tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Australia's technology sector is a dynamic and rapidly growing part of its economy, strongly supported by government initiatives like the R&D Tax Incentive. For Software as a Service (SaaS) companies, this environment offers a fantastic launchpad for both domestic and international growth. However, the unique recurring revenue model of a SaaS business presents complex financial challenges. Accounting for a SaaS company in Australia is not just about tracking cash; it requires a deep understanding of revenue recognition standards (AASB 15), meticulous tracking of development costs to maximize tax credits, and the ability to produce the specific metrics (MRR, Churn, LTV) that investors use to value a tech business. Standard accounting practices are ill-equipped to handle these demands. This guide details the essential, specialized accounting and tax services that Australian tech companies need to scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian SaaS & Technology accounting services are built for the entire lifecycle of a tech company:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Pre-Revenue & R&D-Focused Startups:</strong> Early-stage companies that are building their product and need to meticulously track all eligible expenditure to prepare for a robust R&D Tax Incentive claim.</li>
                                <li><strong>Bootstrapped & Seed-Stage SaaS:</strong> Companies with their first customers that need to implement proper recurring revenue recognition under AASB 15 and establish key SaaS metrics.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that have raised capital and require AASB-compliant financial statements, detailed cohort analysis, and robust financial models for board reporting and future fundraising rounds.</li>
                                <li><strong>International Tech Companies with an Australian Subsidiary:</strong> Foreign tech companies that need to navigate Australian compliance, GST on digital products, and transfer pricing with their parent entity.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from day one of development. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Write Your First Line of Code:</strong> To maximize your R&D Tax Incentive claim, you must have contemporaneous records of your development activities and qualifying costs from the very beginning.</li>
                                <li><strong>When You Sign Your First Annual Contract:</strong> Revenue from a subscription must be recognized over the life of the contract, not upfront. This requires deferred revenue accounting compliant with AASB 15.</li>
                                <li><strong>Before You Seek Investment:</strong> Australian and international VCs will perform deep due diligence on your key SaaS metrics: Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), and Lifetime Value (LTV). These can only be calculated from clean, properly structured financial data.</li>
                                <li><strong>When You Prepare Your First Annual Tax Return:</strong> Your R&D tax claim is lodged with your company tax return. It requires detailed project descriptions and a breakdown of eligible expenditure, prepared by a specialist.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in driving valuation and maximizing tax refunds. The ROI from a successful R&D claim alone can be immense.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups:</strong> AUD $1,200 - $2,800 per month. This covers AASB-compliant bookkeeping, BAS preparation, and the foundational work for an R&D claim.</li>
                                <li><strong>Growth-Stage Companies:</strong> AUD $2,800 - $6,000 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and preparation of an investor-ready reporting pack.</li>
                                <li><strong>Mature Tech Companies:</strong> Custom pricing starting at AUD $6,000+, often including fractional CFO services for strategic planning, fundraising support, and M&A advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For Australian tech companies, financial compliance risks can directly impact their funding and tax position.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>AASB 15 Non-Compliance:</strong> Improper revenue recognition is a major red flag for investors and auditors and can lead to financial restatements.</li>
                                <li>**Rejected R&D Tax Incentive Claim:** This is the single biggest financial risk. A claim rejected by the ATO or AusIndustry due to poor record-keeping means losing a significant cash refund or tax offset, which can cripple a startup's runway.</li>
                                <li><strong>GST on Digital Services:</strong> Incorrectly determining the GST treatment for software sold to Australian vs. overseas customers can lead to compliance issues and penalties.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors destroys credibility and can jeopardize your fundraising efforts.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific experience in AASB 15, the R&D Tax Incentive, and SaaS metrics is extremely expensive and difficult. Outsourcing to YourLegal provides immediate access to a team that specializes in the Australian tech ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We work with you to ensure your development process is documented in a way that maximizes your R&D claim. We implement systems to track your SaaS metrics accurately and ensure your revenue is recognized correctly according to Australian accounting standards. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a great product, confident that your financial operations are robust, compliant, and highly tax-efficient.
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
