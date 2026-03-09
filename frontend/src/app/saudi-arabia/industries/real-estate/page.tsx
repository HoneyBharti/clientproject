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
export default function SaudiRealEstateIndustryPage() {
    const serviceName = "Construction & Real Estate";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for the Saudi construction industry involves complex project accounting, managing subcontractor payments and withholding tax, ensuring compliance with Real Estate General Authority (REGA) rules, and navigating specific VAT treatments for real estate.` },
        { title: "Who needs this service?", content: "Any local or foreign construction company, contractor, or real estate developer involved in Saudi Arabia's giga-projects (like NEOM) or general infrastructure development." },
        { title: "What is the cost range?", content: "Costs are project-based and range from SAR 15,000/month for smaller projects to SAR 50,000+/month for large-scale developments requiring detailed project cost control and reporting." },
        { title: "DIY vs. Outsourcing?", content: "DIY is impossible. The complexities of project accounting, contract management, and Saudi tax laws make specialist outsourcing an absolute necessity." },
        { title: "Final Decision Summary", content: "To manage the immense financial complexity of construction projects in KSA and to ensure compliance with all government and client requirements, outsourcing to a firm with construction accounting expertise is essential." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Construction & Real Estate Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting for Saudi construction and real estate. We handle project accounting for giga-projects, REGA compliance, and VAT/WHT on contractor payments.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Construction Accounting & Tax",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Saudi Small Project Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Saudi Giga-Project Accounting Support"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "50000",
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
                <section className="bg-gradient-to-r from-stone-50 to-amber-100 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Specialized project accounting to support your role in Vision 2030's giga-projects, ensuring compliance with REGA, ZATCA, and project owners.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Saudi Arabia's construction and real estate sector is at the heart of its Vision 2030 transformation, with trillions of dollars being invested in giga-projects like NEOM, the Red Sea Project, and Diriyah Gate. For contractors, developers, and consulting engineers, this presents a once-in-a-generation opportunity. However, success in this sector requires navigating an exceptionally complex financial and regulatory environment. It demands sophisticated project accounting to manage costs against budgets, adherence to rules set by the Real Estate General Authority (REGA), and flawless compliance with ZATCA's regulations on VAT and withholding tax for subcontractors. Standard accounting is completely inadequate for the scale and complexity of these projects. This guide covers the essential accounting services required to succeed in the Saudi construction and real estate market.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our services are designed for all players in the Saudi construction and real estate value chain:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>General Contractors & Subcontractors:</strong> Local and international firms working on Vision 2030 projects that need robust project cost control and cash flow management.</li>
                                <li><strong>Real Estate Developers:</strong> Companies developing residential, commercial, or hospitality projects who must comply with REGA's off-plan sales rules and manage project financing.</li>
                                <li><strong>Engineering & Architectural Consultants:</strong> Firms providing design and supervision services that need to manage project-based billing and withholding tax on payments to foreign experts.</li>
                                <li><strong>Foreign Investors:</strong> International companies that have obtained a MISA license to invest in and develop real estate in the Kingdom.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you bid on your first project, specialized construction accounting is essential. It becomes non-negotiable at these stages:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>During the Bidding Process:</strong> To accurately estimate project costs and prepare a competitive, profitable bid.</li>
                                <li><strong>Upon Winning a Contract:</strong> To set up a detailed project budget, chart of accounts, and system for tracking all costs, including labor, materials, and subcontractor fees.</li>
                                <li><strong>When Dealing with Subcontractors:</strong> You must manage contracts, verify invoices, and correctly apply withholding tax on payments to foreign subcontractors.</li>
                                <li><strong>When Invoicing the Client:</strong> All invoices must be ZATCA-compliant e-invoices, and revenue must be recognized based on project completion milestones (percentage-of-completion method).</li>
                                <li><strong>During a Project Audit:</strong> Major clients, especially government-related ones, will conduct audits. Clean, transparent, and detailed project accounts are essential for passing these audits and getting paid.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>The cost of professional project accounting reflects the high complexity and critical importance of financial control in construction.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small to Medium Projects:</strong> SAR 15,000 - SAR 40,000 per month. This covers project bookkeeping, cost tracking, subcontractor payment management, and monthly progress reporting.</li>
                                <li><strong>Large-Scale or Giga-Projects:</strong> Custom pricing starting from SAR 40,000+, involving a dedicated on-site or remote team, advanced project management software integration, and full-scope virtual CFO support.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The construction sector in KSA is fraught with high-stakes financial and regulatory risks:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Project Cost Overruns:</strong> Without tight financial control, projects can easily go over budget, wiping out profitability.</li>
                                <li><strong>ZATCA Violations:</strong> Incorrectly handling VAT on construction contracts or failing to apply withholding tax on subcontractor payments can lead to massive penalties.</li>
                                <li><strong>REGA Non-Compliance:</strong> For developers, failing to adhere to off-plan sales regulations and escrow account rules can result in fines and license suspension.</li>
                                <li><strong>Contractual Disputes:</strong> Inaccurate cost records can weaken your position in disputes with clients or subcontractors over payments and variations.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Construction accounting is a highly specialized field. Most general accountants lack the expertise in project cost management, percentage-of-completion revenue recognition, and the specific tax rules for the construction industry in Saudi Arabia. Hiring a full-time project finance team is a major undertaking.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's construction finance partners provides immediate access to a team that understands the Saudi market. We implement robust project accounting systems that give you real-time visibility into the financial health of every project. We manage your ZATCA compliance, handle complex subcontractor payments, and prepare the detailed reports that project owners and financiers demand. By providing this critical financial backbone, we allow you to focus on what you do best: building the future of Saudi Arabia.
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

