'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, Edit, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

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

export default function UkVatGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "UK VAT Registration: When and Why",
    "description": "A guide for non-resident founders on navigating Value Added Tax in the United Kingdom.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/uk-vat-guide.jpg",
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
              UK VAT Registration: When and Why
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A guide for non-resident founders on navigating Value Added Tax in the United Kingdom.
            </p>
          </header>

          <article>
            <BlogSection title="What is VAT?" icon={Percent}>
              <p>
                Value Added Tax (VAT) is a consumption tax charged on most goods and services sold in the UK. The standard rate is 20%. If your business is VAT-registered, you must charge VAT to your customers and, in turn, you can reclaim the VAT you pay on your own business purchases.
              </p>
            </BlogSection>

            <BlogSection title="The VAT Registration Threshold" icon={TrendingUp}>
              <p>VAT registration is not always required. You become legally obligated to register for VAT if your "VAT taxable turnover" exceeds a certain threshold.</p>
              <h4 className="font-bold mt-6 mb-2">The Current Threshold:</h4>
              <p>
                As of April 2024, the mandatory registration threshold is **£90,000**. This is not based on a calendar year, but on a rolling 12-month period. You must register if:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your total VAT taxable turnover for the last 12 months was over £90,000.</li>
                <li>You expect your turnover to go over £90,000 in the next 30 days alone.</li>
              </ul>
            </BlogSection>

            <BlogSection title="Voluntary Registration: Should You Do It?" icon={Edit}>
              <p>
                Even if you are below the £90,000 threshold, you can choose to register for VAT voluntarily. Why would you do this?
              </p>
              <h4 className="font-bold mt-6 mb-2">Reasons for Voluntary Registration:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Reclaim VAT:</strong> You can reclaim the 20% VAT on your UK-based business expenses, such as software, professional services, or supplies. This can be a significant cost saving.</li>
                <li><strong>Business Credibility:</strong> Some larger UK businesses prefer to work with VAT-registered suppliers, as it can be a sign of a more established company.</li>
                <li><strong>Avoid Back-dating:</strong> Registering early avoids the risk of crossing the threshold unexpectedly and having to account for VAT retrospectively.</li>
              </ul>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="flex items-start">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                    <span className='text-gray-800'>The main downside is the administrative burden. Once registered, you must file quarterly VAT returns and keep detailed records, even if you owe no tax.</span>
                </p>
              </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The decision to register for VAT depends on your business model. If you have significant UK costs or primarily serve other UK businesses, voluntary registration is often a smart move. If your customers are mostly consumers or are based outside the UK, it might be better to wait until you reach the mandatory threshold.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

