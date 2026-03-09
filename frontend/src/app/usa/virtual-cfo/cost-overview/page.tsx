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

export default function CostOverviewPage() {
    const aiBlocks = [
        { title: "How much do Virtual CFO services cost in the US?", content: "Virtual CFO services in the US typically range from $2,500 to $8,000+ per month. The cost depends on the level of engagement, from strategic advisory and board reporting to intensive fundraising and M&A support." },
        { title: "What factors influence the cost of a vCFO?", content: "Key factors include the stage of the business (seed vs. series B), the complexity of the financial model, the frequency and depth of reporting required by the board, and the level of direct involvement needed in fundraising activities." },
        { title: "Is a vCFO cheaper than a full-time CFO?", content: "Yes, significantly. A full-time CFO in the US can cost $250,000+ per year in salary and benefits. A vCFO service provides access to the same or higher level of strategic expertise for a fraction of that cost, making it the standard choice for startups and growth-stage companies." }
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
              Virtual CFO Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent guide to the costs of strategic financial leadership services in the US.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Typical Cost Ranges for vCFO Services">
                <p>Virtual CFO services are a strategic investment in your company's growth and fundraising success. The pricing reflects the high level of expertise and direct involvement provided. Costs are typically structured as a monthly retainer:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Strategic Advisory (for Seed Stage):</strong> $2,500 – $4,000 per month. This often includes building the initial financial model, establishing KPIs, and monthly check-ins.</li>
                    <li><strong>Active Management (for Series A):</strong> $4,000 – $8,000 per month. This includes full ownership of the financial model, preparing monthly board reports, managing cash flow, and providing support during fundraising.</li>
                    <li><strong>Intensive Support (Series B+ or M&A):</strong> $8,000+ per month. This involves deep strategic involvement, direct participation in board meetings, and leading the financial due diligence process for major transactions.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="What Drives the Cost?">
                 <p>The cost of a vCFO service is driven by the time and expertise required:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Stage of Business:</strong> A later-stage company with more complex operations and reporting requirements will require a higher level of service.</li>
                    <li><strong>Fundraising Activity:</strong> A company actively fundraising requires significantly more support for model-building, due diligence, and scenario analysis.</li>
                    <li><strong>Reporting Cadence:</strong> The frequency and depth of board and investor reporting impacts the monthly workload.</li>
                    <li><strong>Team Management:</strong> A vCFO managing an internal finance team will have a higher level of engagement.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The Value Proposition: A Clear ROI">
                 <p>While the monthly cost is significant, it's crucial to compare it to the alternative: a full-time, in-house CFO, whose fully-loaded cost can easily exceed $300,000 per year. A vCFO provides the same or better strategic output for a fraction of the price.</p>
                 <p className="mt-4">Moreover, a good vCFO service pays for itself. Their expertise in financial modeling can help secure a higher valuation in a funding round, their cash flow management can extend runway by months, and their strategic analysis can identify opportunities for profitable growth, delivering a return on investment that far exceeds their fee.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

