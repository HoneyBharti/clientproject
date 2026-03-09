'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, ShoppingCart, Percent, User, BookOpen } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "In the US, Income Tax is a tax on profit, levied by federal and some state governments. Sales Tax is a tax on transactions (the sale of goods/services), levied by state and local governments. They are entirely separate systems. A business can owe income tax in one state but have an obligation to collect sales tax in many states due to 'economic nexus'." },
        { title: "Direct Question Answer", content: "What is this about? A clear explanation of the difference between sales tax and income tax for US businesses. Who is it for? All business owners, especially e-commerce sellers and non-resident founders, who are often confused by the dual tax system. When is it relevant? When setting up a business, expanding sales to new states, and during tax planning and filing." },
        { title: "Decision Summary", content: "Who should act? All business owners must understand this distinction to manage compliance. E-commerce businesses, in particular, must proactively manage sales tax obligations. Who can ignore? No one. Ignoring either type of tax leads to severe penalties from different government bodies (IRS for income tax, state revenue departments for sales tax)." }
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

const TaxType = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2' })}
        {title}
    </h3>
    <div className="border-l-4 border-gray-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function SalesVsIncomeTaxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Sales Tax vs. Income Tax in the United States: A Founder's Guide",
    "description": "An essential guide explaining the fundamental differences between sales tax (a state-level tax on transactions) and income tax (a federal/state tax on profit).",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/sales-vs-income-tax.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/sales-tax-vs-income-tax-explained" },
    "keywords": "sales tax vs income tax, us sales tax explained, what is federal income tax, state income tax, economic nexus sales tax, tax compliance usa"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax System</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Sales Tax vs. Income Tax: A Founder's Guide to the US System
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              They are not the same. Understanding the crucial difference between a tax on transactions (sales tax) and a tax on profit (income tax) is fundamental to US compliance.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For founders new to the US market, particularly non-residents, the American tax system can seem baffling. The single most common point of confusion is the difference between sales tax and income tax. Many entrepreneurs mistakenly believe they are related or that paying one satisfies the other. They are, in fact, two completely separate tax systems, run by different government bodies, with different rules and different penalties.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Confusing the two can lead to massive compliance failures. This guide will clearly and simply explain the difference.
            </p>

            <BlogSection title="The Two Tax Systems" icon={Landmark}>
                <TaxType title="Income Tax: A Tax on Profit" icon={Percent}>
                    <p><strong>Who Levies It?</strong> The federal government (via the IRS) and most state governments.</p>
                    <p><strong>What is it Taxed On?</strong> Your business's <strong>net profit</strong>. This is calculated as your Revenue minus your allowable business Expenses (`Profit = Revenue - Expenses`). If your business has no profit, you generally have no income tax liability (though you still must file a return).</p>
                    <p><strong>How is it Paid?</strong> Annually, by filing a tax return (e.g., Form 1120 or 1065) with the IRS and a separate return with each state where you owe income tax.</p>
                    <p><strong>Key Concept:</strong> Income tax is about profitability. You are taxed on what you *keep*.</p>
                </TaxType>

                <TaxType title="Sales Tax: A Tax on Transactions" icon={ShoppingCart}>
                    <p><strong>Who Levies It?</strong> State and local governments only. There is no federal sales tax.</p>
                    <p><strong>What is it Taxed On?</strong> The gross sales price of specific goods and services. It is a tax on the <strong>transaction itself</strong>, regardless of whether the sale was profitable for your business.</p>
                    <p><strong>How is it Paid?</strong> Your business acts as a tax collector for the state. You collect the sales tax from the customer at the point of sale and then remit it to the state tax authority, usually on a monthly or quarterly basis.</p>
                    <p><strong>Key Concept:</strong> Sales tax is about the location of the *customer*. You are responsible for collecting tax based on their state's rules, not your own.</p>
                </TaxType>
            </BlogSection>
            
            <BlogSection title="The Critical Role of 'Nexus'" icon={User}>
                <p>Your obligation to deal with a state's tax system is determined by "nexus," a legal term for having a significant connection to that state. Crucially, the rules for nexus are different for income tax and sales tax.</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Income Tax Nexus:</strong> Is typically created by having a physical presence in a state, such as an office or a remote employee. If you have an employee in California, your company now has income tax nexus there and must file a California state income tax return.</li>
                    <li><strong>Sales Tax Nexus:</strong> Can be created by a physical presence OR by "economic nexus." This means if you sell more than a certain amount (e.g., $100,000) into a state, you must start collecting their sales tax, even if you have no physical presence there. This is a huge issue for e-commerce companies and is explained in our <Link href="/blog/multi-state-tax-compliance-explained" className="text-blue-600 hover:underline">Multi-State Compliance Guide</Link>.</li>
                </ul>
            </BlogSection>

            <BlogSection title="A Practical Example" icon={BookOpen}>
                <p>Imagine you run a Delaware LLC that sells a SaaS product. You live and work in Germany. You have one remote employee in Texas and customers all over the US.</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Federal Income Tax:</strong> You must file a federal return with the IRS to report your company's total profit.</li>
                    <li><strong>Delaware Franchise Tax:</strong> You must pay Delaware its annual LLC tax just for being incorporated there.</li>
                    <li><strong>Texas Franchise Tax:</strong> Because you have an employee in Texas (physical nexus), you must register with Texas and file a Texas franchise tax return.</li>
                    <li><strong>Sales Tax:</strong> If your sales to customers in New York exceed $500,000 and your SaaS product is taxable there, you now have economic nexus in New York. You must register with New York's tax department, collect sales tax from your New York customers, and remit it quarterly. This obligation exists even though you have no physical connection to New York.</li>
                </ul>
                <p className="mt-2">In this example, your company has compliance obligations in Delaware, Texas, and New York, plus the federal government. This is why professional{" "}
                  <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">
                    tax compliance
                  </Link>{" "}
                  for a US business is so complex.
                </p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Bottom Line</h3>
                <p className="text-gray-700">
                   Income tax and sales tax are fundamentally different. One is a tax on profit, the other on transactions. One is primarily federal, the other is entirely state-level. A compliant US business must have a strategy for both. YourLegal's Vitals and Elite plans are designed to manage both federal and state tax obligations, providing a holistic solution for founders.
                </p>
            </div>
          </article>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

