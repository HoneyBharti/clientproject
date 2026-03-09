'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { HubspotForm } from '@/components/forms/hubspot-form';
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


export default function RefundPolicyPage() {
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
                Refund Policy
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                Last updated: July 26, 2024
                </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <h2 className="text-2xl font-bold">Our Commitment</h2>
                <p>
                We are committed to your satisfaction. Our refund policy is designed to be fair and transparent.
                </p>
                
                <h2 className="text-2xl font-bold">30-Day Money-Back Guarantee</h2>
                <p>
                If you are not satisfied with our service for any reason, you may request a full refund of YourLegal's service fees within 30 days of your purchase date.
                </p>
                <p>
                This guarantee applies to our subscription and service fees only.
                </p>

                <h2 className="text-2xl font-bold">Non-Refundable Fees</h2>
                <p>
                The following fees are non-refundable:
                </p>
                <ul>
                <li><strong>State Filing Fees:</strong> Once we submit your formation documents to the state, the state filing fees cannot be refunded as the state does not offer refunds.</li>
                <li><strong>Third-Party Fees:</strong> Any fees paid to third parties on your behalf (e.g., publication fees, courier fees) are non-refundable.</li>
                </ul>
                
                <h2 className="text-2xl font-bold">How to Request a Refund</h2>
                <p>To request a refund, please contact our support team at contactus@yourlegal.in with your order number and the reason for your request. Refunds will be processed to the original method of payment within 5-10 business days.</p>
            </article>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
