
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

export default function AnnualComplianceServicePage() {
  const serviceName = "Annual Compliance";
  const countryName = "Netherlands";
  const primaryKeyword = "Netherlands company annual compliance";

  const aiBlocks = [
    { title: "What is Annual Compliance in the Netherlands?", content: "Annual compliance for a Dutch B.V. involves filing the company's annual accounts with the Chamber of Commerce (KVK) and filing the annual corporate income tax return with the Dutch Tax and Customs Administration (Belastingdienst)." },
    { title: "Who needs it?", content: "Every registered Dutch B.V. is legally required to prepare and file annual accounts and a tax return, regardless of its level of activity." },
    { title: "Cost range?", content: "Professional fees for preparing and filing annual accounts and the tax return typically range from €800 to €2,500+, depending on the complexity of the company's financials." },
    { title: "DIY vs outsourcing?", content: "DIY is not recommended. The filings must comply with Dutch GAAP and tax law, requiring professional accounting expertise. Outsourcing ensures accuracy and compliance." },
    { title: "Final decision summary", content: "To ensure your Dutch B.V. meets its legal obligations with the KVK and Belastingdienst and to avoid penalties, outsourcing annual compliance to a professional firm is essential." }
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
              Reliable KVK and tax filings to keep your Dutch B.V. compliant and in good standing.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for all Dutch B.V. companies. It ensures that the mandatory annual financial statements (jaarrekening) are prepared correctly according to Dutch GAAP and filed with the Chamber of Commerce (KVK), and that the corporate income tax return is filed with the Dutch tax authorities (Belastingdienst).</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Annual accounts must be prepared within 5 months of the financial year-end and filed with the KVK within 12 months. The corporate income tax return must generally be filed within 5 months of the financial year-end, though extensions are often possible.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>The costs for annual compliance are for professional services to prepare the required documents:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Annual Accounts Preparation & Filing:** €600 – €1,500 for a typical small B.V.</li>
                    <li>**Corporate Income Tax Return:** €400 – €1,000.</li>
                    <li>**Bundled Packages:** Most providers, including YourLegal, offer a combined package for greater efficiency.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Failure to meet annual filing deadlines can result in:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Fines:** The Belastingdienst can issue fines for late tax filings, and the KVK can penalize late filing of annual accounts.</li>
                    <li>**Director Liability:** In case of bankruptcy, directors can be held personally liable if annual accounts were not filed correctly and on time.</li>
                    <li>**Reputational Damage:** Public records at the KVK will show the company is non-compliant, which can harm relationships with banks, suppliers, and customers.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Dutch accounting standards and tax laws are specific and require local expertise. Outsourcing to YourLegal ensures your financial statements are prepared correctly by qualified accountants and that all KVK and tax deadlines are met. This protects the company and its directors from financial penalties and legal liability.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

