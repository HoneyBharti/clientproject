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
    path: "/singapore/industries/saas",
    description: "Benefit from strong IP protection and the Start-up Tax Exemption (SUTE)."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Regional Hubs",
    path: "/singapore/industries/ecommerce",
    description: "Use Singapore as a world-class logistics hub to serve Southeast Asia."
  },
  {
    icon: Briefcase,
    name: "Consulting & Services",
    path: "/singapore/industries/consulting",
    description: "A credible, professional entity for serving high-value clients across Asia."
  },
  {
    icon: Building,
    name: "Holding Companies",
    path: "/singapore/industries/real-estate",
    description: "Leverage political stability and a tax-efficient environment for asset holding."
  },
  {
    icon: Plane,
    name: "Global Entrepreneurs",
    path: "/singapore/industries/startups",
    description: "Incorporate to apply for an Employment Pass and get a base in Asia."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/singapore/industries/healthcare",
    description: "Navigate HSA regulations and specialized accounting for health-tech and clinics."
  },
  {
    icon: Truck,
    name: "Logistics",
    path: "/singapore/industries/logistics",
    description: "Manage complex supply chains through one of the world's busiest ports."
  },
  {
    icon: Bot,
    name: "Fintech",
    path: "/singapore/industries/fintech",
    description: "Comply with MAS regulations in a leading global financial center."
  },
  {
    icon: GraduationCap,
    name: "Agencies",
    path: "/singapore/industries/agencies",
    description: "A premier hub for creative and marketing agencies serving the APAC region."
  },
  {
    icon: Building,
    name: "Manufacturing",
    path: "/singapore/industries/manufacturing",
    description: "High-tech manufacturing with a focus on IP protection and quality."
  }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in Singapore?</h4>
                <p className="text-gray-600">YourLegal Singapore caters to businesses using the nation as a strategic hub for Asia. Key industries include SaaS & Technology companies seeking IP protection, E-commerce brands building regional logistics, consulting firms, and international holding companies or family offices benefiting from Singapore's stability and tax efficiency.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is Singapore good for a foreign tech startup?</h4>
                <p className="text-gray-600">Yes, Singapore is an excellent choice. It offers strong intellectual property (IP) laws, a robust legal system, access to venture capital, and attractive government incentives like the Start-up Tax Exemption (SUTE), which can significantly reduce a new company's tax burden in its first three years.</p>
            </div>
        </div>
    </div>
);


export default function SingaporeIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/singapore" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Singapore Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in <span className="text-red-600">Singapore</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation and compliance solutions for businesses establishing their headquarters in Asia's premier financial hub.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-red-300 transition group">
                <industry.icon className="w-10 h-10 text-red-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-700">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
                <span className="text-sm font-semibold text-red-600 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
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

