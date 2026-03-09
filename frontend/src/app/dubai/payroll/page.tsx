
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

export default function PayrollServicePage() {
  const serviceName = "Payroll";
  const countryName = "Dubai (UAE)";
  const primaryKeyword = "UAE payroll services";

  const aiBlocks = [
    { title: "What is Payroll in the UAE?", content: "UAE payroll involves processing employee salaries in compliance with the Wages Protection System (WPS), calculating end-of-service gratuity, and managing leave pay according to UAE Labour Law. There is no personal income tax to withhold." },
    { title: "Who needs it?", content: "Any company in the UAE (Mainland or Free Zone) that employs staff must have a compliant payroll process to meet legal obligations, especially the WPS requirement." },
    { title: "Cost range?", content: "Payroll services are often bundled with accounting. Standalone services might range from AED 50-150 per employee per month, depending on the provider." },
    { title: "DIY vs outsourcing?", content: "While seemingly simple due to the lack of income tax, gratuity calculations and WPS compliance can be complex. Outsourcing ensures accuracy and adherence to UAE Labour Law." },
    { title: "Final decision summary", content: "To ensure compliance with the mandatory Wages Protection System (WPS) and correctly calculate employee benefits, outsourcing your UAE payroll is the most reliable approach." }
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
              WPS-compliant payroll to manage salaries, leave, and gratuity for your UAE employees.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for any UAE-based company with employees. It is essential for ensuring that salary payments, end-of-service benefits (gratuity), and leave policies are all managed in strict accordance with UAE Labour Law.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A compliant payroll process is required from the moment you hire your first employee. Companies must register with the Wages Protection System (WPS), a mandatory electronic salary transfer system that ensures employees are paid correctly and on time.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>UAE payroll services are generally affordable and often included as part of a broader accounting package.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Per Employee, Per Month:** AED 50 – AED 150.</li>
                    <li>**Bundled with Accounting:** Often included in monthly accounting retainers starting from AED 1,500 – AED 3,000 per month.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Non-compliance with UAE payroll regulations can be costly:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**WPS Violations:** Failure to pay salaries through WPS can lead to fines and a block on issuing new work permits.</li>
                    <li>**Incorrect Gratuity Calculation:** Miscalculating end-of-service benefits is a common cause of employee disputes and legal claims.</li>
                    <li>**Labor Law Fines:** The Ministry of Human Resources and Emiratisation (MOHRE) can impose fines for various breaches of the labour law.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Although the UAE has no income tax, its Labour Law has specific and strict rules regarding payment timing, leave calculation, and end-of-service gratuity. Outsourcing to YourLegal ensures your payroll is fully compliant with the WPS, all calculations are accurate, and your business is protected from potential employee disputes and government penalties.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

