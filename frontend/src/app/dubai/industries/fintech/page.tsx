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
export default function DubaiFintechIndustryPage() {
    const serviceName = "Fintech";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Dubai fintechs involves complex transaction reconciliation, ensuring compliance with regulators like DFSA (in DIFC) and FSRA (in ADGM), managing client money, and preparing for rigorous annual audits.` },
        { title: "Who needs this service?", content: "Any Dubai-based fintech, including payment processors, lending platforms, and digital asset companies, needing an audit-proof, compliant financial system." },
        { title: "What is the cost range?", content: "Given the high complexity, monthly costs typically start at AED 10,000 for early-stage fintechs and can exceed AED 30,000 for companies with significant transaction volume and regulatory oversight." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible in the fintech sector. The regulatory, compliance, and audit requirements demand a team of financial experts. Outsourcing is the only viable model." },
        { title: "Final Decision Summary", content: "Due to the extreme complexity and high-stakes regulatory environment of the UAE market, outsourcing to an accounting firm with deep fintech expertise is a fundamental requirement." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Fintech Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting and tax services for fintech companies in Dubai, UAE. We manage complex transaction reconciliation, DFSA/FSRA compliance, and prepare for rigorous annual audits.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Fintech Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Dubai Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "10000",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth-Stage Dubai Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "30000",
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
                <section className="bg-gradient-to-r from-gray-100 to-slate-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Build a compliant, audit-proof financial infrastructure. Specialized services for payments, lending, and digital asset companies in the UAE.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai has rapidly emerged as a leading global fintech hub, supported by progressive regulators and world-class financial free zones like the Dubai International Financial Centre (DIFC) and Abu Dhabi Global Market (ADGM). However, operating in this sector requires adherence to a rigorous regulatory framework. For a UAE fintech company, the finance function is not merely a back-office operation; it is a core, regulated activity. From managing client funds and ensuring capital adequacy to implementing robust Anti-Money Laundering (AML) controls and facing mandatory audits, the financial and compliance burdens are substantial. Standard accounting practices are wholly insufficient. This guide details the essential, highly specialized accounting services that fintech companies in Dubai need to operate legally and build trust.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UAE fintech accounting services are designed for companies across this innovative sector:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Payment Service Providers:</strong> Companies processing high-volume transactions that need perfect reconciliation and compliance with Central Bank of the UAE regulations.</li>
                                <li><strong>Lending Platforms & Digital Banks:</strong> Businesses managing loan books and deposits that must adhere to strict capital and reporting requirements set by regulators like the DFSA and FSRA.</li>
                                <li><strong>Digital Wealth & Asset Management:</strong> Robo-advisors and investment platforms in DIFC or ADGM that must comply with strict rules on client asset segregation and reporting.</li>
                                <li><strong>Crypto & Digital Asset Businesses:</strong> VARA-licensed exchanges, custodians, and blockchain companies in Dubai navigating the world's first bespoke regulatory framework for virtual assets.</li>
                                <li><strong>Reg-Tech Solution Providers:</strong> Companies building compliance tools who need to demonstrate the highest standards of financial control to their enterprise clients.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized fintech accounting is non-negotiable from the moment you decide to pursue a regulated financial activity in the UAE. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>During Regulatory Application:</strong> Your application to the DFSA, FSRA, or VARA must include detailed financial projections and a comprehensive compliance framework.</li>
                                <li><strong>When Handling Client Funds:</strong> As soon as you control client assets, you fall under strict rules that require daily reconciliation and reporting to prove solvency and segregation of funds.</li>
                                <li><strong>Before Your First Financial Audit:</strong> Annual audits are mandatory for most regulated fintechs. Preparing for this requires an audit-proof set of accounts from day one.</li>
                                <li><strong>During a Fundraising Round:</strong> Fintech investors conduct exceptionally deep due diligence on regulatory compliance, financial controls, and your business model's viability. Weaknesses here can terminate a deal instantly.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>The cost of fintech accounting reflects the high level of expertise, risk management, and regulatory engagement required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Fintech (Pre-authorisation):</strong> AED 10,000 - AED 20,000 per month. This covers building financial models for the regulatory application and setting up the compliant chart of accounts.</li>
                                <li><strong>Authorised Growth-Stage Fintech:</strong> AED 20,000 - AED 50,000+ per month. This involves a dedicated team for daily reconciliations, regulatory reporting, and ongoing audit liaison.</li>
                                <li><strong>Virtual CFO for Fintech:</strong> Often integrated into higher-tier services, providing strategic guidance on regulatory capital, treasury management, and relationships with partner banks.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>In the UAE's fintech sector, compliance failures are existential threats.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Regulatory Enforcement:</strong> The DFSA, FSRA, or VARA can impose huge fines, restrict business activities, or revoke a license entirely for breaches of their rulebooks.</li>
                                <li><strong>Client Money Breaches:</strong> Failure to properly segregate and protect client funds is one of the most serious offenses and can lead to immediate suspension and reputational collapse.</li>
                                <li><strong>AML Failures:</strong> Weak Anti-Money Laundering and KYC controls can result in severe penalties and the loss of banking relationships.</li>
                                <li><strong>Failed Audits:</strong> A qualified audit opinion can trigger a regulatory investigation and destroy the trust of investors, banking partners, and customers.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Building an in-house finance team with deep expertise in UAE financial regulations is a multi-million dirham annual investment. Finding talent with the rare combination of skills in IFRS accounting, DFSA/FSRA/VARA rules, and technology is incredibly difficult.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's fintech finance partners provides immediate access to a team that understands the UAE's regulatory landscape. We provide institutional-grade controls, policies, and reporting frameworks that regulators and "Big Four" audit firms expect. We don't just "do the books"; we build and manage the entire compliant financial infrastructure for your business. For a fintech startup in Dubai, this isn't a cost-saving measure—it's the only viable path to launching and scaling a regulated business successfully.
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

