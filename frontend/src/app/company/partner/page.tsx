'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { HubspotForm } from '@/components/forms/hubspot-form';

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

export default function PartnerPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                &larr; Back to Home
            </Link>
            
            <header className="text-center mb-12">
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Partner with YourLegal
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Join our network of VCs, accelerators, and communities to empower the next generation of founders.
                </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                At YourLegal, we're building an ecosystem to support entrepreneurs at every stage of their journey. Our partners are crucial to this mission. By partnering with us, you can offer your portfolio companies, members, or audience a seamless solution for US entity formation, compliance, and financial management.
                </p>
                <h2 className="text-2xl font-bold">Why Partner With Us?</h2>
                <ul>
                <li><strong>Exclusive Benefits:</strong> Offer special discounts and priority support to your founders.</li>
                <li><strong>Streamlined Onboarding:</strong> We provide a white-glove service to get your companies started quickly and correctly.</li>
                <li><strong>Educational Resources:</strong> Gain access to our library of content, workshops, and expert sessions on US legal and tax matters.</li>
                <li><strong>Co-marketing Opportunities:</strong> Collaborate on events, content, and campaigns to reach a wider audience of global entrepreneurs.</li>
                </ul>
                <p>
                We partner with venture capital firms, startup accelerators, online communities, and educational platforms that share our commitment to founder success.
                </p>
                <div className="text-center pt-8">
                <Link href="/support/contact-sales">
                    <Button size="lg">Become a Partner</Button>
                </Link>
                </div>
            </article>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}

