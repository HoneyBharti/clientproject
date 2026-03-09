'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
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
        { title: "What is the annual compliance process?", content: "Our process involves four steps: 1) We monitor all state filing deadlines for your company. 2) We prepare the necessary Annual Report and/or Franchise Tax forms. 3) We submit the filings to the state on your behalf. 4) We provide confirmation and update your company's status to 'Good Standing' in your portal." },
        { title: "Is this process automated?", content: "Yes. Once you are subscribed to our Vitals or Elite plan, our compliance system automatically tracks your deadlines and initiates the filing process. You don't have to worry about remembering dates." },
        { title: "What information do you need from me?", content: "For the initial setup, we confirm your company details. For ongoing annual filings, we typically require no action from you, as we handle the entire process. We will only contact you if the state requires specific information that has changed, such as a company address." }
    ];

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
              Our Annual Compliance Process
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              How we keep your US company compliant and in good standing, year after year.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessStep number="1" title="Deadline Monitoring" description="Our compliance platform automatically tracks all mandatory filing deadlines for your specific state of incorporation, including Annual Reports and Franchise Tax payments." />
            
            <ProcessStep number="2" title="Report Preparation" description="Ahead of the deadline, our compliance team prepares all necessary reports and forms required by the state. We ensure all information is accurate and up-to-date based on your company's records." />

            <ProcessStep number="3" title="Filing and Fee Payment" description="We electronically file the prepared reports with the relevant Secretary of State and handle the payment of any mandatory state fees or franchise taxes on your behalf." />

            <ProcessStep number="4" title="Confirmation and Good Standing" description="Once the state confirms the filing has been accepted, we upload the confirmation documents to your secure portal and verify that your company's 'Good Standing' status is active for another year." />

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

