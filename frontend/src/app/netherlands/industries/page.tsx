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
    path: "/netherlands/industries/saas",
    description: "Leverage R&D tax credits (WBSO) and attract talent with the 30% ruling."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Trading",
    path: "/netherlands/industries/ecommerce",
    description: "Use the Netherlands as your EU logistics hub with VAT deferment."
  },
  {
    icon: Briefcase,
    name: "Consulting & Services",
    path: "/netherlands/industries/consulting",
    description: "Serve the EU market from a stable and credible Dutch B.V."
  },
  {
    icon: Building,
    name: "Holding Companies",
    path: "/netherlands/industries/real-estate",
    description: "Benefit from the extensive tax treaty network and participation exemption."
  },
  {
    icon: Plane,
    name: "Global Entrepreneurs",
    path: "/netherlands/industries/startups",
    description: "Access the EU single market with a flexible, non-resident-friendly structure."
  },
  {
      icon: HeartPulse,
      name: "Healthcare",
      path: "/netherlands/industries/healthcare",
      description: "Navigate specific BTW (VAT) rules for medical services and products."
  },
  {
      icon: Truck,
      name: "Logistics",
      path: "/netherlands/industries/logistics",
      description: "Optimize for the Port of Rotterdam and Schiphol, managing EU transport finance."
  },
  {
      icon: Bot,
      name: "Fintech",
      path: "/netherlands/industries/fintech",
      description: "Comply with DNB and AFM regulations in a major European financial hub."
  },
  {
      icon: GraduationCap,
      name: "Agencies",
      path: "/netherlands/industries/agencies",
      description: "Manage international client projects and multi-currency billing efficiently."
  },
  {
      icon: Building,
      name: "Manufacturing",
      path: "/netherlands/industries/manufacturing",
      description: "Access EU supply chains and benefit from import/export advantages."
  }
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in the Netherlands?</h4>
                <p className="text-gray-600">YourLegal Netherlands serves businesses using the country as a strategic EU hub. Key industries include SaaS & Technology (leveraging R&D credits), E-commerce & Trading (for EU logistics), international consulting firms, and global holding companies benefiting from the Dutch tax treaty network.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Why is the Netherlands good for a holding company?</h4>
                <p className="text-gray-600">The Netherlands is a premier jurisdiction for holding companies due to its 'participation exemption,' which exempts dividends and capital gains from qualifying subsidiaries from Dutch corporate tax. This, combined with its extensive network of tax treaties, helps to reduce global tax leakage significantly.</p>
            </div>
        </div>
    </div>
);


export default function NetherlandsIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Link href="/netherlands" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Netherlands Overview
            </Link>
          
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Industries We Serve in the <span className="text-orange-600">Netherlands</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored formation and tax solutions for businesses establishing their European gateway.
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

