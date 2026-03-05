
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building, User, Scale, Shield } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "For US businesses, the main choices are Sole Proprietorship (no liability protection), LLC (liability protection with tax flexibility), and C-Corporation (liability protection, built for VC funding). Non-residents cannot use a Sole Proprietorship or S-Corp. The choice between LLC and C-Corp depends on fundraising plans." },
        { title: "Direct Question Answer", content: "What is this about? A guide comparing the primary US business structures: Sole Proprietorship, LLC, and C-Corp. Who is it for? Entrepreneurs starting a business in the US. When is it relevant? This is the most foundational decision made during the company formation process." },
        { title: "Decision Summary", content: "Who should act? Founders planning to raise VC funds must choose a C-Corp. Founders seeking liability protection with simpler taxes should choose an LLC. Who can ignore? Only unincorporated hobbyists. Anyone serious about business must choose a formal entity." }
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
                    <th className="p-4 font-semibold border-b text-center">Sole Proprietorship</th>
                    <th className="p-4 font-semibold border-b text-center">LLC</th>
                    <th className="p-4 font-semibold border-b text-center">C-Corporation</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-4 font-medium">Liability Protection</td>
                    <td className="p-4 text-center text-red-600 font-bold">None</td>
                    <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Taxation</td>
                    <td className="p-4 text-center">Pass-through</td>
                    <td className="p-4 text-center">Pass-through (default)</td>
                    <td className="p-4 text-center">Double taxation</td>
                </tr>
                <tr className="border-b">
                    <td className="p-4 font-medium">VC Fundraising</td>
                    <td className="p-4 text-center">Impossible</td>
                    <td className="p-4 text-center">Extremely Difficult</td>
                    <td className="p-4 text-center">Standard</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Best For</td>
                    <td className="p-4 text-center">Hobbyists, US-resident freelancers</td>
                    <td className="p-4 text-center">Online businesses, consultants</td>
                    <td className="p-4 text-center">High-growth startups</td>
                </tr>
            </tbody>
        </table>
    </div>
);


export default function ChoosingStructurePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Choosing the Right US Business Structure: LLC vs. C-Corp vs. Sole Proprietorship",
    "description": "A guide for founders on the key differences between the main US business structures, focusing on liability, taxation, and fundraising.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-business-structure.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/choosing-the-right-us-business-structure" },
    "keywords": "us business structure, llc vs c-corp vs sole proprietorship, choosing a business entity, best business structure for startups, llc vs c-corp for non-residents"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Formation Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Choosing the Right US Business Structure
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              LLC, C-Corp, or Sole Proprietorship? This foundational decision impacts your liability, taxes, and ability to raise money.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              When starting a business in the United States, your first and most critical decision is choosing the right legal structure. This choice will define your personal liability, how you are taxed, and your ability to attract investment. While there are several options, most founders consider three main paths: the Sole Proprietorship, the Limited Liability Company (LLC), and the C-Corporation.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              For non-resident founders, the choice is simpler, as some structures are not available to them. This guide breaks down the pros and cons of each to help you make an informed decision.
            </p>

            <BlogSection title="The Sole Proprietorship: The Default (and Riskiest) Option" icon={User}>
                <p>A sole proprietorship is the simplest business structure. It's not a formal legal entity; it's simply an individual who runs a business. There is no legal distinction between the owner and the business.</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Liability:</strong> You have **unlimited personal liability**. If the business is sued or incurs debt, your personal assets (house, car, savings) are at risk.</li>
                    <li><strong>Taxes:</strong> All business profit is reported on your personal tax return (Schedule C) and is subject to self-employment taxes.</li>
                    <li><strong>For Non-Residents:</strong> This structure is generally not available, as it requires the owner to have a US Social Security Number (SSN) to operate.</li>
                </ul>
                <p className="font-bold mt-4">Verdict: Only suitable for US-resident freelancers or hobbyists with very low risk. Not a viable option for serious businesses or non-residents.</p>
            </BlogSection>
            
            <BlogSection title="The LLC: Flexibility and Protection" icon={Shield}>
                <p>A Limited Liability Company (LLC) is a formal business structure registered with a state. It is a hybrid that combines the liability protection of a corporation with the tax flexibility of a partnership.</p>
                 <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Liability:</strong> It provides a "corporate veil," protecting your personal assets from business debts and lawsuits.</li>
                    <li><strong>Taxes:</strong> By default, it's a "pass-through" entity. Profits are taxed on the owners' personal returns, avoiding the "double taxation" of a C-Corp. An LLC can also elect to be taxed as a C-Corp or S-Corp if it's advantageous.</li>
                     <li><strong>For Non-Residents:</strong> This is a very popular choice. Non-residents can 100% own a US LLC.</li>
                </ul>
                 <p className="font-bold mt-4">Verdict: Excellent for online businesses, consultants, holding companies, and most small-to-medium-sized businesses that are not seeking venture capital. A <Link href="/blog/delaware-vs-wyoming-incorporation" className="text-blue-600 hover:underline">Wyoming LLC</Link> is a top choice for its low cost and privacy.</p>
            </BlogSection>

            <BlogSection title="The C-Corporation: Built for Venture Capital" icon={Building}>
                <p>A C-Corporation is a separate legal and tax-paying entity. It's the most robust and formal business structure, and it's the standard for high-growth startups.</p>
                 <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Liability:</strong> Provides strong liability protection for its owners (shareholders).</li>
                    <li><strong>Taxes:</strong> It pays corporate income tax on its profits. If profits are distributed to shareholders as dividends, they are taxed again at the personal level (double taxation).</li>
                     <li><strong>For Non-Residents:</strong> This is the required structure for non-resident founders who plan to raise money from US venture capital funds.</li>
                </ul>
                <p className="font-bold mt-4">Verdict: The only choice for startups planning to seek funding from VCs. A <Link href="/blog/delaware-vs-wyoming-incorporation" className="text-blue-600 hover:underline">Delaware C-Corp</Link> is the industry standard.</p>
            </BlogSection>
            
             <ComparisonTable />

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Deciding Factor: Your Fundraising Strategy</h3>
                <p className="text-gray-700">
                  For most founders, the decision boils down to this: **Do you plan to raise money from venture capital investors?**
                </p>
                 <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
                    <li>If **YES**, you must form a **C-Corporation**.</li>
                    <li>If **NO**, an **LLC** usually offers better tax treatment and more simplicity.</li>
                </ul>
                <p className="text-gray-700 mt-4">Choosing the right structure from the start is crucial. Converting from an LLC to a C-Corp later is possible but can be costly and complex. Our <Link href="/usa/company-formation" className="text-blue-600 hover:underline">company formation service</Link> can help you make the right choice and get started on a solid legal foundation.</p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
