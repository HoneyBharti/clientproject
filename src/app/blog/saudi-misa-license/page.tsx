'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileBadge, Building, ListChecks, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-green-800' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function SaudiMisaLicense() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Foreign Investor's Guide to the MISA License",
    "description": "A step-by-step guide to obtaining your foreign investment license from the Ministry of Investment.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/saudi-misa-license.jpg",
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
          <Link href="/saudi-arabia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Saudi Arabia Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-green-800 tracking-wide uppercase">KSA Incorporation</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Foreign Investor's Guide to the MISA License
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step guide to obtaining your foreign investment license from the Ministry of Investment.
            </p>
          </header>

          <article>
            <BlogSection title="What is a MISA License?" icon={FileBadge}>
              <p>
                The MISA license, issued by the Ministry of Investment of Saudi Arabia, is the single most important document for any foreigner looking to establish a business in the Kingdom. It is a foreign investment license that grants you the legal right to own a company in Saudi Arabia, typically allowing for 100% ownership.
              </p>
              <p>
                Without a MISA license, you cannot proceed to the next steps of incorporation, such as obtaining a Commercial Registration (CR).
              </p>
            </BlogSection>

            <BlogSection title="Types of MISA Licenses" icon={Building}>
              <p>MISA offers various types of licenses based on the nature of the business activity. The two most common for startups and service-based companies are:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Service License:</strong> For companies providing professional, technical, or consulting services.</li>
                <li><strong>Entrepreneurial License:</strong> A specialized license for innovative tech startups that meet certain criteria, often providing additional benefits and a faster process.</li>
              </ul>
              <p>Other licenses exist for activities like trading, manufacturing, and real estate.</p>
            </BlogSection>
            
            <BlogSection title="Key Application Requirements" icon={ListChecks}>
                <p>
                    The application process is done online via the MISA portal. You will need to prepare a comprehensive set of documents, which typically includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>A detailed business plan outlining your proposed activities in KSA.</li>
                    <li>Copies of the parent company's commercial registration and financial statements (if applicable).</li>
                    <li>Passport copies of the company's general manager and shareholders.</li>
                    <li>A board resolution authorizing the investment in Saudi Arabia.</li>
                </ul>
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="flex items-start">
                        <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                        <span className='text-gray-800'>All foreign documents must be notarized and attested by the Saudi Embassy in your home country. This process can be time-consuming and should be started early.</span>
                    </p>
                </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-green-50 border-t-4 border-green-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    The MISA license is your gateway to the Saudi market. The application requires careful preparation and attention to detail. Working with a professional service provider can help you navigate the document attestation process and ensure your business plan meets MISA's expectations, avoiding costly delays.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
