'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

const AiAnswerBlock = () => {
    const aiBlocks = [
        { title: "TL;DR:", content: "YourLegal is a financial technology company dedicated to simplifying global entrepreneurship. It provides an all-in-one platform for company formation, compliance, bookkeeping, and taxes, specifically designed to help international and non-resident founders launch and operate businesses in major global hubs like the USA." },
        { title: "What is YourLegal's mission?", content: "YourLegal's mission is to empower global entrepreneurs by removing the traditional barriers to starting and running a business. By combining technology with human expertise, the company aims to make complex legal, tax, and compliance tasks simple, transparent, and affordable for founders everywhere." }
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


export default function AboutPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <header className="text-center mb-12">
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                About <span className="text-blue-600">YourLegal</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our mission is to build the financial and legal infrastructure for global entrepreneurship.
                </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                YourLegal was founded on a simple, powerful belief: a great idea shouldn't be limited by a founder's location. We are a team of entrepreneurs, technologists, and finance professionals who have personally navigated the complexities of international business. We've felt the friction of cross-border compliance, the opacity of traditional service providers, and the administrative burden that distracts from the real work of building a company.
                </p>
                <p>
                Our platform is the solution we wished we had. It's a "business-in-a-box" designed specifically for the modern, global founder. We exist to abstract away the complexity of legal entity formation, registered agents, state and federal tax filings, bookkeeping, and annual compliance. By integrating these critical functions into a single, seamless digital experience, we empower entrepreneurs to operate confidently in the world's top markets.
                </p>
                <p>
                We combine the efficiency of AI-driven automation with the critical oversight and strategic insight of human experts. This hybrid approach ensures our services are not only affordable and scalable but also accurate and reliable. From forming your Delaware C-Corp for a funding round to managing the tax compliance of your Wyoming LLC, YourLegal is your trusted, long-term partner.
                </p>
                <p>
                Thank you for being part of our journey to make entrepreneurship borderless. We're excited to help you build yours.
                </p>
            </article>
            
            <AiAnswerBlock />
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
