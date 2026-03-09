'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { Server, ShoppingCart, Briefcase, Building, Plane, HeartPulse, Truck, Bot, GraduationCap } from 'lucide-react';
import { HubspotForm } from '@/components/forms/hubspot-form';
import { Button } from '@/components/ui/button';

const industries = [
  {
    icon: Server,
    name: "SaaS & Technology",
    description: "Navigate complex revenue recognition, international tax laws, and R&D incentives with expert guidance for global software companies."
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Trading",
    description: "We handle multi-jurisdictional VAT/sales tax, inventory accounting, and manage high-volume international transactions."
  },
  {
    icon: Briefcase,
    name: "Consulting & Professional Services",
    description: "Simplified accounting and tax planning for service-based businesses with a global client base, ensuring compliance everywhere you operate."
  },
  {
    icon: Building,
    name: "Holding Companies & Family Offices",
    description: "Structure your global assets and investments for tax efficiency and liability protection with our corporate maintenance services."
  },
  {
    icon: Plane,
    name: "Global Entrepreneurs & Digital Nomads",
    description: "Establish a credible corporate structure for your location-independent business, offering liability protection and a professional presence."
  },
   {
    icon: HeartPulse,
    name: "Healthcare & Health-Tech",
    description: "Navigate complex regulatory environments, manage insurance billing cycles, and ensure compliant financial operations for health-tech and private care."
  },
  {
    icon: Truck,
    name: "Logistics & Transport",
    description: "Manage complex supply chains, multi-currency freight charges, and international customs and tax rules for your transport business."
  },
   {
    icon: Bot,
    name: "Fintech",
    description: "Comply with financial regulations (e.g., FCA, MAS, SAMA, SEC), manage client money, and build audit-proof systems in global financial hubs."
  },
  {
    icon: GraduationCap,
    name: "Creative & Marketing Agencies",
    description: "Handle project-based accounting, track profitability across borders, and manage client retainers for your creative or marketing agency."
  },
  {
    icon: Building,
    name: "Manufacturing",
    description: "Manage complex inventory costing, international supply chains, and leverage R&D incentives for your production business."
  }
];

const FaqSection = () => {
    const faqItems = [
        { title: "Which industries does YourLegal serve?", content: "YourLegal provides specialized financial and compliance services for a wide range of modern, global industries. Our expertise covers SaaS & Technology, E-commerce, Consulting, Agencies, Fintech, Logistics, Healthcare, Manufacturing, and Holding Companies, with tailored solutions for each sector's unique challenges in jurisdictions like the USA, UK, UAE, and Singapore." },
        { title: "How does industry specialization help my business?", content: "Our industry-specific approach means we understand the nuances that generalist firms miss. For SaaS, it's revenue recognition and R&D credits. For E-commerce, it's sales tax nexus and inventory. For Fintech, it's regulatory compliance. This targeted expertise helps you optimize taxes, ensure compliance, and make smarter financial decisions." }
    ];

    return (
        <section className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

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


export default function IndustriesPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Solutions for Your <span className="text-blue-600">Industry</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We provide tailored formation, tax, and bookkeeping services for modern, global-first businesses.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry) => (
                <div key={industry.name} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
                    <industry.icon className="w-10 h-10 text-blue-600 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{industry.name}</h2>
                    <p className="text-gray-600">{industry.description}</p>
                </div>
                ))}
            </div>

            <FaqSection />
            </div>
        </div>
        <HubspotCtaSection />
      </main>

      <AppFooter />
    </div>
  );
}

