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
export default function IndiaHealthcareIndustryPage() {
    const serviceName = "Healthcare";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian healthcare providers involves managing complex insurance/TPA billing, ensuring compliance with clinical establishment laws, tracking patient revenue, and navigating specific GST rules for medical services and products.` },
        { title: "Who needs this service?", content: "Private hospitals, nursing homes, diagnostic labs, and large clinics in India that need specialized financial management to navigate the local healthcare ecosystem." },
        { title: "What is the cost range?", content: "Monthly costs for healthcare accounting in India range from ₹50,000 for a small clinic to ₹2,00,000+ for larger hospitals with complex insurance billing and regulatory needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not advisable. The complexities of medical billing, TPA management, and healthcare regulations require dedicated expertise. Outsourcing is essential for financial accuracy and compliance." },
        { title: "Final Decision Summary", content: "To manage the unique financial challenges of the Indian healthcare system, including insurance billing and regulatory compliance, outsourcing to a healthcare-specialized accounting firm is a critical necessity." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for healthcare providers in India. We manage complex insurance/TPA billing, clinical establishment compliance, and GST rules for medical services.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Healthcare Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small India Clinic Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "50000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large India Hospital Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "200000",
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
                <section className="bg-gradient-to-r from-cyan-50 to-sky-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Navigate complex insurance billing, TPA management, and GST rules with our specialized financial services for India's healthcare providers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           India's healthcare sector is a vast and complex ecosystem, characterized by a mix of private and public providers, a growing health insurance market, and a stringent regulatory framework. For private healthcare providers, financial viability depends on effectively managing the Revenue Cycle Management (RCM) process—navigating the often bureaucratic and slow process of billing and collections from a diverse range of insurance companies and Third-Party Administrators (TPAs). Furthermore, providers must adhere to the Clinical Establishments Act, manage patient data confidentially, and comply with India's specific GST rules for medical services and products. Standard accounting practices are not equipped to handle these industry-specific demands, frequently leading to significant revenue leakage and compliance risks. This guide details the essential, specialized accounting services that healthcare providers in India need to ensure financial stability and regulatory compliance.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India healthcare accounting services are designed for a variety of providers within the Indian health ecosystem:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Private Hospitals & Nursing Homes:</strong> Small to mid-sized hospitals that need to manage inpatient billing, TPA empanelment, and complex operational costs.</li>
                                <li><strong>Specialty Clinics & Polyclinics:</strong> Practices offering specialized services (e.g., cardiology, oncology, dental) that require precise medical coding and billing to maximize insurance reimbursements.</li>
                                <li><strong>Diagnostic Centers & Laboratories:</strong> Labs that manage a high volume of tests with varying rates for direct patients and hospital referrals, requiring efficient billing and collections.</li>
                                <li><strong>Health-Tech Startups:</strong> Digital health platforms and telemedicine providers that need to navigate GST on digital services and establish compliant billing systems for a pan-India user base.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you acquire your clinical establishment registration, specialized healthcare accounting is vital. It becomes mission-critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Get Empaneled with Insurance Companies/TPAs:</strong> This initiates the complex revenue cycle of claims submission, processing, denials, and appeals, which requires expert management.</li>
                                <li><strong>You Hire Clinical & Administrative Staff:</strong> This triggers compliant payroll, including professional tax and other statutory deductions.</li>
                                <li><strong>You Face an Insurance or Tax Audit:</strong> Both insurance companies and tax authorities can audit your billing and financial records. Clean, compliant books are essential for passing these inspections.</li>
                                <li><strong>You Need to Manage Cash Flow:</strong> With TPA payment cycles often taking 60-120 days, proactive cash flow forecasting and aggressive management of accounts receivable is crucial for survival.</li>
                                <li><strong>You Plan to Expand or Seek Funding:</strong> Potential investors or partners will conduct deep due diligence on your revenue cycle efficiency, collection rates, and overall profitability.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Investing in professional healthcare accounting is an investment in maximizing your revenue and ensuring compliance. The cost reflects the high degree of specialization required.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Clinic / Diagnostic Center:</strong> ₹50,000 - ₹90,000 per month. This covers specialized bookkeeping, payroll for a small team, and monthly financial reporting.</li>
                                <li><strong>Medium-Sized Hospital or Large Clinic:</strong> ₹90,000 - ₹2,50,000 per month. This service level adds detailed revenue cycle analysis, denial management reporting, and provider productivity tracking.</li>
                                <li><strong>Large Hospitals & Health-Tech Companies:</strong> Custom pricing from ₹2,50,000+, which can include full-scope virtual CFO services for strategic planning and financial modelling.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Indian healthcare industry has significant financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Revenue Leakage:</strong> Failure to properly manage insurance claim denials and appeals can lead to a significant portion of earned revenue (often 10-20%) never being collected.</li>
                                <li><strong>Regulatory Non-Compliance:</strong> Breaches of the Clinical Establishments Act or other healthcare regulations can lead to fines or, in severe cases, suspension of the facility's license.</li>
                                <li><strong>GST Errors:</strong> While core health services are exempt from GST, many other items (medicines, implants, cosmetic procedures) are not. Incorrectly applying these rules can lead to penalties from the GST department.</li>
                                <li><strong>Poor Cash Flow Management:</strong> The long payment cycles from TPAs can create severe cash flow problems if not proactively managed with proper forecasting.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Healthcare professionals are experts in patient care, not in the complexities of medical coding, TPA management, and Indian financial regulations. Hiring a full-time, experienced healthcare finance manager is a significant expense that is often beyond the reach of a growing practice.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal provides a cost-effective solution, giving you access to a team that specializes in the Indian healthcare market. We understand the revenue cycle, the nuances of dealing with major TPAs, and the financial reporting required by regulators. We implement robust systems to track your claims, analyze denials, and provide you with clear insights into your practice's financial performance. This allows you to focus on delivering excellent patient care, confident that your financial operations are optimized for maximum collections and full compliance.
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

