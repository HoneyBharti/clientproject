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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Cross-Border Pillar</p>
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

export default function CrossBorderPillarPage() {
  const title = "A Guide to Cross-Border Compliance for US Companies";
  const description = "For global founders and businesses, navigating US international tax law is critical. This guide covers everything from Form 5472 and transfer pricing to tax treaties and FATCA.";
  const crossBorderPosts = [
      { title: 'Top Accounting & Tax Risks for Foreign Owners of US Companies', path: '/blog/us-accounting-risks-for-foreign-owners', excerpt: 'A critical guide for non-resident founders on navigating Form 5472 penalties, FIRPTA, withholding taxes, and other major compliance risks in the USA.' },
      { title: 'A Non-Resident\'s Guide to Annual Compliance for US Companies', path: '/blog/annual-compliance-for-foreign-owned-us-firms', excerpt: 'An essential guide for foreign founders on the unique and high-stakes annual compliance requirements, including Form 5472 and FBAR.' },
      { title: 'Cross-Border Accounting for US Subsidiaries: A Guide for Foreign Parents', path: '/blog/cross-border-accounting-for-us-subsidiaries', excerpt: 'An essential guide for foreign multinationals on managing the accounting and tax complexities of their US subsidiaries.' },
      { title: 'Transfer Pricing Basics for US Companies: A Founder\'s Guide', path: '/blog/transfer-pricing-basics-for-us-companies', excerpt: 'An essential guide to understanding the \'arm\'s length principle,\' documentation requirements, and the risks of IRS adjustments for intercompany transactions.' },
      { title: 'FATCA Compliance Explained: A Guide for US Taxpayers', path: '/blog/fatca-compliance-explained', excerpt: 'An essential guide to the Foreign Account Tax Compliance Act (FATCA), explaining Form 8938 reporting for foreign assets.' },
      { title: 'US Withholding Tax Rules for Non-Residents: A Founder\'s Guide', path: '/blog/withholding-tax-rules-for-non-residents', excerpt: 'An essential guide for US companies on the rules for withholding tax on payments like dividends and interest to foreign owners.' },
      { title: 'Cross-Border Payroll Compliance: A Guide to Hiring Globally', path: '/blog/cross-border-payroll-compliance', excerpt: 'An essential guide to the immense complexities of international payroll and why an Employer of Record (EOR) is necessary.' },
      { title: 'Top Accounting Risks for Foreign Parent Companies with US Subsidiaries', path: '/blog/foreign-parent-us-accounting-risks', excerpt: 'A guide for foreign multinationals on the key accounting and tax risks of a US subsidiary, including transfer pricing and consolidation.' },
      { title: 'US Tax Treaties Explained: A Guide for Foreign Founders', path: '/blog/us-tax-treaties-explained', excerpt: 'An essential guide explaining what US tax treaties are and how they prevent double taxation.' },
      { title: 'Managing Multi-Country Accounting: A Guide for Global Businesses', path: '/blog/managing-multi-country-accounting', excerpt: 'An essential guide to the challenges of managing global accounting, from currency and compliance to consolidation.' },
      { title: 'The Cross-Border Compliance Checklist for US Companies', path: '/blog/cross-border-compliance-checklist', excerpt: 'An essential guide for global founders covering IRS informational returns, FinCEN reporting, withholding tax, and transfer pricing.' },
      { title: 'Virtual CFO Support for Foreign-Owned US Entities', path: '/blog/cfo-support-for-foreign-owned-us-entities', excerpt: 'A guide for non-resident founders on the specialized CFO services needed to navigate US international tax compliance.' },
      { title: 'Non-Resident Tax Guide', path: '/blog/non-resident-tax-guide', excerpt: 'Everything International Founders Need to Know About Form 5472 and Form 1120.'},
  ];

  return <PillarPage title={title} description={description} posts={crossBorderPosts} />;
}

