
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


export default function AnnualComplianceServicePage() {
  const serviceName = "Annual Compliance";
  const countryName = "United States";
  const primaryKeyword = "US company annual compliance";

  const topics = [
      {
          title: "Who Needs This Service",
          href: "/usa/annual-compliance/who-needs-this-service",
          description: "Learn why every US company must meet annual state-level filing requirements.",
          icon: UserCheck
      },
      {
          title: "When This Is Required",
          href: "/usa/annual-compliance/when-this-is-required",
          description: "Understand the annual deadlines for franchise taxes and reports in states like Delaware and Wyoming.",
          icon: Clock
      },
      {
          title: "Compliance Risks",
          href: "/usa/annual-compliance/compliance-risks",
          description: "Explore the risks of non-compliance, including loss of good standing and administrative dissolution.",
          icon: ShieldAlert
      },
      {
          title: "Our Process Explained",
          href: "/usa/annual-compliance/process-explained",
          description: "A step-by-step overview of how we manage your state filings and maintain your company's good standing.",
          icon: ListChecks
      },
      {
          title: "Cost Overview",
          href: "/usa/annual-compliance/cost-overview",
          description: "Get a clear breakdown of state fees and our service costs for annual compliance.",
          icon: DollarSign
      },
      {
          title: "Annual Reports vs. Tax Returns",
          href: "/blog/us-federal-vs-state-annual-filings",
          description: "Understand the critical difference between state reports and federal IRS tax filings.",
          icon: GitCompare
      },
      {
          title: "BOI Report Explained",
          href: "/blog/boi-reporting-requirements-explained",
          description: "Learn about the mandatory Beneficial Ownership Information report due to FinCEN.",
          icon: Globe
      },
      {
          title: "Deadlines to Know",
          href: "/blog/compliance-deadlines-us-businesses-miss",
          description: "Discover the most commonly missed deadlines that carry the highest penalties.",
          icon: AlertTriangle
      },
      {
          title: "Annual Compliance FAQs",
          href: "/usa/annual-compliance/faqs",
          description: "Find answers to frequently asked questions about our annual compliance services.",
          icon: HelpCircle
      }
  ];

  const decisionGuides = [
    {
        title: "DIY vs. Managed Annual Compliance",
        href: "/usa/annual-compliance/diy-vs-managed",
        description: "Compare the risks of DIY compliance with the peace of mind of a professional service.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola: Annual Compliance",
        href: "/usa/annual-compliance/yourlegal-vs-doola",
        description: "See how YourLegal's proactive compliance compares to Doola's annual filing service.",
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
              Automated state filings to keep your US company in good standing, year after year. Explore our guides on every aspect of US annual compliance.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Annual Compliance Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more.</p>
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
                      { title: 'The Ultimate Annual Compliance Checklist', path: '/blog/us-annual-compliance-checklist'},
                      { title: 'Maintaining Good Standing', path: '/blog/maintaining-good-standing-in-us'},
                      { title: 'Penalties for Missing Annual Filings', path: '/blog/penalties-for-missing-annual-filings'},
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
