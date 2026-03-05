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

export default function ForForeignOwnedPage() {
    const aiBlocks = [
        { title: "What specific vCFO services do foreign owners need?", content: "Foreign owners need a vCFO with expertise in US international tax. Key services include managing Form 5472 compliance, developing transfer pricing policies for inter-company transactions, planning for tax-efficient repatriation of profits (dividends), and navigating withholding tax rules." },
        { title: "What is transfer pricing and why does a vCFO handle it?", content: "Transfer pricing is the set of rules for pricing transactions between related entities (e.g., a US sub and its foreign parent). A vCFO handles this because it's a high-level strategic risk. They develop a defensible policy to prevent the IRS from making large tax adjustments and imposing penalties." },
        { title: "How does a vCFO help with repatriation of profits?", content: "A vCFO analyzes US tax treaties to find the lowest possible withholding tax rate on dividends or other payments to the foreign parent. They structure these payments to be as tax-efficient as possible, a strategic task that can save a company millions in taxes." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/virtual-cfo" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Virtual CFO
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              vCFO for Foreign-Owned US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic guidance for non-resident founders navigating the complexities of the US international tax system.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The Core Challenge: International Tax & Compliance">
                <p>For a US company with foreign owners, a vCFO's role transcends typical financial planning. They must be experts in US international tax law to protect the company from severe IRS penalties. Their primary focus is managing the unique risks and opportunities that come with cross-border ownership.</p>
            </ContentSection>
            
            <ContentSection title="Key Service 1: Form 5472 & Transfer Pricing Strategy">
                 <p>A vCFO develops and oversees the company's transfer pricing policy. This involves setting arm's-length prices for any transactions with the foreign parent or related entities. They ensure meticulous documentation is in place to defend this policy in an audit and to accurately prepare the high-stakes Form 5472, avoiding the $25,000 non-filing penalty.</p>
            </ContentSection>
            
            <ContentSection title="Key Service 2: Tax-Efficient Repatriation Planning">
                 <p>Getting profits out of the US and back to the foreign owners is a major strategic challenge. A vCFO analyzes tax treaties between the US and the owner's country to determine the most tax-efficient method for distributing profits, whether as dividends, royalties, or interest payments, minimizing the withholding tax burden.</p>
            </ContentSection>

            <ContentSection title="Key Service 3: Global Financial Consolidation">
                 <p>If the US company is part of a larger global group, the vCFO manages the complex process of consolidating the US entity's GAAP-based financials into the parent company's IFRS-based reports. This requires a deep understanding of both accounting standards and multi-currency financial reporting.
                 </p>
            </ContentSection>

             <ContentSection title="Your Bridge to the US Financial System">
                <p>A vCFO with international expertise acts as the crucial financial bridge between your foreign headquarters and your US operations. They translate complex US tax law into actionable strategy, ensuring your global structure is both compliant and optimized for financial success. This is a non-negotiable service for any serious global business with a US presence.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
