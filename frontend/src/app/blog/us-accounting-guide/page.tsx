
'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { ChevronLeft } from 'lucide-react';

const PillarPage = ({ title, description, posts }) => {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to All Resources
          </Link>
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Accounting Pillar</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">{title}</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
          </header>
          <div className="space-y-4">
            {posts.map(post => (
              <Link href={post.path} key={post.path} className="block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all">
                <h3 className="font-bold text-xl text-blue-700">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.excerpt}</p>
              </Link>
            ))}
          </div>

           <div className="mt-16 p-8 bg-blue-50 border-t-4 border-blue-500 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Professionalize Your Finances?</h3>
                <p className="text-gray-700 mb-4">
                    YourLegal provides a complete, outsourced accounting solution to handle all these complexities for you.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/usa/accounting" className="font-semibold text-blue-600 hover:underline">
                        &rarr; Explore our US Accounting Services
                    </Link>
                    <Link href="/usa" className="font-semibold text-gray-600 hover:underline">
                        &rarr; Back to USA Overview
                    </Link>
                </div>
            </div>

        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default function AccountingPillarPage() {
  const title = "The Ultimate Guide to US Business Accounting";
  const description = "A comprehensive overview of accounting principles, bookkeeping requirements, and financial compliance for businesses operating in the United States.";
  const accountingPosts = [
      { title: 'How Accounting Works in the United States for Small Businesses', path: '/blog/us-small-business-accounting-guide', excerpt: 'A comprehensive guide for entrepreneurs on US GAAP, bookkeeping, financial statements, and tax compliance.' },
      { title: 'Bookkeeping Requirements in the United States Explained', path: '/blog/us-bookkeeping-requirements', excerpt: 'An essential guide for business owners on IRS record-keeping rules, retention policies, and what you need to stay compliant.' },
      { title: 'GAAP vs Cash Accounting in the United States', path: '/blog/usa-gaap-vs-cash-accounting', excerpt: 'An in-depth guide for US business owners on the differences between accrual (GAAP) and cash basis accounting.' },
      { title: 'Common Accounting Mistakes US Startups Make', path: '/blog/common-us-startup-accounting-mistakes', excerpt: 'An essential guide on the most common and costly accounting errors, and how to avoid them.' },
      { title: 'When US Companies Should Outsource Accounting', path: '/blog/when-us-companies-should-outsource-accounting', excerpt: "A founder's guide to recognizing the triggers for outsourcing accounting, from saving time to preparing for fundraising."},
      { title: 'Accounting for Delaware C-Corps vs LLCs', path: '/blog/accounting-for-delaware-c-corps-vs-llcs', excerpt: 'A detailed comparison of the accounting and tax differences between a Delaware C-Corp and a Delaware LLC.' },
      { title: 'Industry-Specific Accounting Rules in the United States', path: '/blog/us-industry-specific-accounting-rules', excerpt: 'An overview of the unique accounting and tax rules for major US industries, including SaaS, E-commerce, and more.' },
      { title: 'US Accounting Compliance Checklist', path: '/blog/us-accounting-compliance-checklist', excerpt: 'A step-by-step checklist for setting up and maintaining a compliant accounting system in the USA.' },
      { title: 'Post-Incorporation Accounting Setup', path: '/blog/post-incorporation-accounting-setup', excerpt: 'A founder\'s checklist for setting up a compliant accounting system after forming a US company.' },
    ];

  return <PillarPage title={title} description={description} posts={accountingPosts} />;
}

