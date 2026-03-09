
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
  const countryName = "Singapore";
  const primaryKeyword = "Singapore payroll services";

  const aiBlocks = [
    { title: "What is Payroll in Singapore?", content: "Singapore payroll involves calculating monthly salaries, making mandatory Central Provident Fund (CPF) contributions for local employees, and managing the Skills Development Levy (SDL). While there is no payroll tax withholding for local residents, accurate calculations are critical." },
    { title: "Who needs it?", content: "Any company in Singapore that hires employees, especially Singapore Citizens or Permanent Residents, must run a payroll system to manage CPF contributions and other legal requirements." },
    { title: "Cost range?", content: "Outsourced payroll in Singapore typically costs S$30 - S$70 per employee per month. Costs can be higher for companies with expatriate employees requiring tax clearance." },
    { title: "DIY vs outsourcing?", content: "CPF contribution rates vary by age and residency status, making calculations complex. Outsourcing ensures these mandatory contributions are calculated and paid correctly, avoiding penalties." },
    { title: "Final decision summary", content: "To ensure accurate and timely CPF contributions, which is a strict legal requirement, outsourcing payroll in Singapore is the most reliable and risk-free approach for any employer." }
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/singapore" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Singapore Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Compliant payroll services to manage salaries and mandatory CPF contributions for your Singapore team.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is for any Singapore-registered company that employs Singapore Citizens or Permanent Residents (PRs). It is essential for managing the complex and mandatory Central Provident Fund (CPF) contributions, which are the cornerstone of Singapore's social security system.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A compliant payroll system is required from your very first local hire. Employers must make CPF contributions for any employee earning more than S$50 per month. These contributions must be paid by the 14th day of the following month.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>Professional payroll services in Singapore are typically priced per employee:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Per Employee, Per Month:** S$30 – S$70.</li>
                    <li>**Additional services:** Fees may be higher for processing tax clearance for foreign employees (Form IR21).</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>The CPF Board strictly enforces contribution requirements. Failure to comply leads to:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Late Payment Interest:** Interest is charged on late CPF contributions, calculated daily.</li>
                    <li>**Fines and Penalties:** The CPF Board can impose fines and take legal action against employers who fail to pay contributions.</li>
                    <li>**Director Liability:** Directors can be held personally liable for the company's unpaid CPF contributions.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>CPF contribution rates are complex, varying based on an employee's age and residency status. Outsourcing your payroll to YourLegal ensures these multi-tiered calculations are always accurate. We manage the entire process, from calculating contributions and issuing itemized payslips (a legal requirement) to ensuring timely payment to the CPF Board, safeguarding your business from significant financial penalties.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

