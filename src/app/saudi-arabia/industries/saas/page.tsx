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
export default function SaudiSaaSIndustryPage() {
    const serviceName = "Technology & IT Services";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for tech companies in KSA involves managing recurring revenue, ensuring ZATCA e-invoicing compliance for all sales, handling withholding tax on foreign software licenses, and navigating data residency laws.` },
        { title: "Who needs this service?", content: "Any technology or SaaS company with a Saudi entity serving the local market, especially those selling to government or large enterprises who require strict compliance." },
        { title: "What is the cost range?", content: "Monthly costs for specialized tech accounting in KSA range from SAR 6,000 for early-stage companies to SAR 20,000+ for larger firms with complex billing and compliance needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not an option. The mandatory ZATCA e-invoicing system and complex withholding tax rules require expert management. Outsourcing is essential." },
        { title: "Final Decision Summary", content: "To comply with Saudi Arabia's mandatory e-invoicing and tax laws while managing a subscription business model, outsourcing to a tech-focused accounting firm is a critical requirement." }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Technology & IT Services Accounting & Tax",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for Technology & IT companies in Saudi Arabia. We handle ZATCA e-invoicing for subscriptions, withholding tax, and data residency compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Technology Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Saudi Tech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "6000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Saudi Tech Accounting"
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
                <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate ZATCA e-invoicing for subscriptions, withholding tax, and data residency rules with our specialized financial services for Saudi tech companies.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Saudi Arabia's Vision 2030 is driving one of the world's most rapid and large-scale digital transformations, creating immense opportunities for technology and Software as a Service (SaaS) companies. However, selling technology in the Kingdom means operating within a unique and highly stringent regulatory framework. All B2B and B2C sales require ZATCA-compliant e-invoicing, payments for foreign software licenses are subject to withholding tax, and data localization laws add another layer of complexity. For SaaS companies with recurring revenue models, this environment presents significant accounting challenges that general bookkeeping services cannot handle. This guide details the essential, specialized accounting services that tech companies need to operate successfully and compliantly in Saudi Arabia.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi technology accounting services are built for companies navigating the Kingdom's digital economy:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>SaaS Companies:</strong> Local or international SaaS providers with a Saudi entity selling subscriptions to the KSA market.</li>
                                <li><strong>IT Service & Implementation Partners:</strong> Firms providing systems integration, cloud consulting, and managed IT services to Saudi government and enterprise clients.</li>
                                <li><strong>Software Development Companies:</strong> Businesses building custom software for local clients, requiring careful project accounting and milestone-based billing.</li>
                                <li><strong>E-learning & Health-Tech Platforms:</strong> Digital service providers who must comply with ZATCA's e-invoicing rules for every subscription or transaction.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized tech accounting is mandatory from your first invoice in Saudi Arabia. It becomes absolutely critical at these key stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Make Your First Sale:</strong> You are legally required to issue a ZATCA-compliant e-invoice. A simple PDF is not sufficient and will lead to penalties.</li>
                                <li><strong>When You Pay for Foreign Software:</strong> Payments to overseas software vendors (e.g., Microsoft, Google, AWS) are subject to withholding tax (WHT), which you must deduct and remit to ZATCA.</li>
                                <li><strong>When You Have Recurring Revenue:</strong> Correctly recognizing revenue from annual or monthly subscriptions over the contract term is essential for accurate financial reporting.</li>
                                <li><strong>When You Register for VAT:</strong> Once your turnover exceeds SAR 375,000, you must register for VAT and manage the complex rules for digital services.</li>
                                <li><strong>During a ZATCA Audit:</strong> The tax authority will scrutinize your e-invoicing records, VAT filings, and withholding tax compliance. Perfect records are your only defense.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>The cost of outsourced tech accounting in KSA reflects its critical role in ensuring legal compliance. The ROI comes from avoiding substantial penalties.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Tech Companies:</strong> SAR 6,000 - SAR 12,000 per month. This covers ZATCA-compliant bookkeeping, VAT returns, and management of basic withholding tax.</li>
                                <li><strong>Growth-Stage SaaS Companies:</strong> SAR 12,000 - SAR 25,000 per month. This includes more complex revenue recognition schedules, SaaS metric reporting (MRR, Churn), and more intensive WHT management.</li>
                                <li><strong>Mature Tech Enterprises:</strong> Custom pricing starting at SAR 25,000+, often including fractional CFO services for strategic planning and enterprise sales support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>For tech companies in Saudi Arabia, compliance risks are severe and strictly enforced:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>E-invoicing (Fatoorah) Violations:</strong> This is the most common and immediate risk. Failing to issue ZATCA-compliant e-invoices for every single sale can lead to significant fines.</li>
                                <li><strong>Withholding Tax (WHT) Penalties:</strong> Failure to withhold and remit tax on payments to foreign software and service providers is a major compliance failure with costly penalties.</li>
                                <li><strong>VAT Errors on Digital Services:</strong> Incorrectly applying VAT to digital services sold within KSA or to other GCC countries can lead to complex compliance issues and fines.</li>
                                <li><strong>Data Residency & Cybersecurity Laws:</strong> Non-compliance with data localization rules set by authorities like the Communications, Space & Technology Commission (CST) can lead to operational blocks.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>The technical and legal requirements of ZATCA's e-invoicing system, combined with complex withholding tax rules, make DIY accounting impossible for a tech company in Saudi Arabia. General accounting firms often lack the specific expertise in recurring revenue models and WHT on software royalties.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's tech finance partners provides a comprehensive, compliant solution from day one. We utilize ZATCA-approved systems to handle your e-invoicing for subscription billing automatically. Our team manages your WHT obligations on foreign software payments, ensuring you are fully compliant. We provide the financial reports and SaaS metrics you need to manage your growth and report to investors. By handling this complex infrastructure, we enable you to focus on product innovation and sales in one of the world's fastest-growing digital economies.
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
