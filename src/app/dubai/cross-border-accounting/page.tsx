
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';

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

const ContentSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="prose max-w-none text-gray-600">
            {children}
        </div>
    </div>
);

export default function CrossBorderAccountingServicePage() {
  const serviceName = "Cross-Border Accounting";
  const countryName = "Dubai (UAE)";
  const primaryKeyword = "Cross-border accounting UAE";

  const aiBlocks = [
    { title: "What is Cross-Border Accounting?", content: "Cross-border accounting for a UAE entity involves managing transactions in multiple currencies, handling transfer pricing between related international companies, and consolidating financials to ensure compliance with both UAE and foreign tax laws." },
    { title: "Who needs it?", content: "UAE companies that are part of a multinational group, businesses with international clients or suppliers, and holding companies with overseas subsidiaries." },
    { title: "Cost range?", content: "This is a specialized service with custom pricing, typically starting from AED 4,000+ per month, reflecting the complexity of international tax laws and financial consolidation." },
    { title: "DIY vs outsourcing?", content: "DIY is not an option. Navigating transfer pricing, tax treaties, and multi-jurisdictional reporting requires expert knowledge. Outsourcing is essential to avoid severe penalties and tax inefficiencies." },
    { title: "Final decision summary", content: "For any UAE business with international operations, outsourcing cross-border accounting is a critical necessity to manage financial risk, ensure global compliance, and optimize your overall tax strategy." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/dubai" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dubai Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial management for UAE businesses operating globally. We handle multi-currency accounting, transfer pricing, and international tax compliance.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our cross-border accounting service is vital for UAE-based companies that are part of a global structure. This includes Dubai holding companies with foreign subsidiaries, foreign corporations with a branch or subsidiary in a UAE Free Zone, and trading companies that transact in multiple currencies like USD, EUR, and AED. It is for any business where money and services move across international borders.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>This service is required as soon as your business engages in international transactions. It is especially critical when you have inter-company dealings (e.g., a UAE entity providing services to a US parent company), as this triggers complex transfer pricing rules. It's also necessary for consolidating financial statements for a global audit and for ensuring your structure is optimized under various double-taxation treaties.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Dubai (UAE)">
                <p>Cross-border accounting is a highly specialized field. The pricing reflects the expert knowledge required to navigate international tax and compliance frameworks. Costs are customized to your business's specific global footprint:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Moderate Complexity (e.g., one foreign entity, multiple currencies):** Starting from AED 4,000 – AED 8,000 per month.</li>
                    <li>**High Complexity (e.g., multiple subsidiaries, detailed transfer pricing):** Starting from AED 8,000 – AED 20,000+ per month.</li>
                </ul>
                <p className="mt-4">This investment is crucial for mitigating significant financial risks and optimizing your global tax burden.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>The financial and legal risks of mismanaging cross-border finances are substantial:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Transfer Pricing Penalties:** Tax authorities worldwide, including the UAE's FTA, can impose massive penalties if they determine that transactions between your related companies were not priced at "arm's length."</li>
                    <li>**Loss of 0% Free Zone Tax Benefit:** Improper transactions with a mainland or foreign entity can disqualify a free zone company from the 0% corporate tax rate on its income.</li>
                    <li>**Double Taxation:** Without proper application of tax treaties, your profits could be taxed in both the UAE and another country, eroding your bottom line.</li>
                    <li>**Audit and Legal Challenges:** Inconsistent financial reporting across jurisdictions can lead to failed audits and legal challenges from foreign tax authorities.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing cross-border accounting is the only viable option for most businesses. It is not feasible to hire in-house experts with knowledge of every relevant jurisdiction's tax code. YourLegal provides a centralized team that understands the interplay between UAE law and the laws of other major economies. We ensure your transfer pricing policies are documented and defensible, your financial consolidations are accurate, and your global tax structure is as efficient as possible. This service is a core component of a high-functioning <Link href="/dubai/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO</Link> engagement, providing the strategic oversight needed to manage a global enterprise from your UAE hub.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
