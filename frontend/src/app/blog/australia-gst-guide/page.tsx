'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-yellow-800' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function AustraliaGstGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Guide to Australia's Goods and Services Tax (GST)",
    "description": "Learn about GST registration thresholds, obligations, and how it impacts your Australian business.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/australia-gst-guide.jpg",
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
          <Link href="/australia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Australia Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-yellow-800 tracking-wide uppercase">Australia Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Guide to Australia's Goods and Services Tax (GST)
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about GST registration thresholds, obligations, and how it impacts your Australian business.
            </p>
          </header>

          <article>
            <BlogSection title="What is GST?" icon={Percent}>
              <p>
                The Goods and Services Tax (GST) is a broad-based tax of 10% on most goods, services, and other items sold or consumed in Australia. It is administered by the Australian Taxation Office (ATO).
              </p>
            </BlogSection>

            <BlogSection title="GST Registration Threshold" icon={ClipboardList}>
              <p>You are required to register for GST if:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Your business has a GST turnover (gross income minus GST) of **A$75,000 or more**.</li>
                <li>Your non-profit organisation has a GST turnover of A$150,000 or more.</li>
                <li>You provide taxi or limousine travel for passengers (including ride-sourcing) regardless of your GST turnover.</li>
              </ul>
              <p className='mt-2'>This turnover threshold is calculated on a rolling 12-month basis.</p>
            </BlogSection>

            <BlogSection title="How GST Works" icon={TrendingUp}>
              <p>
                If you are registered for GST, you need to include GST in the price you charge for your goods and services. This is the **GST you collect** (output tax).
              </p>
              <p className="mt-4">
                You can also claim credits for the GST included in the price of goods and services you buy for your business. This is the **GST you pay** (input tax).
              </p>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    You report and pay the net amount of GST to the ATO by lodging a Business Activity Statement (BAS) on a monthly or quarterly basis.
                </p>
              </div>
            </BlogSection>

            <BlogSection title="GST on Sales to Overseas Customers" icon={AlertTriangle}>
                <p>
                    Generally, sales of goods and services to customers outside of Australia are 'GST-free' exports. This means you don't charge GST on these sales, but you can still claim the GST credits on the business purchases related to them. This is a key advantage for export-oriented businesses.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-yellow-50 border-t-4 border-yellow-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Understanding GST is crucial for compliance and cash flow management in Australia. It's important to monitor your turnover to know when you need to register and to keep accurate records for your BAS lodgements.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

