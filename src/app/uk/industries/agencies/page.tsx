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
export default function UKAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK agencies (marketing, creative, PR) focuses on project profitability, managing client retainers, accounting for VAT on services, and correctly handling contractor payments under IR35 rules.` },
        { title: "Who needs this service?", content: "Any UK-based creative, marketing, advertising, or PR agency that needs a clear view of its financial performance beyond top-line revenue, especially those dealing with multiple clients and projects." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in the UK range from £500 for small agencies to £3,000+ for larger firms with complex client billing and multi-currency transactions." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting often leads to poor tracking of project profitability and VAT errors. Outsourcing to an agency-focused firm provides the expertise needed for accurate, real-time financial insights and compliance." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any UK agency." }
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
            "name": "United Kingdom"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in the UK. We handle project profitability, retainer accounting, VAT, and IR35 compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small UK Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large UK Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
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
                <section className="bg-gradient-to-r from-rose-50 to-orange-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow management with financial services designed for creative and marketing agencies in the UK.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Creative, marketing, and professional service agencies in the United Kingdom operate in a highly competitive, project-driven environment. Financial success hinges not just on winning prestigious clients, but on meticulously managing project profitability, navigating complex client retainers, and ensuring strict compliance with UK tax law, particularly around VAT and contractor employment rules (IR35). Standard accounting software often fails to provide the granular insights needed to understand which projects are truly profitable and where cash flow is being squeezed. Specialized agency accounting addresses these unique challenges, providing the financial clarity needed to build a sustainable, scalable, and profitable agency in the UK. This guide covers the essential accounting and tax services required for agencies to succeed.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK agency accounting services are specifically tailored for the needs of various service-based firms:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms managing client ad spend and needing to track campaign ROI and retainer profitability.</li>
                                <li><strong>Creative & Design Agencies:</strong> Branding, web development, and video production houses that need to track project costs, including software subscriptions and freelance talent.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms managing monthly retainers, event budgets, and pass-through expenses for media distribution.</li>
                                <li><strong>Management & IT Consultancies:</strong> Professional service firms that need to track billable hours against project budgets and manage multi-currency billing for international clients.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at key growth stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Hire Your First Employee or Contractor:</strong> This triggers PAYE (Pay As You Earn) payroll obligations and the need to assess contractor status under IR35 rules to avoid significant tax liabilities.</li>
                                <li><strong>When You Cross the VAT Threshold:</strong> Once your taxable turnover exceeds £90,000 in a rolling 12-month period, you must register for VAT and begin submitting MTD (Making Tax Digital) compliant returns.</li>
                                <li><strong>When Managing Multiple Projects:</strong> As soon as you are juggling more than a couple of clients, it becomes impossible to accurately gauge the profitability of each project without a dedicated project accounting system.</li>
                                <li><strong>When Cash Flow Becomes a Concern:</strong> If you're struggling to bridge the gap between paying staff and receiving client payments, you need professional cash flow forecasting and management.</li>
                                <li><strong>When You Want to Scale or Sell:</strong> To grow your agency sustainably or prepare for an eventual sale, you need robust, data-driven financial reports that demonstrate profitability and operational efficiency.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>Outsourcing your agency's accounting provides access to a specialized skillset that delivers a strong ROI through improved efficiency and tax optimization.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> £500 - £1,500 per month. This typically includes MTD-compliant bookkeeping, payroll, VAT returns, and basic project profitability reporting.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> £1,500 - £3,500 per month. This service level often includes more detailed KPI analysis (e.g., team utilization, client margin analysis) and cash flow forecasting.</li>
                                <li><strong>Established Agency (20+ people):</strong> Custom pricing starting at £3,500+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>UK agencies face significant compliance risks that can result in heavy penalties if not managed correctly:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>IR35 Non-Compliance:</strong> Incorrectly classifying an employee as a contractor can lead to significant liabilities for unpaid PAYE tax and National Insurance contributions.</li>
                                <li><strong>VAT Errors:</strong> Incorrectly charging, reclaiming, or reporting VAT is a common issue that leads to penalties from HMRC. This is especially complex for agencies with international clients.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can unknowingly run unprofitable projects, which erodes overall business health and can lead to failure.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from large upfront payments before work is delivered can distort financial performance and lead to cash flow issues.</li>
                                <li><strong>Late Filings:</strong> Missing deadlines for filing annual accounts with Companies House or Corporation Tax returns with HMRC results in automatic, escalating penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders are experts in creativity, strategy, and client relationships—not UK tax law or management accounting. Outsourcing the finance function to YourLegal allows you to focus on your core strengths while we provide the financial engine for your growth.</p>
                            <p className="mt-4">
                                We implement cloud-based accounting systems that integrate with your project management tools (like Asana or Trello) to provide real-time profitability insights. Our team manages your VAT compliance, navigates the complexities of IR35, and ensures all your Companies House and HMRC filings are handled correctly and on time. By transforming your financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and business development, building a more profitable and resilient agency. This service works in tandem with our core <Link href="/uk/tax-compliance" className="text-blue-600 hover:underline">UK tax compliance</Link> and <Link href="/uk/company-formation" className="text-blue-600 hover:underline">company formation</Link> solutions.
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
