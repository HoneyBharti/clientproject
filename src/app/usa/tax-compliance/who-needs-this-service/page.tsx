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

export default function WhoNeedsThisServicePage() {
    const aiBlocks = [
        { title: "Who needs tax compliance services?", content: "Every registered US business entity, including LLCs and C-Corps, is legally required to file an annual tax return with the IRS and often with the state of formation. This service is mandatory for all companies, regardless of revenue or activity level." },
        { title: "Do non-resident founders need this service?", content: "Yes, absolutely. Non-resident founders have even more complex filing requirements, including mandatory informational returns like Form 5472, which carry severe penalties for non-compliance. Professional tax services are essential for them." },
        { title: "My business had no income. Do I still need to file taxes?", content: "Yes. All US corporations and foreign-owned LLCs must file an annual tax return with the IRS even if they have no income or activity. This is a common point of confusion that leads to significant penalties if ignored." }
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
              Who Needs Tax Compliance Services?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A guide to understanding the mandatory tax filing obligations for every US company.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Every Registered US Business">
                <p>This is the simplest answer. If you have formed a legal business entity (like an LLC or C-Corporation) in the United States, you have a legal obligation to file an annual tax return with the Internal Revenue Service (IRS). This is true regardless of whether your company made a profit, broke even, or had a loss. Even a dormant company with zero activity must file a tax return.</p>
            </ContentSection>
            
            <ContentSection title="Foreign-Owned US Companies">
                 <p>For non-resident founders, professional tax compliance services are not just recommended—they are essential. The US has a specific and complex set of informational reporting requirements for foreign-owned entities. Failing to file forms like the 5472 can result in a $25,000 penalty, making expert guidance a critical part of risk management.</p>
            </ContentSection>
            
            <ContentSection title="Companies with Multi-State Operations">
                 <p>If your business has employees or significant sales in multiple states, you likely have a tax filing obligation in each of those states. A professional tax service can help you navigate this complex web of state tax laws, ensuring you file correctly in every required jurisdiction.</p>
            </ContentSection>

            <ContentSection title="Any Business Seeking to Minimize Tax & Maximize Deductions">
                 <p>Beyond simple compliance, a professional tax service provides strategic value. Our tax experts work to ensure you are taking advantage of every legitimate deduction and tax credit available to your business, potentially saving you thousands of dollars and optimizing your company's financial performance.
                 </p>
            </ContentSection>

             <ContentSection title="The Bottom Line">
                <p>Tax compliance is not a service for a specific type of company; it is a legal requirement for all companies. By entrusting this critical function to professionals, you ensure accuracy, avoid penalties, and gain peace of mind.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
