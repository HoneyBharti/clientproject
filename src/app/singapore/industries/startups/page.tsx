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
export default function SingaporeStartupsIndustryPage() {
    const serviceName = "Startups & Global Entrepreneurs";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Singapore startups focuses on lean financial management, cash flow forecasting, ensuring compliance with ACRA and IRAS, and leveraging tax incentives like the Start-up Tax Exemption (SUTE).` },
        { title: "Who needs this service?", content: "Any early-stage startup or solo entrepreneur using a Singapore Pte. Ltd. company as a launchpad for their regional or global business, especially those seeking an Employment Pass to relocate." },
        { title: "What is the cost range?", content: "Monthly costs range from S$400 for basic compliance bookkeeping to S$2,000+ for startups preparing for a seed funding round and requiring investor-ready financials." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky. Founders need to focus on product and growth, not on navigating complex Singaporean tax and corporate law. Outsourcing provides essential expertise and peace of mind." },
        { title: "Final Decision Summary", content: "For startups and entrepreneurs in Singapore, outsourcing accounting is a critical investment to conserve founder time, ensure compliance, and build a scalable financial foundation." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting for startups and entrepreneurs in Singapore. We handle lean financial management, cash flow forecasting, and investor-ready reporting to support your growth.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Singapore Startup Accounting"
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
                        "name": "Seed-Stage Singapore Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Accounting & Tax Services for {serviceName} in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Lean, compliant financial management for global founders launching their venture from Singapore.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Singapore's pro-business environment, political stability, and strategic location have made it a top choice for global entrepreneurs looking to launch a startup with APAC or worldwide ambitions. For these lean, ambitious ventures, founder time is the most valuable asset. Financial management must be efficient, compliant, and forward-looking, providing the data needed to manage cash burn, attract investment, and qualify for government incentives without creating an administrative bottleneck. This guide details the essential accounting services that startups and global entrepreneurs need to build a strong foundation for success in Singapore.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our startup and entrepreneur services are designed for founders at the very beginning of their journey in Singapore:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Founders & Solopreneurs:</strong> Individuals using a Pte. Ltd. company to operate their personal service business and establish a professional presence.</li>
                                <li><strong>Global Entrepreneurs Relocating to Singapore:</strong> Founders incorporating a company as a vehicle to apply for an Employment Pass (EP) and make Singapore their home base.</li>
                                <li><strong>Bootstrapped Startups:</strong> Small, self-funded teams focused on building their MVP (Minimum Viable Product) who need cost-effective, lean financial management.</li>
                                <li><strong>Pre-Seed Startups:</strong> Companies raising their first small round from angel investors or incubators and needing to establish clean, simple financials.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Even for a one-person company, professional financial oversight is critical from day one. It becomes essential when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Incorporate Your Company:</strong> You are legally required by ACRA to maintain proper books of accounts from the moment your company exists.</li>
                                <li><strong>You Open a Corporate Bank Account:</strong> You must have a system to track all business income and expenses separately from your personal finances.</li>
                                <li><strong>You Apply for an Employment Pass (EP):</strong> The Ministry of Manpower (MOM) will assess the viability of your business, which includes reviewing your business plan and financial projections.</li>
                                <li><strong>You Want to Qualify for the SUTE Scheme:</strong> To benefit from the Start-up Tax Exemption, which can save you significant tax in your first three years, you need accurate financial statements.</li>
                                <li><strong>You Want to Raise Your First Funding Round:</strong> Even angel investors will want to see basic financial statements to understand your business model and early traction.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>For startups, accounting services must be affordable yet robust. Our packages are designed to provide maximum value for early-stage companies.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Basic Compliance Package (low volume):</strong> S$400 - S$800 per month. This covers essential bookkeeping, expense tracking, and preparation for annual ACRA and IRAS filings.</li>
                                <li><strong>Investor-Ready Package:</strong> S$800 - S$2,000 per month. This adds monthly management reports, cash flow forecasting, and preparation of a basic financial model for fundraising.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Even small startups in Singapore face significant compliance risks if they neglect their finances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>ACRA & IRAS Penalties:</strong> Failure to file annual returns and tax returns on time results in automatic fines, which can be a painful hit to a startup's limited cash reserves.</li>
                                <li><strong>Commingling of Funds:</strong> Mixing personal and business expenses is a common mistake that creates major compliance issues and makes it impossible to track business performance accurately.</li>
                                <li><strong>Inability to Raise Funds:</strong> Approaching investors with messy or non-existent financials is a clear sign of an inexperienced founder and is a fast track to rejection.</li>
                                <li><strong>Jeopardizing Immigration Status:</strong> For founders on an Employment Pass, a non-compliant company can create issues with MOM and jeopardize your right to live and work in Singapore.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a startup founder, your focus must be 100% on building your product, talking to customers, and driving growth. Time spent on administrative tasks like bookkeeping is time taken away from what truly matters. DIY accounting inevitably leads to mistakes, stress, and missed opportunities.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal is a strategic decision to buy back your time and gain peace of mind. We provide a professional, affordable finance function for your startup. We handle all the complexities of Singaporean corporate and tax law, ensuring you are fully compliant with ACRA and IRAS. Our monthly reports give you a clear view of your cash burn and runway, enabling you to make smart decisions. By laying a solid financial foundation, we help you prepare for future growth and become a more attractive prospect for investors.
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
