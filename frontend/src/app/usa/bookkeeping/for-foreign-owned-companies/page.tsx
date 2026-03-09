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

export default function ForForeignOwnedPage() {
    const aiBlocks = [
        { title: "What are the specific bookkeeping needs of foreign-owned companies?", content: "The most critical need is to meticulously track all 'reportable transactions' between the US company and its foreign owner. This includes capital contributions, loans, and service payments. This data is mandatory for filing IRS Form 5472." },
        { title: "Why is tracking transactions with the owner so important?", content: "The IRS requires detailed reporting on these transactions to prevent improper profit-shifting out of the US. Failure to file Form 5472 correctly results in a minimum penalty of $25,000, making it a high-stakes compliance area." },
        { title: "How does your service handle this?", content: "Our bookkeeping process is designed to specifically identify and tag all transactions between the US entity and its foreign owners. This ensures that when it's time to file taxes, we have a clean, complete, and defensible record for Form 5472, protecting our clients from severe penalties." }
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
              Bookkeeping for Foreign-Owned US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Navigating the unique record-keeping requirements for non-resident founders.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The Core Challenge: Tracking Related-Party Transactions">
                <p>For a US company owned by a non-resident, standard bookkeeping is not enough. The IRS has a special set of rules designed to monitor the flow of money between a US entity and its foreign owners. The most important of these is the requirement to file Form 5472, which details all "reportable transactions" between the two parties.</p>
                <p className="mt-2">This means your bookkeeping system must not only track income and expenses, but must specifically identify every transaction that involves the foreign owner. This includes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Initial and subsequent capital contributions from the owner.</li>
                    <li>Loans made to or from the owner.</li>
                    <li>Payments for services rendered by the owner.</li>
                    <li>Reimbursements for expenses paid by the owner on behalf of the company.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="Why It's a High-Stakes Game">
                 <p>The penalty for failing to file an accurate Form 5472 is a staggering **$25,000**. This makes proper bookkeeping a critical risk management function for any foreign-owned US company. Without a meticulous record of all related-party transactions, accurately preparing this form is impossible.
                 </p>
            </ContentSection>
            
            <ContentSection title="Our Specialized Approach">
                 <p>YourLegal's bookkeeping service is built with the needs of non-resident founders in mind. Our process includes:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>**Specific Chart of Accounts:** We set up specific equity and loan accounts to track all funds flowing to and from the foreign owners.</li>
                    <li>**Transaction Tagging:** Our bookkeepers are trained to identify and tag all related-party transactions for easy reporting at year-end.</li>
                    <li>**Audit-Proof Records:** We ensure that every transaction is supported by documentation, creating a defensible record in case of an IRS inquiry.</li>
                </ul>
                <p className="mt-4">By outsourcing your bookkeeping to us, you ensure that your company is compliant with these complex international requirements from day one, protecting you from severe penalties and giving you peace of mind.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

