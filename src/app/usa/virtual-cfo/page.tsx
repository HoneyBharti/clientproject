
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


export default function VirtualCfoServicePage() {
  const serviceName = "Virtual CFO";
  const countryName = "United States";
  const primaryKeyword = "Virtual CFO services USA";

  const topics = [
      {
          title: "Who Needs a vCFO",
          href: "/usa/virtual-cfo/who-needs-this-service",
          description: "Learn if your growth-stage startup or SMB is ready for strategic financial leadership.",
          icon: UserCheck
      },
      {
          title: "When to Hire a vCFO",
          href: "/blog/when-us-businesses-need-virtual-cfo",
          description: "Identify the key signs and business triggers that mean it's time to hire a vCFO.",
          icon: Clock
      },
      {
          title: "Strategic Risks of No CFO",
          href: "/usa/virtual-cfo/compliance-risks",
          description: "Understand the risks of 'flying blind' without strategic financial oversight.",
          icon: ShieldAlert
      },
      {
          title: "Our vCFO Process",
          href: "/usa/virtual-cfo/process-explained",
          description: "A step-by-step overview of how we provide strategic financial guidance to your business.",
          icon: ListChecks
      },
      {
          title: "vCFO Cost Overview",
          href: "/usa/virtual-cfo/cost-overview",
          description: "Get a clear breakdown of pricing for part-time, strategic CFO services.",
          icon: DollarSign
      },
      {
          title: "Virtual vs. Traditional CFO",
          href: "/blog/virtual-cfo-vs-traditional-cfo-us",
          description: "Compare the costs and benefits of an outsourced vCFO versus a full-time in-house CFO.",
          icon: GitCompare
      },
      {
          title: "vCFO for Foreign-Owned Companies",
          href: "/blog/cfo-support-for-foreign-owned-us-entities",
          description: "Explore the specialized strategic support non-resident founders need for US operations.",
          icon: Globe
      },
      {
          title: "Common Strategic Mistakes",
          href: "/usa/virtual-cfo/common-mistakes",
          description: "Learn about the frequent financial planning mistakes founders make and how a vCFO helps avoid them.",
          icon: AlertTriangle
      },
      {
          title: "Virtual CFO FAQs",
          href: "/usa/virtual-cfo/faqs",
          description: "Find answers to frequently asked questions about our vCFO services.",
          icon: HelpCircle
      }
  ];
  
  const decisionGuides = [
    {
      title: "DIY vs. Managed Virtual CFO",
      href: "/usa/virtual-cfo/diy-vs-managed",
      description: "A detailed comparison of DIY financial strategy versus using a professional vCFO service.",
      icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola: Virtual CFO",
        href: "/usa/virtual-cfo/yourlegal-vs-doola",
        description: "A detailed look at YourLegal's integrated CFO services versus Doola's offerings.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas: Virtual CFO",
        href: "/usa/virtual-cfo/yourlegal-vs-stripe-atlas",
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
              Strategic financial leadership to help you scale, raise capital, and maximize profitability. Explore our guides to learn how a vCFO can transform your business.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Virtual CFO Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our strategic financial services.</p>
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
