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
        { title: "When is annual compliance required?", content: "Annual compliance filings are required every year for every registered US company. The specific deadline varies by state. For example, Delaware C-Corps must file by March 1st each year, while Delaware LLCs must file by June 1st." },
        { title: "Is it required for companies with no activity?", content: "Yes. Annual compliance is required regardless of your company's revenue or activity level. It is a fee for the privilege of existing as a legal entity. Even dormant companies must complete their annual filings to avoid penalties and dissolution." },
        { title: "What happens if I miss the deadline?", content: "Missing a state deadline automatically triggers late fees and the loss of your company's 'good standing' status, which can restrict your ability to do business. Our compliance service is designed to ensure these deadlines are never missed." }
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
              When Is Annual Compliance Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A guide to the mandatory annual deadlines that every US company must meet.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="An Annual, Mandatory Obligation">
                <p>Annual compliance is, as the name suggests, a requirement that must be met every single year. Unlike your initial company formation, this is a recurring task. Every US state requires registered companies to check in annually by filing a report and/or paying a fee to maintain their active status.</p>
            </ContentSection>
            
            <ContentSection title="Deadlines Vary by State and Entity Type">
                 <p>There is no single "national" deadline for annual compliance; it is determined by your state of incorporation and, in some cases, your entity type.</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Delaware C-Corporations:</strong> Must file an Annual Report and pay Franchise Tax by **March 1st** every year.</li>
                    <li><strong>Delaware LLCs:</strong> Must pay a flat $300 Annual Tax by **June 1st** every year. No report is needed.</li>
                    <li><strong>Wyoming LLCs and C-Corps:</strong> Must file an Annual Report on the first day of their "anniversary month" each year (the month the company was formed).</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="Required Even with Zero Revenue or Activity">
                 <p>This is a critical point that many founders misunderstand. Your annual compliance obligation has nothing to do with your company's profit or business activity. It is a fee paid for the simple privilege of existing as a legal entity in that state. Even if your company is dormant and has had zero transactions, you must still file your Annual Report and pay your franchise tax on time every year.</p>
            </ContentSection>

             <ContentSection title="YourLegal Manages It For You">
                <p>The complexity of tracking these varied deadlines is why our annual compliance service is so valuable. We monitor all your state deadlines and automatically prepare and submit the filings on your behalf, so you can have complete peace of mind.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
