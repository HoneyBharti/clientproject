'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Users,
  FileText,
  ChevronLeft,
  AlertTriangle,
  Landmark,
} from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For a foreign-owned US LLC, the most critical tax filing is Form 5472, which reports transactions with the foreign owner and carries a $25,000 penalty for non-filing. This must be filed with a pro-forma Form 1120, even if the company has no income. Understanding this is non-negotiable for non-resident founders." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the specific US tax filing requirements for non-resident founders, focusing on Form 5472 and Form 1120. Who is it for? International entrepreneurs who have formed a US company. When is it relevant? Annually, as these forms are mandatory yearly filings." },
        { title: "Decision Summary", content: "Who should act? All non-resident owners of US companies, particularly single-member LLCs. Who can ignore? No one. The penalties are severe and automatically assessed by the IRS." }
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

const ComparisonTable = () => (
    <div className="my-12 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-4 font-semibold border-b">Entity Type</th>
                    <th className="p-4 font-semibold border-b">Filing Requirement</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Foreign-Owned Single-Member LLC</td>
                    <td className="p-4">Pro-forma Form 1120 + Form 5472</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Multi-Member LLC (Partnership)</td>
                    <td className="p-4">Form 1065 + Form 5472 (if foreign ownership &gt;=25%)</td>
                </tr>
                <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">C-Corporation with Foreign Shareholders</td>
                    <td className="p-4">Full Form 1120 + Form 5472 (for related-party transactions)</td>
                </tr>
            </tbody>
        </table>
    </div>
);


export default function NonResidentTaxGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Non-Resident US Tax Guide 2025",
    "description": "Everything International Founders Need to Know About Form 5472 and Form 1120.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/non-resident-tax-guide.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "YourLegal AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yourlegal.ai/logo.png"
      }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/cross-border-compliance-guide/non-resident-tax-guide" }
  };
  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog/cross-border-compliance-guide" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Cross-Border Compliance
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Non-Resident US Tax Guide 2025
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything International Founders Need to Know About Form 5472 and Form 1120.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <BlogSection title="Who Is a Non-Resident for U.S. Tax Purposes?" icon={Users}>
              <p>
                You are generally treated as a non-resident alien (NRA) if you are not a U.S. citizen or green card holder, and do not meet the Substantial Presence Test. Many foreign founders operating Delaware LLCs, Wyoming LLCs, and Delaware C-Corps fall into this category.
              </p>
            </BlogSection>

            <BlogSection title="Why Form 5472 Is Critical" icon={FileText}>
              <p>
                Form 5472 is an IRS information return used to report transactions between a U.S. entity and its foreign owner or related parties. You must file Form 5472 if you own 25% or more of a U.S. company and the company has any "reportable transaction" with a foreign owner.
              </p>
               <h4 className="font-bold mt-6 mb-2">Common Reportable Transactions:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Capital contributions</li>
                    <li>Loans to or from the foreign owner</li>
                    <li>Expense reimbursements</li>
                    <li>Management fees</li>
                    <li>Payments for services</li>
                </ul>
                <p className="mt-4 italic">Even a simple bank funding from a foreign founder can trigger a Form 5472 filing requirement.</p>
            </BlogSection>

            <BlogSection title="Understanding Form 1120" icon={Landmark}>
                <p>
                    Form 1120 is the U.S. Corporate Income Tax Return. For a foreign-owned single-member LLC (a "disregarded entity"), a pro-forma Form 1120 must be filed with Form 5472 attached. This is true even if the LLC has no income.
                </p>
            </BlogSection>

            <ComparisonTable />

            <BlogSection title="Filing Deadlines and Penalties" icon={AlertTriangle}>
                <p>
                    Both Form 1120 and Form 5472 are due by April 15, 2025. An extension can be filed to move the deadline to October 15, 2025.
                </p>
                <div className="mt-6 p-6 bg-red-50 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-800">Warning: Severe Penalties</h4>
                    <p className="text-red-700">
                        The penalty for failing to file Form 5472 is <strong>$25,000 per form, per year</strong>. This is one of the highest-risk filings for international founders and is strictly enforced by the IRS.
                    </p>
                </div>
            </BlogSection>

            <BlogSection title="Common Mistakes to Avoid" icon={CheckCircle}>
                 <ul className="list-disc pl-5 space-y-2">
                    <li>Assuming “no revenue” means “no filing”.</li>
                    <li>Missing capital contribution reporting.</li>
                    <li>Filing Form 5472 without the pro-forma Form 1120.</li>
                    <li>Using personal bank accounts for business transactions.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    For international founders, U.S. compliance is not optional—it is structural. Proper planning, diligent bookkeeping, and timely filing are essential to operating safely and successfully in the U.S. market.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
