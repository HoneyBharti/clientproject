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
        { title: "What is the most common tax mistake?", content: "The most common mistake is filing a tax return based on inaccurate or incomplete bookkeeping. This leads to incorrect income and deduction figures, resulting in either overpayment of taxes or underpayment, which can trigger severe IRS penalties." },
        { title: "What is the penalty for filing late?", content: "The IRS imposes a 'Failure to File' penalty, which is typically 5% of the unpaid tax for each month the return is late, up to 25%. There are also penalties for failing to pay on time. For foreign-owned companies, failing to file informational returns like Form 5472 results in a flat $25,000 penalty." },
        { title: "How can these mistakes be avoided?", content: "By using a professional, integrated service that combines accurate bookkeeping with expert tax preparation. This ensures your tax return is based on solid, defensible data and that all deadlines and specific filing requirements are met." }
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
              Common Tax Compliance Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple errors in tax filing can lead to thousands of dollars in penalties. Here’s what to avoid.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Filing Based on Messy Books">
                <p>The golden rule of tax compliance is: garbage in, garbage out. Filing a tax return based on incomplete, unreconciled, or inaccurate bookkeeping is the number one cause of tax problems. It can lead to under-reporting income, missing legitimate deductions, or claiming expenses you can't prove, all of which are major red flags for the IRS.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Missing Filing Deadlines">
                 <p>The IRS imposes automatic, and often severe, penalties for failing to file your tax returns on time. A key mistake is not understanding the correct deadline for your entity type (March 15 for S-Corps/Partnerships, April 15 for C-Corps) or failing to file an extension (Form 7004) if you need more time.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Ignoring Informational Returns (for Foreign Owners)">
                 <p>For non-resident founders, the biggest mistake is being unaware of mandatory informational returns. A foreign-owned US LLC must file Form 5472, even with zero income. The penalty for failing to file this single form is a flat **$25,000**. Ignoring this is a catastrophic and easily avoidable error.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Confusing Federal and State Obligations">
                 <p>US tax compliance is a dual system. In addition to your federal IRS return, you must also file tax and annual reports with your state of incorporation (e.g., Delaware) and any other state where you have nexus. Forgetting state-level filings leads to separate penalties and can cause your company to lose its good standing.
                 </p>
            </ContentSection>

             <ContentSection title="The Solution: An Integrated Compliance System">
                <p>These mistakes are entirely preventable. YourLegal’s all-in-one compliance plans integrate professional bookkeeping with expert tax preparation. We ensure your financial data is accurate year-round, and then we use that data to prepare and file all of your federal and state returns correctly and on time, including the complex international forms. This protects you from risk and provides complete peace of mind.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
