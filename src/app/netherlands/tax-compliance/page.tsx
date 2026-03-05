
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
                <h4 className="font-semibold text-gray-700">How does business compliance work in the Netherlands?</h4>
                <p className="text-gray-600">Dutch compliance involves corporate governance via the KVK (Chamber of Commerce) and tax obligations with the Belastingdienst (Tax Authority). Key annual tasks include filing annual accounts with the KVK, filing a corporate income tax (VPB) return, and submitting regular BTW (VAT) returns. UBO (Ultimate Beneficial Owner) registration is also mandatory.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the Netherlands?</h4>
                <p className="text-gray-600">Non-compliance in the Netherlands can lead to fines from the Belastingdienst for late or incorrect tax filings and penalties from the KVK for failing to file annual accounts. This can result in director liability and harm the company's reputation, affecting its ability to secure financing or partnerships.</p>
            </div>
        </div>
    </div>
);

const CompliancePillar = ({ icon: Icon, title, description, items }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl mr-4">
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
  

export default function NetherlandsTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/netherlands" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Netherlands Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Dutch Tax & <span className="text-orange-600">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key KVK and Belastingdienst obligations for running a compliant Dutch B.V.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CompliancePillar 
              icon={Building}
              title="Corporate Compliance (KVK)"
              description="Maintaining your company's legal standing with the Dutch Chamber of Commerce (Kamer van Koophandel - KVK)."
              items={["Filing of Annual Accounts", "UBO Register Maintenance", "Updating Company Details (address, directors)", "Maintaining Statutory Records"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="Tax Compliance (Belastingdienst)"
              description="Managing all tax obligations with the Dutch Tax and Customs Administration to ensure you are fully compliant and avoid penalties."
              items={["Annual Corporate Income Tax (VPB) Return", "Quarterly or Monthly BTW (VAT) Returns", "Dividend Withholding Tax Filing", "EC Sales List (ICP Declaration)"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Focus on Your EU Expansion</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Our compliance plans are built to manage Dutch regulations, so you can concentrate on growing your business in Europe.</p>
              <Button size="lg" asChild>
                <Link href="/netherlands/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
