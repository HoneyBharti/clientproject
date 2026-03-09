
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, AlertTriangle, UserX, BarChart2, TrendingDown } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Common IRS audit triggers for US businesses include large and consistent net losses, unusually high deductions compared to revenue (especially meals and travel), major discrepancies between filed returns (e.g., 1099s vs. income reported), large cash transactions, and significant dealings with foreign entities. Meticulous record-keeping is the best defense." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the most common red flags that can increase a US business's risk of being selected for an IRS audit. Who is it for? All US business owners and founders. When is it relevant? During tax preparation and throughout the year, as business practices can create these triggers." },
        { title: "Decision Summary", content: "Who should act? All business owners should be aware of these triggers and ensure their bookkeeping and tax filing practices are robust enough to withstand scrutiny. Who can ignore? No one. While audits are rare, understanding the triggers helps businesses maintain compliant practices and reduce risk." }
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

const Trigger = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-red-700 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2' })}
        {title}
    </h3>
    <div className="border-l-4 border-red-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);

export default function AuditTriggersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "IRS Audit Triggers in the United States: A Founder's Guide",
    "description": "An essential guide to the common red flags that can lead to an IRS audit, from high deductions and business losses to worker misclassification and foreign transactions.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/irs-audit-triggers.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/audit-triggers-in-the-united-states" },
    "keywords": "irs audit triggers, how to avoid irs audit, small business audit red flags, what causes an irs audit, tax audit risk factors"
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
              Top Audit Triggers in the United States
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              While IRS audits are statistically uncommon, they aren't entirely random. Understanding the red flags that attract IRS attention is the best way to lower your risk.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              The thought of an IRS audit can be stressful for any business owner. While the overall audit rate is low, the IRS doesn't just pick names out of a hat. It uses a sophisticated computer program called the Discriminate Inventory Function System (DIF) to score every tax return. This system compares your return to norms for similar businesses and flags returns with unusual characteristics. A high DIF score significantly increases your chance of being selected for review.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Knowing what these red flags are can help you ensure your return is well-documented and defensible. This guide breaks down the most common audit triggers for US businesses.
            </p>

            <BlogSection title="Major Red Flags for an IRS Audit" icon={AlertTriangle}>
                <Trigger title="1. Reporting Large Net Losses Year After Year" icon={TrendingDown}>
                    <p><strong>The Issue:</strong> While it's normal for startups to have losses in their early years, the IRS expects a business to eventually become profitable. Reporting substantial net losses for many consecutive years can lead the IRS to question whether you are running a legitimate business or a "hobby" used to write off personal expenses.</p>
                    <p><strong>How to Mitigate:</strong> Your business plan and financial projections should show a clear path to profitability. If you have sustained losses, ensure your documentation for all expenses is immaculate, proving they are legitimate business costs.</p>
                </Trigger>

                 <Trigger title="2. Unusually High Deductions" icon={BarChart2}>
                    <p><strong>The Issue:</strong> The IRS benchmarks your deductions against other businesses in your industry. If your deductions for meals, travel, or vehicle use are disproportionately high compared to your revenue, it's a major red flag.</p>
                    <p><strong>How to Mitigate:</strong> Keep meticulous records for all deductions. For meals, document who you were with and the business purpose. For travel, keep detailed logs. Don't use round numbers; use the exact, documented amounts. High deductions aren't a problem if they are legitimate and you have the proof.</p>
                </Trigger>
                
                <Trigger title="3. Large Cash Transactions" icon={BarChart2}>
                    <p><strong>The Issue:</strong> Businesses that deal heavily in cash (like restaurants or retail stores) are under greater scrutiny because of the potential for underreporting income. Additionally, banks are required to report cash deposits of over $10,000 to the IRS.</p>
                    <p><strong>How to Mitigate:</strong> Keep flawless records of all cash sales and ensure they match your bank deposits. Any discrepancies are a huge red flag.</p>
                </Trigger>

                <Trigger title="4. Worker Misclassification" icon={UserX}>
                     <p><strong>The Issue:</strong> Classifying workers as 1099 independent contractors instead of W-2 employees is a major area of IRS enforcement. If a worker files for unemployment benefits and lists you as their employer, it can trigger an audit of your entire workforce.</p>
                    <p><strong>How to Mitigate:</strong> Be very careful about worker classification. Understand the IRS's "right to control" test. When in doubt, it's almost always safer to classify a worker as a W-2 employee. See our guide on <Link href="/blog/employee-vs-contractor-payroll-rules-us" className="text-blue-600 hover:underline">employees vs. contractors</Link>.</p>
                </Trigger>

                <Trigger title="5. Foreign Bank Accounts and Transactions" icon={AlertTriangle}>
                    <p><strong>The Issue:</strong> The IRS has a host of specific forms for reporting foreign financial activities. Failure to file these forms is a major audit trigger.</p>
                    <p><strong>How to Mitigate:</strong> If your US company has foreign bank accounts (FBAR), is owned by a non-resident (Form 5472), or transacts with foreign related parties, you must file the required informational returns. These filings are complex and carry heavy penalties, making professional <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax services</Link> essential.</p>
                </Trigger>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Best Defense: Meticulous Bookkeeping</h3>
                <p className="text-gray-700">
                   The common thread through all these triggers is documentation. The single best way to reduce your audit risk—and to survive an audit if you are selected—is to maintain clean, accurate, and contemporaneous financial records. 
                </p>
                 <p className="text-gray-700 mt-4">
                  An outsourced <Link href="/usa/bookkeeping" className="text-blue-600 hover:underline">bookkeeping</Link> service that uses modern software to capture every transaction and receipt creates the audit-proof trail you need. It ensures that when you file your tax return, every number is defensible, dramatically lowering your risk profile in the eyes of the IRS.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

