'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckSquare, FileText, Calendar, DollarSign, Landmark, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "A US business tax compliance checklist involves: 1) Maintaining clean books, 2) Filing the correct federal tax return on time (e.g., 1120, 1065), 3) Meeting state tax obligations (franchise & income tax), 4) Handling sales tax if nexus is established, and 5) Making quarterly estimated tax payments if required. For foreign owners, it must include informational returns like Form 5472." },
        { title: "Direct Question Answer", content: "What is this about? A step-by-step checklist covering the essential tax and information return obligations for a business operating in the USA. Who is it for? All US business owners, especially non-resident founders who need to understand their full scope of filing duties. When is it relevant? Annually, during tax season, and throughout the year for ongoing compliance." },
        { title: "Decision Summary", content: "Who should act? Every US company must follow this checklist to ensure they meet all federal and state tax obligations and avoid severe penalties. Who can ignore? No registered business can legally ignore tax compliance. The consequences are severe." }
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


export default function TaxComplianceChecklistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Ultimate US Business Tax Compliance Checklist",
    "description": "A comprehensive checklist for founders covering federal, state, sales, and informational tax returns to keep your US company compliant and penalty-free.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-tax-compliance-checklist.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-business-tax-compliance-checklist" },
    "keywords": "US business tax compliance checklist, IRS tax filing requirements, small business tax checklist, state tax compliance, form 1120 filing, form 1065 filing, form 5472"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The Ultimate US Business Tax Compliance Checklist
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Navigating the complex web of US federal and state tax obligations can be daunting. This checklist breaks down everything you need to do to keep your company compliant.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For founders, especially those outside the US, tax compliance is one of the most intimidating aspects of running an American company. The system is multi-layered, the forms are complex, and the penalties for non-compliance are severe. However, with a systematic approach, it is entirely manageable.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This checklist provides a clear, step-by-step framework for your company's annual tax obligations. Following it is the key to avoiding IRS penalties, maintaining your company's good standing, and operating with peace of mind.
            </p>

            <BlogSection title="The Annual Tax Compliance Cycle" icon={Calendar}>
                <ChecklistItem title="Step 1: Finalize Your Bookkeeping">
                  Your tax return is only as accurate as your books. Before any tax work can begin, your bookkeeping for the financial year (typically ending Dec 31) must be complete and accurate. This means all income and expenses have been recorded and categorized, and all bank accounts have been reconciled. This is the bedrock of compliance. A professional <Link href="/usa/bookkeeping" className="text-blue-600 hover:underline">bookkeeping service</Link> is essential here.
                </ChecklistItem>
                
                <ChecklistItem title="Step 2: File Federal Income Tax Returns">
                    Every US company must file an annual income tax return with the IRS, even if it had no income. The form you file depends on your entity type:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>C-Corporations:</strong> File <a href="https://www.irs.gov/forms-pubs/about-form-1120" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 1120</a>.</li>
                        <li><strong>Multi-Member LLCs (taxed as partnerships):</strong> File <a href="https://www.irs.gov/forms-pubs/about-form-1065" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 1065</a>.</li>
                        <li><strong>Single-Member LLCs (disregarded entities):</strong> The activity is reported on the owner's personal tax return. However, if owned by a non-resident, a separate filing is required (see next step).</li>
                    </ul>
                </ChecklistItem>

                <ChecklistItem title="Step 3: File Mandatory Informational Returns (Critical for Foreign Owners)">
                     These returns don't typically involve a tax payment but are mandatory and carry severe penalties for non-compliance.
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Form 5472:</strong> Required for any 25% foreign-owned US corporation or a foreign-owned US LLC. It must be filed with a pro-forma Form 1120. The penalty for failure to file is a staggering **$25,000**. This is covered in depth in our <Link href="/blog/non-resident-tax-guide" className="text-blue-600 hover:underline">Non-Resident Tax Guide</Link>.</li>
                        <li><strong>FBAR (FinCEN Form 114):</strong> Required if your US company has signature authority over foreign bank accounts with a combined balance over $10,000.</li>
                    </ul>
                </ChecklistItem>

                <ChecklistItem title="Step 4: Meet State-Level Filing Obligations">
                    Compliance doesn't end with the IRS. You must also satisfy the requirements of your state of incorporation and any state where you do business.
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Annual Report:</strong> Most states require an annual report to update company information.</li>
                        <li><strong>Franchise Tax:</strong> States like Delaware and Texas levy a franchise tax, which is a fee for the privilege of being incorporated there. This is due even with no income.</li>
                        <li><strong>State Income Tax:</strong> If your company has nexus and income in a state with corporate income tax, you must file a state-level tax return.</li>
                    </ul>
                    Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">Annual Compliance service</Link> handles these state filings automatically.
                </ChecklistItem>

                 <ChecklistItem title="Step 5: Manage Sales Tax Obligations">
                    If you sell goods or certain services in the US, you may have an obligation to collect and remit sales tax. This is determined by "sales tax nexus," which can be triggered by having a physical presence or exceeding economic thresholds in a state. Managing this across 50 states is complex and typically requires specialized software and services.
                </ChecklistItem>

                <ChecklistItem title="Step 6: Pay Estimated Taxes">
                    If your business expects to owe $500 or more in tax for the year, you are generally required to make estimated tax payments to the IRS on a quarterly basis. The deadlines are typically April 15, June 15, September 15, and January 15 of the following year.
                </ChecklistItem>
            </BlogSection>
            
            <BlogSection title="Putting It All Together" icon={Landmark}>
                <p>Navigating this checklist requires expertise in federal tax law, state regulations, and international reporting standards. While it may seem overwhelming, a professional compliance partner can streamline the entire process.</p>
                <p>At YourLegal, our <Link href="/usa/pricing" className="text-blue-600 hover:underline">Vitals and Elite plans</Link> are designed as an all-in-one <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax compliance</Link> solution. We handle your bookkeeping, prepare and file all necessary federal and state returns, and manage your annual reports, ensuring every box on this checklist is ticked correctly and on time.</p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h3>
                <p className="text-gray-700 mb-4">
                    This guide is part of our comprehensive coverage of US tax compliance. YourLegal provides an all-in-one platform to handle these complex requirements for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/tax-compliance" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Tax Compliance Services
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
