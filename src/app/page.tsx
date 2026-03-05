
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
    Building, Sparkles, Users, Settings, FileText, Upload, LayoutGrid, Shield, Briefcase, PiggyBank,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import Link from 'next/link';

const FaqSection = () => (
    <section className="bg-gray-50 p-8 rounded-lg border border-gray-200 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg text-gray-900">What is YourLegal?</h3>
                <p className="text-gray-600 mt-1">YourLegal is an all-in-one platform for global entrepreneurs to form, manage, and maintain compliance for their businesses in the USA and other major hubs. It combines technology automation with human expertise to handle company formation, registered agent services, bookkeeping, and tax filings, simplifying complex administrative tasks for non-resident founders.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-900">What does YourLegal do?</h3>
                <p className="text-gray-600 mt-1">YourLegal provides a comprehensive suite of services to help international founders launch and operate businesses. This includes company formation (LLC & C-Corp), registered agent services, automated and human-led bookkeeping, federal and state tax filings, and ongoing compliance management through a unified digital platform.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-900">Who is this for?</h3>
                <p className="text-gray-600 mt-1">The platform is designed for global entrepreneurs, non-resident founders, digital nomads, and investors who need a reliable, remote-first solution to manage their business entities in jurisdictions like the USA, UK, UAE, and Singapore.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-900">Which countries are covered?</h3>
                <p className="text-gray-600 mt-1">YourLegal supports business operations in key global hubs, including the United States (Delaware, Wyoming), United Arab Emirates, United Kingdom, Singapore, India, Australia, and the Netherlands.</p>
            </div>
        </div>
    </section>
);

const AllInOneSection = () => {
    const features = [
        {
            icon: Building,
            title: "Company Formation",
            description: "Launch your US company from anywhere. We handle the paperwork, so you can focus on your vision."
        },
        {
            icon: Briefcase,
            title: "Automated Bookkeeping",
            description: "Connect your bank account for automated transaction categorization and reporting."
        },
        {
            icon: PiggyBank,
            title: "Taxes & Compliance",
            description: "Never miss a deadline. We manage your state and federal tax filings and annual compliance reports."
        },
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">The All In One <span className="text-blue-600">Financial Platform</span> for Founders.</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Form, Manage, Track & Automate your business without any hassle.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                         <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                             <div className="p-4 bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DestinationsSection = () => {
    const destinations = [
        { name: "United States", description: "The world's largest market. Ideal for venture-backed startups, SaaS companies, and global brands.", flag: "🇺🇸", path: '/usa' },
        { name: "United Arab Emirates", description: "A tax-friendly hub connecting East and West. Perfect for international trade and services.", flag: "🇦🇪", path: '/dubai' },
        { name: "United Kingdom", description: "A prestigious, globally-recognized jurisdiction with a strong legal framework and access to European markets.", flag: "🇬🇧", path: '/uk' },
        { name: "Singapore", description: "Asia's premier financial hub, offering a stable, pro-business environment and low taxes.", flag: "🇸🇬", path: '/singapore' },
        { name: "Australia", description: "A stable, high-growth economy providing a strategic gateway to the Asia-Pacific region.", flag: "🇦🇺", path: '/australia' },
        { name: "Saudi Arabia", description: "Tap into the Middle East's largest economy and the ambitious projects of Vision 2030.", flag: "🇸🇦", path: '/saudi-arabia' },
        { name: "India", description: "Leverage one of the world's fastest-growing major economies with a massive domestic market.", flag: "🇮🇳", path: '/in' },
        { name: "Netherlands", description: "A strategic gateway to Europe with a pro-business environment and a highly skilled workforce.", flag: "🇳🇱", path: '/netherlands' },
    ];

    return (
        <section id="destinations" className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Choose Your Global Destination</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">We provide expert, end-to-end formation and compliance services in the world's leading business hubs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map(dest => (
                        <Link href={dest.path} key={dest.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                             <div className="text-5xl mb-4 mx-auto">{dest.flag}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                            <p className="text-gray-600 flex-grow mb-6">{dest.description}</p>
                            <span className="w-full mt-auto inline-block py-2 px-4 bg-blue-600 text-white font-bold rounded-xl">Learn More</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    const Step = ({ number, title, description, icon: Icon }) => (
        <div className="flex flex-col items-center text-center p-6 border border-blue-200 bg-white rounded-2xl shadow-lg relative pt-12 h-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-xl border-4 border-white shadow-md">
                {number}
            </div>
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
    return (
        <section id="how-it-works" className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
                    Three Simple Steps to Launch Your Global Business
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                    We streamline the entire process, from initial submission to managing your daily operations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-1/4 left-5 right-5 h-1 bg-blue-200 -z-10"></div>
                    <Step number={1} title="Select & Submit" description="Choose your country and entity, then submit your details via our quick, guided application." icon={FileText} />
                    <Step number={2} title="Formation & Filing" description="Our legal team handles all registrations, obtains your tax numbers, and files all necessary incorporation documents." icon={Upload} />
                    <Step number={3} title="Manage & Grow" description="Get instant access to your portal to manage compliance, taxes, and bookkeeping in one place." icon={LayoutGrid} />
                </div>
            </div>
        </section>
    );
};

const AnimatedText = () => {
    const phrases = [
        { text: 'from Anywhere.', color: 'text-indigo-600' },
        { text: 'With Yourlegal.', color: 'text-blue-600' }
    ];
    const [index, setIndex] = useState(0);
    const [animation, setAnimation] = useState('animate-flip-in');

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimation('animate-flip-out');
            setTimeout(() => {
                setIndex(prevIndex => (prevIndex + 1) % phrases.length);
                setAnimation('animate-flip-in');
            }, 500); // Half a second for the out animation
        }, 4000); // Total cycle time

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            key={index}
            className={`inline-block ${phrases[index].color} ${animation}`}
            style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
        >
            {phrases[index].text}
        </span>
    );
};


export default function LandingPage() {
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

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />
            <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ perspective: '1000px' }}>
                       Start Your Global Business
                        <br />
                        <AnimatedText />
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                        Formation, Taxes, Bookkeeping, and Compliance—all simplified for global founders. Focus on building, we handle the rest.
                    </p>
                    <button 
                        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-300 transform hover:scale-105"
                    >
                        Explore Destinations
                    </button>
                    <div className="mt-6 text-sm text-gray-500 flex justify-center items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>FDIC Insured Banking Partners | 10,000+ happy founders</span>
                    </div>
                </div>
            </section>
            
            <AllInOneSection />
            <DestinationsSection />
            <FounderReviews />
            <HowItWorksSection />
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <FaqSection />
            </div>

            <AppFooter />
        </div>
    );
}
