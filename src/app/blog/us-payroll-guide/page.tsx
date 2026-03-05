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
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">US Payroll Pillar</p>
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

export default function PayrollPillarPage() {
  const title = "The Complete Guide to US Payroll Compliance";
  const description = "From worker classification to multi-state remote teams, this is your complete guide to navigating the complex world of payroll in the United States.";
  const payrollPosts = [
      { title: 'A Founder\'s Guide to US Payroll Compliance Rules', path: '/blog/us-payroll-compliance-rules', excerpt: 'An essential guide covering the core rules of US payroll, from worker classification and tax withholding to required forms and reporting.' },
      { title: 'Federal vs. State Payroll Taxes Explained: A Guide for Employers', path: '/blog/federal-vs-state-payroll-taxes-explained', excerpt: 'A clear breakdown of the different payroll taxes employers must manage in the US, from federal FICA and FUTA to state-level SUI.' },
      { title: 'Payroll Compliance for Remote Teams in the USA: The Multi-State Minefield', path: '/blog/payroll-compliance-for-remote-teams', excerpt: 'Hiring remote employees across the US creates complex state-by-state payroll tax obligations. This guide explains nexus and why professional payroll is essential.' },
      { title: 'Top Payroll Mistakes That Trigger Severe IRS Penalties', path: '/blog/payroll-mistakes-irs-penalties', excerpt: 'An essential guide to the most dangerous US payroll errors, including worker misclassification and the severe Trust Fund Recovery Penalty.' },
      { title: 'The US Payroll Setup Checklist: A Step-by-Step Guide for Founders', path: '/blog/us-payroll-setup-checklist', excerpt: 'An essential checklist for new employers on how to set up a compliant US payroll system, from obtaining tax IDs to running your first payroll.' },
      { title: 'Outsourced vs. In-House Payroll in the US: A Comparison for Founders', path: '/blog/outsourced-vs-in-house-payroll-us', excerpt: 'A detailed comparison of outsourced and in-house payroll, covering cost, compliance risk, and efficiency.' },
      { title: 'A Foreign Employer\'s Guide to US Payroll Compliance', path: '/blog/us-payroll-compliance-for-foreign-employers', excerpt: 'An essential guide for non-US companies on the unique challenges of US payroll, including EINs for foreigners and multi-state nexus.' },
      { title: 'Employee (W-2) vs. Contractor (1099): A Guide to US Payroll Rules', path: '/blog/employee-vs-contractor-payroll-rules-us', excerpt: 'A guide for US employers on the critical differences between W-2 employees and 1099 contractors, the IRS control test, and the severe penalties for misclassification.' },
      { title: 'The End-of-Year Payroll Compliance Checklist for US Businesses', path: '/blog/end-of-year-payroll-compliance-us', excerpt: 'An essential checklist for US employers on year-end payroll tasks, including data verification, Form 940 filing, and the critical W-2 and 1099 deadlines.' },
  ];

  return <PillarPage title={title} description={description} posts={payrollPosts} />;
}
