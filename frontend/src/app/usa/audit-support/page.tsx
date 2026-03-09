
'use client';
import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
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


export default function AuditSupportPage() {
  const serviceName = "Audit Support";
  const countryName = "USA";
  const primaryKeyword = "US company audit support";

  const topics = [
      {
          title: "Who Needs Audit Support",
          href: "/usa/audit-support/who-needs-this-service",
          description: "Understand if your venture-backed startup or regulated business requires audit support.",
          icon: UserCheck
      },
      {
          title: "When an Audit Is Required",
          href: "/usa/audit-support/when-this-is-required",
          description: "Learn about the contractual and regulatory triggers that mandate a financial audit.",
          icon: Clock
      },
      {
          title: "Compliance Risks",
          href: "/usa/audit-support/compliance-risks",
          description: "Explore the risks of a failed audit, including loss of investor confidence and funding.",
          icon: ShieldAlert
      },
      {
          title: "Our Audit Support Process",
          href: "/usa/audit-support/process-explained",
          description: "A step-by-step overview of how we prepare your company for a smooth audit.",
          icon: ListChecks
      },
      {
          title: "Cost Overview",
          href: "/usa/audit-support/cost-overview",
          description: "Get a clear breakdown of pricing for audit preparation and support services.",
          icon: DollarSign
      },
      {
          title: "Audit vs. Review vs. Compilation",
          href: "/blog/audit-vs-review-vs-compilation",
          description: "Understand the critical differences between the levels of financial statement assurance.",
          icon: GitCompare
      },
      {
          title: "Preparing for an IRS Audit",
          href: "/blog/preparing-for-irs-audits",
          description: "Learn the key steps to take if you receive an audit notice from the IRS.",
          icon: Globe
      },
      {
          title: "Common Audit Triggers",
          href: "/blog/audit-triggers-in-the-united-states",
          description: "Discover the red flags in your financials that can attract auditor or IRS scrutiny.",
          icon: AlertTriangle
      },
      {
          title: "Audit Support FAQs",
          href: "/usa/audit-support/faqs",
          description: "Find answers to frequently asked questions about our audit support services.",
          icon: HelpCircle
      }
  ];

  const decisionGuides = [
    {
      title: "DIY vs. Managed Audit Support",
      href: "/usa/audit-support/diy-vs-managed",
      description: "Compare the risks of DIY audit prep with the benefits of a professional service.",
      icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola: Audit Support",
        href: "/usa/audit-support/yourlegal-vs-doola",
        description: "A detailed look at YourLegal's integrated audit support versus Doola's offerings.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas: Audit Support",
        href: "/usa/audit-support/yourlegal-vs-stripe-atlas",
        description: "An analysis of YourLegal's platform versus Stripe Atlas's formation-focused service.",
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
              Navigate financial statement audits with confidence. We provide the audit-ready books and expert support you need for a smooth process and a clean opinion.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Audit Support Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our audit support services.</p>
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

