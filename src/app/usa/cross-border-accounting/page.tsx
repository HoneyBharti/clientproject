
'use client';
import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, ChevronRight, UserCheck, Clock, ShieldAlert, ListChecks, DollarSign, GitCompare, Globe, AlertTriangle, HelpCircle } from 'lucide-react';

const ServiceLink = ({ href, title, description, icon: Icon }) => (
  <Link href={href} className="block p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 ml-auto transform transition-transform group-hover:translate-x-1" />
    </div>
  </Link>
);


export default function CrossBorderAccountingServicePage() {
  const serviceName = "Cross-Border Accounting";
  const countryName = "United States";
  const primaryKeyword = "Cross-border accounting services USA";

  const topics = [
      {
          title: "Who Needs This Service",
          href: "/usa/cross-border-accounting/who-needs-this-service",
          description: "Learn if your international business requires specialized cross-border accounting.",
          icon: UserCheck
      },
      {
          title: "When This Is Required",
          href: "/usa/cross-border-accounting/when-this-is-required",
          description: "Understand the triggers for needing cross-border expertise, such as foreign subsidiaries or transactions.",
          icon: Clock
      },
      {
          title: "Compliance Risks",
          href: "/blog/us-accounting-risks-for-foreign-owners",
          description: "Explore risks like Form 5472 penalties, transfer pricing issues, and withholding taxes.",
          icon: ShieldAlert
      },
      {
          title: "Our Process Explained",
          href: "/usa/cross-border-accounting/process-explained",
          description: "A step-by-step overview of how we manage multi-currency consolidation, transfer pricing, and tax treaties.",
          icon: ListChecks
      },
      {
          title: "Cost Overview",
          href: "/usa/cross-border-accounting/cost-overview",
          description: "A breakdown of typical costs for international accounting and tax advisory services.",
          icon: DollarSign
      },
      {
          title: "Outsourced vs. In-House",
          href: "/usa/cross-border-accounting/outsourced-vs-in-house",
          description: "Compare the benefits of outsourcing global accounting versus attempting to build an in-house team.",
          icon: GitCompare
      },
      {
          title: "For Foreign-Owned Companies",
          href: "/usa/cross-border-accounting/for-foreign-owned-companies",
          description: "Learn about specific accounting challenges for non-resident founders, from Form 5472 to withholding tax.",
          icon: Globe
      },
      {
          title: "Common Mistakes",
          href: "/usa/cross-border-accounting/common-mistakes",
          description: "Discover the frequent pitfalls in international accounting and how to avoid them.",
          icon: AlertTriangle
      },
      {
          title: "Cross-Border FAQs",
          href: "/usa/cross-border-accounting/faqs",
          description: "Find answers to frequently asked questions about our international accounting services.",
          icon: HelpCircle
      }
  ];
  
  const decisionGuides = [
    {
      title: "DIY vs. Managed Cross-Border Accounting",
      href: "/usa/cross-border-accounting/diy-vs-managed",
      description: "A detailed comparison of DIY versus professional managed services.",
      icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola: Cross-Border Accounting",
        href: "/usa/cross-border-accounting/yourlegal-vs-doola",
        description: "A detailed look at YourLegal's integrated services versus Doola's offerings.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas: Cross-Border Accounting",
        href: "/usa/cross-border-accounting/yourlegal-vs-stripe-atlas",
        description: "An analysis of YourLegal's platform versus Stripe Atlas's service.",
        icon: GitCompare
    },
  ];

  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
      <main>
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Link href="/usa/services" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to USA Services
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {serviceName} Services in the {countryName}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial management for global businesses, covering transfer pricing, tax treaties, and multi-currency operations.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Cross-Border Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our international services.</p>
            </div>

            <div className="space-y-4">
                {topics.map(topic => (
                    <ServiceLink key={topic.href} {...topic} />
                ))}
            </div>
             <div className="mt-16">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Decision Guides</h3>
              <div className="space-y-4">
                {decisionGuides.map(guide => (
                  <ServiceLink key={guide.href} {...guide} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
