'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, UserCog, TrendingUp, FileText, AlertTriangle } from 'lucide-react';
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

export default function Netherlands30PercentRuling() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The 30% Ruling in the Netherlands: A Guide for Employers",
    "description": "Understand how this valuable tax incentive can help you attract top international talent to your Dutch company.",
    "author": {
      "@type": "Organization",
      "name": "YourLegal AI"
    },
    "datePublished": new Date().toISOString(),
    "image": "https://www.yourlegal.ai/blog/images/netherlands-30-ruling.jpg",
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
            <p className="text-base font-semibold text-orange-600 tracking-wide uppercase">Netherlands Talent</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              The 30% Ruling in the Netherlands: A Guide for Employers
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Understand how this valuable tax incentive can help you attract top international talent to your Dutch company.
            </p>
          </header>

          <article>
            <BlogSection title="What is the 30% Ruling?" icon={UserCog}>
              <p>
                The 30% ruling is a Dutch tax advantage for highly skilled employees hired from abroad to work in the Netherlands. If specific conditions are met, the employer is allowed to pay 30% of the employee's gross salary as a tax-free allowance. This is intended to compensate for the extra expenses that foreign employees incur, such as travel and higher living costs.
              </p>
            </BlogSection>

            <BlogSection title="How it Works" icon={TrendingUp}>
              <p>
                Effectively, the employee's taxable income is reduced from 100% to 70% of their gross salary. The remaining 30% is paid out as a tax-free reimbursement. This results in a significantly higher net salary for the employee, making your job offer much more competitive.
              </p>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="font-semibold text-gray-800">
                    Example: For a gross salary of €100,000, only €70,000 is subject to income tax. The remaining €30,000 is paid to the employee tax-free.
                </p>
              </div>
            </BlogSection>
            
            <BlogSection title="Key Conditions for Eligibility" icon={FileText}>
              <p>
                To qualify, both the employee and the employer must meet several conditions set by the Dutch Tax and Customs Administration (Belastingdienst).
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Recruited from Abroad:</strong> The employee must have been recruited from outside the Netherlands.</li>
                <li><strong>Specific Expertise:</strong> The employee must have specific expertise that is not readily available in the Dutch labor market. This is mainly determined by a minimum salary threshold.</li>
                <li><strong>Minimum Salary:</strong> The employee's taxable salary must exceed a certain amount (this threshold is indexed annually). For 2024, the minimum taxable salary is around €46,107 after applying the 30% ruling. A lower threshold applies for employees under 30 with a master's degree.</li>
              </ul>
            </BlogSection>

            <BlogSection title="Recent Changes" icon={AlertTriangle}>
                <p>
                    As of 2024, the 30% ruling has been capped and phased. The full 30% tax-free allowance now applies for the first 20 months, then reduces to 20% for the next 20 months, and finally to 10% for the last 20 months. The maximum salary to which the ruling can be applied is also capped.
                </p>
            </BlogSection>

            <div className="mt-16 p-8 bg-orange-50 border-t-4 border-orange-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Final Thoughts</h3>
                <p className="text-gray-700">
                    Despite recent changes, the 30% ruling remains a powerful tool for Dutch companies, especially startups, to compete for top international talent. Structuring your job offers and employment contracts with this ruling in mind can give you a significant competitive edge in the hiring market.
                </p>
            </div>
          </article>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
