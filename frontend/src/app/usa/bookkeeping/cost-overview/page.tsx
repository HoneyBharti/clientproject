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
        { title: "How much does outsourced bookkeeping cost in the US?", content: "The cost for outsourced bookkeeping typically ranges from $200 per month for very small businesses or pre-revenue startups, up to $1,200+ per month for larger companies with higher transaction volumes." },
        { title: "What factors influence the cost of bookkeeping?", content: "The primary driver is transaction volume—the number of monthly transactions across all your bank and credit card accounts. Other factors include the number of accounts to reconcile, and complexity (e.g., e-commerce inventory, multi-currency)." },
        { title: "Is professional bookkeeping worth the cost?", content: "Absolutely. The cost of professional bookkeeping is almost always lower than the cost of IRS penalties from incorrect filings, lost tax deductions from poor records, and the value of the founder's time spent on administrative tasks instead of growing the business." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/bookkeeping" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Bookkeeping
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              US Bookkeeping Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent guide to the costs of professional bookkeeping services in the United States.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Typical Cost Ranges">
                <p>The cost of outsourced bookkeeping is primarily driven by the volume of your financial activity. Here are some typical monthly ranges for businesses in the US:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Pre-Revenue Startups / Very Low Volume:</strong> $200 – $400 per month.</li>
                    <li><strong>Small Businesses & Early-Stage Startups:</strong> $400 – $800 per month.</li>
                    <li><strong>Growing Companies / E-commerce Stores:</strong> $800 – $1,500+ per month.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="What's Included in the Price?">
                 <p>A typical monthly bookkeeping package includes:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Setup of your Chart of Accounts in professional accounting software (like QuickBooks or Xero).</li>
                    <li>Automated daily import of all bank and credit card transactions.</li>
                    <li>Monthly categorization of all transactions.</li>
                    <li>Monthly reconciliation of all accounts.</li>
                    <li>Delivery of standard financial statements (Income Statement, Balance Sheet).</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The Value Proposition: Cost vs. Value">
                 <p>While DIY might seem cheaper, professional bookkeeping provides significant ROI. The cost of one incorrectly filed tax return and the resulting IRS penalties can easily exceed a full year of bookkeeping fees. Furthermore, accurate financial data empowers you to make smarter decisions, and the time you save by not doing it yourself can be reinvested into growing your business.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

