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

export default function WhoNeedsThisServicePage() {
    const aiBlocks = [
        { title: "Who needs cross-border accounting services?", content: "Any business with financial activities in more than one country. This includes US companies with foreign owners, US parent companies with foreign subsidiaries, businesses selling to international customers, and companies that use overseas contractors or software." },
        { title: "I only have a US company, do I need this?", content: "If you are a non-resident founder of that US company, yes. Your ownership creates a cross-border relationship that is subject to specific IRS reporting rules, such as Form 5472. This falls under cross-border accounting." },
        { title: "Is this only for large multinational corporations?", content: "No. The rules for things like withholding tax and informational reporting apply to businesses of all sizes. A small startup with a foreign founder has many of the same cross-border compliance obligations as a large corporation." }
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
              Who Needs Cross-Border Accounting?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our service is essential for any business operating in the global economy.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="US Companies with Foreign Owners">
                <p>This is a primary group. If you are a non-resident who owns a US company, you need specialized accounting to manage IRS informational filings (like Form 5472), plan for withholding taxes on profit distributions, and navigate the complexities of your unique tax situation.</p>
            </ContentSection>
            
            <ContentSection title="Companies with International Subsidiaries or Parents">
                 <p>Any business that is part of a multinational group requires cross-border accounting to manage intercompany transactions, develop a transfer pricing policy, and handle global financial consolidation.</p>
            </ContentSection>
            
            <ContentSection title="Businesses with International Customers or Vendors">
                 <p>If you sell to customers in multiple countries or pay for software and services from foreign vendors, you need cross-border expertise to manage multi-currency accounting, international VAT/GST issues, and potential withholding tax obligations.</p>
            </ContentSection>

            <ContentSection title="Global E-commerce Brands">
                 <p>Online stores selling to a global customer base face a dizzying array of international sales tax laws, customs duties, and multi-currency payment gateway reconciliations. Cross-border accounting is essential for compliance and profitability.
                 </p>
            </ContentSection>

             <ContentSection title="Any Business with Global Ambitions">
                <p>In today's interconnected economy, almost every scaling business will eventually have a cross-border component. Engaging experts early ensures you build a global financial infrastructure that is compliant, efficient, and ready for growth.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

