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
        { title: "How much do cross-border accounting services cost?", content: "Costs are higher than standard accounting due to the specialized expertise required. Monthly retainers typically start around $1,000 for basic services and can go to $5,000+ for complex multinational companies requiring transfer pricing studies and global consolidation." },
        { title: "What factors influence the cost?", content: "The main drivers are the number of international entities, the volume and complexity of intercompany transactions, the number of currencies involved, and the level of strategic tax planning and documentation required." },
        { title: "Is it worth the cost?", content: "Yes. The cost of one failed transfer pricing audit or a major withholding tax penalty can easily be tens or hundreds of thousands of dollars. Professional cross-border accounting is a high-ROI investment in risk mitigation and tax optimization." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/cross-border-accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Cross-Border Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Cross-Border Accounting Cost Overview
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of pricing for specialized international accounting and tax advisory services.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Typical Cost Ranges">
                <p>Cross-border accounting is a highly specialized, strategic service. The pricing reflects the deep expertise required to navigate international tax law and mitigate significant financial risks. Costs are typically structured as a monthly retainer:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Basic International Compliance:</strong> $1,000 – $2,500 per month. This may cover multi-currency bookkeeping, Form 5472 preparation, and basic withholding tax management.</li>
                    <li><strong>Advanced Services (with Transfer Pricing):</strong> $2,500 – $5,000+ per month. This level is for companies with active intercompany transactions and includes the development of transfer pricing policies and documentation.</li>
                    <li><strong>Full-Scope Global Consolidation:</strong> For multinational groups, services are highly customized and priced accordingly, often as part of a Virtual CFO engagement.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="What Drives the Cost?">
                 <p>The cost of cross-border accounting is determined by the level of complexity and risk:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Number of Entities:</strong> The more international subsidiaries or parent companies involved, the more complex the work.</li>
                    <li><strong>Volume of Intercompany Transactions:</strong> Higher volumes require more extensive tracking and documentation.</li>
                    <li><strong>Transfer Pricing Needs:</strong> The need for a formal transfer pricing study is a major cost driver.</li>
                    <li><strong>Tax Treaty Complexity:</strong> Operating in jurisdictions with complex tax treaties requires more specialized advisory time.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="An Investment in Risk Mitigation">
                 <p>It's important to view these costs as an investment, not an expense. The potential penalties for non-compliance in international tax (e.g., a $25,000 Form 5472 penalty) can dwarf the annual cost of professional services. Expert guidance ensures you are compliant, tax-efficient, and prepared for global growth.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
