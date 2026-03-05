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
    path: "/in/industries/saas",
    description: "Navigate complex GST rules for software and international sales."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & D2C Brands",
    path: "/in/industries/ecommerce",
    description: "Manage GST/TCS compliance and marketplace reconciliation."
  },
  {
    icon: Briefcase,
    name: "Consulting & Professional Services",
    path: "/in/industries/consulting",
    description: "Optimize tax efficiency and manage GST/TDS compliance."
  },
  {
    icon: Building,
    name: "Real Estate",
    path: "/in/industries/real-estate",
    description: "Handle RERA compliance, project accounting, and complex tax rules."
  },
  {
    icon: Plane,
    name: "Logistics",
    path: "/in/industries/logistics",
    description: "Master GST on transport services, e-way bills, and fleet costs."
  },
  {
    icon: Bot,
    name: "Startups",
    path: "/in/industries/startups",
    description: "Handle FEMA/RBI compliance for foreign funding and manage ESOPs."
  },
  {
    icon: GraduationCap,
    name: "Agencies",
    path: "/in/industries/agencies",
    description: "Manage project profitability, retainers, and GST/TDS compliance."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/in/industries/healthcare",
    description: "Navigate complex insurance billing and healthcare regulations."
  },
  {
    icon: Building,
    name: "Manufacturing",
    path: "/in/industries/manufacturing",
    description: "Manage complex inventory costing and overhead allocation."
  },
  {
    icon: Server,
    name: "Fintech",
    path: "/in/industries/fintech",
    description: "Navigate complex regulations from RBI, SEBI, and other bodies."
  }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in India?</h4>
                <p className="text-gray-600">YourLegal India specializes in supporting foreign-invested and technology-first businesses. Key industries include SaaS & Technology (managing GST and FEMA), E-commerce (handling GST/TCS), consulting firms, high-growth startups raising capital, and manufacturing & logistics companies navigating India's complex tax system.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is an Indian company good for a foreign SaaS business?</h4>
                <p className="text-gray-600">Yes, an Indian Private Limited company is an excellent structure for a SaaS business serving the Indian market. It allows you to hire local talent and process payments easily. YourLegal helps navigate the complexities of GST on software and FEMA compliance for receiving foreign funds or making payments for international services.</p>
            </div>
        </div>
    </div>
);


export default function IndiaIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/in" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to India Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in <span className="text-orange-600">India</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation, tax, and bookkeeping solutions for modern businesses operating in the Indian market.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-orange-300 transition group">
                <industry.icon className="w-10 h-10 text-orange-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-700">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
                 <span className="text-sm font-semibold text-orange-600 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
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
