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
export default function DubaiRealEstateIndustryPage() {
    const serviceName = "Real Estate & Holding Companies";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `This involves managing rental income, tracking property expenses, ensuring compliance with RERA and Ejari, and structuring investments through tax-efficient Free Zone holding companies.` },
        { title: "Who needs this service?", content: "Any individual or company that owns, develops, or manages investment properties in Dubai, and international businesses using a UAE entity to hold global assets." },
        { title: "What is the cost range?", content: "Costs can range from AED 2,000/month for a small property portfolio to AED 7,000+/month for larger portfolios or holding company structures with complex assets." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex UAE property laws and tax implications. Outsourcing to a specialist is crucial for compliance and tax efficiency." },
        { title: "Final Decision Summary", content: "To effectively manage property performance and leverage the tax advantages of a UAE holding structure, outsourcing accounting is a necessary investment." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Real Estate & Holding Company Accounting Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting for Dubai real estate and holding companies. We manage rental income, RERA/Ejari compliance, and tax-efficient Free Zone holding structures.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Real Estate & Holding Company Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dubai Small Property Portfolio Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dubai Holding Company Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "7000",
                        "priceCurrency": "AED",
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
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for Dubai real estate investors and international holding structures.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai's real estate market is a primary destination for global investors, known for its high rental yields and capital appreciation potential. Additionally, the UAE's favorable tax regime has made it a premier jurisdiction for establishing holding companies to manage international assets. Both activities require specialized financial and legal management to maximize returns and ensure compliance. For real estate, this means navigating regulations from the Real Estate Regulatory Agency (RERA) and managing property-specific finances. For holding companies, it involves careful structuring to benefit from the UAE's extensive double-taxation treaty network and the 0% Corporate Tax rate on 'Qualifying Income'. This guide covers the essential accounting services for both real estate investors and holding companies in Dubai.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our services cater to two distinct but related groups:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Real Estate Investors:</strong> Individuals and companies holding residential or commercial properties in Dubai for rental income or capital growth. This includes non-resident investors who need local management of their assets.</li>
                                <li><strong>International Holding Companies:</strong> Businesses that use a Dubai Free Zone entity (e.g., in DMCC, RAKEZ, or IFZA) to hold shares in foreign subsidiaries, intellectual property, or other global assets.</li>
                                <li><strong>Property Developers:</strong> Companies involved in the construction and sale of real estate projects in Dubai, requiring complex project accounting.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment of acquisition or incorporation, specialized accounting is essential. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Acquiring Property or Assets:</strong> To advise on the optimal ownership structure—whether personal, Mainland, or Free Zone—to minimize taxes and liability.</li>
                                <li><strong>During Property Ownership:</strong> To track rental income, manage service charges, and account for all expenses to determine the true net yield of your property.</li>
                                <li><strong>For Holding Companies:</strong> To document inter-company transactions and ensure compliance with the rules for 'Qualifying Income' to secure the 0% Corporate Tax rate.</li>
                                <li><strong>At Year-End:</strong> To prepare financial statements required for Corporate Tax filing and, for many free zone entities, for the mandatory submission of audited accounts for license renewal.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>The cost of professional accounting reflects the expertise required to manage property portfolios or complex holding structures.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Real Estate Portfolio (1-3 properties):</strong> AED 2,000 - AED 4,000 per month for bookkeeping and financial reporting.</li>
                                <li><strong>Simple Holding Company:</strong> AED 3,000 - AED 5,000 per month to manage compliance and basic reporting.</li>
                                <li><strong>Large Portfolios or Complex Holding Structures:</strong> Custom pricing from AED 7,000+, involving consolidated reporting and strategic tax advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Investing in Dubai real estate or using a holding company structure without expert financial management carries significant risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Corporate Tax Liability:</strong> Incorrectly structuring a holding company or mixing it with Mainland business can lead to profits being subject to the 9% Corporate Tax rate. For property, rental income is subject to Corporate Tax.</li>
                                <li><strong>RERA Non-Compliance:</strong> Failure to comply with RERA regulations for managing rental properties, including registering leases via Ejari, can lead to disputes and fines.</li>
                                <li><strong>VAT on Commercial Property:</strong> The sale or lease of commercial property is subject to 5% VAT. Incorrect handling can lead to significant penalties from the FTA.</li>
                                <li><strong>Audit Failure:</strong> For holding companies in free zones that require an audit, poor record-keeping can lead to a qualified audit report, jeopardizing the renewal of your trade license.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>The legal and tax frameworks governing property and holding structures in the UAE are highly specialized. Outsourcing your accounting to YourLegal provides access to a team that understands these nuances. We ensure your property portfolio's finances are managed efficiently, maximizing your rental yield after expenses.</p>
                            <p className="mt-4">
                                For holding companies, we provide the critical expertise to structure your entity and manage its transactions in a way that maintains its eligibility for the 0% Corporate Tax rate on foreign income and capital gains. By handling the complex financial administration, we allow you to focus on managing your assets and growing your global business from a stable, tax-efficient base in Dubai.
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
