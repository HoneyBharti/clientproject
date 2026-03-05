'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building, User, Scale } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const ComparisonTable = () => (
    <div className="my-12 overflow-x-auto">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 font-semibold border-b">Factor</th>
            <th className="p-4 font-semibold border-b text-center">Sole Trader</th>
            <th className="p-4 font-semibold border-b text-center">Pty Ltd Company</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">Legal Structure</td>
            <td className="p-4 text-center">Owner and business are the same legal entity.</td>
            <td className="p-4 text-center">A separate legal entity from its owners (shareholders).</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="p-4 font-medium text-gray-700">Liability</td>
            <td className="p-4 text-center">Unlimited personal liability for business debts.</td>
            <td className="p-4 text-center">Limited liability. Personal assets are protected.</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium text-gray-700">Tax</td>
            <td className="p-4 text-center">Business income is taxed at the individual's marginal tax rate.</td>
            <td className="p-4 text-center">Profit is taxed at the flat company tax rate (currently 25-30%).</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="p-4 font-medium text-gray-700">Setup Requirement</td>
            <td className="p-4 text-center">Requires an Australian Tax File Number (TFN) and ABN. Difficult for non-residents.</td>
            <td className="p-4 text-center">Can be owned 100% by foreigners, but requires a resident director.</td>
          </tr>
        </tbody>
      </table>
    </div>
);

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

export default function AustraliaBusinessStructures() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Choosing Your Business Structure in Australia: Pty Ltd vs. Sole Trader",
    "description": "Compare a Pty Ltd Company vs. a Sole Trader and determine which is right for you as a foreign founder.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/australia-business-structures.jpg",
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
            <p className="text-base font-semibold text-yellow-800 tracking-wide uppercase">Australia Incorporation</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Choosing Your Business Structure in Australia
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Compare a Pty Ltd Company vs. a Sole Trader and determine which is right for you as a foreign founder.
            </p>
          </header>

          <article>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                When starting a business in Australia, the structure you choose has significant legal, tax, and administrative implications. For most founders, the choice comes down to operating as a Sole Trader or incorporating a Proprietary Limited (Pty Ltd) company.
            </p>
            
            <BlogSection title="What is a Sole Trader?" icon={User}>
                <p>
                    A sole trader is the simplest business structure. It's an individual running a business where the owner is legally responsible for all aspects of the business.
                </p>
                <p className='font-bold mt-2'>For foreign founders, this structure is generally not viable as it requires an Australian Tax File Number (TFN) and the right to work in Australia, which is difficult to obtain without residency.</p>
            </BlogSection>

            <BlogSection title="What is a Pty Ltd Company?" icon={Building}>
              <p>
                A Proprietary Limited (Pty Ltd) company is a separate legal entity. It is owned by shareholders and managed by directors. This is the most common and recommended structure for foreign entrepreneurs setting up in Australia.
              </p>
            </BlogSection>

            <ComparisonTable />
            
            <div className="mt-16 p-8 bg-yellow-50 border-t-4 border-yellow-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Verdict for Foreign Founders</h3>
                <p className="text-gray-700">
                    Due to legal and tax requirements, the **Pty Ltd company is the only practical and recommended structure for non-resident founders** looking to establish a formal business presence in Australia. It offers the crucial benefit of limited liability and can be 100% foreign-owned, provided the resident director requirement is met.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
