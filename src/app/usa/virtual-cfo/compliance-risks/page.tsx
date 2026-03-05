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

export default function ComplianceRisksPage() {
    const aiBlocks = [
        { title: "What are the strategic risks of not having a CFO?", content: "The primary risk is poor financial decision-making. This includes running out of cash unexpectedly due to a lack of forecasting, failing to secure investment due to weak financial models, and pursuing unprofitable growth strategies without understanding unit economics." },
        { title: "Can a lack of strategic finance kill a startup?", content: "Yes. It's one of the leading causes of startup failure. Many startups that appear to be growing fast 'die of indigestion' because they run out of cash. A vCFO's main job is to manage cash runway and prevent this." },
        { title: "How does a vCFO mitigate these risks?", content: "A vCFO mitigates these risks by implementing professional financial planning and analysis (FP&A). This includes detailed cash flow forecasting, KPI tracking, scenario modeling, and building investor-grade financial reports, which provides the strategic visibility needed to navigate growth safely." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/virtual-cfo" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Virtual CFO
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Strategic Risks of No CFO
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Operating without high-level financial strategy exposes your growing business to serious, often fatal, risks.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk 1: Running Out of Cash">
                <p>This is the number one killer of startups. Without rigorous cash flow forecasting and runway management, a company can easily spend its way into oblivion, even while signing new customers. A vCFO's primary job is to ensure this never happens by providing a clear view of future cash positions.</p>
            </ContentSection>
            
            <ContentSection title="Risk 2: Failed Fundraising">
                 <p>Venture capitalists are financial professionals. They expect to see sophisticated, bottom-up financial models, not just a pitch deck. Approaching investors without this level of financial rigor signals inexperience and will lead to a swift rejection.
                 </p>
            </ContentSection>
            
            <ContentSection title="Risk 3: Unprofitable Growth">
                 <p>It's easy to grow a business by spending $2 to make $1. Without a deep understanding of your unit economics (like Customer Acquisition Cost vs. Lifetime Value), you can scale an unprofitable business model right into the ground. A vCFO provides the analysis to ensure your growth is sustainable.</p>
            </ContentSection>

            <ContentSection title="Risk 4: Poor Strategic Decisions">
                 <p>Without financial modeling, key decisions about pricing, hiring, or new market entry are based on guesswork. A vCFO provides the data and scenario analysis needed to make these critical decisions with confidence, based on their likely financial impact.
                 </p>
            </ContentSection>

             <ContentSection title="Mitigate Risk with a Virtual CFO">
                <p>These are not compliance risks; they are strategic risks that can determine the success or failure of your entire venture. A Virtual CFO service is an investment in strategic financial leadership that provides the tools and insights needed to navigate the challenges of growth and build a valuable, enduring company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
