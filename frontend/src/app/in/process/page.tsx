'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { cn } from '@/lib/utils';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const steps = [
    {
        number: 1,
        title: 'Submit KYC & DSC',
        details: [
            {
                title: 'Gather KYC documents for all directors and shareholders.',
                items: [
                    {
                        title: 'Digital Signature Certificate (DSC)',
                        description: 'We obtain DSCs for all directors to sign electronic forms.',
                    },
                    {
                        title: 'Director Identification Number (DIN)',
                        description: 'We apply for unique DINs for individuals proposed to be directors.',
                    },
                ],
            },
        ],
    },
    {
        number: 2,
        title: 'Name Approval (RUN)',
        details: [
            {
                title: 'We check and reserve your company name with the MCA.',
                items: [
                    {
                        title: 'RUN Application',
                        description: 'Reserve Unique Name (RUN) web service is used to check availability and reserve the name for 20 days.',
                    },
                ],
            },
        ],
    },
    {
        number: 3,
        title: 'SPICe+ Incorporation',
        details: [
            {
                title: 'We prepare and lodge the main incorporation form (SPICe+).',
                items: [
                    {
                        title: 'MoA & AoA',
                        description: 'Drafting the Memorandum and Articles of Association as per the Companies Act, 2013.',
                    },
                    {
                        title: 'Professional Certification',
                        description: 'Ensuring all documents are certified by a practicing Chartered Accountant or Company Secretary.',
                    },
                ],
            },
        ],
    },
    {
        number: 4,
        title: 'COI, PAN & TAN',
        details: [
            {
                title: 'Your company is officially registered.',
                items: [
                    {
                        title: 'Certificate of Incorporation (COI)',
                        description: 'Received from the MCA, confirming the legal birth of your Pvt. Ltd. entity.',
                    },
                    {
                        title: 'Income Tax IDs',
                        description: 'Permanent Account Number (PAN) and Tax Deduction Account Number (TAN) are allotted simultaneously.',
                    },
                ],
            },
        ],
    },
    {
        number: 5,
        title: 'Statutory Registrations',
        details: [
            {
                title: 'We register your company for essential taxes and benefits.',
                items: [
                    { title: 'GST Registration (Goods & Services Tax)' },
                    { title: 'Udyam Registration (MSME)' },
                    { title: 'Professional Tax (State-specific)' },
                ],
            },
        ],
    },
    {
        number: 6,
        title: 'Bank Account & Compliance',
        details: [
            {
                title: 'Final steps to commence business operations.',
                items: [
                    { title: 'Corporate Bank Account Opening' },
                    { title: 'Commencement of Business (Form INC-20A)' },
                    { title: 'Portal Access for Annual MCA Compliance' },
                ],
            },
        ],
    },
];

export default function IndiaProcessPage() {
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
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

            <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Link href="/in" className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-800 mb-6">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to India Overview
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">Form Your Indian Pvt. Ltd.</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        A clear, guided roadmap to launching your legal business entity in India.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => router.push('/in/pricing')} size="lg" className="bg-orange-600 hover:bg-orange-700">View Pricing</Button>
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
                                        className="absolute left-0 top-0 h-full w-full bg-orange-600 transition-all duration-300"
                                        style={{ transform: `scaleY(${progressPercentage / 100})`, transformOrigin: 'top' }}
                                    ></div>
                                </div>
                                <div className="space-y-8">
                                    {steps.map((step) => {
                                        const isStepActive = step.number === activeStep;
                                        const isStepCompleted = step.number < activeStep;
                                        return (
                                            <div key={step.number} className="flex items-center">
                                                <div
                                                    className={cn(
                                                        'z-10 flex h-8 w-8 items-center justify-center rounded-full border-2',
                                                        isStepActive
                                                            ? 'border-orange-600 bg-orange-600 text-white'
                                                            : isStepCompleted
                                                            ? 'border-orange-600 bg-orange-600 text-white'
                                                            : 'border-gray-300 bg-white text-gray-500'
                                                    )}
                                                >
                                                    {isStepCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{step.number}</span>}
                                                </div>
                                                <h3
                                                    className={cn(
                                                        'ml-4 text-lg font-bold',
                                                        isStepActive ? 'text-orange-600' : 'text-gray-700'
                                                    )}
                                                >
                                                    {step.title}
                                                </h3>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="font-bold text-xl text-orange-600">{Math.round(progressPercentage)}% Complete</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-24">
                            {steps.map((step, index) => (
                                <div
                                    key={step.number}
                                    ref={(el) => (stepRefs.current[index] = el)}
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
