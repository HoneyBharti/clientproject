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
    { q: "What is cross-border accounting?", a: "It's a specialized field of accounting that deals with the financial complexities of businesses operating in multiple countries. This includes managing different currencies, tax laws, accounting standards, and regulations like transfer pricing." },
    { q: "My business is small. Do I still need this?", a: "If your US company is owned by a non-resident or has any foreign financial dealings (even just a foreign bank account), you are subject to US international tax rules. The complexity applies regardless of size." },
    { q: "What is transfer pricing?", a: "Transfer pricing is the set of rules that govern how you price transactions between related companies (e.g., your US sub and foreign parent). Prices must be 'at arm's length,' meaning what you would charge an unrelated company. The IRS strictly enforces this to prevent profit shifting." },
    { q: "What is the US withholding tax?", a: "It's a tax (typically 30%) that a US company must withhold on certain payments like dividends or royalties made to a foreign owner. This can often be reduced by a tax treaty, which requires professional analysis to apply correctly." },
    { q: "How can YourLegal help?", a: "Our cross-border accounting service provides the specialized expertise to manage these complex issues. We handle multi-currency bookkeeping, ensure compliance with informational returns, advise on transfer pricing, and help you structure your operations for global tax efficiency." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/cross-border-accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Cross-Border Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Cross-Border Accounting FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your questions about our international accounting and tax services, answered.
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

