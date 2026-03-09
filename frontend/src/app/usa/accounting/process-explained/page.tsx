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
        { title: "What is the outsourced accounting process?", content: "The process involves four key steps: 1) Securely connecting your bank accounts, 2) Automated daily import and categorization of transactions, 3) Monthly review and reconciliation by a human bookkeeper, and 4) Delivery of financial statements." },
        { title: "How is my data kept secure?", content: "We use secure, read-only API connections provided by services like Plaid to link to your bank accounts. We never store your banking credentials." },
        { title: "What financial statements will I receive?", content: "Each month, you will receive the three core financial statements: the Income Statement (P&L), the Balance Sheet, and the Statement of Cash Flows." }
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
              Our Accounting Process
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A look at how we combine technology and human expertise to deliver accurate financials every month.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Securely Connect Your Accounts" description="We use industry-leading services like Plaid to create a secure, read-only connection to your business bank accounts, credit cards, and payment processors (like Stripe and PayPal)." />
            
            <ProcessStep number="2" title="Automated Transaction Syncing" description="Our platform automatically fetches new transactions every day. This eliminates manual data entry and ensures your books are always up-to-date." />

            <ProcessStep number="3" title="AI-Powered Categorization" description="Proprietary machine learning models categorize the majority of your transactions into the correct accounts on your Chart of Accounts, saving hours of manual work." />

            <ProcessStep number="4" title="Human Review & Reconciliation" description="This is the crucial step. Every month, a dedicated human bookkeeper reviews all transactions, handles any complex items the AI couldn't, and reconciles your accounts against your bank statements to ensure perfect accuracy." />
            
            <ProcessStep number="5" title="Financial Statements Delivered" description="Once reconciled, we deliver your key financial statements—Income Statement, Balance Sheet, and Statement of Cash Flows—to your dashboard, providing you with a clear view of your financial health." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

