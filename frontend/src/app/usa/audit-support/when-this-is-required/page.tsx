
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

export default function WhenRequiredPage() {
    const aiBlocks = [
        { title: "When is a financial audit typically required?", content: "A financial audit is most commonly required contractually after a company raises a Series A or later round of venture capital. It can also be required by banks as a condition for a large loan or line of credit." },
        { title: "Are audits legally mandatory for private companies?", content: "No, most private companies in the US are not legally required to have an audit. The requirement is almost always driven by third-party stakeholders like investors or lenders who demand independent assurance over the company's financials." },
        { title: "When is an IRS audit required?", content: "An IRS audit is not something you choose; it's an examination initiated by the IRS. You are legally required to comply if you receive an audit notice. Our service provides support for both financial audits and IRS audits." }
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
              When Is An Audit Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the key contractual and regulatory triggers that make a financial audit necessary.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Venture Capital Investment">
                <p>This is the most common trigger for startups. Almost all institutional venture capital funds include a clause in their financing agreements that requires the company to provide audited annual financial statements. This provides the VCs with assurance over the accuracy of your financial reporting and helps them with their own fund valuation.</p>
            </ContentSection>
            
            <ContentSection title="Bank Covenants">
                 <p>When securing a significant business loan or line of credit, banks will often include a "loan covenant" in the agreement that mandates the submission of audited financials each year. This helps the bank monitor the company's financial health and its ongoing ability to repay the debt.</p>
            </ContentSection>
            
            <ContentSection title="Preparation for M&A or IPO">
                 <p>If you are planning to sell your company or take it public, you will need several years of audited financial statements. A potential buyer or underwriter will require this as a core part of their due diligence process. Many companies proactively undergo audits for 1-2 years before a planned exit event.</p>
            </ContentSection>

            <ContentSection title="Regulatory Requirements">
                 <p>While most private companies are not legally required to be audited, certain regulated industries are. This can include financial services companies (e.g., broker-dealers), insurance companies, and non-profits that receive a certain amount of government funding.
                 </p>
            </ContentSection>

             <ContentSection title="The Bottom Line: It's Driven by Stakeholders">
                <p>For most startups and SMBs, the need for an audit is not dictated by a general law, but by the specific demands of your investors, lenders, or potential acquirers. Review your financing agreements and loan covenants to understand your specific obligations. Our audit support service prepares you to meet these demands with confidence.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

