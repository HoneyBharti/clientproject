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
export default function SingaporeRealEstateIndustryPage() {
    const serviceName = "Real Estate & Holding Companies";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `This involves managing rental income, tracking property expenses, ensuring compliance with property tax and stamp duty laws, and structuring investments through tax-efficient holding companies.` },
        { title: "Who needs this service?", content: "Any individual or company that owns, develops, or manages investment properties in Singapore, and international businesses using a Singapore entity to hold global assets." },
        { title: "What is the cost range?", content: "Costs can range from S$400/month for a small property portfolio to S$2,500+/month for larger portfolios or holding company structures with complex assets." },
        { title: "DIY vs. Outsourcing?", content: "DIY is very risky due to complex Singaporean property tax laws and the benefits of professional tax planning. Outsourcing to a specialist is crucial for compliance and tax efficiency." },
        { title: "Final Decision Summary", content: "To effectively manage property performance and leverage the tax advantages of a Singaporean holding structure, outsourcing accounting is a necessary investment." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting for Singapore real estate and holding companies. We manage rental income, property tax, and tax-efficient holding structures for APAC.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Real Estate & Holding Company Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Singapore Small Property Portfolio Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "400",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Singapore Holding Company Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2500",
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize your returns with specialized accounting for Singapore real estate investors and international holding structures.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Singapore's status as a bastion of political stability and economic prosperity makes it a prime destination for real estate investment and the establishment of global holding companies. The nation's strong rule of law, clear property rights, and favorable tax regime attract investors and multinational corporations looking to secure assets and manage regional operations. However, both activities require specialized financial and legal management to maximize returns and ensure compliance. For real estate, this means navigating property taxes and stamp duties. For holding companies, it involves careful structuring to benefit from Singapore's extensive network of double-taxation agreements and tax exemptions on foreign-sourced income. This guide covers the essential accounting services for both real estate investors and holding companies in Singapore.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our services cater to two distinct but related groups:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Real Estate Investors:</strong> Individuals and companies holding residential or commercial properties in Singapore for rental income or capital growth, including non-resident investors needing local management.</li>
                                <li><strong>International Holding Companies:</strong> Businesses that use a Singaporean Pte. Ltd. entity to hold shares in foreign subsidiaries (especially across APAC), intellectual property, or other global assets.</li>
                                <li><strong>Property Developers:</strong> Companies involved in the development and sale of residential or commercial projects in Singapore.</li>
                                <li><strong>Family Offices:</strong> High-net-worth families using a Singapore-based structure to manage their global wealth and investments.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment of acquisition or incorporation, specialized accounting is essential. It becomes critical at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Before Acquiring Property or Setting Up a Holding Structure:</strong> To advise on the optimal ownership structure to minimize taxes (like stamp duty) and liability.</li>
                                <li><strong>During Property Ownership:</strong> To track rental income, manage property taxes and maintenance fees, and account for all expenses to determine the true net yield.</li>
                                <li><strong>For Holding Companies:</strong> To document inter-company transactions, manage dividend flows, and ensure compliance with rules for tax exemptions on foreign-sourced dividends.</li>
                                <li><strong>At Year-End:</strong> To prepare financial statements required for Corporate Tax filing with IRAS and Annual Return filing with ACRA.</li>
                                <li><strong>When Selling an Asset:</strong> To accurately calculate any applicable capital gains tax (though Singapore has no general capital gains tax, certain property sales can be taxed as trading income) and manage stamp duties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>The cost of professional accounting reflects the expertise required to manage property portfolios or complex international holding structures.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Real Estate Portfolio (1-3 properties):</strong> S$400 - S$900 per month for bookkeeping, reporting, and tax planning.</li>
                                <li><strong>Simple Holding Company:</strong> S$600 - S$1,500 per month to manage compliance, dividend resolutions, and basic reporting.</li>
                                <li><strong>Large Portfolios or Complex Holding Structures:</strong> Custom pricing from S$2,500+, involving consolidated reporting and strategic international tax advisory.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Investing in Singapore property or using a holding company structure without expert financial management carries significant risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Tax Inefficiency:</strong> Failure to correctly structure a holding company can lead to the loss of tax exemptions on foreign dividends, resulting in double taxation.</li>
                                <li><strong>Incorrect Property Tax Filing:</strong> Not complying with IRAS requirements for property tax can lead to penalties. Similarly, incorrect payment of Buyer's or Seller's Stamp Duty is a major risk.</li>
                                <li><strong>ACRA Non-Compliance:</strong> Failure to file annual returns for the property-holding company can lead to fines and the company being struck off, potentially endangering the ownership of the asset.</li>
                                <li>**Substance Issues:** For holding companies, a lack of demonstrable management and control in Singapore ("substance") can lead to challenges from foreign tax authorities, nullifying tax treaty benefits.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>The legal and tax frameworks governing property and holding structures in Singapore are highly specialized. Outsourcing your accounting to YourLegal provides access to a team that understands these nuances. We ensure your property portfolio's finances are managed efficiently, maximizing your net yield after all taxes and expenses.</p>
                            <p className="mt-4">
                                For holding companies, we provide the critical expertise to structure your entity and manage its affairs in a way that maintains its eligibility for Singapore's attractive tax exemptions and treaty benefits. By handling the complex financial administration and compliance, we allow you to focus on managing your assets and growing your global business from a stable, secure, and tax-efficient base in Singapore.
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

