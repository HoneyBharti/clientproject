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

export default function CostOverviewPage() {
    const aiBlocks = [
        { title: "How much do business tax services cost in the US?", content: "The cost for preparing and filing a standard US business tax return (federal + one state) typically starts around $1,000 - $2,500. Costs increase with complexity, such as needing to file in multiple states or requiring international forms like Form 5472." },
        { title: "What is included in a tax compliance service?", content: "A comprehensive service includes the preparation and e-filing of your federal income tax return (e.g., Form 1120 or 1065), your primary state income/franchise tax return, and any required international informational returns." },
        { title: "Is this cheaper than hiring a traditional CPA?", content: "Yes. Our tech-enabled approach and all-in-one plans are typically more cost-effective than engaging a traditional CPA firm, which often bills by the hour and may charge separately for each form and consultation." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/tax-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Tax Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              US Tax Compliance Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent guide to the costs of professional tax preparation and filing services in the USA.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Typical Cost Ranges">
                <p>The cost of business tax preparation depends on the complexity of your company's structure and activities. Our tax compliance service is included as part of our Vitals and Elite plans, providing excellent value. If purchased standalone from traditional firms, you could expect:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Standard Federal & State Filing (e.g., Form 1120 or 1065):</strong> $1,000 – $2,500</li>
                    <li><strong>Filing with International Forms (e.g., Form 5472):</strong> $1,500 – $3,500+ due to the increased complexity and risk.</li>
                    <li><strong>Multi-State Filings:</strong> Each additional state income tax return can add $300 - $600 to the total cost.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="What Drives the Cost?">
                 <p>Several factors influence the price of tax preparation:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Quality of Bookkeeping:</strong> The primary driver. If your books are messy and unreconciled, the tax preparer must first perform costly cleanup work before they can even begin the tax return.</li>
                    <li><strong>Entity Complexity:</strong> A C-Corp return is often more complex than a standard partnership return.</li>
                    <li><strong>International Activity:</strong> The need to file forms like 5472 or report foreign bank accounts (FBAR) significantly increases the scope and cost.</li>
                    <li><strong>State Nexus:</strong> The number of states where you have a filing obligation directly impacts the total cost.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The YourLegal Advantage: Integrated & Predictable">
                 <p>Our Vitals and Elite plans are designed to eliminate surprise costs. By bundling bookkeeping, annual compliance, and tax preparation into a single subscription, we provide a complete, end-to-end compliance solution for a predictable annual fee. Because we manage your books year-round, the data is always clean and ready for tax season, making the process more efficient and cost-effective than using separate providers for each service.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

