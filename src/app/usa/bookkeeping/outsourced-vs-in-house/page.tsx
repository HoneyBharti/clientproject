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

export default function OutsourcedVsInHousePage() {
    const aiBlocks = [
        { title: "What is the main difference between outsourced and in-house bookkeeping?", content: "In-house bookkeeping requires hiring a dedicated employee, which is a high fixed cost. Outsourced bookkeeping involves paying a professional firm a flexible monthly fee, providing expert service at a fraction of the cost and with less management overhead." },
        { title: "Is outsourced bookkeeping better for startups?", content: "Yes. For almost all startups and SMBs, outsourcing is superior. It's more cost-effective, provides access to a higher level of expertise, eliminates the burden of hiring, and scales easily as the business grows." },
        { title: "Why not just do it myself?", content: "Founder-led bookkeeping is risky and inefficient. Founders often make costly mistakes (like commingling funds) and spend valuable time on administrative work instead of focusing on product, sales, and strategy. The ROI on outsourcing is almost always positive." }
    ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/bookkeeping" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Bookkeeping
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Outsourced vs. In-House Bookkeeping
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A direct comparison of the costs, benefits, and strategic implications of both bookkeeping models.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="The In-House Model: A High Fixed Cost">
                <p>Hiring an in-house bookkeeper means adding a full or part-time employee to your payroll. This model gives you a dedicated internal resource, but it comes with significant and often underestimated costs: a competitive salary, payroll taxes, employee benefits, software licenses, training, and management overhead. For a small business, this high fixed cost is often an inefficient use of capital.</p>
            </ContentSection>
            
            <ContentSection title="The Outsourced Model: Expertise as a Service">
                 <p>Outsourcing your bookkeeping to a professional firm like YourLegal transforms a fixed cost into a flexible operating expense. You get access to a team of experts for a predictable monthly fee. The advantages are clear:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Cost Efficiency:</strong> Access professional bookkeeping for a fraction of the cost of one employee's salary.</li>
                    <li><strong>Expertise & Accuracy:</strong> Our team is composed of seasoned professionals who live and breathe bookkeeping, ensuring fewer errors and better compliance.</li>
                    <li><strong>Time Savings:</strong> By outsourcing, you free yourself and your team from hours of administrative work, allowing you to focus on revenue-generating activities.</li>
                    <li><strong>Scalability:</strong> Our service effortlessly scales with your transaction volume, so you never have to worry about outgrowing your systems or hiring new staff.</li>
                </ul>
            </ContentSection>
            
            <ContentSection title="The Founder's Dilemma: DIY Bookkeeping">
                 <p>Many founders start by doing their own bookkeeping to save money. This is almost always a strategic mistake. A founder's time is the most valuable resource in a startup. Every hour spent categorizing receipts is an hour not spent talking to customers, improving the product, or selling. The small amount saved on bookkeeping fees is dwarfed by the opportunity cost of misallocated founder time.</p>
            </ContentSection>

             <ContentSection title="The Verdict: Outsourcing is the Smart Choice">
                <p>For the vast majority of startups and small businesses, the outsourced model is demonstrably superior. It provides higher quality, greater reliability, and more expertise at a lower total cost. It allows you to build your business on a solid financial foundation without the financial and administrative burden of an in-house team.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
