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
        { title: "What is the most common strategic financial mistake?", content: "The most common mistake is a lack of cash flow forecasting. Founders often focus on revenue or profit but fail to manage their cash runway, leading them to run out of money unexpectedly, even while 'profitable'." },
        { title: "How does a vCFO prevent mistakes in fundraising?", content: "A vCFO prevents mistakes by building a defensible, bottom-up financial model, rather than a simple 'hockey stick' guess. They ensure all your metrics (MRR, churn, etc.) are accurate and can be backed up during due diligence, which prevents a loss of investor credibility." },
        { title: "Can a vCFO help with pricing?", content: "Yes. A key strategic mistake is pricing based on gut feel. A vCFO analyzes your costs, margins, and unit economics (like CAC and LTV) to help you develop a data-driven pricing strategy that supports profitable growth." }
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
              Common Strategic Financial Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Avoid these common financial planning errors that can hinder a startup's growth and fundraising potential.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Confusing Profit with Cash">
                <p>The most fatal financial mistake a founder can make. Your income statement can show a profit, but if your clients haven't paid you yet, you have no cash in the bank to make payroll. A Virtual CFO instills the discipline of focusing on the Statement of Cash Flows and managing cash runway above all else.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Top-Down, Unrealistic Forecasting">
                 <p>Investors immediately dismiss forecasts that say, "The market is $100 billion, and we'll capture 1%." A vCFO builds a credible, 'bottom-up' forecast based on tangible drivers like marketing spend, conversion rates, and sales team quotas. This creates a defensible operating plan, not a wild guess.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Not Understanding Unit Economics">
                 <p>Scaling a business without understanding your Customer Acquisition Cost (CAC) and Lifetime Value (LTV) is like pouring gasoline on a fire. A vCFO provides detailed analysis to ensure your growth is profitable and sustainable, preventing you from spending more to acquire customers than they are worth.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Setting Prices Based on 'Gut Feel'">
                 <p>Pricing is one of the most powerful growth levers, yet many founders set it without any data. A vCFO analyzes your gross margins, costs, and the value you provide to help you build a data-driven pricing strategy that maximizes revenue and profitability.
                 </p>
            </ContentSection>
            
            <ContentSection title="Mistake #5: Neglecting Scenario Planning">
                <p>Many founders only plan for the best-case scenario. A vCFO runs multiple scenarios (e.g., base case, worst case) to understand how different market conditions could impact cash flow. This allows the company to build contingency plans and be prepared for downturns.</p>
            </ContentSection>

             <ContentSection title="The Solution: Strategic Financial Leadership">
                <p>A Virtual CFO is the strategic partner who prevents these mistakes. They bring the financial rigor, forecasting tools, and analytical mindset needed to transform your financial function from a reactive chore into a proactive, strategic weapon for growth.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

