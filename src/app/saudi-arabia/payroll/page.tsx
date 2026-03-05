
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

export default function PayrollServicePage() {
  const serviceName = "Payroll";
  const countryName = "Saudi Arabia";
  const primaryKeyword = "Saudi Arabia payroll services";

  const aiBlocks = [
    { title: "What is Payroll in Saudi Arabia?", content: "Saudi payroll involves processing salaries in compliance with the Mudad payroll platform, making mandatory GOSI (social insurance) contributions for both Saudi and non-Saudi employees, and calculating end-of-service benefits." },
    { title: "Who needs it?", content: "Every company in Saudi Arabia with employees must have a GOSI file and run a compliant payroll system. It's a fundamental requirement for labor law and Nitaqat (Saudization) compliance." },
    { title: "Cost range?", content: "Payroll services in KSA are typically priced from SAR 100 to SAR 300 per employee per month, plus a setup fee. Costs depend on the level of service and number of employees." },
    { title: "DIY vs outsourcing?", content: "DIY is not feasible. Managing GOSI contributions, using the Mudad platform, and staying compliant with Saudization ratios requires deep local expertise. Outsourcing is standard practice." },
    { title: "Final decision summary", content: "To navigate the mandatory GOSI and Mudad systems and ensure compliance with Saudi labor law, outsourcing payroll to a local expert is a business necessity." }
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
              Compliant payroll services for KSA, managing GOSI, Mudad, and Saudization requirements.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is essential for any company employing staff in Saudi Arabia. It ensures compliance with the complex regulations of the Ministry of Human Resources and Social Development (MHRSD), including social insurance contributions, wage protection, and labor law requirements.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>As soon as you hire your first employee, you must register your company with the General Organization for Social Insurance (GOSI) and the Mudad platform for payroll and wage protection. A compliant payroll process is mandatory from the very first salary payment.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>Professional payroll services in KSA are priced based on the number of employees:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Monthly Fee:** SAR 100 – SAR 300 per employee.</li>
                    <li>**Setup Costs:** A one-time fee for GOSI and Mudad platform registration may apply.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Payroll and HR are the highest-risk compliance areas in Saudi Arabia:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Nitaqat (Saudization) Violations:** Failure to meet hiring quotas for Saudi nationals leads to a "Red" status, which blocks all new and renewal visas for foreign staff.</li>
                    <li>**GOSI Fines:** Penalties for late or incorrect registration of employees and payment of social insurance contributions.</li>
                    <li>**Mudad Violations:** Failure to use the mandatory Mudad wage protection system can lead to fines and suspension of services from the Ministry of Labor.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>The Saudi labor and payroll environment is one of the most complex in the world, with rules that change frequently. Outsourcing to YourLegal's local experts ensures your company is correctly registered on all government platforms (GOSI, Mudad, Qiwa), employee contributions are calculated and paid correctly, and your Nitaqat status is properly managed. This is not just an administrative task; it is a critical function for legal operation in the Kingdom.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
