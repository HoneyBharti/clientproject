
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

export default function VirtualCfoServicePage() {
  const serviceName = "Virtual CFO";
  const countryName = "United Kingdom";
  const primaryKeyword = "Virtual CFO services UK";

  const aiBlocks = [
    { title: "What is a Virtual CFO?", content: "A Virtual CFO provides high-level, strategic financial leadership for your UK business on a flexible, part-time basis. This includes financial modelling, cash flow management, board reporting, and fundraising support." },
    { title: "Who needs it?", content: "Growth-stage companies, funded startups, and businesses with complex operations in the UK that need executive-level financial strategy without the £100k+ cost of a full-time CFO." },
    { title: "Cost range?", content: "Typically £1,500 to £5,000+ per month, depending on the required level of strategic involvement, reporting complexity, and fundraising support." },
    { title: "DIY vs outsourcing?", content: "This is not a DIY role. Outsourcing provides access to seasoned CFOs with a track record of scaling businesses in the UK and navigating its venture capital ecosystem." },
    { title: "Final decision summary", content: "To navigate the financial complexities of scaling a business in the UK and to successfully raise capital from investors, a Virtual CFO service is an essential strategic investment." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/uk" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to UK Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in the {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic financial guidance for your UK business to drive growth, manage cash flow, and achieve long-term profitability.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our Virtual CFO services in the UK are for ambitious businesses that need high-level financial strategy beyond day-to-day accounting. This includes venture-backed startups preparing for their next funding round, established SMEs looking to optimize profitability, and international companies needing strategic oversight for their UK operations. It is for founders and CEOs who need a forward-looking financial partner to help them navigate the competitive UK and European markets.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A Virtual CFO is critical when your business faces complex financial decisions. This includes building a financial model for investors, forecasting cash flow to manage a high-growth phase, analyzing unit economics to improve profitability, preparing board reports, and developing a financial strategy for expansion into Europe. It's required when you need to answer not just "what happened?" but "what's next?"</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in the UK">
                <p>A full-time CFO in the UK is a significant executive expense, often exceeding £100,000 per year. Our Virtual CFO service offers access to the same calibre of talent on a flexible and cost-effective basis. Pricing is tailored to the depth of engagement required:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Growth Advisory Package:** £1,500 – £3,000 per month for services like financial modeling, KPI dashboarding, and regular strategic reviews.</li>
                    <li>**Comprehensive CFO Support:** £3,000 – £6,000+ per month for intensive support, including fundraising assistance (SEIS/EIS), board meeting participation, and treasury management.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Strategic & Compliance Risks">
                <p>Operating without expert financial leadership exposes a scaling business to significant strategic risks:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Uncontrolled Cash Burn:** Inability to accurately forecast runway, leading to premature capital shortages.</li>
                    <li>**Failed Fundraising Attempts:** Presenting weak or unrealistic financial projections to investors, damaging credibility with the UK's sophisticated venture capital community.</li>
                    <li>**Poor Unit Economics:** Lack of analysis on Customer Acquisition Cost (CAC) and Lifetime Value (LTV), leading to unprofitable growth strategies.</li>
                    <li>**Inefficient Tax Structuring:** Failure to optimize the use of valuable UK tax incentives like R&D tax credits or the patent box regime.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing the CFO role is the proven model for high-growth companies. YourLegal's Virtual CFO service provides more than just one person's expertise; you gain access to the collective knowledge of a firm that has supported numerous UK businesses. Our CFOs bring best-in-class financial models, reporting templates, and strategic frameworks for the UK market.</p>
                <p className="mt-4">This allows you to build a sophisticated finance function, impress investors, and make data-backed decisions to navigate the competitive landscape, all at a fraction of the cost of a full-time hire. It is the pinnacle of our <Link href="/uk/accounting" className="text-blue-600 hover:underline">accounting service</Link> offerings, providing a complete and strategic finance function for your company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
