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
export default function LogisticsIndustryPage() {
    const serviceName = "Logistics";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for the ${serviceName} industry in the ${countryName}?`, content: `Accounting for US logistics and trucking companies involves managing complex fleet depreciation, tracking multi-state fuel taxes (IFTA), handling driver payroll or contractor payments, and analyzing per-mile profitability.` },
        { title: "Who needs this service?", content: "Any US-based trucking company, freight brokerage, third-party logistics (3PL) provider, or last-mile delivery service that needs to manage assets and operations across state lines." },
        { title: "What is the cost range?", content: "Monthly costs for logistics accounting in the US can range from $800 for a small fleet to $5,000+ for larger operations with complex IFTA reporting and asset management needs." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not feasible. The complexities of IFTA, fleet-specific depreciation rules, and multi-state payroll make outsourcing to a logistics accounting specialist essential for compliance." },
        { title: "Final Decision Summary", content: "To ensure compliance with transportation regulations, accurately track profitability, and manage complex fleet costs, outsourcing logistics accounting is a necessary operational investment." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Logistics & Trucking Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for US logistics and trucking companies. We handle fleet depreciation, IFTA fuel tax reporting, and per-mile profitability analysis.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Logistics Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Fleet Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Fleet Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
                        "priceCurrency": "USD",
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
                <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} & Trucking Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master IFTA fuel tax reporting, fleet cost analysis, and multi-state compliance with specialized financial services for the US transportation industry.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The logistics and trucking industry is the circulatory system of the US economy, a high-volume, asset-intensive business that operates on tight margins and across state lines. Financial success in this sector depends on a granular understanding of variable costs, particularly fuel, maintenance, and driver pay. Furthermore, the industry is subject to a unique and complex web of multi-state regulations, most notably the International Fuel Tax Agreement (IFTA). General-purpose accounting is simply not equipped to handle these specific challenges. Specialized logistics accounting provides the tools to track per-mile profitability, manage complex asset depreciation, and ensure compliance with state and federal transportation authorities, turning financial data into a competitive advantage. This guide covers the essential accounting services that US logistics and trucking companies need to stay profitable and on the road.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our logistics accounting services are built for companies that move goods across the United States:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Owner-Operators & Small Fleets:</strong> Small trucking companies that need to manage IFTA reporting, track expenses per truck, and optimize their tax position.</li>
                                <li><strong>Medium to Large Carriers:</strong> Companies with larger fleets requiring sophisticated asset management, depreciation schedules, and detailed profitability analysis by lane and customer.</li>
                                <li><strong>Freight Brokerages:</strong> Intermediaries that need to accurately manage carrier payments, client billing, and gross margin on every load.</li>
                                <li><strong>Third-Party Logistics (3PL) Providers:</strong> Companies offering warehousing and fulfillment services that must track inventory for multiple clients and manage complex billing arrangements.</li>
                                <li><strong>Last-Mile Delivery Services:</strong> Businesses navigating the gig economy, needing to manage payments to a large number of independent contractors (1099s).</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment your first truck crosses a state line, specialized logistics accounting is necessary. It becomes indispensable when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Operate in Multiple States:</strong> This immediately triggers the requirement to register for IFTA and file quarterly fuel tax reports.</li>
                                <li><strong>You Purchase Your First Truck:</strong> You need to set up a depreciation schedule for this major asset and track all associated maintenance and operating costs.</li>
                                <li><strong>You Hire Drivers:</strong> Whether they are W-2 employees or 1099 contractors, you need a system for managing payroll, per-diem allowances, and settlements.</li>
                                <li><strong>You Need to Understand Profitability:</strong> To know if you're making money, you must be able to calculate your revenue-per-mile and cost-per-mile for each vehicle and each route.</li>
                                <li><strong>You Face a DOT or IFTA Audit:</strong> Transportation authorities regularly audit companies for compliance. Accurate, organized records for mileage, fuel purchases, and driver logs are your only defense against costly penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Outsourcing logistics accounting provides access to a specialized skillset crucial for compliance and profitability. Costs are typically based on fleet size and operational complexity.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Fleet (1-5 trucks):</strong> $800 - $1,800 per month. This generally includes bookkeeping, IFTA filing preparation, and driver settlement processing.</li>
                                <li><strong>Medium Fleet (6-25 trucks):</strong> $1,800 - $5,000 per month. This level adds more detailed fleet profitability reporting and asset management.</li>
                                <li><strong>Large Fleets or Brokerages:</strong> Custom pricing starting at $5,000+, often involving dedicated staff and virtual CFO services for strategic financial planning.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The logistics industry is heavily regulated, and non-compliance can take a company off the road.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>IFTA Violations:</strong> Failure to file quarterly IFTA returns accurately or on time can result in fines, revocation of your IFTA license, and trucks being impounded.</li>
                                <li><strong>DOT & FMCSA Non-Compliance:</strong> The Department of Transportation and Federal Motor Carrier Safety Administration enforce strict rules on driver logs and vehicle maintenance. Poor record-keeping can lead to failed safety audits and Out-of-Service orders.</li>
                                <li><strong>Incorrect Driver Classification:</strong> Misclassifying employee drivers as independent contractors is a major focus for the IRS and can lead to massive liabilities for back taxes and penalties.</li>
                                <li><strong>Inaccurate Cost Tracking:</strong> Without a precise understanding of your cost-per-mile, companies can unknowingly accept unprofitable loads, leading to financial losses and business failure.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Logistics finance is not general business accounting. It requires deep knowledge of transportation-specific regulations like IFTA, heavy vehicle use tax (HVUT), and asset depreciation rules. Finding an in-house accountant with this specific skillset is difficult and expensive.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's logistics finance partners gives you an instant, expert back-office. We manage your IFTA reporting, track every truck's profitability, and ensure your driver payments are handled correctly and compliantly. We provide the financial data you need to make smart decisions about routes, customers, and equipment purchases. By taking the complex financial compliance off your plate, we let you focus on the core of your business: delivering loads safely and efficiently.
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

