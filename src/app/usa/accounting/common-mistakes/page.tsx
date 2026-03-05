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

export default function CommonMistakesPage() {
    const aiBlocks = [
        { title: "What are common accounting mistakes?", content: "Common mistakes include commingling personal and business funds, poor record-keeping, misclassifying expenses (capital vs. operating), and ignoring accrual principles, leading to inaccurate financials and tax issues." },
        { title: "Why is commingling funds a problem?", content: "It 'pierces the corporate veil,' destroying the liability protection of an LLC or C-Corp and putting personal assets at risk in a lawsuit. It also makes accurate tax filing nearly impossible." },
        { title: "How can these mistakes be avoided?", content: "By establishing clear processes from day one: use a dedicated business bank account, adopt professional accounting software, and outsource to experts who can ensure compliance and accuracy." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Common Accounting Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about the frequent accounting errors startups make and how to avoid these costly pitfalls.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Commingling Personal & Business Funds">
                <p>This is the cardinal sin of business accounting. Using a personal account for business transactions or vice versa destroys your liability protection and creates a nightmare for tax preparation. Always maintain a separate, dedicated business bank account.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Poor or No Record-Keeping">
                 <p>Failing to keep detailed records of all income and expenses is a direct path to overpaying taxes and failing an IRS audit. A credit card statement is not enough; you need actual invoices and receipts for every transaction to prove business purpose.
                 </p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Misclassifying Expenses">
                 <p>A common error is expensing a large asset purchase immediately instead of capitalizing and depreciating it over time. This misstates your profit and violates GAAP. Understanding the difference between capital expenditures and operating expenses is crucial.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Ignoring Accrual Basis Accounting">
                 <p>While cash basis is simpler, it gives a distorted view of your company's performance. Accrual accounting (recognizing revenue when earned and expenses when incurred) is the standard required by investors and provides a true picture of profitability.
                 </p>
            </ContentSection>

             <ContentSection title="The Solution: Professional Oversight">
                <p>The best way to avoid these mistakes is to establish a professional accounting system from day one. Outsourcing to YourLegal ensures that best practices are followed, your books are always accurate, and you have a solid financial foundation for growth.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
