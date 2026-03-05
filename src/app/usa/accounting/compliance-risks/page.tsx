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
        { title: "What are the main compliance risks of poor accounting?", content: "The main risks are IRS penalties for inaccurate tax filings, loss of liability protection from commingling funds, inability to secure funding due to unreliable financials, and potential director liability for failing to maintain proper records." },
        { title: "How does poor accounting lead to tax penalties?", content: "Inaccurate books result in incorrect income and deduction calculations on tax returns. This can lead to underpayment of taxes, which triggers IRS penalties and interest, or overpayment, which means you lose money." },
        { title: "Can accounting mistakes affect fundraising?", content: "Absolutely. Investors conduct deep due diligence on a company's financials. If the books are messy, non-compliant with GAAP, or contain errors, investors will lose confidence and likely walk away from the deal." }
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
              Accounting Compliance Risks
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the significant financial and legal risks of inadequate accounting practices for your US company.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk 1: IRS Penalties and Audits">
                <p>Inaccurate accounting is the number one cause of incorrect tax returns. If your bookkeeping is messy, you risk underreporting income or overstating deductions, both of which can lead to significant IRS penalties, back-taxes, and interest charges if you are audited.</p>
            </ContentSection>
            
            <ContentSection title="Risk 2: Loss of Liability Protection">
                 <p>If you fail to treat your company as a separate financial entity (e.g., by commingling funds), a court can "pierce the corporate veil," making you personally liable for your business's debts and lawsuits. Proper accounting is key to maintaining this separation.
                 </p>
            </ContentSection>
            
            <ContentSection title="Risk 3: Inability to Secure Funding">
                 <p>No serious investor or lender will provide capital to a company with unreliable financial records. Clean, GAAP-compliant accounting is a prerequisite for any fundraising or loan application process. Poor books will kill a deal before it even starts.</p>
            </ContentSection>

            <ContentSection title="Risk 4: Poor Business Decisions">
                 <p>Without accurate data on your revenue, costs, and cash flow, you are effectively flying blind. You cannot make informed strategic decisions about pricing, hiring, or expansion, which can lead to business failure.
                 </p>
            </ContentSection>

             <ContentSection title="Mitigate Risk with Professional Services">
                <p>The most effective way to mitigate these risks is to outsource your accounting to professionals. YourLegal ensures your books are always accurate, GAAP-compliant, and audit-ready, protecting you from penalties and providing the financial clarity you need to succeed.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
