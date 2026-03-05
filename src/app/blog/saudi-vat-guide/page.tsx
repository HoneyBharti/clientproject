'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-green-800' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function SaudiVatGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Understanding VAT in Saudi Arabia",
    "description": "A guide for new businesses on the 15% VAT, registration, and filing obligations with ZATCA.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/saudi-vat-guide.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "YourLegal AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yourlegal.ai/logo.png"
      }
    }
  };
  return (
    <div className="bg-white font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/saudi-arabia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Saudi Arabia Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-green-800 tracking-wide uppercase">KSA Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Understanding VAT in Saudi Arabia
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A guide for new businesses on the 15% VAT, registration, and filing obligations with ZATCA.
            </p>
          </header>

          <article>
            <BlogSection title="What is VAT in KSA?" icon={Percent}>
              <p>
                Value Added Tax (VAT) is an indirect tax applied to most goods and services in the Kingdom of Saudi Arabia (KSA). The standard rate is **15%**. It is collected by businesses on behalf of the Zakat, Tax and Customs Authority (ZATCA).
              </p>
            </BlogSection>

            <BlogSection title="VAT Registration Thresholds" icon={ClipboardList}>
              <p>Registration for VAT depends on your company's annual turnover.</p>
              <h4 className="font-bold mt-6 mb-2">Mandatory Registration:</h4>
              <p>
                Businesses resident in KSA must register for VAT if their total annual revenue from taxable supplies exceeds **SAR 375,000**.
              </p>
              
              <h4 className="font-bold mt-6 mb-2">Voluntary Registration:</h4>
              <p>
                Businesses can opt for voluntary registration if their annual revenue exceeds **SAR 187,500**. This allows them to reclaim VAT on their purchases.
              </p>
            </BlogSection>

            <BlogSection title="The Mechanism of VAT" icon={TrendingUp}>
              <p>
                As a VAT-registered business, you will charge 15% VAT (Output VAT) on your sales. You will also pay 15% VAT on your business purchases and expenses (Input VAT).
              </p>
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400">
                <p className="font-semibold text-gray-800">
                    You are required to file a VAT return (usually quarterly) with ZATCA. In this return, you will pay the difference between the Output VAT you've collected and the Input VAT you've paid. If you've paid more Input VAT than you've collected, you can claim a refund.
                </p>
              </div>
            </BlogSection>

            <BlogSection title="E-invoicing (Fatoorah)" icon={AlertTriangle}>
                <p>
                    A critical aspect of KSA VAT compliance is the mandatory e-invoicing system (Fatoorah). All VAT-registered businesses must issue and store electronic invoices that meet specific technical requirements set by ZATCA.
                </p>
                <p className="mt-4">
                    Phase 2 of the e-invoicing project requires integration of your invoicing system with ZATCA's platform. This is a complex technical requirement that must be addressed from day one.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-green-50 border-t-4 border-green-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    VAT compliance in Saudi Arabia, especially with the e-invoicing mandate, is a serious obligation. Failure to comply can result in significant penalties. Using a compliant accounting system and seeking professional advice is essential for any business operating in the Kingdom.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
