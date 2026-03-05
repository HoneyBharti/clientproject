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

export default function PrivacyPolicyPage() {
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
                Privacy Policy
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                Last updated: July 26, 2024
                </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                YourLegal Inc. ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                
                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                <p>We may collect personal information that you provide to us directly, such as your name, email address, company information, and payment details. We also collect information automatically as you navigate through the site.</p>

                <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                <li>Provide, operate, and maintain our services.</li>
                <li>Process your transactions and manage your account.</li>
                <li>Communicate with you, including responding to your comments, questions, and requests.</li>
                <li>Comply with legal obligations, including filings with state and federal agencies.</li>
                </ul>

                <h2 className="text-2xl font-bold">3. Data Security</h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information. All sensitive financial information is encrypted via Secure Socket Layer (SSL) technology.</p>
                
                <h2 className="text-2xl font-bold">4. Third-Party Disclosure</h2>
                <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                
                <h2 className="text-2xl font-bold">5. Your Rights</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us at contactus@yourlegal.in to make a request.</p>

                <h2 className="text-2xl font-bold">6. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </article>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}