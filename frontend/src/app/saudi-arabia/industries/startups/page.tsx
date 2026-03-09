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
export default function SaudiStartupsIndustryPage() {
    const serviceName = "Startups & Entrepreneurs";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Saudi startups focuses on lean financial management, cash flow forecasting, ensuring full compliance with ZATCA's e-invoicing and tax rules, and preparing financials for fundraising.` },
        { title: "Who needs this service?", content: "Any early-stage startup or entrepreneur, especially those with a MISA Entrepreneurial License, who needs a cost-effective way to manage finances while navigating the Kingdom's strict regulatory environment." },
        { title: "What is the cost range?", content: "Monthly costs range from SAR 5,000 for basic compliance bookkeeping and VAT to SAR 15,000+ for startups preparing for a seed or pre-seed funding round." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not an option in KSA. Founders must focus on product and growth, while outsourcing to experts is essential to handle mandatory e-invoicing, GOSI, and Zakat/tax compliance." },
        { title: "Final Decision Summary", content: "For startups in Saudi Arabia, outsourcing accounting is a critical investment to conserve founder time, ensure mandatory compliance with ZATCA, and build a scalable financial foundation." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting for startups and entrepreneurs in Saudi Arabia. We handle lean financial management, ZATCA e-invoicing, and investor-ready reporting to support your growth.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Startup Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Early-Stage Saudi Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Seed-Stage Saudi Startup Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
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
                <section className="bg-gradient-to-r from-teal-50 to-cyan-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            Accounting & Tax Services for {serviceName} in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Lean, compliant financial management for entrepreneurs launching their venture in the Kingdom, including those with a MISA Entrepreneurial License.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Saudi Arabia's burgeoning startup ecosystem, fueled by Vision 2030 and a growing venture capital scene, is attracting ambitious entrepreneurs from around the world. The government actively encourages innovation through initiatives like the MISA Entrepreneurial License. However, for an early-stage startup, founder time is the most precious resource, and the Kingdom's strict regulatory environment can be a major distraction. Financial management must be lean, efficient, and, above all, 100% compliant with the complex rules of ZATCA, GOSI, and other government bodies. This guide details the essential accounting services that startups and entrepreneurs need to build a strong foundation for success in Saudi Arabia.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our startup and entrepreneur services are designed for founders at the beginning of their journey in the Kingdom:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Holders of a MISA Entrepreneurial License:</strong> Innovative startups that have secured this special license and need to maintain compliance to keep its benefits.</li>
                                <li><strong>Bootstrapped Startups:</strong> Small, self-funded teams focused on building their MVP (Minimum Viable Product) who need cost-effective financial management to conserve cash.</li>
                                <li><strong>Pre-Seed & Seed Stage Startups:</strong> Companies raising their first capital from local VCs (like SVC) or angel investors and needing to establish clean, professional financials.</li>
                                <li><strong>Solo Founders & Consultants:</strong> Individuals using an LLC to operate their business and needing to ensure they are fully compliant with all ZATCA and MISA rules from day one.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>Even for a one-person company, professional financial oversight is critical from the start. It becomes non-negotiable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Receive Your MISA License & CR:</strong> You are legally required to maintain proper books of accounts from the moment your company is registered.</li>
                                <li><strong>You Issue Your First Invoice:</strong> You must immediately comply with ZATCA's e-invoicing (Fatoorah) mandate, which requires a compliant accounting system.</li>
                                <li><strong>You Hire Your First Employee:</strong> This triggers mandatory registration with GOSI (for social insurance) and Mudad (for wage protection), a complex process requiring local expertise.</li>
                                <li><strong>You Cross the VAT Threshold:</strong> Once your revenue exceeds SAR 375,000, you must register for VAT and begin filing quarterly returns.</li>
                                <li><strong>You Want to Raise Funding:</strong> Local investors will expect to see professionally prepared financial statements and full compliance with all government regulations.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>For startups, accounting services must be affordable but uncompromising on compliance. Our packages are designed to provide maximum value and peace of mind.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Basic Compliance Package (low volume):</strong> SAR 5,000 - SAR 9,000 per month. This covers essential ZATCA-compliant bookkeeping, VAT registration and filing, and preparation for your annual tax/Zakat return.</li>
                                <li><strong>Investor-Ready Package:</strong> SAR 9,000 - SAR 18,000 per month. This adds monthly management reports, cash flow forecasting, and preparation of a basic financial model for fundraising.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Startups in Saudi Arabia face severe compliance risks that can derail their journey before it even begins:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>ZATCA Penalties:</strong> Failure to comply with e-invoicing or VAT rules leads to immediate and substantial fines that can cripple a startup's limited runway.</li>
                                <li><strong>GOSI/Mudad Fines:</strong> Incorrectly managing employee registrations and payroll results in penalties from the Ministry of Human Resources.</li>
                                <li><strong>License Renewal Failure:</strong> MISA and the Ministry of Commerce can refuse to renew your licenses if you have outstanding compliance issues (e.g., unaudited financials), effectively shutting down your business.</li>
                                <li><strong>Inability to Raise Funds:</strong> Approaching investors with non-compliant books or pending government fines is the fastest way to be rejected for funding.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a startup founder in Saudi Arabia, your focus must be entirely on product, customers, and growth. The time required to understand and implement the Kingdom's complex and ever-changing financial regulations is a distraction you cannot afford. DIY accounting is not just risky; it's virtually impossible.</p>
                            <p className="mt-4">
                                Outsourcing your accounting to YourLegal is a strategic decision to de-risk your venture and buy back your time. We provide a professional, affordable finance function for your startup, powered by local experts who handle the complexities of ZATCA, GOSI, and Mudad on your behalf. Our monthly reports give you a clear view of your cash burn and financial position, enabling you to make smart decisions while ensuring your company is always compliant and investor-ready.
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

