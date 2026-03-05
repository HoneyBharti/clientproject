
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Scale, Globe, FileText, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Transfer pricing refers to the rules for pricing transactions between related companies in different tax jurisdictions (e.g., a US subsidiary and its foreign parent). The core 'arm's length principle' requires these transactions to be priced as if the companies were unrelated. The IRS strictly enforces these rules to prevent profit shifting, and companies must maintain detailed documentation to defend their pricing." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the fundamentals of US transfer pricing rules. Who is it for? Multinational companies with operations in the US, and US companies with foreign subsidiaries. When is it relevant? Whenever a transaction (e.g., for services, goods, loans, IP) occurs between related entities across borders." },
        { title: "Decision Summary", content: "Who should act? Any company with intercompany cross-border transactions must establish and document a transfer pricing policy. Who can ignore? Domestic companies with no foreign-related entities can ignore this. For multinationals, it's a critical, high-risk compliance area." }
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

export default function TransferPricingBasicsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Transfer Pricing Basics for US Companies: A Founder's Guide",
    "description": "An essential guide to understanding the 'arm's length principle,' documentation requirements, and the risks of IRS adjustments for intercompany transactions.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/transfer-pricing-basics.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/transfer-pricing-basics-for-us-companies" },
    "keywords": "transfer pricing basics, arm's length principle, section 482 irs, intercompany transactions, transfer pricing documentation, us transfer pricing rules"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Cross-Border Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Transfer Pricing Basics for US Companies
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              If your US company transacts with a foreign parent or subsidiary, you're subject to some of the most complex rules in the US tax code. Here's what you need to know.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For any multinational business, one of the most scrutinized and high-risk areas of international taxation is "transfer pricing." This isn't about the price you charge external customers; it's about the price you charge *yourself*—specifically, the price that one part of your company (e.g., your US subsidiary) charges another related part (e.g., your UK parent company) for goods, services, or intellectual property.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              The Internal Revenue Service (IRS) is intensely focused on transfer pricing to prevent companies from artificially shifting profits from the higher-tax US to lower-tax jurisdictions. Understanding the basic principles is essential for any founder with a global footprint. Our <Link href="/usa/cross-border-accounting" className="text-blue-600 hover:underline">Cross-Border Accounting</Link> service is built to manage this risk.
            </p>

            <BlogSection title="The Arm's Length Principle: The Golden Rule" icon={Scale}>
                <p>The entire global framework for transfer pricing, including the US rules under Internal Revenue Code Section 482, is built on a single concept: the **arm's length principle**.</p>
                <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800 text-lg">
                        The arm's length principle states that the price for a transaction between related parties should be the same as the price would be if the parties were unrelated and independent.
                    </p>
                </div>
                <p className="mt-4">In other words, you must charge your own subsidiary the same price you would charge a random third-party customer for the same service. If you charge your US sub an inflated "management fee" that you would never be able to charge an outside client, the IRS can disallow it.</p>
            </BlogSection>
            
            <BlogSection title="Common Types of Intercompany Transactions" icon={Globe}>
                <p>Transfer pricing rules apply to virtually any exchange of value between related entities in different countries:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Services:</strong> A foreign parent provides management, technical, or administrative support to its US subsidiary. The fee must be at a market rate.</li>
                    <li><strong>Intellectual Property (IP):</strong> A foreign parent licenses a brand name, patent, or software to its US subsidiary. The royalty rate must be comparable to what an independent party would pay.</li>
                    <li><strong>Goods:</strong> A foreign parent manufactures goods and sells them to its US subsidiary for distribution. The price of the goods must be at arm's length.</li>
                    <li><strong>Financing:</strong> A foreign parent lends money to its US subsidiary. The interest rate on the loan must be a market-based interest rate.</li>
                </ul>
            </BlogSection>

            <BlogSection title="The Critical Need for Documentation" icon={FileText}>
                <p>If the IRS audits your transfer pricing, the burden of proof is on you to demonstrate that your intercompany transactions were priced at arm's length. Simply saying "it felt fair" is not a defense. You need robust, contemporaneous documentation.</p>
                <p><strong>A Transfer Pricing Study:</strong> For companies with significant intercompany transactions, a formal "transfer pricing study" prepared by an economist or tax advisor is often necessary. This study analyzes your industry and benchmarks your pricing against comparable transactions between unrelated companies to justify your methodology.</p>
                <p><strong>Intercompany Agreements:</strong> You must have formal, written legal agreements for all services, loans, and IP licenses between your related entities, just as you would with a third party.</p>
                <p>Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">Tax Compliance</Link> service helps ensure this documentation is in place.</p>
            </BlogSection>

            <BlogSection title="The Risks of Getting It Wrong" icon={AlertTriangle}>
                <p>The consequences of a failed transfer pricing audit are severe:</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Income Re-allocation:</strong> The IRS can disregard your pricing and re-allocate income to the US entity, creating a large, unexpected US tax liability.</li>
                    <li><strong>Substantial Penalties:</strong> Penalties for a "substantial valuation misstatement" can be as high as 40% of the additional tax owed.</li>
                    <li><strong>Double Taxation:</strong> If the IRS allocates more profit to the US, the foreign tax authority in your home country may not grant a corresponding deduction, leading to the same profit being taxed in two countries.</li>
                    <li><strong>Costly Audits:</strong> Transfer pricing audits are famously long, data-intensive, and expensive, consuming significant management time and professional fees.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Proactive Strategy, Not Reactive Defense</h3>
                <p className="text-gray-700">
                    Transfer pricing is not something to be "fixed" after the fact. It requires a proactive strategy from the moment you establish a cross-border relationship between entities. By setting and documenting an arm's length pricing policy from day one, you create a defensible position that significantly reduces your risk.
                </p>
                <p className="text-gray-700 mt-4">
                  A <Link href="/usa/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO</Link> with international tax experience is essential for developing and overseeing this strategy, ensuring your global structure is built for both growth and compliance.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
