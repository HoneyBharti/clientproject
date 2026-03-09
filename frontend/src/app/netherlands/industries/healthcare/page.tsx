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
export default function NetherlandsHealthcareIndustryPage() {
    const serviceName = "Healthcare";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for Dutch healthcare providers involves managing complex insurance billing (zorgverzekeraars), ensuring compliance with healthcare authorities (like NZa), and navigating specific BTW (VAT) exemptions for medical services.` },
        { title: "Who needs this service?", content: "Private medical clinics, dental practices, and health-tech startups in the Netherlands that need specialized financial management." },
        { title: "What is the cost range?", content: "Monthly costs for healthcare accounting in the Netherlands range from €800 for a small practice to €4,000+ for larger clinics with complex insurance billing and regulatory needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not advisable. The complexities of medical insurance billing and Dutch healthcare regulations require dedicated expertise. Outsourcing is essential for financial accuracy and compliance." },
        { title: "Final Decision Summary", content: "To manage the unique financial challenges of the Dutch healthcare system, including insurance billing and BTW complexities, outsourcing to a healthcare-specialized accounting firm is a critical necessity." }
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
            "name": "Netherlands"
        },
        "description": `Outsourced accounting and tax services for healthcare providers in the Netherlands. We manage complex insurance billing, NZa compliance, and BTW (VAT) exemptions for medical services.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands Healthcare Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Netherlands Practice Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Netherlands Clinic Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "EUR",
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
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate complex insurance billing, NZa compliance, and BTW rules with our specialized financial services for Dutch healthcare providers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           The Dutch healthcare system is known for its high quality and is based on a system of mandatory health insurance provided by private insurance companies (zorgverzekeraars). For private healthcare providers, financial success depends on effectively managing the revenue cycle within this system, adhering to regulations set by bodies like the Dutch Healthcare Authority (NZa), and navigating the specific BTW (VAT) rules that apply to medical services. Standard accounting practices are often inadequate for these industry-specific challenges, potentially leading to revenue loss and compliance issues. This guide outlines the essential accounting services that healthcare providers in the Netherlands need to operate successfully.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dutch healthcare accounting services are designed for various providers within the Netherlands' health ecosystem:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Private Medical & Dental Clinics:</strong> Physician- and dentist-owned practices that need to manage billing with a wide range of Dutch insurance companies.</li>
                                <li><strong>Specialist Medical Centers:</strong> Clinics offering specialized services that require precise billing codes (DBCs - Diagnose Behandeling Combinatie) to ensure correct reimbursement.</li>
                                <li><strong>Allied Health Professionals:</strong> Physiotherapists, psychologists, and other specialists who need to manage patient billing and practice expenses efficiently.</li>
                                <li><strong>Health-Tech & Digital Health Startups:</strong> Companies developing medical software or telehealth platforms that must comply with Dutch data privacy laws (AVG) and specific healthcare regulations.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you receive your AGB-code (a unique identification for healthcare providers), specialized accounting is vital. It becomes mission-critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Billing Insurance Companies:</strong> This initiates the complex revenue cycle of claims submission, managing deductibles (eigen risico), and handling claim rejections.</li>
                                <li><strong>You Hire Clinical & Administrative Staff:</strong> This triggers compliant Dutch payroll, including wage tax withholding and social security contributions.</li>
                                <li><strong>You Deal with BTW (VAT) Exemptions:</strong> Most medical services are exempt from BTW. However, some services (like cosmetic procedures) are not. Incorrectly applying these rules can lead to major penalties from the Belastingdienst (tax authority).</li>
                                <li><strong>You Need to Manage Practice Profitability:</strong> To make strategic decisions, you need to understand your revenue per patient, your collection rates from different insurers, and the profitability of various treatments.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>Investing in professional healthcare accounting is an investment in maximizing your revenue and ensuring compliance. The cost reflects the high degree of specialization required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Practice / Solo Practitioner:</strong> €800 - €1,800 per month. This covers specialized bookkeeping, payroll for a small team, and monthly financial reporting.</li>
                                <li><strong>Medium-Sized Clinic (multiple providers):</strong> €1,800 - €4,500 per month. This service level adds more detailed revenue cycle analysis and provider productivity tracking.</li>
                                <li><strong>Larger Practices & Health-Tech Companies:</strong> Custom pricing from €4,500+, which can include virtual CFO services for strategic financial planning.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Dutch healthcare industry has significant financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Revenue Leakage:</strong> Failure to properly manage the complex insurance claims process can lead to a significant portion of earned revenue never being collected.</li>
                                <li><strong>NZa & IGJ Non-Compliance:</strong> Breaches of regulations set by the Dutch Healthcare Authority (NZa) or the Health and Youth Care Inspectorate (IGJ) can lead to fines or sanctions.</li>
                                <li><strong>BTW (VAT) Errors:</strong> The rules for BTW exemption on medical services are complex. Incorrectly applying them can lead to significant penalties from the Belastingdienst.</li>
                                <li><strong>Poor Cash Flow Management:</strong> The payment cycles from insurers can create cash flow problems if not proactively managed with proper forecasting.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Healthcare professionals are experts in patient care, not in the intricacies of Dutch medical billing and financial regulations. Hiring a full-time practice manager with deep financial expertise is a significant expense for a growing practice.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal provides a cost-effective solution, giving you access to a team that specializes in the Dutch healthcare market. We understand the revenue cycle, the nuances of dealing with major insurers like Zilveren Kruis and VGZ, and the financial reporting required by regulators. We implement robust systems to track your claims, analyze denials, and provide you with clear insights into your practice's financial performance. This allows you to focus on delivering excellent patient care, confident that your financial operations are optimized for maximum collections and full compliance.
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

