
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, FileText, Landmark, Building, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "Maintaining 'Good Standing' for a US company means staying up-to-date with all mandatory state-level filings, primarily the Annual Report and the payment of Franchise Tax. Failure to do so results in a loss of good standing, which can prevent the company from opening bank accounts, securing loans, or being sued. Continued non-compliance leads to administrative dissolution by the state." },
        { title: "Direct Question Answer", content: "What is this about? An explanation of what 'Good Standing' means for a US company and the steps required to maintain it. Who is it for? All owners of US LLCs and C-Corps. When is it relevant? Annually, as filings are required every year to maintain this status." },
        { title: "Decision Summary", content: "Who should act? All business owners must prioritize these state-level filings. Who can ignore? No one. Losing good standing can paralyze a company's ability to operate legally and financially." }
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

type BlogSectionProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

const BlogSection = ({ title, icon, children }: BlogSectionProps) => (
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

export default function GoodStandingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Maintaining Good Standing: A Guide for US Business Owners",
    "description": "An essential guide explaining what 'Good Standing' means for a US company, why it's critical, and how to maintain it through timely annual filings.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/maintaining-good-standing.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/maintaining-good-standing-in-us" },
    "keywords": "maintaining good standing, what is a certificate of good standing, us company compliance, state annual report, delaware good standing"
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">State Compliance Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              What is "Good Standing" and Why Does It Matter for Your US Company?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              This critical status, issued by your state of incorporation, is the key to operating your business legally. Losing it can have severe consequences.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              When you form a company in the United States, you create a new legal entity that is authorized to do business by its state of incorporation (e.g., Delaware, Wyoming). However, this authorization is not permanent. To maintain your company's legal status, you must meet certain annual requirements. When you meet these requirements, your company is considered to be in "Good Standing."
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This isn't just a piece of corporate jargon; it's a critical status that directly impacts your ability to operate your business. This guide explains what good standing is, why it's so important, and how to maintain it.
            </p>

            <BlogSection title="What Does 'Good Standing' Mean?" icon={ShieldCheck}>
                <p>A company in good standing is one that is fully compliant with all the regulations of its state of formation. It means you are up-to-date on:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Filing your required <Link href="/blog/annual-reports-and-franchise-taxes" className="text-blue-600 hover:underline">Annual Reports</Link>.</li>
                    <li>Paying your annual <Link href="/blog/annual-reports-and-franchise-taxes" className="text-blue-600 hover:underline">Franchise Taxes</Link> or other state fees.</li>
                    <li>Maintaining a valid Registered Agent in the state.</li>
                </ul>
                <p className="mt-4">If you meet all these obligations, the state considers your company a legally valid entity with the right to conduct business. You can prove this status by requesting a "Certificate of Good Standing" from the Secretary of State.</p>
            </BlogSection>

            <BlogSection title="Why is Good Standing So Important?" icon={AlertTriangle}>
                <p>Losing your good standing status can paralyze your business operations. A company that is not in good standing may be unable to:</p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Open a new business bank account.</strong> Banks will check your company's status with the state before opening an account.</li>
                    <li><strong>Secure a loan or investment.</strong> No lender or investor will provide capital to a company that is not legally compliant.</li>
                    <li><strong>Register to do business in another state.</strong> If you want to expand, other states will require a Certificate of Good Standing from your home state.</li>
                    <li><strong>Bring a lawsuit.</strong> Many states prohibit a company that is not in good standing from using the court system to sue another party.</li>
                    <li><strong>Renew business licenses or permits.</strong></li>
                </ul>
                 <p className="mt-4 font-bold">In short, losing good standing effectively freezes your company's ability to interact with other businesses and government agencies.</p>
            </BlogSection>
            
             <BlogSection title="How Do You Lose Good Standing?" icon={FileText}>
                <p>Losing good standing is almost always the result of a simple administrative failure:</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Forgetting to file your Annual Report by the deadline.</li>
                    <li>Failing to pay your annual Franchise Tax or other state fees on time.</li>
                    <li>Letting your Registered Agent service lapse.</li>
                </ul>
                <p className="mt-4">If you fail to correct the issue after receiving notices from the state, they will eventually move to **administratively dissolve** your company. This is the corporate death penalty, as it dissolves the company and its liability shield, potentially exposing the owners to personal liability for business debts.</p>
            </BlogSection>
            
            <BlogSection title="How to Maintain (or Reinstate) Good Standing" icon={Landmark}>
                <p>The solution is straightforward: **never miss a state filing deadline.**</p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Know your state's specific deadlines for Annual Reports and Franchise Tax.</li>
                    <li>Ensure your Registered Agent service is always active.</li>
                    <li>File and pay on time, every year.</li>
                </ul>
                <p className="mt-4">If you have lost good standing, you can typically get it back through a process called "reinstatement," which involves filing all overdue reports and paying all back fees plus penalties and interest. This can be a costly and time-consuming process.</p>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Easy Way to Stay Compliant</h3>
                <p className="text-gray-700">
                   For busy founders, manually tracking different state deadlines is a recipe for missed filings. This is why a professional compliance service is so valuable.
                </p>
                <p className="text-gray-700 mt-4">
                  Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">Annual Compliance service</Link>, included in our Vitals and Elite plans, is designed to manage these state-level filings automatically, ensuring you never miss a deadline and your company always remains in good standing.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
