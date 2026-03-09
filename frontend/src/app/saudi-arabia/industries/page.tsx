'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Server, ShoppingCart, Briefcase, Building, Plane, ChevronLeft, HeartPulse, Truck, Bot, GraduationCap } from 'lucide-react';

const industries = [
  {
    icon: Server,
    name: "Technology & IT Services",
    path: "/saudi-arabia/industries/saas", // Using SaaS as proxy
    description: "Serve the giga-projects of Vision 2030."
  },
  {
    icon: Briefcase,
    name: "Consulting & Advisory",
    path: "/saudi-arabia/industries/consulting",
    description: "Advise businesses in the rapidly transforming Saudi economy."
  },
  {
    icon: Building,
    name: "Construction & Real Estate",
    path: "/saudi-arabia/industries/real-estate",
    description: "Participate in the Kingdom's massive infrastructure boom."
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-commerce",
    path: "/saudi-arabia/industries/ecommerce",
    description: "Tap into a young, affluent, and digitally-savvy consumer market."
  },
  {
    icon: Plane,
    name: "Logistics & Transport",
    path: "/saudi-arabia/industries/logistics",
    description: "Leverage Saudi Arabia's strategic location to serve the region."
  },
  {
      icon: Bot,
      name: "Fintech",
      path: "/saudi-arabia/industries/fintech",
      description: "Navigate SAMA and CMA regulations in a fast-growing digital payments market."
  },
   {
      icon: HeartPulse,
      name: "Healthcare",
      path: "/saudi-arabia/industries/healthcare",
      description: "Establish clinics or health-tech solutions in a sector undergoing major expansion."
   },
   {
      icon: GraduationCap,
      name: "Agencies",
      path: "/saudi-arabia/industries/agencies",
      description: "Manage marketing, advertising, and creative projects for a booming market."
   },
   {
      icon: Building,
      name: "Manufacturing",
      path: "/saudi-arabia/industries/manufacturing",
      description: "Benefit from industrial zones and government incentives to build local production."
   },
   {
      icon: Server,
      name: "Startups",
      path: "/saudi-arabia/industries/startups",
      description: "Secure an Entrepreneurial License and tap into the venture capital ecosystem."
   }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in Saudi Arabia?</h4>
                <p className="text-gray-600">YourLegal Saudi Arabia focuses on industries central to the Kingdom's Vision 2030. This includes Technology & IT Services, professional consulting and advisory firms, construction and engineering, retail and e-commerce businesses, and logistics and transport companies looking to capitalize on the country's strategic projects.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Can a foreign consulting firm operate in Saudi Arabia?</h4>
                <p className="text-gray-600">Yes, a foreign consulting firm can operate in Saudi Arabia by obtaining a Service License from the Ministry of Investment (MISA) and establishing a local Limited Liability Company (LLC). YourLegal manages this entire process, including licensing, registration, and ongoing compliance with ZATCA and labor laws.</p>
            </div>
        </div>
    </div>
);


export default function SaudiIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/saudi-arabia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Saudi Arabia Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in <span className="text-green-800">Saudi Arabia</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation and compliance solutions for businesses tapping into the Vision 2030 growth story.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-green-300 transition group">
                <industry.icon className="w-10 h-10 text-green-800 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-900">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
                <span className="text-sm font-semibold text-green-800 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
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

