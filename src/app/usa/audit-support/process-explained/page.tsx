
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft } from 'lucide-react';

const AiAnswerBlock = ({ blocks }) => (
    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-6">
            {blocks.map((block, index) => (
                <div key={index}>
                    <h4 className="font-semibold text-gray-700">{block.title}</h4>
                    <p className="text-gray-600">{block.content}</p>
                </div>
            ))}
        </div>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

export default function ProcessExplainedPage() {
    const aiBlocks = [
        { title: "What is your audit support process?", content: "Our process includes a readiness assessment, document preparation (the PBC list), acting as the primary liaison with the auditors, and supporting the review and finalization of the audit report. We manage the entire project to ensure a smooth outcome." },
        { title: "What is a PBC list?", content: "PBC stands for 'Provided By Client.' It is a detailed list of documents, schedules, and reports that the independent auditors request at the beginning of an audit. Our team prepares and organizes all items on this list for you." },
        { title: "Do I need to interact with the auditors?", content: "No. Our audit support team acts as the single point of contact with the auditors. We handle their questions and requests, allowing you and your team to remain focused on running the business with minimal disruption." }
    ];

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
              Our Audit Support Process
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step look at how we prepare your company for a successful financial audit.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Audit Readiness Assessment" description="We begin by reviewing your existing financial records, accounting policies, and internal controls to identify any potential issues or gaps before the auditors are engaged. This allows us to proactively address problems." />
            
            <ProcessStep number="2" title="PBC List Preparation" description="Once the audit begins, the auditors will provide a 'Provided By Client' (PBC) list. Our team takes full responsibility for preparing every item on this list, which includes detailed financial schedules, supporting documentation, and policy documents." />

            <ProcessStep number="3" title="Auditor Liaison & Management" description="We act as the primary point of contact for the independent audit team. We handle their questions, provide clarifications, and manage the flow of information, shielding your management team from the day-to-day burden of the audit." />

            <ProcessStep number="4" title="Review & Finalization" description="We work with the auditors to review their findings, discuss any proposed adjustments, and ensure the final audit report is accurate before it is issued to you and your stakeholders." />
            
            <ProcessStep number="5" title="Post-Audit Remediation" description="If the audit identifies any weaknesses in your internal controls, we work with you to implement new processes and systems to strengthen your financial operations for the future." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
