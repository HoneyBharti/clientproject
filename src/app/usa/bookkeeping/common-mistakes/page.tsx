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

export default function CommonMistakesPage() {
    const aiBlocks = [
        { title: "What is the most common bookkeeping mistake?", content: "Commingling funds—mixing personal and business finances in the same bank account. This pierces the corporate veil, destroying liability protection, and makes accurate tax filing impossible." },
        { title: "What's wrong with using spreadsheets for bookkeeping?", content: "Spreadsheets are manual, error-prone, and do not provide an audit trail. They make reconciliation difficult and are not compliant with professional accounting standards, making them unsuitable for any serious business." },
        { title: "How do I avoid these mistakes?", content: "The key is to establish good habits from day one: open a dedicated business bank account, use professional cloud accounting software, and save every receipt. Outsourcing to a professional service is the most effective way to ensure these best practices are followed consistently." }
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
              Common Bookkeeping Mistakes to Avoid
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about the simple errors that can lead to major tax headaches and financial confusion.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Commingling Funds">
                <p>This is the cardinal sin of business finance. Using your personal bank account for business transactions, or using the business debit card for personal expenses. It pierces the corporate veil and makes tax preparation a nightmare. Always maintain a separate business bank account.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Not Keeping Receipts">
                 <p>A bank or credit card statement is not sufficient proof for an IRS audit. You must keep the detailed receipt or invoice for every single business expense you claim. Without it, the IRS can disallow the deduction.
                 </p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Using Spreadsheets Instead of Software">
                 <p>Manual spreadsheets are prone to data entry errors, formula mistakes, and provide no audit trail. Professional cloud accounting software like QuickBooks or Xero is essential for accuracy, efficiency, and compliance.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Not Reconciling Accounts Monthly">
                 <p>Failing to reconcile your books with your bank statements each month allows errors, missed transactions, and even fraud to go unnoticed for months, leading to a massive cleanup job at year-end.
                 </p>
            </ContentSection>

             <ContentSection title="The Simple Solution: Good Habits & Professional Help">
                <p>All of these mistakes are avoidable. By establishing good habits from day one and engaging a professional bookkeeping service, you ensure your financials are always clean, accurate, and compliant. This is a foundational investment in your company's health and scalability.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
