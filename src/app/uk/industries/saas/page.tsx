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
export default function UKSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK SaaS companies involves managing recurring revenue under IFRS 15, tracking key metrics like MRR and Churn, capitalizing software development costs, and claiming valuable R&D tax credits.` },
        { title: "Who needs this service?", content: "Any UK-based SaaS company, from bootstrapped startups to venture-backed scale-ups, that needs GAAP/IFRS-compliant financials for investors, tax planning, and strategic decision-making." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in the UK range from £800 for early-stage startups to £4,000+ for growth-stage companies with complex revenue streams and investor reporting needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of IFRS 15, R&D tax claims, and investor metrics require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For UK SaaS companies seeking growth and investment, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure compliance, maximize tax savings, and produce investor-grade financials." }
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
            "name": "United Kingdom"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in the UK. We handle IFRS 15 revenue recognition, R&D tax credits, and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup UK SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth UK SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate IFRS 15 revenue recognition, R&D tax credits, and key SaaS metrics with our specialized financial services for UK tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The UK's thriving technology sector presents enormous opportunities, but its unique business models require a sophisticated approach to financial management. For Software as a Service (SaaS) companies, accounting is not just about tracking cash in and out; it's about correctly recognizing recurring revenue over time, capitalizing development costs, and leveraging government incentives designed to foster innovation. Standard bookkeeping services cannot handle the complexities of IFRS 15 (the revenue recognition standard), the nuances of claiming R&D tax credits, or the specific metrics (MRR, Churn, LTV) that investors use to value a SaaS business. This guide details the essential, specialized accounting and tax services that UK technology companies need to scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK SaaS & Technology accounting services are built for the entire lifecycle of a tech company:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Pre-Revenue Startups:</strong> Early-stage tech companies focused on building their product. We help you track R&D expenditure meticulously to maximize future tax credit claims.</li>
                                <li><strong>Bootstrapped & Seed-Stage SaaS:</strong> Companies with their first paying customers who need to implement proper recurring revenue recognition and establish key SaaS metrics.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that have raised investment and require IFRS-compliant financial statements, detailed cohort analysis, and robust financial models for board reporting and future fundraising.</li>
                                <li><strong>International Tech Companies:</strong> Foreign tech companies with a UK subsidiary, who need to navigate UK compliance, VAT on digital services, and transfer pricing with their parent company.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from day one. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Write Your First Line of Code:</strong> To qualify for R&D tax credits, you must have contemporaneous records of your development activities and costs from the very beginning.</li>
                                <li><strong>When You Sign Your First Annual Contract:</strong> Revenue from an annual subscription cannot be recognized all at once. Under IFRS 15, it must be recognized monthly over the life of the contract, a process that requires specialized accounting.</li>
                                <li><strong>Before You Seek Investment:</strong> VCs will expect to see accurate SaaS metrics like Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), and Lifetime Value (LTV). These can only be calculated from clean, well-structured financial data.</li>
                                <li><strong>When You Prepare Your First Year-End Accounts:</strong> Your statutory accounts must comply with UK accounting standards, including the correct treatment of revenue and capitalized development costs. Getting this wrong can lead to a qualified audit opinion.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in driving valuation and securing tax savings. The ROI is typically very high.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups (&lt;£1M ARR):</strong> £800 - £2,000 per month. This covers IFRS-compliant bookkeeping, VAT returns, payroll, and preparation for an R&D tax credit claim.</li>
                                <li><strong>Growth-Stage Companies (£1M - £5M ARR):</strong> £2,000 - £4,500 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and investor-ready reporting packs.</li>
                                <li><strong>Mature Tech Companies (&gt;£5M ARR):</strong> Custom pricing starting at £4,500+, often including fractional CFO services for strategic planning, fundraising support, and M&A advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For UK tech companies, financial compliance risks can directly impact valuation and funding opportunities:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>IFRS 15 Non-Compliance:</strong> Improper revenue recognition is a major red flag for investors and auditors and can force painful financial restatements.</li>
                                <li><strong>Rejected R&D Tax Credit Claims:</strong> This is a key source of non-dilutive funding. A claim rejected by HMRC due to poor record-keeping means leaving tens or hundreds of thousands of pounds on the table.</li>
                                <li><strong>VAT on Digital Services:</strong> The rules for applying VAT to software sold to customers in the UK, EU, and worldwide are complex. Errors can lead to significant tax liabilities.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors can destroy credibility and jeopardize your fundraising efforts.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific experience in UK SaaS accounting and R&D tax claims is extremely expensive and difficult. Outsourcing to YourLegal gives you immediate access to a team that specializes in the UK tech ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We implement systems to track your SaaS metrics accurately, ensure your revenue is recognized correctly, and work with our tax partners to maximize your R&D tax credit claim. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a great product and scaling your company, knowing your financial operations are robust, compliant, and built for growth.
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
