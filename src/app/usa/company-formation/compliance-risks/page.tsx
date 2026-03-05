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

const ContentSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="prose max-w-none text-gray-600">
            {children}
        </div>
    </div>
);

export default function ComplianceRisksPage() {
    const aiBlocks = [
        { title: "What is the main risk of not forming a company?", content: "The main risk is unlimited personal liability. Operating as a sole proprietor means there is no legal separation between you and your business. If the business is sued or incurs debt, your personal assets (home, savings) are at risk. Forming an LLC or C-Corp creates a 'corporate veil' to protect your personal assets." },
        { title: "Can I operate a business in the US without a company?", content: "While you can as a sole proprietor, it's highly inadvisable due to the liability risk. Furthermore, for non-residents, forming a company is often the only practical way to open a US bank account, access payment processors like Stripe, and establish a credible presence for US customers." },
        { title: "How does a formation service mitigate these risks?", content: "A formation service ensures you create a proper legal entity from day one, establishing the corporate veil. It provides the necessary legal documents and guidance on corporate formalities to maintain that liability protection over time." }
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
              Risks of Not Forming a Company
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Operating without a formal legal entity exposes you and your personal assets to significant risk.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="Risk #1: Unlimited Personal Liability">
                <p>This is the single greatest risk. Without the liability shield of an LLC or C-Corporation, you are operating as a sole proprietorship. This means there is no legal distinction between you and your business. If your business is sued for any reason—a customer dispute, an accident, or unpaid debt—your personal assets are on the line. This includes your house, car, and personal savings.</p>
            </ContentSection>
            
            <ContentSection title="Risk #2: Lack of Credibility and Trust">
                 <p>Operating as an individual rather than a registered company can appear unprofessional to potential customers, partners, and investors. A formal business entity like an LLC or C-Corp signals that you are serious and legitimate, which builds trust and opens doors.</p>
            </ContentSection>
            
            <ContentSection title="Risk #3: Inability to Access Key Services">
                 <p>Many essential business services require a formal company structure. It is often very difficult, if not impossible, for a non-resident individual to open a US business bank account or get approved for a Stripe or PayPal business account without a registered company and an Employer Identification Number (EIN).</p>
            </ContentSection>

            <ContentSection title="Risk #4: Difficulty Raising Capital">
                 <p>No serious investor will write a check to an individual. Angel investors and venture capitalists only invest in formal corporate structures (almost always a Delaware C-Corp) where they can receive equity (shares) in return for their investment. Operating without a company makes you unfundable.</p>
            </ContentSection>

             <ContentSection title="The Solution: Formalize Your Business">
                <p>Forming an LLC or C-Corporation is a simple, low-cost way to mitigate all of these risks. It establishes a legal shield, creates a professional image, and unlocks the financial infrastructure you need to grow. It is the foundational first step for any serious entrepreneur.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
