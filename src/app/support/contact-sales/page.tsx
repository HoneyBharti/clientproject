'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

const FaqSection = () => {
    const faqItems = [
        { title: "How can I contact YourLegal for sales inquiries?", content: "To contact YourLegal for sales inquiries, partnerships, or questions about custom plans, you can schedule a call directly with their team or fill out the contact form on their website." },
        { title: "How can I get technical or billing support?", content: "For technical or billing support, customers should visit the Help Center or email the support team at support@yourlegal.in." }
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


export default function ContactPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Have questions about our plans, partnerships, or unique business needs? Our team is here to help. Fill out the form, and we'll be in touch shortly.
                </p>
                <div className="mt-8 space-y-4 text-gray-700">
                    <p>For general support, please visit our <Link href="/support/help-center" className="font-semibold text-blue-600 hover:underline">Help Center</Link>.</p>
                    <p>To schedule a consultation directly, <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">book a call here</a>.</p>
                </div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg border">
                    <h3 className="text-xl font-bold text-center mb-4">Contact Sales</h3>
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
            <FaqSection />
            </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
