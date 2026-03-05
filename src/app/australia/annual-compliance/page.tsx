
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

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

const HubspotCtaSection = () => (
    <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to Get Started?</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions about our plans, partnerships, or unique business needs? Our team is here to help. Fill out the form, and we'll be in touch shortly.
                    </p>
                     <div className="mt-6">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">Schedule a Free Consultation</Button>
                        </a>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Contact Sales</h3>
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
        </div>
    </section>
);


export default function AnnualComplianceServicePage() {
  const serviceName = "Annual Compliance";
  const countryName = "Australia";
  const primaryKeyword = "Australia company annual compliance";

  const aiBlocks = [
    { title: "What is Annual Compliance in Australia?", content: "Annual compliance in Australia involves filing an Annual Company Statement with ASIC and paying the annual review fee. It confirms that the company's details, including directors and address, are up to date." },
    { title: "Who needs it?", content: "Every registered Australian Proprietary Limited (Pty Ltd) company must complete this annual review to maintain its registration and legal standing." },
    { title: "Cost range?", content: "The main cost is the annual ASIC review fee, which is around A$310. Professional fees for managing the filing are additional and are typically part of a larger compliance package." },
    { title: "DIY vs outsourcing?", content: "While technically possible, DIY is risky for non-residents who may miss notifications from ASIC. Outsourcing ensures deadlines are met and that the mandatory resident director and address details are correctly maintained." },
    { title: "Final decision summary", content: "To avoid late fees and the risk of company de-registration, outsourcing annual ASIC compliance is the most prudent choice for any business, especially for international founders." }
  ];
  
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Annual Compliance Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Automated ASIC filings and annual compliance services to keep your Australian company compliant and in good standing. We manage your Annual Company Statement and ASIC review fees.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Annual Compliance Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "ASIC Annual Compliance Filing"
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
              Automated ASIC filings to keep your Australian company compliant and in good standing.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>This service is essential for all Australian Pty Ltd companies, particularly those with non-resident owners who rely on a third party to manage their local compliance obligations. It ensures the company remains legally registered and avoids penalties from the Australian Securities and Investments Commission (ASIC).</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>An Annual Company Statement must be reviewed and the corresponding fee paid to ASIC each year around the anniversary of the company's registration date. ASIC will issue an invoice, and failure to pay on time results in penalties.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges">
                <p>The primary cost is the mandatory government fee, separate from our service fees.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**ASIC Annual Review Fee:** Approximately A$310 per year (this amount is indexed and may change).</li>
                    <li>**Professional Service Fee:** Included in our comprehensive compliance packages to manage the review and filing process.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Missing the annual review deadline can lead to escalating consequences:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Late Fees:** ASIC imposes significant late payment fees.</li>
                    <li>**Company De-registration:** If the fee remains unpaid, ASIC can begin the process of de-registering your company, which means it will cease to exist legally.</li>
                    <li>**Director Liability:** Directors have a legal duty to ensure the company meets its obligations.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your annual compliance to YourLegal ensures that your ASIC deadlines are tracked and met without fail. We act as your registered agent, receive all official correspondence, manage the payment of government fees, and handle the filing of the annual statement, providing a seamless and worry-free compliance solution.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
        <HubspotCtaSection />
      </main>
      <AppFooter />
    </div>
  );
}
