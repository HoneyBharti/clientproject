'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, BarChart2, TrendingUp, AlertTriangle, Scale, Target } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "In the US, financial forecasting doesn't have a single legal 'standard' like GAAP, but best practices demand that forecasts are built on reasonable, well-documented assumptions, use accrual basis accounting, and integrate the three financial statements (P&L, Balance Sheet, Cash Flow). For startups, a 'bottom-up' forecast is the credible standard for investors." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the best practices and accepted standards for creating reliable financial forecasts for a US business. Who is it for? Founders, startup teams, and finance managers who need to build financial models for investors, lenders, or internal planning. When is it relevant? During fundraising, annual budgeting, and strategic planning." },
        { title: "Decision Summary", content: "Who should act? Any business owner seeking external capital or needing to make informed strategic decisions must adopt these forecasting standards. Who can ignore? Only very small, stable businesses with no growth or fundraising plans can afford to ignore formal forecasting, but it's not a recommended practice." }
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

export default function FinancialForecastingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Founder's Guide to Financial Forecasting Standards in the US",
    "description": "An essential guide to building credible, investor-ready financial forecasts, covering bottom-up vs. top-down approaches, key assumptions, and the three-statement model.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/financial-forecasting-us.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/financial-forecasting-standards-us" },
    "keywords": "financial forecasting standards, how to build a financial model, bottom-up forecasting, three-statement model, financial projections for investors, startup financial forecast"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Virtual CFO Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Founder's Guide to Financial Forecasting Standards in the US
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your financial forecast is the story of your company's future. Learn the standards that make that story credible to investors and useful for you.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              While US GAAP provides strict rules for reporting historical financial data, there is no single, legally mandated "standard" for financial forecasting. However, a set of best practices and conventions has emerged, particularly within the venture capital and finance communities. Adhering to these standards is what separates a credible, defensible financial model from a simple "hockey stick" guess. For a founder seeking investment or a loan, a forecast that meets these standards is non-negotiable.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide breaks down the core principles of professional financial forecasting in the US, as practiced by top <Link href="/usa/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFOs</Link> and expected by savvy investors.
            </p>

            <BlogSection title="Top-Down vs. Bottom-Up Forecasting: Why Bottom-Up Wins" icon={Target}>
                <p>There are two primary approaches to forecasting revenue:</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Top-Down:</strong> This involves starting with a large market size (e.g., "the global market for widgets is $10 billion") and claiming you will capture a small percentage of it (e.g., "we will capture 1%"). While easy to calculate, investors view this as lazy and unrealistic.</li>
                    <li><strong>Bottom-Up:</strong> This is the professional standard. It involves building your revenue forecast from the ground up based on tangible business drivers. For a SaaS company, this would mean projecting the number of leads, conversion rates, and average contract value. For an e-commerce business, it would involve traffic, conversion rates, and average order value.</li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">
                        A bottom-up forecast is credible because every number is tied to a specific, measurable assumption that you can defend and debate with investors.
                    </p>
                </div>
            </BlogSection>
            
            <BlogSection title="The Three Pillars of a Credible Forecast" icon={Scale}>
                 <h3 className="text-2xl font-semibold text-gray-800 mb-3">1. Documented Assumptions</h3>
                <p>Your forecast is only as good as the assumptions that underpin it. A professional model doesn't just show the final numbers; it has a dedicated "Assumptions" tab that clearly lists all the drivers. Examples include:</p>
                 <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Monthly marketing spend</li>
                    <li>Website conversion rate</li>
                    <li>Customer churn rate</li>
                    <li>Average salary per new hire</li>
                    <li>Payment terms for customers (e.g., 30 days)</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-8">2. The Three-Statement Model</h3>
                <p>A professional forecast doesn't just project profit; it projects all three core financial statements, and they must be dynamically linked.</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Income Statement (P&L):</strong> Shows projected profitability.</li>
                    <li><strong>Balance Sheet:</strong> Shows the future state of assets, liabilities, and equity.</li>
                    <li><strong>Cash Flow Statement:</strong> Crucially, this is derived from the other two statements and shows your projected cash balance and runway.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-8">3. Accrual Basis Accounting</h3>
                <p>Your forecast must be built on the same <Link href="/blog/usa-gaap-vs-cash-accounting" className="text-blue-600 hover:underline">accrual basis</Link> used for GAAP-compliant historical reporting. This means recognizing revenue when earned and expenses when incurred, not when cash changes hands. This is the only way to accurately project profitability and working capital needs.</p>
            </BlogSection>

            <BlogSection title="The Role of a Virtual CFO in Forecasting" icon={BarChart2}>
                <p>Building a robust, three-statement financial model from scratch is a highly specialized skill that most founders do not have. This is a primary function of a Virtual CFO. A good vCFO will:</p>
                 <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>Work with you to identify the key drivers of your business and build a flexible assumptions-based model.</li>
                    <li>Create a fully integrated three-statement model that is ready for investor due diligence.</li>
                    <li>Run scenario analysis (e.g., best case, base case, worst case) to understand potential outcomes and cash needs.</li>
                    <li>Help you articulate and defend the story behind the numbers to your board and potential investors.</li>
                </ul>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">From Guesswork to Strategy</h3>
                <p className="text-gray-700">
                   A financial forecast built to professional standards is more than just a requirement for fundraising. It's a strategic tool. It transforms your business plan from a collection of ideas into a concrete, measurable roadmap. It allows you to anticipate challenges, allocate resources effectively, and make informed decisions that drive sustainable growth.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
