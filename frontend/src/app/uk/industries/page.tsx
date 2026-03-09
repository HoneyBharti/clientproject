'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Server, ShoppingCart, Briefcase, Building, Plane, ChevronLeft, HeartPulse, Truck, Bot, GraduationCap } from 'lucide-react';

const industries = [
  {
    icon: Server,
    name: "SaaS & Technology",
    path: "/uk/industries/saas",
    description: "A credible base for serving European customers, with access to a large tech talent pool."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce",
    path: "/uk/industries/ecommerce",
    description: "Establish a UK presence to simplify logistics and manage VAT for UK/EU sales."
  },
  {
    icon: Briefcase,
    name: "Consulting & Services",
    path: "/uk/industries/consulting",
    description: "A UK entity offers global prestige and a stable legal framework."
  },
  {
    icon: Building,
    name: "Holding Companies",
    path: "/uk/industries/real-estate",
    description: "Hold assets or shares in other entities, benefiting from a stable legal system."
  },
  {
    icon: Plane,
    name: "Global Entrepreneurs",
    path: "/uk/industries/startups",
    description: "Fast and easy to set up for non-residents, providing a strong foundation."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/uk/industries/healthcare",
    description: "Navigate NHS procurement and CQC compliance for health-tech and private care."
  },
  {
    icon: Truck,
    name: "Logistics",
    path: "/uk/industries/logistics",
    description: "Manage UK and EU supply chains with compliant financial structures."
  },
  {
    icon: Bot,
    name: "Fintech",
    path: "/uk/industries/fintech",
    description: "Handle FCA regulations and complex financial reporting in a global fintech hub."
  },
  {
    icon: GraduationCap,
    name: "Agencies",
    path: "/uk/industries/agencies",
    description: "A prestigious base for creative, marketing, and advertising firms with global clients."
  },
  {
    icon: Building,
    name: "Manufacturing",
    path: "/uk/industries/manufacturing",
    description: "Manage supply chains, inventory, and benefit from R&D tax credits."
  }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in the UK?</h4>
                <p className="text-gray-600">YourLegal UK provides services for a range of modern businesses. Key industries include SaaS and Technology companies targeting the UK/EU market, E-commerce brands managing UK VAT, international consulting and creative agencies, and global entrepreneurs needing a prestigious and credible UK corporate structure.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is a UK company good for a non-resident?</h4>
                <p className="text-gray-600">Yes, the UK is one of the easiest places for a non-resident to set up a company. There is no local director requirement, the process is fast, and it provides a globally respected business entity. YourLegal handles the entire remote setup, including the mandatory UK registered office address.</p>
            </div>
        </div>
    </div>
);


export default function UKIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/uk" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to UK Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in the <span className="text-blue-800">UK</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation, tax, and bookkeeping services for modern businesses operating in the United Kingdom.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition group">
                <industry.icon className="w-10 h-10 text-blue-800 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-900">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
                 <span className="text-sm font-semibold text-blue-800 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
              </Link>
            ))}
          </div>

          <AiAnswerBlock />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

