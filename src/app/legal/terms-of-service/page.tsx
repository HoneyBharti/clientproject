'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

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
                    <HubspotForm portalId="46429315" formId="8933411b-31d7-4638-8924-4a4b2b192801" />
                </div>
            </div>
        </div>
    </section>
);


export default function TermsOfServicePage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                &larr; Back to Home
            </Link>
            
            <header className="mb-12">
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Terms of Service
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                Last updated: July 26, 2024
                </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                Please read these Terms of Service ("Terms") carefully before using the YourLegal website and services operated by YourLegal Inc.
                </p>
                
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

                <h2 className="text-2xl font-bold">2. No Legal Advice</h2>
                <p>YourLegal is not a law firm and does not provide legal advice. Our services are for informational purposes only and are not a substitute for advice from a qualified attorney. Your use of our services does not create an attorney-client relationship.</p>
                
                <h2 className="text-2xl font-bold">3. Services</h2>
                <p>We provide company formation, compliance, bookkeeping, and tax filing services. We act as a facilitator and third-party filer on your behalf. The accuracy of the information you provide is your responsibility.</p>
                
                <h2 className="text-2xl font-bold">4. Fees and Payment</h2>
                <p>You agree to pay all fees associated with your chosen plan. All state filing fees are separate and are passed through to you without markup. Our service fees are non-refundable after 30 days.</p>
                
                <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
                <p>In no event shall YourLegal Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

                <h2 className="text-2xl font-bold">6. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p>
            </article>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
