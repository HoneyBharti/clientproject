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

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

export default function ProcessExplainedPage() {
    const aiBlocks = [
        { title: "What is your cross-border accounting process?", content: "Our process includes four key stages: 1) A strategic review of your global structure, 2) Implementation of a transfer pricing policy and intercompany agreements, 3) Ongoing management of multi-currency transactions and consolidations, and 4) Strategic tax planning using applicable treaties to optimize your global tax position." },
        { title: "What is a transfer pricing study?", content: "For complex structures, we may recommend a formal transfer pricing study. This is a detailed economic analysis that benchmarks your intercompany transaction prices against market data to create a robust defense against an IRS audit." },
        { title: "How do you handle different accounting standards?", content: "Our team is proficient in both US GAAP and IFRS. During the financial consolidation process, we prepare detailed reconciliation schedules to adjust for any differences between the accounting standards used by your US entity and its foreign parent/subsidiaries." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/cross-border-accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Cross-Border Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Our Cross-Border Accounting Process
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A look at how we manage the complexities of international finance for your US business.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Global Structure Review" description="We begin with a deep-dive into your corporate structure, mapping out all legal entities, ownership percentages, and the nature of transactions between them. This allows us to identify key risks and opportunities." />
            
            <ProcessStep number="2" title="Transfer Pricing & Intercompany Agreements" description="We work with you to establish a defensible, arm's-length transfer pricing policy. This is supported by formal intercompany legal agreements for services, loans, and IP licensing to create a clear audit trail." />

            <ProcessStep number="3" title="Multi-Currency Consolidation & Reporting" description="Our accounting systems are configured to handle transactions in multiple currencies. Each month, we perform financial consolidation, eliminating intercompany transactions and preparing reports that show a unified view of the global business." />

            <ProcessStep number="4" title="Tax Treaty & Withholding Tax Management" description="We analyze applicable tax treaties to ensure you are benefiting from reduced withholding tax rates on dividends, interest, and royalties. We manage the calculation and payment of any required withholding taxes to keep you compliant." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

