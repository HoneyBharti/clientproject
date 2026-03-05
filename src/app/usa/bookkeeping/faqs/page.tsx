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
    { q: "What is bookkeeping?", a: "Bookkeeping is the systematic process of recording, categorizing, and reconciling all of your company's financial transactions on a daily basis. It is the foundation upon which all accounting and tax reporting is built." },
    { q: "Is bookkeeping a legal requirement in the US?", a: "Yes. The IRS legally requires all businesses to maintain accurate and permanent records of their income and expenses to support the figures reported on their tax returns." },
    { q: "What's the difference between a bookkeeper and an accountant?", a: "A bookkeeper is focused on the daily recording and accuracy of data. An accountant takes the bookkeeper's clean data and uses it to prepare financial statements, file taxes, and provide strategic advice." },
    { q: "What software do you use for bookkeeping?", a: "We primarily use industry-leading cloud accounting software like QuickBooks Online and Xero. These platforms allow for secure, real-time collaboration." },
    { q: "How do you get access to my bank transactions?", a: "We use a secure, encrypted, read-only service like Plaid to connect to your business bank and credit card accounts. This allows us to automatically import transaction data without ever seeing or storing your login credentials." },
    { q: "How often will my books be updated?", a: "Transactions are synced daily, and our team works on your books throughout the month. A full reconciliation and financial statement package is delivered to you monthly." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/bookkeeping" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Bookkeeping
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Bookkeeping FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your questions about our US bookkeeping services, answered.
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
