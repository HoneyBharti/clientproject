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
export default function IndiaFintechIndustryPage() {
    const serviceName = "Fintech";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian fintechs involves complex transaction reconciliation, ensuring compliance with regulators like the RBI, managing client money, and preparing for rigorous statutory and internal audits.` },
        { title: "Who needs this service?", content: "Any India-based fintech, including payment aggregators, lending platforms (NBFCs), and wealth-tech companies, needing an audit-proof, compliant financial system." },
        { title: "What is the cost range?", content: "Given the high complexity, monthly costs typically start at ₹1,50,000 for early-stage fintechs and can exceed ₹5,00,000 for companies with significant transaction volume and regulatory oversight." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible in the fintech sector. The regulatory, compliance, and audit requirements demand a team of financial experts. Outsourcing is the only viable model." },
        { title: "Final Decision Summary", content: "Due to the extreme complexity and high-stakes regulatory environment of the Indian market, outsourcing to an accounting firm with deep fintech expertise is a fundamental requirement." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for fintech companies in India. We manage complex transaction reconciliation, RBI compliance, and prepare for rigorous audits.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Fintech Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage India Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "150000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth-Stage India Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500000",
                        "priceCurrency": "INR",
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
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Build a compliant, audit-proof financial infrastructure. Specialized services for payments, lending, and digital asset companies in India.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's fintech revolution, driven by the Unified Payments Interface (UPI) and a massive digitally-native population, has made it one of the most dynamic financial technology markets in the world. However, operating in this sector means navigating a highly regulated environment overseen by the Reserve Bank of India (RBI), the Securities and Exchange Board of India (SEBI), and other bodies. For an Indian fintech company, the finance function is not a mere back-office task; it is a core, regulated activity. From managing complex transaction reconciliations and ensuring capital adequacy to implementing robust Anti-Money Laundering (AML) controls and facing mandatory statutory and internal audits, the financial and compliance burdens are immense. Standard accounting practices are wholly insufficient. This guide details the essential, highly specialized accounting services that fintech companies in India need to operate legally and build trust.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India fintech accounting services are designed for companies across this innovative sector:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Payment Aggregators & Gateways:</strong> Companies processing high-volume UPI, card, and net banking transactions that need flawless reconciliation and compliance with RBI's PA/PG guidelines.</li>
                                <li><strong>NBFCs & Digital Lending Platforms:</strong> Businesses managing loan books and deposits that must adhere to the RBI's strict capital adequacy, provisioning, and reporting requirements.</li>
                                <li><strong>Wealth-Tech & Investment Platforms:</strong> Robo-advisors and mutual fund distribution platforms that must comply with SEBI regulations on client asset segregation and reporting.</li>
                                <li><strong>Cryptocurrency Exchanges & Web3 Companies:</strong> Businesses navigating the evolving regulatory landscape for Virtual Digital Assets (VDAs), including complex TDS and income tax rules.</li>
                                <li><strong>Insurtech Companies:</strong> Startups partnering with insurers that need to manage commission revenue, policy administration, and comply with IRDAI regulations.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized fintech accounting is non-negotiable from the moment you decide to pursue a regulated financial activity in India. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>During Regulatory Application:</strong> Your application to the RBI for an NBFC or Payment Aggregator license must include detailed financial projections and a comprehensive compliance framework.</li>
                                <li><strong>When Handling Client Funds:</strong> The moment you control client assets or manage a payments flow, you fall under strict rules that require daily reconciliation and reporting to prove solvency and proper handling of funds.</li>
                                <li><strong>Before Your First Statutory Audit:</strong> Annual statutory audits are mandatory for all companies, but for fintechs, they are far more rigorous. Preparing for this requires an audit-proof set of accounts from day one.</li>
                                <li><strong>During a Fundraising Round:</strong> Fintech investors conduct exceptionally deep due diligence on regulatory compliance, financial controls, and your business model's viability. Weaknesses here will instantly terminate a deal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>The cost of fintech accounting reflects the high level of expertise, risk management, and regulatory engagement required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Fintech (Pre-licensing):</strong> ₹1,50,000 - ₹3,00,000 per month. This covers building financial models for the regulatory application and setting up the compliant chart of accounts.</li>
                                <li><strong>Licensed Growth-Stage Fintech:</strong> ₹3,00,000 - ₹7,00,000+ per month. This involves a dedicated team for daily reconciliations, regulatory reporting (e.g., to RBI), and ongoing audit liaison.</li>
                                <li><strong>Virtual CFO for Fintech:</strong> Often integrated into higher-tier services, providing strategic guidance on regulatory capital, treasury management, and relationships with partner banks.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>In India's fintech sector, compliance failures are existential threats.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Regulatory Enforcement:</strong> The RBI or SEBI can impose huge monetary penalties, restrict business activities, or revoke a license entirely for breaches of their directives.</li>
                                <li><strong>Client Money Breaches:</strong> Failure to properly segregate and protect client funds is a severe offense that can lead to immediate suspension and criminal proceedings against the directors.</li>
                                <li><strong>AML/KYC Failures:</strong> Weak Anti-Money Laundering and KYC controls can result in severe penalties under the Prevention of Money Laundering Act (PMLA).</li>
                                <li><strong>Failed Audits:</strong> A qualified audit opinion can trigger a regulatory investigation and destroy the trust of investors, banking partners, and customers.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Building an in-house finance team with deep expertise in Indian financial regulations is a multi-crore annual investment. Finding talent with the rare combination of skills in Ind AS accounting, RBI/SEBI regulations, and technology is incredibly difficult.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's fintech finance partners provides immediate access to a team that understands India's regulatory landscape. We provide institutional-grade controls, policies, and reporting frameworks that regulators and "Big Four" audit firms expect. We don't just "do the books"; we build and manage the entire compliant financial infrastructure for your business. For a fintech startup in India, this isn't a cost-saving measure—it's the only viable path to launching and scaling a regulated business successfully.
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
