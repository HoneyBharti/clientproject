'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Landmark, FileCheck, Shield, ChevronLeft, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in Saudi Arabia?</h4>
                <p className="text-gray-600">Compliance in KSA is a multi-agency process. It involves MISA for investment licensing, the Ministry of Commerce for commercial registration (CR), and ZATCA for tax and VAT. A critical component is labor law compliance via the MHRSD, which enforces Saudization (Nitaqat) quotas and manages employment through the Qiwa and GOSI platforms.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in Saudi Arabia?</h4>
                <p className="text-gray-600">Non-compliance in KSA has severe consequences. Failure to meet Nitaqat (Saudization) quotas can block visa renewals for all foreign staff. Late tax or Zakat filings result in heavy fines from ZATCA. Failure to renew the MISA license or CR will halt all legal business operations, including banking.</p>
            </div>
        </div>
    </div>
);

const CompliancePillar = ({ icon: Icon, title, description, items }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-green-100 text-green-700 rounded-xl mr-4">
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
  

export default function SaudiTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/saudi-arabia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Saudi Arabia Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              KSA Tax & <span className="text-green-800">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key government obligations for running a compliant Saudi company.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CompliancePillar 
              icon={Building}
              title="Corporate & Licensing"
              description="Ensuring your legal right to operate through mandatory license renewals with the Ministry of Investment and Ministry of Commerce."
              items={["MISA License Renewal", "Commercial Registration (CR) Renewal", "Chamber of Commerce Subscription", "National Address Registration"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="Tax & Zakat (ZATCA)"
              description="Managing all tax and Zakat obligations with ZATCA to ensure full compliance and avoid significant financial penalties."
              items={["VAT Registration & Filing", "Corporate Income Tax Filing", "Zakat Calculation & Filing", "Withholding Tax Compliance"]}
            />
             <CompliancePillar 
              icon={Users}
              title="Labor & HR (MHRSD)"
              description="Navigating the critical rules of the Ministry of Human Resources, including Saudization (Nitaqat) and payroll."
              items={["Nitaqat (Saudization) Compliance", "GOSI Registration & Payroll", "Qiwa platform management", "Work Visa & Iqama Processing"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">One of the World's Toughest Markets</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">KSA compliance is not for the faint of heart. Our All-in-One plan is essential for navigating this landscape.</p>
              <Button size="lg" asChild>
                <Link href="/saudi-arabia/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

