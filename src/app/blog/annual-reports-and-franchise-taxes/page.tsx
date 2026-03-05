
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileText, Landmark, AlertTriangle, Building, MapPin } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "An Annual Report is a state filing that updates basic company information to remain in good standing. Franchise Tax is a fee paid to a state for the privilege of being incorporated there. In states like Delaware, these are combined into one annual filing, due March 1st for C-Corps and June 1st for LLCs. They are separate from federal income tax." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of State Annual Reports and Franchise Taxes. Who is it for? Owners of US companies, particularly those incorporated in states like Delaware or Wyoming. When is it relevant? Annually, based on state-specific deadlines." },
        { title: "Decision Summary", content: "Who should act? All US company owners must file their Annual Report and pay any applicable franchise tax to their state of incorporation each year. Who can ignore? No one. Failure to do so leads to loss of good standing and eventual dissolution of the company." }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": aiBlocks.map(block => ({
            "@type": "Question",
            "name": block.title.replace(":", ""),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": block.content
            }
        }))
    };
    
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
                <div className="space-y-4">
                    {aiBlocks.map((block, index) => (
                        <div key={index}>
                            <h4 className="font-semibold text-gray-700">{block.title}</h4>
                            <p className="text-gray-600">{block.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-blue-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

const StateExample = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2' })}
        {title}
    </h3>
    <div className="border-l-4 border-gray-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function AnnualReportsFranchiseTaxesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Annual Reports & Franchise Taxes: A Guide for US Business Owners",
    "description": "An essential guide explaining what state Annual Reports and Franchise Taxes are, why they are mandatory, and using Delaware and Wyoming as key examples.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/annual-reports-franchise-taxes.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/annual-reports-and-franchise-taxes" },
    "keywords": "annual report filing, what is franchise tax, delaware franchise tax, wyoming annual report, state compliance requirements"
  };

  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">State Compliance Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Annual Reports & Franchise Taxes Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              These mandatory state-level filings are different from your IRS tax return, and missing them can lead to the dissolution of your company.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              One of the most crucial and often misunderstood aspects of US company ownership is the annual compliance obligation owed to the state of incorporation. Many founders assume that filing a federal tax return with the IRS is all that's required. This is incorrect. You must also satisfy the separate annual requirements of the state where your company is registered (e.g., Delaware or Wyoming) to keep it in "good standing."
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              These state-level obligations typically involve two components: an **Annual Report** and a **Franchise Tax**. This guide will explain what they are, why they are important, and provide specific examples for Delaware and Wyoming.
            </p>

            <BlogSection title="What is an Annual Report?" icon={FileText}>
                <p>An Annual Report is a document filed with your company's state of formation that updates and confirms basic information about your business. It is not a financial report in the same way as your annual accounts.</p>
                <p>The purpose of the Annual Report is to ensure the state's records are accurate. It typically includes information such as:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>The name and address of your company's Registered Agent.</li>
                    <li>The principal business address of the company.</li>
                    <li>The names and addresses of the company's directors (for a C-Corp) or members/managers (for an LLC).</li>
                </ul>
                <p className="mt-4">Filing this report is mandatory to maintain your company's "Good Standing" status with the state.</p>
            </BlogSection>
            
            <BlogSection title="What is Franchise Tax?" icon={Landmark}>
                <p>Franchise Tax is often confused with income tax, but it is fundamentally different. A franchise tax is a fee that a state charges a company for the "privilege" of being incorporated or existing as a legal entity in that state. </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>It is **not** based on your company's profit. You owe franchise tax even if your company made zero revenue.</li>
                    <li>The calculation method varies dramatically by state. Some have a flat fee, while others use complex formulas based on authorized shares or company assets.</li>
                </ul>
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="font-semibold text-gray-800 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0" />
                        Crucially, states like Texas have a franchise tax that IS based on revenue/margin, making it more like an income tax. However, for popular formation states like Delaware and Wyoming, it's a fixed or formula-based privilege tax.
                    </p>
                </div>
            </BlogSection>
            
            <BlogSection title="State-Specific Examples" icon={MapPin}>
                <StateExample title="Delaware" icon={Building}>
                    <ul className="list-disc pl-5 space-y-3">
                        <li><strong>C-Corporations:</strong> Must file an Annual Report and pay Franchise Tax by **March 1st** each year. The tax is calculated based on either the number of authorized shares or a complex "Assumed Par Value Capital" method. The minimum tax is $175, but it can be much higher for companies with millions of shares, a common scenario for venture-backed startups.</li>
                        <li><strong>LLCs:</strong> Do not file an Annual Report, but must pay a flat Annual Tax of **$300** by **June 1st** each year.</li>
                    </ul>
                </StateExample>
                 <StateExample title="Wyoming" icon={Building}>
                    <ul className="list-disc pl-5 space-y-3">
                        <li><strong>LLCs & C-Corps:</strong> Must file an Annual Report and pay an annual "License Tax." The deadline is the first day of the company's anniversary month of formation. The tax is a minimum of **$60** and increases based on the value of assets located within Wyoming. For most non-resident-owned companies with no assets in the state, the minimum fee applies.</li>
                    </ul>
                </StateExample>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h3>
                <p className="text-gray-700 mb-4">
                    This guide is part of our comprehensive coverage of US annual compliance. YourLegal provides an all-in-one platform to handle these complex requirements for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/annual-compliance" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Annual Compliance Service
                    </Link>
                    <Link href="/usa" className="font-semibold text-gray-600 hover:underline">
                        &rarr; Back to USA Overview
                    </Link>
                </div>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
