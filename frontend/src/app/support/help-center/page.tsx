'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
        </div>
    </section>
);

export default function HelpCenterPage() {
  const faqs = [
    {
      category: "Formation",
      questions: [
        { q: "How long does it take to form an LLC?", a: "Typically, formation takes 2-5 business days depending on the state. Wyoming is often faster than Delaware." },
        { q: "What is an EIN and why do I need one?", a: "An Employer Identification Number (EIN) is a federal tax ID for your business. It's required to open a US bank account, hire employees, and file taxes." },
      ],
    },
    {
      category: "Taxes & Compliance",
      questions: [
        { q: "Do I have to file US taxes if my company has no revenue?", a: "Yes, even zero-revenue companies have filing obligations, such as the pro-forma Form 1120 and Form 5472 for foreign-owned LLCs." },
        { q: "What is a Registered Agent?", a: "A Registered Agent is a designated person or entity that receives official legal and state correspondence on behalf of your company. It is a mandatory requirement." },
      ],
    },
    {
      category: "Billing",
      questions: [
        { q: "What is included in the annual fee?", a: "The annual fee covers your registered agent service, annual compliance filings, and access to our platform and support." },
        { q: "Can I get a refund?", a: "We offer a 30-day money-back guarantee on our service fees. State filing fees are non-refundable once submitted." },
      ],
    },
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                &larr; Back to Home
            </Link>
            
            <header className="text-center mb-12">
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Help Center
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our services.
                </p>
                <div className="mt-8 relative max-w-lg mx-auto">
                <Input type="search" placeholder="Search for answers..." className="pl-10 h-12 text-lg"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </header>

            <div className="space-y-10">
                {faqs.map((categoryItem) => (
                <div key={categoryItem.category}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{categoryItem.category}</h2>
                    <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg border">
                    {categoryItem.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.q}</AccordionTrigger>
                        <AccordionContent>
                            {faq.a}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </div>
                ))}
            </div>
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}

