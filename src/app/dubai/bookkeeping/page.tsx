
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
  const countryName = "Dubai (UAE)";
  const primaryKeyword = "Bookkeeping services Dubai";

  const aiBlocks = [
    { title: "What is bookkeeping in the UAE?", content: "Bookkeeping in the UAE is the daily recording of all your company's financial transactions, such as sales, purchases, payments, and receipts, in a manner compliant with FTA regulations for VAT and Corporate Tax." },
    { title: "Who needs it?", content: "Every company registered in the UAE, whether in a Free Zone or on the Mainland, is legally required to maintain proper bookkeeping records." },
    { title: "Cost range?", content: "Monthly bookkeeping services in the UAE typically range from AED 1,000 to AED 2,500 for small businesses, depending on the volume of transactions." },
    { title: "DIY vs outsourcing?", content: "DIY bookkeeping often leads to errors, missed deadlines, and non-compliance with VAT rules. Outsourcing to a professional firm ensures your books are accurate and tax-ready." },
    { title: "Final decision summary", content: "To ensure compliance with UAE's mandatory record-keeping laws and to have accurate data for tax filing, outsourcing your bookkeeping is the most efficient and reliable choice." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/dubai" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dubai Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate, compliant, and timely bookkeeping for your UAE business. We keep your financials organized and ready for VAT and Corporate Tax filings.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in Dubai are essential for startups, small businesses, and e-commerce operators who need to maintain accurate financial records to comply with UAE law. This service is designed for founders who want to eliminate the administrative burden of daily transaction management and ensure their financial data is always accurate and up-to-date.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under the UAE Commercial Companies Law, bookkeeping is mandatory from the first day of business. It is the fundamental basis for all your financial reporting, VAT returns, Corporate Tax filings, and annual audits. Without proper bookkeeping, your business is non-compliant and at risk of significant penalties from the Federal Tax Authority (FTA).</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Dubai (UAE)">
                <p>Professional bookkeeping is a highly cost-effective solution for businesses in the UAE. Our monthly packages are designed to scale with your transaction volume:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Startups / Low Volume:** AED 1,000 – AED 1,800 per month.</li>
                    <li>**Growing Businesses / Moderate Volume:** AED 1,800 – AED 3,000 per month.</li>
                </ul>
                <p className="mt-4">This investment saves valuable time and prevents costly errors, providing a clear return by ensuring tax efficiency and compliance.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Neglecting or performing incorrect bookkeeping in the UAE has direct and severe consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**FTA Penalties:** The FTA can impose fines for failure to maintain proper records as required for VAT and Corporate Tax.</li>
                    <li>**Inaccurate Tax Filings:** Garbage in, garbage out. Poor bookkeeping leads to incorrect tax returns, triggering audits and financial penalties.</li>
                    <li>**Cash Flow Confusion:** Without a clear, real-time view of your income and expenses, you cannot effectively manage your cash flow, which can be fatal for a small business.</li>
                    <li>**Inability to get Audited:** An auditor cannot issue a clean report on messy books, which can prevent your company from renewing its trade license.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal ensures that your financial transactions are recorded accurately and reconciled regularly by professionals. We use cloud-based accounting software to provide you with 24/7 access to your financial data. Our process ensures that your records are always compliant with FTA requirements, making VAT and Corporate Tax filing a seamless process. By letting us handle the books, you free up your time to focus on what you do best: growing your business. It is the essential first step towards a robust <Link href="/dubai/accounting" className="text-blue-600 hover:underline">accounting</Link> system.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
