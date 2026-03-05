
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
  const countryName = "United Kingdom";
  const primaryKeyword = "UK payroll services";

  const aiBlocks = [
    { title: "What is Payroll in the UK?", content: "UK payroll is the process of paying employees while complying with 'Pay As You Earn' (PAYE) rules. This involves calculating wages, deducting income tax and National Insurance Contributions (NICs), and reporting to HMRC." },
    { title: "Who needs it?", content: "Any UK company that hires employees must operate a PAYE payroll scheme. This is a mandatory legal and tax requirement." },
    { title: "Cost range?", content: "Typically £20-£50 per month as a base fee, plus an additional £4-£10 per employee per month, depending on the provider." },
    { title: "DIY vs outsourcing?", content: "DIY payroll is extremely complex due to constant changes in tax codes and regulations. Outsourcing to a payroll provider is the standard, risk-free approach for almost all businesses." },
    { title: "Final decision summary", content: "To avoid significant penalties from HMRC and ensure compliance with UK employment law, outsourcing payroll is an essential business decision." }
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
              HMRC-compliant payroll services to pay your UK team correctly and on time.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our payroll services are for any UK Limited Company that hires one or more employees. This includes UK-based startups, established businesses, and foreign companies hiring staff in the United Kingdom. We ensure full compliance with UK employment and tax laws.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>You must have a payroll system in place *before* your first employee's first payday. The process involves registering as an employer with HMRC (His Majesty's Revenue and Customs) and setting up a PAYE (Pay As You Earn) scheme, which is the system used to collect Income Tax and National Insurance from employment.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>UK payroll services are typically priced on a per-employee, per-month basis:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Base Fee:** £20 – £50 per month.</li>
                    <li>**Per-Employee Fee:** £4 – £10 per employee, per month.</li>
                </ul>
                <p className="mt-4">This service automates payslip generation, tax calculations, and direct reporting to HMRC.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Incorrect payroll administration is a high-risk area with significant consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**HMRC Penalties:** Strict, automatic penalties for late or incorrect payroll submissions (RTI filings).</li>
                    <li>**Incorrect Tax Withholding:** Can lead to large tax underpayments and liabilities for both the company and the employee.</li>
                    <li>**Employee Disputes:** Errors in pay or deductions can lead to legal claims and damage employee morale.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>The UK's PAYE system is complex and subject to frequent changes. Outsourcing payroll to a professional provider automates all tax and National Insurance calculations, handles mandatory submissions to HMRC in real-time, and ensures compliance with auto-enrolment pension duties. For any business, it is the most reliable and risk-averse approach.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
