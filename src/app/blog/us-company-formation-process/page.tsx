
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileText, Edit, Shield, Banknote, UserCheck, CheckCircle, Users, Upload, LayoutGrid } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "The US company formation process involves: 1) Choosing an entity type (LLC/C-Corp) and state (DE/WY); 2) Appointing a Registered Agent; 3) Filing formation documents with the state; 4) Obtaining a Federal Employer Identification Number (EIN) from the IRS; and 5) Drafting internal legal documents like an Operating Agreement or Bylaws." },
        { title: "Direct Question Answer", content: "What is this about? A step-by-step guide to the legal and administrative process of forming a company in the United States. Who is it for? Entrepreneurs, especially non-residents, planning to launch a US business. When is it relevant? Before starting any business operations, as it is the foundational legal step." },
        { title: "Decision Summary", content: "Who should act? Any founder starting a US business must follow this process. Who can ignore? Individuals not planning to formally register a business entity. For everyone else, this process is mandatory for legal operation and liability protection." }
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

const Step = ({ number, title, children, icon }) => (
    <div className="flex items-start mb-8">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-xl mr-4">{number}</div>
        <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                {React.createElement(icon, { className: 'w-6 h-6 mr-3 text-blue-500' })}
                {title}
            </h3>
            <div className="text-gray-600 space-y-3">{children}</div>
        </div>
    </div>
);


export default function CompanyFormationProcessPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The US Company Formation Process: A Step-by-Step Guide",
    "description": "A comprehensive guide for founders on the complete process of forming a US company, from choosing an entity and state to obtaining an EIN and opening a bank account.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-formation-process.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-company-formation-process" },
    "keywords": "us company formation process, how to form a us company, llc formation steps, c-corp incorporation process, us business registration guide"
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
              The US Company Formation Process: A Step-by-Step Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From choosing your entity to opening a bank account, this is the complete roadmap to launching your US business legally and efficiently.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Forming a company in the United States is a gateway to the world's largest economy, but the process can seem daunting, especially for non-residents. It involves multiple steps across different state and federal agencies. Understanding this process is the first step toward a smooth and compliant launch. A service like our <Link href="/usa/company-formation" className="text-blue-600 hover:underline">US Company Formation</Link> package handles all of this for you.
            </p>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This guide breaks down the complete company formation process into six clear, sequential steps.
            </p>

            <BlogSection title="The Formation Roadmap" icon={CheckCircle}>
                <div className="relative border-l-2 border-blue-200 pl-10">
                    <Step number={1} title="Make Key Foundational Decisions" icon={FileText}>
                        <p>Before any paperwork is filed, you must make two critical decisions:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li><strong>Entity Type (LLC vs. C-Corp):</strong> This is the most important choice. A C-Corporation is the standard for startups seeking venture capital. An LLC offers greater tax flexibility and is often preferred by online businesses and solo founders. Dive deep into this in our <Link href="/blog/llc-vs-c-corp" className="text-blue-600 hover:underline">LLC vs. C-Corp comparison</Link>.</li>
                           <li><strong>State of Formation (DE vs. WY):</strong> You don't have to form your company in the state where you live. Delaware is the gold standard for C-Corps, while Wyoming is popular for LLCs due to its low fees and privacy protections. Our guide on <Link href="/blog/delaware-vs-wyoming-incorporation" className="text-blue-600 hover:underline">Delaware vs. Wyoming</Link> can help you decide.</li>
                        </ul>
                    </Step>
                    
                    <Step number={2} title="Appoint a Registered Agent & File Formation Documents" icon={Users}>
                        <p>Once you've made your decisions, the official process begins:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li><strong>Appoint a Registered Agent:</strong> Every US company is legally required to have a Registered Agent with a physical address in the state of formation to receive official legal and state mail. Our service includes your first year of Registered Agent service.</li>
                           <li><strong>File with the State:</strong> We prepare and file your formation document with the Secretary of State. This is called the "Articles of Organization" for an LLC or the "Certificate of Incorporation" for a C-Corp. Once approved, your company legally exists.</li>
                        </ul>
                    </Step>
                    
                    <Step number={3} title="Obtain Your Federal Employer Identification Number (EIN)" icon={Upload}>
                        <p>An EIN is your company's federal tax ID number, like a Social Security Number for a business. It is absolutely essential.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li><strong>Why it's needed:</strong> You need an EIN to open a US business bank account, hire employees, and file your federal taxes.</li>
                           <li><strong>The Process:</strong> We apply for your EIN with the IRS on your behalf. This is a critical service, as the process can be very difficult for non-residents without a US Social Security Number. Read more in our <Link href="/blog/ein-itin-explained" className="text-blue-600 hover:underline">EIN and ITIN guide</Link>.</li>
                        </ul>
                    </Step>

                    <Step number={4} title="Draft and Sign Internal Legal Documents" icon={Edit}>
                        <p>While the state filing creates your company, internal documents govern how it operates. These are critical for legal protection and investor readiness.</p>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li><strong>For LLCs:</strong> The <span className="font-bold">Operating Agreement</span>. This document outlines the ownership percentages, rights, and duties of the members.</li>
                           <li><strong>For C-Corps:</strong> Key documents include <span className="font-bold">Corporate Bylaws</span>, <span className="font-bold">Initial Board Consent</span>, and <span className="font-bold">Founder Stock Purchase Agreements</span>.</li>
                        </ul>
                         <p>Our formation package includes templates for all these crucial post-incorporation documents.</p>
                    </Step>

                     <Step number={5} title="Open a US Business Bank Account" icon={Banknote}>
                        <p>With your approved formation documents and EIN in hand, you can now open a US business bank account. This is a vital step to separate your personal and business finances—a key requirement for maintaining your liability protection.</p>
                        <section className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Banking Support Through Our Partner, Mercury</h3>
                            <div className="text-center">
                                <p className="text-gray-600 text-sm mb-4">
                                    YourLegal partners with Mercury to help eligible businesses access modern business banking services in the United States.
                                </p>
                                <div className="flex justify-center mb-4">
                                    <Image
                                        src="/partners/mercury-logo.svg"
                                        alt="Mercury Bank logo"
                                        width={100}
                                        height={26}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Mercury is a financial technology company, not a bank. Banking services are provided by Mercury’s partner banks. Account approval is subject to Mercury’s internal compliance and risk review processes.
                                </p>
                            </div>
                        </section>
                    </Step>

                     <Step number={6} title="Set Up Your Compliance & Accounting Systems" icon={LayoutGrid}>
                        <p>Congratulations, your company is formed! Now the ongoing management begins. This is where you transition from formation to operation.</p>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                           <li><strong>Annual Compliance:</strong> Ensure you have a system to track and file your state's Annual Report and pay any franchise taxes. Our <Link href="/usa/annual-compliance" className="text-blue-600 hover:underline">annual compliance service</Link> handles this for you.</li>
                           <li><strong>Bookkeeping & Accounting:</strong> Set up your chart of accounts and begin recording all business transactions. Our <Link href="/usa/bookkeeping" className="text-blue-600 hover:underline">bookkeeping service</Link> can automate this.</li>
                           <li><strong>Tax Filings:</strong> Prepare for your annual federal and state tax obligations. Our <Link href="/usa/tax-compliance" className="text-blue-600 hover:underline">tax compliance packages</Link> cover these filings.</li>
                        </ul>
                         <p className="mt-4">Our Vitals and Elite plans bundle all of these post-formation services into one seamless package. Check our <Link href="/usa/pricing" className="text-blue-600 hover:underline">pricing page</Link> for details.</p>
                    </Step>
                </div>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h3>
                <p className="text-gray-700 mb-4">
                    This guide is part of our comprehensive coverage of US business formation. YourLegal provides an all-in-one platform to handle these complex requirements for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/company-formation" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Company Formation Service
                    </Link>
                    <Link href="/usa" className="font-semibold text-gray-600 hover:underline">
                        &rarr; Back to USA Overview
                    </Link>
                </div>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
