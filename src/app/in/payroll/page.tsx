
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
  const countryName = "India";
  const primaryKeyword = "India payroll services";

  const aiBlocks = [
    { title: "What is Payroll in India?", content: "Indian payroll involves calculating salaries, deducting taxes (TDS), and managing statutory contributions like Provident Fund (PF) and Employee State Insurance (ESI). It also includes filing monthly and quarterly returns for these deductions." },
    { title: "Who needs it?", content: "Every company in India that hires employees must operate a compliant payroll system to meet its obligations under various labor and tax laws." },
    { title: "Cost range?", content: "Outsourced payroll in India typically costs ₹500 to ₹1,500 per employee per month, depending on the complexity and number of employees." },
    { title: "DIY vs outsourcing?", content: "DIY payroll is extremely complex due to varying state-level rules (like Professional Tax) and the intricate calculations for PF, ESI, and TDS. Outsourcing to a payroll expert is the standard and necessary approach." },
    { title: "Final decision summary", content: "To navigate India's complex web of labor laws and tax deductions, and to avoid significant penalties for non-compliance, outsourcing payroll is an essential business decision." }
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
              Compliant payroll services to manage salaries, TDS, PF, and ESI for your Indian team.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for any company registered in India that has employees. It is essential for ensuring that salary payments, tax deductions, and statutory contributions are all managed in strict accordance with Indian labor and tax laws. It's a must-have for startups, SMEs, and foreign subsidiaries hiring local talent.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A compliant payroll process is required from the moment you hire your first employee. Before processing the first salary, the company must have obtained its TAN (Tax Deduction and Collection Account Number), and registered for Provident Fund (PF), Employee State Insurance (ESI), and state-specific Professional Tax, where applicable.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>Professional payroll services in India are typically priced on a per-employee basis:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Per Employee, Per Month:** ₹500 – ₹1,500.</li>
                    <li>**Additional services:** Costs may increase for managing reimbursements, leave tracking, and complex salary structures.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Payroll is one of the most complex compliance areas in India, with risks including:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**TDS Penalties:** Failure to deduct the correct amount of Tax Deducted at Source (TDS) or deposit it on time leads to interest and penalties.</li>
                    <li>**PF & ESI Defaults:** Late payment of Provident Fund and Employee State Insurance contributions attracts penalties and can lead to legal action against the company's directors.</li>
                    <li>**Labor Law Violations:** Non-compliance with minimum wage, overtime, and leave rules can result in fines and employee disputes.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Indian payroll is notoriously complex due to the interplay of central and state laws. Outsourcing to YourLegal's partners ensures that all calculations for TDS, PF, ESI, and other deductions are handled accurately. We manage the monthly payment of statutory dues and the filing of all required returns, protecting your business from the significant financial and legal risks of non-compliance.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
