'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { CheckCircle, Shield, Globe, Zap, Users, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HubspotForm } from '@/components/hubspot-form';

const FaqSection = () => (
    <section className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg text-gray-900">What is YourLegal?</h3>
                <p className="text-gray-600 mt-1">YourLegal is an all-in-one platform for global entrepreneurs to form, manage, and maintain compliance for their businesses in the USA and other major hubs. It combines technology automation with human expertise to handle company formation, registered agent services, bookkeeping, and tax filings, simplifying complex administrative tasks for non-resident founders.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-900">What does YourLegal do?</h3>
                <p className="text-gray-600 mt-1">YourLegal provides a comprehensive suite of services to help international founders launch and operate businesses. This includes company formation (LLC & C-Corp), registered agent services, automated and human-led bookkeeping, federal and state tax filings, and ongoing compliance management through a unified digital platform.</p>
            </div>
        </div>
    </section>
);

const Principle = ({ icon: Icon, title, description }) => (
  <div>
        <div className="flex items-center mb-2">
            <Icon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 pl-9">{description}</p>
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


export default function WhyChooseUsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Why Founders Choose <span className="text-blue-600">YourLegal</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We're more than a formation service; we're your long-term partner for global compliance and growth.
                </p>
            </header>

            <div className="space-y-12">
                <Principle 
                icon={Globe}
                title="Built for Global Founders"
                description="Our entire platform is designed for the unique challenges of non-resident entrepreneurs. From remote-first processes to handling international tax complexities (like Form 5472), we provide the infrastructure you need to operate confidently from anywhere in the world."
                />
                <Principle 
                icon={Shield}
                title="All-in-One Compliance Platform"
                description="Stop juggling multiple providers. We integrate formation, registered agent services, annual filings, bookkeeping, and tax preparation into a single, unified dashboard. This simplifies your operations and ensures you never miss a critical deadline."
                />
                <Principle 
                icon={Zap}
                title="Technology + Human Expertise"
                description="We leverage AI-powered automation to make bookkeeping and compliance efficient and affordable. But we don't stop there. Every account is supported by a team of human experts—bookkeepers and tax professionals—to ensure accuracy and provide strategic guidance when you need it."
                />
                <Principle 
                icon={BarChart}
                title="Transparent & Predictable Pricing"
                description="No hidden fees or surprise invoices. Our clear, subscription-based plans cover your ongoing compliance needs, allowing you to budget effectively and avoid the costly hourly rates of traditional firms. See our full pricing philosophy for more details."
                />
            </div>
            
            <div className="text-center mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Launch?</h2>
                <p className="text-lg text-gray-600 mb-8">Join thousands of founders who trust YourLegal to manage their business compliance.</p>
                <Button size="lg" asChild>
                    <Link href="/usa">Get Started</Link>
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
