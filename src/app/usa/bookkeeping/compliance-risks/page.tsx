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
        { title: "What are the main risks of poor bookkeeping?", content: "The main risks include significant IRS penalties for inaccurate tax filings, lost deductions leading to overpaid taxes, inability to secure loans or investment due to unreliable financials, and poor business decisions based on flawed data." },
        { title: "Can bad bookkeeping lead to legal problems?", content: "Yes. Systematically poor record-keeping, especially commingling funds, can lead to 'piercing the corporate veil,' where a court can hold you personally liable for your company's debts. It also makes you vulnerable in an IRS audit." },
        { title: "How does professional bookkeeping mitigate these risks?", content: "Professional bookkeeping ensures your financial records are always accurate, complete, and compliant with IRS regulations. This creates an audit-proof paper trail, guarantees your tax return is based on solid data, and provides the reliable reports needed for fundraising and strategic planning." }
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
              Bookkeeping Compliance Risks
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Messy books aren't just an inconvenience; they expose your business to severe financial and legal risks.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk #1: IRS Penalties & Audits">
                <p>This is the most direct risk. If your bookkeeping is inaccurate, your tax return will be inaccurate. In an IRS audit, if you cannot provide clear records to support your income and deductions, the IRS can disallow expenses, recalculate your tax liability, and impose substantial penalties for underpayment, negligence, and failure to keep adequate records.</p>
            </ContentSection>
            
            <ContentSection title="Risk #2: Lost Tax Deductions">
                 <p>The flip side of IRS penalties is simply overpaying your taxes. Without a systematic process for tracking every business expense, you will inevitably miss out on legitimate deductions. Every missed deduction is a direct, unnecessary transfer of your company's cash to the government.
                 </p>
            </ContentSection>
            
            <ContentSection title="Risk #3: Loss of Legal Liability Protection">
                 <p>If you commingle business and personal funds and fail to maintain separate, professional books, a court can rule that your company is your "alter ego." This pierces the corporate veil, making your personal assets vulnerable in a lawsuit against your business.</p>
            </ContentSection>

            <ContentSection title="Risk #4: Inability to Secure Financing or Sell Your Business">
                 <p>No investor, lender, or potential acquirer will take you seriously without clean, reliable financial statements. Poor bookkeeping makes it impossible to produce these reports, effectively shutting you off from external capital and future exit opportunities.
                 </p>
            </ContentSection>

             <ContentSection title="The Solution: A Professional Foundation">
                <p>These risks are entirely avoidable. By using a professional bookkeeping service from the start, you ensure your financial records are always accurate, compliant, and audit-ready. It's an essential insurance policy against costly penalties and a foundational investment in your company's future value.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
