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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Virtual CFO Pillar</p>
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

export default function VcfoPillarPage() {
  const title = "The Founder's Guide to Virtual CFO Services";
  const description = "Everything you need to know about strategic financial planning, from forecasting and cash management to hiring a vCFO for your US business.";
  const cfoPosts = [
      { title: 'What Is a Virtual CFO?', path: '/blog/what-is-a-virtual-cfo', excerpt: 'An in-depth guide to the role, responsibilities, and benefits of a Virtual CFO for growing businesses.' },
      { title: 'When Do US Businesses Need a Virtual CFO? 5 Key Signs', path: '/blog/when-us-businesses-need-virtual-cfo', excerpt: 'An essential guide for founders on the critical signs that it\'s time to upgrade from a bookkeeper to a strategic Virtual CFO.' },
      { title: 'Virtual CFO Services for US Startups: An Essential Guide', path: '/blog/virtual-cfo-services-for-us-startups', excerpt: 'An overview of the key services a Virtual CFO provides to US startups, from financial modeling to fundraising support.' },
      { title: 'Virtual CFO vs. Traditional CFO in the US: A Modern Comparison', path: '/blog/virtual-cfo-vs-traditional-cfo-us', excerpt: 'A detailed breakdown comparing the costs, benefits, and roles of an outsourced Virtual CFO service versus hiring a full-time, in-house traditional CFO.' },
      { title: 'A Founder\'s Guide to Financial Forecasting Standards in the US', path: '/blog/financial-forecasting-standards-us', excerpt: 'An essential guide to building credible, investor-ready financial forecasts, covering bottom-up vs. top-down approaches.' },
      { title: 'A Founder\'s Guide to Cash Flow Management for US Companies', path: '/blog/cash-flow-management-for-us-companies', excerpt: 'An essential guide to the strategies and disciplines of cash flow management, from forecasting and managing receivables to controlling burn rate.' },
      { title: 'The Virtual CFO\'s Role in a Venture-Backed US Startup', path: '/blog/virtual-cfo-for-venture-backed-us-startups', excerpt: 'A guide on the role of a vCFO in managing investor relations, fundraising, board reporting, and the complexities of a high-growth company.' },
      { title: 'A Guide to Strategic Financial Planning in the US', path: '/blog/strategic-financial-planning-in-us', excerpt: 'Learn the core components of strategic financial planning, from budgeting and forecasting to KPI analysis.' },
  ];

  return <PillarPage title={title} description={description} posts={cfoPosts} />;
}
