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
export default function ConsultingIndustryPage() {
    const serviceName = "Consulting & Professional Services";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for US consulting firms involves managing project-based revenue, tracking billable hours, ensuring correct expense deductions (like home office and travel), and navigating self-employment taxes.` },
        { title: "Who needs this service?", content: "Independent consultants, freelancers, small to mid-sized agencies, and professional service firms (e.g., legal, IT, marketing) operating as an LLC or S-Corp in the USA." },
        { title: "What is the cost range?", content: "Monthly accounting costs for consulting businesses in the US typically range from $300 for a solo consultant to $1,500+ for a small firm with multiple consultants and projects." },
        { title: "DIY vs. Outsourcing?", content: "While DIY seems feasible, professionals often miss key deductions and spend valuable billable hours on admin. Outsourcing ensures tax optimization and frees up time to focus on clients." },
        { title: "Final Decision Summary", content: "For consultants and service professionals, outsourcing accounting is a strategic investment to maximize tax savings, ensure compliance, and reclaim billable time." }
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
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for consulting & professional service firms in the USA. We handle project accounting, expense deductions, and S-Corp tax strategies.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Consulting & Professional Services Accounting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solo Consultant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "300",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Consulting Firm Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
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
                <section className="bg-gradient-to-r from-purple-50 to-pink-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Maximize deductions, manage project profitability, and optimize your tax strategy. Financial services designed for US-based consultants and service firms.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Professionals in consulting, marketing, IT, and other service-based industries sell their expertise and time—a business model with unique financial characteristics. Unlike businesses that sell products, service firms don't have physical inventory. Instead, their primary assets are their people and their intellectual property. The financial health of a consulting or professional services firm depends on accurately tracking project profitability, managing cash flow between client payments, and maximizing tax-deductible expenses. Standard accounting often fails to provide the insights needed to effectively run a service business. This guide details the specialized accounting and tax services essential for consultants and professional service firms operating in the USA.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our accounting services are crafted for a wide range of knowledge-based businesses in the United States:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Independent Consultants & Freelancers:</strong> Solo practitioners, often operating as a single-member LLC, who need to separate business and personal finances and minimize their self-employment tax burden.</li>
                                <li><strong>Marketing & Creative Agencies:</strong> Firms managing multiple client retainers, project-based work, and pass-through costs like media buys or contractor fees.</li>
                                <li><strong>IT & Software Development Consultancies:</strong> Tech experts who need to track billable hours across various projects and manage software and hardware expenses.</li>
                                <li><strong>Boutique Professional Service Firms:</strong> Small law firms, architectural practices, and business advisory groups that require precise time tracking and project accounting to ensure profitability.</li>
                                <li><strong>Foreign Consultants Serving US Clients:</strong> International experts who have formed a US LLC to simplify billing and create a professional US presence.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>While basic bookkeeping is needed from day one, specialized professional service accounting becomes critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Take on Your First Client:</strong> You immediately need a system to issue invoices, receive payments, and track revenue.</li>
                                <li><strong>You Hire Your First Contractor or Employee:</strong> This triggers payroll obligations and the need to correctly classify workers as W-2 employees or 1099 contractors to avoid IRS penalties.</li>
                                <li><strong>Your Business Expenses Grow:</strong> As you invest in software, travel, marketing, and a home office, you need to meticulously track these expenses to maximize your tax deductions.</li>
                                <li><strong>You Consider S-Corp Election:</strong> For profitable LLCs, electing to be taxed as an S-Corporation can significantly reduce self-employment taxes, but it requires running "reasonable salary" payroll, a process that demands professional guidance.</li>
                                <li><strong>You Need to Understand Profitability:</strong> When you need to know which clients or projects are most profitable, project-based accounting becomes essential for strategic decision-making.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Outsourcing accounting for a service business is a high-ROI investment, freeing up valuable billable time and optimizing tax outcomes.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Solo Consultant / Freelancer:</strong> $300 - $700 per month. This typically covers core bookkeeping, expense management, and quarterly tax planning.</li>
                                <li><strong>Small Firm (2-10 people):</strong> $700 - $2,000 per month. This service level often includes payroll for a few employees and more detailed project profitability reporting.</li>
                                <li><strong>Established Agency:</strong> $2,000+ per month, which can include virtual CFO services for strategic planning, cash flow forecasting, and KPI analysis.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>Service-based businesses face unique compliance risks that can lead to significant financial penalties if not managed properly:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Worker Misclassification:</strong> Incorrectly treating an employee as a 1099 contractor is a major red flag for the IRS and Department of Labor, leading to back taxes, penalties, and interest.</li>
                                <li><strong>Missed Deductions:</strong> Failing to properly document and claim legitimate business expenses—like the home office deduction, vehicle mileage, or business meals—results in overpaying taxes.</li>
                                <li><strong>Self-Employment Tax Burden:</strong> Without proper tax planning, such as an S-Corp election, owners of pass-through entities (LLCs) can pay thousands in unnecessary self-employment taxes.</li>
                                <li><strong>Commingling Funds:</strong> Mixing business and personal expenses is the fastest way to "pierce the corporate veil," exposing your personal assets to business liabilities in a lawsuit.</li>
                                <li><strong>Inaccurate Revenue Recognition:</strong> Failing to correctly account for client deposits and deferred revenue can distort your financial picture and lead to cash flow problems.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>As a consultant or service professional, your time is your most valuable asset. Every hour spent on administrative tasks is an hour you can't bill to a client. Outsourcing your accounting function to YourLegal immediately frees up this time while providing access to a team of experts focused on tax optimization for service businesses.</p>
                            <p className="mt-4">
                                We go beyond basic bookkeeping. We help you structure your business for maximum tax efficiency, implement systems to track project profitability, and ensure you capture every possible deduction. Our integrated service combines technology for efficiency with human expertise for strategy, allowing you to focus on what you do best: delivering exceptional service to your clients. Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax compliance</Link> and <Link href="/usa/company-formation" className="text-blue-600 hover:underline">company formation</Link> services ensure your business is structured correctly from the start.
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
