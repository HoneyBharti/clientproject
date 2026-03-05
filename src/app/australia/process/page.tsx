
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';


const steps = [
    {
        number: 1,
        title: 'Submit Your Details',
        details: [
            {
                title: 'Provide company and founder details.',
                items: [
                    {
                        title: 'Pty Ltd Company',
                        description: 'The standard entity for businesses in Australia, offering limited liability to its shareholders.',
                    },
                    {
                        title: 'Resident Director Requirement',
                        description: 'Australia requires at least one director to be ordinarily resident in Australia. We can provide a nominee director service to fulfill this.',
                    },
                ]
            }
        ],
    },
    {
        number: 2,
        title: 'Name Reservation',
        details: [
            {
                title: 'We check and reserve your company name with ASIC.',
                items: []
            },
        ],
    },
    {
        number: 3,
        title: 'Lodge Application with ASIC',
        details: [
            {
                title: 'We prepare and lodge all incorporation documents with the Australian Securities and Investments Commission (ASIC).',
                items: []
            },
            {
                title: 'Receive your Australian Company Number (ACN) and Certificate of Registration.',
                items: []
            }
        ],
    },
    {
        number: 4,
        title: 'Tax Registrations',
        details: [
           {
                title: 'We register your company with the Australian Taxation Office (ATO).',
                items: [
                    {
                        title: 'ABN (Australian Business Number)',
                        description: "A unique identifier for your business's dealings with the government.",
                    },
                     {
                        title: 'TFN (Tax File Number)',
                        description: 'Required for all tax-related matters.',
                    },
                     {
                        title: 'GST (Goods and Services Tax)',
                        description: 'Registration is required if your turnover exceeds A$75,000.',
                    },
                ]
            }
        ],
    },
    {
        number: 5,
        title: 'Open a Bank Account',
        details: [
            {
                title: 'We provide assistance with opening an Australian corporate bank account.',
                items: []
            }
        ],
    },
    {
        number: 6,
        title: 'Manage & Grow',
        details: [
            {
                title: 'Your portal is ready for ongoing compliance.',
                items: [
                    { title: 'Annual ASIC Review Statements' },
                    { title: 'Annual Tax Returns' },
                    { title: 'BAS Lodgements' },
                ]
            }
        ],
    }
];

export default function ProcessPage() {
    const [activeStep, setActiveStep] = useState(1);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const stepNumber = parseInt(entry.target.getAttribute('data-step') || '1', 10);
                        setActiveStep(stepNumber);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            stepRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const progressPercentage = ((activeStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            
            <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">Launch Your Australian Business</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        A clear, step-by-step guide to forming your Pty Ltd company in Australia.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => router.push('/australia')} size="lg">View Pricing</Button>
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">Schedule a Call</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3 md:sticky md:top-24 h-full">
                            <div className="relative">
                                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true">
                                    <div 
                                        className="absolute left-0 top-0 h-full w-full bg-blue-600 transition-all duration-300"
                                        style={{ transform: `scaleY(${progressPercentage / 100})`, transformOrigin: 'top' }}
                                    ></div>
                                </div>
                                <div className="space-y-8">
                                    {steps.map((step) => {
                                        const isStepActive = step.number === activeStep;
                                        const isStepCompleted = step.number < activeStep;
                                        return (
                                            <div key={step.number} className="flex items-center">
                                                <div className={cn(
                                                    "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
                                                    isStepActive ? "border-blue-600 bg-blue-600 text-white" : isStepCompleted ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-500"
                                                )}>
                                                    {isStepCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{step.number}</span>}
                                                </div>
                                                <h3 className={cn(
                                                    "ml-4 text-lg font-bold",
                                                    isStepActive ? "text-blue-600" : "text-gray-700"
                                                )}>{step.title}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="font-bold text-xl text-blue-600">{Math.round(progressPercentage)}% Complete</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-24">
                            {steps.map((step, index) => (
                                <div 
                                    key={step.number}
                                    ref={el => stepRefs.current[index] = el}
                                    data-step={step.number}
                                    className="min-h-[60vh] flex flex-col justify-center"
                                >
                                    <div className="p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
                                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{step.title}</h2>
                                        <div className="space-y-6">
                                            {step.details.map((detail, idx) => (
                                                <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <p className="font-semibold text-gray-800">{detail.title}</p>
                                                    {detail.items && detail.items.length > 0 && (
                                                        <ul className="mt-3 space-y-2 pl-5 list-disc text-gray-600">
                                                            {detail.items.map((item, itemIdx) => (
                                                                <li key={itemIdx}>
                                                                    <span className="font-semibold">{item.title}</span>
                                                                    {item.description && <p className="text-sm">{item.description}</p>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
