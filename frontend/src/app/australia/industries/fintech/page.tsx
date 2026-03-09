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
export default function AustraliaFintechIndustryPage() {
    const serviceName = "Fintech";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian fintechs involves complex transaction reconciliation, ensuring compliance with regulators like ASIC and AUSTRAC, managing client money, and preparing for rigorous AFSL audits.` },
        { title: "Who needs this service?", content: "Any Australian-based fintech, including payment processors, lending platforms, and digital asset companies, needing an audit-proof, compliant financial system." },
        { title: "What is the cost range?", content: "Given the high complexity, monthly costs typically start at AUD $4,000 for early-stage fintechs and can exceed AUD $15,000 for companies with significant transaction volume and regulatory oversight." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible in the fintech sector. The regulatory, compliance, and audit requirements demand a team of financial experts. Outsourcing is the only viable model." },
        { title: "Final Decision Summary", content: "Due to the extreme complexity and high-stakes regulatory environment of the Australian market, outsourcing to an accounting firm with deep fintech expertise is a fundamental requirement for survival and growth." }
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
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for fintech companies in Australia. We manage complex transaction reconciliation, ASIC/AUSTRAC compliance, and prepare for AFSL audits.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Fintech Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Australia Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth-Stage Australia Fintech Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
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
                <section className="bg-gradient-to-r from-gray-100 to-slate-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Build a compliant, audit-proof financial infrastructure. Specialized services for payments, lending, and digital asset companies in Australia.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's fintech sector is a rapidly growing and highly regulated industry. Companies operating in this space must navigate a complex web of oversight from bodies like the Australian Securities and Investments Commission (ASIC), the Australian Prudential Regulation Authority (APRA), and AUSTRAC (Australia's financial intelligence agency). For a fintech company, the finance function is not a simple back-office task; it is a core, regulated activity that is fundamental to its license to operate. From managing client funds and ensuring capital adequacy to implementing robust Anti-Money Laundering (AML) controls and facing mandatory audits, the financial and compliance burdens are substantial. Standard accounting practices are wholly insufficient. This guide details the essential, highly specialized accounting services that Australian fintech companies need to operate legally and build trust.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian fintech accounting services are designed for companies across this innovative sector:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Payment Service Providers:</strong> Companies providing payment solutions that need flawless reconciliation and compliance with the Payment Systems (Regulation) Act.</li>
                                <li><strong>Neobanks & Digital Lenders:</strong> Businesses holding an Australian Financial Services Licence (AFSL) or Australian Credit Licence (ACL) that must adhere to strict capital and reporting requirements.</li>
                                <li><strong>Digital Wealth & Asset Management Platforms:</strong> Robo-advisors and investment platforms that must comply with ASIC's strict rules on client asset segregation and reporting.</li>
                                <li><strong>Cryptocurrency & Digital Asset Exchanges:</strong> Exchanges registered with AUSTRAC that need to comply with AML/CTF obligations and navigate the complex tax treatment of digital assets.</li>
                                <li><strong>Reg-Tech Solution Providers:</strong> Companies building compliance tools who need to demonstrate the highest standards of financial control to their enterprise clients in the banking and finance sector.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Specialized fintech accounting is non-negotiable from the moment you decide to pursue a regulated financial activity in Australia. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>During AFSL or ACL Application:</strong> Your application to ASIC must include detailed financial projections and a comprehensive compliance framework, which are prepared by financial experts.</li>
                                <li><strong>When Handling Client Funds:</strong> The moment you control client assets, you fall under strict regulations that require daily reconciliation and reporting to prove solvency and proper handling of funds.</li>
                                <li><strong>Before Your First Financial Audit:</strong> Annual audits are mandatory for most AFSL holders. Preparing for this requires an audit-proof set of accounts from day one.</li>
                                <li><strong>During a Fundraising Round:</strong> Fintech investors conduct exceptionally deep due diligence on regulatory compliance, financial controls, and your business model's viability. Weaknesses here will instantly terminate a deal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>The cost of fintech accounting reflects the high level of expertise, risk management, and regulatory engagement required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Early-Stage Fintech (Pre-licensing):</strong> AUD $4,000 - $8,000 per month. This covers building financial models for the regulatory application and setting up the compliant chart of accounts.</li>
                                <li><strong>Licensed Growth-Stage Fintech:</strong> AUD $8,000 - $20,000+ per month. This involves a dedicated team for daily reconciliations, regulatory reporting to ASIC/APRA, and ongoing audit liaison.</li>
                                <li><strong>Virtual CFO for Fintech:</strong> Often integrated into higher-tier services, providing strategic guidance on regulatory capital, treasury management, and relationships with partner banks.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>In Australia's fintech sector, compliance failures are existential threats.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Regulatory Enforcement:</strong> ASIC can impose huge fines, restrict business activities, or revoke an AFSL entirely for breaches of the Corporations Act.</li>
                                <li>**Client Money Breaches:** Failure to properly segregate and protect client funds is one of the most serious offenses and can lead to immediate suspension and criminal proceedings against directors.</li>
                                <li><strong>AML/CTF Failures:</strong> Breaches of AUSTRAC's Anti-Money Laundering and Counter-Terrorism Financing rules can result in multi-million dollar penalties.</li>
                                <li><strong>Failed Audits:</strong> A qualified audit opinion can trigger a regulatory investigation and destroy the trust of investors, banking partners, and customers.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Building an in-house finance team with deep expertise in Australian financial regulations is a massive annual investment. Finding talent with the rare combination of skills in AASB accounting, ASIC regulations, and technology is incredibly difficult.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's fintech finance partners provides immediate access to a team that understands Australia's regulatory landscape. We provide institutional-grade controls, policies, and reporting frameworks that regulators and "Big Four" audit firms expect. We don't just "do the books"; we build and manage the entire compliant financial infrastructure for your business. For a fintech startup in Australia, this isn't a cost-saving measure—it's the only viable path to launching and scaling a regulated business successfully.
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

