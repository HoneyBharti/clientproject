
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

export default function AnnualComplianceServicePage() {
  const serviceName = "Annual Compliance";
  const countryName = "United Kingdom";
  const primaryKeyword = "UK company annual compliance";

  const aiBlocks = [
    { title: "What is Annual Compliance in the UK?", content: "Annual compliance for a UK company involves filing a Confirmation Statement with Companies House and submitting annual accounts. These filings confirm the company's details are correct and report its financial activity." },
    { title: "Who needs it?", content: "Every registered UK Limited Company must complete these annual filings to remain legally compliant and active on the register." },
    { title: "Cost range?", content: "Costs typically include a small government filing fee for the Confirmation Statement (£34+) plus professional fees for preparing and filing the accounts and statement, often bundled into an annual plan." },
    { title: "DIY vs outsourcing?", content: "While DIY is possible, errors in accounts or missed deadlines lead to automatic penalties. Outsourcing ensures accuracy and timeliness, which is critical for non-resident directors." },
    { title: "Final decision summary", content: "Outsourcing UK annual compliance is a cost-effective way to ensure your company meets all legal requirements with Companies House and HMRC, avoiding fines and potential dissolution." }
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
              Automated Companies House filings to keep your UK company compliant and in good standing.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for all UK Limited Companies, particularly those managed by non-resident directors. It ensures that mandatory annual filings with Companies House and HMRC (His Majesty's Revenue and Customs) are handled correctly and on time, maintaining the company's legal status.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>UK annual compliance consists of two main parts: the Confirmation Statement, which must be filed at least once every 12 months, and the Annual Accounts, which must be filed within 9 months of the company's financial year-end. Our service tracks and manages both deadlines.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                 <p>The cost includes government fees and our professional service fee for preparation and filing.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Companies House Fee:** The Confirmation Statement fee is currently around £34 when filed online.</li>
                    <li>**Service Fees:** Our annual compliance services are bundled into our cost-effective plans, covering both the Confirmation Statement and the preparation of annual accounts.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Failing to file your annual compliance on time results in automatic penalties from Companies House, which increase the longer they are overdue. Persistent failure can lead to the company being "struck off" the register and dissolved, and directors may face prosecution.</p>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your UK annual compliance to YourLegal provides complete peace of mind. We manage the deadlines, prepare the statutory accounts from your bookkeeping data, and handle all filings with Companies House and HMRC, ensuring you avoid penalties and maintain a compliant UK entity.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
