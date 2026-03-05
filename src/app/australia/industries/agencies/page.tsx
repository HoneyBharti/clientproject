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
export default function AustraliaAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for agencies in Australia involves managing project profitability, retainer-based revenue, multi-currency billing for international clients, and ensuring compliance with GST and company tax laws.` },
        { title: "Who needs this service?", content: "Any Australian-based creative, marketing, advertising, or PR agency that serves local or global clients and needs clear financial oversight to ensure profitability." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in Australia range from AUD $900 for small agencies to AUD $4,500+ for larger firms with complex client projects and international billing." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting leads to poor tracking of project profitability and GST errors. Outsourcing provides the expertise needed for accurate financial insights and regulatory adherence." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any Australian agency." }
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
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in Australia. We handle project profitability, retainer accounting, multi-currency billing, and GST compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Australia Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "900",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Australia Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4500",
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
                <section className="bg-gradient-to-r from-rose-50 to-orange-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow with financial services built for Australia's creative and marketing sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's sophisticated economy supports a thriving and competitive market for creative, marketing, and professional service agencies. These businesses thrive on strong client relationships and project-based work, a model that introduces unique financial complexities. True profitability isn't just about total revenue; it's about the ability to accurately track costs on a per-project basis, manage various client retainers, and navigate Australia's Goods and Services Tax (GST) system. Standard accounting software often lacks the granularity to determine which clients or projects are truly profitable. Specialized agency accounting is therefore essential for building a sustainable and scalable agency in the Australian market. This guide outlines the critical accounting and tax services that agencies in Australia require to succeed.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian agency accounting services are tailored for the specific needs of various service-based firms:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms that manage client ad spend and need to distinguish between their service revenue and pass-through costs.</li>
                                <li><strong>Creative & Design Studios:</strong> Branding, web development, and content production agencies that must meticulously track project costs, including software licenses and freelance talent fees.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms handling monthly retainers, event budgets, and media-related expenses, requiring transparent and accurate financial reporting for their clients.</li>
                                <li><strong>Management & Business Consultancies:</strong> Professional service firms billing clients based on time and materials and needing to ensure every hour is captured and every project is profitable.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at several key growth points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Land Your First Major Client:</strong> Managing a significant project or retainer requires a robust system for tracking costs, recognizing revenue correctly, and managing cash flow.</li>
                                <li><strong>When You Hire Your First Employee or Contractor:</strong> This triggers PAYG withholding and Superannuation obligations for employees, or requires careful management of contractor agreements to avoid compliance issues.</li>
                                <li><strong>When You Cross the GST Threshold:</strong> Once your turnover exceeds AUD $75,000, you must register for GST, issue tax invoices, and file regular Business Activity Statements (BAS).</li>
                                <li><strong>When You Work with International Clients:</strong> Billing in multiple currencies introduces foreign exchange complexity and requires adherence to specific GST rules for exported services.</li>
                                <li><strong>When You Want to Scale or Seek Investment:</strong> To grow sustainably, you need data-driven insights into your most profitable services and clients. Investors will demand detailed, accurate financial reports.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Outsourcing your agency's accounting provides access to specialized skills that enhance profitability and ensure compliance, at a fraction of the cost of a full-time finance team.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> AUD $900 - $2,000 per month. This typically includes core bookkeeping, BAS preparation, payroll, and basic project profitability reporting.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> AUD $2,000 - $5,000 per month. This level adds more detailed MIS reporting, cash flow forecasting, and management of more complex client accounts.</li>
                                <li><strong>Established Agency (20+ people):</strong> Custom pricing starting from AUD $5,000+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies in Australia face specific compliance risks that can result in significant penalties if not properly managed:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Non-Compliance:</strong> Incorrectly calculating GST liability, especially on mixed-supply invoices or international services, and late filing of BAS can lead to significant penalties and interest from the ATO.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can unknowingly lose money on high-profile projects, which can quickly drain cash reserves and threaten the business's viability.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from large advance payments before the service is rendered violates Australian Accounting Standards (AASB 15) and can lead to misleading financial reports.</li>
                                <li><strong>Employee vs. Contractor Misclassification:</strong> Incorrectly classifying an individual as a contractor can lead to significant liabilities for unpaid superannuation and other employee entitlements.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders excel at creativity, client management, and strategy—not Australian tax law or management accounting. Outsourcing the finance function to YourLegal allows you to focus on your core business while we provide the financial backbone for your growth.</p>
                            <p className="mt-4">
                                We implement cloud-based systems to provide real-time insights into your project profitability and overall financial health. Our team of experts manages your GST, payroll, and company tax compliance, ensuring you meet all deadlines and optimize your tax position. By transforming complex financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and client selection, helping you build a more profitable and resilient agency in Australia.
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
