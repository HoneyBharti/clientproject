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
export default function NetherlandsAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for agencies in the Netherlands involves managing project profitability, retainer-based revenue, multi-currency billing for EU clients, and ensuring compliance with BTW (VAT) and corporate tax laws.` },
        { title: "Who needs this service?", content: "Any Dutch-based creative, marketing, advertising, or PR agency serving as a hub for European operations." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in the Netherlands range from €600 for small agencies to €3,000+ for larger firms with complex client projects and international billing." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting leads to poor tracking of project profitability and non-compliance with Dutch tax laws. Outsourcing provides the expertise needed for accurate financial insights and regulatory adherence." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any Dutch agency." }
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
            "name": "Netherlands"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in the Netherlands. We handle project profitability, retainer accounting, multi-currency billing, and BTW (VAT) compliance for EU operations.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Netherlands Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "600",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Netherlands Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
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
                <section className="bg-gradient-to-r from-rose-50 to-orange-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow with financial services built for the Dutch creative and marketing sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The Netherlands, with its international outlook and creative culture, is a superb location for agencies in marketing, advertising, and professional services to establish a European hub. These firms thrive on project-based work, a model that carries unique financial complexities. True profitability is not just about revenue, but about the ability to accurately track costs per project, manage client retainers, and navigate the European BTW (VAT) system. Standard accounting software often lacks the granularity to determine which clients or projects are truly driving profit. Specialized agency accounting is therefore essential for building a sustainable and scalable agency in the Dutch market. This guide outlines the critical accounting and tax services agencies in the Netherlands need to succeed.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dutch agency accounting services are tailored for the specific needs of various service-based firms:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms managing client campaigns across the EU and needing to track profitability across different markets.</li>
                                <li><strong>Creative & Design Studios:</strong> Branding, web development, and content production agencies that must meticulously track project costs, including software licenses and freelance talent from various EU countries.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms handling retainers for multinational corporations and coordinating activities across Europe.</li>
                                <li><strong>Management & Business Consultancies:</strong> Professional service firms billing global clients based on time and materials and needing to ensure every project is profitable after accounting for all costs.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at several key growth points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Land Your First EU Client:</strong> This introduces the need to manage multi-currency billing (e.g., in Euros) and understand the BTW (VAT) rules for cross-border services within the EU.</li>
                                <li><strong>When You Hire Your First Employee:</strong> This triggers the need for compliant Dutch payroll, including wage tax withholding and social security contributions. Hiring international talent may involve the 30% ruling.</li>
                                <li><strong>When You Register for BTW (VAT):</strong> This requires meticulous, compliant bookkeeping and quarterly returns to the Belastingdienst (Dutch Tax Authority).</li>
                                <li><strong>When Managing Multiple Large Projects:</strong> As soon as you are juggling several significant clients, it becomes impossible to accurately gauge the profitability of each without a dedicated project accounting system.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>Outsourcing your agency's accounting provides access to specialized skills that enhance profitability and ensure compliance, at a fraction of the cost of a full-time finance team.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> €600 - €1,500 per month. This typically includes core bookkeeping, BTW returns, payroll, and basic project profitability reporting.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> €1,500 - €3,500 per month. This level adds more detailed KPI analysis, cash flow forecasting, and management of more complex client accounts.</li>
                                <li><strong>Established European Agency (20+ people):</strong> Custom pricing starting from €3,500+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies in the Netherlands face specific compliance risks that can result in significant penalties if not properly managed:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>BTW (VAT) Errors:</strong> Incorrectly applying BTW rules, especially the reverse charge mechanism for B2B services within the EU, can lead to significant penalties from the Belastingdienst.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can unknowingly lose money on high-profile projects, which can quickly drain cash reserves and threaten the business's viability.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from large advance payments before the service is rendered violates Dutch GAAP and can lead to misleading financial reports.</li>
                                <li><strong>Late KVK & Tax Filings:</strong> Missing deadlines for filing annual accounts with the Chamber of Commerce (KVK) or corporate tax returns with the Belastingdienst results in automatic penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders excel at creativity, client management, and strategy—not Dutch tax law or management accounting. Outsourcing the finance function to YourLegal allows you to focus on your core business while we provide the financial backbone for your growth.</p>
                            <p className="mt-4">
                                We implement cloud-based systems to provide real-time insights into your project profitability and overall financial health. Our team of experts manages your BTW and corporate tax compliance, ensuring you meet all deadlines and optimize your tax position. By transforming complex financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and client selection, helping you build a more profitable and resilient agency in the heart of Europe.
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

