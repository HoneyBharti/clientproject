
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

export default function BookkeepingServicePage() {
  const serviceName = "Bookkeeping";
  const countryName = "Singapore";
  const primaryKeyword = "Bookkeeping services Singapore";

  const aiBlocks = [
    { title: "What is bookkeeping in Singapore?", content: "Bookkeeping in Singapore is the process of recording all your company's daily financial transactions (sales, purchases, expenses) in a compliant manner, forming the basis for your annual financial statements and tax returns." },
    { title: "Who needs it?", content: "Every company registered in Singapore is legally required by the Companies Act to maintain proper books of accounts from the day of incorporation." },
    { title: "Cost range?", content: "Monthly bookkeeping services for a small company in Singapore typically cost between S$200 and S$600, depending on the volume and complexity of transactions." },
    { title: "DIY vs outsourcing?", content: "While possible for very simple businesses, DIY bookkeeping often leads to errors in GST calculations and costly cleanup work at year-end. Outsourcing ensures professional accuracy and frees up founder time." },
    { title: "Final decision summary", content: "To ensure your Singapore company has accurate financial records for tax filing and decision-making, outsourcing bookkeeping is the most efficient and reliable solution." }
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
        "name": "Singapore"
    },
    "description": `Professional bookkeeping services in Singapore. We keep your financials organized, reconciled, and ready for GST, ACRA, and IRAS filings.`,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Singapore Bookkeeping Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Small Business Bookkeeping Singapore"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "200",
                    "priceCurrency": "SGD",
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
             <Link href="/singapore" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Singapore Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate, compliant bookkeeping for your Singapore company. We keep your financials organized and ready for GST and tax filings.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our bookkeeping services in Singapore are perfect for startups, small businesses, e-commerce stores, and consulting firms that require accurate and up-to-date financial records. It is designed for founders who want to offload the time-consuming task of daily transaction management and ensure their financial data is clean, reliable, and ready for analysis. Good bookkeeping is the bedrock of a healthy business and a non-negotiable legal requirement.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>Under the Singapore Companies Act, every company is required to maintain proper books of accounts from the day it is incorporated. This is not optional. Bookkeeping is the fundamental process that enables the preparation of all other financial and tax documents, including your quarterly GST returns (if applicable), annual Unaudited Financial Statements for ACRA, and your annual corporate tax return for IRAS. It is the first and most critical step in financial compliance.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Singapore">
                <p>Professional bookkeeping services in Singapore offer an excellent return on investment by ensuring accuracy and saving valuable founder time. Monthly fees are typically based on the volume of transactions your business conducts:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Startups / Low Transaction Volume:** S$200 – S$400 per month.</li>
                    <li>**Growing Businesses / E-commerce Stores:** S$400 – S$800 per month.</li>
                    <li>**Higher Volume or Complex Businesses:** S$800+ per month.</li>
                </ul>
                <p className="mt-4">These costs are significantly lower than hiring a part-time or full-time bookkeeper, with no associated CPF contributions or employee overheads.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Neglecting bookkeeping or performing it incorrectly creates a cascade of problems that can severely impact your business:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Inaccurate Tax Filings:** "Garbage in, garbage out." Poorly kept books lead directly to incorrect GST and corporate tax returns, which can trigger audits and heavy penalties from IRAS.</li>
                    <li>**Failed Audits & ACRA Penalties:** Your annual financial statements are based on your bookkeeping records. If they are inaccurate, you cannot fulfill your filing obligations with ACRA, leading to fines.</li>
                    <li>**Cash Flow Blindness:** Without a clear, up-to-date view of your income, expenses, and bank balances, you cannot effectively manage your cash flow—the lifeblood of any small business.</li>
                    <li>**Increased Year-End Accounting Fees:** If your books are a mess, your accountant will have to spend significant time cleaning them up before they can prepare your annual accounts, resulting in much higher professional fees.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your bookkeeping to YourLegal is the most efficient way to manage your company's financial records. Our professional team uses modern, cloud-based software like Xero or QuickBooks to automate transaction entry and provide you with a real-time view of your finances. We ensure all your income and expenses are categorized correctly according to Singaporean accounting standards.</p>
                <p className="mt-4">This guarantees that your data is always clean, reconciled, and ready for your accountant to prepare your year-end financial statements and tax returns. By letting us handle the administrative burden of daily bookkeeping, you not only save countless hours but also gain the financial clarity needed to make smart, data-driven decisions for your business. It is the essential foundation for our comprehensive <Link href="/singapore/accounting" className="text-blue-600 hover:underline">accounting</Link> service.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
