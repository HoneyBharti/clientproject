
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


export default function TaxComplianceServicePage() {
  const serviceName = "Tax Compliance";
  const countryName = "United States";
  const primaryKeyword = "Tax compliance services USA";

  const topics = [
      {
          title: "Who Needs Tax Services",
          href: "/usa/tax-compliance/who-needs-this-service",
          description: "Learn why every US company has a mandatory annual tax filing obligation.",
          icon: UserCheck
      },
      {
          title: "When Taxes Are Due",
          href: "/blog/us-company-tax-filing-deadlines",
          description: "A guide to the key federal and state tax deadlines for LLCs and C-Corps.",
          icon: Clock
      },
      {
          title: "Compliance Risks & Penalties",
          href: "/blog/common-irs-penalties-for-businesses",
          description: "Understand the severe IRS penalties for late filing, late payment, and other common errors.",
          icon: ShieldAlert
      },
      {
          title: "Our Tax Process Explained",
          href: "/usa/tax-compliance/process-explained",
          description: "A step-by-step overview of how we prepare and file your federal and state tax returns.",
          icon: ListChecks
      },
      {
          title: "Tax Service Cost Overview",
          href: "/usa/tax-compliance/cost-overview",
          description: "Get a clear breakdown of pricing for US business tax preparation and filing services.",
          icon: DollarSign
      },
      {
          title: "State vs. Federal Taxes",
          href: "/blog/us-federal-vs-state-tax-obligations",
          description: "Understand the critical difference between your IRS obligations and your state-level tax duties.",
          icon: GitCompare
      },
      {
          title: "Tax Guide for Foreign Owners",
          href: "/blog/non-resident-tax-guide",
          description: "A deep dive into the specific, high-stakes tax filing requirements for non-resident founders.",
          icon: Globe
      },
       {
          title: "Common Tax Mistakes",
          href: "/usa/tax-compliance/common-mistakes",
          description: "Learn about the frequent filing errors that can trigger audits and penalties.",
          icon: AlertTriangle
      },
      {
          title: "Tax Compliance FAQs",
          href: "/usa/tax-compliance/faqs",
          description: "Find answers to frequently asked questions about our US tax filing services.",
          icon: HelpCircle
      }
  ];

  const decisionGuides = [
    {
      title: "YourLegal vs. Doola: Tax Compliance",
      href: "/usa/tax-compliance/yourlegal-vs-doola",
      description: "Compare our integrated tax services with Doola's partner-based model.",
      icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas: Tax Compliance",
        href: "/usa/tax-compliance/yourlegal-vs-stripe-atlas",
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
              Accurate, deadline-driven tax preparation and filing for US businesses. Explore our guides to demystify US taxes.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Tax Compliance Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our tax services.</p>
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
                      { title: 'The Ultimate US Business Tax Compliance Checklist', path: '/blog/us-business-tax-compliance-checklist'},
                      { title: '5 Startup Deductions You’re Missing Out On', path: '/blog/5-deductions-youre-missing-out-on'},
                      { title: 'US Tax Treaties Explained', path: '/blog/us-tax-treaties-explained'},
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

