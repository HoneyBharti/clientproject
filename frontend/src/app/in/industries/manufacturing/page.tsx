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
export default function IndiaManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "India";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Indian manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing factory overheads, and ensuring compliance with GST and income tax laws.` },
        { title: "Who needs this service?", content: "Any business involved in the production or assembly of physical goods in India, from small workshops to large-scale factories, especially those looking to optimize production costs." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting in India range from ₹60,000 for smaller operations to ₹2,50,000+ for larger plants with complex inventory and supply chains." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (Ind AS 2) require specialized knowledge. Outsourcing is essential for accurate financials and tax compliance." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and ensure compliance, outsourcing to an accounting firm with manufacturing expertise is a critical operational decision in India." }
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
            "name": "India"
        },
        "description": `Outsourced accounting and tax services for manufacturing companies in India. We handle inventory costing (Ind AS 2), COGS, overhead allocation, and tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "India Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small India Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "60000",
                        "priceCurrency": "INR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large India Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "250000",
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
                <section className="bg-gradient-to-r from-slate-50 to-gray-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/in/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and tax compliance for Indian manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/in/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            India's manufacturing sector, a key pillar of the "Make in India" initiative, is a complex and capital-intensive environment. Unlike service businesses, a manufacturer's profitability is determined by its ability to precisely measure and control the cost of production. This requires a sophisticated discipline known as cost accounting, which tracks inventory through its entire lifecycle—from raw materials, to work-in-progress (WIP), to finished goods. General accounting services are not equipped to handle these complexities, often leading to inaccurate profit margins and compliance issues under Indian tax and accounting standards. This guide explores the essential accounting services that manufacturing businesses in India need to build a competitive and sustainable operation.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our India manufacturing accounting services are designed for businesses across the production landscape:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small & Medium Enterprises (SMEs):</strong> Businesses that form the backbone of Indian manufacturing and need robust systems for job costing and tracking raw material costs.</li>
                                <li><strong>Large-Scale Factories & Assembly Plants:</strong> Companies managing complex supply chains, multiple product lines, and requiring detailed analysis of factory overhead costs.</li>
                                <li><strong>Contract Manufacturers:</strong> Businesses producing goods for other brands, who need to precisely track costs and margins on a per-client, per-job basis.</li>
                                <li><strong>Export-Oriented Units (EOUs):</strong> Manufacturers focused on international markets who need to manage multi-currency transactions and navigate export-related GST compliance.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you start producing goods, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Production:</strong> You must have a system compliant with Indian Accounting Standards (Ind AS 2) to track the cost of inventory through its various stages.</li>
                                <li><strong>You Invest in Plant & Machinery:</strong> You need to manage complex depreciation schedules as per the Companies Act and Income Tax Act.</li>
                                <li><strong>You Need to Price Your Products:</strong> To price goods profitably, you must have an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labour, and an allocated portion of factory overheads.</li>
                                <li><strong>You File Your Tax Return:</strong> The Income Tax department has specific rules for inventory valuation. Incorrect inventory accounting is a major red flag during a tax audit.</li>
                                <li><strong>You Undergo a Statutory Audit:</strong> All private limited companies in India must undergo an annual statutory audit. Auditors pay close attention to inventory valuation and cost allocation.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in India">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost and inventory management.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> ₹60,000 - ₹1,25,000 per month. This typically includes core cost accounting, inventory tracking, and standard financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> ₹1,25,000 - ₹2,50,000+ per month. This service level adds more detailed job costing, variance analysis (standard vs. actual costs), and KPI reporting (e.g., inventory turnover, gross margin per product line).</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often including virtual CFO services for supply chain management, capital investment planning, and strategic financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are directly tied to the management of costs and inventory. Common pitfalls in India include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Inventory Valuation:</strong> Failing to comply with Ind AS 2 for valuing inventory can lead to inaccurate financial statements and is a major red flag for auditors and tax authorities, potentially leading to significant tax adjustments.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Not correctly allocating factory overheads (like rent, utilities, and indirect labor) into the cost of your inventory results in a distorted view of product profitability and non-compliant financial reporting.</li>
                                <li><strong>Inaccurate COGS:</strong> An incorrect Cost of Goods Sold figure means your gross profit is wrong, leading to flawed business decisions and incorrect income tax payments.</li>
                                <li><strong>GST Input Tax Credit on Capital Goods:</strong> The rules for claiming GST credit on machinery and other capital goods are complex. Errors can lead to loss of credit and penalties.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting is a specific discipline that most general accountants do not specialize in. Hiring an experienced in-house management accountant or financial controller is a significant expense that is often prohibitive for growing manufacturers.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's manufacturing finance partners provides a cost-effective alternative. We bring the expertise to implement a robust cost accounting system for your business, ensuring you can accurately track inventory, calculate a defensible COGS, and comply with Indian tax law. Our detailed reports provide clear visibility into your production costs and product margins, empowering you to make smarter decisions about pricing, efficiency, and investment. This allows you to focus on innovation and production, while we ensure your financial operations are a source of strength and competitive advantage.
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

