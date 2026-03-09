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
export default function AgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for US agencies (marketing, creative, PR) focuses on project profitability tracking, managing client retainers and deposits, and accurately accounting for pass-through costs like ad spend and contractor fees.` },
        { title: "Who needs this service?", content: "Any US-based creative, marketing, advertising, or PR agency that manages multiple clients and projects and needs a clear view of its financial performance beyond top-line revenue." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in the US range from $700 for small agencies to $4,000+ for larger firms with complex client billing and pass-through expenses." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting often leads to poor tracking of project costs and profitability. Outsourcing to an agency-focused firm provides the systems and expertise needed for accurate, real-time financial insights." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any US agency." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Agency Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in the USA. We handle project profitability, retainer accounting, and pass-through cost management.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "700",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
                <section className="bg-gradient-to-r from-rose-50 to-orange-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow management with financial services designed for creative and marketing agencies in the US.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Creative, marketing, and professional service agencies operate on a project-based or retainer model, which presents unique financial challenges. Success is not just about winning clients; it's about ensuring that every project is profitable and that the agency maintains healthy cash flow between invoicing cycles. Standard accounting often falls short, providing only a high-level view of revenue and expenses. Specialized agency accounting, however, drills down into project-level data, tracks team utilization, and properly manages pass-through costs, providing the critical insights needed to build a scalable and profitable agency. This guide covers the essential accounting and tax services required for agencies to thrive in the competitive US market.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our agency accounting services are built for the specific needs of various service-based firms in the United States:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms that manage client ad spend and need to track campaign profitability and retainer margins.</li>
                                <li><strong>Creative & Design Agencies:</strong> Branding, web design, and video production agencies that juggle multiple projects with varying scopes and timelines.</li>
                                <li><strong>Public Relations (PR) Firms:</strong> Agencies managing client retainers, press release distribution costs, and event expenses.</li>
                                <li><strong>Software Development Agencies:</strong> Dev shops building applications for clients on a project basis, needing to track developer time and project milestones accurately.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While any agency can benefit from professional accounting, it becomes essential at these key stages of growth:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Hire Your First Team Member:</strong> As you add staff (employees or contractors), you must accurately track their time against projects to understand your true cost of service delivery.</li>
                                <li><strong>When You Juggle Multiple Projects:</strong> Once you move beyond one or two clients, it becomes impossible to intuitively know which projects are profitable without a formal project accounting system.</li>
                                <li><strong>When You Manage Client Ad Spend:</strong> Agencies managing pass-through costs like Google Ads or Facebook Ads spend need meticulous accounting to separate agency revenue from client funds.</li>
                                <li><strong>When Cash Flow Becomes Tight:</strong> If you find yourself waiting anxiously for client payments to cover payroll, it's a sign you need better cash flow forecasting and management.</li>
                                <li><strong>When You Want to Scale:</strong> To grow your agency sustainably, you need data-driven insights into which services are most profitable and where you can optimize your pricing and operations.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Outsourcing your agency's accounting provides access to specialized expertise that pays for itself through improved profitability and efficiency.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> $700 - $1,800 per month. This typically includes core bookkeeping, payroll for a small team, and basic project profitability reports.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> $1,800 - $4,500 per month. This level of service usually involves more detailed KPI tracking (e.g., utilization rates, client margin analysis) and cash flow forecasting.</li>
                                <li><strong>Established Agency (20+ people):</strong> Custom pricing starting at $4,500+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies, like any business, face tax and labor compliance risks, but they also have unique operational risks tied to their financial management:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Unprofitable Projects:</strong> Without accurate project accounting, agencies can unknowingly lose money on large projects, eroding their overall profitability.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from a large upfront deposit before the work is completed can distort financial statements and lead to cash flow shocks.</li>
                                <li><strong>Commingling Pass-Through Funds:</strong> Failing to properly account for client ad spend or other pass-through costs can create major reconciliation headaches and client trust issues.</li>
                                <li><strong>Poor Scope Management:</strong> A lack of financial tracking on projects often leads to "scope creep," where the agency does more work than budgeted, killing project margins.</li>
                                <li><strong>Worker Misclassification:</strong> Many agencies rely on freelancers. Incorrectly classifying them as 1099 contractors when they should be W-2 employees can lead to significant IRS penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency founders are experts in their creative or marketing fields, not in accounting. Outsourcing the finance function to a specialized firm like YourLegal allows you to focus on client service and business development. We provide the systems and expertise to transform your financial data into actionable insights.</p>
                            <p className="mt-4">
                                We implement project accounting software that integrates with your time-tracking and project management tools, giving you a real-time view of every project's budget, costs, and profitability. We help you structure client retainers for optimal cash flow and ensure you are capturing every billable hour and expense. By providing clear, data-driven reports, we empower you to make smarter decisions about pricing, staffing, and which clients to pursue. Our service is the financial engine that powers a profitable, scalable agency.
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

