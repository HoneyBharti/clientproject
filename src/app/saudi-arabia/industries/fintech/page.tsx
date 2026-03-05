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
export default function SaudiFintechIndustryPage() {
    const serviceName = "Fintech";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Saudi fintechs involves complex transaction reconciliation, ensuring compliance with the Saudi Central Bank (SAMA) and CMA, managing client money, and preparing for rigorous annual audits.` },
        { title: "Who needs this service?", content: "Any fintech company operating in KSA, including payment service providers, lending platforms, and digital banks, that needs an audit-proof, regulator-ready financial system." },
        { title: "What is the cost range?", content: "Given the high complexity, monthly costs typically start at SAR 15,000 for early-stage fintechs and can exceed SAR 50,000 for companies with significant transaction volume and regulatory oversight." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible in the fintech sector. The regulatory, compliance, and audit requirements demand a team of financial experts. Outsourcing is the only viable model." },
        { title: "Final Decision Summary", content: "Due to the extreme complexity and high-stakes regulatory environment of the Saudi market, outsourcing to an accounting firm with deep fintech expertise is a fundamental requirement." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for fintech companies in Saudi Arabia. We manage complex transaction reconciliation, SAMA/CMA compliance, and prepare for rigorous audits.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Fintech Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Saudi Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth-Stage Saudi Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "50000",
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
                <section className="bg-gradient-to-r from-gray-100 to-slate-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Build a compliant, audit-proof financial infrastructure. Specialized services for payments, lending, and digital asset companies in Saudi Arabia.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           As part of Vision 2030, Saudi Arabia is rapidly developing a world-class fintech ecosystem, overseen by the Saudi Central Bank (SAMA) and the Capital Market Authority (CMA). Operating in this highly regulated and strategic sector means adhering to rigorous standards of financial control, data security, and consumer protection. For a Saudi fintech company, the finance function is not a back-office support role; it is a core, regulated activity that is fundamental to its license to operate. From managing high-volume transaction reconciliation and safeguarding client funds to implementing robust Anti-Money Laundering (AML) programs and facing mandatory audits, the financial and compliance burdens are immense. Standard accounting practices are wholly insufficient. This guide details the essential, highly specialized accounting services that fintech companies in the Kingdom require.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi fintech accounting services are designed for companies at the forefront of financial innovation in the Kingdom:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Payment Service Providers (PSPs) & Digital Banks:</strong> Companies authorized by SAMA that handle payment processing, digital wallets, and banking services, requiring perfect reconciliation and safeguarding of funds.</li>
                                <li><strong>Crowdfunding & Lending Platforms:</strong> Platforms licensed by SAMA or the CMA that manage loan books, investor funds, and complex repayment schedules.</li>
                                <li><strong>Digital Brokerages & Wealth-Tech:</strong> Robo-advisors and investment platforms that must comply with strict CMA regulations on client asset management and reporting.</li>
                                <li><strong>Insurtech Companies:</strong> Startups disrupting the insurance market that need to manage premium collections, claims processing, and comply with SAMA's insurance regulations.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized fintech accounting is non-negotiable from the moment you conceive your business idea. It is a prerequisite for regulatory approval and becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>During SAMA or CMA License Application:</strong> Your application must include detailed financial projections, a business plan demonstrating financial viability, and a comprehensive compliance and risk management framework.</li>
                                <li><strong>When Handling Client Funds:</strong> The moment you control client assets, you fall under strict rules that require daily reconciliation, segregated accounts, and reporting to prove solvency.</li>
                                <li><strong>Before Your First Statutory Audit:</strong> Annual audits by a SAMA/CMA-approved auditor are mandatory. Preparing for this requires an audit-proof set of accounts from day one.</li>
                                <li><strong>During a Fundraising Round:</strong> Local and international investors will conduct exceptionally deep due diligence on your regulatory standing, financial controls, and compliance history. Any weakness can terminate a deal instantly.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>The cost of fintech accounting reflects the extreme level of expertise, risk management, and regulatory engagement required in the Saudi market.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Fintech (Pre-licensing):</strong> SAR 15,000 - SAR 35,000 per month. This covers building financial models for the regulatory application and setting up the compliant chart of accounts.</li>
                                <li><strong>Licensed Growth-Stage Fintech:</strong> SAR 35,000 - SAR 70,000+ per month. This involves a dedicated team for daily reconciliations, regulatory reporting to SAMA/CMA, and ongoing audit liaison.</li>
                                <li><strong>Virtual CFO for Fintech:</strong> Often integrated into higher-tier services, providing strategic guidance on regulatory capital, treasury management, and relationships with partner banks.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>In Saudi Arabia's fintech sector, compliance failures are existential threats.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Regulatory Enforcement:</strong> SAMA or the CMA can impose huge fines, restrict business activities, or revoke a license entirely for breaches of their regulations.</li>
                                <li><strong>Client Money Breaches:</strong> Failure to properly segregate and protect client funds is a severe offense that can lead to immediate suspension and legal action against directors.</li>
                                <li><strong>AML Failures:</strong> Weak Anti-Money Laundering and KYC controls can result in severe penalties and the loss of essential banking relationships.</li>
                                <li><strong>Failed Audits:</strong> A qualified audit opinion can trigger a regulatory investigation and destroy the trust of investors, banking partners, and customers, and may lead to license revocation.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Building an in-house finance team with deep expertise in Saudi financial regulations is a massive annual investment. Finding talent with the rare combination of skills in SOCPA accounting, SAMA/CMA regulations, and technology is incredibly difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's fintech finance partners provides immediate access to a team that understands the Saudi regulatory landscape. We provide the institutional-grade controls, policies, and reporting frameworks that regulators and "Big Four" audit firms expect. We don't just "do the books"; we build and manage the entire compliant financial infrastructure for your business. For a fintech startup in Saudi Arabia, this isn't a cost-saving measure—it's the only viable path to launching and scaling a regulated business successfully.
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
