
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
  const countryName = "Saudi Arabia";
  const primaryKeyword = "Accounting services in Saudi Arabia";

  const aiBlocks = [
    { title: "What is accounting in Saudi Arabia?", content: "Accounting in KSA involves maintaining financial records compliant with SOCPA standards (which are based on IFRS), preparing for annual audits, and managing Zakat/Corporate Tax obligations with ZATCA." },
    { title: "Who needs it?", content: "Every business operating in Saudi Arabia, especially foreign-invested LLCs, is legally required to maintain proper accounting records and often must submit audited financial statements for license renewals." },
    { title: "Cost range?", content: "Typically SAR 2,500 to SAR 7,000 per month, depending on transaction volume and complexity. Annual audit fees are separate and can range from SAR 15,000+." },
    { title: "DIY vs outsourcing?", content: "Given the strict ZATCA e-invoicing rules and SOCPA standards, DIY accounting is extremely high-risk. Outsourcing to a licensed local firm is essential for compliance." },
    { title: "Final decision summary", content: "To navigate KSA's Zakat/tax laws and mandatory audit requirements, outsourcing accounting to a professional firm is a fundamental requirement, not a choice." }
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
              SOCPA-compliant and ZATCA-ready accounting to navigate Corporate Tax, Zakat, and audit requirements in the Kingdom.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in Saudi Arabia are for any Limited Liability Company (LLC), particularly those with foreign investment, that needs to ensure full compliance with the financial regulations of the Kingdom. This is critical for businesses needing to file annual Zakat & Tax returns, adhere to ZATCA's e-invoicing requirements, and prepare mandatory audited financial statements for MISA license renewal. It is designed for founders who need reliable financial data for decision-making and absolute peace of mind on compliance in a strict regulatory environment.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under Saudi law, maintaining proper accounting records is mandatory from the day of incorporation. Professional accounting becomes non-negotiable when preparing the annual financial statements, which must be audited by a licensed Saudi auditor. These audited financials are required for filing the annual tax/Zakat declaration with ZATCA and are often a prerequisite for renewing your MISA investment license.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Saudi Arabia">
                <p>Outsourcing your accounting provides access to professional expertise at a predictable monthly cost, which is far lower than hiring an in-house Saudi finance manager. Typical costs in KSA are:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Small Businesses / Low Transaction Volume:** SAR 2,500 – SAR 5,000 per month.</li>
                    <li>**Growing Companies or those requiring regular reporting:** SAR 5,000 – SAR 10,000 per month.</li>
                    <li>**Annual Audit Fees:** These are separate from monthly accounting and typically range from SAR 15,000 to SAR 40,000+, depending on the complexity of the business.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Improper accounting in Saudi Arabia can lead to severe financial and operational consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**ZATCA Penalties:** The Zakat, Tax and Customs Authority imposes significant fines for incorrect or late Zakat/Tax declarations and VAT filings.</li>
                    <li>**Failed Audits & MISA Issues:** Inaccurate books will lead to a qualified audit report. MISA may refuse to renew your investment license without a clean, unqualified audit report.</li>
                    <li>**Inability to Renew CR:** The Ministry of Commerce may block the renewal of your Commercial Registration (CR) if your company is not in good standing with ZATCA.</li>
                    <li>**Bank Account Difficulties:** Banks may require audited financials to maintain corporate accounts or provide financing.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your accounting to YourLegal is the most effective way to navigate the KSA's complex regulatory landscape. Our team of qualified accountants ensures your books are compliant with the standards set by the Saudi Organization for Chartered and Professional Accountants (SOCPA) and are always ready for your annual audit. We manage your Zakat/Tax obligations, protecting you from ZATCA penalties. By handling the financial complexities, we provide the clarity and confidence you need to run your business, make strategic decisions, and satisfy all legal requirements without the significant cost and burden of an in-house finance department. This service is a foundational element that works with our <Link href="/saudi-arabia/tax-compliance" className="text-blue-600 hover:underline">tax compliance solutions</Link>.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
