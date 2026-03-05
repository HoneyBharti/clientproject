
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  X,
  BookOpen,
  Award,
  RefreshCw,
  Key,
  ShieldCheck,
  FileText,
  FileCheck,
  Upload,
  LayoutGrid,
  DollarSign,
  Globe,
  TrendingUp,
  Users,
  Briefcase,
  Landmark,
  Building,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';
import Image from 'next/image';

const FaqSection = () => {
    const faqs = [
        {
            category: "General & Formation",
            items: [
                { q: "How long does it take to form my company?", a: "Typically, state processing takes 2-5 business days. Wyoming is often faster than Delaware." },
                { q: "What's the difference between Wyoming and Delaware?", a: "Wyoming is excellent for privacy and low fees, making it ideal for most online businesses and LLCs. Delaware is the gold standard for C-Corps seeking venture capital, due to its established corporate law." },
                { q: "Do I need to be a US resident to start a company?", a: "No. You can form and own a US company from anywhere in the world. Our platform is built specifically for international founders." }
            ]
        },
        {
            category: "Taxes & Compliance",
            items: [
                { q: "What tax forms do you file for me?", a: "Our Vitals and Elite plans include federal tax filings (Form 1120 for C-Corps, Form 1065 for multi-member LLCs) and required state filings. We also handle Form 5472 for foreign-owned single-member LLCs." },
                { q: "Do I have to file taxes if I have no revenue?", a: "Yes. All US companies have an annual filing obligation with the IRS, even with zero revenue. Foreign-owned LLCs also have specific information returns that are mandatory." },
                { q: "What is a Registered Agent and is it included?", a: "A Registered Agent is a mandatory point of contact in your formation state to receive official legal mail. Your first year of Registered Agent service is included in all of our formation plans." }
            ]
        },
        {
            category: "Billing & Plans",
            items: [
                { q: "What do the state fees cover?", a: "State fees are one-time payments made directly to the Secretary of State to register your company. They are passed through to you without any markup." },
                { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade from Micro to Vitals or Elite at any time from your dashboard to add tax, bookkeeping, or dedicated support services." },
                { q: "What is your refund policy?", a: "We offer a 30-day money-back guarantee on all YourLegal service fees. State fees are non-refundable once they have been submitted to the state." }
            ]
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
                    Find quick answers to common questions about forming and managing your US company with YourLegal.
                </p>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((category) => (
                        <div key={category.category} className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                                {category.category}
                            </h3>
                            <Accordion type="single" collapsible className="w-full bg-gray-50 p-2 rounded-xl border border-gray-100">
                                {category.items.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg mb-2 shadow-sm">
                                        <AccordionTrigger className="px-6 text-left">{item.q}</AccordionTrigger>
                                        <AccordionContent className="px-6 text-gray-700">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description, icon: Icon }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);


const DeepDiveSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our USA Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your US business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/usa/industries" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, agencies, and holding companies in the US.</p>
                </Link>
                <Link href="/usa/services" className="block p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition">
                    <Landmark className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Our Services</h3>
                    <p className="text-gray-600">Explore our integrated services for formation, tax, accounting, and compliance.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/usa/company-formation', icon: Building, description: 'LLC & C-Corp formation in DE & WY.' },
        { name: 'Annual Compliance', path: '/usa/annual-compliance', icon: FileCheck, description: 'State reports & franchise tax filings.' },
        { name: 'Tax Compliance', path: '/usa/tax-compliance', icon: Landmark, description: 'Federal & state tax return preparation.' },
        { name: 'Bookkeeping', path: '/usa/bookkeeping', icon: Briefcase, description: 'Daily transaction recording & reconciliation.' },
        { name: 'Accounting', path: '/usa/accounting', icon: BookOpen, description: 'GAAP-compliant financial reporting.' },
        { name: 'Virtual CFO', path: '/usa/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership.' },
        { name: "Payroll", path: '/usa/payroll', icon: Users, description: "Manage employee & contractor payments." },
        { name: "Cross-Border Accounting", path: '/usa/cross-border-accounting', icon: Globe, description: "Handle multi-currency transactions." },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in the USA</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your US business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </Link>
                    ))}
                </div>
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

const TrustedBySection = () => (
    <section className="py-12 bg-white border-b border-t border-gray-200 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                Trusted by founders from world-class companies and startups
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-gray-400">
                <p className="font-bold text-2xl">Forbes</p>
                <p className="font-bold text-2xl">TechCrunch</p>
                <p className="font-bold text-2xl">Bloomberg</p>
                <p className="font-bold text-2xl">Y Combinator</p>
                <p className="font-bold text-2xl">Sequoia</p>
            </div>
        </div>
    </section>
);


export default function UsaPage() {
    const router = useRouter();

    const FounderReviews = () => {
        const reviews = [
            {
                quote: "As a non-resident founder, setting up in the US was daunting. YourLegal handled everything—formation, EIN, banking—flawlessly. Their platform is my command center for compliance.",
                name: "Elena V.",
                title: "Founder, SaaS Startup",
                avatar: "https://picsum.photos/seed/elena/100/100"
            },
            {
                quote: "The tax compliance service is a lifesaver. Instead of worrying about IRS deadlines and state filings, I can focus entirely on growing my business. The peace of mind is invaluable.",
                name: "Kenji T.",
                title: "Founder, E-commerce Brand",
                avatar: "https://picsum.photos/seed/kenji/100/100"
            },
            {
                quote: "Incredible service. We were incorporated in Delaware in under 48 hours, and our dashboard had all the legal documents we needed for our seed round. Highly recommended for any serious startup.",
                name: "Priya S.",
                title: "CEO, Fintech Company",
                avatar: "https://picsum.photos/seed/priya/100/100"
            }
        ];
    
        return (
            <section className="py-20 bg-gray-50 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Trusted by Global Founders</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from entrepreneurs who chose YourLegal to launch and manage their businesses.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                                <p className="text-gray-600 italic mb-6 flex-grow">"{review.quote}"</p>
                                <div className="flex items-center">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" data-ai-hint={index === 1 ? "man face" : "woman face"} />
                                    <div>
                                        <p className="font-bold text-gray-900">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    const StateComparisonGuide = () => {
        const states = [
            {
                name: 'Wyoming',
                description: 'The standard choice for many online businesses and single-member LLCs seeking low fees and strong asset protection.',
                advantages: ['Lowest annual state fee ($62 + $40 filing fee for LLC)', 'Strong asset protection and corporate veil', 'High privacy (no member/manager names required)'],
                disadvantages: ['Less prestige than Delaware for high-growth startups'],
                compliance: 'Annual Report Filing and a $62 annual license tax. Due date is on the 1st day of the anniversary month.',
                className: 'bg-blue-50/50 border-blue-200'
            },
            {
                name: 'Delaware',
                description: 'The global standard for C-Corporations, often preferred by venture-backed startups and businesses seeking institutional investment.',
                advantages: ['Most established corporate law (Court of Chancery)', 'High prestige for C-Corps', 'Flexible business structure'],
                disadvantages: ['Higher franchise tax for large companies', 'Higher initial LLC annual tax ($300)'],
                compliance: 'Annual Franchise Tax (C-Corp) or Annual Tax (LLC). C-Corp tax is based on authorized shares.',
                className: 'bg-indigo-50/50 border-indigo-200'
            },
            {
                name: 'California',
                description: 'Required if you or your employees physically operate in California. Comes with high taxes but access to a massive market.',
                advantages: ['Access to the largest US economy and venture capital market'],
                disadvantages: ['Minimum Annual Franchise Tax of $800 (LLC/C-Corp)', 'High complexity and taxation'],
                compliance: 'Annual Minimum Franchise Tax ($800) plus additional income tax. Statement of Information filing.',
                className: 'bg-red-50/50 border-red-200'
            },
            {
                name: 'Texas',
                description: 'A growing hub, popular for its lack of personal income tax. Suitable for businesses operating primarily within the state.',
                advantages: ['No state personal or corporate income tax', 'Business-friendly regulatory environment'],
                disadvantages: ['Franchise Tax (based on revenue, not just profit)', 'Complexity of the Franchise Tax structure'],
                compliance: 'Annual Franchise Tax (based on gross margin) and Public Information Report.',
                className: 'bg-green-50/50 border-green-200'
            },
        ];
    
        const FeatureList = ({ title, items, isAdvantage }) => (
            <div className="mb-4">
                <h4 className={`text-base font-bold ${isAdvantage ? 'text-green-700' : 'text-red-700'} mb-2 flex items-center`}>
                    {isAdvantage ? <CheckCircle className="w-4 h-4 mr-1.5" /> : <X className="w-4 h-4 mr-1.5" />}
                    {title}
                </h4>
                <ul className="text-sm space-y-1 list-disc pl-5 text-gray-700">
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        );
    
        return (
            <section className="py-20 bg-white animate-fade-in-up" id="state-guide">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
                        Choose Your Home State Wisely
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
                        The state of incorporation is a critical decision. Compare the top four states for US company formation.
                    </p>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {states.map((state) => (
                            <div key={state.name} className={`p-6 rounded-2xl shadow-xl border flex flex-col h-full ${state.className}`}>
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-3">{state.name}</h3>
                                <p className="text-sm text-gray-700 mb-6 italic">{state.description}</p>
                                
                                <div className="flex-grow space-y-4">
                                    <FeatureList title="Advantages" items={state.advantages} isAdvantage={true} />
                                    <FeatureList title="Disadvantages" items={state.disadvantages} isAdvantage={false} />
                                </div>
    
                                <div className="mt-6 pt-4 border-t border-gray-300">
                                    <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                                        <BookOpen className="w-4 h-4 mr-1.5 text-blue-600" /> Key Annual Compliance
                                    </h4>
                                    <p className="text-sm text-gray-700">{state.compliance}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    const USAFounderResources = () => {
        const posts = [
            { title: 'LLC vs. C-Corp: Which Is Right for You?', excerpt: 'Deciding between pass-through taxation and venture-ready structures can be tricky. This guide breaks it down.', path: '/blog/llc-vs-c-corp', image: 'https://picsum.photos/seed/business%20meeting/600/400', imageHint: 'business meeting' },
            { title: 'Non-Resident US Tax Guide 2025', excerpt: 'Everything International Founders Need to Know About Form 5472 and Form 1120.', path: '/blog/non-resident-tax-guide', image: 'https://picsum.photos/seed/tax%20forms/600/400', imageHint: 'tax forms' },
            { title: '5 Deductions You’re Missing Out On', excerpt: 'Maximize your startup’s runway by capturing these key expense categories.', path: '/blog/5-deductions-youre-missing-out-on', image: 'https://picsum.photos/seed/startup%20office/600/400', imageHint: 'startup office' }
        ];

        return (
            <section id="blog" className="py-20 bg-indigo-50/50 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">USA Founder Resources</h2>
                        <p className="text-gray-600">Expert guides on navigating the US business and tax landscape.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                                <div className="h-48 bg-gray-200 w-full relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                </div>
                                <div className="p-6 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                    <a href={post.path} className="text-blue-600 font-semibold hover:underline mt-auto">Read More →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
    
    const UsaBankingSection = () => (
        <section className="py-20 bg-white animate-fade-in-up" id="banking-support">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Business Banking Support for US Companies
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    As part of our US company formation and compliance services, YourLegal helps
                    founders apply for a US business bank account so they can operate smoothly
                    from day one.
                </p>
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                    <p className="text-gray-700 mb-6">
                        We work with trusted partners like Mercury to assist with the account
                        application and documentation process.
                    </p>
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/partners/mercury-logo.svg"
                            alt="Mercury logo"
                            width={180}
                            height={48}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        Banking services are provided by Mercury and its partner banks. Account
                        approval is subject to their review and discretion.
                    </p>
                </div>
            </div>
        </section>
    );
    
    const GuaranteeSection = () => (
        <section className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Peace-of-Mind Guarantee</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    Launch your business with zero risk. We ensure compliance, accuracy, and support every step of the way.
                </p>
    
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
                        <Award className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">100% Compliance</h3>
                        <p className="text-gray-600 text-sm">We guarantee accurate state and IRS filings. If we make an error, we cover the costs.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
                        <RefreshCw className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money Back</h3>
                        <p className="text-gray-600 text-sm">Change your mind within 30 days of purchase? Get a full refund on our service fees.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
                        <Key className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Secure &amp; Private</h3>
                        <p className="text-gray-600 text-sm">Your business data and financial information are protected with bank-level encryption.</p>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
             <section className="bg-gradient-to-r from-blue-50 via-gray-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">USA Company Incorporation, Accounting &amp; Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">End-to-end support for global entrepreneurs looking to establish a presence in the world's largest and most dynamic market.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get a Free USA Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>

            <TrustedBySection />
            
            <section className="py-20 bg-white animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section>
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate in the USA?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={DollarSign} title="Access to Capital" description="The world's deepest capital markets for venture funding and investment." />
                            <FeatureCard icon={Globe} title="World's Largest Market" description="Gain access to over 330 million consumers and the largest global economy." />
                            <FeatureCard icon={TrendingUp} title="Prestige &amp; Credibility" description="A US entity enhances your brand's reputation and trust with global partners." />
                            <FeatureCard icon={ShieldCheck} title="Clear Legal Framework" description="A stable and predictable legal system that protects businesses and intellectual property." />
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">US Company Formation Process</h2>
                        <div className="bg-white p-8 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-12">
                             <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">LLC or C-Corp Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number={1} title="Select Entity &amp; State" description="Choose between an LLC or C-Corp and a state of formation like Delaware or Wyoming." icon={FileText} />
                                    <ProcessStep number={2} title="Submit Your Details" description="Complete our simple online form with your company and founder information in minutes." icon={Users} />
                                    <ProcessStep number={3} title="We File Everything" description="Our team files all necessary documents with the state and obtains your Employer Identification Number (EIN) from the IRS." icon={Upload} />
                                    <ProcessStep number={4} title="Launch &amp; Manage" description="Receive your official documents in your portal and start managing your compliance from day one." icon={LayoutGrid} />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included?</h3>
                                 <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Company Name Availability Check</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>State Filing of Formation Documents</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>First Year of Registered Agent Service</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Employer Identification Number (EIN)</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Operating Agreement / Bylaws</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>US Business Bank Account Support</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Secure Online Document Portal</li>
                                 </ul>
                                  <Button asChild className="mt-6 w-full">
                                    <Link href="/usa/process">View Detailed Process</Link>
                                  </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

             <section className="py-20 bg-gray-50 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing Plans</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Choose the plan that fits your needs, from simple formation to full-service compliance and tax. No hidden fees.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/usa/pricing">View Detailed Pricing &amp; Plans</Link>
                    </Button>
                </div>
            </section>
            
            <ServicesGrid />

            <DeepDiveSection />

            <StateComparisonGuide />
            
            <UsaBankingSection />

            <FounderReviews />
            
            <GuaranteeSection />

            <USAFounderResources />
            
            <HubspotCtaSection />
            
            <FaqSection />

            <AppFooter />
        </div>
    );
};
