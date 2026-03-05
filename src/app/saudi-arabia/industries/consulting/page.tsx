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
export default function SaudiConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for consulting firms in KSA involves managing project-based revenue, tracking billable hours, ensuring strict compliance with ZATCA's e-invoicing and VAT rules, and handling withholding tax on payments to foreign experts.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., management, IT, engineering) operating in Saudi Arabia, especially those advising on Vision 2030 projects." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in KSA typically range from SAR 5,000 for a solo consultant to SAR 20,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not an option. The complexities of ZATCA's regulations require specialist knowledge. Outsourcing ensures compliance and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For consultants in KSA, outsourcing accounting is a strategic necessity to manage tax compliance effectively and reclaim valuable billable hours." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in Saudi Arabia. We handle project accounting, ZATCA e-invoicing, VAT, and withholding tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Consulting Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Saudi Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Saudi Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "20000",
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
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for Saudi-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The implementation of Saudi Arabia's Vision 2030 has created an unprecedented demand for high-level consulting and professional services. Both government bodies and private enterprises are seeking world-class expertise to guide their transformation projects. For consultants, this represents a massive opportunity, but it also means navigating one of the world's most rigorous and rapidly evolving financial regulatory systems. Success depends on efficient project management, accurate time tracking, and, most importantly, flawless compliance with the Zakat, Tax and Customs Authority (ZATCA), particularly its strict e-invoicing and withholding tax rules. This guide details the specialized accounting and tax services essential for consulting firms to succeed in the Kingdom.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in the Saudi market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Management & Strategy Consultants:</strong> Firms advising clients on Vision 2030 initiatives, giga-projects, and corporate transformation.</li>
                                <li><strong>Engineering & Technical Consultants:</strong> Companies providing specialized expertise for the Kingdom's massive infrastructure and construction projects.</li>
                                <li><strong>IT & Digital Transformation Consultants:</strong> Tech advisors helping Saudi companies digitize their operations, who must comply with ZATCA's e-invoicing rules themselves.</li>
                                <li><strong>Foreign Consulting Firms:</strong> International firms that have established a Saudi LLC to serve the local market and need to manage withholding tax and transfer pricing.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client contract, professional accounting is mandatory. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Issue Your First Invoice:</strong> You must immediately comply with ZATCA's e-invoicing (Fatoorah) requirements, which demand a specific XML format and integration with ZATCA's systems.</li>
                                <li><strong>When You Register for VAT:</strong> Once your turnover exceeds SAR 375,000, VAT registration is mandatory. This requires compliant bookkeeping and quarterly VAT filings.</li>
                                <li><strong>When You Pay a Foreign Subcontractor:</strong> Making payments to non-resident experts or software providers triggers a withholding tax obligation, which must be calculated and remitted to ZATCA.</li>
                                <li><strong>At Year-End:</strong> For preparing audited financial statements (often required for license renewal) and filing your annual Zakat/Tax declaration with ZATCA.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Investing in outsourced accounting is a high-ROI decision for consultants, freeing up valuable billable hours and ensuring compliance in a high-penalty environment.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Small Firm:</strong> SAR 5,000 - SAR 12,000 per month. This typically covers ZATCA-compliant bookkeeping, VAT returns, and payroll for a small team.</li>
                                <li><strong>Medium-Sized Firm (5-15 people):</strong> SAR 12,000 - SAR 25,000 per month. This service level adds management of withholding tax, more detailed project profitability reporting, and cash flow forecasting.</li>
                                <li><strong>Larger Firms:</strong> Custom pricing starting at SAR 25,000+, which can include virtual CFO services for strategic financial planning and bidding on large government tenders.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Consulting firms in Saudi Arabia face severe compliance risks that can halt operations:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>ZATCA E-invoicing Penalties:</strong> Failure to issue a compliant e-invoice is a direct violation and carries immediate fines. This is a top priority for ZATCA enforcement.</li>
                                <li><strong>Withholding Tax (WHT) Violations:</strong> Not withholding the correct tax percentage on payments to foreign contractors or service providers is a common and costly mistake, leading to significant penalties.</li>
                                <li><strong>VAT Errors:</strong> Incorrectly calculating and filing VAT can lead to audits and substantial back-taxes and fines.</li>
                                <li><strong>MISA License Renewal Issues:</strong> The Ministry of Investment (MISA) often requires audited financial statements for license renewal. Non-compliant books can prevent you from getting a clean audit, jeopardizing your license.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your most valuable asset. Every hour spent wrestling with ZATCA's technical manuals or Saudi tax law is an hour you cannot bill. Outsourcing your accounting to YourLegal provides a team of local experts who live and breathe these regulations.</p>
                            <p className="mt-4">
                                We handle the entire compliance burden, from generating ZATCA-approved e-invoices to managing your VAT, withholding tax, and payroll obligations. We provide the financial data you need to accurately price projects and manage your cash flow. By taking the complex financial administration off your plate, we let you focus on what you do best: delivering world-class advice to your clients in one of the world's most exciting markets.
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
