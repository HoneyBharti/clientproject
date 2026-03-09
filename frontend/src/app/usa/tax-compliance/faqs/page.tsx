'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { ChevronLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    { q: "What is tax compliance?", a: "Tax compliance is the process of preparing and filing all required tax returns and informational forms with the correct federal and state authorities by their specified deadlines. It also includes paying any taxes owed in a timely manner." },
    { q: "Do I have to file taxes if my company made no money?", a: "Yes. Every registered US business must file an annual tax return with the IRS, even if it had zero revenue and zero expenses. This is known as a 'zero-dollar' or 'nil' return. For foreign-owned LLCs, this is especially critical due to the Form 5472 requirement." },
    { q: "What's the difference between a state annual report and a state tax return?", a: "A state annual report is filed with the Secretary of State to maintain your company's legal good standing. A state tax return is filed with the state's Department of Revenue to report and pay income or franchise tax. They are separate filings with different deadlines." },
    { q: "What is Form 5472 and do I need to file it?", a: "Form 5472 is a critical informational return for any US company that is at least 25% foreign-owned and has had transactions with its foreign owner. If you are a non-resident who owns a US LLC, you almost certainly need to file this. The penalty for not filing is $25,000." },
    { q: "Can I file an extension?", a: "Yes, you can file Form 7004 to get an automatic six-month extension to file your business tax return. However, this is an extension to *file*, not an extension to *pay*. You must still estimate and pay any taxes owed by the original deadline." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/tax-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Tax Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Tax Compliance FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Answers to common questions about our US tax preparation and filing services.
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

