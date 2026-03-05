
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
  const countryName = "Dubai (UAE)";
  const primaryKeyword = "Accounting services in Dubai";

  const aiBlocks = [
    { title: "What is accounting in the UAE?", content: "Accounting in the UAE involves maintaining financial records compliant with IFRS, managing VAT, and preparing for the 9% Corporate Tax. For many free zone companies, it also includes preparing audited financial statements for license renewal." },
    { title: "Who needs it?", content: "Every business operating in the UAE, whether Mainland or Free Zone, is legally required to maintain proper accounting records for tax and compliance purposes." },
    { title: "Cost range?", content: "Typically AED 1,500 to AED 5,000 per month, depending on transaction volume, complexity, and whether an annual audit is required." },
    { title: "DIY vs outsourcing?", content: "Given the new Corporate Tax law and mandatory audit requirements in many free zones, DIY accounting is high-risk. Outsourcing to an FTA-approved firm is the standard for ensuring compliance." },
    { title: "Final decision summary", content: "To navigate the UAE's VAT, Corporate Tax, and audit requirements effectively, outsourcing accounting to a professional firm is an essential business requirement, not just a choice." }
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
              FTA-compliant and audit-ready accounting services to navigate VAT, Corporate Tax, and regulatory requirements in the UAE. Your business's financial health, managed by experts.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in Dubai are for any Mainland or Free Zone company that needs to ensure compliance with the UAE's evolving financial regulations. This is critical for businesses registering for VAT, preparing for the 9% Corporate Tax, and for companies in free zones like DMCC or JAFZA that require mandatory annual audits for license renewal. It is designed for founders who need reliable financial data for decision-making and peace of mind on compliance.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under UAE law, maintaining proper accounting records is mandatory from the day of incorporation. Professional accounting becomes non-negotiable when your business registers for VAT or Corporate Tax, as accurate records are required for tax filings. Furthermore, it is essential when preparing the audited financial statements required by many free zone authorities for annual trade license renewal.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Dubai (UAE)">
                <p>Outsourcing your accounting provides access to professional expertise at a predictable monthly cost, far lower than hiring an in-house accountant. Typical costs in the UAE are:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Small Businesses / Low Transaction Volume:** AED 1,500 – AED 3,000 per month.</li>
                    <li>**Growing Companies or those requiring regular reporting:** AED 3,000 – AED 7,500 per month.</li>
                    <li>**Annual Audit Fees (if applicable):** Separate from monthly accounting, these typically range from AED 5,000 to AED 15,000+.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Improper accounting in the UAE can lead to severe financial and operational consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**FTA Penalties:** The Federal Tax Authority imposes significant fines for incorrect or late VAT and Corporate Tax filings.</li>
                    <li>**Failed Audits:** Inaccurate books will lead to a qualified or adverse opinion on your audit report, which can prevent your trade license renewal.</li>
                    <li>**Inability to Renew License:** Many free zones will not renew a company's license without submission of compliant, audited financial statements.</li>
                    <li>**Bank Account Freezing:** Banks may freeze accounts of companies that are not in good legal standing due to non-compliance.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your accounting to YourLegal is the most effective way to navigate the UAE's complex regulatory environment. Our team of qualified accountants ensures your books are IFRS-compliant and always ready for audit. We manage your VAT and Corporate Tax obligations, protecting you from FTA penalties. By handling the financial complexities, we provide the clarity and confidence you need to run your business, make strategic decisions, and satisfy all legal requirements without the burden and cost of an in-house finance department. This is a foundational service that works in tandem with our <Link href="/dubai/tax-compliance" className="text-blue-600 hover:underline">tax compliance solutions</Link>.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
