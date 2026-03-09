
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';


const steps = [
    {
        number: 1,
        title: 'MISA License Application',
        details: [
            {
                title: 'The critical first step for any foreign investor.',
                items: [
                    {
                        title: 'Business Plan',
                        description: 'We help you prepare a comprehensive business plan and collect all necessary documents.',
                    },
                    {
                        title: 'Submission to MISA',
                        description: 'We submit your application to the Ministry of Investment of Saudi Arabia (MISA) to obtain your investment license.',
                    },
                ]
            }
        ],
    },
    {
        number: 2,
        title: 'Articles of Association (AoA)',
        details: [
            {
                title: 'We draft your company\'s AoA and get it notarized, a mandatory step before registration.',
                items: []
            },
        ],
    },
    {
        number: 3,
        title: 'Commercial Registration (CR)',
        details: [
            {
                title: 'We register your company with the Ministry of Commerce to obtain your Commercial Registration (CR) certificate.',
                items: []
            }
        ],
    },
    {
        number: 4,
        title: 'Statutory Registrations',
        details: [
           {
                title: 'We register your company with all required government bodies.',
                items: [
                    { title: 'ZATCA for tax and VAT' },
                    { title: 'GOSI for social insurance' },
                    { title: 'Chamber of Commerce (CoC)' },
                    { title: 'National Address' },
                ]
            }
        ],
    },
    {
        number: 5,
        title: 'Bank Account & Visas',
        details: [
            {
                title: 'We provide full assistance in opening your corporate bank account and managing the visa application process for your General Manager and staff.',
                items: []
            }
        ],
    },
    {
        number: 6,
        title: 'Manage & Grow',
        details: [
            {
                title: 'Your portal is ready for ongoing compliance in the Kingdom.',
                items: [
                    { title: 'MISA & CR Renewals' },
                    { title: 'VAT, Tax & Zakat Filings' },
                    { title: 'Nitaqat (Saudization) Compliance' },
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
            
            <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-900">Launch Your Saudi Business</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Navigating the path to establishing your company in the Kingdom of Saudi Arabia.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => router.push('/saudi-arabia')} size="lg">View Pricing</Button>
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
                                        className="absolute left-0 top-0 h-full w-full bg-green-800 transition-all duration-300"
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
                                                    isStepActive ? "border-green-800 bg-green-800 text-white" : isStepCompleted ? "border-green-800 bg-green-800 text-white" : "border-gray-300 bg-white text-gray-500"
                                                )}>
                                                    {isStepCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{step.number}</span>}
                                                </div>
                                                <h3 className={cn(
                                                    "ml-4 text-lg font-bold",
                                                    isStepActive ? "text-green-800" : "text-gray-700"
                                                )}>{step.title}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="font-bold text-xl text-green-800">{Math.round(progressPercentage)}% Complete</p>
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

