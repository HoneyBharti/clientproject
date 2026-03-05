'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Landmark, FileCheck, Shield, ChevronLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in the UK?</h4>
                <p className="text-gray-600">UK compliance is managed by two primary bodies: Companies House for corporate governance and HMRC for taxes. Key annual requirements include filing a Confirmation Statement (CS01) with Companies House, and filing statutory accounts and a Company Tax Return (CT600) with HMRC. VAT registration is required if turnover exceeds £90,000.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the UK?</h4>
                <p className="text-gray-600">Non-compliance in the UK results in automatic, escalating penalties from HMRC for late tax filing and from Companies House for late accounts filing. Continued failure can lead to director disqualification, legal action, and the company being forcibly dissolved and struck off the official register, which harms credit and banking relationships.</p>
            </div>
        </div>
    </div>
);

const CompliancePillar = ({ icon: Icon, title, description, items }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 flex-grow mb-4">{description}</p>
       <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  

export default function UkTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/uk" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to UK Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              UK Tax & <span className="text-blue-800">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key Companies House and HMRC obligations for running a compliant UK company.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CompliancePillar 
              icon={Building}
              title="Corporate Compliance (Companies House)"
              description="Mandatory filings to ensure your company remains active and legally compliant on the official UK register."
              items={["Annual Confirmation Statement (CS01)", "Filing of Annual Statutory Accounts", "Maintenance of PSC Register", "Registered Office Address Requirement"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="Tax Compliance (HMRC)"
              description="Managing all tax obligations with HM Revenue & Customs to avoid penalties and ensure you pay the correct amount of tax."
              items={["Corporation Tax Return (CT600) Filing", "Quarterly VAT Returns (if registered)", "PAYE Scheme for Employees", "iXBRL Accounts Submission"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Compliant, Stay Confident</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Our compliance plans are built to manage all UK regulations, so you can focus on your business.</p>
              <Button size="lg" asChild>
                <Link href="/uk/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
