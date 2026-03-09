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
        { title: "Who needs a Virtual CFO?", content: "A Virtual CFO is for growth-oriented businesses whose financial needs have surpassed basic bookkeeping. This includes venture-backed startups needing investor reporting, SMBs looking to optimize profitability, and companies preparing for a major financial event like fundraising or an acquisition." },
        { title: "Is a vCFO only for funded startups?", content: "No. While essential for funded startups, a vCFO is also valuable for any profitable, growing business that needs sophisticated cash flow management, budgeting, and strategic planning to scale effectively and increase enterprise value." },
        { title: "I already have a bookkeeper. Why do I need a vCFO?", content: "A bookkeeper records the past. A vCFO plans the future. A bookkeeper ensures your data is accurate, while a vCFO uses that data to build financial models, analyze KPIs, and provide strategic advice to help you make better business decisions." }
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
              Who Needs Virtual CFO Services?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our vCFO services are designed for ambitious founders who need strategic financial leadership to scale.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Venture-Backed & Fundraising Startups">
                <p>This is the primary audience. If you have raised, or plan to raise, money from venture capitalists, you need a vCFO. They build the financial models VCs expect, manage investor reporting, and provide the strategic financial oversight required to get to your next round.</p>
            </ContentSection>
            
            <ContentSection title="High-Growth SMBs">
                 <p>Even if you're bootstrapped, rapid growth brings financial complexity. A vCFO helps you manage cash flow, optimize pricing, analyze profitability by product or service line, and build a scalable financial infrastructure to support your growth.</p>
            </ContentSection>
            
            <ContentSection title="Companies Preparing for an Exit">
                 <p>If you plan to sell your company in the next 1-3 years, a vCFO is critical. They professionalize your financial reporting, clean up your books, and build the financial models needed to maximize your valuation and ensure a smooth due diligence process.</p>
            </ContentSection>

            <ContentSection title="Businesses with Complex Operations">
                 <p>If your business has multiple revenue streams, international operations, or complex cost structures, a vCFO can provide the analysis needed to understand the financial performance of each part of your business and make data-driven decisions.
                 </p>
            </ContentSection>

             <ContentSection title="The Bottom Line">
                <p>You need a Virtual CFO when you need to stop looking at your finances in the rearview mirror and start using them to map out the road ahead. It's for founders who have moved past basic compliance and are focused on strategic growth and value creation.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

