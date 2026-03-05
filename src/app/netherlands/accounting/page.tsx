
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
  const countryName = "Netherlands";
  const primaryKeyword = "Accounting services in Netherlands";

  const aiBlocks = [
    { title: "What is accounting in the Netherlands?", content: "Accounting for a Dutch B.V. involves maintaining financial records according to Dutch GAAP, preparing annual accounts for filing with the KVK (Chamber of Commerce), and managing BTW (VAT) and corporate income tax (VPB) compliance." },
    { title: "Who needs it?", content: "Every registered Dutch B.V. is legally required to have compliant accounting for tax filings, annual reporting, and financial management, regardless of its size or activity level." },
    { title: "Cost range?", content: "Typically €800 to €2,500+ annually for a small B.V., covering annual accounts and tax returns. Monthly services for ongoing bookkeeping are separate." },
    { title: "DIY vs outsourcing?", content: "DIY is not feasible due to the complexities of Dutch GAAP and tax law. Outsourcing to a Dutch accounting professional is standard practice to ensure compliance and accuracy." },
    { title: "Final decision summary", content: "To meet mandatory KVK and tax filing obligations and avoid penalties, outsourcing your accounting in the Netherlands is the only reliable and professional choice." }
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
              Professional accounting for your Dutch B.V. We ensure compliance with Dutch GAAP, KVK filing requirements, and the Belastingdienst (tax authority).
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in the Netherlands are essential for any business operating through a Dutch B.V., including startups, international holding companies, and EU-focused trading or service businesses. It is designed for founders who need to ensure their company meets all statutory financial reporting and tax obligations in the Netherlands, providing peace of mind and a solid foundation for growth.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Formal accounting is required from the moment your Dutch B.V. is incorporated. It is a legal necessity for preparing the annual financial statements (jaarrekening) that must be filed with the Chamber of Commerce (KVK). Furthermore, accurate accounts are the basis for all tax filings, including the periodic BTW (VAT) returns and the annual corporate income tax (VPB) return filed with the Belastingdienst.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in the Netherlands">
                <p>The cost of professional accounting services in the Netherlands is competitive and offers clear value by ensuring compliance. Pricing is often based on annual packages or monthly retainers:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Annual Compliance Package (Accounts & Tax Return):** €800 – €2,500+ for a standard small B.V.</li>
                    <li>**Monthly Accounting Retainer (including bookkeeping & BTW):** €150 – €500 per month, depending on transaction volume.</li>
                </ul>
                <p className="mt-4">YourLegal bundles these services to provide a cost-effective, all-in-one financial solution.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Failure to adhere to Dutch accounting and tax regulations can lead to significant penalties and legal issues:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Late Filing Penalties:** Both the KVK and the Belastingdienst impose fines for missing deadlines for annual accounts and tax returns.</li>
                    <li>**Director Liability:** In the event of bankruptcy, directors can be held personally liable if the company's annual accounts were not filed correctly and on time. This is a major risk.</li>
                    <li>**Incorrect Tax Assessments:** Poor accounting can lead to incorrect tax filings, resulting in audits, back-taxes, and interest charges from the Belastingdienst.</li>
                    <li>**Reputational Damage:** Failure to file publicly available accounts with the KVK can damage your company's reputation with banks, suppliers, and potential partners.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your Dutch accounting is the standard and most prudent approach. The intricacies of Dutch GAAP, coupled with specific tax laws like the 30% ruling and participation exemption, require specialized local knowledge. YourLegal connects you with qualified Dutch accountants who ensure your financial statements are accurate, compliant, and filed on time. This eliminates the risk of penalties and director liability. It provides a professional financial function for your European operations without the high cost of hiring an in-house team, and integrates seamlessly with our <Link href="/netherlands/bookkeeping" className="text-blue-600 hover:underline">bookkeeping services</Link>.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />

          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
