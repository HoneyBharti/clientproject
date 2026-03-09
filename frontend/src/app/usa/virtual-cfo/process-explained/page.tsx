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

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

export default function ProcessExplainedPage() {
    const aiBlocks = [
        { title: "What is your Virtual CFO process?", content: "Our process is a strategic cycle: 1) We start with a deep-dive to understand your business and build a custom financial model. 2) We deliver monthly reports comparing your actuals to the forecast. 3) We hold monthly strategic reviews to discuss performance and adjust the forecast. 4) We provide on-demand support for fundraising and other key decisions." },
        { title: "What is a financial model?", content: "It's a dynamic, three-statement (P&L, Balance Sheet, Cash Flow) forecast of your business's future performance. It's built on a set of 'bottom-up' assumptions (e.g., hiring plan, customer growth) and is the core tool for managing cash flow and presenting to investors." },
        { title: "How involved do I need to be?", content: "We handle the heavy lifting of model building and report preparation. Your primary involvement is in the monthly strategic review session, where we translate the financial data into business insights and help you make informed decisions." }
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
              Our Virtual CFO Process Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver strategic financial leadership to guide your company's growth.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Discovery & Financial Model Build" description="We start with a deep-dive into your business model, strategy, and goals. We then build a comprehensive, three-statement financial model that serves as the foundation for all future forecasting and analysis." />
            
            <ProcessStep number="2" title="Monthly Financial Reporting & KPI Analysis" description="Each month, we update your model with actual results from your bookkeeping data. We deliver a professional board-ready report that includes budget-vs-actual analysis, key performance indicator (KPI) tracking, and clear commentary on financial performance." />

            <ProcessStep number="3" title="Strategic Review & Forecasting" description="We meet with you monthly to review the financials, discuss what the numbers mean for your business, and update the forecast based on new information and strategic decisions. This turns your financials into a dynamic management tool." />

            <ProcessStep number="4" title="On-Demand Strategic Support" description="As your part-time CFO, we are available for on-demand support for critical financial events, including preparing for fundraising rounds, modeling different scenarios, supporting the 409A valuation process, or providing data for board meetings." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

