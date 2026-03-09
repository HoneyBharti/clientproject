
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
        { title: "What is the biggest mistake companies make in an audit?", content: "The biggest mistake is being unprepared. This includes having messy or incomplete bookkeeping, lacking documentation for expenses, and not having a professional representative. A chaotic response often leads to a longer, more expensive audit with a higher risk of a negative outcome." },
        { title: "Should I talk directly to the IRS auditor?", content: "No. It is highly recommended that you do not speak directly with an IRS auditor. All communication should go through your designated professional representative (CPA or tax attorney). This prevents you from inadvertently saying something that could expand the scope of the audit or be misinterpreted." },
        { title: "How can I avoid these mistakes?", content: "By maintaining audit-ready books year-round through a professional accounting service. This ensures your records are always organized, documented, and compliant, making any future audit a smooth and routine process rather than a crisis." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/audit-support" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Audit Support
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Common Audit Mistakes to Avoid
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about the frequent missteps that can turn an audit into a costly and stressful ordeal.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Panicking and Responding Directly">
                <p>The worst thing to do upon receiving an audit notice is to immediately call the auditor yourself. Anything you say can be used to expand the scope of the audit. The first step should always be to calmly contact your professional representative (CPA or tax attorney).</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Providing More Information Than Requested">
                 <p>Auditors will provide a specific list of documents they need. Do not volunteer extra information, additional years of records, or unsolicited explanations. Stick strictly to what is asked for to keep the audit focused and prevent it from expanding into other areas.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Having Disorganized or Incomplete Records">
                 <p>An audit is a test of your record-keeping. If your books are a mess and you can't produce receipts or invoices to support your deductions, the process will be painful and the outcome will likely be unfavorable. Clean, well-organized books are your best defense.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Not Having Professional Representation">
                 <p>Attempting to handle an audit on your own is a major risk. A professional representative understands the process, knows how to interact with auditors, and can argue technical points on your behalf. They act as a crucial buffer between you and the auditing body.</p>
            </ContentSection>

             <ContentSection title="The Solution: Year-Round Audit Readiness">
                <p>The best way to avoid audit mistakes is to be prepared before the audit ever begins. By using a professional accounting service all year, your books are always clean, reconciled, and documented. This "audit-ready" state transforms a potential crisis into a manageable administrative process.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

