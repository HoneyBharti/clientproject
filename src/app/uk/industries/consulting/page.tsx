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
export default function UKConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK consulting firms involves managing project-based or retainer revenue, tracking billable hours, ensuring correct VAT treatment on services (especially for EU/international clients), and managing contractor payments under IR35.` },
        { title: "Who needs this service?", content: "Independent consultants, freelancers, and professional service firms (e.g., IT, business, marketing) operating as a Limited Company in the UK." },
        { title: "What is the cost range?", content: "Monthly accounting costs for UK consulting businesses typically range from £300 for a solo consultant to £1,500+ for a small firm with multiple consultants and projects." },
        { title: "DIY vs. Outsourcing?", content: "While DIY seems feasible for solo consultants, professionals often miss key deductions and misinterpret complex VAT rules. Outsourcing ensures tax optimization and frees up time to focus on clients." },
        { title: "Final Decision Summary", content: "For UK consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance with HMRC, and reclaim valuable billable time." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Consulting & Professional Services Accounting & Tax",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in the UK. We handle project accounting, VAT on services, and IR35 compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK Consulting Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo UK Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "300",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "UK Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
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
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for UK-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            In the United Kingdom, professionals in consulting, IT, marketing, and other service-based fields are pivotal to the economy. Their business model—selling expertise and time—creates unique financial management challenges. Success isn't just about client acquisition; it's about efficient time-tracking, accurate project costing, and navigating the UK's specific tax landscape, including VAT on services and rules around contractor employment (IR35). Standard bookkeeping often falls short, failing to provide the insights needed to run a profitable service business. This guide outlines the specialized accounting and tax services that are essential for consultants and professional service firms to thrive in the UK.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are tailored for knowledge-based businesses operating as Limited Companies in the UK:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Contractors:</strong> Solo professionals who need to manage their finances efficiently, optimize their tax position (e.g., salary vs. dividends), and comply with IR35 legislation.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms with a handful of consultants that need to track project profitability and manage payroll and expenses.</li>
                                <li><strong>IT & Software Development Consultants:</strong> Tech experts who must track billable hours, manage software expenses, and potentially claim R&D tax credits for innovative work.</li>
                                <li><strong>Marketing & PR Professionals:</strong> Individuals and small teams managing client retainers and project-based work, requiring clear financial reporting to demonstrate value.</li>
                                <li><strong>Non-Resident Consultants with a UK Company:</strong> Foreign experts using a UK Ltd company to contract with UK or European clients, who need to navigate cross-border VAT rules.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the first client engagement, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Register for VAT:</strong> Once your turnover exceeds the £90,000 threshold, you must start charging VAT and filing MTD-compliant quarterly returns, a process that requires meticulous bookkeeping.</li>
                                <li><strong>When You Hire Your First Employee/Contractor:</strong> This triggers PAYE payroll obligations for employees and requires an IR35 assessment for contractors to determine their employment status for tax purposes.</li>
                                <li><strong>When You Want to Take Profits Tax-Efficiently:</strong> Deciding on the optimal mix of salary and dividends to minimize Income Tax and National Insurance contributions requires professional tax planning.</li>
                                <li><strong>At Year-End:</strong> For preparing and filing your statutory annual accounts with Companies House and your CT600 Corporation Tax return with HMRC.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>Investing in outsourced accounting is a high-ROI decision for consultants, freeing up billable hours and ensuring tax efficiency.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> £300 - £600 per month. This typically includes bookkeeping, VAT returns, payroll for one director, and annual accounts/tax return.</li>
                                <li><strong>Small Firm (2-5 people):</strong> £600 - £1,500 per month. This service level often adds payroll for more employees and more detailed management reporting.</li>
                                <li><strong>Growing Firms (5+ people):</strong> Custom pricing starting at £1,500+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Consultants and service firms in the UK face several specific compliance risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>IR35 Misclassification:</strong> Incorrectly operating as a contractor "outside IR35" when HMRC deems you a "disguised employee" can lead to a significant bill for back taxes and penalties.</li>
                                <li><strong>VAT Errors:</strong> Incorrectly applying VAT rules, especially for services to international clients (which may be zero-rated), can lead to penalties from HMRC.</li>
                                <li><strong>Missed Deductions:</strong> Failing to claim all allowable business expenses (e.g., use of home as office, travel, professional subscriptions) results in a higher Corporation Tax bill.</li>
                                <li><strong>Late Filing Penalties:</strong> Companies House and HMRC both issue automatic, and often substantial, penalties for filing annual accounts or tax returns late.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your primary focus should be on delivering value to your clients, not on deciphering UK tax code. Outsourcing your accounting to YourLegal provides a dedicated team of UK finance professionals who understand the nuances of the service industry.</p>
                            <p className="mt-4">
                                We handle all your compliance needs, from MTD-compliant VAT returns to your annual statutory filings. More importantly, we provide proactive tax planning to ensure you are structured in the most efficient way possible, optimizing your salary and dividend strategy to reduce your overall tax burden. By taking the financial administration off your plate, we free you to do more billable work, making our service a direct contributor to your bottom line. Our services integrate seamlessly with our core <Link href="/uk/tax-compliance" className="text-blue-600 hover:underline">tax compliance</Link> and <Link href="/uk/company-formation" className="text-blue-600 hover:underline">company formation</Link> solutions.
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
