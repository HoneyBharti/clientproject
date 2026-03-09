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
    { q: "What is an LLC?", a: "An LLC (Limited Liability Company) is a business structure that provides liability protection, separating your personal assets from business debts. It's a popular choice for its flexibility and pass-through taxation." },
    { q: "What is a C-Corp?", a: "A C-Corporation is a separate legal and tax-paying entity. It's the standard for startups seeking venture capital because it can issue stock to investors. Profits are taxed at the corporate level." },
    { q: "What is the difference between Delaware and Wyoming?", a: "Delaware is the top choice for C-Corps raising venture capital due to its robust corporate law. Wyoming is favored for LLCs due to its low costs and strong privacy protections (it does not list owner names publicly)." },
    { q: "Do I need a US address or visa to form a company?", a: "No. You can form a US company from anywhere in the world. You do need a Registered Agent with a physical address in your state of formation, which our service provides." },
    { q: "What is an EIN?", a: "An Employer Identification Number (EIN) is a federal tax ID for your business, like a Social Security Number for a company. It's required to open a US bank account and file taxes." },
    { q: "Can I get an EIN as a non-resident?", a: "Yes. The process is more complex without a Social Security Number, requiring a manual application to the IRS. Our service specializes in handling this process for non-resident founders." },
    { q: "How long does the formation process take?", a: "State filing typically takes 2-5 business days. Obtaining an EIN for a non-resident can take several weeks. We manage the entire process to make it as fast as possible." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/company-formation" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Company Formation
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Company Formation FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Answers to common questions about forming a US company with YourLegal.
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

