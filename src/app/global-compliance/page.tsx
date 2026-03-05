'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Landmark, FileCheck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HubspotForm } from '@/components/hubspot-form';

const FaqSection = () => {
    const faqItems = [
        { title: "What is YourLegal's Global Compliance service?", content: "YourLegal's Global Compliance service is an automated solution that manages critical legal and financial obligations for businesses. It covers three main pillars: Entity Management (state annual reports), Tax Compliance (federal/state tax returns), and Financial Compliance (bookkeeping and FinCEN's BOI reporting), ensuring companies remain in good standing." },
        { title: "What obligations does this service cover?", content: "It is a suite of services designed to handle the mandatory legal, tax, and financial reporting requirements for companies operating in jurisdictions like the US. This includes filing annual reports with the state, preparing and filing federal and state tax returns, maintaining accurate financial records (bookkeeping), and filing necessary reports like the Beneficial Ownership Information (BOI) report with FinCEN." }
    ];

    return (
        <section className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CompliancePillar = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 flex-grow">{description}</p>
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
  

export default function GlobalCompliancePage() {
  return (
    <div className="bg-gray-50 font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Global <span className="text-blue-600">Compliance</span> Overview
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Automated compliance to keep your business safe and in good standing, no matter where you operate.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CompliancePillar 
                icon={Landmark}
                title="Entity Management"
                description="We handle mandatory state-level filings to ensure your company maintains its 'Good Standing' status. This includes preparing and filing Annual Reports and managing Franchise Tax payments, preventing penalties or administrative dissolution."
                />
                <CompliancePillar 
                icon={FileCheck}
                title="Tax Compliance"
                description="From federal to state level, we manage your annual tax obligations. Our service includes the preparation and e-filing of corporate income tax returns (like IRS Form 1120 or 1065), ensuring you meet all deadlines and requirements."
                />
                <CompliancePillar 
                icon={Shield}
                title="Financial & Federal Compliance"
                description="We ensure compliance with crucial federal regulations beyond taxes. This includes maintaining accurate books and filing the mandatory Beneficial Ownership Information (BOI) Report with FinCEN to comply with the Corporate Transparency Act."
                />
            </div>

            <div className="text-center mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Compliant, Stay Focused</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Let us handle the regulatory burdens so you can focus on building your business.</p>
                <Button size="lg" asChild>
                    <Link href="/usa">Explore Our Compliance Plans</Link>
                </Button>
            </div>

            <FaqSection />
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
