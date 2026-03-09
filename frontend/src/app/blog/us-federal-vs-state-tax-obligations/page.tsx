'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, MapPin, AlertTriangle, Scale, Building } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "US businesses face a dual tax system. Federal taxes, managed by the IRS, include income tax and payroll taxes. State taxes, which vary widely, can include corporate income tax, franchise tax for the right to exist in that state (like Delaware's), and sales tax based on where customers are located. Compliance requires managing both layers." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of the two-tier tax system in the US, detailing the differences between federal obligations (IRS) and state-level obligations (e.g., Delaware Division of Revenue). Who is it for? Founders of US companies, especially non-residents, who need to understand their full tax burden. When is it relevant? Annually, when preparing for tax season and planning for compliance costs." },
        { title: "Decision Summary", content: "Who should act? Every US company must understand and plan for both federal and state tax filings and payments. Who can ignore? No one. Ignoring either layer of tax obligation will lead to penalties, loss of good standing, and potential business dissolution." }
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
                    <th className="p-4 font-semibold border-b">Tax Type</th>
                    <th className="p-4 font-semibold border-b text-center">Federal Level (IRS)</th>
                    <th className="p-4 font-semibold border-b text-center">State Level</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Income Tax</td>
                    <td className="p-4 text-center">Applies to net profit (income minus expenses). Universal across the US.</td>
                    <td className="p-4 text-center">Varies. Some states have it, others (like Wyoming, Texas) do not.</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Franchise Tax</td>
                    <td className="p-4 text-center">Does not exist at the federal level.</td>
                    <td className="p-4 text-center">A fee for the 'privilege' of existing in a state. Delaware and California are notable examples.</td>
                </tr>
                 <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Sales Tax</td>
                    <td className="p-4 text-center">Does not exist at the federal level.</td>
                    <td className="p-4 text-center">Levied by 45 states. Based on the customer's location, not the seller's.</td>
                </tr>
                <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-700">Governing Body</td>
                    <td className="p-4 text-center">Internal Revenue Service (IRS)</td>
                    <td className="p-4 text-center">Each state's Department of Revenue.</td>
                </tr>
            </tbody>
        </table>
    </div>
);


export default function FederalVsStateTaxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Federal vs. State Tax Obligations for US Businesses Explained",
    "description": "A guide for founders on the crucial differences between IRS federal taxes and the diverse landscape of state-level income, franchise, and sales taxes.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-federal-vs-state-tax.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-federal-vs-state-tax-obligations" },
    "keywords": "federal vs state tax, us business tax obligations, irs vs state tax, delaware franchise tax, state income tax nexus, sales tax nexus"
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
              Federal vs. State Tax: A Guide for US Business Owners
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              One of the most confusing aspects of US compliance is its two-tier tax system. Understanding the difference between your federal and state obligations is critical.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Unlike many countries with a single national tax authority, the United States operates on a system of federalism. This means your business is subject to laws and taxes at both the national (federal) level and the individual state level. For founders, especially those from outside the US, this dual system is often a source of major confusion and compliance risk.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              It’s not enough to just file with the IRS; you must also satisfy the unique requirements of your state of incorporation and any other state where you have "nexus." This guide clarifies the distinct roles and obligations of federal vs. state tax compliance.
            </p>

            <BlogSection title="Federal Tax Obligations: The IRS" icon={Landmark}>
                <p>Federal taxes are administered by the Internal Revenue Service (IRS) and apply uniformly to all businesses across the country, regardless of where they are incorporated or located.</p>
                <h4 className="font-bold mt-6 mb-2">Key Federal Taxes for Businesses:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Corporate Income Tax:</strong> A tax on the net profits of your company. This is filed annually via forms like the <a href="https://www.irs.gov/forms-pubs/about-form-1120" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 1120</a> for C-Corps or <a href="https://www.irs.gov/forms-pubs/about-form-1065" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Form 1065</a> for partnerships/multi-member LLCs.</li>
                    <li><strong>Payroll Taxes (FICA & FUTA):</strong> If you have W-2 employees, you must withhold and remit Social Security, Medicare (FICA), and federal unemployment (FUTA) taxes.</li>
                    <li><strong>Informational Returns:</strong> For foreign-owned companies, this includes the critical <Link href="/blog/us-accounting-risks-for-foreign-owners" className="text-blue-600 hover:underline">Form 5472</Link>, which reports transactions with foreign owners.</li>
                </ul>
                <p className="mt-4">Think of federal taxes as the universal cost of doing business in the United States.</p>
            </BlogSection>
            
            <BlogSection title="State-Level Obligations: A Complex Patchwork" icon={MapPin}>
                <p>State-level obligations are where things get complicated, as every state has its own set of rules. Your obligations depend on your **state of incorporation** and any states where you have **nexus**.</p>
                
                <h4 className="font-bold mt-6 mb-2">1. Taxes in Your State of Incorporation:</h4>
                 <p>This is the state where you registered your LLC or C-Corp (e.g., Delaware, Wyoming). You owe this state compliance duties simply for existing there.</p>
                 <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Franchise Tax:</strong> This is NOT a tax on profit. It's a fee for the "privilege" of having a company in that state. Delaware's franchise tax is a well-known example. It's due every year, even with zero revenue.</li>
                     <li><strong>Annual Report:</strong> A filing to keep your company's information (like its address and directors) up to date. This often has a fee associated with it. Wyoming's Annual Report is a key example.</li>
                </ul>
                <p className="mt-2">Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">Annual Compliance service</Link> is designed to handle these specific state of incorporation filings.</p>
                
                 <h4 className="font-bold mt-6 mb-2">2. Taxes in States Where You Have "Nexus":</h4>
                 <p>"Nexus" is a connection between your business and a state that obligates you to follow that state's tax laws. It can be created by:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Physical Nexus:</strong> Having an office, employee, or inventory in that state.</li>
                    <li><strong>Economic Nexus:</strong> Exceeding a certain threshold of sales into that state (e.g., $100,000 in sales).</li>
                </ul>
                 <p className="mt-2">If you have nexus in a state, you may be required to file:</p>
                 <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>State Corporate Income Tax:</strong> A tax on the portion of your company's profit that is attributable to that state.</li>
                     <li><strong>Sales Tax:</strong> You must register to collect and remit sales tax from customers in that state.</li>
                </ul>
            </BlogSection>

            <ComparisonTable />
            
            <BlogSection title="The Bottom Line: Manage Both Layers" icon={Scale}>
                <p>Successful US tax compliance means managing two distinct but interconnected systems. You must satisfy the IRS at the federal level while also tracking and fulfilling your obligations to each individual state where you are registered or have nexus. </p>
                <p>This dual system is why professional tax services are not a luxury but a necessity for businesses operating in the US. At YourLegal, our <Link href="/usa/pricing" className="text-blue-600 hover:underline">Vitals and Elite plans</Link> provide a holistic <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax compliance</Link> solution that covers both federal and state filings, taking the complexity and risk off your shoulders so you can focus on your business.</p>
            </BlogSection>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

