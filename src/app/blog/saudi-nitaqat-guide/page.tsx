'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Users, Building, TrendingUp, AlertTriangle } from 'lucide-react';
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

export default function SaudiNitaqatGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Navigating 'Saudization' (Nitaqat)",
    "description": "Understand the Nitaqat program and its implications for hiring and compliance in Saudi Arabia.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/saudi-nitaqat-guide.jpg",
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
            <p className="text-base font-semibold text-green-800 tracking-wide uppercase">KSA Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Navigating 'Saudization' (Nitaqat)
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the Nitaqat program and its implications for hiring and compliance in Saudi Arabia.
            </p>
          </header>

          <article>
            <BlogSection title="What is Nitaqat?" icon={Users}>
              <p>
                Nitaqat, commonly known as "Saudization," is a national policy implemented by the Saudi Ministry of Human Resources and Social Development (MHRSD). Its primary goal is to increase the employment of Saudi nationals in the private sector.
              </p>
              <p>
                The program classifies companies into different color-coded categories (e.g., Platinum, Green, Red) based on their compliance with Saudization quotas.
              </p>
            </BlogSection>

            <BlogSection title="How Does Nitaqat Work?" icon={Building}>
              <p>The system works by setting specific Saudization percentages that companies must meet. These percentages depend on two main factors:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Company Size:</strong> The number of employees in your company.</li>
                <li><strong>Economic Activity:</strong> The industry your company operates in.</li>
              </ul>
              <p className="mt-4">
                For example, a small tech startup will have a different quota than a large construction firm. Your company's Nitaqat status directly impacts your ability to obtain and renew work visas for foreign employees.
              </p>
            </BlogSection>
            
            <BlogSection title="The Importance of Compliance" icon={TrendingUp}>
              <p>
                Maintaining a good Nitaqat status (e.g., Green or Platinum) is critical for smooth business operations.
              </p>
              <h4 className="font-bold mt-6 mb-2">Benefits of Compliance:</h4>
               <ul className="list-disc pl-5 space-y-2">
                    <li>Easy processing and renewal of work visas for expatriate staff.</li>
                    <li>Ability to change the professions of foreign employees.</li>
                    <li>Eligibility to bid on government contracts.</li>
                </ul>
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="flex items-start">
                        <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0" />
                        <span className='text-gray-800'>Companies in the Red category will face severe restrictions, including being blocked from issuing new visas or renewing existing ones.</span>
                    </p>
              </div>
            </BlogSection>

            <div className="mt-16 p-8 bg-green-50 border-t-4 border-green-700 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Saudization is a cornerstone of doing business in Saudi Arabia. As a foreign investor, it's essential to factor your hiring strategy and Nitaqat compliance into your business plan from the very beginning. This includes budgeting for Saudi salaries and understanding the requirements for your specific industry.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
