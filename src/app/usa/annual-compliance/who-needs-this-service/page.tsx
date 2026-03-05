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
        { title: "Who needs Annual Compliance services?", content: "Every single registered US company, including LLCs and C-Corps, requires annual compliance services. It is a mandatory legal requirement to file annual reports with the state of formation to maintain the company's 'Good Standing' status." },
        { title: "Is this service optional?", content: "No. Failure to meet annual state filing deadlines results in penalties, loss of good standing, and can lead to the state administratively dissolving your company. It is a fundamental requirement of corporate existence." },
        { title: "Why is it important for non-resident founders?", content: "For non-resident founders, missing a state filing can have severe consequences, as it can jeopardize the company's ability to operate, hold a bank account, or be used for immigration purposes. A compliance service ensures these critical deadlines are never missed." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/annual-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Annual Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Who Needs Annual Compliance Services?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn why every registered US company, regardless of size or revenue, has a mandatory annual filing obligation.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="All Registered US Companies (LLCs & C-Corps)">
                <p>This is the most important group. Unlike federal tax filings which depend on income, state annual compliance is required simply because your company exists. Whether you have millions in revenue or are a pre-revenue startup, you must file your Annual Report and pay any associated franchise tax to your state of formation (e.g., Delaware, Wyoming) every year. It is a fundamental condition of maintaining your company's legal existence.</p>
            </ContentSection>
            
            <ContentSection title="Companies Seeking Loans or Investment">
                <p>Before any bank will lend you money or any venture capitalist will invest, they will require a "Certificate of Good Standing" from your state of formation. You can only get this certificate if your annual compliance filings are up to date. Therefore, staying compliant is a critical prerequisite for any form of financing.</p>
            </ContentSection>
            
            <ContentSection title="Non-Resident Founders">
                 <p>For international founders, staying on top of annual state filings is even more critical. Missing a deadline can put your company in bad standing, which could jeopardize your US business bank account, your ability to get a visa, or your contracts with US customers. A reliable compliance service is essential protection for your US venture.</p>
            </ContentSection>

            <ContentSection title="Any Business Wanting to Avoid Penalties and Dissolution">
                 <p>Failing to file your annual report leads to automatic penalties. If the failure persists, the state will administratively dissolve your company, meaning it legally ceases to exist. This can have catastrophic consequences, including the potential loss of your personal liability protection. Annual compliance services are designed to prevent this worst-case scenario.
                 </p>
            </ContentSection>

             <ContentSection title="The Bottom Line">
                <p>Annual compliance is not an optional service for a select few; it is a mandatory legal requirement for every single registered business in the United States. Our service ensures this critical obligation is always met, providing peace of mind and protecting your business.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
