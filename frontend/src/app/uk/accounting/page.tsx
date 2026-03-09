
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


export default function AccountingServicePage() {
  const serviceName = "Accounting";
  const countryName = "United Kingdom";
  const primaryKeyword = "Accounting services in UK";

  const aiBlocks = [
    { title: "What is Accounting in the UK?", content: "Accounting in the UK involves preparing annual financial statements compliant with UK GAAP (FRS 102/105) for filing with Companies House, and preparing the accounts needed for the Corporation Tax return (CT600) for HMRC." },
    { title: "Who needs it?", content: "Every UK Limited Company, regardless of size or activity, is legally required to prepare and file statutory accounts each year to maintain compliance." },
    { title: "Cost range?", content: "An annual package for preparing and filing statutory accounts and a tax return typically costs £600 to £2,000 for a standard small business. This excludes monthly bookkeeping." },
    { title: "DIY vs outsourcing?", content: "DIY is not feasible. Preparing statutory accounts requires a qualified accountant who understands UK accounting standards. Outsourcing is standard practice." },
    { title: "Final decision summary", content: "To meet mandatory Companies House and HMRC filing obligations, and to avoid director liability for incorrect accounts, outsourcing your UK accounting is an essential requirement." }
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
              Professional accounting to keep your UK business compliant with Companies House and HMRC, ensuring your statutory accounts are accurate and filed on time.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in the UK are for every Private Limited Company (Ltd). This service is essential for startups, small businesses, and non-resident-owned companies that need to meet their legal obligation to prepare and file annual statutory accounts. It is designed for founders who require assurance that their financial statements are prepared accurately and in compliance with UK Generally Accepted Accounting Practice (UK GAAP), specifically FRS 102 or FRS 105 for small entities.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Formal accounting is a mandatory annual requirement. Your company's first accounts must be delivered to Companies House within 21 months of incorporation. Subsequent annual accounts must be filed within 9 months of your company's financial year-end. These same accounts form the basis of your Corporation Tax return (CT600) which is filed with HMRC. Our service ensures both these critical deadlines are met.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in the UK">
                <p>Professional accounting services in the UK are typically provided as a year-end package, which offers excellent value by ensuring total compliance.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Annual Compliance Package (Accounts & Tax Return):** £600 – £2,000+ for a standard small business. The price depends on the quality of the bookkeeping records and the complexity of the business.</li>
                    <li>**Monthly Accounting Retainers:** Starting from £200 - £500 per month, these packages often include bookkeeping, VAT returns, payroll, and the year-end accounts and tax filing, providing a complete financial solution.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>The consequences of failing to meet UK accounting standards or filing deadlines are serious and automatically enforced:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Late Filing Penalties:** Companies House imposes automatic, escalating penalties for the late filing of annual accounts, starting from £150 and rising to £1,500 or more.</li>
                    <li>**Director Liability:** Directors are personally responsible for ensuring the company's accounts are a 'true and fair' view of its financial position. Filing inaccurate or misleading accounts can lead to investigation and disqualification.</li>
                    <li>**HMRC Investigations:** Inaccurate accounts submitted with your tax return can trigger a tax investigation from HMRC, which can be costly and time-consuming.</li>
                    <li>**Difficulty Securing Finance:** Banks and investors will not provide funding to a company that is not in good standing with Companies House and HMRC.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your UK accounting is the standard for virtually all small and medium-sized businesses. The rules of UK GAAP are complex, and the preparation of statutory accounts requires a qualified accountant. Attempting to do this yourself is not feasible and carries enormous risk.</p>
                <p className="mt-4">YourLegal provides a seamless and cost-effective accounting service. Our qualified UK accountants work directly from the data in your <Link href="/uk/bookkeeping" className="text-blue-600 hover:underline">bookkeeping</Link> software to prepare your annual accounts and tax return. We ensure everything is fully compliant, optimized for tax efficiency, and filed on time, every time. This protects you from penalties and legal risk, allowing you to run your business with confidence.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />

          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

