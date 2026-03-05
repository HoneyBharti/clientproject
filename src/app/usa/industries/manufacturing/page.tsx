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
export default function ManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "USA";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in the ${countryName}?`, content: `Accounting for US manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing overhead allocation, and maximizing tax deductions like Section 179 for equipment.` },
        { title: "Who needs this service?", content: "Any US-based business involved in the production of physical goods, from small workshops to large-scale factories, including those that are part of an international supply chain." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting range from $1,500 for smaller operations to $7,000+ for larger plants with complex inventory and supply chains, reflecting the deep specialization required." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (e.g., absorption costing) and tax incentives require specialized knowledge. Outsourcing is essential for accurate financials and tax compliance." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and leverage manufacturing-specific tax breaks, outsourcing to an accounting firm with industrial expertise is a critical operational decision." }
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
            "name": "USA"
        },
        "description": `Outsourced accounting and tax services for US manufacturing companies. We handle inventory costing, COGS, overhead allocation, and Section 179 deductions.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
                        "priceCurrency": "USD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "7000",
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
                <section className="bg-gradient-to-r from-slate-50 to-gray-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/usa/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in the {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and tax incentives for US manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/usa/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            The manufacturing sector is the backbone of the US economy, but it operates on a financial model that is fundamentally different from service or retail businesses. Profitability is not just about sales; it's about minutely controlling the cost of production. This requires a sophisticated approach to accounting known as cost accounting, which tracks every expense from raw materials and labor to factory overhead. Properly managing inventory—from raw materials to work-in-progress (WIP) to finished goods—is critical for both operational efficiency and tax compliance. General accounting services are ill-equipped to handle these complexities, often leading to inaccurate profit margins and missed tax opportunities. This guide explores the essential, specialized accounting services that US manufacturing businesses need to thrive.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our manufacturing accounting services are designed for businesses across the production spectrum in the United States:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small-Scale Producers & Workshops:</strong> Businesses that need to establish a robust system for tracking job costs and initial inventory.</li>
                                <li><strong>Medium-Sized Factories & Assembly Plants:</strong> Companies with more complex supply chains, multiple product lines, and the need for detailed overhead allocation.</li>
                                <li><strong>Contract Manufacturers:</strong> Businesses that produce goods for other brands and need to precisely track costs and margins on a per-client, per-job basis.</li>
                                <li><strong>Companies with R&D:</strong> Manufacturers investing in process improvement, prototyping, and new product development who can benefit from federal and state R&D tax credits.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you start producing goods, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Begin Production:</strong> You must have a system to track costs as inventory moves from raw materials to work-in-progress and finally to finished goods.</li>
                                <li><strong>You Purchase Heavy Machinery:</strong> You need to manage depreciation schedules and leverage tax incentives like Section 179 to accelerate deductions for equipment purchases.</li>
                                <li><strong>You Need to Price Your Products:</strong> Without an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labor, and factory overhead, you cannot price your products for sustainable profitability.</li>
                                <li><strong>You Prepare Your Tax Return:</strong> The IRS has specific rules for inventory valuation (e.g., LIFO, FIFO) and requires manufacturers to capitalize certain costs into inventory under Uniform Capitalization (UNICAP) rules.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in the USA">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost accounting and inventory management.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> $1,500 - $3,500 per month. This typically includes core cost accounting, inventory tracking, and standard financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> $3,500 - $7,500+ per month. This service level often includes more granular job costing, variance analysis (standard vs. actual costs), and KPI reporting (e.g., inventory turnover, gross margin per product).</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often involving fractional CFO services for supply chain optimization, capital budgeting for new equipment, and strategic planning.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are tied directly to how costs and inventory are managed. Common pitfalls include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Inaccurate Inventory Valuation:</strong> Incorrectly valuing year-end inventory directly leads to an incorrect COGS, which can result in a significant over or underpayment of income taxes and is a major red flag during an IRS audit.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Failing to correctly apply factory overhead costs (like rent, utilities, and indirect labor) to the cost of inventory violates US GAAP and tax rules, distorting your true product costs.</li>
                                <li><strong>Violating UNICAP Rules:</strong> The Uniform Capitalization rules are complex and require certain indirect costs to be included in inventory. Failure to comply can lead to significant tax adjustments and penalties.</li>
                                <li><strong>Missed Tax Incentives:</strong> Manufacturers are often eligible for powerful incentives like the R&D tax credit for process improvements and bonus depreciation for new equipment. Failing to claim these leaves substantial money on the table.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting is a specialized field that most general accountants are not trained in. Hiring an experienced in-house cost accountant or controller is a major expense that many growing manufacturers cannot afford. Outsourcing to YourLegal's manufacturing finance team provides a cost-effective alternative.</p>
                            <p className="mt-4">
                                We bring the expertise and systems to implement a robust cost accounting framework for your business. We help you accurately track inventory, calculate a defensible COGS, and identify opportunities for tax savings specific to the manufacturing industry. Our detailed reports give you clear visibility into your production costs and product margins, empowering you to make smarter decisions about pricing, efficiency, and investment. This allows you to focus on what you do best—making great products—while we ensure your financial operations are a source of strength and competitive advantage.
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
