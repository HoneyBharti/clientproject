'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckSquare, FileText, Landmark, Banknote, Users } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "To set up US payroll, a business must: 1) Obtain Federal and State tax IDs; 2) Choose a payroll provider; 3) Select a pay schedule; 4) Gather employee information (W-4, I-9, direct deposit); 5) Onboard employees onto the payroll system; and 6) Run the first payroll and confirm tax deposits are made. Outsourcing to a provider like Gusto is standard practice." },
        { title: "Direct Question Answer", content: "What is this about? A step-by-step checklist for new employers setting up a compliant payroll system in the USA for the first time. Who is it for? Founders, small business owners, and HR managers hiring their first W-2 employee. When is it relevant? Before the first hire starts, as registration and setup must be completed before the first payday." },
        { title: "Decision Summary", content: "Who should act? Any business hiring W-2 employees in the US must follow this checklist. Who can ignore? Businesses exclusively using 1099 independent contractors do not set up payroll, but they have separate reporting requirements." }
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

const ChecklistItem = ({ title, icon, children }) => (
  <div className="flex items-start mb-6">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full mr-4 mt-1">
        {React.createElement(icon, { className: 'w-5 h-5' })}
    </div>
    <div>
        <h4 className="font-bold text-xl text-gray-800">{title}</h4>
        <p className="text-gray-600 mt-1">{children}</p>
    </div>
  </div>
);


export default function PayrollSetupChecklistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The US Payroll Setup Checklist: A Step-by-Step Guide for Founders",
    "description": "An essential checklist for new employers on how to set up a compliant US payroll system, from obtaining tax IDs to running your first payroll.",
    "author": { "@type": "Organization", "name": "YourLegal AI" },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/us-payroll-setup-checklist.jpg",
    "publisher": { "@type": "Organization", "name": "YourLegal AI", "logo": { "@type": "ImageObject", "url": "https://www.yourlegal.ai/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.yourlegal.ai/blog/us-payroll-setup-checklist" },
    "keywords": "payroll setup checklist usa, how to set up payroll for small business, new employer payroll checklist, small business payroll guide, payroll compliance"
  };

  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog/us-payroll-guide" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Payroll Guide
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Payroll Guide</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The US Payroll Setup Checklist: A Step-by-Step Guide
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hiring your first US employee is exciting. Setting up payroll can be intimidating. This checklist breaks down the process into clear, manageable steps.
            </p>
          </header>

          <article>
            <AiAnswerBlock />
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed my-12">
              Setting up payroll for the first time is a major milestone that officially turns your startup into an employer. It's also a process that must be done correctly to avoid significant legal and tax penalties down the road. While using a professional payroll provider is a must, you still need to complete several foundational steps to get started.
            </p>
             <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              This checklist outlines the critical steps every US company must take before running its first payroll.
            </p>

            <BlogSection title="Your 6-Step Payroll Setup Checklist" icon={CheckSquare}>
                <ChecklistItem title="Step 1: Obtain Your Tax Identification Numbers" icon={Landmark}>
                  You cannot run payroll without being registered as an employer. This requires two key numbers:
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Federal Employer Identification Number (EIN):</strong> If you don't already have one from forming your company, you must obtain one from the IRS. It's the master ID for all federal tax purposes.</li>
                        <li><strong>State Payroll Tax IDs:</strong> You must register with the tax department of the state where your employee works. This will give you state-level account numbers for withholding and unemployment taxes.</li>
                    </ul>
                </ChecklistItem>
                
                <ChecklistItem title="Step 2: Choose a Payroll Provider" icon={Users}>
                    Do not attempt to do payroll manually. The risk of error is too high. Choose a reputable payroll provider like Gusto, Rippling, or ADP. They will handle all tax calculations, payments, and filings. YourLegal's <Link href="/usa/payroll" className="text-blue-600 hover:underline">payroll service</Link> helps you get set up with these leading providers.
                </ChecklistItem>

                <ChecklistItem title="Step 3: Select a Pay Schedule" icon={FileText}>
                    Decide how often you will pay your employees. Common schedules in the US are:
                     <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Weekly:</strong> 52 pay periods per year.</li>
                        <li><strong>Bi-weekly (every two weeks):</strong> 26 pay periods per year. This is the most common schedule.</li>
                        <li><strong>Semi-monthly (twice a month, e.g., 15th and last day):</strong> 24 pay periods per year.</li>
                        <li><strong>Monthly:</strong> 12 pay periods per year.</li>
                    </ul>
                    Your state may have laws dictating the minimum pay frequency.
                </ChecklistItem>

                <ChecklistItem title="Step 4: Gather Employee Information" icon={FileText}>
                    For each new W-2 employee, you must collect the following before their first payday:
                     <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Form W-4:</strong> This form tells you the employee's tax filing status and how much federal income tax to withhold.</li>
                        <li><strong>Form I-9:</strong> This form verifies the employee's identity and eligibility to work in the US. You must physically or virtually inspect their identification documents.</li>
                        <li><strong>Bank Account Details:</strong> For setting up direct deposit.</li>
                        <li><strong>State-Specific Forms:</strong> Some states have their own withholding allowance certificates.</li>
                    </ul>
                </ChecklistItem>
                
                <ChecklistItem title="Step 5: Onboard Employees into Your Payroll System" icon={Banknote}>
                   Enter all the information from Step 4 into your chosen payroll provider's system. This includes the employee's name, address, Social Security Number, salary or hourly rate, and tax withholding details from their W-4. Double-check everything for accuracy.
                </ChecklistItem>
                
                <ChecklistItem title="Step 6: Run Your First Payroll" icon={CheckSquare}>
                   Once everything is set up, you are ready to run your first payroll. Your payroll provider will automatically:
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li>Calculate gross pay, all tax withholdings, and net pay.</li>
                        <li>Initiate direct deposits to your employees.</li>
                        <li>Set aside the withheld taxes and your employer-side taxes for payment to the government.</li>
                    </ul>
                    After running payroll, verify in your provider's dashboard that the tax deposits to the IRS and state agencies have been scheduled.
                </ChecklistItem>
            </BlogSection>
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Congratulations, You're an Employer!</h3>
                <p className="text-gray-700">
                   Following this checklist ensures your payroll system is built on a compliant foundation. By partnering with a professional provider, you can be confident that you are meeting your legal and tax obligations, allowing you to focus on leading your growing team.
                </p>
            </div>
          </article>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
