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
        { title: "What are the typical annual compliance costs?", content: "Costs consist of mandatory state fees and professional service fees. State fees include Annual Report filing fees (e.g., ~$60 in Wyoming) and Franchise Tax (e.g., $300 for a Delaware LLC). Our service fees for managing these filings are bundled into our Vitals and Elite plans." },
        { title: "Are government fees included in your plans?", content: "Our plan fees cover our professional services for preparing and managing the filings. Mandatory third-party government fees are a separate, pass-through cost. This transparency ensures you know exactly what you're paying for." },
        { title: "Is it cheaper to do it myself?", content: "While you would save on service fees, the risk of missing a deadline and incurring penalties (which can be hundreds or thousands of dollars) far outweighs the cost of a professional compliance service. Our service provides peace of mind and is a cost-effective insurance policy against penalties." }
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
              Annual Compliance Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A breakdown of the costs associated with keeping your US company in good standing.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="State Government Fees">
                <p>These are mandatory fees paid directly to the state of formation to keep your company legally active. They are not based on profit and are due every year.</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Delaware Franchise Tax:</strong> A flat $300 annual tax for LLCs. For C-Corps, it starts at $175 but can be higher depending on the number of authorized shares.</li>
                    <li><strong>Wyoming Annual Report:</strong> A fee of approximately $62, due on the anniversary of your company's formation.</li>
                    <li><strong>Other States:</strong> Most states have an Annual Report fee ranging from $50 to $500.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="Registered Agent Fees">
                 <p>Every US company must have a registered agent in its state of formation. This is an annual service that typically costs between **$100 and $200 per year**.</p>
            </ContentSection>
            
            <ContentSection title="Professional Service Fees">
                 <p>This is the fee paid to a service provider like YourLegal to manage and file your compliance documents. Our Vitals and Elite plans bundle this service with tax preparation and bookkeeping for a predictable annual fee, providing significant value compared to paying separate providers for each service.</p>
            </ContentSection>

             <ContentSection title="The Value of a Compliance Service">
                <p>While there is a cost to our service, it acts as an insurance policy against much larger costs. A single missed deadline can result in penalties that are several times the cost of an annual compliance plan. Our service automates this process, giving you peace of mind and allowing you to focus on your business.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

