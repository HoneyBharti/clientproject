'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';

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


export default function CareersPage() {
  const openPositions = [
    { title: "Senior Tax Accountant", location: "Remote (US)", department: "Finance" },
    { title: "Full-Stack Software Engineer", location: "Remote (Global)", department: "Engineering" },
    { title: "Customer Success Manager", location: "Remote (EMEA)", department: "Customer Success" },
  ];

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
                Careers at YourLegal
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Join our mission to make entrepreneurship accessible to everyone, everywhere.
                </p>
            </header>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Open Positions</h2>
                <div className="space-y-4">
                {openPositions.length > 0 ? (
                    openPositions.map((position, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
                        <div>
                        <h3 className="text-lg font-semibold text-blue-600">{position.title}</h3>
                        <p className="text-sm text-gray-600">{position.department} &middot; {position.location}</p>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center py-8">
                    We don't have any open positions at the moment, but we're always looking for talented people. Feel free to send your resume to careers@yourlegal.in.
                    </p>
                )}
                </div>
            </div>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
