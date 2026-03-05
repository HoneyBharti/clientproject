
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


export default function AccountingServicePage() {
  const serviceName = "Accounting";
  const countryName = "India";
  const primaryKeyword = "Accounting services in India";

  const aiBlocks = [
    { title: "What is accounting in India?", content: "Accounting in India involves preparing financial statements compliant with Ind AS (Indian Accounting Standards), preparing for statutory audits, and managing corporate tax obligations with the Income Tax Department." },
    { title: "Who needs it?", content: "Every registered Private Limited company in India is legally required to have its accounts prepared and audited annually for filing with the Ministry of Corporate Affairs (MCA) and the tax authorities." },
    { title: "Cost range?", content: "An annual package for preparing financial statements and filing the tax return typically costs ₹25,000 to ₹1,00,000+ for a standard small company. This excludes monthly bookkeeping and audit fees." },
    { title: "DIY vs outsourcing?", content: "DIY is not possible. Preparing statutory accounts requires a qualified Chartered Accountant who understands Ind AS and Indian tax law. Outsourcing is mandatory." },
    { title: "Final decision summary", content: "To meet mandatory MCA and tax filing obligations and to avoid director liability for incorrect accounts, outsourcing your accounting in India is an essential legal requirement." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/in" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to India Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Professional accounting to keep your Indian business compliant with the MCA, Income Tax Department, and Ind AS standards.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in India are for every Private Limited Company, especially those with foreign investment, that must meet the statutory requirement of preparing and filing annual financial statements. This service is crucial for startups, SMEs, and established businesses that require accurate, compliant financial reporting for the Ministry of Corporate Affairs (MCA), the Income Tax Department, and for their stakeholders (investors, lenders, etc.).</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Formal accounting is a mandatory annual process. Your company's first financial statements must be prepared at the end of its first financial year (which runs from April 1st to March 31st). These statements must be audited by a Chartered Accountant and then filed with the MCA within 30 days of the company's Annual General Meeting (AGM). These same audited accounts form the basis of your annual corporate tax return. This entire process must be completed annually.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in India">
                <p>Professional accounting services are typically provided as a year-end package, ensuring full compliance with all statutory requirements.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Annual Compliance Package (Financial Statements & Tax Return):** ₹25,000 – ₹1,00,000+ for a standard small business. The price varies based on transaction volume and complexity.</li>
                    <li>**Statutory Audit Fees:** These are separate from the accounting fees and can range from ₹20,000 to ₹1,00,000+, depending on the scale of operations.</li>
                    <li>**Monthly Bookkeeping:** The foundation for year-end accounting. This is a separate service.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>The consequences of failing to meet Indian accounting standards or filing deadlines are severe:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**MCA Penalties:** The MCA imposes heavy, daily-accruing penalties for late filing of annual returns (Form AOC-4 and MGT-7).</li>
                    <li>**Director Disqualification:** Directors of a company that fails to file its annual returns for three consecutive years can be disqualified from being a director in any company for five years.</li>
                    <li>**Tax Penalties:** The Income Tax Department imposes penalties for late or incorrect filing of tax returns, including interest on any unpaid tax.</li>
                    <li>**Inability to Secure Funding:** No investor or lender will engage with a company that is not fully compliant with its statutory accounting and filing obligations.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your Indian accounting is the only practical approach. The preparation of financial statements as per Indian Accounting Standards (Ind AS) and navigating the Companies Act requires a qualified Chartered Accountant. Attempting to manage this in-house is not feasible for most businesses and carries enormous risk.</p>
                <p className="mt-4">YourLegal provides a seamless and cost-effective accounting service. Our qualified Indian CAs work directly from the data in your <Link href="/in/bookkeeping" className="text-blue-600 hover:underline">bookkeeping</Link> records to prepare your annual financial statements and tax returns. We coordinate with statutory auditors and ensure all filings are accurate and submitted on time. This protects you and your company from penalties and legal risk, allowing you to operate with confidence in the Indian market.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />

          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
