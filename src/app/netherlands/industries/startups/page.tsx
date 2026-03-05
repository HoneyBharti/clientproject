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
export default function NetherlandsStartupsIndustryPage() {
    const serviceName = "Startups & Global Entrepreneurs";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for Dutch startups focuses on lean financial management, cash flow forecasting, ensuring compliance with KVK and Belastingdienst, and leveraging tax incentives like the WBSO (R&D credit) and the 30% ruling for talent.` },
        { title: "Who needs this service?", content: "Any early-stage startup or global entrepreneur using a Dutch B.V. as a launchpad for their European business, especially those seeking to raise venture capital or attract international staff." },
        { title: "What is the cost range?", content: "Monthly costs range from €500 for basic compliance bookkeeping to €2,500+ for startups preparing for a seed funding round and requiring investor-ready financials." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky. Founders need to focus on product and growth, not on navigating complex Dutch tax and corporate law. Outsourcing provides essential expertise and peace of mind." },
        { title: "Final Decision Summary", content: "For startups and entrepreneurs in the Netherlands, outsourcing accounting is a critical investment to conserve founder time, ensure compliance, and build a scalable financial foundation for European growth." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Startup & Entrepreneur Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Netherlands"
        },
        "description": `Outsourced accounting for startups and entrepreneurs in the Netherlands. We handle lean financial management, cash flow forecasting, and investor-ready reporting to support your growth.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Netherlands Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Seed-Stage Netherlands Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2500",
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Accounting & Tax Services for {serviceName} in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Lean, compliant financial management for global founders launching their venture from a Dutch B.V.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           The Netherlands' vibrant startup ecosystem, coupled with its strategic location and pro-business policies, makes it a top choice for global entrepreneurs launching a European venture. For these lean, ambitious startups, founder time is the most valuable resource. Financial management must be efficient, compliant, and forward-looking, providing the data needed to manage cash burn and prepare for future growth without creating an administrative headache. It's also about leveraging powerful Dutch incentives, like the WBSO for R&D and the 30% ruling for attracting talent. This guide details the essential accounting services that startups and entrepreneurs need to build a strong foundation for success in the Netherlands.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our startup and entrepreneur services are designed for founders at the start of their European journey:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Founders & Solopreneurs:</strong> Individuals using a Dutch B.V. to operate their consulting or e-commerce business across the EU.</li>
                                <li><strong>Global Entrepreneurs Relocating to the EU:</strong> Founders using the Dutch startup visa or other paths to make the Netherlands their personal and business base.</li>
                                <li><strong>Bootstrapped Startups:</strong> Small, self-funded teams focused on building their MVP (Minimum Viable Product) who need cost-effective financial management.</li>
                                <li><strong>Pre-Seed Startups:</strong> Companies raising their first capital from European angel investors or incubators and needing to establish clean, professional financials.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Even for a one-person company, professional financial oversight is critical from day one. It becomes essential when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Incorporate Your B.V.:</strong> You are legally required to maintain proper books of accounts from the moment your company is registered with the KVK.</li>
                                <li><strong>You Open a Business Bank Account:</strong> You must have a system to track all business income and expenses separately from your personal finances.</li>
                                <li><strong>You Apply for the WBSO or other grants:</strong> To benefit from R&D tax credits, you need to have proper project administration and time-tracking in place.</li>
                                <li><strong>You Want to Raise Funding:</strong> European investors will expect to see a solid business plan with clear financial projections.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>For startups, accounting services must be affordable yet robust. Our packages are designed to provide maximum value for early-stage companies.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Basic Compliance Package (low volume):</strong> €500 - €1,000 per month. This covers essential bookkeeping, BTW (VAT) returns, and preparation for annual corporate tax filings.</li>
                                <li><strong>Investor-Ready Package:</strong> €1,000 - €2,500 per month. This adds monthly management reports, cash flow forecasting, and preparation of a basic financial model for fundraising.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Even small startups in the Netherlands face significant compliance risks if they neglect their finances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Belastingdienst Penalties:</strong> The Dutch Tax Authority issues fines for late or incorrect BTW and corporate tax filings, which can be a painful hit to a startup's limited cash reserves.</li>
                                <li><strong>KVK Late Filing Fees:</strong> Failure to file annual accounts with the Chamber of Commerce on time results in penalties.</li>
                                <li><strong>Commingling of Funds:</strong> Mixing personal and business expenses is a common mistake that creates major compliance issues and "pierces the corporate veil," exposing personal assets.</li>
                                <li><strong>Inability to Raise Funds:</strong> Approaching investors with messy or non-existent financials is a clear sign of an inexperienced founder and is a fast track to rejection.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a startup founder, your focus must be 100% on building your product, talking to customers, and driving growth. Time spent on administrative tasks like bookkeeping is time taken away from what truly matters. DIY accounting inevitably leads to mistakes, stress, and missed opportunities.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal is a strategic decision to buy back your time and gain peace of mind. We provide a professional, affordable finance function for your startup. We handle all the complexities of Dutch tax law, ensuring you are fully compliant with the Belastingdienst and KVK. Our monthly reports give you a clear view of your cash burn and runway, enabling you to make smart decisions. By laying a solid financial foundation, we help you prepare for future growth and become a more attractive prospect for European investors.
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
