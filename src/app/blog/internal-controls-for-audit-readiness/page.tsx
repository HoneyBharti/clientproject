'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Lock, Users, Edit, Search, Link as LinkIcon } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Internal controls are policies and procedures designed to safeguard assets, ensure financial reporting accuracy, and promote operational efficiency. Key examples include segregation of duties, access controls, regular reconciliations, and formal approval processes. Strong internal controls are essential for audit readiness and preventing fraud." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the basic principles and types of internal controls that businesses should implement to be 'audit-ready.' Who is it for? Founders, business owners, and finance managers. When is it relevant? From the moment a business hires its first employee or has multiple people involved in financial processes." },
        { title: "Decision Summary", content: "Who should act? Any business aiming to scale, prevent fraud, or undergo a financial audit must implement a system of internal controls. Who can ignore? Only a solo founder handling every single transaction might delay this, but it becomes critical as soon as a second person gains financial access." }
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

const ControlExample = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2 text-indigo-600' })}
        {title}
    </h3>
    <div className="border-l-4 border-indigo-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function InternalControlsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Internal Controls for Audit Readiness: A Founder's Guide",
    "description": "An essential guide to implementing basic internal controls—like segregation of duties and approval workflows—to strengthen your business and prepare for any audit.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/internal-controls-audit-readiness.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/internal-controls-for-audit-readiness" },
    "keywords": "internal controls for small business, audit readiness checklist, segregation of duties, preventative vs detective controls, internal controls for financial reporting"
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
              Internal Controls for Audit Readiness: A Founder's Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Strong internal controls are the bedrock of a scalable, fraud-resistant business and the key to a smooth audit. Here's how to build them.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              As a startup grows from a one-person operation to a team, the informal processes that once worked begin to break down. The founder can no longer approve every expense or oversee every transaction. This is where the concept of "internal controls" becomes critical. Internal controls are the policies, procedures, and systems put in place to safeguard company assets, ensure the accuracy of financial reporting, promote operational efficiency, and encourage adherence to laws and regulations.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              For a company preparing for a <Link href="/blog/financial-statement-audits-explained" className="text-blue-600 hover:underline">financial statement audit</Link>, auditors will spend a significant amount of time testing these controls. Strong controls mean lower audit risk and a more efficient audit. Weak controls are a major red flag. This guide breaks down the basic internal controls every business should implement to become audit-ready.
            </p>

            <BlogSection title="The Two Main Types of Internal Controls" icon={ShieldCheck}>
                <p>Internal controls can be broadly categorized into two types:</p>
                 <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Preventative Controls:</strong> These are proactive controls designed to *prevent* errors or fraud from happening in the first place. Examples include requiring manager approval for expenses over a certain amount or restricting access to company bank accounts.</li>
                    <li><strong>Detective Controls:</strong> These are reactive controls designed to *detect* errors or irregularities after they have occurred. The most common example is a monthly bank reconciliation, which can identify unauthorized transactions or bookkeeping mistakes.</li>
                </ul>
                <p>A robust system uses a combination of both types.</p>
            </BlogSection>
            
            <BlogSection title="5 Essential Internal Controls for Any Business" icon={Users}>
                <ControlExample title="1. Segregation of Duties" icon={Users}>
                    <p><strong>What it is:</strong> This is the single most important internal control. It means that no single individual should have control over two or more conflicting financial functions. For example, the person who approves payments should not be the same person who can sign checks or initiate wire transfers.</p>
                    <p><strong>Why it matters:</strong> It dramatically reduces the risk of fraud. If one person can both create a fictitious vendor and pay that vendor, it's easy to steal money. Separating these duties means two people would have to collude to commit fraud.</p>
                </ControlExample>

                <ControlExample title="2. Access Controls" icon={Lock}>
                    <p><strong>What it is:</strong> This involves limiting access to physical assets and financial systems to authorized personnel only. This applies to everything from locking up inventory to setting user permissions in your accounting software.</p>
                    <p><strong>Why it matters:</strong> It protects assets from theft or misuse. Only specific individuals in the finance team should have administrative access to the company's bank accounts or accounting system.</p>
                </ControlExample>

                <ControlExample title="3. Approval and Authorization Workflows" icon={Edit}>
                    <p><strong>What it is:</strong> This control requires that certain transactions be formally authorized by a manager before they are executed. This is commonly used for:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Employee expense reimbursements.</li>
                        <li>Purchase orders over a certain dollar amount.</li>
                        <li>Hiring new vendors or signing new contracts.</li>
                    </ul>
                     <p><strong>Why it matters:</strong> It ensures that company spending is appropriate, necessary, and within budget.</p>
                </ControlExample>

                <ControlExample title="4. Regular Reconciliations" icon={Search}>
                    <p><strong>What it is:</strong> This is a detective control that involves regularly comparing different sets of records to identify discrepancies. The most common examples are:</p>
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Bank Reconciliation:</strong> Matching your internal bookkeeping records to your monthly bank statements.</li>
                        <li><strong>Accounts Receivable Aging Review:</strong> Regularly reviewing which customers haven't paid their invoices.</li>
                    </ul>
                    <p><strong>Why it matters:</strong> Reconciliations are crucial for detecting errors, fraudulent transactions, and ensuring the accuracy of your financial statements.</p>
                </ControlExample>

                <ControlExample title="5. Documentation and Record-Keeping" icon={LinkIcon}>
                    <p><strong>What it is:</strong> This involves maintaining a clear, auditable trail for all transactions. As discussed in our guide to <Link href="/blog/us-bookkeeping-requirements" className="text-blue-600 hover:underline">bookkeeping requirements</Link>, this means attaching a source document (invoice, receipt) to every transaction in your accounting system.</p>
                    <p><strong>Why it matters:</strong> It provides the evidence needed to support your financial statements and tax deductions during an audit.</p>
                </ControlExample>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Building a Scalable Foundation</h3>
                <p className="text-gray-700">
                   Implementing internal controls is not about creating bureaucracy; it's about building a professional, scalable, and secure financial operation. Strong controls protect the company from fraud, ensure data accuracy, and demonstrate to investors and auditors that your business is well-managed.
                </p>
                <p className="text-gray-700 mt-4">
                  A good outsourced <Link href="/usa/accounting" className="text-blue-600 hover:underline">accounting</Link> or <Link href="/usa/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO</Link> service does more than just bookkeeping; they help you design and implement these critical internal controls, creating an audit-ready environment from the start.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
