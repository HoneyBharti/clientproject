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
export default function SingaporeAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for agencies in Singapore involves managing project profitability, retainer-based revenue, multi-currency billing for regional clients, and ensuring compliance with GST and corporate tax laws.` },
        { title: "Who needs this service?", content: "Any Singapore-based creative, marketing, advertising, or PR agency, especially those serving as a hub for the APAC region." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in Singapore range from S$600 for small agencies to S$3,500+ for larger firms with complex client projects and international billing." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting leads to poor tracking of project profitability and non-compliance with Singapore's tax laws. Outsourcing provides the expertise needed for accurate financial insights and regulatory adherence." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any Singaporean agency." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in Singapore. We handle project profitability, retainer accounting, multi-currency billing, and GST compliance for APAC operations.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Singapore Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "600",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Singapore Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3500",
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
                <section className="bg-gradient-to-r from-rose-50 to-orange-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow with financial services built for Singapore's creative and marketing sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Singapore's status as a premier hub for business in Asia has made it a magnet for creative, marketing, and professional service agencies. Operating from this dynamic city-state allows agencies to serve a diverse, high-value client base across the APAC region. However, this project-based business model carries unique financial challenges. Profitability hinges on accurately tracking project costs against retainers, managing multi-currency billing for international clients, and navigating Singapore's specific tax regulations, including the Goods and Services Tax (GST). Standard accounting practices often fail to provide the granular insights needed to determine which clients and projects are truly profitable. Specialized agency accounting is therefore essential for building a sustainable and scalable agency in Singapore. This guide details the critical accounting and tax services required for agencies to thrive in this competitive market.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Singapore agency accounting services are tailored for the specific needs of various service-based firms:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms managing regional client campaigns and needing to track profitability across different markets.</li>
                                <li><strong>Creative & Design Studios:</strong> Branding, web development, and content production agencies that must meticulously track project costs, including software licenses and freelance talent based in different countries.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms handling retainers for multinational corporations, managing event budgets across Southeast Asia, and requiring transparent financial reporting.</li>
                                <li><strong>Business & Management Consultancies:</strong> Professional service firms billing global clients based on time and materials, needing to ensure every project is profitable after accounting for all costs.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at several key growth points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Land Your First International Client:</strong> This introduces the need to manage multi-currency invoicing and understand the GST rules for exporting services.</li>
                                <li><strong>When You Hire Your First Employee:</strong> This triggers the need for compliant payroll, including mandatory Central Provident Fund (CPF) contributions for local staff.</li>
                                <li><strong>When You Cross the GST Threshold:</strong> Once your taxable turnover exceeds S$1 million, you must register for GST, which requires meticulous, IRAS-compliant bookkeeping.</li>
                                <li><strong>When Managing Multiple Large Projects:</strong> As soon as you are juggling several significant clients, it becomes impossible to accurately gauge the profitability of each without a dedicated project accounting system.</li>
                                <li><strong>When You Want to Scale or Seek Investment:</strong> To grow sustainably, you need data-driven insights into your most profitable services and clients. Investors will demand these detailed financial reports.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>Outsourcing your agency's accounting provides access to specialized skills that enhance profitability and ensure compliance, at a fraction of the cost of a full-time finance team.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> S$600 - S$1,500 per month. This typically includes core bookkeeping, GST compliance, payroll, and basic project profitability reporting.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> S$1,500 - S$4,000 per month. This level adds more detailed KPI analysis, cash flow forecasting, and management of more complex client accounts.</li>
                                <li><strong>Established Regional Agency (20+ people):</strong> Custom pricing starting from S$4,000+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies in Singapore face specific compliance risks that can result in significant penalties if not properly managed:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Non-Compliance:</strong> Incorrectly applying GST rules, especially zero-rating for international services, can lead to significant penalties and interest from IRAS.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can unknowingly lose money on high-profile projects, which can quickly drain cash reserves and threaten the business's viability.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from large advance payments before the service is rendered violates Singapore Financial Reporting Standards (SFRS) and can lead to misleading financial reports.</li>
                                <li><strong>ACRA & IRAS Filing Errors:</strong> Missing deadlines for filing annual returns with ACRA or corporate tax returns with IRAS results in automatic penalties and can damage the company's legal standing.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders excel at creativity, client management, and strategy—not SFRS accounting or Singaporean tax law. Outsourcing the finance function to YourLegal allows you to focus on your core business while we provide the financial backbone for your growth.</p>
                            <p className="mt-4">
                                We implement cloud-based systems to provide real-time insights into your project profitability and overall financial health. Our team of experts manages your GST and corporate tax compliance, ensuring you meet all deadlines and optimize your tax position, potentially benefiting from schemes like the Start-up Tax Exemption (SUTE). By transforming complex financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and client selection, helping you build a more profitable and resilient agency in Singapore.
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

