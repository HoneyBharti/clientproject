'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Landmark, FileCheck, Shield, ChevronLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">How does business compliance work in Singapore?</h4>
                <p className="text-gray-600">Compliance in Singapore is managed by two main bodies: ACRA (for corporate governance) and IRAS (for taxes). Key annual tasks include holding an Annual General Meeting (AGM), filing an Annual Return with ACRA, and filing a corporate tax return with IRAS. A company secretary is also mandatory to oversee these processes.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in Singapore?</h4>
                <p className="text-gray-600">Non-compliance in Singapore leads to fines and penalties from ACRA and IRAS for late filings. Directors can be prosecuted for failing to meet their statutory duties. Continued failure can result in the company being struck off the register, which harms its reputation and can lead to legal issues for the directors.</p>
            </div>
        </div>
    </div>
);

const CompliancePillar = ({ icon: Icon, title, description, items }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl mr-4">
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
  

export default function SingaporeTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/singapore" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Singapore Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Singapore Tax & <span className="text-red-600">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key ACRA and IRAS obligations for running a compliant Singaporean company.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CompliancePillar 
              icon={Building}
              title="Corporate Compliance (ACRA)"
              description="Maintaining your company's good standing with the Accounting and Corporate Regulatory Authority (ACRA) is paramount."
              items={["Annual General Meeting (AGM) Compliance", "Annual Return Filing", "Company Secretary Services", "Maintaining Statutory Registers"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="Tax Compliance (IRAS)"
              description="Managing all tax obligations with the Inland Revenue Authority of Singapore (IRAS) to ensure full compliance and benefit from incentives."
              items={["Estimated Chargeable Income (ECI) Filing", "Annual Tax Return (Form C-S/C)", "Goods and Services Tax (GST) Filing", "Start-up Tax Exemption (SUTE) Advice"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">World-Class Compliance, Simplified</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Singapore's regulatory environment is strict but fair. Our plans are designed to ensure you meet every deadline.</p>
              <Button size="lg" asChild>
                <Link href="/singapore/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

