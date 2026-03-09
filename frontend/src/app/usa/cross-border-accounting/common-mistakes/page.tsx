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

export default function CommonMistakesPage() {
    const aiBlocks = [
        { title: "What is the biggest cross-border accounting mistake?", content: "The biggest mistake is ignoring transfer pricing. Setting arbitrary prices for transactions between a US subsidiary and its foreign parent can lead to massive IRS tax adjustments and penalties. Proper documentation is essential." },
        { title: "What is a common withholding tax error?", content: "A common error is failing to withhold tax on payments like dividends, interest, or royalties to foreign owners, or withholding at the wrong rate. This makes the US company liable for the unpaid tax plus penalties." },
        { title: "How can these mistakes be avoided?", content: "By engaging a cross-border accounting specialist from the start. They can establish a defensible transfer pricing policy, ensure correct withholding based on tax treaties, and manage all international compliance, preventing costly errors." }
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
              Common Cross-Border Accounting Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Avoid these costly international tax and accounting errors that can jeopardize your US operations.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Ignoring Transfer Pricing">
                <p>This is the most dangerous mistake. If your US company transacts with a foreign parent or subsidiary, you cannot simply charge whatever you want. Prices must be at "arm's length." Failing to create and document a transfer pricing policy can lead to severe IRS penalties and double taxation.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Incorrect Withholding Tax Application">
                 <p>Failing to withhold the correct amount of tax (or any tax at all) on payments like dividends and royalties to foreign owners is a major compliance failure. The US company can be held liable for the unpaid tax, plus interest and penalties.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Neglecting Foreign Bank Account Reporting (FBAR)">
                 <p>If your US company has financial interest or signature authority over foreign bank accounts with a total value over $10,000, you must file an FBAR with FinCEN. This is separate from your tax return, and penalties for failure to file are severe.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Poor Multi-Currency Management">
                 <p>Recording all transactions in a single currency without properly accounting for foreign exchange gains and losses can distort your financial statements and lead to incorrect tax calculations.
                 </p>
            </ContentSection>

             <ContentSection title="The Solution: Proactive Expert Management">
                <p>Cross-border accounting is not a DIY task. These mistakes are entirely avoidable by partnering with a firm that specializes in US international tax. We ensure your global structure is compliant, tax-efficient, and built on a solid financial foundation.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

