'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Shield, FileText, Banknote, CheckSquare } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "After US incorporation, the compliance timeline includes immediate post-incorporation steps (EIN, bylaws), tasks within 90 days (BOI Report), ongoing monthly/quarterly duties (bookkeeping, payroll, sales tax), and annual obligations (Annual Report, federal/state tax returns). Missing these deadlines leads to penalties." },
        { title: "Direct Question Answer", content: "What is this about? A timeline of the key compliance deadlines a new US company faces in its first year. Who is it for? Founders of newly formed US LLCs and C-Corps. When is it relevant? Immediately after incorporation and throughout the first year of operation." },
        { title: "Decision Summary", content: "Who should act? All new business owners must be aware of and adhere to this timeline. Who can ignore? No one. This timeline represents the mandatory legal and tax obligations for operating a business in the US." }
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

const TimelineEvent = ({ time, title, description, form, isCritical = false }) => (
  <div className="relative pl-8">
    <div className={`absolute top-1 left-0 h-4 w-4 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
    <div className={`absolute top-1 left-[7px] h-full w-px ${isCritical ? 'bg-red-200' : 'bg-blue-200'}`}></div>
    <p className="font-bold text-blue-700">{time}</p>
    <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
    <p className="text-gray-600">{description}</p>
    {form && <p className="text-sm text-gray-500 mt-1"><strong>Form(s):</strong> {form}</p>}
  </div>
);


export default function ComplianceTimelinePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The First-Year Compliance Timeline After US Incorporation",
    "description": "A detailed timeline for new US companies covering post-incorporation tasks, 90-day deadlines like BOI reporting, and ongoing monthly, quarterly, and annual compliance obligations.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/compliance-timeline.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/compliance-timeline-after-incorporation" },
    "keywords": "us company compliance timeline, post-incorporation checklist, boi report deadline, annual report filing deadline, new business compliance calendar"
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
              The First-Year Compliance Timeline After Incorporation
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your company is formed. Now what? This timeline maps out the critical legal and tax deadlines you must meet in your first year of operation.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Congratulations on forming your new US company! While the initial registration is a huge milestone, it's the beginning, not the end, of your compliance journey. The first year of operation is filled with critical deadlines for legal, tax, and regulatory filings. Missing them can lead to penalties, loss of good standing, or worse.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide provides a clear timeline of the essential compliance tasks you need to complete after your <Link href="/usa/company-formation" className="text-blue-600 hover:underline">company is formed</Link>.
            </p>

            <BlogSection title="Your First Year Compliance Timeline" icon={Calendar}>
                <div className="space-y-12">
                    <TimelineEvent time="First 30 Days" title="Immediate Post-Incorporation Setup" description="These are foundational steps to activate your company." form="Form SS-4 (for EIN), 83(b) Election (if applicable)">
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li>Obtain your Employer Identification Number (EIN) from the IRS.</li>
                           <li>Draft and sign your internal governing documents (Operating Agreement for LLCs, Bylaws for C-Corps).</li>
                           <li>Hold your initial organizational meeting and issue founder equity.</li>
                           <li>File your 83(b) election with the IRS within 30 days of receiving stock (CRITICAL for C-Corp founders).</li>
                           <li>Open your US business bank account.</li>
                        </ul>
                    </TimelineEvent>

                    <TimelineEvent time="Within 90 Days" title="Beneficial Ownership Information (BOI) Report" description="A new, mandatory federal filing for most small businesses." form="FinCEN BOI Report" isCritical={true}>
                        <p>Under the Corporate Transparency Act, companies formed in 2024 must file a BOI report with the Financial Crimes Enforcement Network (FinCEN) within 90 days of formation. This report discloses information about the company's beneficial owners. The penalty for willful non-compliance is severe. Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">annual compliance</Link> plans include this filing.</p>
                    </TimelineEvent>

                    <TimelineEvent time="Monthly" title="Bookkeeping & Financial Hygiene" description="Ongoing tasks to maintain accurate financial records." form="N/A">
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li>Record all income and expenses in your accounting software.</li>
                           <li>Reconcile your bank and credit card statements.</li>
                           <li>Review your monthly financial statements (P&L, Balance Sheet).</li>
                        </ul>
                    </TimelineEvent>
                    
                    <TimelineEvent time="Quarterly" title="Tax & Payroll Filings" description="Regular filings required if you have employees or expect to owe significant tax." form="Form 941, State Payroll Forms, Estimated Tax Vouchers">
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li>If you have employees, file quarterly payroll tax returns (Form 941).</li>
                           <li>Pay quarterly estimated income taxes to the IRS if your C-Corp expects to owe more than $500 in tax for the year.</li>
                        </ul>
                    </TimelineEvent>

                    <TimelineEvent time="Annually" title="State and Federal Annual Filings" description="The major year-end compliance obligations." form="State Annual Report, Form 1120/1065, Form 5472">
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li>File your Annual Report and pay Franchise Tax to your state of formation (e.g., Delaware, Wyoming).</li>
                           <li>Prepare your financial statements for the full year.</li>
                           <li>File your federal and state income tax returns by the <Link href="/blog/us-company-tax-filing-deadlines" className="text-blue-600 hover:underline">annual deadline</Link>.</li>
                           <li>For foreign-owned LLCs, file the critical Form 5472.</li>
                        </ul>
                    </TimelineEvent>
                </div>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Automate Your Compliance</h3>
                <p className="text-gray-700">
                   Tracking this many deadlines is a major challenge for any founder. This is why our Vitals and Elite plans are so valuable. We automate your bookkeeping, track all state and federal deadlines, and handle the preparation and filing of all your tax and compliance reports. We act as your outsourced finance and compliance team, giving you the peace of mind to focus on your business.
                </p>
                 <div className="mt-6">
                    <Link href="/usa/pricing">
                        <Button>Explore Our Compliance Plans</Button>
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

