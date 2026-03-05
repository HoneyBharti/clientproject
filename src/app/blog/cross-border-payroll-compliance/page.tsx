'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Globe, Users, Landmark, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Cross-border payroll involves paying employees in different countries, each with its own unique tax, labor, and social security laws. It is exceptionally complex. Key challenges include multi-jurisdictional tax withholding, varying labor laws, and different currency and banking systems. The only viable solution is to use a global Employer of Record (EOR) service." },
        { title: "Direct Question Answer", content: "What is this about? A guide to the challenges of cross-border payroll compliance. Who is it for? Companies hiring employees outside their home country. When is it relevant? The moment a company decides to hire its first international employee." },
        { title: "Decision Summary", content: "Who should act? Any company planning to hire internationally must use a professional EOR service. Who can ignore? Companies that only hire domestically. DIY cross-border payroll is not a feasible or compliant option." }
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

export default function CrossBorderPayrollPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Cross-Border Payroll Compliance: A Guide to Hiring Globally",
    "description": "An essential guide to the immense complexities of international payroll, from multi-jurisdictional taxes to varying labor laws, and why an Employer of Record (EOR) is necessary.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/cross-border-payroll.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/cross-border-payroll-compliance" },
    "keywords": "cross-border payroll, international payroll compliance, employer of record eor, hiring international employees, global payroll solutions"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Global HR</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Cross-Border Payroll Compliance: The Ultimate Challenge
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hiring globally is powerful, but paying globally is a compliance minefield. This guide explains the challenges and the essential solution: the Employer of Record (EOR).
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              For a growing company, the ability to hire the best talent, regardless of their location, is a massive competitive advantage. But this strategic benefit comes with an enormous administrative and legal burden: cross-border payroll. Paying an employee in another country is not as simple as sending a wire transfer. It requires navigating that country's entire legal framework for employment, tax, and social security.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Trying to manage this in-house is practically impossible for any company that isn't a mega-corporation with legal teams in every country. This guide breaks down the core challenges of cross-border payroll and explains why a specialized service is not just helpful, but necessary. For more details on US-specific payroll see our guides on <Link href="/blog/us-payroll-compliance-rules" className="text-blue-600 hover:underline">payroll rules</Link> and <Link href="/blog/us-payroll-setup-checklist" className="text-blue-600 hover:underline">payroll setup</Link>.
            </p>

            <BlogSection title="The Core Challenge: Every Country is Different" icon={Globe}>
                <p>There is no such thing as "international payroll." There is only a collection of individual, country-specific payroll systems. If you hire one employee in the UK, one in Germany, and one in Canada, you must comply with three completely different sets of rules.</p>
                <p>This includes:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Different Tax Systems:</strong> Each country has unique income tax brackets and payroll tax withholding requirements.</li>
                    <li><strong>Different Social Security Systems:</strong> Each has its own mandatory contributions for pensions, healthcare, and unemployment (e.g., National Insurance in the UK, CPF in Singapore, Social Security/Medicare in the US).</li>
                    <li><strong>Different Labor Laws:</strong> Each has its own rules for minimum wage, working hours, overtime, vacation time, and termination.</li>
                    <li><strong>Different Currencies and Banking Systems:</strong> You must be able to pay employees in their local currency through their local banking system.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="Why DIY is Impossible" icon={AlertTriangle}>
                <p>To compliantly pay an employee in a foreign country, you would typically need to:</p>
                <ol className="list-decimal pl-5 space-y-3 mt-4">
                    <li><strong>Establish a Local Legal Entity:</strong> In most cases, you must register a subsidiary or branch in that country to legally act as an employer.</li>
                    <li><strong>Register as an Employer:</strong> You would need to register with that country's tax and social security authorities.</li>
                    <li><strong>Open a Local Bank Account:</strong> To process local payroll, you usually need an in-country bank account.</li>
                    <li><strong>Hire Local Experts:</strong> You would need to hire local lawyers and accountants to ensure you are complying with all local laws.</li>
                </ol>
                <p className="mt-4">Repeating this process for every country where you want to hire is prohibitively expensive and slow, killing the agility that makes global hiring attractive in the first place.</p>
            </BlogSection>

            <BlogSection title="The Solution: Employer of Record (EOR)" icon={Users}>
                <p>An Employer of Record (EOR) is a third-party company that acts as the legal employer for your international staff on your behalf. This is the industry-standard solution for managing cross-border payroll compliance.</p>
                <p><strong>How it works:</strong></p>
                 <ol className="list-decimal pl-5 space-y-3 mt-4">
                    <li>The EOR has its own legal entities set up in countries all over the world.</li>
                    <li>When you want to hire someone in, for example, France, the EOR hires that person through its French entity.</li>
                    <li>The worker is legally an employee of the EOR, but they work exclusively for you, under your direction.</li>
                    <li>You pay the EOR a single monthly invoice that covers the employee's salary, all required employer taxes and social contributions, and the EOR's service fee.</li>
                    <li>The EOR then handles the entire local payroll process, ensuring the employee is paid correctly and on time, and that all local laws are met.</li>
                </ol>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Power of EOR</h3>
                 <p className="text-gray-700">
                   Using an EOR allows you to hire top talent from anywhere in the world in days, not months, without the immense legal and administrative burden of setting up foreign entities. It abstracts away the complexity of global payroll, allowing you to focus on building your team and your business.
                </p>
                 <p className="text-gray-700 mt-4">
                  While YourLegal provides deep in-house payroll services for the US, for all other jurisdictions we partner with leading global EOR providers. We can help you find the right EOR partner and integrate their services into your overall financial strategy.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
