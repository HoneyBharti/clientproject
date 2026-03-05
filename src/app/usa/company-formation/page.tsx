
'use client';
import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { ChevronLeft, ChevronRight, UserCheck, Clock, ShieldAlert, ListChecks, DollarSign, GitCompare, Globe, AlertTriangle, HelpCircle, BookOpen, Server, ShoppingCart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

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


export default function CompanyFormationServicePage() {
  const serviceName = "Company Formation";
  const countryName = "United States";
  const primaryKeyword = "US company formation";

  const topics = [
    {
        title: "Who Needs This Service",
        href: "/usa/company-formation/who-needs-this-service",
        description: "Learn if a US entity is right for your international business, startup, or e-commerce store.",
        icon: UserCheck
    },
    {
        title: "When This Is Required",
        href: "/usa/company-formation/when-this-is-required",
        description: "Understand the key business milestones that make forming a legal US company a necessity.",
        icon: Clock
    },
    {
        title: "Compliance Risks",
        href: "/usa/company-formation/compliance-risks",
        description: "Explore the legal and financial risks of operating in the US without a proper legal entity.",
        icon: ShieldAlert
    },
    {
        title: "Our Process Explained",
        href: "/usa/process",
        description: "A step-by-step overview of our streamlined formation process, from filing to bank account support.",
        icon: ListChecks
    },
    {
        title: "Cost Overview",
        href: "/blog/formation-costs-in-the-united-states",
        description: "Get a clear breakdown of state fees and service costs for forming a US company.",
        icon: DollarSign
    },
    {
        title: "LLC vs. C-Corp",
        href: "/blog/llc-vs-c-corp",
        description: "An in-depth guide to help you choose the right legal structure for your business goals.",
        icon: GitCompare
    },
    {
        title: "For Foreign-Owned Companies",
        href: "/blog/us-company-formation-for-non-residents",
        description: "Understand the specific challenges and solutions for non-resident founders forming a US company.",
        icon: Globe
    },
    {
        title: "Common Formation Mistakes",
        href: "/usa/company-formation/common-mistakes",
        description: "Learn about the frequent pitfalls in the formation process and how to avoid them.",
        icon: AlertTriangle
    },
    {
        title: "Company Formation FAQs",
        href: "/usa/company-formation/faqs",
        description: "Find answers to frequently asked questions about forming a US company with YourLegal.",
        icon: HelpCircle
    }
  ];

  const decisionGuides = [
    {
        title: "DIY vs. Managed Formation",
        href: "/usa/company-formation/diy-vs-managed",
        description: "Compare the risks of DIY with the benefits of a professional service.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas",
        href: "/usa/company-formation/yourlegal-vs-stripe-atlas",
        description: "An analysis of YourLegal's integrated platform versus Stripe Atlas's formation-focused service.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola",
        href: "/usa/company-formation/yourlegal-vs-doola",
        description: "A detailed comparison of YourLegal's integrated platform versus Doola's partner-based model.",
        icon: GitCompare
    },
    {
        title: "Best Formation Service for Non-Residents",
        href: "/usa/best-company-formation",
        description: "An analysis of the best options for international founders.",
        icon: Globe
    }
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
              Launch your Delaware or Wyoming company from anywhere. Fast, compliant, and built for non-residents. Explore our guides to learn everything you need to know.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Company Formation Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our formation services.</p>
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
            
             <section className="mt-20 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
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
                    <p className="text-gray-700 font-semibold text-sm">
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
            
             <div className="mt-20">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Related Resources & Industries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Deep Dive Articles</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'The US Company Formation Process', path: '/blog/us-company-formation-process'},
                      { title: 'Delaware vs. Wyoming Incorporation', path: '/blog/delaware-vs-wyoming-incorporation'},
                      { title: 'A Non-Resident\'s Guide to US Company Formation', path: '/blog/us-company-formation-for-non-residents'},
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

    