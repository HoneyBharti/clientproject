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
export default function NetherlandsSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for Dutch SaaS companies involves managing recurring revenue under IFRS 15, tracking key metrics like MRR and Churn, capitalizing software development costs, and maximizing R&D tax credits like the WBSO.` },
        { title: "Who needs this service?", content: "Any SaaS company with a Dutch B.V., from early-stage startups to established tech firms, needing IFRS-compliant financials for investors and tax planning." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in the Netherlands range from €800 for early-stage startups to €4,000+ for growth-stage companies with complex revenue streams." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of IFRS 15, WBSO claims, and EU VAT rules require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For Dutch SaaS companies seeking growth and investment, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure compliance, maximize tax savings, and produce investor-grade financials." }
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
            "name": "Netherlands"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in the Netherlands. We handle IFRS 15 revenue recognition, WBSO R&D tax credits, and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup Netherlands SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Netherlands SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate IFRS 15 revenue recognition, WBSO tax credits, and key SaaS metrics with our specialized financial services for Dutch tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           The Netherlands is a leading European hub for technology and Software as a Service (SaaS) companies, thanks to its highly skilled, multilingual workforce, excellent digital infrastructure, and attractive government incentives. However, the unique recurring revenue model of a SaaS business presents complex financial challenges. Accounting for a Dutch SaaS company requires a deep understanding of IFRS 15 for revenue recognition, meticulous tracking of development costs to claim R&D tax credits (WBSO), and the ability to produce the specific metrics (MRR, Churn, LTV) that European investors use to value a tech business. Standard accounting practices are ill-equipped to handle these demands. This guide details the essential, specialized accounting and tax services that Dutch tech companies need to scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dutch SaaS & Technology accounting services are built for the entire lifecycle of a tech company in the Netherlands:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Pre-Revenue Startups:</strong> Early-stage companies focused on product development who need to track R&D hours and costs to maximize claims under the WBSO scheme.</li>
                                <li><strong>Bootstrapped & Seed-Stage SaaS:</strong> Companies with their first customers that need to implement proper recurring revenue recognition under IFRS 15 and establish key SaaS metrics.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that have raised capital from European VCs and require IFRS-compliant financial statements and robust financial models for board reporting.</li>
                                <li><strong>International Tech Companies:</strong> Foreign tech companies using a Dutch B.V. as their EU headquarters, needing to navigate EU VAT rules, transfer pricing, and the 30% ruling to attract international talent.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from day one of development. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Start R&D Work:</strong> To qualify for the WBSO tax credit, you must apply in advance and keep detailed, contemporaneous records of your R&D projects and the hours spent by your team.</li>
                                <li><strong>When You Sign Your First Annual Contract:</strong> Revenue from a subscription must be recognized over the life of the contract, not upfront. This requires deferred revenue accounting compliant with IFRS 15.</li>
                                <li><strong>Before You Seek Investment:</strong> European VCs will perform deep due diligence on your SaaS metrics: MRR, CAC, LTV, and cohort analysis. These can only be calculated from clean, properly structured financial data.</li>
                                <li><strong>When You File Your First Annual Accounts:</strong> Your annual accounts filed with the KVK (Chamber of Commerce) must comply with Dutch GAAP, including correct revenue recognition and capitalization of development costs where applicable.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in driving valuation and maximizing tax savings. The ROI from a successful WBSO claim alone can be immense.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups:</strong> €800 - €2,000 per month. This covers IFRS-compliant bookkeeping, BTW returns, and the foundational work for a WBSO claim.</li>
                                <li><strong>Growth-Stage Companies:</strong> €2,000 - €5,000 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and investor-ready reporting packs.</li>
                                <li><strong>Mature Tech Companies:</strong> Custom pricing starting at €5,000+, often including fractional CFO services for strategic planning and fundraising support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For Dutch tech companies, financial compliance risks can directly impact their funding and tax position.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>IFRS 15 Non-Compliance:</strong> Improper revenue recognition is a major red flag for auditors and can lead to financial restatements and a qualified audit opinion.</li>
                                <li><strong>Rejected WBSO Claims:</strong> A claim for R&D tax credits rejected by the RVO (Netherlands Enterprise Agency) due to poor record-keeping means losing a significant wage tax reduction, which can cripple a startup's runway.</li>
                                <li><strong>BTW (VAT) on Digital Services:</strong> Incorrectly determining the place of supply for software sold to customers in different EU member states can lead to complex compliance issues and penalties.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors destroys credibility and can jeopardize your fundraising efforts.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific experience in IFRS 15, the WBSO scheme, and SaaS metrics is extremely expensive. Outsourcing to YourLegal provides immediate access to a team that specializes in the Dutch tech ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We work with you to ensure your development process is documented in a way that maximizes your WBSO claim. We implement systems to track your SaaS metrics accurately and ensure your revenue is recognized correctly. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a great product, confident that your financial operations are robust, compliant, and highly tax-efficient.
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
