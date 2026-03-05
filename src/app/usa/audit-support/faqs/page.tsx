
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
    { q: "What is audit support?", a: "Audit support is a service where we prepare your company's financial records and documentation to be ready for an audit. We also manage the audit process by liaising with the independent auditors on your behalf, answering their questions, and providing required schedules." },
    { q: "Does YourLegal perform the audit itself?", a: "No. To maintain independence, which is legally required, an audit must be performed by a third-party CPA firm. We act as your internal finance team to prepare for and manage the audit, but the audit opinion itself comes from the independent firm." },
    { q: "When do I need audit support?", a: "You need audit support if your company is contractually required to undergo a financial statement audit (e.g., by your investors or bank) or if you are preparing for a potential acquisition (M&A). Our support ensures the process is smooth and successful." },
    { q: "What is an 'audit-ready' close?", a: "This means your monthly or annual bookkeeping is performed to the same high standard of documentation and compliance (US GAAP) that an auditor would require. Having 'audit-ready' books dramatically simplifies and reduces the cost of a formal audit." },
    { q: "Can you help with an IRS tax audit?", a: "Yes. Our tax professionals can represent you before the IRS. We will handle all communication with the agent, prepare all requested documentation from your financial records, and work to achieve the best possible outcome." },
];

export default function FaqsPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/audit-support" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Audit Support
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Audit Support FAQs
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your questions about our audit preparation and support services, answered.
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
