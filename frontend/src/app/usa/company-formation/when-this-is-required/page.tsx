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

export default function WhenRequiredPage() {
    const aiBlocks = [
        { title: "When should I form a company?", content: "You should form a company as soon as you begin conducting business activities, such as taking payments, hiring staff, or entering into contracts. It's the foundational step to protect your personal assets and operate professionally." },
        { title: "Do I need a company to open a US bank account?", content: "Yes. To open a US business bank account, you will need to provide the bank with your company's formation documents and its Employer Identification Number (EIN). It is generally not possible for a non-resident to open a business account without a registered US entity." },
        { title: "Can I form a company after I start my business?", content: "While you can, it's not recommended. Operating as a sole proprietor before forming an LLC or C-Corp means you are personally liable for all business activities during that time. It's best to form the company before you start transacting." }
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
              When Is Company Formation Required?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the key business activities that make forming a legal entity a necessity.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="To Protect Your Personal Assets">
                <p>The moment you start offering a product or service, you expose yourself to liability. If you operate without a formal entity (as a sole proprietor), your personal assets are at risk. Forming an LLC or C-Corp creates a legal "shield" and is the most important reason to incorporate as soon as you begin any business activity.</p>
            </ContentSection>
            
            <ContentSection title="To Open a US Business Bank Account">
                 <p>To open a US business bank account and accept payments from customers through platforms like Stripe, you need a registered US company and a federal Employer Identification Number (EIN). For non-resident founders, forming a company is the critical first step to accessing the US financial system.</p>
            </ContentSection>
            
            <ContentSection title="To Hire Employees or Contractors">
                 <p>If you plan to hire a team in the US, you must have a legal business entity to enter into employment contracts and run a compliant payroll system. You cannot hire employees as an individual sole proprietor in most cases.</p>
            </ContentSection>

            <ContentSection title="To Raise Capital from Investors">
                 <p>Investors do not invest in people; they invest in companies. If you plan to seek funding from angel investors or venture capitalists, you must have an incorporated entity (specifically a Delaware C-Corp) in which they can purchase equity.
                 </p>
            </ContentSection>

             <ContentSection title="To Establish Credibility">
                <p>Having "Inc." or "LLC" after your business name provides instant credibility and professionalism to customers, partners, and suppliers. It signals that you are a serious, legitimate enterprise operating within a formal legal structure.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

