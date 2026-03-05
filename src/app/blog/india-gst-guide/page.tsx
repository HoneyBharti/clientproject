'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-orange-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function IndiaGstGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Understanding Goods & Services Tax (GST) in India",
    "description": "Learn about GST slabs, registration thresholds, input tax credit (ITC), and monthly filing requirements.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/india-gst-guide.jpg",
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
          <Link href="/in" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to India Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">India Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Understanding Goods & Services Tax (GST) in India
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about GST slabs, registration thresholds, input tax credit (ITC), and monthly filing requirements.
            </p>
          </header>

          <article>
            <BlogSection title="What is GST?" icon={Percent}>
              <p>
                The Goods and Services Tax (GST) is a comprehensive, multi-stage, destination-based indirect tax. It has replaced many indirect taxes in India like excise duty, VAT, and service tax. It is levied on the supply of goods and services.
              </p>
            </BlogSection>

            <BlogSection title="GST Registration Thresholds" icon={ClipboardList}>
              <p>GST registration is mandatory for businesses that cross a certain turnover threshold.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>For services providers:</strong> Mandatory if aggregate turnover exceeds **₹20 lakhs** in a financial year.</li>
                <li><strong>For goods suppliers:</strong> Mandatory if aggregate turnover exceeds **₹40 lakhs** in a financial year.</li>
                <li>Certain businesses, like e-commerce operators or those making inter-state supplies, must register regardless of their turnover.</li>
              </ul>
            </BlogSection>

            <BlogSection title="How GST Works: Input Tax Credit (ITC)" icon={TrendingUp}>
              <p>
                The core concept of GST is the Input Tax Credit (ITC). When you pay GST on your business purchases (input tax), you can claim a credit for this amount. You then use this credit to offset the GST you collect on your sales (output tax).
              </p>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    You only pay the difference to the government. This mechanism prevents the "tax on tax" effect and ensures a smooth flow of credit throughout the supply chain.
                </p>
              </div>
            </BlogSection>
            
            <BlogSection title="GST Filings" icon={AlertTriangle}>
                <p>
                    Regular GST return filing is a critical compliance requirement. Businesses typically need to file:
                </p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>GSTR-1:</strong> A monthly or quarterly return detailing all your outward supplies (sales).</li>
                    <li><strong>GSTR-3B:</strong> A monthly summary return to declare your GST liability and pay the tax.</li>
                </ul>
                <p className='mt-2'>Late filing can lead to penalties and interest charges.</p>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    GST is a fundamental part of doing business in India. Understanding your registration liability, maintaining proper invoices, and filing returns on time are essential for staying compliant and managing your cash flow effectively.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
