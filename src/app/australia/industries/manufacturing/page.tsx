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
export default function AustraliaManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "Australia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Australian manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing factory overheads, and maximizing the R&D Tax Incentive for process improvements.` },
        { title: "Who needs this service?", content: "Any Australian-based business involved in the production or assembly of physical goods, from small workshops to large-scale factories, especially those engaged in innovation." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting in Australia range from AUD $2,000 for smaller operations to AUD $8,000+ for larger plants with complex inventory and supply chains." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (AASB 102) and R&D tax claims require specialized knowledge. Outsourcing is essential for accurate financials and tax optimization." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and leverage valuable tax incentives, outsourcing to an accounting firm with manufacturing expertise is a critical operational decision in Australia." }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Manufacturing Accounting & Tax Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting and tax services for manufacturing companies in Australia. We handle inventory costing (AASB 102), COGS, overhead allocation, and R&D Tax Incentive claims.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Australia Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Australia Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "8000",
                        "priceCurrency": "AUD",
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
                <section className="bg-gradient-to-r from-slate-50 to-gray-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/australia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and R&D tax credits for Australian manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/australia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Australia's manufacturing sector is a vital component of its economy, characterized by advanced production techniques and a strong focus on innovation. The financial management of a manufacturing business is fundamentally different from other sectors. Profitability is driven by the precise measurement and control of production costs. This requires a sophisticated discipline known as cost accounting, which tracks inventory through its entire lifecycle—from raw materials, to work-in-progress (WIP), to finished goods. Furthermore, the Australian government actively encourages innovation through the R&D Tax Incentive, a powerful scheme that can provide significant cash refunds to eligible companies. General accounting services are not equipped to handle these complexities, often leading to inaccurate profit margins and missed tax benefits. This guide explores the essential accounting services that Australian manufacturing businesses need to build a competitive and sustainable operation.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Australian manufacturing accounting services are designed for businesses across the production landscape:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small-Scale Workshops & Fabricators:</strong> Businesses that need to establish a solid system for job costing and tracking the cost of raw materials.</li>
                                <li><strong>Medium-Sized Factories & Assembly Plants:</strong> Companies managing complex supply chains, multiple product lines, and requiring detailed analysis of factory overhead costs.</li>
                                <li><strong>Food & Beverage Producers:</strong> Companies that need to manage batch costing, track perishable inventory, and comply with food safety standards.</li>
                                <li><strong>Innovative Manufacturers:</strong> Companies investing in new product development, process improvements, or automation who are prime candidates for the R&D Tax Incentive.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you start producing goods, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Begin Production:</strong> You must have a system compliant with Australian Accounting Standards (specifically AASB 102 for inventories) to track the cost of inventory through its various stages.</li>
                                <li><strong>You Invest in Plant & Equipment:</strong> You need to manage complex depreciation schedules to accurately reflect the value of your assets and maximize tax deductions.</li>
                                <li><strong>You Need to Price Your Products:</strong> To price goods profitably, you must have an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labour, and an allocated portion of factory overheads.</li>
                                <li><strong>You File Your Company Tax Return:</strong> The ATO has specific rules for inventory valuation. An incorrect valuation is a major red flag. This is also when you lodge your R&D Tax Incentive claim.</li>
                                <li><strong>You Innovate or Improve Processes:</strong> To claim the R&D Tax Incentive, you must have detailed, contemporaneous records of your experimental activities and the costs associated with them.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Australia">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost accounting, inventory management, and R&D tax work.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> AUD $2,000 - $4,500 per month. This typically includes core cost accounting, inventory tracking, and standard financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> AUD $4,500 - $8,000+ per month. This service level adds more detailed job costing, variance analysis (standard vs. actual costs), and preparation support for R&D claims.</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often including virtual CFO services for supply chain management, capital investment planning, and strategic financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are directly tied to the management of costs and inventory. Common pitfalls in Australia include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Inaccurate Inventory Valuation:</strong> Failing to comply with AASB 102 for valuing inventory can lead to inaccurate financial statements and is a major red flag for auditors and the ATO, potentially leading to significant tax adjustments.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Not correctly allocating factory overheads into the cost of your inventory results in a distorted view of product profitability and non-compliant accounts.</li>
                                <li>**Failed R&D Tax Claim:** A claim rejected by the ATO or AusIndustry due to poor record-keeping is a massive financial blow, resulting in the loss of a significant cash refund or tax offset.</li>
                                <li><strong>Inaccurate COGS:</strong> An incorrect Cost of Goods Sold figure means your gross profit is wrong, leading to flawed business decisions and incorrect company tax payments.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting and R&D tax are specific disciplines that most general accountants do not specialize in. Hiring an experienced in-house management accountant or financial controller is a significant expense that is often prohibitive for growing manufacturers.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's manufacturing finance partners provides a cost-effective alternative. We bring the expertise to implement a robust cost accounting system, ensuring you can accurately track inventory and calculate a defensible COGS. Crucially, we work with you to identify and document your qualifying R&D activities throughout the year to build a strong, successful claim. Our reports provide clear visibility into your production costs, empowering you to make smarter decisions about pricing, efficiency, and investment, while maximizing the government incentives available to you.
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
