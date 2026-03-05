
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';

const AiAnswerBlock = ({ blocks }) => (
    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-6">
            {blocks.map((block, index) => (
                <div key={index}>
                    <h4 className="font-semibold text-gray-700">{block.title}</h4>
                    <p className="text-gray-600">{block.content}</p>
                </div>
            ))}
        </div>
    </div>
);

const ContentSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="prose max-w-none text-gray-600">
            {children}
        </div>
    </div>
);

export default function BookkeepingServicePage() {
  const serviceName = "Bookkeeping";
  const countryName = "United Kingdom";
  const primaryKeyword = "Bookkeeping services UK";

  const aiBlocks = [
    { title: "What is bookkeeping in the UK?", content: "Bookkeeping in the UK is the daily process of recording financial transactions (invoices, receipts, payments) in a way that is compliant with Making Tax Digital (MTD) rules for VAT and provides the data for year-end accounts." },
    { title: "Who needs it?", content: "Every UK company is legally required to keep accurate and complete financial records. It is the foundation for all tax and corporate filings." },
    { title: "Cost range?", content: "Monthly bookkeeping for a small UK business typically costs between £150 and £500, depending on the number of transactions and complexity." },
    { title: "DIY vs outsourcing?", content: "DIY bookkeeping is time-consuming and often leads to errors in VAT returns and expensive clean-up work by accountants at year-end. Outsourcing is more efficient and ensures accuracy." },
    { title: "Final decision summary", content: "For accurate financials, compliant VAT returns, and a stress-free year-end, outsourcing your UK bookkeeping is the most efficient and reliable business decision." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/uk" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to UK Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in the {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate, MTD-compliant bookkeeping for your UK business. We keep your financials organised and ready for your VAT and Corporation Tax filings.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in the UK are perfect for startups, small businesses, e-commerce brands, and consulting firms that need reliable and accurate financial records but lack the time or expertise to manage them in-house. This service is designed for founders who want to focus on growing their business, secure in the knowledge that their financial data is being handled professionally and is compliant with HMRC's Making Tax Digital (MTD) requirements.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under UK law, every limited company is required to keep accurate accounting records from the day it is incorporated. Bookkeeping is the fundamental process that enables all other financial compliance. It is required for filing your quarterly VAT returns, preparing your annual statutory accounts for Companies House, and calculating your profit for your annual Corporation Tax return to HMRC. Without it, you cannot meet your legal obligations.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in the UK">
                <p>Professional bookkeeping is a highly cost-effective solution for businesses in the UK. Our monthly packages are designed to scale with your transaction volume:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Startups / Low Volume:** £150 – £300 per month.</li>
                    <li>**Growing Businesses / E-commerce:** £300 – £600 per month.</li>
                </ul>
                <p className="mt-4">This investment saves valuable founder time and prevents costly errors, providing a clear return by ensuring tax efficiency and smooth year-end filings.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Poor bookkeeping is a common source of business stress and compliance issues. The risks include:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Incorrect VAT Returns:** Leading to penalties from HMRC for underpayment of VAT and complications with Making Tax Digital.</li>
                    <li>**Tax Audit Triggers:** Messy and unreconciled books are a major red flag for HMRC.</li>
                    <li>**Missed Tax Deductions:** Failure to correctly categorise all legitimate business expenses results in a higher Corporation Tax bill.</li>
                    <li>**Increased Year-End Accounting Fees:** If your books are disorganized, your accountant will have to charge a significantly higher fee to clean them up before they can prepare your annual accounts.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal ensures your financials are managed by professionals who understand UK tax law. We use modern, MTD-compliant cloud software (like Xero or QuickBooks) to automate data entry and provide you with real-time insights into your business performance. Our process guarantees that your books are always reconciled, compliant, and ready for your accountant at year-end. This not only saves you countless hours of administrative work but also provides the financial clarity needed to make smart, data-driven decisions. It is the essential first step towards a robust <Link href="/uk/accounting" className="text-blue-600 hover:underline">accounting</Link> service.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
