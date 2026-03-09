
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
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
  const countryName = "Saudi Arabia";
  const primaryKeyword = "Cross-border accounting Saudi Arabia";

  const aiBlocks = [
    { title: "What is Cross-Border Accounting?", content: "For a Saudi company, this involves managing multi-currency transactions, navigating withholding tax on payments to foreign entities, applying tax treaties to prevent double taxation, and handling transfer pricing with related international companies." },
    { title: "Who needs it?", content: "Saudi companies with foreign parent companies or subsidiaries, businesses that import/export goods or services, and any entity making payments to non-resident service providers." },
    { title: "Cost range?", content: "This is a specialized service with custom pricing, typically starting from SAR 7,500+ per month, reflecting the complexity of international tax laws and transfer pricing documentation." },
    { title: "DIY vs outsourcing?", content: "DIY is not an option. The complexities of Saudi withholding tax, transfer pricing bylaws, and tax treaties require expert guidance. Outsourcing is essential to mitigate tax risks." },
    { title: "Final decision summary", content: "To optimize your global tax position and comply with ZATCA's strict international transaction rules, outsourcing cross-border accounting for your Saudi entity is a mandatory strategic investment." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/saudi-arabia" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Saudi Arabia Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial management for KSA businesses operating globally. We handle withholding tax, transfer pricing, and multi-currency accounting.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Cross-border accounting is a vital service for Saudi-based companies that are part of a global financial ecosystem. This includes Saudi subsidiaries of foreign multinational corporations, Saudi companies with overseas branches, and any business that engages in significant transactions with non-resident entities, such as paying for international software licenses, consulting services, or royalties.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>This service is required the moment your business engages in a financial transaction with a party outside of Saudi Arabia. It is especially critical when making payments to foreign service providers (which triggers withholding tax), dealing with related international companies (which triggers transfer pricing rules), or managing revenue and expenses in multiple currencies like USD and EUR.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Saudi Arabia">
                <p>Cross-border accounting is a highly specialized field, and the pricing reflects the expert knowledge required to navigate KSA's international tax regime. Costs are customized to your business's global footprint:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Moderate Complexity (e.g., managing withholding tax, multi-currency):** Starting from SAR 7,500 – SAR 15,000 per month.</li>
                    <li>**High Complexity (e.g., detailed transfer pricing documentation, group consolidation):** Starting from SAR 15,000 – SAR 30,000+ per month.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Mismanaging cross-border finances in KSA carries substantial tax risks:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Withholding Tax (WHT) Penalties:** Failure to withhold the correct amount of tax (typically 5-20%) on payments to foreign entities results in significant penalties from ZATCA.</li>
                    <li>**Transfer Pricing Violations:** ZATCA has implemented strict transfer pricing bylaws. Failure to maintain documentation proving your inter-company transactions are at "arm's length" can lead to large tax adjustments and fines.</li>
                    <li>**Double Taxation:** Without proper application of Saudi Arabia's tax treaties, your profits could be taxed in both KSA and another country, eroding your bottom line.</li>
                    <li>**VAT on Imported Services:** The reverse charge mechanism for VAT on services imported from abroad is complex and a common area for errors, leading to penalties.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing cross-border accounting is the only viable option for most businesses operating in Saudi Arabia. It is not feasible to build an in-house team with expertise in both Saudi tax law and the laws of every other country you transact with. YourLegal provides a centralized team that understands the interplay between ZATCA's rules and global tax principles. We ensure your withholding tax obligations are met, your transfer pricing policies are defensible, and your global structure is tax-efficient. This strategic service is a core component of a high-functioning <Link href="/saudi-arabia/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO</Link> engagement, providing the oversight needed to manage a global enterprise from your KSA base.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

