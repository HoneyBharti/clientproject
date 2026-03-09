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
    { q: "Do I really need professional accounting, or can I use a spreadsheet?", a: "While a spreadsheet might work for a pre-revenue hobby, any registered business is legally required to keep accurate books. Professional accounting ensures you are compliant, tax-efficient, and have reliable data to make decisions. It's a foundational investment." },
    { q: "What's the difference between bookkeeping and accounting?", a: "Bookkeeping is the daily recording of financial transactions. Accounting is the higher-level process of analyzing, interpreting, and summarizing that data into financial statements (like the P&L and Balance Sheet) to provide business insights." },
    { q: "What is US GAAP?", a: "GAAP stands for Generally Accepted Accounting Principles. It's the common set of accounting standards and procedures that US companies must follow. GAAP compliance is required for audited financials and is expected by all serious investors and lenders." },
    { q: "How does outsourcing work?", a: "Our service connects to your business bank accounts via a secure API. Transactions are automatically imported and categorized by our system. Our team of human accountants then reviews everything for accuracy, reconciles the accounts, and prepares your monthly financial statements." },
    { q: "Can you help me with my taxes too?", a: "Yes. Our accounting service is the foundation for our tax compliance service. We use the clean, accurate data from your books to prepare and file your annual federal and state tax returns." },
    { q: "Is this service suitable for non-resident founders?", a: "Absolutely. Our accounting service is designed to handle the specific needs of foreign-owned US companies, including tracking transactions for informational returns like Form 5472." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/accounting" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Accounting
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Accounting FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Answers to common questions about our US accounting services.
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

