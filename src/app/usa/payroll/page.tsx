
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


export default function PayrollServicePage() {
  const serviceName = "Payroll";
  const countryName = "United States";
  const primaryKeyword = "US payroll services";

  const topics = [
      {
          title: "Who Needs Payroll Services",
          href: "/usa/payroll/who-needs-this-service",
          description: "Understand when your business needs to set up a formal payroll system.",
          icon: UserCheck
      },
      {
          title: "When Payroll Is Required",
          href: "/usa/payroll/when-this-is-required",
          description: "Learn about the legal triggers for running payroll, such as hiring your first W-2 employee.",
          icon: Clock
      },
      {
          title: "Compliance Risks of DIY Payroll",
          href: "/usa/payroll/compliance-risks",
          description: "Explore the severe penalties from the IRS for misclassification, late filings, and other common errors.",
          icon: ShieldAlert
      },
      {
          title: "Our Payroll Process Explained",
          href: "/usa/payroll/process-explained",
          description: "A step-by-step overview of how we onboard employees and process your payroll compliantly.",
          icon: ListChecks
      },
      {
          title: "Payroll Cost Overview",
          href: "/usa/payroll/cost-overview",
          description: "Get a clear breakdown of the typical costs for outsourced payroll services in the US.",
          icon: DollarSign
      },
      {
          title: "For Remote & Foreign Employers",
          href: "/blog/us-payroll-compliance-for-foreign-employers",
          description: "Understand the unique payroll challenges faced by remote-first companies and non-resident employers.",
          icon: Globe
      },
      {
          title: "Common Payroll Mistakes",
          href: "/blog/payroll-mistakes-irs-penalties",
          description: "Learn about the most frequent and costly payroll errors and how to avoid them.",
          icon: AlertTriangle
      },
      {
          title: "Payroll FAQs",
          href: "/usa/payroll/faqs",
          description: "Find answers to frequently asked questions about our US payroll services.",
          icon: HelpCircle
      }
  ];

  const decisionGuides = [
    {
        title: "DIY vs. Managed Payroll",
        href: "/usa/payroll/diy-vs-managed",
        description: "Compare the risks of DIY payroll with the benefits of a professional service.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Doola: Payroll",
        href: "/usa/payroll/yourlegal-vs-doola",
        description: "An analysis of YourLegal's integrated platform versus Doola's partner-based model.",
        icon: GitCompare
    },
    {
        title: "YourLegal vs. Stripe Atlas: Payroll",
        href: "/usa/payroll/yourlegal-vs-stripe-atlas",
        description: "An analysis of YourLegal's integrated platform versus Stripe Atlas's formation-focused service.",
        icon: GitCompare
    },
    {
        title: "Employee (W-2) vs. Contractor (1099)",
        href: "/blog/employee-vs-contractor-payroll-rules-us",
        description: "Learn the critical differences and avoid costly misclassification penalties.",
        icon: GitCompare
    },
     {
        title: "Outsourced vs. In-House Payroll",
        href: "/blog/outsourced-vs-in-house-payroll-us",
        description: "A detailed comparison of the costs, benefits, and roles of an outsourced payroll service versus hiring an in-house team.",
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
              Compliant, automated payroll to pay your US employees and contractors on time, every time. Explore our guides to understand US payroll inside and out.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Payroll Topics</h2>
                <p className="text-lg text-gray-600">Click on a topic below to learn more about our payroll services.</p>
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
