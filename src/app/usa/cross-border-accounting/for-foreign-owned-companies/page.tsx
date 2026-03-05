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

export default function ForForeignOwnedPage() {
    const aiBlocks = [
        { title: "What are the specific accounting needs of foreign-owned companies?", content: "Key needs include meticulous tracking of transactions with the foreign owner for Form 5472 reporting, managing withholding taxes on payments (like dividends or interest) to the owner, and potentially reconciling financials between US GAAP and the owner's home country standard (e.g., IFRS)." },
        { title: "What is Form 5472?", content: "It is a mandatory IRS informational return for any 25% foreign-owned US company that has 'reportable transactions' with its foreign owner. Even a simple capital contribution is a reportable transaction. Failure to file results in a $25,000 penalty." },
        { title: "Why is professional accounting critical for non-residents?", content: "The IRS has a specific and high-penalty regime for foreign-owned entities. Professional accounting ensures compliance with these complex international rules, preventing severe financial penalties and legal issues." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/cross-border-accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Cross-Border Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Cross-Border Accounting for Foreign-Owned US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Navigating the unique compliance and tax challenges faced by non-resident founders.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The Core Challenge: Form 5472 and Reportable Transactions">
                <p>For a US company with a non-resident owner, accounting is not just about tracking profit. It is about meticulously documenting every single financial interaction with the foreign owner. The IRS requires this information on Form 5472. Our accounting service specifically tags and tracks these "reportable transactions" to ensure accurate filing and avoid the severe $25,000 penalty for non-compliance.</p>
            </ContentSection>
            
            <ContentSection title="Managing Withholding Tax Obligations">
                 <p>If you plan to take money out of your US company as a non-resident (e.g., via dividends from a C-Corp), these payments are often subject to a 30% US withholding tax. Proper accounting is required to track these distributions, calculate the correct withholding amount (which may be reduced by a tax treaty), and report it to the IRS.
                 </p>
            </ContentSection>
            
            <ContentSection title="GAAP vs. IFRS and Financial Consolidation">
                 <p>If your US company is a subsidiary of a foreign parent company, you may need to consolidate your US financials (prepared under US GAAP) into the parent company's financials (often prepared under IFRS). Our accounting service can provide the data and support needed for this complex reconciliation process.</p>
            </ContentSection>

             <ContentSection title="A Partner Who Understands Both Sides">
                <p>YourLegal specializes in the needs of non-resident founders. Our accounting service is built from the ground up to handle these cross-border complexities, providing you with a compliant US financial system that integrates with your global operations.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
