'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    { q: "What is a Virtual CFO?", a: "A Virtual Chief Financial Officer (vCFO) is an outsourced service that provides high-level, strategic financial leadership to companies on a part-time basis. They focus on forward-looking activities like financial forecasting, fundraising support, and strategic planning, rather than day-to-day bookkeeping." },
    { q: "How is a vCFO different from an accountant?", a: "An accountant primarily focuses on historical data—recording transactions, ensuring compliance, and preparing tax returns. A vCFO focuses on the future—using financial data to build forecasts, manage cash flow, and guide strategic decisions to increase enterprise value." },
    { q: "When should my startup consider a vCFO?", a: "You should consider a vCFO when you're preparing to raise your first significant round of funding, when your business operations become complex enough that you need sophisticated financial models to make decisions, or when you find yourself spending too much time on finance instead of growth." },
    { q: "Is a vCFO a full-time role?", a: "No, the 'virtual' and fractional nature is the key benefit. You get access to an experienced, executive-level professional for a fraction of the cost of a full-time, in-house CFO, whose annual salary is typically $250,000+." },
    { q: "What is the main deliverable from a vCFO?", a: "The main deliverable is a dynamic, three-statement financial model and the monthly/quarterly management reports that are derived from it. These reports provide insights into KPIs, cash runway, and budget vs. actual performance, which are essential for managing the business and reporting to investors." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/virtual-cfo" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Virtual CFO
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Virtual CFO FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your questions about our US Virtual CFO services, answered.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent>
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
