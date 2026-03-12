
'use client';
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle, Loader2 } from 'lucide-react';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api-base';

const stateFees = {
    'Wyoming LLC': { initial: 100, annual: 60, annualDesc: 'Minimum annual report fee', processingTime: '1-3 Business Days' },
    'Delaware LLC': { initial: 160, annual: 300, annualDesc: 'Flat annual tax', processingTime: '2-4 Business Days' },
    'Wyoming C-Corp': { initial: 100, annual: 60, annualDesc: 'Minimum annual report fee', processingTime: '1-3 Business Days' },
    'Delaware C-Corp': { initial: 160, annual: 175, annualDesc: 'Minimum franchise tax', processingTime: '2-4 Business Days' },
};

function CheckoutPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planName = searchParams.get('planName');
    const state = searchParams.get('state');
    const entityType = searchParams.get('entityType');
    const country = searchParams.get('country') || 'USA';
    const amount = searchParams.get('amount');

    const planData = {
        'Micro': { title: 'Micro', price: 499 },
        'Vitals': { title: 'Vitals', price: 2388 },
        'Elite': { title: 'Elite', price: 3588 },
    };
    
    const paymentLinks = {
        'Micro-Delaware-LLC': 'https://buy.stripe.com/cNi6oH9356vv1XlgOz',
        'Micro-Delaware-C-Corp': 'https://buy.stripe.com/cNi6oH9356vv1XlgOz',
        'Micro-Wyoming-LLC': 'https://buy.stripe.com/8x2fZh3IL3jjgSfcyj',
        'Micro-Wyoming-C-Corp': 'https://buy.stripe.com/8x2fZh3IL3jjgSfcyj',
        'Vitals-Delaware-LLC': 'https://buy.stripe.com/4gM9ATenp5rrcBZ55R',
        'Vitals-Delaware-C-Corp': 'https://buy.stripe.com/14A14nfrtcTTbxV55S',
        'Vitals-Wyoming-LLC': 'https://buy.stripe.com/dRm6oHbbddXX6dB0PC',
        'Vitals-Wyoming-C-Corp': 'https://buy.stripe.com/dRm6oHbbddXX6dB0PD',
        'Elite-Delaware-LLC': 'https://buy.stripe.com/cNi6oHa791bb31p1TJ',
        'Elite-Delaware-C-Corp': 'https://buy.stripe.com/4gM3cvbbdbPP0Th2XL',
        'Elite-Wyoming-LLC': 'https://buy.stripe.com/dRmdR95QT8DDcBZcyo',
        'Elite-Wyoming-C-Corp': 'https://buy.stripe.com/dRmdR95QT8DDcBZcyp',
    };
    
    if (!planName || !state || !entityType) {
        return (
             <div className="min-h-screen bg-gray-50 font-inter flex flex-col">
                <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
                 <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error: Missing Information</h1>
                        <p className="text-gray-700 mb-6">Could not calculate pricing. Please go back and make a selection.</p>
                        <Link href="/usa" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                            Back to Pricing
                        </Link>
                    </div>
                </div>
                <AppFooter />
            </div>
        );
    }
    
    const selectedPlan = planData[planName] || { title: planName, price: parseInt(amount) || 0 };
    
    selectedPlan.features = selectedPlan.features || {
        list: ['Company Formation', 'Registered Agent Service', 'Portal Access', 'Document Storage']
    };

    const entityStateKey = `${state} ${entityType}`;
    const stateFeeData = stateFees[entityStateKey] || { initial: 0, annual: 0 };
    
    const ourFees = amount ? parseInt(amount) : selectedPlan.price;
    const stateFormationFee = stateFeeData.initial || 0;
    const annualStateFee = stateFeeData.annual || 0;
    
    let totalDueToday = ourFees + stateFormationFee;
    if (planName === 'Vitals' || planName === 'Elite') {
        totalDueToday += annualStateFee;
    }
    
    const paymentKey = `${planName}-${state}-${entityType}`;
    const paymentLink = paymentLinks[paymentKey] || '#';

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                     <Link href="/usa" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Pricing
                    </Link>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Summary</h1>
                        <p className="text-gray-600 mb-8">Review your selections before proceeding to payment.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left side: Order Details */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h2 className="text-xl font-bold mb-4">Your Plan: {selectedPlan.title}</h2>
                                <div className="space-y-4 text-gray-700">
                                    <div className="flex justify-between"><span>Plan Type:</span> <span className="font-semibold">{entityType}</span></div>
                                    <div className="flex justify-between"><span>Formation State:</span> <span className="font-semibold">{state}</span></div>
                                </div>
                                <hr className="my-6" />
                                <h3 className="font-semibold mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {selectedPlan.features.list.map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right side: Price Breakdown */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Price Breakdown</h2>
                                <div className="space-y-3 text-lg">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Our Fees (First Year):</span>
                                        <span className="font-semibold">${ourFees.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">One-time State Formation Fee:</span>
                                        <span className="font-semibold">${stateFormationFee.toLocaleString()}</span>
                                    </div>
                                    {(planName === 'Vitals' || planName === 'Elite') && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pre-paid Annual State Tax/Fee:</span>
                                        <span className="font-semibold">${annualStateFee.toLocaleString()}</span>
                                    </div>
                                    )}
                                     <hr className="my-2" />
                                    <div className="flex justify-between items-center text-2xl font-bold text-blue-600">
                                        <span>Total Due Today:</span>
                                        <span>${totalDueToday.toLocaleString()}</span>
                                    </div>
                                    {(planName === 'Micro') && (
                                        <>
                                            <hr className="my-4" />
                                            <div className="flex justify-between text-base text-gray-500">
                                                <span>Est. Annual State Tax/Fee:</span>
                                                <span className="font-semibold">${annualStateFee.toLocaleString()} / year</span>
                                            </div>
                                            <p className="text-xs text-gray-400 text-right">Billed separately starting year 2.</p>
                                        </>
                                    )}
                                </div>
                                 <button
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(`${API_BASE_URL}/payment/create-checkout`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                credentials: 'include',
                                                body: JSON.stringify({
                                                    amount: totalDueToday,
                                                    plan: planName,
                                                    country: country,
                                                    state,
                                                    entityType
                                                })
                                            });
                                            
                                            if (!response.ok) {
                                                const error = await response.json();
                                                console.error('Checkout error:', error);
                                                alert(error.message || 'Payment error. Please try again.');
                                                return;
                                            }
                                            
                                            const data = await response.json();
                                            if (data?.url && data.url.includes('/dashboard')) {
                                                window.location.href = '/dashboard?payment=success';
                                                return;
                                            }
                                            if (data?.url) {
                                                window.location.href = data.url;
                                                return;
                                            }
                                            window.location.href = '/dashboard?payment=success';
                                        } catch (error) {
                                            console.error('Payment error:', error);
                                            alert('Payment error. Please try again.');
                                        }
                                    }}
                                    className="mt-8 block w-full text-center py-3 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition shadow-lg"
                                >
                                    Proceed to Payment
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <CheckoutPageContent />
        </Suspense>
    )
}

    
