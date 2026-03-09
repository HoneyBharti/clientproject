'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, BarChart2, DollarSign, ListChecks, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-red-600' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

const ComparisonTable = () => (
    <div className="my-12 overflow-x-auto">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 font-semibold border-b">Chargeable Income</th>
            <th className="p-4 font-semibold border-b text-center">Tax Exemption (First S$100,000)</th>
            <th className="p-4 font-semibold border-b text-center">Tax Exemption (Next S$100,000)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">First 3 Years of Assessment (YA)</td>
            <td className="p-4 text-center">75%</td>
            <td className="p-4 text-center">50%</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="p-4 font-medium text-gray-700">From 4th Year Onwards</td>
            <td className="p-4 text-center">Partial Exemption (different rates apply)</td>
            <td className="p-4 text-center">Partial Exemption (different rates apply)</td>
          </tr>
        </tbody>
      </table>
    </div>
);


export default function SingaporeSuteGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Understanding Singapore's Start-up Tax Exemption (SUTE)",
    "description": "A founder's guide to maximizing tax savings in the first three years of business.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/singapore-sute-guide.jpg",
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
          <Link href="/singapore" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Singapore Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-red-600 tracking-wide uppercase">Singapore Tax</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Understanding Singapore's Start-up Tax Exemption (SUTE)
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A founder's guide to maximizing tax savings in the first three years of business.
            </p>
          </header>

          <article>
            <BlogSection title="What is the SUTE Scheme?" icon={DollarSign}>
              <p>
                The Start-up Tax Exemption (SUTE) scheme is a government initiative designed to support new businesses in Singapore. It provides significant tax exemptions on the first S$200,000 of a company's chargeable income for its first three consecutive Years of Assessment (YAs).
              </p>
            </BlogSection>
            
            <ComparisonTable />

            <BlogSection title="Eligibility Criteria for SUTE" icon={ListChecks}>
              <p>To qualify for the SUTE scheme, your company must meet all the following conditions:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>It must be a tax resident in Singapore for that YA.</li>
                <li>It must be incorporated in Singapore.</li>
                <li>It must have no more than 20 shareholders throughout the basis period for that YA where:
                    <ul className='list-circle pl-5 mt-2'>
                        <li>all of the shareholders are individuals; or</li>
                        <li>at least one shareholder is an individual holding at least 10% of the issued ordinary shares.</li>
                    </ul>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400">
                <p className="flex items-start">
                    <AlertTriangle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0" />
                    <span className='text-gray-800'>Companies whose principal activity is that of investment holding or developing properties for sale, investment or both are not eligible for the SUTE scheme.</span>
                </p>
              </div>
            </BlogSection>

            <BlogSection title="How SUTE Works in Practice" icon={BarChart2}>
              <p>Let's assume your startup has a chargeable income of S$250,000 in its first year. The standard corporate tax rate is 17%.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Without SUTE:</strong> Tax payable would be S$250,000 * 17% = S$42,500.</li>
                <li><strong>With SUTE:</strong>
                    <ul className='list-circle pl-5 mt-2 space-y-1'>
                        <li>First S$100,000: S$75,000 is exempt. Taxable amount is S$25,000. Tax = S$25,000 * 17% = S$4,250.</li>
                        <li>Next S$100,000: S$50,000 is exempt. Taxable amount is S$50,000. Tax = S$50,000 * 17% = S$8,500.</li>
                        <li>Remaining S$50,000: Fully taxable. Tax = S$50,000 * 17% = S$8,500.</li>
                        <li><strong>Total tax payable with SUTE: S$4,250 + S$8,500 + S$8,500 = S$21,250.</strong></li>
                    </ul>
                </li>
              </ul>
              <p className="font-bold mt-4">In this example, SUTE results in tax savings of S$21,250 in the first year alone.</p>
            </BlogSection>

            <div className="mt-16 p-8 bg-red-50 border-t-4 border-red-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The SUTE scheme is one of Singapore's most powerful incentives for new businesses. Ensuring your company structure meets the eligibility criteria from day one is crucial for maximizing these tax benefits and increasing your startup's runway.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

