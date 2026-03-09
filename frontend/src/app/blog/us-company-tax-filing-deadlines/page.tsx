'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, FileText, Landmark, Clock, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For US companies with a calendar year-end (Dec 31), the main federal tax deadlines are March 15 for S-Corps and Partnerships (Form 1065), and April 15 for C-Corps (Form 1120). Filing an extension (Form 7004) pushes the filing deadline six months, but not the payment deadline." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the key annual tax filing deadlines for US businesses. Who is it for? All founders of US LLCs and C-Corps. When is it relevant? Annually, as these are fixed dates that every business must adhere to in order to avoid penalties." },
        { title: "Decision Summary", content: "Who should act? All business owners must be aware of and meet these deadlines. Who can ignore? No one. Missing these deadlines results in automatic IRS penalties for failure to file." }
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

const DeadlineCard = ({ date, title, description, forms }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
    <p className="text-3xl font-bold text-blue-600">{date}</p>
    <h3 className="text-xl font-semibold my-2">{title}</h3>
    <p className="text-gray-600 mb-3">{description}</p>
    <div className="text-sm text-gray-500">
        <strong>Forms:</strong> {forms}
    </div>
  </div>
);

export default function TaxFilingDeadlinesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "US Company Tax Filing Deadlines for 2025: A Founder's Guide",
    "description": "An essential guide to the key IRS tax deadlines for C-Corps, S-Corps, and LLCs, including extension rules and penalties for missing them.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-tax-filing-deadlines.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-company-tax-filing-deadlines" },
    "keywords": "us tax deadlines, business tax deadline 2025, form 1120 deadline, form 1065 deadline, irs filing extension form 7004, c-corp tax deadline"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              US Company Tax Filing Deadlines: 2025 Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Missing an IRS deadline is a costly mistake. This guide breaks down the key dates every US business owner needs to know for the 2024 tax year (filed in 2025).
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For business owners, "tax season" isn't just a single day in April. It's a series of critical deadlines that vary based on your company's legal structure. Understanding and meeting these deadlines is a fundamental aspect of US tax compliance. The IRS imposes automatic penalties for late filings, so marking these dates on your calendar is essential for avoiding unnecessary costs.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide assumes your business uses a calendar year-end (December 31), which is the case for the vast majority of companies.
            </p>

            <BlogSection title="Key Federal Tax Filing Deadlines" icon={Calendar}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DeadlineCard
                        date="March 15"
                        title="Partnerships & S-Corps"
                        description="This is the deadline for entities that 'pass through' their income to their owners."
                        forms="Form 1065 (Partnerships/Multi-Member LLCs) & Form 1120-S (S-Corps)"
                    />
                    <DeadlineCard
                        date="April 15"
                        title="C-Corporations & Individuals"
                        description="This is the main deadline for corporations that pay their own tax, as well as for individual tax returns."
                        forms="Form 1120 (C-Corps) & Form 1040 (Individuals)"
                    />
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-gray-800"><strong>Note for Foreign-Owned LLCs:</strong> A single-member LLC owned by a non-resident is a "disregarded entity" but has special reporting requirements. It must file <a href="https://www.irs.gov/forms-pubs/about-form-5472" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 5472</a> with a pro-forma Form 1120. This filing is due on **April 15**.</p>
                </div>
            </BlogSection>
            
            <BlogSection title="Filing an Extension: Form 7004" icon={Clock}>
                <p>What if you need more time? The IRS allows you to file for an automatic six-month extension to file your return. This is done by submitting <a href="https://www.irs.gov/forms-pubs/about-form-7004" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 7004</a> on or before the original due date.</p>

                <div className="mt-6 p-6 bg-red-50 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-800 flex items-center mb-2"><AlertTriangle className="w-5 h-5 mr-2" />Crucial Point: An Extension to File is NOT an Extension to Pay.</h4>
                    <p className="text-red-700">
                        Even if you file an extension, you are still required to estimate your tax liability and pay that amount by the original due date (April 15 for C-Corps). Failure to do so will result in <Link href="/blog/common-irs-penalties-for-businesses" className="font-bold text-red-800 hover:underline">late payment penalties and interest</Link>.
                    </p>
                </div>
                
                <h4 className="font-bold mt-8 mb-2">Extended Deadlines:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>S-Corps & Partnerships:</strong> The extended deadline is **September 15**.</li>
                    <li><strong>C-Corps & Foreign-Owned SMLLCs:</strong> The extended deadline is **October 15**.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="State Tax Deadlines" icon={FileText}>
                <p>On top of federal deadlines, you must also be aware of your state-level obligations. These vary widely:</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>State Income Tax:</strong> Many states have their own corporate income tax returns with deadlines that often, but not always, align with federal dates.</li>
                    <li><strong>Franchise Tax:</strong> States like Delaware have a separate Franchise Tax with a different deadline (March 1 for Delaware C-Corps). This is a tax for the privilege of being incorporated in the state and is due even with no business activity.</li>
                    <li><strong>Annual Reports:</strong> Most states require an Annual Report filing to keep your company's information current. These have their own unique deadlines throughout the year based on your incorporation date.</li>
                </ul>
                <p className="mt-4">Tracking this patchwork of deadlines is one of the key benefits of an <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">annual compliance</Link> service.</p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Never Miss a Deadline Again</h3>
                <p className="text-gray-700">
                   For a founder, managing these multiple deadlines while trying to build a business is a recipe for missed filings and unnecessary penalties. YourLegal's <Link href="/usa/pricing" className="text-blue-600 hover:underline">Vitals and Elite plans</Link> are designed to take this entire burden off your shoulders. We track all your federal and state deadlines, prepare the filings, and ensure everything is submitted on time, every time.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

