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
export default function NetherlandsConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "Netherlands";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for Dutch consulting firms involves managing project-based revenue, tracking billable hours, ensuring correct BTW (VAT) treatment on services (especially for EU clients), and complying with corporate tax.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., IT, business, marketing) operating a Dutch B.V. to serve the EU market." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in the Netherlands typically range from €400 for a solo consultant to €2,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky due to complex BTW rules (reverse charge mechanism) and tax regulations. Outsourcing ensures tax optimization and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For Dutch-based consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance, and reclaim valuable billable time." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Consulting & Professional Services Accounting & Tax",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Netherlands"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in the Netherlands. We handle project accounting, BTW (VAT) on services, and corporate tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Netherlands Consulting Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Netherlands Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "400",
                        "priceCurrency": "EUR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Netherlands Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
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
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/netherlands/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for Dutch-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/netherlands/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The Netherlands' service-driven economy and strategic position in Europe make it an excellent base for consultants and professional service firms. The business model of selling expertise is highly effective, but it comes with specific financial management needs, particularly when operating across EU borders. Profitability depends on efficient time tracking, accurate project costing, and navigating the Dutch tax system, including BTW (VAT) rules for services. Standard bookkeeping is often insufficient to provide the strategic insights needed to run a profitable service business while ensuring full compliance with the Belastingdienst (Dutch Tax Authority). This guide details the specialized accounting and tax services essential for consultants and professional service firms to succeed in the Netherlands.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in the Dutch and wider EU market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Freelancers:</strong> Solo professionals operating through a Dutch B.V. who need to manage their finances efficiently and comply with local tax laws.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms in sectors like technology, marketing, or management that need to track project profitability and manage multi-currency billing for EU clients.</li>
                                <li><strong>IT & Tech Consultants:</strong> Tech experts serving a European client base who need to manage software expenses and correctly apply BTW on digital services.</li>
                                <li><strong>Non-Resident Consultants with a Dutch B.V.:</strong> Foreign experts using a Dutch company as a credible European entity to serve clients across the EU single market.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client contract, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Register for BTW (VAT):</strong> This requires compliant bookkeeping and the filing of quarterly BTW returns.</li>
                                <li><strong>When You Hire Staff:</strong> This triggers payroll obligations, including the withholding of wage tax and social security contributions.</li>
                                <li><strong>When Invoicing EU Clients:</strong> Correctly applying the BTW reverse-charge mechanism for B2B services is crucial for compliance.</li>
                                <li><strong>At Year-End:</strong> For preparing annual accounts for the KVK (Chamber of Commerce) and filing your corporate income tax return with the Belastingdienst.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the Netherlands">
                            <p>Investing in outsourced accounting is a high-ROI decision for consultants, freeing up billable hours and ensuring tax compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> €400 - €900 per month. This typically covers comprehensive bookkeeping, BTW returns, and preparation for annual filings.</li>
                                <li><strong>Small Firm (2-5 people):</strong> €900 - €2,500 per month. This service level adds payroll for the team and more detailed management reporting.</li>
                                <li><strong>Growing Firms (5+ people):</strong> Custom pricing starting at €2,500+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses in the Netherlands face unique compliance risks that can lead to financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>BTW Errors on EU Services:</strong> Incorrectly applying the reverse-charge mechanism or misidentifying the place of supply for services can lead to significant penalties from the Belastingdienst.</li>
                                <li><strong>Missed Deductions:</strong> Failing to properly document and claim all legitimate business expenses leads to a higher corporate income tax liability.</li>
                                <li><strong>Late Filing Penalties:</strong> The Belastingdienst and KVK both issue penalties for late filing of tax returns and annual accounts.</li>
                                <li><strong>Director Liability:</strong> In case of bankruptcy, directors can be held personally liable if the company's annual accounts were not filed correctly and on time.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your most valuable commodity. Every hour spent on administration is an hour you cannot bill. Outsourcing your accounting to YourLegal frees up this time while providing access to a team of experts in Dutch tax law and EU regulations.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your contracts and invoicing for optimal BTW compliance across Europe. We manage all your quarterly and annual filings, ensuring you are always compliant with the authorities. By taking the financial administration off your plate, we let you focus on what you do best: delivering exceptional service to your clients.
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

