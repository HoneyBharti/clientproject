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

export default function WhenRequiredPage() {
    const aiBlocks = [
        { title: "When is professional accounting required?", content: "Professional accounting is legally required for filing annual tax returns with the IRS. It becomes commercially mandatory when seeking investment from VCs, applying for bank loans, or preparing for a financial audit, as these stakeholders require accurate, GAAP-compliant financial statements." },
        { title: "Can I wait to get accounting services?", content: "Waiting is a high-risk strategy. Inaccurate or non-existent books from the early days must be 'cleaned up' later, which is expensive and can delay or kill funding deals. Establishing proper accounting from day one is the recommended approach." },
        { title: "Do I need accounting if I have no revenue?", content: "Yes. Even pre-revenue companies have expenses, such as software or legal fees. These need to be tracked correctly to be deducted against future income. For foreign-owned LLCs, informational tax returns are required even with zero revenue, and these require organized records." }
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
              When Is Professional Accounting Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the key business milestones that make professional accounting a necessity, not a choice.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Legal & Tax Filing Requirements">
                <p>From a legal standpoint, professional accounting is required to meet your annual tax obligations. The IRS requires all registered businesses to file a tax return, and you cannot create an accurate tax return without a complete set of financial records (an income statement and balance sheet) for the year.
                </p>
            </ContentSection>
            
            <ContentSection title="Seeking Outside Investment">
                 <p>If you plan to raise money from venture capitalists, angel investors, or even friends and family, they will perform due diligence. This always starts with a review of your financial statements. Presenting clean, accurate, GAAP-compliant financials is a sign of a professional founder and is crucial for building investor trust. Messy books will kill a funding round before it begins.
                 </p>
            </ContentSection>
            
            <ContentSection title="Applying for Loans or Credit">
                 <p>Banks and lenders will not provide financing without a clear view of your company's financial health. They will require historical financial statements and often financial projections to assess your ability to repay the loan. Proper accounting is a prerequisite for getting access to debt financing.
                 </p>
            </ContentSection>

            <ContentSection title="Preparing for an Audit">
                 <p>Whether it's an IRS audit or a financial statement audit required by an investor, the process involves a deep dive into your records. Professional accounting ensures your books are "audit-ready" from day one, making the process smoother, faster, and less costly.
                 </p>
            </ContentSection>

             <ContentSection title="Making Strategic Business Decisions">
                <p>Beyond compliance, accounting is required to effectively run your business. You cannot make smart decisions about pricing, hiring, or marketing spend without accurate data on your revenue, costs, and profitability. Professional accounting provides the insights you need to grow sustainably.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

