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

export default function WhoNeedsThisServicePage() {
    const aiBlocks = [
        { title: "Who needs a US company?", content: "Any entrepreneur or business globally that wants to access the US market, raise capital from US investors, use US payment processors like Stripe, or establish a credible international presence should form a US company." },
        { title: "Is this service mainly for non-residents?", content: "Yes, our service is specifically designed for non-resident and international founders. We handle the unique challenges they face, such as obtaining an EIN without an SSN and remote bank account opening." },
        { title: "I'm a US resident. Can I still use this service?", content: "Absolutely. While our expertise is tailored for non-residents, our streamlined, tech-enabled formation process is a fast and efficient solution for US residents as well." }
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
              Who Needs US Company Formation?
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our service is designed for ambitious global entrepreneurs looking to access the world's largest market.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentSection title="International Entrepreneurs & Non-Resident Founders">
                <p>This is our core audience. If you live outside the US and want to tap into the American market, you need a US company. It's the key to opening a US bank account, accessing payment gateways like Stripe, and building credibility with US customers and partners. Our service is built from the ground up to solve the unique challenges you face.</p>
            </ContentSection>
            
            <ContentSection title="Venture-Backed Startups">
                 <p>If you plan to raise money from US venture capital funds, you need a Delaware C-Corporation. It's the industry standard and a non-negotiable requirement for nearly all VCs. Our formation service ensures you are set up correctly from day one to be "investor-ready."</p>
            </ContentSection>
            
            <ContentSection title="E-commerce Businesses & Online Sellers">
                 <p>Selling to US customers is a massive opportunity. A US LLC provides a professional and trusted entity for your online store, simplifies banking and payment processing, and helps you manage sales tax obligations as you grow.</p>
            </ContentSection>

            <ContentSection title="Consultants & Freelancers">
                 <p>A US LLC offers independent consultants and freelancers liability protection, separating their personal assets from their business. It also provides a more professional image when contracting with larger US clients.</p>
            </ContentSection>

             <ContentSection title="Anyone Seeking a Global Presence">
                <p>A US company, particularly from a respected jurisdiction like Delaware or Wyoming, provides instant global credibility and a stable legal foundation for your international business ventures.</p>
            </ContentSection>

            <AiAnswerBlock blocks={aiBlocks} />
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
