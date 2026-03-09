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
        { title: "What is the main difference between outsourced and in-house accounting?", content: "In-house accounting involves hiring full-time employees to manage your finances, incurring high fixed costs. Outsourced accounting involves partnering with a professional firm that provides a full finance team for a flexible, monthly fee, significantly reducing costs and management overhead." },
        { title: "Is outsourced accounting better for startups?", content: "Yes. For startups and small businesses, outsourcing is almost always superior. It provides access to a higher level of expertise at a fraction of the cost, eliminates the burden of hiring and managing a finance team, and offers greater scalability." },
        { title: "When does an in-house accountant make sense?", content: "An in-house accountant might make sense for very large, complex corporations with high transaction volumes and unique operational needs that require a dedicated, full-time employee physically on-site." }
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
              Outsourced vs. In-House Accounting
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A clear comparison of the benefits, costs, and strategic implications of both models.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The In-House Model: High Cost, High Control">
                <p>Hiring an in-house accountant or finance team gives you a dedicated resource that is fully immersed in your company culture. However, this comes at a significant cost: salaries, benefits, payroll taxes, office space, and software licenses. For a small business, the salary of a single qualified accountant (often $70,000+) can be a major financial burden.</p>
            </ContentSection>
            
            <ContentSection title="The Outsourced Model: Expertise on Demand">
                 <p>Outsourcing your accounting provides access to a full team of experts—bookkeepers, accountants, and CFOs—for a single, predictable monthly fee. This model offers several key advantages:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Cost Savings:</strong> Dramatically lower costs compared to hiring a full-time employee.</li>
                    <li><strong>Access to Expertise:</strong> You benefit from a team with a breadth of experience across many industries and company stages.</li>
                    <li><strong>Scalability:</strong> The service can easily scale up or down as your business needs change, without the need for hiring or firing.</li>
                    <li><strong>Focus:</strong> It frees up founders and management to focus on core business activities, not administrative tasks.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="Why Outsourcing is the Modern Choice">
                 <p>For most startups and small to medium-sized businesses, the choice is clear. The outsourced accounting model provides a higher level of service and expertise at a lower cost, with greater flexibility. It allows a small company to have a world-class finance function from day one, a crucial advantage in a competitive market.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

