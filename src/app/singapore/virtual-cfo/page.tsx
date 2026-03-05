
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

export default function VirtualCfoServicePage() {
  const serviceName = "Virtual CFO";
  const countryName = "Singapore";
  const primaryKeyword = "Virtual CFO services Singapore";

  const aiBlocks = [
    { title: "What is a Virtual CFO?", content: "A Virtual CFO provides high-level, strategic financial leadership for your Singapore business on a part-time basis. This includes financial planning, cash flow management, fundraising support, and investor reporting." },
    { title: "Who needs it?", content: "Funded startups, scale-ups, and companies planning regional expansion from Singapore that need executive-level financial strategy without the S$200k+ cost of a full-time CFO." },
    { title: "Cost range?", content: "Typically S$2,000 to S$7,000+ per month, depending on the level of engagement, reporting complexity, and whether fundraising support is required." },
    { title: "DIY vs outsourcing?", content: "This is not a DIY role. Outsourcing provides access to seasoned financial executives with experience scaling businesses in the Singapore and APAC markets." },
    { title: "Final decision summary", content: "To navigate the financial complexities of scaling a business in Singapore and to successfully raise capital from regional VCs, a Virtual CFO service is an essential strategic asset." }
  ];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Virtual CFO Services",
    "provider": {
        "@type": "Organization",
        "name": "YourLegal AI"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Singapore"
    },
    "description": `Strategic Virtual CFO services in Singapore. We provide financial modeling, investor reporting, cash flow management, and fundraising support for startups and scale-ups.`,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Singapore Virtual CFO Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Growth Advisory CFO (Singapore)"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "2000",
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
              Strategic financial leadership to help you scale, raise capital from APAC investors, and maximize profitability.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our Virtual CFO services in Singapore are designed for ambitious businesses that need high-level financial strategy beyond routine accounting. This includes venture-backed startups preparing for their next funding round, established SMEs seeking to optimize profitability, and international companies using Singapore as their APAC headquarters. It is for founders and CEOs who need a strategic financial partner to help them navigate the opportunities and challenges of the fast-growing Asian market.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A Virtual CFO becomes critical when your business strategy involves key financial decisions. This includes building a sophisticated financial model to present to Singapore-based VCs, forecasting cash flow for regional expansion, analyzing unit economics for market entry into countries like Indonesia or Vietnam, preparing board reports, and developing a financial roadmap for an eventual IPO on the SGX or a strategic acquisition.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Singapore">
                <p>A full-time CFO in Singapore is a major executive expense, often exceeding S$200,000 per year. Our Virtual CFO service offers access to the same calibre of strategic talent on a flexible, part-time basis. Pricing is customized based on the depth of engagement required:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Growth Advisory Package:** S$2,000 – S$4,000 per month. This includes services like financial modeling, KPI dashboard setup, and regular strategic reviews.</li>
                    <li>**Comprehensive CFO Support (Fundraising/M&A):** S$4,000 – S$7,000+ per month. This provides intensive support for active fundraising, due diligence preparation, board meeting participation, and treasury management.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Strategic & Compliance Risks">
                <p>Scaling a business in the competitive APAC region without senior financial leadership is a significant strategic risk. It can lead to:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Uncontrolled Cash Burn:** Running out of capital due to poor cash flow forecasting, which is particularly dangerous when operating across multiple currencies.</li>
                    <li>**Failed Fundraising Efforts:** Inability to provide regional VCs with the sophisticated financial models, cohort analysis, and data they expect during due diligence.</li>
                    <li>**Poor Unit Economics:** Lack of analysis on Customer Acquisition Cost (CAC) and Lifetime Value (LTV) for different APAC markets, leading to unprofitable growth strategies.</li>
                    <li>**Inefficient Tax Structuring:** Failure to leverage Singapore's tax treaties and holding company regime, resulting in unnecessary tax leakage from foreign subsidiaries.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing the CFO function is the proven model for high-growth companies in Singapore. It provides access to seasoned financial executives who bring a wealth of experience from scaling multiple businesses across Asia. YourLegal's Virtual CFO service connects you with partners who have a deep understanding of the regional venture capital landscape, cross-border tax issues, and the operational challenges of a multi-market strategy.</p>
                <p className="mt-4">You gain immediate access to best-practice financial models, KPI frameworks, and fundraising strategies, allowing you to make smarter decisions and present a more professional and compelling case to investors. It is the most capital-efficient way to embed high-level financial strategy into your business. This service is the pinnacle of our <Link href="/singapore/accounting" className="text-blue-600 hover:underline">accounting</Link> and <Link href="/singapore/cross-border-accounting" className="text-blue-600 hover:underline">cross-border accounting</Link> offerings, providing a complete and strategic finance function for your company.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
