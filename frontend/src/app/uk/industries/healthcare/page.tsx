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
export default function UKHealthcareIndustryPage() {
    const serviceName = "Healthcare";
    const countryName = "UK";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for UK healthcare providers involves managing mixed income streams (NHS and private), navigating complex VAT rules for medical services (many are exempt), and ensuring CQC-compliant financial processes.` },
        { title: "Who needs this service?", content: "Private medical clinics, dental practices, care homes, and digital health startups operating in the UK that need specialized financial management." },
        { title: "What is the cost range?", content: "Monthly costs for healthcare accounting in the UK range from £800 for a small practice to £4,000+ for larger clinics or care homes with complex billing and regulatory needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not advisable. The complexities of NHS contracts, VAT exemptions, and CQC regulations require dedicated expertise. Outsourcing is essential for compliance and financial accuracy." },
        { title: "Final Decision Summary", content: "To manage the unique financial challenges of the UK healthcare system, including mixed public/private revenue and VAT complexities, outsourcing to a healthcare-specialized accounting firm is a critical necessity." }
    ];
    
     const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Healthcare Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "description": `Outsourced accounting and tax services for UK healthcare providers. We manage NHS/private billing, VAT exemption rules, and CQC-compliant financial processes.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UK Healthcare Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small UK Practice Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "GBP",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large UK Clinic Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
                <section className="bg-gradient-to-r from-cyan-50 to-sky-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/uk/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate NHS contracts, private billing, and complex VAT exemptions with our specialized financial services for UK healthcare providers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/uk/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           The UK's healthcare sector is a unique mix of public (NHS) and private provision, creating a complex financial and regulatory environment for providers. Financial success depends not just on delivering excellent patient care, but on expertly navigating contracts with NHS commissioning groups, managing private patient billing, and understanding the intricate VAT rules that apply to medical services. Furthermore, all providers are subject to inspection and regulation by the Care Quality Commission (CQC), which assesses whether services are well-led, including having sound financial management. Standard accounting is insufficient for these challenges. This guide details the essential, specialized accounting services that UK healthcare providers need to ensure compliance and financial viability.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our UK healthcare accounting services are designed for a range of providers:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Private GP & Dental Practices:</strong> Clinics that serve a mix of private-paying patients and those with private medical insurance.</li>
                                <li><strong>Specialist Medical Consultants:</strong> Individual doctors or small groups operating as a limited company who bill for private consultations and procedures.</li>
                                <li><strong>Care Homes & Domiciliary Care Agencies:</strong> Providers who manage funding from local authorities and private-paying residents, requiring robust financial controls to meet CQC standards.</li>
                                <li><strong>Digital Health & Health-Tech Startups:</strong> Companies developing medical software or telehealth platforms that need to understand VAT rules on digital services and may be eligible for R&D tax credits.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the first patient consultation or NHS contract, specialized healthcare accounting is essential. It becomes critical at these points:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Register with the CQC:</strong> The CQC application and subsequent inspections require evidence of financial viability and sound management.</li>
                                <li><strong>When You Begin Billing Insurance or NHS:</strong> This introduces the need for meticulous record-keeping to track payments, contractual adjustments, and outstanding claims.</li>
                                <li><strong>When Dealing with VAT:</strong> Most medical services provided by registered professionals are exempt from VAT. However, some services are not, and incorrectly charging (or failing to charge) VAT can lead to significant issues with HMRC. Understanding partial exemption is key.</li>
                                <li><strong>When Managing Clinician Payroll:</strong> Calculating pay for associate clinicians, who may be self-employed or on specific contracts, requires specialist payroll knowledge.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the UK">
                            <p>Investing in professional healthcare accounting is vital for managing financial risk and optimizing revenue. The cost reflects the high degree of specialization required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Practice / Solo Consultant:</strong> £800 - £2,000 per month. This typically covers specialized bookkeeping, payroll for a small team, and preparation of management accounts.</li>
                                <li><strong>Medium-Sized Clinic or Care Home:</strong> £2,000 - £4,500 per month. This service level adds more detailed analysis of payer mix, service line profitability, and CQC-ready financial reporting.</li>
                                <li><strong>Larger Providers & Health-Tech:</strong> Custom pricing from £4,500+, often including virtual CFO services for strategic planning and financial modelling.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The UK healthcare industry is fraught with unique financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>CQC Non-Compliance:</strong> A CQC inspection that finds poor financial management can lead to a negative rating, enforcement action, and even suspension of the service.</li>
                                <li><strong>VAT Errors:</strong> Incorrectly applying VAT exemption rules is a major risk. If HMRC determines you should have been charging VAT, you can be liable for years of back-taxes and penalties.</li>
                                <li><strong>Revenue Cycle Leakage:</strong> Failure to properly track and collect payments from insurance companies and patients can lead to significant and often permanent loss of revenue.</li>
                                <li><strong>Incorrect Associate Payouts:</strong> Miscalculating payments to self-employed associate clinicians can lead to disputes and legal challenges.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Healthcare professionals are trained to care for patients, not to be experts in VAT law or CQC financial regulations. Hiring a full-time practice manager with deep financial expertise is a major expense for most private providers.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal provides a cost-effective solution, giving you access to a team that specializes in the UK healthcare sector. We understand the difference between NHS and private revenue streams, the specific VAT rules that apply to medical services, and the financial reporting required by the CQC. We implement robust systems to track your revenue cycle and provide you with clear, insightful reports on your practice's financial health. This allows you to focus on delivering outstanding care, confident that your financial operations are compliant and optimized for success.
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

