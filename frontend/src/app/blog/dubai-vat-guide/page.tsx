'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

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

export default function DubaiVatGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "UAE VAT Guide: Registration and Filing",
    "description": "A complete guide to understanding the 5% VAT, registration thresholds, and filing obligations in the UAE.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/dubai-vat-guide.jpg",
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
              UAE VAT Guide: Registration and Filing
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A complete guide to understanding the 5% VAT, registration thresholds, and filing obligations in the UAE.
            </p>
          </header>

          <article>
            <BlogSection title="What is VAT in the UAE?" icon={Percent}>
              <p>
                Value Added Tax (VAT) is an indirect tax on the consumption of goods and services in the UAE. The standard rate is 5%. Businesses that are registered for VAT are required to charge this tax on their sales and can reclaim the VAT they have paid on their business-related purchases.
              </p>
            </BlogSection>

            <BlogSection title="VAT Registration Thresholds" icon={ClipboardList}>
              <p>Not every business needs to register for VAT. The Federal Tax Authority (FTA) has set specific turnover thresholds:</p>
              <h4 className="font-bold mt-6 mb-2">Mandatory Registration:</h4>
              <p>
                It is compulsory for a business to register for VAT if the total value of its taxable supplies and imports in the last 12 months exceeded **AED 375,000**.
              </p>
              
              <h4 className="font-bold mt-6 mb-2">Voluntary Registration:</h4>
              <p>
                A business can choose to register voluntarily if its taxable supplies and imports in the last 12 months exceeded **AED 187,500**.
              </p>
            </BlogSection>

            <BlogSection title="How VAT Works: Output vs. Input Tax" icon={TrendingUp}>
              <p>
                When a VAT-registered business makes a sale, it charges 5% VAT to the customer. This collected amount is called **Output Tax**.
              </p>
              <p className="mt-4">
                When that same business buys goods or services for its operations (e.g., office rent, software subscriptions), it pays 5% VAT. This paid amount is called **Input Tax**.
              </p>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    On a quarterly basis, you file a VAT return. You pay the FTA the difference between your Output Tax and Input Tax. If your Input Tax is greater than your Output Tax, you can claim a refund.
                </p>
              </div>
            </BlogSection>

            <BlogSection title="Key Compliance Obligations" icon={AlertTriangle}>
                <p>Once registered, you must:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Charge VAT on taxable goods or services you supply.</li>
                    <li>Issue tax-compliant invoices.</li>
                    <li>Keep business records to support your VAT returns for at least 5 years.</li>
                    <li>File VAT returns, usually on a quarterly basis.</li>
                </ul>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Understanding your VAT obligations is crucial for doing business in the UAE. Proactively monitoring your turnover against the registration threshold and maintaining meticulous records are essential steps to avoid significant penalties and ensure smooth operations.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

