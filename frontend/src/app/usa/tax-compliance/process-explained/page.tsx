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

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

export default function ProcessExplainedPage() {
    const aiBlocks = [
        { title: "What is your tax compliance process?", content: "Our process includes: 1) Finalizing your annual bookkeeping, 2) Preparing a draft of your federal and state tax returns, 3) Sending the draft to you for review and signature, 4) E-filing the signed returns with the IRS and state authorities, and 5) Providing you with confirmation of acceptance." },
        { title: "What information do you need from me?", content: "Since our tax service is integrated with our bookkeeping service, we have most of the financial data we need. We will typically only need you to answer a short questionnaire about your business activities for the year and to digitally sign the final returns before we can file." },
        { title: "Do you handle the actual tax payment?", content: "We calculate the amount of tax owed, but you are responsible for making the payment directly to the IRS and state tax agencies. We provide clear instructions on how and when to make these payments." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/tax-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Tax Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Our Tax Compliance Process Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step look at how we prepare and file your US business tax returns, ensuring accuracy and peace of mind.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Year-End Bookkeeping Finalization" description="The process begins after your financial year is over. Our bookkeeping team completes a final review and reconciliation of your accounts to ensure the data is 100% accurate and ready for tax preparation." />
            
            <ProcessStep number="2" title="Tax Return Preparation" description="Our tax team takes the finalized financial statements and prepares all necessary federal and state income tax returns, including any required international informational forms like Form 5472." />

            <ProcessStep number="3" title="Client Review and Signature" description="We provide you with a draft of the completed tax returns for your review. Once you approve, you will digitally sign an authorization form (Form 8879-C) allowing us to e-file on your behalf." />

            <ProcessStep number="4" title="E-Filing with Tax Authorities" description="Upon receiving your signature, we electronically file your returns with the IRS and the relevant state tax departments before the official deadlines." />
            
            <ProcessStep number="5" title="Confirmation and Record-Keeping" description="Once the tax authorities accept the filings, we upload the final returns and the filing confirmations to your secure document portal for your permanent records." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

