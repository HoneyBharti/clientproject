'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building, ListChecks, UserCheck, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

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

export default function NetherlandsBVGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Founder's Guide to Incorporating a Dutch B.V.",
    "description": "A step-by-step guide on the requirements and process for setting up your private limited company in the Netherlands.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/netherlands-bv-guide.jpg",
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
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">Netherlands Incorporation</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Founder's Guide to Incorporating a Dutch B.V.
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step guide on the requirements and process for setting up your private limited company in the Netherlands.
            </p>
          </header>

          <article>
            <BlogSection title="What is a Dutch B.V.?" icon={Building}>
              <p>
                A 'Besloten Vennootschap' (B.V.) is a private limited liability company in the Netherlands. It's the most common and recommended legal form for both local and foreign entrepreneurs because it's a separate legal entity, meaning the personal assets of the shareholders are protected from business debts.
              </p>
            </BlogSection>

            <BlogSection title="Key Requirements" icon={UserCheck}>
              <p>Before you start, ensure you meet the following criteria:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Shareholders:</strong> A minimum of one shareholder is required, who can be a person or another company.</li>
                <li><strong>No Director Residency Requirement:</strong> The Netherlands does not require directors to be Dutch residents, making it very accessible for foreign founders.</li>
                <li><strong>Registered Address:</strong> A physical registered address in the Netherlands is mandatory. A virtual office or PO box is not sufficient.</li>
                <li><strong>Minimum Capital:</strong> The minimum share capital is just €0.01.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="The Incorporation Process" icon={ListChecks}>
                <p>
                    The process involves a civil-law notary and is highly efficient.
                </p>
                <ol className="list-decimal pl-5 space-y-4 mt-4">
                    <li><strong>Step 1: Document Preparation:</strong> We collect all necessary information and documents, such as shareholder details and the proposed business activities, and draft the deed of incorporation.</li>
                    <li><strong>Step 2: Notarial Deed of Incorporation:</strong> The deed must be executed by a Dutch civil-law notary. This can often be done remotely. The deed includes the company's articles of association.</li>
                    <li><strong>Step 3: Registration with KVK:</strong> The notary registers the B.V. in the Dutch Commercial Register (Kamer van Koophandel - KVK). Upon registration, the company receives its unique KVK number.</li>
                    <li><strong>Step 4: Tax Registration:</strong> The KVK automatically passes the details to the Dutch Tax and Customs Administration (Belastingdienst), which will issue your VAT number (BTW-nummer) and other relevant tax numbers.</li>
                </ol>
            </BlogSection>

            <BlogSection title="UBO Register" icon={AlertTriangle}>
                <p>
                    All Dutch B.V.s must register their Ultimate Beneficial Owners (UBOs) in the UBO register, which is part of the KVK. A UBO is any person who ultimately owns or controls more than 25% of the company's shares or voting rights.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The Dutch B.V. is a flexible and credible corporate structure for international business. The process is straightforward and can be completed quickly, making the Netherlands an excellent choice for your European headquarters.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

