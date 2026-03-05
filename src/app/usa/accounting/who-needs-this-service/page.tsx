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

export default function WhoNeedsThisServicePage() {
    const aiBlocks = [
        { title: "Who needs accounting services in the USA?", content: "Any registered US business, from early-stage startups and e-commerce stores to established SMBs and foreign-owned entities, needs accounting services to ensure tax compliance, manage finances, and prepare for growth or investment." },
        { title: "Is this service for non-resident founders?", content: "Yes, our accounting services are specifically designed to handle the unique needs of non-resident founders, including compliance with international reporting requirements like Form 5472." },
        { title: "Is it suitable for a company with no revenue?", content: "Yes, even pre-revenue companies have expenses and filing requirements. Proper accounting ensures all costs are tracked correctly for future tax deductions and that you meet all IRS filing deadlines to avoid penalties." }
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
              Who Needs US Accounting Services?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our professional accounting services are designed for a wide range of businesses operating in the US market.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Venture-Backed Startups">
                <p>For startups that have raised or plan to raise venture capital, GAAP-compliant accounting is non-negotiable. Investors require accurate, reliable financial statements for due diligence and ongoing board reporting. Our service provides the investor-grade financials you need.</p>
            </ContentSection>
            
            <ContentSection title="Foreign-Owned US Companies">
                 <p>Non-resident founders face a unique set of US tax and compliance challenges, including specific IRS informational returns. Our accounting service is built to handle these complexities, ensuring your US entity stays compliant.
                 </p>
            </ContentSection>
            
            <ContentSection title="E-commerce Businesses">
                 <p>Online sellers deal with high transaction volumes, inventory management, and complex multi-state sales tax obligations. Our accounting services integrate with e-commerce platforms to provide clarity on profitability and manage tax compliance.
                 </p>
            </ContentSection>

            <ContentSection title="Consulting & Professional Services">
                 <p>For service-based businesses, accurate accounting is key to tracking project profitability, managing client invoices, and optimizing tax strategies. We help consultants and agencies understand their numbers and grow their bottom line.
                 </p>
            </ContentSection>

             <ContentSection title="Any Business Seeking Growth">
                <p>Ultimately, any business that wants to grow sustainably, make data-driven decisions, and maintain a clean bill of health with tax authorities needs professional accounting. It is the financial foundation of a successful company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
