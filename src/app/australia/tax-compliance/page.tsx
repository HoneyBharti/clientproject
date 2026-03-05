'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Landmark, FileCheck, Shield, ChevronLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "How does business compliance work in Australia?", content: "Australian compliance involves corporate governance with ASIC and tax obligations with the ATO. Key tasks include lodging an annual company statement with ASIC, maintaining a resident director, and filing an annual company tax return. If turnover exceeds A$75,000, GST registration and periodic Business Activity Statement (BAS) filings are also required." },
        { title: "What are the key risks of non-compliance in Australia?", content: "Non-compliance in Australia can lead to significant late fees and penalties from both ASIC and the ATO. Failure to lodge documents can result in the company being struck off the register, while directors can face personal liability for breaches of their duties, including insolvent trading." }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": aiBlocks.map(block => ({
            "@type": "Question",
            "name": block.title,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": block.content
            }
        }))
    };
    
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
                <div className="space-y-4">
                    {aiBlocks.map((block, index) => (
                        <div key={index}>
                            <h4 className="font-semibold text-gray-700">{block.title}</h4>
                            <p className="text-gray-600">{block.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const CompliancePillar = ({ icon: Icon, title, description, items }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl mr-4">
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
  

export default function AustraliaTaxCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/australia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Australia Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Australia Tax & <span className="text-yellow-600">Compliance Framework</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An overview of the key ASIC and ATO obligations for running a compliant Australian company.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CompliancePillar 
              icon={Building}
              title="ASIC Corporate Compliance"
              description="Mandatory filings to ensure your company maintains its legal registration and good standing with the Australian Securities and Investments Commission (ASIC)."
              items={["Annual Company Statement", "Resident Director Requirement", "Maintenance of Corporate Registers", "Solvency Resolutions"]}
            />
             <CompliancePillar 
              icon={Landmark}
              title="ATO Tax Compliance"
              description="Federal tax obligations administered by the Australian Taxation Office (ATO). We ensure your business files correctly and on time."
              items={["Company Tax Return Filing", "Business Activity Statement (BAS) Filing", "Goods and Services Tax (GST)", "PAYG Withholding for employees"]}
            />
          </div>

            <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Compliant Down Under</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Don't get caught out by complex regulations. Our plans handle all of this for you.</p>
              <Button size="lg" asChild>
                <Link href="/australia/pricing">Explore Our Compliance Plans</Link>
              </Button>
            </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
