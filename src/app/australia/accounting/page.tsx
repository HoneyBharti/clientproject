
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

export default function AccountingServicePage() {
  const serviceName = "Accounting";
  const countryName = "Australia";
  const primaryKeyword = "Accounting services in Australia";

  const aiBlocks = [
    { title: "What is accounting in Australia?", content: "Accounting in Australia involves managing financial records, ensuring compliance with Australian Accounting Standards (AASB), and preparing reports for tax filing with the ATO and corporate obligations with ASIC." },
    { title: "Who needs it?", content: "Any registered Australian company (Pty Ltd), foreign subsidiary, or business operating in Australia requires accounting services for tax, compliance, and financial management." },
    { title: "Cost range?", content: "Typically AUD $500 to $3,000 per month, depending on transaction volume, complexity, and reporting needs. Outsourcing offers significant savings over an in-house team." },
    { title: "DIY vs outsourcing?", content: "DIY accounting is risky due to complex AASB and ATO regulations. Outsourcing to qualified Australian accountants ensures accuracy, compliance, and strategic financial oversight." },
    { title: "Final decision summary", content: "For reliable, audit-ready financials and to navigate Australian tax laws effectively, outsourcing your accounting is the most professional and cost-effective choice." }
  ];
  
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Accounting Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Outsourced accounting services in Australia to ensure your business remains compliant, efficient, and audit-ready. We handle AASB-compliant reporting, tax filings, and strategic financial management.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Accounting Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Business Accounting Australia"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "500",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growing Business Accounting Australia"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3000",
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
              Professional accounting services in Australia to ensure your business remains compliant, efficient, and audit-ready. We handle everything from AASB-compliant reporting to strategic financial management.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in Australia are specifically designed for startups, SMEs, and foreign-owned subsidiaries operating in the Australian market. This service is crucial for founders who require accurate, compliant financial reporting and strategic insights but want to avoid the high cost and complexity of hiring an in-house finance team. Whether you are claiming R&D tax incentives, managing GST, or preparing for an audit, our expert accountants provide the support you need.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Professional accounting is necessary from the moment your business begins to have significant financial activity. It is legally required for preparing annual financial statements for ASIC (if applicable), filing company tax returns with the Australian Taxation Office (ATO), and managing your Goods and Services Tax (GST) obligations through Business Activity Statements (BAS). It becomes indispensable when seeking investment, applying for loans, or planning for growth.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Australia">
                <p>The cost of outsourced accounting in Australia is scalable and provides exceptional value compared to hiring an in-house accountant. Typical monthly costs are:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Startups and Small Businesses:** AUD $500 – $1,200 per month for core accounting and BAS lodgement.</li>
                    <li>**Growing Companies:** AUD $1,200 – $3,000 per month for more complex needs, including management reporting and forecasting.</li>
                    <li>**Multi-entity or Complex Operations:** Custom pricing based on specific requirements.</li>
                </ul>
                <p className="mt-4">By outsourcing to YourLegal, businesses can reduce their overall finance and administration costs by up to 60%, freeing up capital for growth-oriented activities.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Inaccurate or non-compliant accounting in Australia poses significant risks that can disrupt your business and lead to financial penalties:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**ATO Audits and Penalties:** Incorrect income tax or BAS filings can trigger costly audits and penalties from the ATO.</li>
                    <li>**ASIC Non-Compliance:** Failure to maintain proper financial records is a breach of the Corporations Act and can lead to director penalties.</li>
                    <li>**Poor Financial Visibility:** Inaccurate reporting leads to flawed business decisions, poor cash flow management, and an inability to secure funding.</li>
                    <li>**Investor Distrust:** Investors require timely and accurate financial reports. Failing to provide them can damage credibility and hinder fundraising efforts.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your accounting to YourLegal provides access to a team of qualified Australian accountants who are experts in AASB standards, ATO tax law, and ASIC regulations. This model delivers more than just record-keeping; it provides a strategic financial function without the high overhead of salaries, benefits, and office space for an in-house team. We ensure your books are always audit-ready, your compliance obligations are met, and you have the financial insights needed to scale your business in Australia. It’s the smart, scalable, and secure way to manage your company's finances.</p>
                 <p className="mt-4">This approach is particularly beneficial for non-resident founders who need reliable local expertise to navigate the complexities of the Australian financial landscape. We handle the details so you can focus on your core business. For more specialized needs, consider our <Link href="/australia/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO services</Link>.</p>
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
