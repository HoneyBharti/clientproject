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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Audit Support Pillar</p>
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

export default function AuditSupportPillarPage() {
  const title = "The Founder's Guide to Audits & Assurance";
  const description = "Everything you need to know about US financial audits, from understanding the requirements and triggers to preparing your company for a smooth and successful outcome.";
  const auditPosts = [
      { title: 'Audit Requirements for US Companies: A Founder\'s Guide', path: '/blog/audit-requirements-for-us-companies', excerpt: 'An essential guide explaining when a financial statement audit is legally mandatory versus when it is contractually required.' },
      { title: 'Preparing for an IRS Audit: A Step-by-Step Guide for Businesses', path: '/blog/preparing-for-irs-audits', excerpt: 'An essential guide on what to do if you receive an IRS audit notice, covering the different types of audits and how to prepare.' },
      { title: 'Financial Statement Audits Explained: A Founder\'s Guide', path: '/blog/financial-statement-audits-explained', excerpt: 'An in-depth guide explaining the purpose, process, and potential outcomes (opinions) of a financial statement audit.' },
      { title: 'A Founder\'s Guide to SOC Compliance for US Companies', path: '/blog/soc-compliance-for-us-companies', excerpt: 'An essential guide for tech companies on understanding SOC 2 compliance, the Trust Services Criteria, and the audit process.' },
      { title: 'Top Audit Triggers in the United States', path: '/blog/audit-triggers-in-the-united-states', excerpt: 'An essential guide to the common red flags that can lead to an IRS audit, from high deductions to worker misclassification.' },
      { title: 'Audit Support for Venture-Funded Startups: A Founder\'s Guide', path: '/blog/audit-support-for-venture-funded-startups', excerpt: 'An essential guide for venture-backed startups on preparing for and navigating their first financial statement audit.' },
      { title: 'Internal Controls for Audit Readiness: A Founder\'s Guide', path: '/blog/internal-controls-for-audit-readiness', excerpt: 'An essential guide to implementing basic internal controls—like segregation of duties and approval workflows—to prepare for any audit.' },
      { title: 'Audit vs. Review vs. Compilation: A Founder\'s Guide to Financial Statement Services', path: '/blog/audit-vs-review-vs-compilation', excerpt: 'An essential guide explaining the critical differences between an audit, a review, and a compilation in terms of assurance, cost, and use case.' },
      { title: 'A Founder\'s Guide to US Audit Compliance Timelines', path: '/blog/audit-compliance-timelines', excerpt: 'An essential guide to the typical timelines for financial statement audits, IRS audits, and SOC audits.' },
  ];

  return <PillarPage title={title} description={description} posts={auditPosts} />;
}

