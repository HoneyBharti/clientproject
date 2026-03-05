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

export default function WhenRequiredPage() {
    const aiBlocks = [
        { title: "When is cross-border accounting required?", content: "It is required the moment your business has a financial connection to more than one country. This includes having a foreign subsidiary, a foreign parent company, international customers paying in a different currency, or paying for services from an overseas company." },
        { title: "Do I need it if I just have a foreign bank account?", content: "Yes. Simply having a foreign bank account with a balance over $10,000 triggers a mandatory FBAR filing requirement, which falls under cross-border compliance." },
        { title: "Can I wait until my international business is larger?", content: "No, this is a high-risk strategy. The rules for things like transfer pricing and withholding tax apply from the very first transaction. Failing to set up compliant processes from the start creates a history of non-compliance that is difficult and expensive to fix later." }
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
              When Is Cross-Border Accounting Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the triggers that make specialized international accounting a necessity.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="When You Have a Foreign Subsidiary or Parent">
                <p>The moment you establish a multi-entity, international corporate structure, you need cross-border accounting. Any transaction between the entities—for services, loans, or IP—falls under transfer pricing rules. You will also need to perform financial consolidation to get a true picture of the global business's performance.</p>
            </ContentSection>
            
            <ContentSection title="When You Make Payments to Foreign Entities">
                 <p>If your US company pays a foreign entity for services, software licenses, or royalties, you are likely required to withhold US tax on that payment. Cross-border accounting expertise is needed to determine the correct withholding rate based on tax treaties and to file the necessary forms with the IRS.</p>
            </ContentSection>
            
            <ContentSection title="When You Receive Foreign Investment">
                 <p>If your US company is owned by a non-resident, you must track all transactions with that owner and file informational returns like Form 5472 with the IRS. This requires a specialized bookkeeping approach from day one.</p>
            </ContentSection>

            <ContentSection title="When You Operate in Multiple Currencies">
                 <p>If you have customers, vendors, or bank accounts in different currencies, you need a system to properly account for foreign exchange gains and losses. This is essential for accurate financial reporting and tax calculations.
                 </p>
            </ContentSection>

             <ContentSection title="The Verdict: Required for Any Global Business">
                <p>Cross-border accounting is not an optional add-on for large corporations. It is a fundamental requirement for any modern business that operates beyond the borders of a single country. Engaging specialists early is the key to building a compliant and tax-efficient global company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
