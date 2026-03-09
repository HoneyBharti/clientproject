
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "A US business compliance calendar includes key recurring deadlines: Delaware Franchise Tax (Mar 1), Federal Tax Returns (Mar 15 for S-Corps/Partnerships, Apr 15 for C-Corps), FBAR filing (Apr 15), Delaware LLC Tax (Jun 1), and quarterly estimated tax payments. Forgetting these dates leads to automatic penalties." },
        { title: "Direct Question Answer", content: "What is this about? A summary of the most important annual and quarterly compliance deadlines for a typical US company. Who is it for? Founders and managers of US businesses. When is it relevant? Throughout the year for financial and tax planning." },
        { title: "Decision Summary", content: "Who should act? All business owners must be aware of and plan for these deadlines. Who can ignore? No one. These are mandatory filing dates with legal and financial consequences for missing them." }
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

const DeadlineMonth = ({ month, children }) => (
    <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">{month}</h3>
        <ul className="space-y-3">
            {children}
        </ul>
    </div>
);

const DeadlineItem = ({ date, title, description }) => (
    <li className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 text-center">
            <p className="text-xl font-bold text-gray-800">{date}</p>
        </div>
        <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </li>
);

export default function ComplianceCalendarPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The US Business Compliance Calendar: Key Dates & Deadlines",
    "description": "A month-by-month guide to the most important federal and state compliance deadlines that US business owners need to know to avoid penalties.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-compliance-calendar.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/compliance-calendar-for-us-businesses" },
    "keywords": "us business compliance calendar, tax deadlines 2025, annual report due date, delaware franchise tax deadline, quarterly estimated tax dates"
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
              The 2025 US Business Compliance Calendar
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A clear, month-by-month guide to the key state and federal deadlines every founder needs on their radar.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For a US business owner, staying compliant means navigating a year-long calendar of different deadlines from multiple government agencies. It's not just about one day in April. Forgetting a key state filing in March or a quarterly payment in June can lead to automatic penalties.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide provides a high-level overview of the most important compliance dates for a typical US company, focusing on a calendar year-end (December 31).
            </p>

            <BlogSection title="Key Compliance Dates for 2025" icon={Calendar}>
                <DeadlineMonth month="January">
                    <DeadlineItem date="15" title="Q4 2024 Estimated Tax Payment" description="Final quarterly estimated tax payment due to the IRS for the previous tax year."/>
                    <DeadlineItem date="31" title="W-2 and 1099-NEC Distribution" description="Deadline to send annual wage (W-2) and contractor payment (1099) forms to employees and contractors."/>
                </DeadlineMonth>
                
                <DeadlineMonth month="March">
                     <DeadlineItem date="1" title="Delaware C-Corp Franchise Tax" description="CRITICAL: Delaware C-Corporations must file their Annual Report and pay Franchise Tax. This is a commonly missed deadline with a $200 late penalty."/>
                     <DeadlineItem date="15" title="S-Corp & Partnership Tax Returns" description="Federal income tax returns (Form 1120-S and Form 1065) are due for S-Corps and Partnerships."/>
                </DeadlineMonth>

                <DeadlineMonth month="April">
                    <DeadlineItem date="15" title="C-Corp Federal Tax Return" description="Federal income tax returns (Form 1120) are due for C-Corporations. This is also the deadline for foreign-owned SMLLCs to file Form 5472."/>
                    <DeadlineItem date="15" title="Q1 2025 Estimated Tax Payment" description="First quarterly estimated tax payment due for the current tax year."/>
                    <DeadlineItem date="15" title="FBAR Filing Deadline" description="Deadline to file FinCEN Form 114 (FBAR) for US entities with foreign bank accounts over $10,000."/>
                </DeadlineMonth>

                <DeadlineMonth month="June">
                    <DeadlineItem date="1" title="Delaware LLC Annual Tax" description="Delaware LLCs must pay their flat $300 Annual Tax."/>
                    <DeadlineItem date="15" title="Q2 2025 Estimated Tax Payment" description="Second quarterly estimated tax payment due."/>
                </DeadlineMonth>
                
                 <DeadlineMonth month="September">
                    <DeadlineItem date="15" title="Q3 2025 Estimated Tax Payment" description="Third quarterly estimated tax payment due."/>
                    <DeadlineItem date="15" title="Extended S-Corp & Partnership Deadline" description="Final deadline for S-Corps and Partnerships that filed for a six-month extension."/>
                </DeadlineMonth>
                
                 <DeadlineMonth month="October">
                    <DeadlineItem date="15" title="Extended C-Corp Deadline" description="Final deadline for C-Corporations that filed for a six-month extension."/>
                </DeadlineMonth>

                <p className="mt-8 text-sm text-gray-500"><strong>Note:</strong> Deadlines for state Annual Reports outside of Delaware (like Wyoming) are typically based on the anniversary month of your company's formation.</p>

            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Never Miss a Deadline Again</h3>
                <p className="text-gray-700">
                   This calendar highlights the complexity of US compliance. It's a year-round responsibility. Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">annual compliance service</Link> is designed to manage this entire calendar for you. We track every federal and state deadline, prepare the filings, and ensure you are always compliant, so you can focus on your business, not on dates and forms.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

