'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileBadge, CheckCircle, AlertTriangle, Globe } from 'lucide-react';
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

export default function IndiaFdiPolicy() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "A Foreigner's Guide to India's FDI Policy",
    "description": "Navigate the 'automatic' vs 'approval' routes and understand sectoral caps for your investment in India.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/india-fdi-policy.jpg",
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
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">India Investment</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              A Foreigner's Guide to India's FDI Policy
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate the 'automatic' vs 'approval' routes and understand sectoral caps for your investment in India.
            </p>
          </header>

          <article>
            <BlogSection title="What is FDI?" icon={Globe}>
              <p>
                Foreign Direct Investment (FDI) is an investment made by a company or individual from one country into business interests located in another country. For India, it is a primary source of capital and a key driver of economic growth.
              </p>
            </BlogSection>

            <BlogSection title="Two Routes of Investment" icon={FileBadge}>
              <p>FDI in India is primarily allowed through two routes:</p>
              <h4 className="font-bold mt-6 mb-2">1. The Automatic Route</h4>
              <p>
                Under this route, a non-resident investor or an Indian company does not require any approval from the Government of India for the investment. This is the entry route for most sectors, including IT, e-commerce marketplaces, and manufacturing.
              </p>
              <h4 className="font-bold mt-6 mb-2">2. The Government Route (Approval Route)</h4>
              <p>
                For certain sectors, prior approval from the concerned government ministry or department is mandatory. These sectors often include sensitive areas like defense, broadcasting, and print media.
              </p>
            </BlogSection>

            <BlogSection title="Key Permitted Sectors (100% Automatic Route)" icon={CheckCircle}>
              <p>
                Many sectors are open for 100% FDI under the automatic route, making India an attractive destination. Some popular ones include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>E-commerce (Marketplace model only)</li>
                <li>IT and IT-enabled services (ITeS)</li>
                <li>Manufacturing</li>
                <li>Pharmaceuticals (Greenfield projects)</li>
                <li>Single-Brand Product Retail Trading</li>
              </ul>
            </BlogSection>
            
            <BlogSection title="Prohibited Sectors" icon={AlertTriangle}>
                <p>
                    FDI is strictly prohibited in a few sectors, including:
                </p>
                 <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Lottery Business</li>
                    <li>Gambling and Betting</li>
                    <li>Chit Funds (a type of savings scheme)</li>
                    <li>Nidhi Company</li>
                    <li>Real estate business (except for development of townships, housing, etc.)</li>
                </ul>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    India's FDI policy has become increasingly liberal, opening up most of the economy to foreign investors. Understanding which route and sectoral cap applies to your business is the first step in planning a successful entry into the Indian market.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

