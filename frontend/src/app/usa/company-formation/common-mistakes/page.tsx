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

const ContentSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="prose max-w-none text-gray-600">
            {children}
        </div>
    </div>
);

export default function CommonMistakesPage() {
    const aiBlocks = [
        { title: "What is the biggest company formation mistake?", content: "The biggest mistake is choosing the wrong entity type. Choosing an LLC when you plan to raise venture capital, or a C-Corp for a simple lifestyle business, creates significant tax and structural problems down the line. This initial decision is critical." },
        { title: "Can I form the company myself?", content: "While technically possible for a US resident, DIY formation is fraught with risk. Common mistakes include failing to complete post-incorporation steps (like issuing stock), not getting an EIN correctly, or using a home address for the public record, which sacrifices privacy." },
        { title: "How does YourLegal prevent these mistakes?", content: "We guide you through the initial decision-making process. Our automated platform ensures all state and federal filings are done correctly, and we provide all necessary post-incorporation documents (like bylaws and stock purchase agreements) to ensure your company is legally sound from day one." }
    ];

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
              Common Company Formation Mistakes
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Avoid these common pitfalls to ensure your US company starts on a solid legal foundation.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Mistake #1: Choosing the Wrong Entity Type">
                <p>This is the most critical and hardest-to-fix mistake. Choosing an LLC when you plan to raise venture capital creates a huge roadblock, as VCs only invest in C-Corps. Conversely, choosing a C-Corp for a simple consulting business can lead to unnecessary tax complexity ("double taxation"). Your long-term goals must dictate your entity choice.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #2: Choosing the Wrong State">
                 <p>While Delaware and Wyoming are excellent choices for most non-residents, a business with a physical presence (like an office or employees) in another state (e.g., California or New York) may be required to register there, subjecting it to that state's high taxes and regulations. Understanding "nexus" is key.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #3: Skipping Post-Incorporation Steps">
                 <p>Receiving your state formation certificate is the beginning, not the end. Many DIY founders fail to complete critical post-incorporation steps like adopting bylaws, issuing founder stock, or holding an initial board meeting. This can render the company a legal "shell" and jeopardize the liability protection.</p>
            </ContentSection>

            <ContentSection title="Mistake #4: Incorrectly Applying for an EIN">
                 <p>For non-residents without an SSN, obtaining an Employer Identification Number (EIN) requires a manual application via Form SS-4. Errors on this form can lead to rejection and months of delays, preventing you from opening a bank account.</p>
            </ContentSection>
            
            <ContentSection title="Mistake #5: Using a Home Address on Public Filings">
                 <p>Your company's formation documents are public record. Using your home address instead of a professional Registered Agent and mailing address service exposes your personal information and sacrifices privacy.</p>
            </ContentSection>

             <ContentSection title="The Solution: A Guided, Professional Process">
                <p>Using a professional formation service like YourLegal eliminates these risks. We guide you through the entity and state selection, handle all filings correctly, provide the necessary post-incorporation documents, and protect your privacy, ensuring your company is set up for success from day one.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

