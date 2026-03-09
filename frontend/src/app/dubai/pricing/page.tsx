
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';

const PlanCard = ({ title, price, features, isPopular, onSelect }) => {
    const bgColor = isPopular ? 'bg-indigo-600' : 'bg-white';
    const textColor = isPopular ? 'text-white' : 'text-gray-900';
    const subtitleColor = isPopular ? 'text-gray-300' : 'text-gray-600';
    const priceColor = isPopular ? 'text-white' : 'text-blue-600';
    const checkColor = isPopular ? 'text-white' : 'text-blue-600';
    const buttonClass = isPopular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700';

    return (
        <div className={`p-8 rounded-2xl shadow-lg relative flex flex-col h-full border ${isPopular ? 'border-blue-500' : 'border-gray-200'} ${bgColor}`}>
            {isPopular && (
                <span className="absolute top-0 right-4 -mt-3 px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow-md">
                    Most Popular
                </span>
            )}
            <h3 className={`text-2xl font-extrabold mb-2 ${textColor}`}>{title}</h3>
            <p className={`text-sm opacity-90 mb-4 ${subtitleColor}`}>{features.subtitle}</p>
            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className={`text-5xl font-extrabold leading-none ${priceColor}`}>${price.toLocaleString()}</span>
                    <span className={`ml-2 text-lg font-medium ${subtitleColor}`}>/year</span>
                </div>
            </div>
            <p className={`text-xs mb-6 ${subtitleColor}`}>
                + Mandatory Government Fees
            </p>
            
            <ul className="space-y-3 mb-8 flex-grow">
                {features.list.map((item, index) => (
                    <li key={index} className={`flex items-start text-sm ${subtitleColor}`}>
                        <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${checkColor}`} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={onSelect}
                className={`block text-center w-full py-3 mt-auto font-bold rounded-xl transition shadow-lg text-base ${buttonClass}`}
            >
                Get Started
            </button>
        </div>
    );
};

const DubaiFeeCalculator = () => {
    const [companyType, setCompanyType] = useState('Free Zone');
    const [freeZone, setFreeZone] = useState('IFZA');
    const [numVisas, setNumVisas] = useState(1);

    const freeZoneData = {
        'IFZA': { base: 12500, visa: 3750, annual: 12500 },
        'Meydan': { base: 14000, visa: 4000, annual: 14000 },
        'DMCC': { base: 20000, visa: 5000, annual: 20000 },
        'Dubai South': { base: 15000, visa: 4200, annual: 15000 },
        'JAFZA': { base: 22000, visa: 5500, annual: 22000 },
        'RAKEZ': { base: 11000, visa: 3500, annual: 11000 },
        'SHAMS': { base: 11500, visa: 3800, annual: 11500 },
        'SAIF Zone': { base: 13000, visa: 4000, annual: 13000 },
        'Ajman Free Zone': { base: 10000, visa: 3200, annual: 10000 },
    };
    const mainlandData = {
        'Professional': { base: 20000, annual: 15000 },
        'Trading': { base: 25000, annual: 20000 },
    };

    let oneTimeCost = 0;
    let annualCost = 0;

    if (companyType === 'Free Zone') {
        const fz = freeZoneData[freeZone];
        oneTimeCost = fz.base + (numVisas * fz.visa);
        annualCost = fz.annual;
    } else {
        const ml = mainlandData[freeZone] || mainlandData['Professional'];
        oneTimeCost = ml.base;
        annualCost = ml.annual;
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-blue-600" /> Dubai Company Cost Calculator
            </h3>
            <p className="text-gray-600 mb-6">Get a real-time estimate for your UAE company formation and annual renewal.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Company Type</Label>
                    <Select value={companyType} onValueChange={setCompanyType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Free Zone">Free Zone</SelectItem>
                            <SelectItem value="Mainland">Mainland</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                       {companyType === 'Free Zone' ? 'Select Free Zone' : 'Select License Type'}
                    </Label>
                    <Select value={freeZone} onValueChange={setFreeZone}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {companyType === 'Free Zone' ? (
                                <>
                                    <SelectItem value="IFZA">IFZA</SelectItem>
                                    <SelectItem value="Meydan">Meydan</SelectItem>
                                    <SelectItem value="DMCC">DMCC</SelectItem>
                                    <SelectItem value="Dubai South">Dubai South</SelectItem>
                                    <SelectItem value="JAFZA">JAFZA</SelectItem>
                                    <SelectItem value="RAKEZ">RAKEZ</SelectItem>
                                    <SelectItem value="SHAMS">SHAMS</SelectItem>
                                    <SelectItem value="SAIF Zone">SAIF Zone</SelectItem>
                                    <SelectItem value="Ajman Free Zone">Ajman Free Zone</SelectItem>
                                </>
                            ) : (
                                <>
                                    <SelectItem value="Professional">Professional</SelectItem>
                                    <SelectItem value="Trading">Trading</SelectItem>
                                </>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Number of Visas</Label>
                    <Input 
                        type="number" 
                        min="0" 
                        value={numVisas} 
                        onChange={e => setNumVisas(Math.max(0, parseInt(e.target.value) || 0))}
                        disabled={companyType === 'Mainland'}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Est. One-Time Setup Cost (AED)</p>
                    <div className="text-4xl font-extrabold text-blue-600 mt-2">~ {oneTimeCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes license, registration, and visa allocation fees.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                     <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Annual Renewal Cost (AED)</p>
                    <div className="text-3xl font-bold text-gray-800 mt-2">~ {annualCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Includes license renewal. Excludes visa and office costs.</p>
                </div>
            </div>
             <p className="text-xs text-gray-500 mt-4 italic text-center">Disclaimer: Final pricing depends on your exact business activity and government fees. This is an estimate.</p>
        </div>
    );
};

export default function DubaiPricingPage() {
    const router = useRouter();

     const planData = {
        Formation: { title: 'Formation', price: 1999, features: { subtitle: 'Core setup for your UAE company.', list: ['License & Registration', 'Establishment Card', 'Bank Account Assistance']}},
        Compliance: { title: 'Compliance', price: 2999, features: { subtitle: 'Formation plus ongoing annual compliance.', list: ['All Formation Features', 'Trade License Renewal', 'VAT & Corporate Tax Registration', 'Annual Compliance Management']}, isPopular: true},
        AllInOne: { title: 'All-in-One', price: 4999, features: { subtitle: 'Complete package with bookkeeping and tax.', list: ['All Compliance Features', 'Monthly Bookkeeping', 'Quarterly VAT Filing', 'Annual Corporate Tax Filing']}},
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
             <section className="bg-gradient-to-r from-yellow-50 via-amber-50 to-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-900">Dubai Pricing & Plans</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for formation, compliance, and tax in the UAE.</p>
                </div>
            </section>
            
             <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <DubaiFeeCalculator />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PlanCard {...planData.Formation} onSelect={() => router.push('/checkout?planName=Formation&state=Dubai&entityType=FreeZone&country=UAE&amount=1999')} />
                        <PlanCard {...planData.Compliance} onSelect={() => router.push('/checkout?planName=Compliance&state=Dubai&entityType=FreeZone&country=UAE&amount=2999')} />
                        <PlanCard {...planData.AllInOne} onSelect={() => router.push('/checkout?planName=AllInOne&state=Dubai&entityType=FreeZone&country=UAE&amount=4999')} />
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
}

