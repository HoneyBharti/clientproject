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
export default function IndiaRealEstateIndustryPage() {
    const serviceName = "Real Estate";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian real estate involves managing project costs for developers, RERA compliance, tracking rental income for investors, and navigating complex GST and TDS rules on property transactions.` },
        { title: "Who needs this service?", content: "Real estate developers, property investors (landlords), and foreign investors dealing with property in India." },
        { title: "What is the cost range?", content: "Costs can range from ₹25,000/month for managing a small rental portfolio to ₹2,00,000+/month for large development projects requiring detailed project accounting." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of RERA regulations, GST on construction, and income tax laws for property make specialist outsourcing essential." },
        { title: "Final Decision Summary", content: "To effectively manage property performance, ensure regulatory compliance, and navigate India's complex property tax system, outsourcing real estate accounting is a necessary investment." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Real Estate Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for Indian real estate investors and developers. We handle RERA compliance, GST on construction, TDS, and project accounting.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Real Estate Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "India Rental Property Portfolio Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "25000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "India Real Estate Development Accounting"
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for Indian real estate developers and investors. We handle RERA, GST, TDS, and project accounting.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's real estate sector is a primary destination for global investors, known for its high rental yields and capital appreciation potential. TheReal Estate (Regulation and Development) Act (RERA), intricate GST rules on construction and rental income, and specific TDS provisions. Financial management in this sector requires more than just standard bookkeeping; it demands specialized project accounting for developers and detailed property-level tracking for investors. Given the high stakes and regulatory scrutiny, professional accounting is not just beneficial—it's essential for survival and profitability. This guide details the critical accounting and tax services required for success in the Indian real estate market.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India real estate accounting services are designed for various stakeholders in the property market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Real Estate Developers:</strong> Companies undertaking residential or commercial projects that need RERA-compliant accounting, project-wise cost tracking, and management of cash flows.</li>
                                <li><strong>Property Investors & Landlords:</strong> Individuals and companies holding a portfolio of rental properties who need to track rental income, manage expenses, and optimize their income tax liability.</li>
                                <li><strong>Contractors & Construction Companies:</strong> Businesses involved in the construction process that need to manage labor costs, material procurement, and complex GST input tax credit claims.</li>
                                <li><strong>Foreign Investors in Indian Real Estate:</strong> Non-resident individuals and foreign funds investing in Indian property, who need guidance on FDI policy, tax implications, and repatriation of funds.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you acquire land or property, specialized accounting is essential. It becomes non-negotiable at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>At Project Launch (for Developers):</strong> You must register the project with the state RERA authority, which requires detailed financial projections and a system for maintaining separate bank accounts for the project.</li>
                                <li><strong>During Construction:</strong> To track all development costs accurately, manage payments to contractors, and correctly account for GST on construction materials and services.</li>
                                <li><strong>When Receiving Rental Income:</strong> To properly account for rental income, claim deductions for property taxes and repairs, and comply with TDS provisions on rent.</li>
                                <li><strong>When Selling Property:</strong> To accurately calculate capital gains, manage TDS on the sale of property, and ensure all tax liabilities are met.</li>
                                <li><strong>During a Tax Audit:</strong> The real estate sector is frequently scrutinized by tax authorities. Clean, compliant, and well-documented financial records are your primary defense.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>The cost of professional real estate accounting is an investment in compliance and profitability. Pricing is based on the scale and complexity of the operations.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Rental Portfolio Management (small):</strong> ₹25,000 - ₹60,000 per month. This covers property-level bookkeeping, rent tracking, and income tax planning.</li>
                                <li><strong>Real Estate Development Projects:</strong> ₹75,000 - ₹2,50,000+ per month. This service involves comprehensive project accounting, RERA compliance reporting, and cash flow management.</li>
                                <li><strong>Large Portfolios & Developers:</strong> Custom pricing, often including virtual CFO services for strategic financial planning and fundraising.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The Indian real estate sector is fraught with compliance risks that can lead to severe financial and legal consequences:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>RERA Non-Compliance:</strong> Failure to adhere to RERA guidelines, such as diverting funds from the designated project account, can lead to heavy penalties and even imprisonment for developers.</li>
                                <li><strong>GST Violations:</strong> Incorrectly applying GST rates on under-construction vs. completed properties, or errors in claiming input tax credit, can result in significant tax demands from the authorities.</li>
                                <li><strong>TDS Defaults:</strong> Failure to deduct TDS on high-value property purchases, rent payments above the threshold, or payments to contractors leads to penalties and disallowance of expenses.</li>
                                <li><strong>Capital Gains Tax Miscalculation:</strong> Incorrectly calculating the cost of acquisition or failing to invest the gains as per tax-saving provisions can lead to a massive, unexpected tax bill.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Real estate finance and tax law in India is a highly specialized field. Most general accountants lack the deep expertise in RERA, GST on works contracts, and the specific income tax provisions related to property. Hiring a full-time expert is often not feasible for many investors and developers.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal's real estate specialists provides immediate access to this critical expertise. We ensure your projects are RERA-compliant, your GST and TDS obligations are met, and your taxes are optimized. For investors, we provide clear reporting on portfolio performance, maximizing your rental yield and ensuring a smooth process when it's time to sell. By handling the complex financial administration, we empower you to focus on what you do best: developing, buying, and managing valuable properties.
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
