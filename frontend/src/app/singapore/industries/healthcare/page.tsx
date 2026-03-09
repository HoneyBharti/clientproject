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
export default function SingaporeHealthcareIndustryPage() {
    const serviceName = "Healthcare";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Singapore healthcare providers involves managing complex insurance billing (MediSave, private insurers), ensuring compliance with MOH regulations, tracking patient revenue, and navigating GST rules for medical services.` },
        { title: "Who needs this service?", content: "Private medical clinics, dental practices, and digital health startups in Singapore that need specialized financial management to navigate the local healthcare system." },
        { title: "What is the cost range?", content: "Monthly costs for healthcare accounting in Singapore range from S$800 for a small practice to S$4,000+ for larger clinics with complex insurance billing and regulatory needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not advisable. The complexities of medical insurance billing and MOH regulations require dedicated expertise. Outsourcing is essential for financial accuracy and compliance." },
        { title: "Final Decision Summary", content: "To manage the unique financial challenges of the Singaporean healthcare system, including insurance billing and regulatory compliance, outsourcing to a healthcare-specialized accounting firm is a critical necessity." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting and tax services for healthcare providers in Singapore. We manage insurance billing cycles, MOH compliance, and GST rules for medical services.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Healthcare Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Singapore Practice Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Singapore Clinic Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
                        "priceCurrency": "SGD",
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
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate complex insurance billing, MOH compliance, and GST rules with our specialized financial services for Singapore's healthcare providers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Singapore's healthcare system is renowned for its quality and efficiency, a model that blends public and private services. For private healthcare providers, financial success is deeply intertwined with navigating the country's unique health financing system, which includes MediSave, MediShield Life, and a host of private insurers. Financial management goes beyond simple bookkeeping; it requires mastering the complexities of medical billing, managing collections from multiple payers, and adhering to the strict regulations set by the Ministry of Health (MOH). Furthermore, specific GST rules apply to medical services, adding another layer of complexity. Standard accounting practices are ill-equipped to handle these industry-specific demands, often leading to revenue leakage and compliance risks. This guide details the essential, specialized accounting services that healthcare providers in Singapore need to ensure financial viability and regulatory adherence.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Singapore healthcare accounting services are designed for a variety of providers within the nation's health ecosystem:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Private GP & Dental Clinics:</strong> Physician- and dentist-owned practices that need to manage a mix of insurance billing, MediSave claims, and direct patient payments.</li>
                                <li><strong>Specialist Medical Centers:</strong> Clinics offering specialized services (e.g., cardiology, aesthetics) that require precise coding and billing to maximize reimbursements from various insurance panels.</li>
                                <li><strong>Allied Health Professionals:</strong> Physiotherapists, chiropractors, and other specialists who need to manage patient billing and practice expenses efficiently.</li>
                                <li><strong>Health-Tech & Telemedicine Startups:</strong> Digital health platforms that need to navigate GST on digital services and establish compliant billing systems for a regional user base.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you acquire your license from the MOH, specialized healthcare accounting is vital. It becomes mission-critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Accepting Insurance or MediSave:</strong> This initiates the complex revenue cycle of claims submission, contractual adjustments, and collections, which requires expert management.</li>
                                <li><strong>You Hire Clinical & Administrative Staff:</strong> This triggers compliant payroll, including mandatory CPF contributions for local staff.</li>
                                <li><strong>You Face an MOH or Insurer Audit:</strong> Both regulators and payers can audit your billing and financial records. Clean, compliant books are essential for passing these inspections.</li>
                                <li><strong>You Need to Manage Cash Flow:</strong> With insurance payment cycles often taking 30-60 days, proactive cash flow forecasting and management of accounts receivable is crucial for practice stability.</li>
                                <li><strong>You Plan to Expand or Sell Your Practice:</strong> Potential investors or buyers will conduct deep due diligence on your revenue cycle efficiency, collection rates, and overall profitability.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>Investing in professional healthcare accounting is an investment in maximizing your revenue and ensuring compliance. The cost reflects the high degree of specialization required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Practice / Solo Clinician:</strong> S$800 - S$2,000 per month. This covers specialized bookkeeping, payroll for a small team, and monthly financial reporting.</li>
                                <li><strong>Medium-Sized Clinic (multiple providers):</strong> S$2,000 - S$4,500 per month. This service level adds more detailed revenue cycle analysis, denial management reporting, and provider productivity tracking.</li>
                                <li><strong>Larger Practices & Health-Tech Companies:</strong> Custom pricing from S$4,500+, which can include full-scope virtual CFO services for strategic planning and financial modelling.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Singaporean healthcare industry has significant financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Revenue Leakage:</strong> Failure to properly manage insurance claim denials and appeals can lead to a significant portion of earned revenue never being collected.</li>
                                <li><strong>MOH Non-Compliance:</strong> Breaches of healthcare regulations, including those related to patient data privacy (PDPA), can lead to fines or suspension of your clinic's license.</li>
                                <li><strong>GST Errors:</strong> While many core health services are exempt from GST, some related goods or cosmetic procedures are standard-rated. Incorrectly applying these rules can lead to penalties from IRAS.</li>
                                <li><strong>Poor Cash Flow Management:</strong> The payment lags from insurers can create severe cash flow problems for a practice if not proactively managed with proper forecasting.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Healthcare professionals are experts in patient care, not in the complexities of medical billing, CPF contributions, and Singaporean financial regulations. Hiring a full-time, experienced practice manager with deep financial expertise is a significant expense for a growing practice.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal provides a cost-effective solution, giving you access to a team that specializes in the Singapore healthcare market. We understand the revenue cycle, the nuances of dealing with major insurers and MediSave, and the financial reporting required by the MOH. We implement robust systems to track your claims, analyze denials, and provide you with clear insights into your practice's financial performance. This allows you to focus on delivering excellent patient care, confident that your financial operations are optimized for maximum collections and full compliance.
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

