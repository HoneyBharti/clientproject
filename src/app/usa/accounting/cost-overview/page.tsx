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

export default function CostOverviewPage() {
    const aiBlocks = [
        { title: "How much does outsourced accounting cost in the US?", content: "The cost for outsourced accounting in the USA typically ranges from $300 per month for small businesses to $2,500+ per month for larger, more complex companies. Pricing is primarily based on transaction volume and service complexity." },
        { title: "What factors influence the cost?", content: "Key factors include the number of monthly transactions, number of connected bank/credit card accounts, whether you have employees (payroll), need multi-state tax filings, or require specialized reporting for investors." },
        { title: "Is outsourcing cheaper than hiring in-house?", content: "Yes, for almost all startups and SMBs, outsourcing is significantly more cost-effective. It eliminates the high fixed cost of an in-house accountant's salary, benefits, and overhead, providing access to a full team of experts for a fraction of the price." }
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
              US Accounting Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the typical costs of outsourced accounting services in the United States.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Typical Cost Ranges">
                <p>The cost of outsourced accounting varies based on your business's size and complexity. Here are some typical monthly ranges:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Small Businesses & Startups:</strong> $300 – $800 per month for core bookkeeping and financial reporting.</li>
                    <li><strong>Growing Companies:</strong> $800 – $2,500 per month, often including more advanced reporting, payroll for a small team, and tax planning.</li>
                    <li><strong>Multi-entity or Complex Operations:</strong> Custom pricing, typically starting at $2,500+ per month, which may include services like multi-state tax filings or financial consolidation.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="What Drives the Cost?">
                 <p>Several factors influence the price of accounting services:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Transaction Volume:</strong> The number of monthly transactions across your bank and credit card accounts is the primary driver.</li>
                    <li><strong>Number of Employees:</strong> If payroll services are included, cost increases with the number of employees.</li>
                    <li><strong>Complexity:</strong> Factors like inventory management, multi-currency transactions, or the need for GAAP-compliant revenue recognition increase the complexity and cost.</li>
                    <li><strong>Reporting Needs:</strong> Basic financial statements are standard, but custom dashboards, KPI tracking, and investor-ready board packs require a higher level of service.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The Value of Outsourcing">
                 <p>While these costs may seem significant, they represent a high return on investment. Outsourcing your accounting typically reduces overall finance function costs by 40-60% compared to hiring an in-house accountant, once salary, benefits, training, and software costs are factored in. More importantly, it provides peace of mind, ensures compliance, and delivers the financial insights needed to grow your business effectively.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
