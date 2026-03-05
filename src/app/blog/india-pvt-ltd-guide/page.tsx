'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building, ListChecks, UserCheck, AlertTriangle } from 'lucide-react';
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

export default function IndiaPvtLtdGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Incorporating a Private Limited (Pvt Ltd) Company in India",
    "description": "A step-by-step guide on documents, requirements, and the process of registering a Pvt Ltd company with the MCA.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/india-pvt-ltd-guide.jpg",
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
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">India Incorporation</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Incorporating a Private Limited (Pvt Ltd) Company in India
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step guide on documents, requirements, and the process of registering a Pvt Ltd company with the MCA.
            </p>
          </header>

          <article>
            <BlogSection title="What is a Private Limited Company?" icon={Building}>
              <p>
                A Private Limited (Pvt Ltd) company is the most common and preferred type of corporate entity for startups and growing businesses in India. It is a separate legal entity, distinct from its owners (shareholders), which provides limited liability protection to them.
              </p>
            </BlogSection>

            <BlogSection title="Key Requirements" icon={UserCheck}>
              <p>Before you begin the incorporation process, you must meet the following criteria:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Minimum 2 Directors:</strong> At least one director must be a resident of India (stayed in India for 182 days or more in the previous financial year).</li>
                <li><strong>Minimum 2 Shareholders:</strong> Directors and shareholders can be the same individuals.</li>
                <li><strong>No Minimum Capital:</strong> There is no minimum paid-up capital requirement to form a Pvt Ltd company.</li>
                <li><strong>Registered Office:</strong> You must have a registered office address in India.</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="The Incorporation Process" icon={ListChecks}>
                <p>
                    The process is primarily online through the Ministry of Corporate Affairs (MCA) portal.
                </p>
                <ol className="list-decimal pl-5 space-y-4 mt-4">
                    <li><strong>Step 1: Obtain DSC and DIN:</strong> All proposed directors must obtain a Digital Signature Certificate (DSC) and a Director Identification Number (DIN).</li>
                    <li><strong>Step 2: Name Reservation (RUN):</strong> Apply for your company's name using the "Reserve Unique Name" (RUN) service. It's wise to have a few options ready.</li>
                    <li><strong>Step 3: Filing of SPICe+ Form:</strong> This is the main incorporation form. It combines several applications into one, including name reservation, DIN allotment, and PAN/TAN application. You will also need to attach the e-Memorandum of Association (MoA) and e-Articles of Association (AoA).</li>
                    <li><strong>Step 4: Certificate of Incorporation:</strong> Once the MCA approves your application, they will issue a Certificate of Incorporation, which includes your Corporate Identity Number (CIN). Your company's PAN and TAN will also be allotted.</li>
                </ol>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Incorporating a Pvt Ltd company provides credibility, legal protection, and makes it easier to raise funds. While the process is streamlined, it requires careful document preparation. Working with a professional service ensures a smooth and compliant setup.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
