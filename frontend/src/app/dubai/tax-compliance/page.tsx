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
                <h4 className="font-semibold text-gray-700">How does business compliance work in the UAE?</h4>
                <p className="text-gray-600">UAE compliance is managed by jurisdictional and federal bodies. It includes annual trade license renewal with the relevant authority (e.g., a Free Zone), federal tax obligations with the FTA (VAT and Corporate Tax), and maintaining proper accounting records. For Free Zone companies, meeting Economic Substance Regulations (ESR) and UBO requirements is also critical.</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">What are the key risks of non-compliance in the UAE?</h4>
                <p className="text-gray-600">Non-compliance in the UAE results in significant fines from the FTA for tax violations, penalties for late license renewals, and potential loss of the 0% Free Zone tax benefit. It can also lead to the freezing of bank accounts and an inability to renew employee visas, effectively halting all business operations.</p>
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
  

export default function DubaiTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/dubai" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dubai Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              UAE Tax & <span className="text-blue-600">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key obligations for running a compliant business in the United Arab Emirates.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CompliancePillar 
              icon={Building}
              title="Jurisdictional Compliance"
              description="Ensuring your company remains in good standing with its licensing authority, whether Mainland or Free Zone."
              items={["Annual Trade License Renewal", "Lease/Office Registration (Ejari)", "Economic Substance Regulations (ESR) Filing", "UBO Register Maintenance"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="Federal Tax Compliance (FTA)"
              description="Managing your tax obligations with the Federal Tax Authority (FTA) to ensure full compliance and avoid penalties."
              items={["Corporate Tax Registration & Filing", "VAT Registration & Filing", "Qualifying Free Zone Person Analysis", "Transfer Pricing Documentation"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complex, but Manageable</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Our plans are designed to handle all these complexities for you. Stay focused on your business, not on paperwork.</p>
              <Button size="lg" asChild>
                <Link href="/dubai/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

