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

export default function ComplianceRisksPage() {
    const aiBlocks = [
        { title: "What are the main risks of non-compliance?", content: "The main risks are financial penalties from state and federal agencies, loss of 'good standing' status which prevents business operations like opening bank accounts, and in severe cases, administrative dissolution of the company, leading to a loss of liability protection." },
        { title: "What is administrative dissolution?", content: "This is when a state forcibly dissolves your company for failing to meet its annual compliance obligations. The company legally ceases to exist, its name becomes available to others, and founders can lose their personal liability protection." },
        { title: "How does YourLegal mitigate these risks?", content: "Our compliance services automate the entire process. We track all filing deadlines, prepare and submit all required reports on your behalf, and ensure your company remains in good standing, protecting you from penalties and dissolution." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/annual-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Annual Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Annual Compliance Risks
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Failing to meet annual filing obligations can have severe consequences for your business.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk 1: Financial Penalties">
                <p>Both state governments and the IRS impose automatic financial penalties for late filings. These can range from a flat fee of several hundred dollars for a late state report to a percentage of unpaid tax for a late IRS filing. These penalties often accrue interest, turning a small oversight into a significant liability.</p>
            </ContentSection>
            
            <ContentSection title="Risk 2: Loss of Good Standing">
                 <p>When you miss a state filing deadline, your company loses its 'Good Standing' status. This is a public record that signals non-compliance. A company not in good standing may be unable to open bank accounts, secure loans, or even be sued in court. It effectively paralyzes your ability to conduct official business.</p>
            </ContentSection>
            
            <ContentSection title="Risk 3: Administrative Dissolution">
                 <p>This is the corporate death penalty. If a company remains non-compliant for an extended period, the state will forcibly dissolve it. The company ceases to legally exist, its name becomes available for others to use, and, most critically, the owners lose their limited liability protection, potentially exposing their personal assets to business debts.</p>
            </ContentSection>

            <ContentSection title="Risk 4: Inability to Raise Capital or Sell the Business">
                 <p>No investor will fund and no buyer will acquire a company that is not in good standing or has outstanding tax issues. A clean compliance history is a fundamental requirement of any due diligence process.
                 </p>
            </ContentSection>

             <ContentSection title="Mitigate Risk with Automated Compliance">
                <p>These risks are entirely avoidable. YourLegal's compliance platform is designed to automate the tracking and filing of all your annual state and federal reports. We ensure you never miss a deadline, protecting your company's legal status and saving you from costly penalties.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
