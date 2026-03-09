
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
        { title: "Who needs audit support?", content: "Audit support is essential for any company facing a mandatory financial statement audit, typically venture-backed startups (Series A and beyond), businesses with significant bank debt, or companies preparing for an acquisition (M&A) or IPO. It is also for any business that receives an IRS audit notice." },
        { title: "Is audit support the same as an audit?", content: "No. Audit support is a preparation and management service provided by your accounting firm to get you ready for the audit. The audit itself is performed by an independent, third-party CPA firm that gives the formal opinion. We help you manage the auditors and the process." },
        { title: "Can you help even if my books are messy?", content: "Yes. Our process begins with an 'audit readiness assessment.' If your books are not in order, the first phase of our support service is a cleanup and remediation project to get your financials to a state where they are ready for auditor review." }
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
              Who Needs Audit Support?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our audit support services are designed for businesses facing the high-stakes process of a financial or tax audit.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Venture-Backed Startups">
                <p>If your startup has raised a Series A or later round of financing, your investors will almost certainly require an annual financial statement audit. Our audit support service is designed to manage this process, ensuring you meet your investor obligations and maintain their confidence.</p>
            </ContentSection>
            
            <ContentSection title="Companies with Bank Debt">
                 <p>Many banks and lenders require companies with significant loans or lines of credit to provide audited annual financials as part of their loan covenants. We help you satisfy these requirements to keep your financing in good standing.</p>
            </ContentSection>
            
            <ContentSection title="Businesses Preparing for M&A or IPO">
                 <p>If you are planning to sell your company or take it public, you will need several years of audited financials. Our service helps you prepare for this intensive due diligence process, maximizing your valuation and ensuring a smooth transaction.</p>
            </ContentSection>

            <ContentSection title="Companies Under IRS Examination">
                 <p>If your business receives a notice for an IRS tax audit, professional support is crucial. Our team can represent you before the IRS, manage the information flow, and work to achieve the best possible outcome, minimizing your stress and potential liabilities.
                 </p>
            </ContentSection>

             <ContentSection title="Any Business Needing Assurance">
                <p>Even if not contractually required, some companies choose to undergo an audit to demonstrate strong financial controls to key customers, partners, or board members. Our audit support makes this process manageable and valuable.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

