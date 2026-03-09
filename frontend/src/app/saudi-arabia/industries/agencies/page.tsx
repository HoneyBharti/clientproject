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
export default function SaudiAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for agencies in Saudi Arabia involves managing project profitability, handling multi-currency billing for international brands, and ensuring strict compliance with ZATCA's e-invoicing, VAT, and withholding tax rules.` },
        { title: "Who needs this service?", content: "Any creative, marketing, advertising, or PR agency operating in KSA, especially those working with government entities or multinational clients who demand high levels of financial transparency." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in KSA range from SAR 7,000 for smaller agencies to SAR 25,000+ for larger firms managing major campaigns and international accounts." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting is not viable in KSA. The complexities of ZATCA's e-invoicing, withholding tax on foreign payments, and project accounting require specialist knowledge. Outsourcing is essential." },
        { title: "Final Decision Summary", content: "To effectively manage project profitability, ensure ZATCA compliance, and navigate the financial demands of Vision 2030 clients, outsourcing accounting is a critical investment for any agency in Saudi Arabia." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in Saudi Arabia. We handle project profitability, ZATCA e-invoicing, VAT, and withholding tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Saudi Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "7000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Saudi Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "25000",
                        "priceCurrency": "SAR",
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
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability and ZATCA compliance with financial services built for Saudi Arabia's dynamic creative and marketing sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Saudi Arabia's Vision 2030 has ignited a massive demand for world-class creative, marketing, and professional service agencies. Both government entities and a burgeoning private sector are seeking sophisticated partners to help them communicate and grow. However, operating in this high-opportunity environment means navigating a highly specific and rigorous financial landscape. Success depends on accurately tracking project costs, managing complex client contracts, and ensuring strict compliance with the Zakat, Tax and Customs Authority (ZATCA), particularly its e-invoicing (Fatoorah) and withholding tax regulations. Standard accounting practices are insufficient for the unique demands of an agency model in the Kingdom. This guide outlines the essential accounting services that agencies need to thrive in Saudi Arabia.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi agency accounting services are tailored for the needs of various service-based firms in the Kingdom:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Advertising & Marketing Agencies:</strong> Firms managing large campaign budgets and needing to differentiate between their service fees and third-party media costs.</li>
                                <li><strong>Creative & Branding Studios:</strong> Agencies developing creative assets and campaigns for Saudi clients, requiring meticulous tracking of project costs and freelance talent payments.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms managing retainers and event budgets for government and corporate clients, requiring transparent and compliant financial reporting.</li>
                                <li><strong>Management & Strategy Consultancies:</strong> Professional service firms advising on Vision 2030 projects, who need to ensure accurate billing and compliance with all local tax laws.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at several key stages in the KSA market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Win Your First Major Contract:</strong> Managing a significant government or corporate project requires a robust system for cost tracking, compliant invoicing, and cash flow management.</li>
                                <li><strong>When You Hire Staff or Use Foreign Contractors:</strong> This triggers GOSI (social insurance) and Mudad payroll obligations for local staff and requires managing withholding tax on payments to foreign contractors.</li>
                                <li><strong>When You Register for VAT:</strong> Once your turnover exceeds SAR 375,000, you must register for VAT and begin issuing ZATCA-compliant e-invoices for all transactions.</li>
                                <li><strong>When You Need to Understand Profitability:</strong> To determine if a client or project is truly profitable, you must be able to accurately allocate all associated costs, including staff time and overheads.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Outsourcing your agency's accounting provides access to specialized skills that are essential for operating in the KSA, delivering ROI through compliance and efficiency.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm:</strong> SAR 7,000 - SAR 15,000 per month. This typically includes ZATCA-compliant bookkeeping, VAT returns, payroll for a small team, and basic project reporting.</li>
                                <li><strong>Growing Agency:</strong> SAR 15,000 - SAR 30,000 per month. This level adds more detailed KPI analysis, cash flow forecasting, and management of more complex client accounts and withholding tax.</li>
                                <li><strong>Established Agency:</strong> Custom pricing starting from SAR 30,000+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies in Saudi Arabia face significant compliance risks that can result in heavy penalties and operational disruption:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>ZATCA E-invoicing Non-Compliance:</strong> Failure to issue invoices in the correct ZATCA-specified format is a primary compliance risk and can lead to immediate penalties.</li>
                                <li><strong>Withholding Tax Violations:</strong> Failing to withhold tax on payments to foreign contractors (e.g., freelance creatives, software providers) is a major red flag for ZATCA and carries significant penalties.</li>
                                <li><strong>VAT Errors:</strong> Incorrectly applying VAT to services or failing to file accurate quarterly returns can lead to substantial fines.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can easily under-price large contracts, leading to financial losses and cash flow problems.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders excel at creativity and client strategy, not at navigating ZATCA's intricate e-invoicing specifications or Saudi withholding tax law. Outsourcing the finance function to YourLegal allows you to focus on your core business while we ensure your financial operations are bulletproof.</p>
                            <p className="mt-4">
                                We implement ZATCA-approved accounting systems to provide real-time insights into your project profitability and ensure every invoice is compliant. Our local team of experts manages your VAT, withholding tax, and payroll compliance, ensuring you meet all deadlines and optimize your tax position. By transforming complex financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and business development, helping you build a more profitable and resilient agency in the heart of the Middle East's most exciting market.
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

