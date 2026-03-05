
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckSquare, FileText, Landmark, Shield } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "An annual compliance checklist for a US company includes: 1) Filing a State Annual Report and paying Franchise Tax, 2) Preparing and filing federal and state income tax returns, 3) Handling mandatory informational returns like the BOI Report and Form 5472 for foreign owners, and 4) Maintaining internal corporate records. Missing any step can lead to penalties and loss of good standing." },
        { title: "Direct Question Answer", content: "What is this about? A comprehensive checklist of the mandatory annual filings and tasks required to keep a US company legally compliant. Who is it for? Founders, directors, and managers of all US companies, especially LLCs and C-Corps. When is it relevant? Annually, with tasks spread throughout the year based on specific deadlines." },
        { title: "Decision Summary", content: "Who should act? Every US company owner must ensure these checklist items are completed each year. Who can ignore? No one. This checklist represents the fundamental legal requirements for maintaining a business in the United States." }
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

const ChecklistItem = ({ title, children }) => (
    <div className="flex items-start mb-4">
        <CheckSquare className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-bold text-xl text-gray-800">{title}</h4>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

export default function AnnualComplianceChecklistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Ultimate Annual Compliance Checklist for US Companies",
    "description": "A comprehensive checklist covering every mandatory state, federal, and financial filing your US company needs to stay compliant and in good standing.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-annual-compliance-checklist.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-annual-compliance-checklist" },
    "keywords": "us annual compliance checklist, company compliance checklist, us business filing requirements, annual report filing, franchise tax, boi report"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Compliance Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The Ultimate Annual Compliance Checklist for US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Keeping your US company in good standing involves more than just filing taxes. This checklist covers every mandatory annual filing you need to know about.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For founders and business owners, "compliance" can feel like a complex and intimidating web of regulations. However, at its core, annual compliance is a series of predictable, mandatory tasks required to keep your business legally registered and in good standing with state and federal authorities.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Missing these deadlines isn't just a minor administrative slip-up; it can lead to automatic penalties, loss of liability protection, and even the forced dissolution of your company. This checklist breaks down the essential annual compliance tasks for every US business into clear, manageable steps.
            </p>

            <BlogSection title="The Annual Compliance Checklist" icon={CheckSquare}>
                <ChecklistItem title="1. State-Level Corporate Maintenance">
                    These tasks are owed to your state of incorporation (e.g., Delaware, Wyoming) and are necessary to keep your company's legal status active.
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>File Annual/Biennial Report:</strong> Most states require an annual report that confirms or updates basic company information like directors, officers, and your registered agent.</li>
                        <li><strong>Pay Franchise Tax:</strong> Many states, notably Delaware, levy an annual "franchise tax," which is a fee for the privilege of being incorporated there. This is due even if your company has no income.</li>
                        <li><strong>Maintain a Registered Agent:</strong> You must maintain a registered agent with a physical address in your state of formation at all times. This service must be renewed annually.</li>
                    </ul>
                     <p className="mt-2">Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">Annual Compliance service</Link> handles these state-level filings for you.</p>
                </ChecklistItem>
                
                <ChecklistItem title="2. Federal & State Tax Filings">
                    This is the most well-known compliance task. Every US company must file income tax returns.
                     <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>File Federal Income Tax Return:</strong> Prepare and file the correct form with the IRS by the annual deadline (e.g., Form 1120 for C-Corps, Form 1065 for partnerships).</li>
                        <li><strong>File State Income Tax Returns:</strong> If your company has nexus in a state with an income tax, you must also file a state-level tax return there.</li>
                        <li><strong>Pay Estimated Taxes:</strong> If your business expects to owe more than $500 in tax for the year, you're required to make quarterly estimated tax payments to the IRS.</li>
                    </ul>
                     <p className="mt-2">Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">Tax Compliance packages</Link> manage both federal and state tax filings.</p>
                </ChecklistItem>

                <ChecklistItem title="3. Federal Informational Reporting">
                     These returns don't typically involve a tax payment but are mandatory and carry severe penalties for non-compliance.
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Beneficial Ownership Information (BOI) Report:</strong> Under the Corporate Transparency Act, most US companies must file a report with FinCEN disclosing their beneficial owners. This is a critical new requirement.</li>
                        <li><strong>Form 5472 (for Foreign Owners):</strong> A 25% foreign-owned US company must file this form to report transactions with its owners. The penalty for failure to file is a staggering $25,000.</li>
                        <li><strong>FBAR (FinCEN Form 114):</strong> Required if your US company has signature authority over foreign bank accounts with a combined balance over $10,000.</li>
                    </ul>
                     <p className="mt-2">These complex informational returns are a core part of our service for international founders.</p>
                </ChecklistItem>
                
                <ChecklistItem title="4. Internal Corporate Governance">
                    These are internal tasks that are legally required to maintain your corporate veil and liability protection.
                     <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Hold Annual Meetings:</strong> C-Corporations are required to hold an annual meeting of shareholders and regular meetings of the board of directors.</li>
                        <li><strong>Maintain Meeting Minutes:</strong> All board and shareholder meetings must be documented with formal meeting minutes.</li>
                        <li><strong>Update Corporate Records:</strong> Keep your internal stock ledger and list of directors/members up to date.</li>
                    </ul>
                </ChecklistItem>
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
