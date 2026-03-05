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
export default function SaudiManufacturingIndustryPage() {
    const serviceName = "Manufacturing";
    const countryName = "Saudi Arabia";

    const aiBlocks = [
        { title: `What are accounting services for ${serviceName} in ${countryName}?`, content: `Accounting for Saudi manufacturing companies focuses on complex inventory costing (raw materials, WIP, finished goods), calculating Cost of Goods Sold (COGS), managing factory overheads, and complying with ZATCA's e-invoicing and tax rules.` },
        { title: "Who needs this service?", content: "Any business involved in the production or assembly of physical goods in KSA, especially those operating in industrial cities managed by MODON or benefiting from SIDF funding." },
        { title: "What is the cost range?", content: "Monthly costs for manufacturing accounting in KSA range from SAR 8,000 for smaller operations to SAR 30,000+ for larger plants with complex inventory and supply chains." },
        { title: "DIY vs. Outsourcing?", content: "DIY is not viable. The complexities of inventory accounting (IAS 2) and ZATCA compliance require specialized knowledge. Outsourcing is essential for accurate financials." },
        { title: "Final Decision Summary", content: "To accurately track production costs, manage inventory, and ensure tax compliance in KSA's demanding environment, outsourcing to an accounting firm with manufacturing expertise is a critical decision." }
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
            "name": "Saudi Arabia"
        },
        "description": `Outsourced accounting and tax services for manufacturing companies in Saudi Arabia. We handle inventory costing (IAS 2), COGS, overhead allocation, and ZATCA e-invoicing compliance.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Saudi Arabia Manufacturing Accounting & Tax Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Saudi Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "8000",
                        "priceCurrency": "SAR",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Large Saudi Manufacturing Plant Accounting"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "30000",
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
                <section className="bg-gradient-to-r from-slate-50 to-gray-200 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/saudi-arabia/industries" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                            {serviceName} Accounting & Tax Services in {countryName}
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                           Master your production costs with specialized services in inventory costing, overhead allocation, and ZATCA compliance for Saudi manufacturers.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/saudi-arabia/pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </section>
                
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        <p className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                            Saudi Arabia's push to diversify its economy under Vision 2030 has created significant incentives for local manufacturing. The development of industrial cities managed by MODON and financing from the Saudi Industrial Development Fund (SIDF) are fueling growth in this capital-intensive sector. However, the financial management of a manufacturing business is fundamentally different from other industries. Profitability hinges on the precise measurement and control of production costs. This requires a sophisticated discipline known as cost accounting, which tracks inventory through its entire lifecycle—from raw materials, to work-in-progress (WIP), to finished goods—while complying with ZATCA's strict e-invoicing and tax regulations. This guide explores the essential accounting services that manufacturing businesses in Saudi Arabia need to build a competitive and sustainable operation.
                        </p>
                        
                        <ContentSection title="Who This Service Is For">
                            <p>Our Saudi manufacturing accounting services are designed for businesses across the production landscape in the Kingdom:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Light Manufacturing & Assembly Operations:</strong> Businesses in industrial cities that import components and assemble finished products for the local or regional market.</li>
                                <li><strong>Food & Beverage Producers:</strong> Companies that need to manage batch costing, track perishable inventory, and comply with SFDA (Saudi Food and Drug Authority) regulations.</li>
                                <li><strong>Contract Manufacturers:</strong> Businesses producing goods for other brands, who need to precisely track costs and margins on a per-client, per-job basis.</li>
                                <li><strong>Companies Receiving SIDF Funding:</strong> Manufacturers who have received loans from the Saudi Industrial Development Fund and must adhere to strict financial reporting and audit requirements.</li>
                            </ul>
                        </ContentSection>
                        
                        <ContentSection title="When It Is Required">
                            <p>From the moment you start procuring raw materials, specialized manufacturing accounting is necessary. It becomes absolutely critical when:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>You Begin Production:</strong> You must have a system compliant with IFRS (specifically IAS 2) to track the cost of inventory through its various stages.</li>
                                <li><strong>You Invest in Plant & Machinery:</strong> You need to manage complex depreciation schedules and adhere to financing covenants if you have loans from SIDF or other banks.</li>
                                <li><strong>You Need to Price Your Products:</strong> To price goods profitably, you must have an accurate Cost of Goods Sold (COGS), which includes direct materials, direct labour, and an allocated portion of factory overheads.</li>
                                <li><strong>You File Your Zakat/Tax Return:</strong> ZATCA has specific rules for inventory valuation. Incorrect inventory accounting is a major red flag during a tax audit.</li>
                                <li><strong>You Issue an Invoice:</strong> Every B2B sale must be accompanied by a ZATCA-compliant e-invoice (Fatoorah), which requires an approved accounting system.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Cost Ranges in Saudi Arabia">
                            <p>Outsourcing manufacturing accounting provides access to a highly specialized skillset. The costs reflect the complexity of cost accounting and inventory management in the KSA environment.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Small Operations:</strong> SAR 8,000 - SAR 15,000 per month. This typically includes core cost accounting, inventory tracking, and ZATCA-compliant financial reporting.</li>
                                <li><strong>Medium-Sized Plants:</strong> SAR 15,000 - SAR 30,000+ per month. This service level adds more detailed job costing, variance analysis (standard vs. actual costs), and KPI reporting.</li>
                                <li><strong>Large or Complex Operations:</strong> Custom pricing, often including virtual CFO services for supply chain management and capital investment planning.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Compliance Risks">
                            <p>The financial risks in manufacturing are directly tied to the management of costs and inventory. Common pitfalls in Saudi Arabia include:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Inaccurate Inventory Valuation:</strong> Failing to comply with IAS 2 for valuing inventory can lead to inaccurate financial statements and is a major red flag for auditors and ZATCA, potentially leading to significant tax adjustments.</li>
                                <li><strong>Improper Overhead Allocation:</strong> Not correctly allocating factory overheads (like rent, utilities, and indirect labor) into the cost of your inventory results in a distorted view of product profitability and non-compliant accounts.</li>
                                <li><strong>ZATCA E-invoicing Violations:</strong> Failure to generate and report invoices through a ZATCA-approved system can lead to immediate and significant fines.</li>
                                <li><strong>Inaccurate COGS:</strong> An incorrect Cost of Goods Sold figure means your gross profit is wrong, leading to flawed business decisions and incorrect Zakat/Tax payments.</li>
                            </ul>
                        </ContentSection>

                        <ContentSection title="Why Outsourcing Works Better">
                            <p>Cost accounting is a specific discipline that most general accountants do not specialize in. Hiring an experienced in-house management accountant or financial controller in Saudi Arabia is a significant expense. Outsourcing to YourLegal's manufacturing finance partners provides a cost-effective alternative.</p>
                            <p className="mt-4">
                                We bring the expertise to implement a robust cost accounting system for your business, ensuring you can accurately track inventory, calculate a defensible COGS, and comply with all ZATCA regulations. Our detailed reports provide clear visibility into your production costs and product margins, empowering you to make smarter decisions about pricing, efficiency, and investment. This allows you to focus on innovation and production, while we ensure your financial operations are a source of strength and competitive advantage in the Kingdom.
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
