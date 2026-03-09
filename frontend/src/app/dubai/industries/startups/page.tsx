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
export default function DubaiStartupsIndustryPage() {
    const serviceName = "Startups & Global Entrepreneurs";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Dubai startups focuses on lean financial management, cash flow forecasting, ensuring compliance with VAT and Corporate Tax, and preparing investor-ready financials.` },
        { title: "Who needs this service?", content: "Any early-stage startup or solo entrepreneur using a Dubai Free Zone as a launchpad for their regional or global business, especially those seeking a residence visa." },
        { title: "What is the cost range?", content: "Monthly costs range from AED 2,000 for basic compliance bookkeeping to AED 7,000+ for startups preparing for a seed or Series A funding round." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky. Founders need to focus on product and growth, not on navigating complex UAE tax laws. Outsourcing provides essential expertise and peace of mind." },
        { title: "Final Decision Summary", content: "For startups and entrepreneurs in Dubai, outsourcing accounting is a critical investment to conserve founder time, ensure compliance, and build a scalable financial foundation." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting for startups and entrepreneurs in Dubai, UAE. We handle lean financial management, cash flow forecasting, and investor-ready reporting.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Dubai Startup Accounting"
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
                        "name": "Seed-Stage Dubai Startup Accounting"
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Accounting & Tax Services for {serviceName} in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Lean, compliant financial management for global founders launching their venture from a Dubai Free Zone.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Dubai's vibrant ecosystem, tax-friendly policies, and global connectivity make it a top choice for international entrepreneurs and early-stage startups. Setting up in a free zone provides a fast, efficient way to get a trade license, obtain a residence visa, and create a launchpad for a regional or global business. For these lean, ambitious ventures, founder time is the most precious resource. Financial management must be efficient, compliant, and forward-looking, providing the data needed to manage cash burn and prepare for future growth without creating an administrative burden. This guide details the essential accounting services that startups and global entrepreneurs need to succeed in Dubai.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our startup and entrepreneur services are designed for founders at the beginning of their journey:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Founders & Solopreneurs:</strong> Individuals using a free zone company to obtain a UAE residence visa and operate their personal service or consulting business.</li>
                                <li><strong>Bootstrapped Startups:</strong> Small teams that are self-funding their early product development and need lean, cost-effective financial management.</li>
                                <li><strong>Pre-Seed Startups:</strong> Companies that have raised a small friends-and-family round or are preparing to pitch angel investors and need clean, simple financials.</li>
                                <li><strong>Global Entrepreneurs:</strong> Founders from around the world who choose Dubai as their personal and business base of operations for its lifestyle and tax benefits.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Even for a one-person company, professional financial oversight is critical from day one. It becomes essential when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Form Your Company:</strong> You are legally required to maintain proper books of accounts from the moment your trade license is issued.</li>
                                <li><strong>You Open a Corporate Bank Account:</strong> You must have a system to track all business income and expenses separately from your personal finances.</li>
                                <li><strong>You Cross the VAT Threshold:</strong> As soon as your revenue exceeds AED 375,000, you must register for VAT and begin filing quarterly returns.</li>
                                <li><strong>You Prepare for Corporate Tax:</strong> All businesses must register for Corporate Tax. Accurate accounting is necessary to determine your taxable income and whether you qualify for the 0% free zone regime.</li>
                                <li><strong>You Want to Raise Funding:</strong> Even angel investors will want to see basic financial statements to understand your business model and early traction.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>For startups, accounting services must be affordable yet robust. Our packages are designed to provide maximum value for early-stage companies.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Basic Compliance Package (low volume):</strong> AED 2,000 - AED 3,500 per month. This covers essential bookkeeping, VAT registration and filing, and preparation for your annual Corporate Tax return.</li>
                                <li><strong>Investor-Ready Package:</strong> AED 3,500 - AED 7,000 per month. This adds monthly management reports, cash flow forecasting, and preparation of a basic financial model for fundraising.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Even small startups in Dubai face significant compliance risks if they neglect their finances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>FTA Penalties:</strong> The Federal Tax Authority issues fines for late VAT or Corporate Tax registration and filing, which can be a painful hit to a startup's limited cash reserves.</li>
                                <li><strong>Audit Requirements:</strong> Many free zones require companies to submit audited financial statements for license renewal. Failure to produce auditable books can jeopardize your company's legal status.</li>
                                <li><strong>Commingling of Funds:</strong> Mixing personal and business expenses is a common mistake that creates major compliance issues and makes it impossible to track business performance.</li>
                                <li><strong>Inability to Raise Funds:</strong> Approaching investors with messy or non-existent financials is a clear sign of an inexperienced founder and is a fast track to rejection.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a startup founder, your focus must be 100% on building your product, talking to customers, and driving growth. Time spent on administrative tasks like bookkeeping is time taken away from what truly matters. DIY accounting inevitably leads to mistakes, stress, and missed opportunities.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal is a strategic decision to buy back your time and gain peace of mind. We provide a professional, affordable finance function for your startup. We handle all the complexities of UAE tax law, ensuring you are fully compliant with the FTA. Our monthly reports give you a clear view of your cash burn and runway, enabling you to make smart decisions. By laying a solid financial foundation, we help you prepare for future growth and become a more attractive prospect for investors.
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

