
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
  const countryName = "Saudi Arabia";
  const primaryKeyword = "Bookkeeping services Saudi Arabia";

  const aiBlocks = [
    { title: "What is bookkeeping in Saudi Arabia?", content: "Bookkeeping in KSA is the daily recording of financial transactions in compliance with ZATCA's e-invoicing (Fatoorah) requirements, forming the basis for VAT returns and annual financial statements." },
    { title: "Who needs it?", content: "Every company registered in Saudi Arabia is legally required to maintain proper bookkeeping records to comply with tax and corporate laws." },
    { title: "Cost range?", content: "Monthly bookkeeping services in KSA typically range from SAR 1,500 to SAR 4,000 for small businesses, depending on the volume of transactions." },
    { title: "DIY vs outsourcing?", content: "DIY bookkeeping often leads to non-compliance with the strict ZATCA e-invoicing format and errors in VAT calculations. Outsourcing is essential for accuracy." },
    { title: "Final decision summary", content: "To ensure compliance with KSA's mandatory record-keeping and e-invoicing laws, and to have accurate data for tax filing, outsourcing your bookkeeping is the most efficient and reliable choice." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/saudi-arabia" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Saudi Arabia Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              ZATCA-compliant bookkeeping to manage your transactions and prepare for VAT, Zakat, and Tax filings in the Kingdom.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in Saudi Arabia are essential for startups, small businesses, and foreign-owned LLCs that need to maintain accurate financial records in compliance with the Kingdom's strict regulations. This service is designed for founders who want to ensure every transaction is recorded correctly, especially in accordance with the ZATCA e-invoicing (Fatoorah) system, without the administrative headache.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under Saudi law, bookkeeping is mandatory from the first day of business. It is the foundation of all financial reporting and is legally necessary for generating ZATCA-compliant e-invoices, filing quarterly VAT returns, and preparing your annual Zakat/Tax declaration. Without proper bookkeeping, your business is non-compliant and at high risk of penalties.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Saudi Arabia">
                <p>Professional bookkeeping is a cost-effective solution in the KSA. Our monthly packages are designed to scale with your business:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Startups / Low Volume:** SAR 1,500 – SAR 2,500 per month.</li>
                    <li>**Growing Businesses / Moderate Volume:** SAR 2,500 – SAR 5,000 per month.</li>
                </ul>
                <p className="mt-4">This investment saves founder time, ensures compliance with complex e-invoicing rules, and prevents costly errors in tax filings.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Neglecting or performing incorrect bookkeeping in Saudi Arabia has direct and severe consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**E-invoicing (Fatoorah) Penalties:** Failure to issue invoices in the correct XML format can lead to significant fines from ZATCA.</li>
                    <li>**Inaccurate VAT Filings:** Poor bookkeeping leads to incorrect VAT returns, triggering audits and financial penalties.</li>
                    <li>**Cash Flow Confusion:** Without a clear, real-time view of your finances, you cannot effectively manage cash flow, which is critical for any business.</li>
                    <li>**Increased Audit & Accounting Fees:** Messy books will result in higher fees from your auditor and tax advisor, who must spend extra time cleaning up the records before they can perform their work.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal ensures your financial transactions are recorded accurately by professionals who understand Saudi regulations. We use ZATCA-approved, cloud-based software to manage your books and ensure compliance with the e-invoicing system. This guarantees that your data is always clean, reconciled, and ready for your tax advisor and auditor. By letting us handle the books, you free up your time to focus on growing your business in the Kingdom. It is the essential first step towards a robust <Link href="/saudi-arabia/accounting" className="text-blue-600 hover:underline">accounting</Link> system.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
