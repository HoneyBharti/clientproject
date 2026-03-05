'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Server, ShoppingCart, Briefcase, Building, Plane, ChevronLeft, HeartPulse, Truck, Bot, GraduationCap } from 'lucide-react';
import { HubspotForm } from '@/components/hubspot-form';
import { Button } from '@/components/ui/button';

const industries = [
  {
    icon: Server,
    name: "SaaS & Technology",
    path: "/australia/industries/saas",
    description: "Navigate R&D tax incentives and digital GST compliance."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce",
    path: "/australia/industries/ecommerce",
    description: "Manage GST on sales, inventory, and international transactions."
  },
  {
    icon: Briefcase,
    name: "Consulting & Agencies",
    path: "/australia/industries/consulting",
    description: "Simplified accounting for service-based revenue and contractor payments."
  },
  {
    icon: Building,
    name: "Real Estate & Construction",
    path: "/australia/industries/real-estate",
    description: "Handle project-based accounting, GST on property, and compliance."
  },
  {
    icon: Plane,
    name: "Logistics & Transport",
    path: "/australia/industries/logistics",
    description: "Manage complex logistics finances, fuel tax credits, and asset depreciation."
  },
  {
    icon: Bot,
    name: "Startups",
    path: "/australia/industries/startups",
    description: "Financial modeling, ESOP management, and investor-ready reporting."
  },
  {
    icon: GraduationCap,
    name: "Agencies",
    path: "/australia/industries/agencies",
    description: "Project profitability tracking, client billing, and resource management."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    path: "/australia/industries/healthcare",
    description: "Specialized accounting for practices, managing MBS/PBS and compliance."
  },
   {
    icon: Building,
    name: "Manufacturing",
    path: "/australia/industries/manufacturing",
    description: "Inventory costing, R&D claims, and supply chain financial management."
  },
  {
    icon: Server,
    name: "Fintech",
    path: "/australia/industries/fintech",
    description: "AFSL compliance, revenue recognition, and secure financial data handling."
  },
];

const AiAnswerBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Ready Answer Block</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Which industries does YourLegal serve in Australia?</h4>
                <p className="text-gray-600">YourLegal Australia specializes in serving modern, global-first businesses. Key industries include SaaS and Technology (claiming R&D incentives), E-commerce brands (managing GST/BAS), consulting firms, international holding companies, and global entrepreneurs needing a resident director service.</p>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700">Is YourLegal suitable for a tech startup in Australia?</h4>
                <p className="text-gray-600">Yes, YourLegal is ideal for tech startups. We form the standard Pty Ltd company structure, provide guidance on the R&D Tax Incentive to reduce costs, and manage ongoing accounting and tax compliance with ASIC and the ATO.</p>
            </div>
        </div>
    </div>
);

const HubspotCtaSection = () => (
    <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to Get Started?</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions about our plans, partnerships, or unique business needs? Our team is here to help. Fill out the form, and we'll be in touch shortly.
                    </p>
                     <div className="mt-6">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">Schedule a Free Consultation</Button>
                        </a>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Contact Sales</h3>
                    <HubspotForm portalId="45337762" formId="1b231fa0-0c15-4330-9f8b-80e2164eefeb" />
                </div>
            </div>
        </div>
    </section>
);

export default function AustraliaIndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/australia" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Australia Overview
                </Link>
            
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Industries We Serve in <span className="text-yellow-600">Australia</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored formation, tax, and bookkeeping services for modern businesses operating in the Australian market.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry) => (
                <Link href={industry.path} key={industry.name} className="block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-yellow-300 transition group">
                    <industry.icon className="w-10 h-10 text-yellow-600 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700">{industry.name}</h2>
                    <p className="text-gray-600">{industry.description}</p>
                    <span className="text-sm font-semibold text-yellow-600 mt-4 inline-block group-hover:underline">Learn More &rarr;</span>
                </Link>
                ))}
            </div>

            <AiAnswerBlock />
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}
