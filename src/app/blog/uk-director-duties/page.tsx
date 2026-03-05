'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, BookUser, Shield, Scale, AlertTriangle } from 'lucide-react';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';

const BlogSection = ({ title, icon, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
      {React.createElement(icon, { className: 'w-7 h-7 mr-3 text-blue-800' })}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function UkDirectorDuties() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Director's Responsibilities in the UK",
    "description": "A non-resident's guide to the key legal duties of running a UK Limited Company.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/uk-director-duties.jpg",
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
          <Link href="/uk" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to UK Page
          </Link>
          
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-800 tracking-wide uppercase">UK Compliance</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Director's Responsibilities in the UK
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                A non-resident's guide to the key legal duties of running a UK Limited Company.
            </p>
          </header>

          <article>
            <p className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              Being a director of a UK company, even as a non-resident, comes with significant legal responsibilities. These duties are owed to the company itself, and failure to comply can lead to personal liability, fines, or disqualification. The UK Companies Act 2006 outlines seven key duties.
            </p>

            <BlogSection title="1. Duty to Act Within Powers" icon={Scale}>
              <p>You must act in accordance with the company’s constitution (its Articles of Association) and only exercise your powers for the purposes for which they were given. This means you cannot use your position to pursue personal interests that are outside the company's objectives.</p>
            </BlogSection>

            <BlogSection title="2. Duty to Promote the Success of the Company" icon={BookUser}>
                <p>This is one of the most important duties. You must act in a way you consider, in good faith, would be most likely to promote the success of the company for the benefit of its members (shareholders) as a whole. You should have regard for:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>The long-term consequences of any decision.</li>
                    <li>The interests of the company's employees.</li>
                    <li>The need to foster business relationships with suppliers, customers, and others.</li>
                    <li>The impact of the company’s operations on the community and environment.</li>
                </ul>
            </BlogSection>
            
            <BlogSection title="3. Duty to Exercise Independent Judgment" icon={Shield}>
              <p>You must make your own independent decisions. While you can take advice from others (like lawyers or accountants), you cannot be told what to do by another person or simply delegate your decision-making responsibility.</p>
            </BlogSection>

            <BlogSection title="Other Key Duties" icon={AlertTriangle}>
                <p>Beyond the top three, you also have duties to:</p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Exercise reasonable care, skill, and diligence:</strong> You must perform your duties to the standard of a reasonably diligent person with the general knowledge, skill, and experience that could be expected of a director.</li>
                    <li><strong>Avoid conflicts of interest:</strong> You must avoid situations where you have, or could have, a direct or indirect interest that conflicts with the company's interests.</li>
                    <li><strong>Not accept benefits from third parties:</strong> You must not accept a benefit from a third party given because you are a director.</li>
                    <li><strong>Declare interest in a proposed transaction:</strong> If the company is considering a transaction and you have a personal interest in it, you must declare it to the other directors.</li>
                </ul>
            </BlogSection>

            <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Understanding these duties is fundamental to good corporate governance. While you don't need to be a lawyer, being aware of your responsibilities helps you make better decisions, protect the company, and mitigate personal risk, especially when operating from overseas.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
