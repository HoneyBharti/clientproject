
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
  const countryName = "Saudi Arabia";
  const primaryKeyword = "Saudi Arabia company annual compliance";

  const aiBlocks = [
    { title: "What is Annual Compliance in Saudi Arabia?", content: "Annual compliance in KSA revolves around renewing key licenses, primarily the MISA Investment License and the Commercial Registration (CR). It also involves renewing your Chamber of Commerce subscription and ensuring all government portal information is up to date." },
    { title: "Who needs it?", content: "Every foreign-invested company in Saudi Arabia must renew its licenses annually to legally operate, employ staff, and maintain its bank accounts." },
    { title: "Cost range?", content: "Annual renewal fees are substantial. The MISA license renewal alone can be SAR 12,000 or more annually, in addition to CR and Chamber of Commerce fees. Professional fees for managing the process are separate." },
    { title: "DIY vs outsourcing?", content: "DIY is impossible for foreign companies. The renewal processes require interaction with multiple Arabic-language government portals and often require a local representative (PRO). Outsourcing is the only viable option." },
    { title: "Final decision summary", content: "Given the complexity and severe penalties for non-renewal (including business suspension), outsourcing annual compliance in Saudi Arabia is a mandatory operational requirement." }
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
              Proactive MISA and CR license renewals to ensure your KSA business remains operational and compliant.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for all foreign-owned companies operating in Saudi Arabia. It ensures the timely renewal of the two most critical licenses: the MISA (Ministry of Investment) license and the CR (Commercial Registration) from the Ministry of Commerce, which together form the legal basis for your company's existence and right to operate.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Both the MISA license and the Commercial Registration must be renewed annually. The process should be initiated at least one month before the expiry date to gather all necessary documents, such as an updated office lease and proof of Saudization (Nitaqat) compliance, which are often prerequisites for renewal.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>Annual government fees are a significant operational cost in the Kingdom:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**MISA License Renewal Fee:** Starts from SAR 12,000 for the first year and can be higher depending on the license type.</li>
                    <li>**Commercial Registration Renewal:** Approximately SAR 1,200.</li>
                    <li>**Chamber of Commerce:** Annual subscription fees are also applicable.</li>
                </ul>
                <p className='mt-2'>Our service fees for managing this process are separate from these government costs.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Failure to renew your licenses is one of the most critical business risks in Saudi Arabia:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Business Suspension:** An expired CR or MISA license means your company is operating illegally.</li>
                    <li>**Bank Account Freeze:** Banks will freeze your corporate account if your licenses are not valid.</li>
                    <li>**Visa and Labor Blocks:** You will be unable to renew employee iqamas (residency permits) or issue new visas.</li>
                    <li>**Hefty Fines:** Government authorities impose significant fines for late renewals.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>The renewal process is a complex, multi-step procedure involving several government platforms. It requires careful coordination to ensure all prerequisite documents are in order before submission. YourLegal's team in KSA manages this entire workflow, ensuring your licenses are renewed on time and your business remains fully operational and compliant, protecting you from severe business disruptions.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

