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

export default function WhenRequiredPage() {
    const aiBlocks = [
        { title: "When is bookkeeping legally required in the US?", content: "Bookkeeping is legally required from day one of business operations to comply with IRS rules, which mandate that all businesses keep accurate records of their income and expenses to support their tax returns." },
        { title: "Do I need bookkeeping before I start making sales?", content: "Yes. Pre-revenue startups still have expenses (e.g., software, legal fees). These must be tracked correctly to be claimed as deductions against future income. Proper bookkeeping from the start ensures you don't miss these valuable deductions." },
        { title: "At what point is DIY bookkeeping no longer viable?", content: "DIY bookkeeping becomes unviable when transaction volume grows, you hire your first employee, you need to manage inventory, or you plan to seek outside investment. At these stages, the complexity and time commitment make professional services essential." }
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
              When Is Professional Bookkeeping Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              It's not just a good idea; it's a legal and operational necessity. Learn the key milestones that make bookkeeping mandatory.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="From Day One: IRS Compliance">
                <p>The moment you form a legal business entity, you are required by the IRS to keep accurate and permanent books of account. These records must be sufficient to show your income and expenses, which is the basis for your annual tax return. Failure to keep adequate records can result in disallowed deductions and penalties in an audit.</p>
            </ContentSection>
            
            <ContentSection title="When You Open a Business Bank Account">
                 <p>A separate business bank account is essential for liability protection. Bookkeeping is the process that reconciles your internal records with your bank statements, ensuring every transaction is accounted for and preventing commingling of funds.
                 </p>
            </ContentSection>
            
            <ContentSection title="When You Incur Your First Expense">
                 <p>Even before you make your first sale, you are likely spending money on software, marketing, or other startup costs. Accurate bookkeeping is required to track these expenses so they can be properly deducted against future income, reducing your tax bill.</p>
            </ContentSection>

            <ContentSection title="When You Make Your First Sale">
                 <p>As soon as revenue starts coming in, you need a reliable system to track it. Bookkeeping provides an accurate picture of your sales performance and forms the basis for calculating your gross and net profit. For e-commerce businesses, this also becomes critical for managing sales tax obligations.
                 </p>
            </ContentSection>

             <ContentSection title="The Verdict: It's Always Required">
                <p>While you might be able to handle DIY bookkeeping for a very short time, the legal requirement to maintain accurate records exists from the moment your company is formed. Professional bookkeeping is not just for large companies; it's a foundational service for any serious business that wants to stay compliant, manage its finances effectively, and build a scalable operation.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
