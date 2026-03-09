'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckSquare, FileText, Landmark, Scale, Globe } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "A cross-border compliance checklist for a US company with foreign ties includes: 1) Filing mandatory IRS informational returns (e.g., Form 5472), 2) Adhering to FinCEN's FBAR and BOI reporting rules, 3) Managing withholding tax on payments to foreign owners, and 4) Maintaining a defensible transfer pricing policy. Each item carries significant penalties for non-compliance." },
        { title: "Direct Question Answer", content: "What is this about? A high-level checklist of the essential compliance tasks for US companies with international operations or ownership. Who is it for? Foreign founders of US companies and US founders with foreign operations. When is it relevant? Annually, as these are recurring legal and tax obligations." },
        { title: "Decision Summary", content: "Who should act? Any business owner with cross-border activities must address every item on this checklist with the help of a professional service. Who can ignore? Only purely domestic businesses with no foreign owners, accounts, or operations." }
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

const ChecklistItem = ({ title, description }) => (
    <div className="flex items-start mb-4">
        <CheckSquare className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-bold text-xl text-gray-800">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default function CrossBorderChecklistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Cross-Border Compliance Checklist for US Companies",
    "description": "An essential checklist for global founders covering IRS informational returns, FinCEN reporting, withholding tax, and transfer pricing.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/cross-border-checklist.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/cross-border-compliance-checklist" },
    "keywords": "cross-border compliance checklist, us international tax compliance, form 5472 filing, fbar reporting, us withholding tax, transfer pricing policy"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Global Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The Cross-Border Compliance Checklist for US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Operating globally requires navigating a maze of US international compliance rules. This checklist covers the absolute essentials every founder needs to manage.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For any US company with foreign owners, foreign bank accounts, or international subsidiaries, domestic compliance is only half the battle. The US government has a robust framework of rules designed to ensure full transparency into cross-border financial activities. Navigating these requirements is a high-stakes endeavor where mistakes can lead to severe penalties.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This checklist provides a high-level overview of the most critical cross-border compliance items that should be on every global founder's radar.
            </p>

            <BlogSection title="The Annual Cross-Border Compliance Checklist" icon={CheckSquare}>
                <ChecklistItem title="File IRS Informational Returns">
                    These are mandatory filings that provide the IRS with information about your company's foreign connections. They do not typically involve a tax payment but carry huge penalties for non-filing. The main form is <Link href="/blog/non-resident-tax-guide" className="text-blue-600 hover:underline">Form 5472</Link> for 25%+ foreign-owned US companies.
                </ChecklistItem>
                
                <ChecklistItem title="File FinCEN Reports (FBAR & BOI)">
                    The Financial Crimes Enforcement Network (FinCEN) requires two key reports. The <Link href="/blog/fatca-compliance-explained" className="text-blue-600 hover:underline">FBAR (FinCEN Form 114)</Link> for US companies with over $10,000 in foreign bank accounts, and the new <Link href="/blog/boi-reporting-requirements-explained" className="text-blue-600 hover:underline">Beneficial Ownership Information (BOI) Report</Link> for nearly all small businesses.
                </ChecklistItem>
                
                 <ChecklistItem title="Manage Withholding Tax Obligations">
                    If your US company makes payments of dividends, interest, or royalties to foreign owners, you must comply with US <Link href="/blog/withholding-tax-rules-for-non-residents" className="text-blue-600 hover:underline">withholding tax rules</Link>. This involves withholding the correct tax amount and filing Forms 1042 and 1042-S with the IRS.
                </ChecklistItem>

                <ChecklistItem title="Establish and Maintain a Transfer Pricing Policy">
                    If you have any intercompany transactions (e.g., between a US sub and a foreign parent), you must have a documented <Link href="/blog/transfer-pricing-basics-for-us-companies" className="text-blue-600 hover:underline">transfer pricing</Link> policy to prove the transactions are priced at "arm's length." This is a primary focus area for IRS audits of multinational companies.
                </ChecklistItem>
                
                 <ChecklistItem title="Review and Apply Tax Treaties">
                    Analyze the applicable <Link href="/blog/us-tax-treaties-explained" className="text-blue-600 hover:underline">US tax treaty</Link> with the foreign owner's country to reduce withholding taxes and prevent double taxation. This requires proper documentation, such as obtaining a Form W-8BEN-E from the foreign parent.
                </ChecklistItem>
                
                <ChecklistItem title="Maintain Multi-Currency and Multi-Standard Accounting">
                    Ensure your <Link href="/blog/managing-multi-country-accounting" className="text-blue-600 hover:underline">accounting system</Link> can handle multiple currencies and that you have a process for consolidating financials across different standards (e.g., US GAAP and IFRS) if required for group reporting.
                </ChecklistItem>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">A Comprehensive Solution</h3>
                 <p className="text-gray-700">
                   This checklist highlights the immense complexity of global compliance. A single misstep can lead to tens of thousands of dollars in penalties.
                </p>
                 <p className="text-gray-700 mt-4">
                  Our <Link href="/usa/cross-border-accounting" className="text-blue-600 hover:underline">Cross-Border Accounting</Link> and <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">Tax Compliance</Link> services are designed to manage every item on this checklist. We provide an end-to-end solution that allows you to operate globally with confidence, knowing your compliance is handled by experts.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

