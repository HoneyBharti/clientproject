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
export default function SingaporeSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Singapore SaaS companies involves managing recurring revenue under SFRS(I) 15, tracking key metrics like MRR and Churn, capitalizing software development costs, and leveraging tax incentives like the Start-up Tax Exemption (SUTE).` },
        { title: "Who needs this service?", content: "Any SaaS company based in Singapore targeting regional or global customers, from early-stage startups to established tech firms needing investor-grade financials." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in Singapore range from S$800 for early-stage startups to S$4,000+ for growth-stage companies with complex revenue streams." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of SFRS(I) 15 revenue recognition and investor metrics require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For Singapore-based SaaS companies seeking growth and investment, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure compliance, tax efficiency, and investor-readiness." }
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
            "name": "Singapore"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in Singapore. We handle SFRS(I) 15 revenue recognition, SUTE tax incentives, and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup Singapore SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Singapore SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "SGD",
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
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate SFRS(I) 15 revenue recognition, tax incentives, and key SaaS metrics with our specialized financial services for Singaporean tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Singapore's vibrant tech ecosystem, strong government support, and robust IP laws make it a premier destination for SaaS and technology companies looking to conquer the Asian market. However, the unique recurring revenue model of this sector presents complex financial management challenges. Accounting for a SaaS business in Singapore is not just about tracking payments; it's about adhering to SFRS(I) 15 for revenue recognition, managing multi-currency subscriptions, and leveraging powerful tax incentives like the Start-up Tax Exemption (SUTE). Standard bookkeeping services are incapable of handling these complexities or tracking the specific metrics (MRR, Churn, LTV) that drive valuation and investor confidence. This guide details the essential, specialized accounting and tax services that tech companies in Singapore need to scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Singapore SaaS & Technology accounting services are built for the entire lifecycle of a tech company:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Global SaaS Companies using Singapore as an APAC HQ:</strong> Businesses with customers across Southeast Asia and beyond who need to manage regional revenue and compliance from a stable hub.</li>
                                <li><strong>Early-Stage Startups:</strong> New companies aiming to take advantage of the SUTE scheme, which offers significant tax exemptions in the first three years.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that require SFRS-compliant financials, detailed cohort analysis, and robust financial models for board reporting and future fundraising rounds with Singapore-based VCs.</li>
                                <li><strong>Companies with R&D in Singapore:</strong> Tech firms investing in product development who need to correctly account for these expenses to potentially qualify for government grants and tax deductions.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from your first subscription sale. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Sign Your First Annual Contract:</strong> Under SFRS(I) 15, revenue from an annual subscription must be recognized monthly over the life of the contract, not upfront. This requires deferred revenue accounting from day one.</li>
                                <li><strong>Before You Seek Investment:</strong> VCs in Singapore will perform deep due diligence on your key SaaS metrics: Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), and Lifetime Value (LTV). These can only be calculated from clean, properly structured financial data.</li>
                                <li><strong>When You Sell to International Customers:</strong> You must correctly apply GST rules for digital services, which are typically zero-rated when supplied to overseas customers, but require proper documentation.</li>
                                <li><strong>When You Prepare Your First Annual Filing:</strong> Your Unaudited Financial Statements filed with ACRA must comply with SFRS, especially regarding revenue recognition. Getting this wrong is a major compliance failure.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in tax optimization and supporting valuation. The ROI from proper SUTE application and investor-readiness is immense.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups (&lt;S$1M ARR):</strong> S$800 - S$2,000 per month. This covers SFRS-compliant bookkeeping, GST compliance, and basic SaaS metric reporting.</li>
                                <li><strong>Growth-Stage Companies (S$1M - S$5M ARR):</strong> S$2,000 - S$5,000 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and preparation of an investor-ready reporting pack.</li>
                                <li><strong>Mature Tech Companies (&gt;S$5M ARR):</strong> Custom pricing starting at S$5,000+, often including fractional CFO services for strategic planning and fundraising support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For Singaporean tech companies, financial compliance risks can directly impact their tax status, valuation, and ability to operate.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>SFRS(I) 15 Non-Compliance:</strong> Improper revenue recognition is a major red flag for auditors and investors and can lead to a qualified audit opinion, potentially jeopardizing your trade license renewal if an audit is required.</li>
                                <li><strong>Loss of SUTE Benefits:</strong> Failing to meet the eligibility criteria for the Start-up Tax Exemption scheme can result in a significantly higher tax bill in your first three years.</li>
                                <li><strong>GST on Digital Services:</strong> Incorrectly determining the 'place of supply' for software sold to customers can lead to significant GST liabilities and penalties from IRAS.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors destroys credibility and can jeopardize your fundraising efforts.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific expertise in SFRS(I) 15, Singaporean tax incentives, and SaaS metrics is extremely expensive. Outsourcing to YourLegal provides immediate access to a team that specializes in the Singapore tech ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We help you structure your operations to maximize eligibility for tax schemes like SUTE. We implement systems to track your SaaS metrics accurately and ensure your revenue is recognized correctly according to Singaporean accounting standards. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a great product, confident that your financial operations are robust, compliant, and highly tax-efficient.
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

