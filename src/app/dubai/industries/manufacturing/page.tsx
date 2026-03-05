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
export default function DubaiManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "Dubai (UAE)";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Dubai manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing factory overheads, and complying with UAE tax laws.` },
        { title: "Who needs this service?", content: "Any business involved in the production or assembly of physical goods in the UAE, especially those operating in industrial free zones like JAFZA or Dubai Industrial City." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting in Dubai range from AED 5,000 for smaller operations to AED 15,000+ for larger plants with complex inventory and supply chains." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (IAS 2) require specialized knowledge. Outsourcing is essential for accurate financials and tax compliance." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and ensure compliance, outsourcing to an accounting firm with manufacturing expertise is a critical operational decision in Dubai." }
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
            "name": "United Arab Emirates"
        },
        "description": `Outsourced accounting and tax services for manufacturing companies in Dubai, UAE. We handle inventory costing (IAS 2), COGS, overhead allocation, and tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dubai Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Dubai Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "5000",
                        "priceCurrency": "AED",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Dubai Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15000",
                        "priceCurrency": "AED",
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
                        <Link href="/dubai/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and tax compliance for UAE manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/dubai/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Dubai's growing manufacturing sector, supported by world-class industrial free zones like Jebel Ali Free Zone (JAFZA) and Dubai Industrial City, offers a strategic base for production and assembly. However, the financial management of a manufacturing business is fundamentally different from other sectors. Profitability is driven by the precise measurement and control of production costs. This demands a sophisticated approach known as cost accounting, which tracks inventory through its entire lifecycle: from raw materials, to work-in-progress (WIP), and finally to finished goods. General accounting services are not equipped to handle these complexities, often leading to inaccurate profit margins and compliance issues under the new UAE Corporate Tax law. This guide explores the essential accounting services that manufacturing businesses in Dubai need to build a competitive and sustainable operation.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Dubai manufacturing accounting services are designed for businesses across the production and assembly landscape:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Light Manufacturing & Assembly Operations:</strong> Businesses in free zones that import components and assemble finished products for re-export.</li>
                                <li><strong>Food & Beverage Production:</strong> Companies that need to manage batch costing, track perishable inventory, and comply with food safety regulations.</li>
                                <li><strong>Contract Manufacturers:</strong> Businesses producing goods on behalf of other brands, requiring precise job costing to ensure each contract is profitable.</li>
                                <li><strong>High-Tech Manufacturing:</strong> Companies involved in producing electronics or other advanced goods that need to track high-value components and complex bills of materials (BOMs).</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you begin procuring raw materials, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Production:</strong> You must have a system compliant with IFRS (specifically IAS 2) to track the cost of inventory through its various stages.</li>
                                <li><strong>You Need to Price Your Products:</strong> To price goods profitably, you must have an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labour, and an allocated portion of factory overheads (like rent and utilities).</li>
                                <li><strong>You File Your First Corporate Tax Return:</strong> The FTA requires inventory to be valued correctly for calculating taxable profit. Incorrect inventory accounting is a major compliance risk.</li>
                                <li><strong>You Need Financing for Equipment:</strong> To secure loans for new machinery, banks will require detailed financial statements that accurately reflect the value of your assets and your profitability.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Dubai (UAE)">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost and inventory management.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> AED 5,000 - AED 8,000 per month. This typically includes core cost accounting, inventory tracking, and standard financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> AED 8,000 - AED 15,000+ per month. This service level adds more detailed job costing, variance analysis (standard vs. actual costs), and KPI reporting like inventory turnover.</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often including virtual CFO services for supply chain management, capital investment planning, and strategic financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are directly tied to the management of costs and inventory. Common pitfalls in the UAE include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Inventory Valuation:</strong> Failing to comply with IAS 2 for valuing inventory leads to inaccurate financial statements and can result in significant adjustments and penalties during a tax audit.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Not correctly allocating factory overheads into the cost of your inventory results in a distorted view of product profitability and non-compliant financial reporting.</li>
                                <li><strong>Inaccurate COGS:</strong> An incorrect Cost of Goods Sold figure means your gross profit is wrong, leading to flawed business decisions and incorrect Corporate Tax payments.</li>
                                <li><strong>VAT on Imported Raw Materials:</strong> Incorrectly handling import VAT on raw materials can lead to cash flow problems and compliance issues with the FTA.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting is a specific discipline that most general accountants do not specialize in. Hiring an experienced in-house management accountant or financial controller is a significant expense that is often prohibitive for growing manufacturers.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's manufacturing finance partners provides a cost-effective alternative. We bring the expertise to implement a robust cost accounting system for your business, ensuring you can accurately track inventory, calculate a defensible COGS, and comply with UAE tax law. Our detailed reports provide clear visibility into your production costs and product margins, empowering you to make smarter decisions about pricing, efficiency, and investment. This allows you to focus on innovation and production, while we ensure your financial operations are a source of strength and competitive advantage.
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
