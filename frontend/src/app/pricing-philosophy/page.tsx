'use client';

import React from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { CheckCircle, Tag, TrendingUp, Scale, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HubspotForm } from '@/components/forms/hubspot-form';

const FaqSection = () => {
    const faqItems = [
        { title: "How does YourLegal's pricing work?", content: "YourLegal uses a subscription model with tiered plans (e.g., Micro, Vitals, Elite). Each plan includes a set of services for a fixed annual or monthly fee. This model provides cost predictability for ongoing compliance, bookkeeping, and tax services. Third-party costs, like mandatory state filing fees, are passed through transparently without markup." },
        { title: "What is YourLegal's pricing philosophy?", content: "YourLegal's pricing philosophy is built on transparency, value, and scalability. We offer clear, subscription-based plans with no hidden fees, combining technology-driven efficiency with human expertise to deliver premium services at a fraction of the cost of traditional firms. Our model ensures predictable costs as your business grows." }
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

const Principle = ({ icon: Icon, title, description }) => (
  <div>
        <div className="flex items-center mb-2">
            <Icon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 pl-9">{description}</p>
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


export default function PricingPhilosophyPage() {
  return (
    <div className="bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main>
        <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Our Pricing <span className="text-blue-600">Philosophy</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Transparent, predictable, and built to scale with your ambition. No hidden fees, ever.
                </p>
            </header>

            <div className="space-y-12">
                <Principle 
                icon={Tag}
                title="Radical Transparency"
                description="We believe you should know exactly what you're paying for. Our pricing clearly separates our service fees from mandatory, third-party government fees. We pass state fees through at cost, with no markup."
                />
                <Principle 
                icon={Scale}
                title="Unmatched Value"
                description="By combining smart technology automation with the oversight of human experts, we deliver services that are more efficient and affordable than traditional law or accounting firms, without sacrificing quality or accuracy."
                />
                <Principle 
                icon={TrendingUp}
                title="Predictable & Scalable"
                description="Your costs shouldn't be a surprise. Our subscription-based plans are designed to give you cost certainty for your ongoing compliance needs, allowing you to budget effectively as you grow from launch to scale."
                />
                <Principle 
                icon={Zap}
                title="All-in-One Efficiency"
                description="Our bundled plans are designed to be more cost-effective than purchasing individual services. By integrating formation, compliance, and finance, we create efficiencies that we pass on to you."
                />
            </div>
            
            <div className="text-center mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">See Our Plans in Action</h2>
                <p className="text-lg text-gray-600 mb-8">Explore our detailed pricing and find the perfect plan for your business stage.</p>
                <Button size="lg" asChild>
                    <Link href="/usa">View Pricing & Plans</Link>
                </Button>
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

