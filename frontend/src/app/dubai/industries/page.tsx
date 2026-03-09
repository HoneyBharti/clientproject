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
    path: "/dubai/industries/saas",
    description: "Benefit from 0% corporate tax on qualifying international income."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Trading",
    path: "/dubai/industries/ecommerce",
    description: "Use a Dubai Free Zone as a hub for international logistics and trade."
  },
  {
    icon: Briefcase,
    name: "Consulting & Services",
    path: "/dubai/industries/consulting",
    description: "Serve a global clientele with minimal administrative and tax overhead."
  },
  {
    icon: Building,
    name: "Holding Companies",
    path: "/dubai/industries/real-estate", // Re-using real-estate as a proxy for holding structures
    description: "A tax-efficient jurisdiction for holding global assets and IP."
  },
  {
    icon: Plane,
    name: "Global Entrepreneurs",
    path: "/dubai/industries/startups", // Re-using startups
    description: "Obtain a residence visa and a stable, tax-friendly base."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/dubai/industries/healthcare",
    description: "Navigate DHA regulations and specialized financial management."
  },
  {
    icon: Truck,
    name: "Logistics",
    path: "/dubai/industries/logistics",
    description: "Leverage Dubai's world-class infrastructure for global supply chains."
  },
  {
    icon: Bot,
    name: "Fintech",
    path: "/dubai/industries/fintech",
    description: "Comply with DFSA/FSRA rules in a thriving financial technology hub."
  },
  {
    icon: GraduationCap,
    name: "Agencies",
    path: "/dubai/industries/agencies",
    description: "Manage client projects and regional operations from a central hub."
  },
  {
    icon: Building,
    name: "Manufacturing",
    path: "/dubai/industries/manufacturing",
    description: "Utilize free zones for import/export and streamlined production."
  }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in Dubai (UAE)?</h4>
                <p className="text-gray-600">YourLegal in Dubai specializes in serving international and export-oriented businesses. Key industries include SaaS and Technology firms leveraging the 0% tax rate, E-commerce and global trading companies, international consulting and professional services firms, asset holding companies, and global entrepreneurs seeking a UAE residence visa.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is a Dubai Free Zone good for a SaaS company?</h4>
                <p className="text-gray-600">Yes, a Dubai Free Zone is an excellent choice for a SaaS company with international customers. It allows you to benefit from 0% corporate tax on 'Qualifying Income' (income from outside the UAE), provides 100% foreign ownership, and offers a stable base for global operations.</p>
            </div>
        </div>
    </div>
);


export default function DubaiIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/dubai" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dubai Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in <span className="text-blue-600">Dubai (UAE)</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation and tax solutions for international businesses leveraging Dubai as a global hub.
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

