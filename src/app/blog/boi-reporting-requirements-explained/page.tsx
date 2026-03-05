
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Shield, FileText, AlertTriangle, UserCheck } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "The Beneficial Ownership Information (BOI) Report is a mandatory federal filing with the Financial Crimes Enforcement Network (FinCEN). Most US companies must report details about their 'beneficial owners'—individuals who exercise substantial control or own 25% or more of the company. The penalty for non-compliance is severe." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of the new BOI reporting rule under the Corporate Transparency Act. Who is it for? Owners of nearly all US LLCs and C-Corps, both domestic and foreign. When is it relevant? Companies formed in 2024 have 90 days to file; those formed from 2025 have 30 days. Companies formed before 2024 must file by Jan 1, 2025." },
        { title: "Decision Summary", content: "Who should act? Every US company owner must determine their filing deadline and submit the BOI report to FinCEN. Who can ignore? Only large, heavily regulated companies (e.g., public companies, banks) are exempt. For startups and SMBs, this is not optional." }
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

export default function BoiReportingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "BOI Reporting Requirements Explained: A Guide for US Companies",
    "description": "An essential guide to the new Beneficial Ownership Information (BOI) reporting rule, explaining who must file, what to report, deadlines, and the severe penalties for non-compliance.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/boi-reporting-requirements.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/boi-reporting-requirements-explained" },
    "keywords": "boi reporting requirements, beneficial ownership information, corporate transparency act, fincen boi report, what is a beneficial owner, boi filing deadline"
  };
  
   const ExternalLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>
  );

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
              BOI Reporting Requirements Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The Corporate Transparency Act introduced a major new filing requirement for US companies. Understanding your BOI report obligation is not optional—it's mandatory.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Effective January 1, 2024, the landscape of US corporate compliance changed dramatically. The introduction of the Corporate Transparency Act (CTA) brought a new, mandatory filing requirement for millions of small businesses: the Beneficial Ownership Information (BOI) Report. This new rule, designed to combat illicit financial activities, requires most US companies to report detailed information about their owners and those who control them to the Financial Crimes Enforcement Network (FinCEN), a bureau of the U.S. Department of the Treasury.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              For founders, especially non-residents, understanding and complying with this new regulation is critical. The penalties for failure to file are severe. This guide breaks down exactly what the BOI report is, who needs to file it, what information is required, and when it's due.
            </p>

            <BlogSection title="What is the BOI Report?" icon={FileText}>
                <p>The BOI Report is a mandatory filing that provides FinCEN with details about a company's "beneficial owners." A beneficial owner is any individual who, directly or indirectly, either exercises "substantial control" over the company or owns/controls at least 25% of the ownership interests.</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Substantial Control:</strong> This is a broad definition and includes senior officers (like the CEO or President), individuals with the authority to appoint or remove senior officers, and anyone who is an important decision-maker for the company.</li>
                    <li><strong>Ownership Interest:</strong> This includes equity, stock, voting rights, convertible instruments, and any other mechanism used to establish ownership.</li>
                </ul>
                <p className="mt-4">Essentially, the government wants to know which real people are behind the corporate entity.</p>
            </BlogSection>
            
             <BlogSection title="Who Must File a BOI Report?" icon={UserCheck}>
                <p>The rule applies to most US business entities. You are likely required to file if your company is:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>A C-Corporation or LLC created by filing a document with a secretary of state.</li>
                    <li>A foreign company registered to do business in any US state.</li>
                </ul>
                <p className="mt-4">There are 23 specific exemptions, but they mostly apply to large, highly regulated companies like public companies, banks, and insurance firms. **Nearly all startups, small businesses, and holding companies must file a BOI report.**</p>
            </BlogSection>

            <BlogSection title="What Information Must Be Reported?" icon={Shield}>
                <p>The report requires specific details for both the company and each of its beneficial owners.</p>
                <h4 className="font-bold mt-6 mb-2">For the Company:</h4>
                 <ul className="list-disc pl-5 space-y-2">
                    <li>Full legal name and any trade names (DBA).</li>
                    <li>Current US address.</li>
                    <li>Jurisdiction of formation.</li>
                    <li>Employer Identification Number (EIN).</li>
                </ul>
                <h4 className="font-bold mt-6 mb-2">For Each Beneficial Owner:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Full legal name, date of birth, and residential address.</li>
                    <li>A unique identifying number from an acceptable identification document (e.g., a non-expired passport for foreign nationals).</li>
                    <li>An image of that identification document.</li>
                </ul>
            </BlogSection>

            <BlogSection title="Deadlines & Penalties: Why This Matters" icon={AlertTriangle}>
                <p>The deadlines for filing are strict and depend on when your company was formed.</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Companies created **before January 1, 2024**, must file their initial report by **January 1, 2025**.</li>
                    <li>Companies created **during 2024** must file their report within **90 calendar days** of their formation.</li>
                    <li>Companies created **on or after January 1, 2025**, must file within **30 calendar days** of formation.</li>
                </ul>
                <div className="mt-6 p-6 bg-red-50 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-800 flex items-center mb-2">Severe Penalties for Non-Compliance</h4>
                    <p className="text-red-700">The penalties for willfully failing to file or providing false information are draconian: civil penalties of up to **$500 per day** for each day the violation continues, and potential criminal penalties including up to **two years of imprisonment** and a fine of up to $10,000.</p>
                </div>
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
