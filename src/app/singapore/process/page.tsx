
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
                title: 'Provide your proposed company name, director, and shareholder details.',
                items: [
                    {
                        title: 'Local Director Requirement',
                        description: 'Every Singapore company needs one resident director. We can provide a nominee director to meet this requirement.',
                    },
                ]
            }
        ],
    },
    {
        number: 2,
        title: 'Name Approval',
        details: [
            {
                title: 'We check your company name for availability and reserve it with the Accounting and Corporate Regulatory Authority (ACRA).',
                items: []
            },
        ],
    },
    {
        number: 3,
        title: 'Sign Incorporation Documents',
        details: [
            {
                title: 'We prepare all necessary incorporation documents, including the company constitution. You can sign everything digitally.',
                items: []
            }
        ],
    },
    {
        number: 4,
        title: 'Company Registration',
        details: [
           {
                title: 'We submit your application to ACRA. Upon approval (typically within a day), your company is officially incorporated and receives a Unique Entity Number (UEN).',
                items: []
            }
        ],
    },
    {
        number: 5,
        title: 'Open a Bank Account',
        details: [
            {
                title: 'With your incorporation documents, we provide full assistance in opening a corporate bank account in Singapore.',
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
                    { title: 'Corporate Secretary Services' },
                    { title: 'Annual Return Filing with ACRA' },
                    { title: 'Annual Tax Filing with IRAS' },
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
            
            <section className="py-20 bg-gradient-to-br from-red-50 to-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Launch Your Singapore Business</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        A clear, step-by-step guide to forming your Pte. Ltd. company in Singapore.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => router.push('/singapore')} size="lg">View Pricing</Button>
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
                                        className="absolute left-0 top-0 h-full w-full bg-red-600 transition-all duration-300"
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
                                                    isStepActive ? "border-red-600 bg-red-600 text-white" : isStepCompleted ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-white text-gray-500"
                                                )}>
                                                    {isStepCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{step.number}</span>}
                                                </div>
                                                <h3 className={cn(
                                                    "ml-4 text-lg font-bold",
                                                    isStepActive ? "text-red-600" : "text-gray-700"
                                                )}>{step.title}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="font-bold text-xl text-red-600">{Math.round(progressPercentage)}% Complete</p>
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
