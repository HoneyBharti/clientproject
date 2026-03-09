'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building, Globe, Landmark } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const ComparisonTable = () => (
    <div className="my-12 overflow-x-auto">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 font-semibold border-b">Factor</th>
            <th className="p-4 font-semibold border-b text-center">Free Zone Company</th>
            <th className="p-4 font-semibold border-b text-center">Mainland Company</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">Business Scope</td>
            <td className="p-4 text-center">Trade within the free zone and internationally. Cannot trade directly in the UAE mainland.</td>
            <td className="p-4 text-center">Trade anywhere in the UAE and internationally without restriction.</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="p-4 font-medium text-gray-700">Ownership</td>
            <td className="p-4 text-center">100% foreign ownership allowed.</td>
            <td className="p-4 text-center">100% foreign ownership for most activities. Some strategic sectors may require a local partner.</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">Corporate Tax</td>
            <td className="p-4 text-center">0% on "Qualifying Income." 9% on other income (e.g., from mainland sales).</td>
            <td className="p-4 text-center">9% on profits above AED 375,000.</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="p-4 font-medium text-gray-700">Office Space</td>
            <td className="p-4 text-center">Flexible options, including "flexi-desks" (shared desks). Physical office not always mandatory.</td>
            <td className="p-4 text-center">Physical office space registered with Ejari is mandatory.</td>
          </tr>
           <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">Visas</td>
            <td className="p-4 text-center">Number of visas is often tied to the size of the office or flexi-desk package.</td>
            <td className="p-4 text-center">Generally more flexible visa eligibility, but tied to having a physical office.</td>
          </tr>
        </tbody>
      </table>
    </div>
);

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

export default function DubaiFreezoneVsMainland() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Dubai Free Zone vs. Mainland: Key Differences",
    "description": "Understand the pros and cons to choose the right jurisdiction for your UAE business.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/dubai-freezone-vs-mainland.jpg",
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">UAE Business Structures</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Dubai Free Zone vs. Mainland: Key Differences
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the pros and cons to choose the right jurisdiction for your UAE business.
            </p>
          </header>

          <article>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                One of the first and most critical decisions when setting up a business in the UAE is choosing between a Free Zone and a Mainland jurisdiction. Each has distinct advantages and limitations that can significantly impact your business operations, costs, and market access.
            </p>
            
            <BlogSection title="What is a Free Zone Company?" icon={Globe}>
                <p>
                    A free zone is a special economic area, typically dedicated to a specific industry, that offers tax concessions and customs duty benefits to expatriate investors. There are over 40 free zones in the UAE.
                </p>
                <h4 className="font-bold mt-6 mb-2">Best For:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Businesses that trade internationally or provide services to clients outside the UAE.</li>
                    <li>Startups looking for a lower-cost setup with flexible office options.</li>
                    <li>Holding companies and consulting firms.</li>
                </ul>
            </BlogSection>

            <BlogSection title="What is a Mainland Company?" icon={Landmark}>
              <p>
                A Mainland company (also known as an "onshore" company) is licensed by the Department of Economic Development (DED) of the respective emirate. This structure allows you to trade directly with the local UAE market without restrictions.
              </p>
               <h4 className="font-bold mt-6 mb-2">Best For:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Businesses that need to sell goods or services directly within the UAE (e.g., retail shops, restaurants).</li>
                    <li>Companies wanting to work on government contracts.</li>
                    <li>Businesses that require a physical office or showroom in the heart of Dubai.</li>
                </ul>
            </BlogSection>

            <ComparisonTable />
            
            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Which one is right for you?</h3>
                <p className="text-gray-700">
                    The choice is simple: **If your primary market is within the UAE, you need a Mainland company.** If your business is internationally focused, a Free Zone company is almost always the more efficient and cost-effective option.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

