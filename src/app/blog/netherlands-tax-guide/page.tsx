'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Landmark, Percent, Banknote } from 'lucide-react';
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

export default function NetherlandsTaxGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Navigating Dutch Corporate Tax for Startups",
    "description": "Learn about corporate income tax rates, VAT (BTW), and dividend withholding tax for your Dutch business.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/netherlands-tax-guide.jpg",
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
          <Link href="/netherlands" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Netherlands Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">Netherlands Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Navigating Dutch Corporate Tax for Startups
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about corporate income tax rates, VAT (BTW), and dividend withholding tax for your Dutch business.
            </p>
          </header>

          <article>
            <BlogSection title="Corporate Income Tax (VPB)" icon={Landmark}>
              <p>
                Corporate Income Tax (vennootschapsbelasting or VPB) is levied on the worldwide profits of companies resident in the Netherlands.
              </p>
              <h4 className="font-bold mt-6 mb-2">The Tax Rates (2024):</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>**19%** on the first **€200,000** of taxable profits.</li>
                <li>**25.8%** on taxable profits exceeding **€200,000**.</li>
              </ul>
              <p className="mt-2">This two-bracket system is particularly beneficial for startups and SMEs, as it provides a lower tax rate on initial profits.</p>
            </BlogSection>

            <BlogSection title="Value Added Tax (BTW)" icon={Percent}>
              <p>
                Value Added Tax (Belasting over de Toegevoegde Waarde, or BTW) is a consumption tax.
              </p>
              <h4 className="font-bold mt-6 mb-2">The BTW Rates:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>21% (Standard Rate):</strong> Applies to most goods and services.</li>
                <li><strong>9% (Reduced Rate):</strong> Applies to certain goods and services like food products, books, and medicines.</li>
                <li><strong>0% (Zero Rate):</strong> Applies to international transactions, such as exports of goods and certain cross-border services. This allows you to reclaim BTW paid on related expenses.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="Dividend Withholding Tax" icon={Banknote}>
              <p>
                The Netherlands levies a 15% dividend withholding tax on profit distributions to shareholders. However, this can often be reduced or eliminated.
              </p>
               <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    A full exemption from dividend withholding tax may apply if the parent company is located in the EU/EEA or a country that has a tax treaty with the Netherlands. This makes the Dutch B.V. an excellent holding company structure.
                </p>
              </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The Dutch tax system is competitive and offers several advantages, especially for internationally operating businesses and startups. Understanding the interaction between corporate tax, BTW, and dividend tax is key to structuring your operations efficiently.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
