
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


export default function AccountingServicePage() {
  const serviceName = "Accounting";
  const countryName = "Singapore";
  const primaryKeyword = "Accounting services in Singapore";

  const aiBlocks = [
    { title: "What is accounting in Singapore?", content: "Accounting for a Singapore Pte. Ltd. involves maintaining financial records compliant with Singapore Financial Reporting Standards (SFRS), preparing Unaudited Financial Statements for ACRA filings, and managing corporate tax compliance with IRAS." },
    { title: "Who needs it?", content: "Every Singapore-incorporated company is legally required to maintain proper accounting records for annual filings, tax compliance, and financial management, regardless of size or activity level." },
    { title: "Cost range?", content: "An annual package for preparing Unaudited Financial Statements and filing the tax return typically costs S$800 to S$2,500 for a standard small company. Monthly services are separate." },
    { title: "DIY vs outsourcing?", content: "DIY is not feasible due to the complexities of SFRS and tax law. Outsourcing to a professional accounting firm is the standard and necessary practice to ensure compliance and accuracy." },
    { title: "Final decision summary", content: "To meet mandatory ACRA and IRAS filing obligations and avoid significant penalties, outsourcing your accounting in Singapore is the only reliable and professional choice." }
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
        "name": "Singapore"
    },
    "description": `Professional accounting services in Singapore to ensure your business remains compliant with ACRA and IRAS. We handle SFRS-compliant financial statements, corporate tax, and more.`,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Singapore Accounting Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Annual Financial Statements & Tax Filing (Singapore)"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "800",
                    "priceCurrency": "SGD",
                    "unitText": "year"
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
             <Link href="/singapore" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Singapore Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Professional accounting for your Singapore Pte. Ltd. We ensure compliance with ACRA, IRAS, and Singapore Financial Reporting Standards (SFRS).
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our accounting services in Singapore are essential for any business operating as a Private Limited (Pte. Ltd.) company. This includes foreign-owned subsidiaries using Singapore as a regional headquarters, technology startups benefiting from the local ecosystem, e-commerce companies serving the APAC market, and holding companies managing global assets. It is a mandatory service for any founder who needs to ensure their company meets its statutory obligations for financial reporting and taxation with the Accounting and Corporate Regulatory Authority (ACRA) and the Inland Revenue Authority of Singapore (IRAS).</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Formal accounting is a legal requirement from the moment your Singapore company is incorporated. It forms the basis of all your regulatory filings. Specifically, professional accounting is required to prepare the annual Unaudited Financial Statements (UFS) that must be presented at the company's Annual General Meeting (AGM) and filed with ACRA as part of the Annual Return. Furthermore, these SFRS-compliant accounts are the foundation for preparing and filing your company's annual corporate tax return (Form C-S/C) with IRAS. Without proper accounting, a company cannot fulfill its fundamental legal duties.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Singapore">
                <p>The cost of professional accounting services in Singapore is competitive and provides clear value by ensuring compliance and preventing costly penalties. Pricing is often structured in an annual package that covers the key year-end deliverables:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Annual Compliance Package:</strong> Typically ranges from S$800 to S$2,500 for a standard small company or dormant company.</li>
                    <li><strong>This package usually includes:</strong>
                        <ul className='list-circle pl-5 mt-2'>
                            <li>Preparation of Unaudited Financial Statements (UFS) compliant with SFRS.</li>
                            <li>Preparation and filing of the annual corporate tax return (ECI and Form C-S/C) with IRAS.</li>
                        </ul>
                    </li>
                    <li><strong>Monthly Retainers:</strong> For ongoing bookkeeping, GST filing, and management reporting, monthly fees can range from S$200 to S$1,000+, depending on transaction volume.</li>
                </ul>
                <p className="mt-4">YourLegal bundles these services to provide a cost-effective, all-in-one financial solution for your Singapore entity.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Failure to maintain proper accounts and meet filing deadlines in Singapore can lead to severe penalties and legal issues for the company and its directors:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li><strong>ACRA Penalties:</strong> ACRA imposes fines for late filing of Annual Returns, and continued failure can lead to the company being struck off the register.</li>
                    <li><strong>IRAS Penalties:</strong> The tax authority imposes penalties for late or incorrect filing of corporate tax returns, which can include fines and interest on underpaid tax.</li>
                    <li>**Director Liability:** Under the Companies Act, directors are personally responsible for ensuring the company maintains proper accounting records. Failure to do so can result in prosecution and disqualification from being a director.</li>
                    <li>**Operational Disruptions:** Banks and other financial institutions may refuse to provide services to a company that is not in good standing with ACRA and IRAS.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your Singapore accounting is the standard and most prudent approach for any business. The intricacies of the Singapore Financial Reporting Standards (SFRS), combined with the specific requirements of ACRA and IRAS filings, demand specialized local expertise. An in-house accountant represents a significant fixed cost, particularly for a new or small enterprise.</p>
                 <p className="mt-4">YourLegal connects you with qualified Singaporean accountants who ensure your financial statements are accurate, compliant, and filed on time. This approach eliminates the risk of penalties and director liability. It provides a professional, reliable finance function for your Singaporean operations at a predictable cost, allowing you to focus on your core business activities. This service integrates seamlessly with our essential <Link href="/singapore/bookkeeping" className="text-blue-600 hover:underline">bookkeeping services</Link> and is fundamental to our <Link href="/singapore/tax-compliance" className="text-blue-600 hover:underline">tax compliance</Link> solution.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />

          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

