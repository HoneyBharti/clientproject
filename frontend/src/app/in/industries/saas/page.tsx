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
export default function IndiaSaaSIndustryPage() {
    const serviceName = "SaaS & Technology";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian SaaS companies involves managing recurring revenue under Ind AS 115, tracking key metrics like MRR and Churn, and ensuring compliance with complex GST rules for software and international sales.` },
        { title: "Who needs this service?", content: "Any SaaS company based in India targeting domestic or international customers, from early-stage startups to established tech firms, needing investor-grade financials." },
        { title: "What is the cost range?", content: "Monthly costs for specialized SaaS accounting in India range from ₹40,000 for early-stage startups to ₹1,50,000+ for growth-stage companies with complex revenue streams." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of Ind AS 115, GST on digital goods, and investor metrics require expert knowledge. Outsourcing is the industry standard for scalable tech companies." },
        { title: "Final Decision Summary", content: "For Indian SaaS companies seeking growth and investment, outsourcing to a specialized accounting firm is a mandatory strategic decision to ensure compliance, tax efficiency, and investor-readiness." }
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
            "name": "India"
        },
        "description": `Outsourced SaaS & Technology accounting and tax services in India. We handle Ind AS 115 revenue recognition, GST compliance for software, and key metric tracking (MRR, Churn).`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India SaaS & Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Startup India SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "40000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth India SaaS Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "150000",
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate Ind AS 115 revenue recognition, GST compliance, and key SaaS metrics with our specialized financial services for Indian tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's booming digital economy has made it a global powerhouse for Software as a Service (SaaS) and technology companies. However, the unique business model of this sector presents significant financial management challenges. SaaS accounting in India is not merely about recording payments; it's a complex discipline that involves adhering to Indian Accounting Standard 115 (Ind AS 115) for recurring revenue, navigating intricate GST rules for digital goods and international sales, and tracking the specific metrics that investors use to value a tech business. Standard bookkeeping services are incapable of handling these complexities, often leading to non-compliance, inaccurate financial reporting, and missed growth opportunities. This guide details the essential, specialized accounting and tax services that Indian technology companies need to scale successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India SaaS & Technology accounting services are designed for the entire lifecycle of a tech company:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Bootstrapped & Seed-Stage SaaS Startups:</strong> Early-stage companies that have launched their product and need to establish proper revenue recognition practices and key SaaS metrics to attract their first institutional investment.</li>
                                <li><strong>Venture-Backed Scale-Ups:</strong> Growth-stage companies that have raised Series A or beyond and require Ind AS-compliant financial statements, detailed cohort analysis, and robust financial models for board reporting.</li>
                                <li><strong>"SaaS-for-the-World" from India:</strong> Companies primarily serving international customers, who need expert guidance on GST for exports (zero-rated supply), foreign currency management, and international tax structuring.</li>
                                <li><strong>Companies with Significant R&D:</strong> Tech firms investing in product development who need to correctly account for these expenses, distinguishing between what can be capitalized and what must be expensed.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized SaaS accounting is crucial from day one of your subscription sales. It becomes absolutely non-negotiable at these key milestones:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Sign Your First Annual Contract:</strong> Under Ind AS 115, revenue from a subscription must be recognized systematically over the life of the contract, not when the cash is received. This requires setting up a deferred revenue schedule.</li>
                                <li><strong>Before You Seek Venture Capital:</strong> Indian VCs and global investors will perform deep due diligence on your key SaaS metrics: Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), Customer Acquisition Cost (CAC), and Lifetime Value (LTV). These can only be calculated from clean, properly structured financial data.</li>
                                <li><strong>When You Sell to International Customers:</strong> You must correctly classify your sales as exports under GST law to benefit from zero-rating and manage foreign currency transactions and FIRC (Foreign Inward Remittance Certificate) compliance.</li>
                                <li><strong>When You Prepare for a Statutory Audit:</strong> All private limited companies in India require an annual audit. Your auditors will pay close attention to revenue recognition, and non-compliance with Ind AS 115 can lead to a qualified audit report.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>The cost of outsourced SaaS accounting reflects its strategic importance in driving valuation and ensuring compliance. The ROI from having investor-ready financials is immense.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Startups (&lt;$500K ARR):</strong> ₹40,000 - ₹90,000 per month. This covers Ind AS-compliant bookkeeping, GST compliance, and basic SaaS metric reporting.</li>
                                <li><strong>Growth-Stage Companies ($500K - $3M ARR):</strong> ₹90,000 - ₹2,00,000 per month. This includes more advanced SaaS metric dashboards, departmental budgeting, and preparation of an investor-ready reporting pack.</li>
                                <li><strong>Mature Tech Companies (&gt;$3M ARR):</strong> Custom pricing starting at ₹2,00,000+, often including fractional CFO services for strategic planning, fundraising support, and M&A advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For Indian tech companies, financial compliance risks can directly impact their valuation and ability to raise funds.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Ind AS 115 Non-Compliance:</strong> Improper revenue recognition is a major red flag for investors and auditors, potentially leading to a restatement of financials and a loss of trust.</li>
                                <li><strong>GST on Digital Services:</strong> Incorrectly determining the place of supply for software sold to customers in different states or countries can lead to significant GST liabilities and penalties.</li>
                                <li><strong>Inaccurate SaaS Metrics:</strong> Presenting flawed metrics like MRR or Churn to your board or potential investors destroys credibility and can jeopardize your fundraising efforts.</li>
                                <li><strong>TDS on SaaS Purchases:</strong> Companies in India are required to deduct TDS on payments for software. Failure to do so can lead to disallowance of the expense and penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Hiring an in-house finance team with specific expertise in Ind AS 115, GST for digital services, and SaaS metrics is extremely expensive and difficult in India's competitive talent market. Outsourcing to YourLegal provides immediate access to a team that specializes in the Indian SaaS ecosystem.</p>
                            <p className="mt-4">
                                We act as your strategic finance partner. We implement systems to track your SaaS metrics accurately and ensure your revenue is recognized correctly according to Indian accounting standards. Our investor-grade reporting gives you the data you need to manage your business effectively and communicate confidently with your board. This allows you to focus on building a world-class product and scaling your company, knowing your financial operations are robust, compliant, and built for a global audience.
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

