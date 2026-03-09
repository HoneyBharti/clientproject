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
export default function IndiaConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for consulting firms in India involves managing project-based revenue, tracking billable hours, ensuring correct GST treatment on services (especially for international clients), and complying with TDS and income tax laws.` },
        { title: "Who needs this service?", content: "Independent consultants and professional service firms (e.g., IT, business, marketing) operating as a private limited company, LLP, or proprietorship in India." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in India typically range from ₹15,000 for a solo consultant to ₹75,000+ for a small firm with multiple consultants." },
        { title: "DIY vs. Outsourcing?", content: "DIY is risky due to complex GST and TDS rules. Outsourcing ensures tax optimization and frees up valuable time to focus on client work." },
        { title: "Final Decision Summary", content: "For India-based consultants, outsourcing accounting is a strategic investment to maximize tax efficiency, ensure compliance, and reclaim valuable billable time." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in India. We handle project accounting, GST on services, and TDS compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Consulting Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo India Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "India Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "75000",
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
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for India-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's service sector is a cornerstone of its economy, powered by millions of independent consultants, freelancers, and professional service firms. The business model of selling expertise and time is highly scalable but carries specific financial management challenges. Profitability depends on efficient time tracking, accurate project costing, and navigating India's complex, multi-layered tax system, which includes GST, TDS, and income tax. Standard bookkeeping is often insufficient to provide the insights needed to run a profitable service business while ensuring full compliance. This guide details the specialized accounting and tax services essential for consultants and professional service firms to succeed in India.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for knowledge-based businesses operating in the dynamic Indian market:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Freelancers:</strong> Solo professionals, often operating as proprietorships or LLPs, who need to manage their finances, optimize tax planning under presumptive schemes, and ensure GST/TDS compliance.</li>
                                <li><strong>Boutique Consulting Firms:</strong> Small firms that require tracking of project profitability, management of multi-currency billing for foreign clients, and compliant payroll for a small team.</li>
                                <li><strong>IT & Tech Consultants:</strong> Tech experts providing software development or tech advisory services, who must correctly apply GST on digital services and manage contractor payments.</li>
                                <li><strong>Marketing & PR Professionals:</strong> Individuals and small teams managing client retainers and project-based work, requiring clear financial reporting to demonstrate value and manage pass-through costs.</li>
                                <li><strong>Foreign Consultants with an Indian entity:</strong> International experts using an Indian company to serve the local market, who need help navigating FEMA regulations and cross-border tax issues.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From your first client contract, professional accounting is beneficial. It becomes absolutely critical at these key moments:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>When You Cross the GST Threshold:</strong> Once your turnover exceeds ₹20 lakhs (for services), GST registration is mandatory. This requires issuing compliant invoices and filing monthly returns.</li>
                                <li><strong>When You Receive Payments Subject to TDS:</strong> Many corporate clients will deduct TDS from your payments. You must track these deductions to claim credit when filing your income tax return.</li>
                                <li><strong>When You Hire Staff or Contractors:</strong> This triggers payroll obligations (PF, ESI) for employees and TDS compliance for contractor payments.</li>
                                <li><strong>When You Invoice International Clients:</strong> Correctly determining the 'place of supply' for services to foreign clients is crucial for GST compliance (exports are typically zero-rated but must be reported).</li>
                                <li><strong>At Year-End:</strong> For preparing financial statements and filing your annual income tax return, ensuring all deductions are claimed and tax liabilities are correctly calculated.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Investing in outsourced accounting for a consultant is a high-ROI decision, freeing up billable hours and ensuring tax compliance.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> ₹15,000 - ₹30,000 per month. This typically covers comprehensive bookkeeping, GST and TDS compliance, and income tax planning.</li>
                                <li><strong>Small Firm (2-10 people):</strong> ₹30,000 - ₹80,000 per month. This service level adds payroll for the team and more detailed management reporting on project profitability.</li>
                                <li><strong>Growing Firms (10+ people):</strong> Custom pricing starting at ₹80,000+, which can include more advanced forecasting and virtual CFO services.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses in India face unique compliance risks that can lead to significant financial penalties:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>GST Mismatches:</strong> The GST system relies on matching invoices between suppliers and customers (GSTR-2A/2B reconciliation). Errors can lead to loss of input tax credit and notices from the tax department.</li>
                                <li><strong>TDS Non-Compliance:</strong> Failure to deduct TDS where required, or late filing of TDS returns, attracts interest and penalties.</li>
                                <li><strong>Missed Deductions:</strong> Failing to properly document and claim all legitimate business expenses leads to a higher income tax liability.</li>
                                <li><strong>Commingling of Funds:</strong> Mixing business and personal expenses can create major issues during a tax audit and complicates the calculation of business profit.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant, your time is your most valuable asset. Every hour spent wrestling with GST portals or TDS rules is an hour you cannot bill. Outsourcing your accounting to YourLegal frees up this valuable time while providing access to a team of experts in Indian tax law.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your contracts and invoicing for optimal GST and TDS compliance. We manage all your monthly and quarterly filings, ensuring you are always compliant with the authorities. By taking the financial administration off your plate, we let you focus on what you do best: delivering exceptional service to your clients.
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

