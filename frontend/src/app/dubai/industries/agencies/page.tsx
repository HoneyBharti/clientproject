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
export default function DubaiAgenciesIndustryPage() {
    const serviceName = "Agencies";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for agencies in Dubai involves managing project profitability, retainer-based revenue, multi-currency billing for international clients, and ensuring compliance with UAE VAT and Corporate Tax laws.` },
        { title: "Who needs this service?", content: "Any Dubai-based creative, marketing, advertising, or PR agency, especially those in free zones like Dubai Media City, that serves regional or global clients." },
        { title: "What is the cost range?", content: "Monthly costs for specialized agency accounting in Dubai range from AED 2,500 for small agencies to AED 10,000+ for larger firms with complex client projects and international billing." },
        { title: "DIY vs. Outsourcing?", content: "DIY accounting leads to poor tracking of project profitability and non-compliance with UAE tax laws. Outsourcing provides the expertise needed for accurate financial insights and regulatory adherence." },
        { title: "Final Decision Summary", content: "To effectively measure profitability and manage cash flow in a project-based business, outsourcing accounting is a critical operational investment for any Dubai agency." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting and tax services for creative, marketing, and PR agencies in Dubai, UAE. We handle project profitability, retainer accounting, multi-currency billing, and UAE VAT & Corporate Tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Agency Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Dubai Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2500",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Dubai Agency Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "10000",
                        "priceCurrency": "AED",
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
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master project profitability, client retainers, and cash flow with financial services built for Dubai's creative and marketing sector.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai's dynamic and international business landscape has made it a magnet for creative, marketing, and professional service agencies. Operating from hubs like Dubai Media City or Dubai Design District, these firms serve a diverse client base across the region and the globe. However, this project-based model brings unique financial challenges. Success depends on accurately tracking project costs, managing multi-currency invoicing, and navigating the UAE's specific tax regulations, including VAT and the new Corporate Tax. Standard accounting software often fails to provide the granular insights needed to determine which clients and projects are truly profitable. Specialized agency accounting is essential for building a sustainable and scalable agency in the UAE. This guide outlines the critical accounting and tax services required for agencies to thrive in Dubai.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dubai agency accounting services are tailored for the specific needs of various service-based firms in the UAE:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Digital Marketing Agencies:</strong> SEO, PPC, and social media firms managing client ad spend and needing to track campaign profitability, especially when dealing with pass-through costs.</li>
                                <li><strong>Creative & Design Agencies:</strong> Branding, web development, and content production studios that require meticulous tracking of project costs, including software licenses and freelance talent fees.</li>
                                <li><strong>Public Relations (PR) Agencies:</strong> Firms managing monthly retainers and event budgets for clients across the GCC, requiring clear and transparent financial reporting.</li>
                                <li><strong>Management & Business Consultancies:</strong> Professional service firms that bill clients based on time and materials and need to ensure every project is profitable and cash flow is managed effectively.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While professional financial oversight is always beneficial, specialized agency accounting becomes mission-critical at several key growth points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Land Your First Major Client:</strong> Managing a significant project or retainer requires a robust system for tracking costs and recognizing revenue correctly.</li>
                                <li><strong>When You Hire Your First Employee or Contractor:</strong> This triggers the need for WPS-compliant payroll and end-of-service gratuity calculations, as well as managing payments to freelancers.</li>
                                <li><strong>When You Cross the VAT Threshold:</strong> Once your taxable turnover exceeds AED 375,000, you must register for VAT, which requires meticulous, FTA-compliant bookkeeping.</li>
                                <li><strong>When You Work with International Clients:</strong> Billing in multiple currencies (e.g., USD, EUR) introduces foreign exchange complexity that needs professional management.</li>
                                <li><strong>When You Want to Scale or Seek Investment:</strong> To grow sustainably, you need data-driven insights into your most profitable services and clients. Investors will demand these detailed financial reports.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>Outsourcing your agency's accounting provides access to specialized skills that enhance profitability and ensure compliance. Costs are typically based on the volume of transactions and complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Agency / Boutique Firm (1-5 people):</strong> AED 2,500 - AED 5,000 per month. This usually includes core bookkeeping, VAT returns, and basic project profitability reporting.</li>
                                <li><strong>Growing Agency (5-20 people):</strong> AED 5,000 - AED 12,000 per month. This level adds more detailed KPI analysis, cash flow forecasting, and management of more complex client accounts.</li>
                                <li><strong>Established Agency (20+ people):</strong> Custom pricing starting from AED 12,000+, often including fractional CFO services for strategic planning and financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Agencies in Dubai face specific compliance risks that can result in significant penalties if not properly managed:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>VAT Errors:</strong> Incorrectly applying VAT to services, especially for international clients, can lead to significant penalties from the Federal Tax Authority (FTA).</li>
                                <li><strong>Corporate Tax Non-Compliance:</strong> Failure to correctly register and file for the new 9% Corporate Tax can result in substantial fines. For free zone agencies, mismanaging income sources can lead to the loss of the 0% tax rate on 'Qualifying Income'.</li>
                                <li><strong>Project Unprofitability:</strong> Without accurate cost tracking, agencies can unknowingly lose money on high-profile projects, which can quickly drain cash reserves and threaten the business's viability.</li>
                                <li><strong>Improper Revenue Recognition:</strong> Recognizing revenue from large upfront retainers before the work is delivered violates IFRS standards and can lead to misleading financial reports.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Agency leaders excel at creativity, client management, and strategy—not IFRS accounting or UAE tax law. Outsourcing the finance function to YourLegal allows you to focus on your core business while we provide the financial backbone for your growth.</p>
                            <p className="mt-4">
                                We implement cloud-based systems to provide real-time insights into your project profitability and overall financial health. Our team of experts manages your VAT and Corporate Tax compliance, ensuring you meet all FTA deadlines and optimize your tax position. By transforming complex financial data into clear, actionable reports, we empower you to make smarter decisions on pricing, staffing, and client selection, helping you build a more profitable and resilient agency in Dubai.
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

