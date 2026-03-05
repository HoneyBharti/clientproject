'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Server, ShoppingCart, Briefcase, Building, Plane, ChevronLeft, HeartPulse, Truck, Bot, GraduationCap } from 'lucide-react';

const industries = [
  {
    icon: Server,
    name: "SaaS & Technology",
    path: "/usa/industries/saas",
    description: "Navigate ASC 606 revenue recognition and R&D tax credits."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce",
    path: "/usa/industries/ecommerce",
    description: "Handle multi-state sales tax nexus and inventory accounting."
  },
  {
    icon: Briefcase,
    name: "Consulting & Professional Services",
    path: "/usa/industries/consulting",
    description: "Simplified accounting for service-based revenue and contractor expenses."
  },
  {
    icon: Building,
    name: "Real Estate",
    path: "/usa/industries/real-estate",
    description: "Structure investments with LLCs, manage depreciation, and 1031 exchanges."
  },
  {
    icon: Plane,
    name: "Logistics",
    path: "/usa/industries/logistics",
    description: "Manage multi-state operations, fuel taxes, and complex asset depreciation."
  },
   {
    icon: Bot,
    name: "Startups",
    path: "/usa/industries/startups",
    description: "Set up a C-Corp for venture funding, manage stock options, and 409A valuations."
  },
   {
    icon: GraduationCap,
    name: "Agencies",
    path: "/usa/industries/agencies",
    description: "Handle project-based accounting, track profitability, and manage client retainers."
  },
   {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/usa/industries/healthcare",
    description: "HIPAA-compliant financial management and complex medical billing cycles."
  },
   {
    icon: Building,
    name: "Manufacturing",
    path: "/usa/industries/manufacturing",
    description: "Manage inventory costing (LIFO/FIFO) and Section 179 equipment deductions."
  },
   {
    icon: Server,
    name: "Fintech",
    path: "/usa/industries/fintech",
    description: "Navigate FinCEN/SEC compliance and complex transaction reconciliation."
  },
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in the USA?</h4>
                <p className="text-gray-600">YourLegal specializes in serving modern, global-first businesses in the USA. Key industries include SaaS and Technology (especially Delaware C-Corps), E-commerce brands dealing with sales tax, consulting firms and creative agencies, international holding companies using Wyoming LLCs, and digital nomads or freelancers.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is YourLegal suitable for a venture-backed startup?</h4>
                <p className="text-gray-600">Yes, YourLegal is ideal for venture-backed startups. We specialize in forming and maintaining Delaware C-Corporations, which is the standard legal structure required by venture capitalists for investment. We also handle the specific accounting and tax needs of high-growth tech companies.</p>
            </div>
        </div>
    </div>
);


export default function USAIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/usa" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to USA Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in the <span className="text-blue-600">USA</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We provide tailored formation, tax, and bookkeeping services for modern businesses operating in the US market.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition group">
                <industry.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
                <span className="text-sm font-semibold text-blue-600 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
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
