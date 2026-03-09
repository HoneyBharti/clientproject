
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, FileText, Search, UserCheck } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "To prepare for an IRS audit, do not panic. First, understand the scope and type of audit (mail, office, or field). Gather all requested documents, including tax returns, bank statements, and detailed receipts for every deduction. Review your records for accuracy, and most importantly, engage professional representation from a CPA or tax attorney immediately. Do not communicate with the auditor directly." },
        { title: "Direct Question Answer", content: "What is this about? A step-by-step guide on what to do if your US business receives an audit notice from the IRS. Who is it for? Any business owner facing an IRS tax audit. When is it relevant? The moment an audit notice is received in the mail." },
        { title: "Decision Summary", content: "Who should act? Any business owner who receives an audit notice must act immediately by engaging professional help. Who can ignore? No one. Ignoring an IRS audit notice will lead to automatic assessments, penalties, and more aggressive collection actions." }
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

export default function PreparingForIrsAuditsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Preparing for an IRS Audit: A Step-by-Step Guide for Businesses",
    "description": "An essential guide on what to do if you receive an IRS audit notice, covering the different types of audits, how to prepare your documents, and the importance of professional representation.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/preparing-for-irs-audits.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/preparing-for-irs-audits" },
    "keywords": "preparing for irs audit, irs audit checklist, what to do if audited by irs, how to handle an irs audit, business tax audit"
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
              Preparing for an IRS Audit: A Step-by-Step Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Receiving a notice from the IRS can be unnerving, but with a calm, methodical approach, you can navigate the process successfully. Here's exactly what to do.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Few letters strike more fear into the heart of a business owner than one from the Internal Revenue Service (IRS) announcing a tax audit. While the odds of being audited are low, it's a possibility every business must be prepared for. Panic is the worst response. A tax audit is a manageable process, provided you handle it correctly from the very beginning.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              The key to a successful audit outcome is preparation. This guide provides a clear, step-by-step checklist for what to do from the moment you open that dreaded envelope.
            </p>

            <BlogSection title="Step 1: Understand the Type of Audit" icon={Search}>
                <p>Not all audits are created equal. The IRS conducts three main types, and the notice you receive will specify which one it is:</p>
                <ul className="list-disc pl-5 mt-4 space-y-3">
                    <li><strong>Correspondence Audit:</strong> The most common and least severe type. The IRS questions a specific item on your return and requests documentation by mail. It's handled entirely through correspondence.</li>
                    <li><strong>Office Audit:</strong> You (or your representative) are asked to visit a local IRS office to meet with an auditor and provide records for specific items on your return.</li>
                    <li><strong>Field Audit:</strong> The most comprehensive and serious type. An IRS agent will visit your place of business to conduct a broad review of your books and records. This is more common for larger businesses.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="Step 2: Do Not Ignore the Notice and Understand the Scope" icon={FileText}>
                <p>Read the audit notice carefully. It will tell you:</p>
                 <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Which tax year(s) are being audited.</li>
                    <li>Exactly which items on your tax return are being examined.</li>
                    <li>The initial list of documents you need to provide.</li>
                 </ul>
                <p>The scope is important. Do not volunteer information or documents that were not specifically requested. Stick to the scope of the audit.</p>
            </BlogSection>

             <BlogSection title="Step 3: Immediately Engage Professional Representation" icon={UserCheck}>
                <p>This is the single most important step you can take. **Do not attempt to handle an IRS audit yourself.** You need a professional representative—typically a Certified Public Accountant (CPA), a Tax Attorney, or an Enrolled Agent—to represent you.</p>
                <p>You will sign a Form 2848, "Power of Attorney and Declaration of Representative," which authorizes them to speak to the IRS on your behalf. From that point on, you should have no direct contact with the IRS agent. All communication goes through your representative. This prevents you from inadvertently saying something that could expand the scope of the audit.</p>
                <p>YourLegal provides <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">audit support</Link> as part of its tax compliance services.</p>
            </BlogSection>
            
            <BlogSection title="Step 4: Gather and Organize Your Records" icon={ShieldCheck}>
                <p>Your representative will guide you, but you need to start gathering all the relevant documentation immediately. This is where your investment in good <Link href="/blog/us-bookkeeping-requirements" className="text-blue-600 hover:underline">bookkeeping</Link> pays off.</p>
                <h4 className="font-bold mt-6 mb-2">Key Documents to Assemble:</h4>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>The tax return for the year under audit.</li>
                    <li>Your complete, reconciled bookkeeping file (e.g., QuickBooks or Xero file).</li>
                    <li>All bank and credit card statements for the year.</li>
                    <li>Detailed receipts and invoices for every single expense being examined.</li>
                    <li>For deductions like travel and meals, logs and documentation showing the business purpose.</li>
                </ul>
                <p>Provide these documents to your representative, not directly to the IRS.</p>
            </BlogSection>

            <BlogSection title="Step 5: Let Your Representative Handle the Audit" icon={UserCheck}>
                <p>Once you've provided the information to your CPA or attorney, your job is largely done. They will:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Review the records and prepare them for submission.</li>
                    <li>Communicate directly with the IRS agent.</li>
                    <li>Answer the agent's questions and provide follow-up documentation.</li>
                    <li>Negotiate on your behalf if there are disagreements over certain items.</li>
                    <li>Review the auditor's final report and advise you on whether to accept the findings or proceed to the appeals process.</li>
                </ul>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Power of Preparation</h3>
                <p className="text-gray-700">
                   The outcome of an IRS audit is almost always determined by the quality of the records you kept during the tax year in question. While a good representative can ensure the process is handled professionally, they cannot create records that don't exist.
                </p>
                <p className="text-gray-700 mt-4">
                  This highlights why using a professional <Link href="/usa/accounting" className="text-blue-600 hover:underline">accounting service</Link> year-round is the best audit defense. By maintaining meticulous, audit-ready books at all times, you are always prepared. If the notice does arrive, the process is transformed from a frantic scramble into a calm, organized response.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

