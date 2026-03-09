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
        { title: "What is your bookkeeping process?", content: "Our process integrates technology and human expertise. We securely connect to your bank accounts to automatically import transactions, use AI to categorize them, and have a human bookkeeper review and reconcile everything monthly before delivering your financial reports." },
        { title: "What software do you use?", content: "We use industry-standard cloud accounting software like QuickBooks Online and Xero. This ensures your data is secure, accessible, and compliant with professional standards." },
        { title: "How do I provide receipts?", content: "Our system allows you to easily upload digital copies of receipts and invoices. You can snap a photo with your phone or forward an email, and we link it to the corresponding transaction, creating a fully-documented, audit-proof record." }
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
              Our Bookkeeping Process Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent look at how we deliver accurate financial records for your business, month after month.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Securely Connect Your Accounts" description="We use industry-leading services like Plaid to create a secure, read-only connection to your business bank accounts, credit cards, and payment processors (like Stripe and PayPal). Your banking credentials are never stored by us." />
            
            <ProcessStep number="2" title="Automated Transaction Syncing" description="Our platform automatically fetches new transactions every day. This eliminates manual data entry, reduces errors, and ensures your books are always current." />

            <ProcessStep number="3" title="AI-Powered Categorization" description="Proprietary machine learning models intelligently categorize the majority of your transactions into the correct accounts (e.g., 'Software', 'Marketing', 'Travel'), saving hours of manual work." />

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

