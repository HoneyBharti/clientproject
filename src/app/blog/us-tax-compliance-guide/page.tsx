'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Tax Pillar</p>
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
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default function TaxPillarPage() {
  const title = "The Founder's Guide to US Tax Compliance";
  const description = "A complete overview of US business tax obligations, from federal vs. state taxes to sales tax, deadlines, and penalty avoidance.";
  const taxPosts = [
    { title: 'US Tax Compliance Checklist for Businesses', path: '/blog/us-business-tax-compliance-checklist', excerpt: 'A comprehensive checklist covering federal, state, sales, and informational tax returns to keep your US company compliant.' },
    { title: 'Federal vs State Tax Obligations in the US', path: '/blog/us-federal-vs-state-tax-obligations', excerpt: 'A guide on the crucial differences between IRS federal taxes and the diverse landscape of state-level income, franchise, and sales taxes.' },
    { title: 'Sales Tax vs Income Tax in the United States', path: '/blog/sales-tax-vs-income-tax-explained', excerpt: 'An essential guide explaining the fundamental differences between sales tax (a state-level tax on transactions) and income tax (a federal/state tax on profit).' },
    { title: 'Common IRS Penalties for Businesses', path: '/blog/common-irs-penalties-for-businesses', excerpt: 'Understanding the most common and costly IRS penalties—from Failure to File to the $25,000 Form 5472 penalty—is the first step to avoiding them.' },
    { title: 'US Company Tax Filing Deadlines', path: '/blog/us-company-tax-filing-deadlines', excerpt: 'An essential guide to the key IRS tax deadlines for C-Corps, S-Corps, and LLCs, including extension rules.' },
    { title: 'US Tax Compliance for SaaS Companies', path: '/blog/us-tax-compliance-for-saas-companies', excerpt: 'Navigate the complex world of ASC 606 revenue recognition, multi-state sales tax nexus, and R&D tax credits.' },
    { title: 'Multi-State Tax Compliance Explained', path: '/blog/multi-state-tax-compliance-explained', excerpt: 'An essential guide for founders on understanding sales tax nexus, state income tax, and the challenges of operating across multiple US states.' },
    { title: '5 Startup Deductions You’re Missing Out On', path: '/blog/5-deductions-youre-missing-out-on', excerpt: 'Maximize your startup’s runway by capturing these key expense categories.' },
    { title: 'Annual Reports and Franchise Taxes', path: '/blog/annual-reports-and-franchise-taxes', excerpt: 'An essential guide explaining what state Annual Reports and Franchise Taxes are and why they are mandatory.' },
    { title: 'Federal vs State Annual Filings', path: '/blog/us-federal-vs-state-annual-filings', excerpt: 'An essential guide explaining the crucial differences between federal tax filings with the IRS and state annual reports.' },
    { title: 'Maintaining Good Standing in the US', path: '/blog/maintaining-good-standing-in-us', excerpt: 'An essential guide explaining what \'Good Standing\' means for a US company, why it\'s critical, and how to maintain it.' },
    { title: 'Penalties for Missing Annual Filings', path: '/blog/penalties-for-missing-annual-filings', excerpt: 'An essential guide to the specific penalties for failing to file state annual reports and federal tax returns.' },
    { title: 'Compliance Calendar for US Businesses', path: '/blog/compliance-calendar-for-us-businesses', excerpt: 'A month-by-month guide to the most important federal and state compliance deadlines that US business owners need to know.' },
    { title: 'Compliance Timeline After Incorporation', path: '/blog/compliance-timeline-after-incorporation', excerpt: 'A detailed timeline for new US companies covering post-incorporation tasks, 90-day deadlines, and ongoing compliance obligations.' },
    { title: 'Compliance Deadlines US Businesses Miss', path: '/blog/compliance-deadlines-us-businesses-miss', excerpt: 'A critical guide for founders on commonly missed US compliance deadlines and their significant penalties.' },
    { title: 'BOI Reporting Requirements Explained', path: '/blog/boi-reporting-requirements-explained', excerpt: 'An essential guide to the new Beneficial Ownership Information (BOI) reporting rule, explaining who must file and what to report.' },
  ];

  return <PillarPage title={title} description={description} posts={taxPosts} />;
}
