'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, FileText, Percent, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-blue-800' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function UkCorporationTax() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Understanding UK Corporation Tax for Startups",
    "description": "A guide for non-resident founders on HMRC's Corporation Tax, rates, and filing obligations.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/uk-corporation-tax.jpg",
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
          <Link href="/uk" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to UK Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-800 tracking-wide uppercase">UK Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Understanding UK Corporation Tax for Startups
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A guide for non-resident founders on HMRC's Corporation Tax, rates, and filing obligations.
            </p>
          </header>

          <article>
            <BlogSection title="What is Corporation Tax?" icon={Landmark}>
              <p>
                Corporation Tax is a tax paid by UK limited companies on their annual profits. Profit is calculated as your total revenue minus any allowable business expenses. It is administered by His Majesty's Revenue and Customs (HMRC).
              </p>
              <p>
                Every UK limited company must file a Company Tax Return (Form CT600), regardless of whether it made a profit or a loss.
              </p>
            </BlogSection>

            <BlogSection title="Corporation Tax Rates" icon={Percent}>
              <p>As of April 2023, the Corporation Tax rates are as follows:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>The **main rate** of Corporation Tax is **25%** for companies with profits over £250,000.</li>
                <li>The **small profits rate** is **19%** for companies with profits of £50,000 or less.</li>
                <li>Companies with profits between £50,000 and £250,000 pay tax at the main rate but can claim Marginal Relief, which provides a gradual increase in the effective tax rate.</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    For most startups in their early years, the 19% rate will likely apply.
                </p>
              </div>
            </BlogSection>
            
            <BlogSection title="Filing Deadlines" icon={FileText}>
                <p>
                    Corporation Tax involves two key deadlines, and they are different.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Deadline to Pay:</strong> Your Corporation Tax bill must be paid **9 months and 1 day** after the end of your company's accounting period.</li>
                    <li><strong>Deadline to File:</strong> Your Company Tax Return (CT600) must be filed **12 months** after the end of your accounting period.</li>
                </ul>
                 <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="flex items-start">
                        <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                        <span className='text-gray-800'>It's crucial to note that you must pay your tax *before* you file your return. Late payment incurs interest, and late filing incurs penalties.</span>
                    </p>
                </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Corporation Tax is a core compliance responsibility for every UK company. Maintaining clean bookkeeping throughout the year is the best way to ensure you can calculate your profits accurately, claim all allowable expenses, and file on time to avoid penalties.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
