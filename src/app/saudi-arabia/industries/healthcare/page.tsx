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
export default function SaudiHealthcareIndustryPage() {
    const serviceName = "Healthcare";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Saudi healthcare providers involves managing complex insurance billing (NPHIES, CCHI), ensuring MOH and SFDA compliance, tracking patient revenue, and navigating VAT rules for medical services.` },
        { title: "Who needs this service?", content: "Private hospitals, clinics, and health-tech startups in Saudi Arabia that need specialized financial management to navigate the Kingdom's rapidly modernizing healthcare system." },
        { title: "What is the cost range?", content: "Monthly costs for healthcare accounting in KSA range from SAR 8,000 for a small clinic to SAR 30,000+ for larger facilities with complex insurance billing and regulatory needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not advisable. The complexities of medical insurance billing and MOH/SFDA regulations require dedicated expertise. Outsourcing is essential for financial accuracy and compliance." },
        { title: "Final Decision Summary", content: "To manage the unique financial challenges of the Saudi healthcare system, including insurance billing and regulatory compliance, outsourcing to a healthcare-specialized accounting firm is a critical necessity." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for healthcare providers in Saudi Arabia. We manage insurance billing (NPHIES, CCHI), MOH/SFDA compliance, and VAT rules for medical services.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Healthcare Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Saudi Clinic Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "8000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Saudi Hospital Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "30000",
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
                <section className="bg-gradient-to-r from-cyan-50 to-sky-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate NPHIES billing, MOH compliance, and VAT rules with specialized financial services for the Kingdom's healthcare providers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Saudi Arabia's healthcare sector is undergoing a massive transformation as a central pillar of Vision 2030, with huge investments in privatization and digital health. For private providers, this presents a significant opportunity, but also requires navigating a highly complex regulatory and financial landscape. Success depends on mastering the intricate insurance billing system, complying with regulations from the Ministry of Health (MOH) and the Saudi Food and Drug Authority (SFDA), and adhering to specific VAT rules for medical services. Standard accounting practices are ill-equipped to handle these industry-specific challenges, often leading to significant revenue leakage and compliance risks. This guide details the essential, specialized accounting services that healthcare providers in Saudi Arabia need to ensure financial viability and regulatory adherence.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi healthcare accounting services are designed for a variety of providers within the Kingdom's health ecosystem:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Private Hospitals & Polyclinics:</strong> Medical centers that need to manage billing with a wide range of insurance providers like Bupa Arabia and Tawuniya, and comply with MOH licensing standards.</li>
                                <li><strong>Specialty Clinics:</strong> Dental, dermatology, and other specialist practices that require precise medical coding to maximize insurance reimbursements.</li>
                                <li><strong>Pharmaceutical & Medical Device Importers:</strong> Companies that need to manage SFDA registration, customs clearance, and complex supply chain finances.</li>
                                <li><strong>Health-Tech & Telemedicine Startups:</strong> Digital health platforms that must comply with data privacy laws, integrate with the NPHIES platform, and navigate VAT on digital services.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you receive your MOH license, specialized healthcare accounting is vital. It becomes mission-critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Contracting with Insurance Companies:</strong> This initiates the complex revenue cycle of claims submission through platforms like NPHIES (National Platform for Health and Insurance Exchange Services), managing approvals from the Council of Health Insurance (CHI), and handling claim rejections and resubmissions.</li>
                                <li><strong>You Hire Clinical & Administrative Staff:</strong> This triggers GOSI and Mudad payroll obligations, often under specific healthcare labor rules.</li>
                                <li><strong>You Face an MOH or Insurance Audit:</strong> Both regulators and insurance payers can audit your billing, clinical, and financial records. Clean, compliant books are essential for passing these inspections.</li>
                                <li><strong>You Need to Manage Cash Flow:</strong> With insurance payment cycles often taking 60-90 days or more, proactive cash flow forecasting and aggressive management of accounts receivable is crucial for survival.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Investing in professional healthcare accounting is an investment in maximizing your revenue and ensuring compliance in a tough regulatory environment. The cost reflects the high degree of specialization required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Clinic / Solo Practitioner:</strong> SAR 8,000 - SAR 15,000 per month. This covers specialized bookkeeping, payroll for a small team, and monthly revenue cycle reporting.</li>
                                <li><strong>Medium-Sized Polyclinic:</strong> SAR 15,000 - SAR 30,000 per month. This service level adds more detailed revenue cycle analysis, denial management reporting, and provider productivity tracking.</li>
                                <li><strong>Larger Hospitals & Health-Tech Companies:</strong> Custom pricing from SAR 30,000+, which can include full-scope virtual CFO services for strategic planning and financial modelling.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Saudi healthcare industry has significant financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Revenue Leakage from Claim Denials:</strong> Failure to properly manage the complex insurance claims process can lead to a significant portion of earned revenue never being collected.</li>
                                <li><strong>MOH & SFDA Non-Compliance:</strong> Breaches of healthcare regulations can lead to fines or, in severe cases, suspension of the facility's license.</li>
                                <li><strong>VAT Errors:</strong> While many core health services are zero-rated for VAT, some cosmetic procedures and goods are standard-rated. Incorrectly applying these rules can lead to penalties from ZATCA.</li>
                                <li><strong>Cash Flow Crises:</strong> The long payment cycles from insurance companies can create severe cash flow problems for a practice if not proactively managed with proper forecasting and credit control.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Healthcare professionals are experts in clinical care, not in the complexities of medical coding, CHI rules, and Saudi financial regulations. Hiring a full-time, experienced healthcare finance team is a major expense that is often beyond the reach of a growing practice.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal provides a cost-effective solution, giving you access to a team that specializes in the Saudi healthcare market. We understand the revenue cycle, the nuances of dealing with major insurers through the NPHIES platform, and the financial reporting required by the MOH. We implement robust systems to track your claims, analyze denials, and provide you with clear insights into your practice's financial performance. This allows you to focus on delivering excellent patient care, confident that your financial operations are optimized for maximum collections and full compliance.
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
