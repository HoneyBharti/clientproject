
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
        { title: "How much does a financial statement audit cost?", content: "A financial statement audit for a small to medium-sized business in the US is a significant expense, typically ranging from $20,000 to $50,000+, depending on the company's complexity and the quality of its financial records." },
        { title: "What is audit support and how does it affect cost?", content: "Audit support is a service to prepare your company for an audit. This involves cleaning up books, preparing schedules, and managing the auditors. Good audit support can significantly reduce the time auditors spend, thereby lowering the overall cost of the audit itself." },
        { title: "Is audit support included in your plans?", content: "Our Vitals plan includes 'audit-ready' financials, which makes the audit process much smoother. Our Elite and Virtual CFO plans include active audit support, where our team will manage the audit process and liaise with the auditors on your behalf." }
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
              Audit Support Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the costs associated with audit preparation and support services.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The Cost of the Audit Itself">
                <p>It's important to first understand that the audit itself is performed by an independent, third-party CPA firm, and their fees are separate from our audit support services. For a typical small or medium-sized business, a first-year financial statement audit can cost anywhere from **$20,000 to $50,000+**. This cost is heavily influenced by the complexity of your business and the quality and organization of your financial records.</p>
            </ContentSection>
            
            <ContentSection title="The Value of Audit Support">
                 <p>Audit support services are designed to make the formal audit process as smooth and cost-effective as possible. By ensuring your books are clean, reconciled, and well-documented *before* the auditors begin, you can dramatically reduce the number of hours they need to spend, thereby lowering their fees. Our audit support includes:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Ensuring your financials are GAAP-compliant.</li>
                    <li>Preparing the detailed schedules and reports requested on the auditor's "Provided by Client" (PBC) list.</li>
                    <li>Acting as the primary point of contact to answer auditor questions.</li>
                    <li>Helping to resolve any potential issues or disagreements that arise during the audit.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="Our Service Tiers">
                 <p>Our plans are designed to provide different levels of audit readiness and support:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>**Vitals Plan:** Provides "audit-ready" financials. This means your books will be clean and GAAP-compliant, making the audit process much easier than starting from scratch.</li>
                    <li>**Elite & Virtual CFO Plans:** Include active audit support. Our team takes on the role of project managing the audit, preparing the PBC list, and directly liaising with the auditors on your behalf, minimizing the time and stress for you and your team.</li>
                </ul>
                 <p className="mt-4">Investing in audit support is an investment in a faster, cheaper, and less stressful audit process with a higher likelihood of a positive outcome.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

