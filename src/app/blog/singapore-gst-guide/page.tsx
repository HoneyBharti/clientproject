'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Percent, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

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

export default function SingaporeGstGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Foreign Founder's Guide to Singapore's GST",
    "description": "Understanding registration, obligations, and the impact of Goods and Services Tax on your business.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/singapore-gst-guide.jpg",
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
              A Foreign Founder's Guide to Singapore's GST
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding registration, obligations, and the impact of Goods and Services Tax on your business.
            </p>
          </header>

          <article>
            <BlogSection title="What is GST?" icon={Percent}>
              <p>
                Goods and Services Tax (GST) is a broad-based consumption tax levied on the import of goods, as well as nearly all supplies of goods and services in Singapore. In other countries, GST is also known as Value-Added Tax (VAT). The current GST rate in Singapore is 9%.
              </p>
            </BlogSection>

            <BlogSection title="GST Registration: Compulsory vs. Voluntary" icon={ClipboardList}>
              <p>GST registration is not required for all businesses. There are two scenarios for registration:</p>
              <h4 className="font-bold mt-6 mb-2">Compulsory Registration:</h4>
              <p>You must register for GST if:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your taxable turnover for the past 12 months was more than S$1 million (retrospective basis).</li>
                <li>You reasonably expect your taxable turnover to exceed S$1 million in the next 12 months (prospective basis).</li>
              </ul>

              <h4 className="font-bold mt-6 mb-2">Voluntary Registration:</h4>
              <p>You may choose to register for GST voluntarily even if your turnover is below S$1 million. This can be beneficial if your business primarily serves GST-registered businesses, as you can claim back the GST you pay on your business purchases (input tax).</p>
               <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="flex items-start">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                    <span className='text-gray-800'>Once you voluntarily register, you must remain registered for at least two years and comply with all GST filing requirements.</span>
                </p>
              </div>
            </BlogSection>

            <BlogSection title="Charging GST and Claiming Input Tax" icon={TrendingUp}>
              <p>
                Once your business is GST-registered, you must charge 9% GST on all standard-rated supplies to your customers in Singapore. This collected GST is known as "output tax."
              </p>
              <p className="mt-4">
                Simultaneously, you can claim back the GST incurred on your business purchases and expenses. This is known as "input tax." On a quarterly basis, you will file a GST return and pay the net difference (Output Tax - Input Tax) to the Inland Revenue Authority of Singapore (IRAS).
              </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-red-50 border-t-4 border-red-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Managing GST is a critical compliance task for any business operating in Singapore. Proactively assessing your registration liability and maintaining accurate records are key to avoiding penalties and ensuring smooth operations.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
