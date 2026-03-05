
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
  const countryName = "India";
  const primaryKeyword = "Cross-border accounting India";

  const aiBlocks = [
    { title: "What is Cross-Border Accounting?", content: "For an Indian company, this involves managing multi-currency transactions, FEMA and RBI compliance for foreign investment, handling withholding tax (TDS) on foreign payments, and navigating transfer pricing regulations for inter-company transactions." },
    { title: "Who needs it?", content: "Indian subsidiaries of foreign companies, Indian companies with overseas subsidiaries, and businesses that make or receive payments in foreign currency for services or goods." },
    { title: "Cost range?", content: "This is a specialized service with custom pricing, typically starting from ₹50,000+ per month, reflecting the complexity of international tax laws, FEMA regulations, and transfer pricing." },
    { title: "DIY vs outsourcing?", content: "DIY is impossible. The complexities of FEMA, transfer pricing audits, and international tax treaties require deep expert knowledge. Outsourcing is the only professional approach." },
    { title: "Final decision summary", content: "To optimize your global tax position and comply with India's strict foreign exchange and transfer pricing laws, outsourcing cross-border accounting is a mandatory strategic investment." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/in" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to India Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial strategy for your Indian business, focusing on FEMA/RBI compliance, transfer pricing, and multi-currency management.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Cross-border accounting is a critical service for Indian companies that are part of a global financial network. This includes Indian subsidiaries of foreign multinational corporations, Indian companies with their own overseas branches, SaaS companies with international customers, and any business that makes significant payments to foreign entities for services, royalties, or software.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>This service is required the moment your business engages in a financial transaction with a party outside of India. It is especially critical when receiving foreign investment (FDI), which triggers mandatory reporting to the Reserve Bank of India (RBI) under the Foreign Exchange Management Act (FEMA). It is also essential when you have inter-company transactions, which are subject to India's detailed Transfer Pricing regulations.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in India">
                <p>Cross-border accounting is a highly specialized field in India, and the pricing reflects the deep expertise required to navigate its complex regulatory framework. Costs are customized to your business's global footprint:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Moderate Complexity (e.g., managing FDI reporting, withholding tax):** Starting from ₹50,000 – ₹1,20,000 per month.</li>
                    <li>**High Complexity (e.g., detailed transfer pricing study, group consolidation):** Starting from ₹1,20,000 – ₹3,00,000+ per month.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Mismanaging cross-border finances in India carries severe regulatory risks:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**FEMA/RBI Penalties:** Failure to report foreign investment (FDI) or overseas investment (ODI) within the prescribed timelines can lead to significant penalties, which can be a percentage of the amount involved.</li>
                    <li>**Transfer Pricing Adjustments:** The Indian tax authorities are extremely aggressive on transfer pricing. If they determine that your inter-company transactions are not at "arm's length," they can make large tax adjustments, leading to heavy tax demands and penalties.</li>
                    <li>**Withholding Tax (TDS) Violations:** Failure to withhold the correct tax on payments made to non-residents for services can result in the expense being disallowed for tax purposes, plus penalties and interest.</li>
                    <li>**Double Taxation:** Without proper application of India's tax treaties, your company's profits could be taxed both in India and in a foreign country, significantly eroding your profitability.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>It is virtually impossible for most businesses to build an in-house team with the required expertise in Indian foreign exchange laws, transfer pricing, and international tax treaties. Outsourcing this function to YourLegal provides immediate access to a team of specialists who live and breathe these regulations.</p>
                <p className="mt-4">We ensure all your RBI and FEMA reporting is handled correctly and on time. We help you create and maintain robust transfer pricing documentation to defend your inter-company pricing in a tax audit. We provide strategic advice on how to structure your international operations to be both compliant and tax-efficient. This service is a core component of a high-functioning <Link href="/in/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO</Link> engagement, providing the oversight needed to manage a global business from India.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
