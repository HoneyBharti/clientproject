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

export default function CommonMistakesPage() {
    const aiBlocks = [
        { title: "What is the most common annual compliance mistake?", content: "The most common mistake is simply forgetting. Founders get busy and miss state deadlines like the Delaware Franchise Tax (March 1st for C-Corps) or their Wyoming Annual Report, leading to automatic penalties and loss of good standing." },
        { title: "Can I just file my federal tax return?", content: "No. A major mistake is assuming the IRS tax return covers state obligations. State Annual Reports are a completely separate filing with a different agency (the Secretary of State) and different deadlines. You must do both." },
        { title: "How can I avoid these mistakes?", content: "The only reliable way is to use a professional compliance service. We track all state and federal deadlines automatically, handle the filings on your behalf, and ensure you never miss a critical date, protecting your company's legal status." }
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
              Common Annual Compliance Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about the simple oversights that lead to penalties and loss of good standing.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Confusing State and Federal Filings">
                <p>The most frequent error is assuming that filing a federal tax return with the IRS covers all obligations. It does not. Your State Annual Report is a separate filing owed to your state of incorporation (e.g., Delaware) with a different deadline. You must file both to remain compliant.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Forgetting Critical Deadlines">
                 <p>Unlike the well-known April 15th tax deadline, state annual report deadlines vary. The Delaware C-Corp Franchise Tax is due March 1st. The Delaware LLC Annual Tax is due June 1st. Wyoming reports are due on the anniversary of formation. It's easy to miss these varied dates, leading to automatic penalties.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Letting the Registered Agent Lapse">
                 <p>Every US company must maintain a Registered Agent. If you fail to renew your Registered Agent service, you will not receive official state notices, will fall out of good standing, and your company can be dissolved by the state.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Ignoring the BOI Report">
                 <p>While not an 'annual' filing for most, the new mandatory Beneficial Ownership Information (BOI) Report must be filed with FinCEN. Companies formed in 2024 have 90 days to file. Forgetting this new requirement carries a severe $500-per-day penalty.</p>
            </ContentSection>

             <ContentSection title="The Solution: Automate Your Compliance">
                <p>The only reliable way to avoid these mistakes is to put your compliance on autopilot. YourLegal's Vitals and Elite plans are designed as an all-in-one compliance service. We track all your state and federal deadlines, manage your registered agent service, and handle all filings on your behalf, so you can focus on your business.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

