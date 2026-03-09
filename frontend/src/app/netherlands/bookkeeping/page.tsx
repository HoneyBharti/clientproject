
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
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
  const countryName = "Netherlands";
  const primaryKeyword = "Bookkeeping services Netherlands";

  const aiBlocks = [
    { title: "What is bookkeeping in the Netherlands?", content: "Bookkeeping for a Dutch B.V. is the daily recording of all financial transactions in a way that is compliant with Dutch law and prepares the data needed for BTW (VAT) and corporate tax returns." },
    { title: "Who needs it?", content: "Every Dutch company is legally required to maintain a complete and accurate administration of its finances. It is essential for all businesses, regardless of size." },
    { title: "Cost range?", content: "Monthly bookkeeping services for a small Dutch B.V. typically cost between €100 and €400, depending on the volume and complexity of transactions." },
    { title: "DIY vs outsourcing?", content: "While possible for very simple businesses, DIY bookkeeping often leads to errors in BTW (VAT) calculations and end-of-year accounts. Outsourcing ensures professional accuracy and compliance." },
    { title: "Final decision summary", content: "To ensure your Dutch B.V. has accurate financial records for tax filing and decision-making, outsourcing bookkeeping is the most efficient and reliable solution." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/netherlands" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Netherlands Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in the {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Reliable, compliant bookkeeping for your Dutch B.V. We keep your financials organised and ready for BTW and corporate tax filings.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in the Netherlands are for any Dutch B.V. that needs accurate and organised financial records. This service is ideal for startups, e-commerce businesses, and consulting firms who want to ensure their daily transactions are recorded correctly, making tax time simple and stress-free. It's built for founders who want to focus on their business, not on tedious data entry.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under Dutch law, every business is required to keep accurate financial records from its first day of operation. Proper bookkeeping is the foundation for your BTW (VAT) returns, your annual corporate income tax (VPB) return, and the preparation of your annual accounts for the KVK. It is a non-negotiable legal requirement.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in the Netherlands">
                <p>Outsourcing your bookkeeping is an affordable way to ensure professional financial management. Monthly costs for bookkeeping services in the Netherlands depend on your company's transaction volume:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Low Volume / Startups:** €100 – €250 per month.</li>
                    <li>**Medium Volume / Growing Businesses:** €250 – €500 per month.</li>
                </ul>
                <p className="mt-4">This service provides a clear financial overview and ensures compliance, delivering value far beyond its cost.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Inadequate bookkeeping in the Netherlands creates significant compliance and financial risks:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Incorrect BTW (VAT) Returns:** Leading to penalties and interest charges from the Belastingdienst (tax authority).</li>
                    <li>**Inaccurate Annual Accounts:** This can cause issues with your KVK filing and may lead to director liability.</li>
                    <li>**Flawed Financial Data:** Making critical business decisions based on incorrect or out-of-date financial information.</li>
                    <li>**Increased Accounting Costs:** Your accountant will charge significantly more at year-end to clean up messy or incomplete books.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal ensures your financial records are always accurate, up-to-date, and compliant with Dutch standards. We use modern cloud software to streamline the process, giving you real-time visibility into your finances. By having professionals manage your books daily, you ensure that the data is clean and ready for your periodic BTW returns and annual financial statements. This saves you administrative headaches, reduces year-end accounting fees, and provides the reliable data you need to run your business effectively. It's the essential first step for our complete <Link href="/netherlands/accounting" className="text-blue-600 hover:underline">accounting service</Link>.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

