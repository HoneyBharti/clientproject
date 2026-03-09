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
export default function FintechIndustryPage() {
    const serviceName = "Fintech";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for US fintech companies involves complex transaction reconciliation, ensuring compliance with regulatory bodies (e.g., FinCEN, SEC), managing multi-currency flows, and undergoing rigorous annual audits.` },
        { title: "Who needs this service?", content: "Any US-based fintech company, including payment processors, lending platforms, robo-advisors, and cryptocurrency exchanges, that needs audit-proof, compliant financial systems." },
        { title: "What is the cost range?", content: "Given the high complexity and compliance burden, monthly costs typically start at $3,000 for early-stage fintechs and can exceed $10,000 for companies with significant transaction volume and regulatory oversight." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible in the fintech space. The regulatory, compliance, and audit requirements demand a team of financial experts. Outsourcing is the only viable model." },
        { title: "Final Decision Summary", content: "Due to the extreme complexity and high-stakes regulatory environment, outsourcing to an accounting firm with deep fintech expertise is a fundamental requirement for survival and growth." }
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
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for US fintech companies. We manage complex transaction reconciliation, FinCEN/SEC compliance, and prepare for rigorous annual audits.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Fintech Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth-Stage Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "10000",
                        "priceCurrency": "USD",
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
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Build a compliant, audit-proof financial infrastructure. Specialized services for payments, lending, and digital asset companies in the US.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The fintech industry exists at the high-stakes intersection of technology and finance. As a result, fintech companies face a dual challenge: they must be innovative enough to disrupt traditional finance while being rigorous enough to satisfy intense regulatory scrutiny. The financial operations of a fintech firm are not a back-office function; they are a core part of the product and a critical component of compliance. From reconciling millions of micro-transactions to implementing bank-grade security and anti-money laundering (AML) programs, fintech accounting is one of the most complex and demanding financial disciplines. For founders in this space, having a world-class finance function is not a choice—it is a matter of survival. This guide covers the essential, highly specialized accounting services that US fintech companies require.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our fintech accounting services are designed for companies operating across the financial technology landscape in the USA:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Payment Processors & Gateways:</strong> Companies that handle high-volume transactions and need perfect reconciliation and management of funds in transit.</li>
                                <li><strong>Lending Platforms & Neobanks:</strong> Businesses that manage loan portfolios, credit risk, and must comply with consumer lending and banking regulations.</li>
                                <li><strong>Investment & Wealth-Tech Platforms:</strong> Robo-advisors and brokerage apps that must adhere to SEC and FINRA regulations for handling client assets.</li>
                                <li><strong>Cryptocurrency & Digital Asset Companies:</strong> Exchanges, wallets, and DeFi protocols navigating the rapidly evolving regulatory framework for digital assets, including tax treatment and AML compliance.</li>
                                <li><strong>Reg-Tech & Compliance-as-a-Service:</strong> Companies providing regulatory solutions who must themselves demonstrate the highest standards of financial probity.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized fintech accounting is required from the very inception of the company. It's not a service you add later; it must be built into your operational DNA. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Process Your First Transaction:</strong> The moment you handle a user's money, you are subject to financial regulations and require flawless reconciliation.</li>
                                <li><strong>You Apply for a License:</strong> Whether it's a state money transmitter license or registering as a broker-dealer, regulators will demand a robust, documented financial compliance program.</li>
                                <li><strong>You Onboard Your First Partner Bank:</strong> Partner banks will conduct extensive due diligence on your financial controls and AML procedures before they will work with you.</li>
                                <li><strong>You Prepare for a SOC 2 or Financial Audit:</strong> These audits are standard in fintech and require months of preparation and immaculate financial records.</li>
                                <li><strong>You Raise Institutional Capital:</strong> VCs investing in fintech will scrutinize your financial controls and compliance framework more than in any other industry.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Accounting for fintech is one of the most expensive specializations due to the extreme complexity and high compliance stakes. The cost is a direct reflection of the expertise and risk management involved.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Fintech (pre-license, low volume):</strong> $3,000 - $8,000 per month. This covers setting up the core compliant accounting infrastructure and transaction reconciliation.</li>
                                <li><strong>Growth-Stage Fintech (licensed, high volume):</strong> $8,000 - $20,000+ per month. This involves a dedicated team managing daily reconciliation, regulatory reporting, and audit preparation.</li>
                                <li><strong>Virtual CFO for Fintech:</strong> Often included in higher-tier packages, providing strategic guidance on regulatory capital, treasury management, and relationships with banks and regulators.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The risks in fintech are existential. A single compliance failure can destroy the company overnight.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Regulatory Shutdown:</strong> Federal regulators (like FinCEN, SEC, OCC) or state financial regulators can revoke licenses or issue cease-and-desist orders for compliance failures, effectively ending the business.</li>
                                <li><strong>Loss of Banking Partners:</strong> If a partner bank loses confidence in your financial controls, they will terminate your account, cutting off your access to the financial system.</li>
                                <li><strong>AML/KYC Violations:</strong> Failure to implement and maintain a robust Anti-Money Laundering and Know-Your-Customer program can lead to massive fines and even criminal charges.</li>
                                <li><strong>Failed Audits:</strong> A failed financial or security (e.g., SOC 2) audit will prevent you from working with enterprise customers and financial partners.</li>
                                <li><strong>Transaction Reconciliation Failure:</strong> Inability to perfectly reconcile every user transaction and fund movement is a sign of poor control that will kill investor and regulator confidence.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Building an in-house finance and compliance team with the specific expertise for fintech is a multi-million dollar per year endeavor. It requires hiring a CFO, a controller, compliance officers, and accountants with experience in your specific vertical (payments, lending, etc.).</p>
                            <p className="mt-4">
                                Outsourcing to a specialized firm like YourLegal provides instant access to a battle-tested team that understands the fintech landscape. We have the pre-built systems, compliance templates, and relationships with auditors and regulators to build you an institutional-grade finance function from day one. We help you design your transaction flows for reconcilability, implement the necessary controls for audits, and produce the reports that regulators and VCs demand. For a fintech startup, outsourcing is not just about saving money; it's about leveraging the expertise needed to navigate the industry's immense barriers to entry and build a business that is trusted, scalable, and compliant by design.
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

