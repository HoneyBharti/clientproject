
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { ChevronLeft } from 'lucide-react';
import { HubspotForm } from '@/components/forms/hubspot-form';
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


export default function BookkeepingServicePage() {
  const serviceName = "Bookkeeping";
  const countryName = "Australia";
  const primaryKeyword = "Bookkeeping services Australia";

  const aiBlocks = [
    { title: "What is bookkeeping in Australia?", content: "Bookkeeping in Australia is the daily process of recording all financial transactions, reconciling bank accounts, and categorizing income and expenses to comply with ATO requirements." },
    { title: "Who needs it?", content: "Every business operating in Australia, from sole traders to Pty Ltd companies, needs accurate bookkeeping for tax and financial management." },
    { title: "Cost range?", content: "Typically AUD $300 to $800 per month for small businesses, depending on transaction volume. This provides a significant saving over hiring staff." },
    { title: "DIY vs outsourcing?", content: "DIY bookkeeping is often inaccurate and time-consuming. Outsourcing ensures your records are clean, compliant, and ready for BAS and tax filing, saving you from costly errors." },
    { title: "Final decision summary", content: "For accurate financials and stress-free tax compliance in Australia, outsourcing your bookkeeping is the most efficient and reliable business decision." }
  ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Bookkeeping Services",
        "provider": {
            "@type": "Organization",
            "name": "YourLegal AI"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "description": `Accurate, ATO-compliant bookkeeping services for your Australian business. We keep your financials organised, reconciled, and ready for tax time.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Bookkeeping Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Small Business Bookkeeping Australia"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "300",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growing Business Bookkeeping Australia"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "800",
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
              Accurate, ATO-compliant bookkeeping for your Australian business. We keep your financials organised, reconciled, and ready for tax time.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in Australia are perfect for small to medium-sized businesses, e-commerce brands, consulting firms, and startups that need reliable and accurate financial records but lack the time or expertise to manage them in-house. It is designed for founders who want to focus on their core business, confident that their financial data is being handled professionally.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Bookkeeping is required from the very first day your business makes a transaction. It is the foundation of all financial reporting and is legally necessary for lodging your Business Activity Statements (BAS) for GST and filing your annual company tax return with the ATO. Clean books are also essential for tracking cash flow, profitability, and preparing for any potential investment or audit.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Australia">
                <p>Professional bookkeeping services in Australia offer a high return on investment by ensuring accuracy and saving valuable founder time. Monthly fees typically vary based on transaction volume and complexity:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Small Businesses / Low Volume:** AUD $300 – $500 per month.</li>
                    <li>**Growing Businesses / E-commerce:** AUD $500 – $1,200 per month.</li>
                </ul>
                <p className="mt-4">These costs are significantly lower than hiring a part-time or full-time bookkeeper, with no associated payroll taxes or employee overheads.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Poor bookkeeping is one of the most common causes of business failure and compliance issues. The risks include:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Incorrect BAS Filings:** Leading to GST overpayments or underpayments and penalties from the ATO.</li>
                    <li>**Tax Audit Triggers:** Messy and unreconciled books are a major red flag for the ATO.</li>
                    <li>**Missed Tax Deductions:** Failure to correctly categorise all business expenses results in a higher tax bill.</li>
                    <li>**Inability to Secure Loans:** Banks and investors require clean, up-to-date financial records to assess your business's health.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal ensures your financials are managed by professionals who understand Australian tax law. We use modern, cloud-based software (like Xero or MYOB) to automate data entry and provide you with real-time insights into your business performance. Our process guarantees that your books are always reconciled, compliant, and ready for your accountant at tax time. This not only saves you countless hours of administrative work but also provides the financial clarity needed to make smart, data-driven decisions. For strategic financial oversight, our bookkeeping service pairs perfectly with our <Link href="/australia/accounting" className="text-blue-600 hover:underline">accounting services</Link>.</p>
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

