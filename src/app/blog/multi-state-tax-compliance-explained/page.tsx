'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Map, Landmark, ShoppingCart, Users, AlertTriangle, Building } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Multi-state tax compliance involves meeting the tax obligations of US states where your business has 'nexus'—a significant connection. This is triggered by physical presence (offices, employees) or, more commonly for online businesses, by exceeding economic thresholds for sales (economic nexus). Key obligations include registering in the state and filing corporate income, franchise, and sales tax returns." },
        { title: "Direct Question Answer", content: "What is this about? A guide to understanding and managing tax compliance obligations in multiple US states. Who is it for? Any business operating or selling across state lines, especially e-commerce companies, SaaS businesses, and companies with remote employees. When is it relevant? As soon as a business begins to have customers or employees outside its state of incorporation." },
        { title: "Decision Summary", content: "Who should act? Any business with a multi-state footprint must proactively monitor its nexus footprint and comply with each state's tax laws. Who can ignore? Only businesses that operate and sell exclusively within a single US state can ignore this. The risks of non-compliance are too high for any inter-state business." }
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

const NexusBlock = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
        {React.createElement(icon, { className: 'w-6 h-6 mr-2' })}
        {title}
    </h3>
    <div className="border-l-4 border-gray-200 pl-4 space-y-3">
      {children}
    </div>
  </div>
);


export default function MultiStateTaxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Multi-State Tax Compliance for US Businesses Explained",
    "description": "An essential guide for founders on understanding sales tax nexus, state income tax, and the challenges of operating across multiple US states.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/multi-state-tax-compliance.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/multi-state-tax-compliance-explained" },
    "keywords": "multi-state tax compliance, sales tax nexus, state income tax for remote employees, economic nexus, wayfair ruling, us state tax guide"
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
              Multi-State Tax Compliance Explained
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              For online businesses and remote companies, tax compliance doesn't stop at the border of your incorporation state. Here’s what you need to know about "nexus."
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Many founders believe that forming a company in a state like Delaware or Wyoming means they only have to worry about that state's rules. This is a dangerous misconception. The United States is not a single market but a collection of 50 different state-level jurisdictions, each with its own tax laws. Your obligation to comply with a state's tax laws hinges on a single, crucial concept: **nexus**.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Understanding nexus is fundamental for any business that sells or operates across state lines. Ignoring it can lead to massive, unexpected tax bills and penalties that can threaten your company's existence. This guide breaks down the concept of nexus and the multi-state compliance obligations it creates.
            </p>

            <BlogSection title="What is Nexus?" icon={Map}>
                <p>Nexus is a legal term for a connection between your business and a state that is significant enough for that state to require you to comply with its tax laws. If you have nexus in a state, you are subject to its authority. There are two primary types of nexus:</p>
                <NexusBlock title="Physical Nexus" icon={Building}>
                    <p>This is the traditional form of nexus. You have a physical presence in a state if you have:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>An office or warehouse</li>
                        <li>An employee working from that state (including a remote employee)</li>
                        <li>Inventory stored in that state (e.g., in an Amazon FBA warehouse)</li>
                        <li>Salespeople or agents operating there</li>
                    </ul>
                     <p>Having a physical nexus almost always means you must register to do business in that state and comply with its income and payroll tax laws.</p>
                </NexusBlock>

                 <NexusBlock title="Economic Nexus" icon={ShoppingCart}>
                    <p>This is a more recent and far-reaching concept established by the 2018 Supreme Court case *South Dakota v. Wayfair*. A state can now require you to collect and remit sales tax based purely on the volume of your sales into that state, even if you have no physical presence there.</p>
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Each state has its own threshold, but a common one is **$100,000 in sales** or **200 separate transactions** into the state within a 12-month period.</li>
                        <li>This primarily impacts e-commerce and SaaS businesses that sell to customers all over the country.</li>
                    </ul>
                </NexusBlock>
            </BlogSection>
            
            <BlogSection title="The Two Main Multi-State Obligations" icon={Landmark}>
                <p>Once nexus is established, you are typically exposed to two main types of state taxes:</p>
                <h3 className="font-bold mt-6 mb-2">1. Sales Tax:</h3>
                <p>If you have economic or physical nexus in a state, you must register with that state's tax authority, charge the correct sales tax rate to customers in that state, collect it, and file regular sales tax returns to remit the funds. With thousands of different tax jurisdictions (state, county, city), this is virtually impossible to manage without automated software. See our guide for <Link href="/usa/industries/ecommerce" className="text-blue-600 hover:underline">E-commerce Businesses</Link> for more.</p>

                <h3 className="font-bold mt-6 mb-2">2. State Corporate Income Tax:</h3>
                <p>If you have physical nexus (like a remote employee) in a state that has a corporate income tax, you will likely need to file a state income tax return and pay tax on the portion of your company's income that is "apportioned" to that state. This has become a major compliance headache for companies with distributed remote teams.</p>
            </BlogSection>
            
            <BlogSection title="The Dangers of Ignoring Nexus" icon={AlertTriangle}>
                <p>Many founders, especially non-residents, are unaware of their multi-state obligations and fail to act. The consequences can be severe:</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Accumulating Back Taxes:</strong> You are liable for all the sales tax you *should have* collected from the moment you established nexus. This can be a huge liability.</li>
                    <li><strong>Penalties and Interest:</strong> States impose hefty penalties and interest on unpaid back taxes.</li>
                    <li><strong>Business Interruption:</strong> A state can issue a notice to payment processors to freeze your funds until the tax liability is settled.</li>
                    <li><strong>Due Diligence Failure:</strong> A potential investor or acquirer will discover your multi-state tax liability during due diligence, which can lower your valuation or kill the deal.</li>
                </ul>
            </BlogSection>

             <BlogSection title="How to Manage Multi-State Compliance" icon={Users}>
                <p>Managing this complexity requires a professional and proactive approach. YourLegal's <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">US tax compliance</Link> service is designed to handle this.</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Nexus Study:</strong> We help you analyze your sales and operations to determine where you have nexus and registration requirements.</li>
                    <li><strong>State Registrations:</strong> We can register your company with the relevant state tax authorities.</li>
                    <li><strong>Automated Filings:</strong> We integrate with sales tax software to automate the collection and filing of sales tax returns and manage state income tax filings as part of our tax packages.</li>
                </ul>
                <p className="mt-4">Don't let multi-state complexity undermine your business. Build a compliance strategy from the start to protect your company as it grows.</p>
            </BlogSection>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
