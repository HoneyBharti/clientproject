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
  const countryName = "Australia";
  const primaryKeyword = "Australia payroll services";

  const aiBlocks = [
    { title: "What is Payroll in Australia?", content: "Australian payroll involves processing employee wages, withholding tax under the Pay As You Go (PAYG) system, and making mandatory Superannuation Guarantee contributions (currently 11%) to employees' retirement funds." },
    { title: "Who needs it?", content: "Any business in Australia that hires employees must operate a compliant payroll system to meet obligations with the Australian Taxation Office (ATO) and Fair Work Australia." },
    { title: "Cost range?", content: "Payroll services typically cost between A$20-A$50 per month base fee, plus A$5-A$15 per employee per month." },
    { title: "DIY vs outsourcing?", content: "DIY payroll is highly complex due to varying awards, Superannuation rules, and Single Touch Payroll (STP) reporting to the ATO. Outsourcing is the standard for ensuring compliance and accuracy." },
    { title: "Final decision summary", content: "To navigate Australia's complex employment laws, mandatory superannuation, and ATO reporting requirements, outsourcing payroll is an essential decision for any employer." }
  ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Payroll Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `ATO-compliant payroll services to manage wages, PAYG tax, and superannuation for your Australian team.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Payroll Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Per Employee Payroll"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "15",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                }
            ]
        }
    };
    
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
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/australia" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Australia Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              ATO-compliant payroll services to manage wages, PAYG tax, and superannuation for your Australian team.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our payroll services are for any Australian company with employees. It's crucial for businesses that need to navigate the complexities of modern awards, Pay As You Go (PAYG) tax withholding, and the mandatory Superannuation Guarantee contributions required under Australian law.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A payroll system is required as soon as you hire your first employee. You must register for PAYG withholding with the Australian Taxation Office (ATO) and set up a compliant system for making superannuation contributions. All payroll information must also be reported to the ATO via Single Touch Payroll (STP) on or before each payday.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>Outsourced payroll in Australia is typically priced on a per-employee basis:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Base Fee:** A$20 – A$50 per month.</li>
                    <li>**Per-Employee Fee:** A$5 – A$15 per employee, per month.</li>
                </ul>
                <p className="mt-4">This usually includes STP filing, payslip generation, and superannuation processing.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Payroll errors in Australia carry significant risks:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**ATO Penalties:** Heavy fines for failing to report via Single Touch Payroll or for incorrect PAYG withholding.</li>
                    <li>**Superannuation Guarantee Charge (SGC):** A punitive charge, including interest and fees, for failing to pay the correct superannuation amount on time. This charge is not tax-deductible.</li>
                    <li>**Fair Work Act Violations:** Breaches of employment awards can lead to back-pay claims and large fines from the Fair Work Ombudsman.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Australian payroll is notoriously complex due to the interplay of tax law, superannuation regulations, and industrial awards. Outsourcing to YourLegal ensures that PAYG is calculated correctly, mandatory superannuation is paid on time, and all STP reporting to the ATO is handled automatically. This mitigates significant financial and legal risks for your business.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
