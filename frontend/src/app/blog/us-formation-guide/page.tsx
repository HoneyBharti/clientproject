'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Formation Pillar</p>
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

          <section className="mt-20 bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Banking Support Through Our Partner, Mercury</h2>
              <div className="text-center">
                  <p className="text-gray-600 mb-6">
                      YourLegal partners with Mercury to help eligible businesses access modern
                      business banking services in the United States. As part of our company
                      formation and compliance support, we assist founders with the Mercury
                      account application process.
                  </p>
                  <div className="flex justify-center mb-6">
                      <Image
                          src="/partners/mercury-logo.svg"
                          alt="Mercury Bank logo"
                          width={150}
                          height={40}
                      />
                  </div>
                  <p className="text-gray-700 font-semibold">
                      Important: All bank account applications are reviewed,
                      approved, or rejected solely by Mercury. YourLegal does not control or
                      influence approval decisions.
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                      Mercury is a financial technology company, not a bank. Banking services are
                      provided by Mercury’s partner banks. Account approval is subject to
                      Mercury’s internal compliance and risk review processes.
                  </p>
              </div>
          </section>

        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default function FormationPillarPage() {
  const title = "The Complete Guide to US Company Formation";
  const description = "Everything you need to know about starting a US business, from choosing between an LLC and a C-Corp to post-incorporation legal requirements.";
  const formationPosts = [
      { title: 'The US Company Formation Process: A Step-by-Step Guide', path: '/blog/us-company-formation-process', excerpt: 'A comprehensive guide for founders on the complete process of forming a US company, from choosing an entity to opening a bank account.' },
      { title: 'Delaware vs. Wyoming for Incorporation: Which State Is Right for You?', path: '/blog/delaware-vs-wyoming-incorporation', excerpt: 'A comprehensive comparison of Delaware and Wyoming for company formation, covering costs, privacy, and legal systems.' },
      { title: 'A Non-Resident\'s Guide to US Company Formation', path: '/blog/us-company-formation-for-non-residents', excerpt: 'An essential guide for international founders on the specific challenges and solutions for forming a US LLC or C-Corp.' },
      { title: 'EIN vs. ITIN: A Non-Resident Founder\'s Guide', path: '/blog/ein-itin-explained', excerpt: 'A clear explanation of the difference between an Employer Identification Number (EIN) for your business and an Individual Taxpayer Identification Number (ITIN).' },
      { title: 'Post-Incorporation Checklist: 5 Legal Steps After Forming Your US Company', path: '/blog/legal-compliance-after-us-company-formation', excerpt: 'This guide covers the critical post-incorporation steps like drafting bylaws, issuing stock, and holding your first board meeting.' },
      { title: 'Choosing the Right US Business Structure: LLC vs. C-Corp vs. Sole Proprietorship', path: '/blog/choosing-the-right-us-business-structure', excerpt: 'A guide for founders on the key differences between the main US business structures, focusing on liability, taxation, and fundraising.' },
      { title: 'A Founder\'s Guide to US Company Formation Costs', path: '/blog/formation-costs-in-the-united-states', excerpt: 'A detailed breakdown of the costs to form and maintain a US company, including state filing fees and annual franchise taxes.' },
      { title: 'LLC vs. C-Corp: The Ultimate Guide for Startup Founders', path: '/blog/llc-vs-c-corp', excerpt: 'Choosing your business entity is the most critical decision you\'ll make. This in-depth guide breaks it down.' },
  ];

  return <PillarPage title={title} description={description} posts={formationPosts} />;
}

