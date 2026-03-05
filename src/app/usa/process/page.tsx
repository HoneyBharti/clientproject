'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { HubspotForm } from '@/components/hubspot-form';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const steps = [
    {
        number: 1,
        title: 'Submit Your Details',
        details: [
            {
                title: 'Choose your entity type and state of formation.',
                items: [
                    {
                        title: 'LLC',
                        description: 'A limited liability company is an organizational business structure in the United States that helps business owners separate their personal liabilities from the business liabilities.',
                    },
                    {
                        title: 'C-Corporation',
                        description: 'A corporation is an independent entity for tax purposes. Corporations generally pay corporate taxes on their own profits, and their shareholders pay personal income on the capital distributed to them.',
                    },
                    {
                        title: 'Delaware',
                        description: 'The gold standard for startups planning to raise funding from angel investors and venture capital firms. Most Fortune 500 companies are incorporated in Delaware.',
                    },
                    {
                        title: 'Wyoming',
                        description: 'Great state for smaller, privately controlled companies. Extremely low cost, very manageable, and flexible as your company grows.',
                    }
                ]
            }
        ],
    },
    {
        number: 2,
        title: 'Sign Your Documents',
        details: [
            {
                title: 'We prepare all the required State and IRS documents.',
                items: []
            },
            {
                title: 'Sign them all digitally in a secure environment.',
                items: []
            }
        ],
    },
    {
        number: 3,
        title: 'Get Your EIN and Legal Documents',
        details: [
            {
                title: 'We file all the required documents with the Secretary of State.',
                items: []
            },
            {
                title: 'Get your EIN (Employer Identification Number) from the IRS.',
                items: []
            }
        ],
    },
    {
        number: 4,
        title: 'Open a Bank Account',
        details: [
           {
                title: 'Open an account with one of our banking partners.',
                items: [
                    {
                        title: 'Seamless Integration',
                        description: "Our full integration with digital banking partners makes the application process completely automated so you won't have to worry about anything.",
                    },
                     {
                        title: 'Subject to Approval',
                        description: 'Bank account opening is subject to the approval of our partners.',
                    },
                ]
            }
        ],
    },
    {
        number: 5,
        title: 'All Business Operations Documents Ready',
        details: [
            {
                title: 'We prepare a set of essential legal documents after incorporation. These provide clear information about company owners, operations, and other vital details.',
                items: [
                    { title: 'Operating Agreement' },
                    { title: 'Corporate Bylaws' },
                    { title: 'Stock Purchase Agreement' },
                    { title: 'Initial Resolutions' },
                    { title: 'And more...' },
                ]
            },
            {
                 title: 'All documents can be accessed from your secure online portal at any time.',
                 items: []
            }
        ],
    },
    {
        number: 6,
        title: 'Manage & Grow',
        details: [
            {
                title: 'Add optional services like a Registered Agent and Virtual Mail from your portal.',
                items: []
            },
            {
                title: 'With compliance and administrative tasks handled, you can focus on what matters most: growing your business.',
                items: []
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
                rootMargin: '-50% 0px -50% 0px', // Trigger when the element is in the middle of the viewport
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
            
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Launch Your USA Business</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        We've simplified the complex process of starting a business into a few straightforward steps.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => router.push('/usa')} size="lg">View Pricing</Button>
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">Schedule a Call</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16">
                        {/* Sticky Left Column */}
                        <div className="md:w-1/3 md:sticky md:top-24 h-full">
                            <div className="relative">
                                {/* Progress Bar */}
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

                        {/* Scrolling Right Column */}
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
                                            {step.number === 4 && (
                                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
                                                  <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Banking Support Through Our Partner, Mercury</h3>
                                                  <div className="text-center">
                                                      <p className="text-gray-600 mb-4">
                                                          YourLegal partners with Mercury to help eligible businesses access modern business banking services in the United States. As part of our company formation and compliance support, we assist founders with the Mercury account application process.
                                                      </p>
                                                      <div className="flex justify-center mb-4">
                                                          <Image
                                                              src="/partners/mercury-logo.svg"
                                                              alt="Mercury Bank logo"
                                                              width={120}
                                                              height={32}
                                                          />
                                                      </div>
                                                      <p className="text-gray-700 font-semibold text-sm">
                                                          Important: All bank account applications are reviewed, approved, or rejected solely by Mercury. YourLegal does not control or influence approval decisions.
                                                      </p>
                                                      <p className="text-xs text-gray-500 mt-3">
                                                          Mercury is a financial technology company, not a bank. Banking services are provided by Mercury’s partner banks. Account approval is subject to Mercury’s internal compliance and risk review processes.
                                                      </p>
                                                  </div>
                                              </div>
                                            )}
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
