'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-blue-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function DubaiCorporateTax() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Guide to UAE Corporate Tax for Foreigners",
    "description": "Learn how the 9% corporate tax works and if your free zone company can qualify for a 0% rate.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/dubai-corporate-tax.jpg",
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
          <Link href="/dubai" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dubai Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">UAE Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Guide to UAE Corporate Tax for Foreigners
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how the 9% corporate tax works and if your free zone company can qualify for a 0% rate.
            </p>
          </header>

          <article>
            <BlogSection title="The Basics of UAE Corporate Tax" icon={Landmark}>
              <p>
                The UAE introduced a federal Corporate Tax (CT) effective for financial years starting on or after 1 June 2023. This tax applies to the profits of businesses operating in the UAE.
              </p>
              <h4 className="font-bold mt-6 mb-2">The Tax Rates:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>**0%** on taxable income up to **AED 375,000**.</li>
                <li>**9%** on taxable income that exceeds **AED 375,000**.</li>
              </ul>
            </BlogSection>

            <BlogSection title="Free Zone Companies: The 0% Rate" icon={Shield}>
              <p>
                A major attraction of UAE free zones is the potential for a 0% corporate tax rate. However, this is not automatic. To benefit from it, a free zone company must be a **"Qualifying Free Zone Person" (QFZP)** and earn **"Qualifying Income."**
              </p>
              <h4 className="font-bold mt-6 mb-2">To be a QFZP, you must:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Maintain adequate substance in the UAE (i.e., have offices, staff, and management in the free zone).</li>
                <li>Derive 'Qualifying Income'.</li>
                <li>Comply with all transfer pricing rules.</li>
                <li>Prepare audited financial statements.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="What is 'Qualifying Income'?" icon={TrendingUp}>
              <p>
                This is the most critical concept. Generally, Qualifying Income includes income from transactions with businesses located outside the UAE, or with other businesses located in any UAE free zone.
              </p>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="flex items-start">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                    <span className='text-gray-800'>Income from selling goods to a UAE Mainland company is generally *not* Qualifying Income and would be subject to the standard 9% tax rate (if profit exceeds AED 375,000). There are some exceptions for services.</span>
                </p>
              </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    While the headline 0% tax rate is appealing, the rules are complex. The distinction between Qualifying and non-Qualifying income is vital. Proper accounting and structuring are essential to ensure your free zone company can legally benefit from the 0% rate.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
