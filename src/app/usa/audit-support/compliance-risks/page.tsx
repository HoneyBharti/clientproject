
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
        { title: "What are the main risks of a failed audit?", content: "The main risks include significant financial penalties and back-taxes, damage to reputation with investors and lenders, potential loss of funding, and in the case of a financial statement audit, a 'qualified' or 'adverse' opinion that invalidates the financials." },
        { title: "Can an audit lead to legal action?", content: "Yes. In cases of significant or fraudulent misstatements, a failed audit can lead to further investigation by regulatory bodies like the SEC or IRS, which can result in legal action against the company and its directors." },
        { title: "How does audit support mitigate these risks?", content: "Audit support mitigates risks by ensuring your financials are accurate and compliant before the audit begins. It prepares all necessary documentation and provides expert representation to manage the audit process, leading to a higher likelihood of a smooth process and a clean outcome." }
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
              Audit Compliance Risks
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Failing an audit is more than an inconvenience; it can have severe consequences for your business's financial health and future.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk 1: Financial Penalties & Back-Taxes">
                <p>For an IRS audit, a negative finding will almost always result in a bill for underpaid taxes, plus substantial penalties for negligence or substantial understatement, and daily compounding interest. For a financial statement audit, significant adjustments can trigger breaches of loan covenants, leading to financial penalties from lenders.</p>
            </ContentSection>
            
            <ContentSection title="Risk 2: Loss of Investor & Lender Confidence">
                 <p>For a venture-backed startup, a "qualified" or "adverse" opinion on a financial statement audit is a major red flag. It signals to your board and future investors that your financial controls are weak and your reporting is unreliable. This can make it extremely difficult to raise subsequent funding rounds.
                 </p>
            </ContentSection>
            
            <ContentSection title="Risk 3: Reputational Damage">
                 <p>An audit failure can damage your company's reputation with customers, suppliers, and partners. For B2B companies, particularly those undergoing security audits like SOC 2, a failed audit can lead to a loss of enterprise customers who require proof of compliant controls.</p>
            </ContentSection>

            <ContentSection title="Risk 4: Distraction and High Costs">
                 <p>A contentious or difficult audit consumes an enormous amount of management time and focus, distracting you from running the business. It also leads to significantly higher professional fees from both the auditors and your own representatives who have to manage the process and remediate issues.
                 </p>
            </ContentSection>

             <ContentSection title="Mitigate Risks with Audit Readiness">
                <p>The best way to mitigate these risks is to invest in "audit readiness." This means maintaining clean, compliant, and well-documented books year-round. Our audit support services ensure your financials are always prepared for scrutiny, transforming an audit from a high-stakes risk into a manageable compliance event.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
