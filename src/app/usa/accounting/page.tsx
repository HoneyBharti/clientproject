
'use client';
import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, ChevronRight, UserCheck, Clock, ShieldAlert, ListChecks, DollarSign, GitCompare, Globe, AlertTriangle, HelpCircle, BookOpen, Server, ShoppingCart, TrendingUp } from 'lucide-react';

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


export default function AccountingServicePage() {
    const serviceName = "Accounting";
    const countryName = "USA";
    const primaryKeyword = "US company accounting";

    const topics = [
        {
            title: "Who Needs This Service",
            href: "/usa/accounting/who-needs-this-service",
            description: "Identify if our accounting services are the right fit for your business stage.",
            icon: UserCheck
        },
        {
            title: "When Accounting Is Required",
            href: "/usa/accounting/when-this-is-required",
            description: "Learn about the key triggers that make professional accounting essential.",
            icon: Clock
        },
        {
            title: "Compliance Risks",
            href: "/usa/accounting/compliance-risks",
            description: "Explore the risks of poor accounting, from IRS penalties to failed audits.",
            icon: ShieldAlert
        },
        {
            title: "Our Accounting Process",
            href: "/usa/accounting/process-explained",
            description: "A step-by-step overview of our accounting and reporting process.",
            icon: ListChecks
        },
        {
            title: "Cost Overview",
            href: "/usa/accounting/cost-overview",
            description: "Get a clear breakdown of pricing for US accounting services.",
            icon: DollarSign
        },
        {
            title: "Outsourced vs. In-House",
            href: "/usa/accounting/outsourced-vs-in-house",
            description: "Compare the benefits and costs of outsourcing versus hiring an in-house team.",
            icon: GitCompare
        },
        {
            title: "For Foreign-Owned Companies",
            href: "/usa/accounting/for-foreign-owned-companies",
            description: "Understand the specific accounting challenges faced by non-resident founders.",
            icon: Globe
        },
        {
            title: "Common Mistakes",
            href: "/usa/accounting/common-mistakes",
            description: "Learn about the frequent accounting errors startups make and how to avoid them.",
            icon: AlertTriangle
        },
        {
            title: "FAQs",
            href: "/usa/accounting/faqs",
            description: "Find answers to frequently asked questions about our accounting services.",
            icon: HelpCircle
        }
    ];
    
    const decisionGuides = [
        {
            title: "DIY vs. Managed Accounting",
            href: "/usa/accounting/diy-vs-managed",
            description: "Understand the trade-offs between DIY and professional accounting services.",
            icon: GitCompare
        },
        {
            title: "YourLegal vs. Doola: Accounting",
            href: "/usa/accounting/yourlegal-vs-doola",
            description: "A detailed look at YourLegal's integrated accounting platform versus Doola's partner-based model.",
            icon: GitCompare
        },
        {
            title: "YourLegal vs. Stripe Atlas: Accounting",
            href: "/usa/accounting/yourlegal-vs-stripe-atlas",
            description: "An analysis of YourLegal's integrated platform versus Stripe Atlas's formation-focused service.",
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
              Expert {primaryKeyword.toLowerCase()} to ensure your business stays compliant and financially sound. Explore our detailed guides on every aspect of US accounting.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore US Accounting</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our accounting services.</p>
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

            <div className="mt-20">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Related Resources & Industries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Deep Dive Articles</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'US Accounting Compliance Checklist', path: '/blog/us-accounting-compliance-checklist'},
                      { title: 'Bookkeeping Requirements in the USA', path: '/blog/us-bookkeeping-requirements'},
                      { title: 'GAAP vs Cash Accounting', path: '/blog/usa-gaap-vs-cash-accounting'},
                      { title: 'Common Accounting Mistakes', path: '/blog/common-us-startup-accounting-mistakes'},
                      { title: 'When to Outsource Accounting', path: '/blog/when-us-companies-should-outsource-accounting'},
                    ].map(post => (
                      <li key={post.path}>
                        <Link href={post.path} className="text-blue-600 hover:underline flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Relevant For Industries</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'SaaS & Technology', path: '/usa/industries/saas', icon: Server},
                      { title: 'E-commerce', path: '/usa/industries/ecommerce', icon: ShoppingCart},
                      { title: 'Venture-Backed Startups', path: '/usa/industries/startups', icon: TrendingUp},
                    ].map(industry => (
                      <li key={industry.path}>
                        <Link href={industry.path} className="text-blue-600 hover:underline flex items-center">
                          <industry.icon className="w-4 h-4 mr-2" />
                          {industry.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

    