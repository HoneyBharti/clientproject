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
export default function SingaporeManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "Singapore";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Singapore manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing factory overheads, and maximizing tax incentives.` },
        { title: "Who needs this service?", content: "Any business involved in high-value production or assembly in Singapore, especially in sectors like electronics, biomedical sciences, and precision engineering." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting in Singapore range from S$1,500 for smaller operations to S$7,000+ for larger plants with complex inventory and supply chains." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (SFRS 2) require specialized knowledge. Outsourcing is essential for accurate financials and tax compliance." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and leverage tax incentives, outsourcing to an accounting firm with manufacturing expertise is a critical operational decision in Singapore." }
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
            "name": "Singapore"
        },
        "description": `Outsourced accounting and tax services for manufacturing companies in Singapore. We handle inventory costing (SFRS 2), COGS, overhead allocation, and tax compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Singapore Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Singapore Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "1500",
                        "priceCurrency": "SGD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Singapore Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "7000",
                        "priceCurrency": "SGD",
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
                        <Link href="/singapore/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and tax compliance for Singaporean manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/singapore/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                           Singapore's high-value manufacturing sector, a key pillar of its economy, is a global leader in areas like electronics, precision engineering, and biomedical sciences. Success in this capital-intensive field depends on precise control over the cost of production. This requires a sophisticated approach to accounting known as cost accounting, which meticulously tracks inventory through its entire lifecycle—from raw materials, through work-in-progress (WIP), to finished goods. General accounting services are not equipped to handle these complexities, often leading to inaccurate profit margins and non-compliance with Singapore Financial Reporting Standards (SFRS). This guide explores the essential accounting services that manufacturing businesses in Singapore need to build a competitive and sustainable operation.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Singapore manufacturing accounting services are designed for businesses across the production landscape:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Precision Engineering Firms:</strong> Companies producing high-value components for the aerospace, medical, or semiconductor industries.</li>
                                <li><strong>Biomedical & Pharmaceutical Manufacturers:</strong> Businesses that need to manage batch costing, track sensitive inventory, and comply with Health Sciences Authority (HSA) regulations.</li>
                                <li><strong>Contract Manufacturers:</strong> Businesses producing goods on behalf of other brands, who need to precisely track costs and margins on a per-job basis.</li>
                                <li><strong>Companies Leveraging Automation:</strong> Manufacturers investing heavily in robotics and advanced machinery who need to manage complex depreciation schedules and government grants.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you begin procuring raw materials, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Start Production:</strong> You must have a system compliant with SFRS 2 (the standard for inventories) to track the cost of inventory through its various stages.</li>
                                <li><strong>You Need to Price Your Products:</strong> To price goods profitably, you must have an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labour, and an allocated portion of factory overheads.</li>
                                <li><strong>You File Your Corporate Tax Return:</strong> IRAS has specific rules for inventory valuation. Incorrect inventory accounting is a major compliance risk that can lead to significant tax adjustments.</li>
                                <li><strong>You Undergo a Statutory Audit:</strong> Your auditors will pay close attention to inventory valuation and cost allocation, and any discrepancies can lead to a qualified audit opinion.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Singapore">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost and inventory management.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> S$1,500 - S$3,500 per month. This typically includes core cost accounting, inventory tracking, and standard financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> S$3,500 - S$7,000+ per month. This service level adds more detailed job costing, variance analysis (standard vs. actual costs), and KPI reporting (e.g., inventory turnover, gross margin per product line).</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often including virtual CFO services for supply chain management, capital investment planning, and strategic financial leadership.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are directly tied to the management of costs and inventory. Common pitfalls in Singapore include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Incorrect Inventory Valuation:</strong> Failing to comply with SFRS 2 for valuing inventory can lead to inaccurate financial statements and is a major red flag for auditors and IRAS, potentially leading to significant tax adjustments.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Not correctly allocating factory overheads (like rent, utilities, and indirect labor) into the cost of your inventory results in a distorted view of product profitability and non-compliant financial reporting.</li>
                                <li><strong>Inaccurate COGS:</strong> An incorrect Cost of Goods Sold figure means your gross profit is wrong, leading to flawed business decisions and incorrect corporate tax payments.</li>
                                <li><strong>GST on Imported Machinery:</strong> Incorrectly handling import GST on capital goods can lead to cash flow problems and compliance issues with IRAS.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting is a specific discipline that most general accountants do not specialize in. Hiring an experienced in-house management accountant or financial controller is a significant expense that is often prohibitive for growing manufacturers.</p>
                            <p className="mt-4">
                                Outsourcing to YourLegal's manufacturing finance partners provides a cost-effective alternative. We bring the expertise to implement a robust cost accounting system for your business, ensuring you can accurately track inventory, calculate a defensible COGS, and comply with Singaporean tax law. Our detailed reports provide clear visibility into your production costs and product margins, empowering you to make smarter decisions about pricing, efficiency, and investment. This allows you to focus on innovation and production, while we ensure your financial operations are a source of strength and competitive advantage.
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
