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

export default function WhoNeedsThisServicePage() {
    const aiBlocks = [
        { title: "Who needs bookkeeping services?", content: "Any registered business in the US needs bookkeeping. This includes pre-revenue startups tracking expenses, e-commerce stores managing high transaction volumes, consulting firms tracking project costs, and foreign-owned companies needing to document transactions for tax purposes." },
        { title: "Can I do bookkeeping myself?", content: "While you can, it's often not the best use of a founder's time. Professional bookkeeping avoids common, costly mistakes like commingling funds or poor record-keeping, and it ensures your data is accurate for tax filing and decision-making." },
        { title: "Do I need bookkeeping if my company has no revenue?", content: "Yes. All expenses must be accurately tracked to be claimed as deductions against future income. For certain entities like foreign-owned LLCs, informational tax filings are required even with zero revenue, and these depend on proper records." }
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
              Who Needs Bookkeeping Services?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From pre-revenue startups to scaling e-commerce stores, clean bookkeeping is the foundation of every successful business.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Early-Stage & Pre-Revenue Startups">
                <p>Even before you earn your first dollar, you're spending money. Software subscriptions, legal fees, and marketing expenses must all be meticulously tracked. Proper bookkeeping ensures these early costs are correctly recorded so they can be deducted against future revenue, improving your tax efficiency down the line.</p>
            </ContentSection>
            
            <ContentSection title="E-commerce & Online Businesses">
                 <p>E-commerce businesses have high transaction volumes and complex costs, including inventory, shipping, payment processor fees, and marketing spend. Professional bookkeeping is essential to accurately calculate Cost of Goods Sold (COGS), track profit margins, and manage cash flow effectively.
                 </p>
            </ContentSection>
            
            <ContentSection title="Consultants & Professional Services">
                 <p>For service-based businesses, time is money. Bookkeeping frees up valuable hours that are better spent on billable client work. It also ensures all business-related expenses, from home office costs to travel, are correctly documented and deducted, maximizing your take-home pay.</p>
            </ContentSection>

            <ContentSection title="Foreign-Owned US Companies">
                 <p>Non-resident founders have specific and strict reporting requirements with the IRS. Clean bookkeeping is absolutely essential to track transactions between the US company and its foreign owners, which is required for mandatory filings like Form 5472. Failure here results in severe penalties.
                 </p>
            </ContentSection>

             <ContentSection title="Any Business That Values Time & Accuracy">
                <p>Ultimately, any founder who understands that their time is better spent on growing the business—not on administrative tasks—needs bookkeeping services. It is an investment in efficiency, compliance, and peace of mind.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

