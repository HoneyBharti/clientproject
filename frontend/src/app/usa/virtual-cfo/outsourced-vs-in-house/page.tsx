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

export default function OutsourcedVsInHousePage() {
    const aiBlocks = [
        { title: "What is the main difference between a Virtual CFO and an in-house CFO?", content: "A Virtual CFO is a part-time, outsourced strategic service, while an in-house CFO is a full-time, on-payroll executive. The vCFO model provides access to top-tier strategic expertise for a fraction of the cost of a full-time hire, making it ideal for startups." },
        { title: "Is a vCFO cheaper than a full-time CFO?", content: "Yes, vastly cheaper. A full-time CFO in the US can command a salary of $250,000 plus benefits and equity. A vCFO service typically costs between $30,000 to $100,000 per year, providing a similar or higher level of strategic insight without the overhead." },
        { title: "When does it make sense to hire a full-time CFO?", content: "A full-time CFO becomes necessary when a company reaches a very large scale (e.g., post-Series C, pre-IPO) and has complex daily operational finance needs that require a dedicated, in-house executive to manage a large internal finance team." }
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
              Virtual CFO vs. Traditional In-House CFO
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A clear comparison of the costs, benefits, and roles of an outsourced vCFO vs. a full-time executive.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The In-House Model: A Six-Figure Investment">
                <p>A traditional, full-time CFO is a W-2 employee and a member of your executive team. They are responsible for the entire finance function. However, this comes at a tremendous cost. In the US, an experienced CFO's salary typically starts at $250,000, plus equity, benefits, and bonuses. For a startup or growth-stage company, this is a massive fixed cost that consumes valuable cash runway.</p>
            </ContentSection>
            
            <ContentSection title="The Outsourced Model: Expertise On-Demand">
                 <p>A Virtual CFO service provides access to a senior financial strategist on a fractional basis for a predictable monthly fee. This model offers compelling advantages for growing businesses:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Cost Efficiency:</strong> Get executive-level strategic guidance for 10-30% of the cost of a full-time hire.</li>
                    <li><strong>Breadth of Experience:</strong> A vCFO from a firm has seen dozens of companies at your stage and brings a wealth of best practices and benchmarks that a single in-house hire may not possess.</li>
                    <li><strong>Purely Strategic Focus:</strong> A vCFO focuses solely on high-value work: fundraising, modeling, and strategy. They are not bogged down in day-to-day administrative tasks, meaning you get a higher ROI on your spend.</li>
                    <li><strong>Scalability:</strong> You can easily scale the service up during a fundraise and down during a quieter period, a flexibility you don't have with a full-time employee.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The Modern Standard for Startups">
                 <p>For startups and growth-stage companies, the vCFO model has become the industry standard. It provides the exact strategic expertise needed to satisfy investors and guide growth, without the crippling fixed cost of a full-time executive. It's the most capital-efficient way to professionalize your finance function and build a scalable company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

