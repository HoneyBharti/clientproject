
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

export default function CrossBorderAccountingServicePage() {
  const serviceName = "Cross-Border Accounting";
  const countryName = "Singapore";
  const primaryKeyword = "Cross-border accounting Singapore";

  const aiBlocks = [
    { title: "What is Cross-Border Accounting?", content: "For a Singaporean entity, this involves managing multi-currency transactions, applying tax treaties to prevent double taxation, handling transfer pricing between international related entities, and consolidating financials from foreign subsidiaries." },
    { title: "Who needs it?", content: "Singapore holding companies with foreign subsidiaries, international businesses using Singapore as an APAC hub, and companies with significant sales or expenses in currencies like USD, EUR, or AUD." },
    { title: "Cost range?", content: "This is a specialized service with custom pricing, typically starting from S$1,200+ per month, reflecting the expertise needed for international tax planning and financial consolidation." },
    { title: "DIY vs outsourcing?", content: "DIY is not feasible. The complexities of transfer pricing, tax treaties, and multi-jurisdiction reporting require expert guidance. Outsourcing is essential to mitigate tax risks and ensure compliance." },
    { title: "Final decision summary", content: "To leverage Singapore's tax treaties and holding company regime effectively, and to manage global financial risks, outsourcing cross-border accounting is a mandatory strategic investment." }
  ];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cross-Border Accounting Services",
    "provider": {
        "@type": "Organization",
        "name": "YourLegal AI"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Singapore"
    },
    "description": `Expert cross-border accounting for Singapore companies. We handle transfer pricing, multi-currency accounting, tax treaty application, and financial consolidation for APAC operations.`,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Singapore Cross-Border Accounting Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Cross-Border Accounting Retainer (Singapore)"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "1200",
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
              {serviceName} Services for {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial strategy for your Singapore company, focusing on tax treaty benefits, transfer pricing, and multi-currency management for your APAC and global operations.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Cross-border accounting is a critical service for companies that use Singapore as a hub for their international business activities. This includes Singaporean holding companies that own subsidiaries in other countries, multinational corporations with a regional headquarters in Singapore, e-commerce businesses selling across Southeast Asia, and any company that regularly deals with multiple currencies (e.g., USD, AUD, EUR) and international supply chains.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>This service becomes essential as soon as your business operations extend beyond Singapore's borders. It is mission-critical when you establish your first foreign subsidiary, begin making inter-company transactions (such as loans or management fees between related entities), or start generating significant revenue in foreign currencies. Proactive management of these cross-border issues is key to leveraging Singapore's tax advantages and avoiding costly compliance pitfalls.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Singapore">
                <p>Cross-border accounting is a high-value, strategic service, and the pricing reflects the deep expertise required to navigate international tax and finance. Costs are customized based on the complexity of your global structure:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Core International Package (e.g., multi-currency reporting, GST on exports):** Starting from S$1,200 – S$3,000 per month.</li>
                    <li>**Advanced Holding Company Management (e.g., transfer pricing, tax treaty analysis):** S$3,000 – S$8,000+ per month.</li>
                </ul>
                <p className="mt-4">This investment is designed to optimize your global tax position and prevent costly errors, delivering a return far greater than the fee itself.</p>
            </ContentSection>

            <ContentSection title="Compliance Risks">
                <p>Managing the finances of a global business from Singapore without specialist knowledge is fraught with risk:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Transfer Pricing Violations:** IRAS, like other tax authorities, scrutinizes transactions between related international companies. Non-arm's length pricing can lead to significant tax adjustments and penalties.</li>
                    <li>**Double Taxation:** Without correctly applying Singapore's extensive network of over 90 tax treaties, your company's profits could be taxed twice—once in the foreign country and again in Singapore.</li>
                    <li>**Foreign Exchange (FX) Losses:** Unhedged or poorly managed foreign currency exposure can lead to significant reported losses that can wipe out operating profits.</li>
                    <li>**Controlled Foreign Corporation (CFC) Rules:** Both Singaporean and foreign tax authorities have rules designed to prevent companies from artificially shifting profits to low-tax jurisdictions. A poorly structured international operation can fall foul of these rules.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your cross-border accounting is the only practical model for most businesses. It's not feasible to hire an in-house team with expertise in the tax laws of every country you operate in. YourLegal provides a centralized team of experts who understand the intricate relationship between Singapore's tax system and those of other major economies.</p>
                <p className="mt-4">We ensure your transfer pricing policies are documented and defensible, help you structure your operations to benefit from Singapore's favorable tax treaties, and manage multi-currency consolidations accurately. This strategic oversight is a core component of our <Link href="/singapore/virtual-cfo" className="text-blue-600 hover:underline">Virtual CFO service</Link>, transforming your Singapore company from a simple legal entity into a powerful and tax-efficient engine for your global expansion.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
