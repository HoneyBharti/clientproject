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
  const countryName = "Australia";
  const primaryKeyword = "Virtual CFO services Australia";

  const aiBlocks = [
    { title: "What is a Virtual CFO?", content: "A Virtual CFO provides high-level strategic financial leadership, including budgeting, forecasting, cash flow management, and investor reporting, on a flexible, part-time basis." },
    { title: "Who needs it?", content: "Australian startups and scale-ups that need expert financial strategy to manage growth, prepare for fundraising, or navigate complex financial decisions without the cost of a full-time executive." },
    { title: "Cost range?", content: "Typically AUD $2,000 to $6,000+ per month, depending on the level of engagement and complexity. This is a fraction of a full-time CFO's salary." },
    { title: "DIY vs outsourcing?", content: "This strategic function cannot be DIY. Outsourcing is the model, providing access to experienced financial executives who have guided multiple companies through growth phases." },
    { title: "Final decision summary", content: "To effectively manage growth, secure funding, and make data-driven financial decisions in the Australian market, a Virtual CFO service is an essential strategic investment." }
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
            "name": "Australia"
        },
        "description": `On-demand strategic financial leadership to drive growth, profitability, and investor confidence for your Australian business.`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Australia Virtual CFO Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Growth Advisory CFO"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "2000",
                        "priceCurrency": "AUD",
                        "unitText": "month"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Fundraising & M&A CFO"
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000",
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
              On-demand strategic financial leadership to drive growth, profitability, and investor confidence for your Australian business.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Who This Service Is For">
                <p>Our Virtual CFO services in Australia are for ambitious startups, fast-growing SMEs, and businesses preparing for major financial events like a capital raise or acquisition. It is designed for founders who have moved beyond basic bookkeeping and require a strategic financial partner to help navigate the complexities of scaling a business in the competitive Australian market.</p>
            </ContentSection>
            
             <ContentSection title="When It Is Required">
                <p>A Virtual CFO becomes essential when your business faces key strategic questions: How do we fund our next stage of growth? What are our key financial metrics and how do they benchmark against the industry? How do we build a robust financial model to present to investors? It is required when you need forward-looking financial strategy, not just historical reporting.</p>
            </ContentSection>

            <ContentSection title="Cost Ranges in Australia">
                <p>A full-time CFO in Australia can command a salary of AUD $200,000+. Our Virtual CFO service provides access to the same level of expertise at a fraction of the cost, with pricing tailored to your needs:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>**Growth Advisory:** AUD $2,000 – $4,000 per month for services like budgeting, KPI dashboards, and strategic planning sessions.</li>
                    <li>**Fundraising & M&A Support:** AUD $4,000 – $8,000+ per month for intensive support including financial modelling, due diligence preparation, and board reporting.</li>
                </ul>
            </ContentSection>

            <ContentSection title="Strategic & Compliance Risks">
                <p>Operating a growing business without senior financial leadership is a major strategic risk. It can lead to:</p>
                 <ul className="list-disc pl-6 space-y-2">
                    <li>**Inefficient Cash Burn:** Running out of capital due to poor cash flow forecasting and management.</li>
                    <li>**Stalled Fundraising:** Inability to provide investors with the sophisticated financial models and data they require for due diligence.</li>
                    <li>**Missed Growth Opportunities:** Lack of financial analysis to support strategic decisions on pricing, market entry, or product development.</li>
                    <li>**Poor Decision Making:** Making critical business decisions based on gut feel rather than robust financial data.</li>
                </ul>
            </ContentSection>

             <ContentSection title="Why Outsourcing Works Better">
                <p>Outsourcing your CFO function is the industry standard for startups and scale-ups. It is not about replacing a role, but about acquiring a strategic partner. YourLegal's Virtual CFO service connects you with seasoned financial executives who bring a wealth of experience from guiding multiple Australian companies through similar growth journeys. You gain immediate access to best-practice financial modeling, KPI frameworks, and fundraising strategies, allowing you to make smarter decisions and present a more professional and compelling case to investors. It's the most capital-efficient way to embed high-level financial strategy into your business. Pair this with our <Link href="/australia/accounting" className="text-blue-600 hover:underline">comprehensive accounting services</Link> for a complete finance function.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
