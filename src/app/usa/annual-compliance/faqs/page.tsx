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
    { q: "What is an Annual Report?", a: "An Annual Report is a mandatory filing with your company's state of formation. It updates basic information like your company's address, directors, and registered agent. It is required to keep your company in 'good standing'." },
    { q: "Is an Annual Report the same as a tax return?", a: "No. They are completely different filings submitted to different government agencies. The Annual Report goes to the state's Secretary of State for corporate governance, while the tax return goes to the IRS for tax purposes. You must file both." },
    { q: "What is a franchise tax?", a: "A franchise tax is a fee paid to a state for the privilege of having a company incorporated there. It is not based on profit. Delaware's annual $300 LLC tax is a well-known example." },
    { q: "What happens if I miss a filing?", a: "Missing a state filing deadline results in automatic late fees and a loss of your company's 'good standing' status. If the failure persists, the state can administratively dissolve your company." },
    { q: "How does YourLegal handle my annual compliance?", a: "Our Vitals and Elite plans include full management of your annual compliance. We track all deadlines, prepare the reports, and file them on your behalf, ensuring you never miss a deadline." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/annual-compliance" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Annual Compliance
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Annual Compliance FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your questions about US state annual filing requirements, answered.
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
