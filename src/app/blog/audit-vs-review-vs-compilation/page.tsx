
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Scale, Check, X } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "An Audit provides the highest level of assurance, with the CPA expressing an opinion that financials are free of material misstatement. A Review provides limited assurance based on inquiry and analytical procedures. A Compilation provides no assurance; the CPA simply assembles financial statements from client data. Audits are for high-stakes needs like fundraising; Compilations are for basic internal use." },
        { title: "Direct Question Answer", content: "What is this about? A comparison of the three levels of financial statement services provided by a CPA: Audit, Review, and Compilation. Who is it for? Business owners, founders, and boards deciding on the level of assurance they need for their financial statements. When is it relevant? When seeking loans, raising investment, reporting to stakeholders, or preparing for an exit." },
        { title: "Decision Summary", content: "Who should act? Companies needing to satisfy bank loan covenants or investor requirements must choose an Audit or Review. Businesses needing basic, professionally formatted financials for internal use can opt for a Compilation. Who can ignore? Companies with no external reporting requirements may not need any of these formal engagements, but it's rare for a growing business." }
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
                    <th className="p-4 font-semibold border-b">Feature</th>
                    <th className="p-4 font-semibold border-b text-center">Compilation</th>
                    <th className="p-4 font-semibold border-b text-center">Review</th>
                    <th className="p-4 font-semibold border-b text-center">Audit</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Level of Assurance</td>
                    <td className="p-4 text-center font-bold text-red-600">None</td>
                    <td className="p-4 text-center font-bold text-yellow-600">Limited</td>
                    <td className="p-4 text-center font-bold text-green-600">Reasonable (High)</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Procedures</td>
                    <td className="p-4 text-center">Assemble client data into financial statements.</td>
                    <td className="p-4 text-center">Inquiry and analytical procedures.</td>
                    <td className="p-4 text-center">Detailed testing, confirmations, control assessment.</td>
                </tr>
                 <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Internal Controls</td>
                    <td className="p-4 text-center">Not considered.</td>
                    <td className="p-4 text-center">Not tested.</td>
                    <td className="p-4 text-center">Understanding and testing is required.</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Independence</td>
                    <td className="p-4 text-center">Not required (but must be disclosed).</td>
                    <td className="p-4 text-center">Required.</td>
                    <td className="p-4 text-center">Required.</td>
                </tr>
                 <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Cost</td>
                    <td className="p-4 text-center">Low</td>
                    <td className="p-4 text-center">Medium</td>
                    <td className="p-4 text-center">High</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Typical Use Case</td>
                    <td className="p-4 text-center">Internal management use only.</td>
                    <td className="p-4 text-center">Small business loans, some private investors.</td>
                    <td className="p-4 text-center">Venture capital, M&A, public companies, federal funding.</td>
                </tr>
            </tbody>
        </table>
    </div>
);


export default function AuditVsReviewPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Audit vs. Review vs. Compilation: A Founder's Guide to Financial Statement Services",
    "description": "An essential guide explaining the critical differences between an audit, a review, and a compilation in terms of assurance, cost, and use case.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/audit-vs-review-vs-compilation.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/audit-vs-review-vs-compilation" },
    "keywords": "audit vs review vs compilation, financial statement compilation, financial statement review, what is a financial statement audit, levels of assurance"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Audit & Assurance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Audit vs. Review vs. Compilation: A Founder's Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Not all financial statement services are created equal. Understanding the difference in assurance, scope, and cost is critical for meeting stakeholder needs.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              When a bank, investor, or board asks for "financial statements," they often have a specific level of scrutiny in mind. Providing the wrong type of report can lead to delays in financing or a loss of credibility. A Certified Public Accountant (CPA) can provide three distinct levels of service related to a company's financial statements: a Compilation, a Review, and an Audit.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              These are not interchangeable terms. They represent a ladder of increasing rigor, cost, and, most importantly, "assurance"—the level of confidence the CPA provides about the accuracy of the financials. This guide will break down the key differences to help you choose the right service for your needs.
            </p>

            <BlogSection title="Level 1: Compilation - No Assurance" icon={Scale}>
                <p>A compilation is the most basic service. The CPA takes your company's financial data and assembles it into the format of proper financial statements (Income Statement, Balance Sheet, etc.).</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Procedures:</strong> The CPA is primarily acting as an external accountant, using their expertise to present your data correctly. They are not required to verify the accuracy of the underlying numbers.</li>
                    <li><strong>Level of Assurance:</strong> **None.** The CPA's report will explicitly state that they have not audited or reviewed the financial statements and, accordingly, do not express an opinion or any other form of assurance on them.</li>
                    <li><strong>When It's Used:</strong> For internal management use, or for small, closely-held businesses that need professionally formatted financials but have no external reporting requirements.</li>
                     <li><strong>Cost:</strong> Lowest of the three.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="Level 2: Review - Limited Assurance" icon={Scale}>
                <p>A review is a step up from a compilation. It provides a limited level of assurance that the financial statements do not have any obvious, material modifications that should be made for them to be in conformity with GAAP.</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Procedures:</strong> A review goes beyond just assembling data. The CPA performs analytical procedures (e.g., comparing current period financials to prior periods or industry benchmarks) and makes inquiries of company management. They are looking for trends or items that don't make sense.</li>
                    <li><strong>Level of Assurance:</strong> **Limited.** The CPA is providing "negative assurance," stating that based on their review, they are not aware of any material modifications that should be made. This is less than an audit opinion.</li>
                    <li><strong>When It's Used:</strong> Often required by banks for smaller loans or lines of credit. Some private investors or stakeholders may also accept a review.</li>
                    <li><strong>Cost:</strong> Medium. More expensive than a compilation but significantly less than an audit.</li>
                </ul>
            </BlogSection>

            <BlogSection title="Level 3: Audit - Reasonable Assurance" icon={Scale}>
                <p>An audit is the highest level of financial statement service and provides the highest level of assurance. Its purpose is to provide an independent opinion on whether the financial statements are presented fairly, in all material respects, in accordance with the applicable financial reporting framework (e.g., US GAAP).</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Procedures:</strong> An audit is an intensive, detailed process. It includes everything in a review, plus a deep dive into the numbers. Procedures include: testing internal controls, physically inspecting inventory, confirming balances with third parties (like banks and customers), and detailed testing of individual transactions.</li>
                    <li><strong>Level of Assurance:</strong> **Reasonable Assurance.** This is a high, but not absolute, level of assurance. The auditor provides a formal written opinion. This is the gold standard that stakeholders rely on.</li>
                    <li><strong>When It's Used:</strong> Required for public companies, often required by venture capital investors after a Series A or B round, needed for major bank loans, required for M&A, and sometimes for government funding.</li>
                     <li><strong>Cost:</strong> Highest of the three, often running into tens of thousands of dollars or more.</li>
                </ul>
                <p className="mt-4">Learn more about the process in our guide: <Link href="/blog/financial-statement-audits-explained" className="text-blue-600 hover:underline">Financial Statement Audits Explained</Link>.</p>
            </BlogSection>

            <ComparisonTable />
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Choosing the Right Level of Service</h3>
                <p className="text-gray-700">
                   The level of service you need is almost always dictated by a third party. Your bank, investor, or regulator will tell you whether they require a compilation, review, or audit. It's crucial to clarify their requirements before engaging a CPA to avoid paying for a service you don't need or, worse, paying for one that doesn't meet their requirements.
                </p>
                <p className="text-gray-700 mt-4">
                  Regardless of the level of service, all three start from the same place: clean, accurate bookkeeping records. Our <Link href="/usa/accounting" className="text-blue-600 hover:underline">accounting</Link> and bookkeeping services ensure your data is always organized and ready for whatever level of assurance your stakeholders demand.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

