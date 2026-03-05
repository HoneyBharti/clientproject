
'use client';
import React from 'react';
import {
    Briefcase,
    Building,
    Globe,
    Landmark,
    Shield,
    TrendingUp,
    Users,
    Lightbulb,
    Target,
    Award
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavHeader } from '@/components/page-header';
import { AppFooter } from '@/components/page-footer';
import { Button } from '@/components/ui/button';

const caseStudies = [
    {
        country: "USA",
        flag: "🇺🇸",
        profile: { name: "Alexei", from: "Ukraine", business: "SaaS Startup" },
        challenge: "Needed to raise venture capital from US investors who required a Delaware C-Corp structure, but was unsure about the tax and legal implications for a non-resident founder.",
        solution: "We formed a Delaware C-Corp in 3 days, drafted investor-ready bylaws, handled the EIN application, and provided a clear guide on Form 5472 and non-resident tax obligations.",
        outcome: "Alexei successfully closed a $1.2M seed round and used our 'Vitals' plan to automate his bookkeeping and ensure ongoing tax compliance."
    },
    {
        country: "Dubai",
        flag: "🇦🇪",
        profile: { name: "Priya", from: "India", business: "E-commerce & International Trade" },
        challenge: "Wanted to set up a business to trade goods between Asia and Europe but was confused between a Mainland and a Free Zone company and the new Corporate Tax rules.",
        solution: "We advised a Meydan Free Zone company to take advantage of the 0% 'Qualifying Income' tax rate. We handled the entire formation, visa process, and bank account opening.",
        outcome: "Priya now runs her international trading business with minimal tax liability and uses our accounting service to manage her VAT filings."
    },
    {
        country: "UK",
        flag: "🇬🇧",
        profile: { name: "Kenji", from: "Japan", business: "Fintech App" },
        challenge: "Needed to establish a credible European presence to partner with UK banks but had no UK address or residency.",
        solution: "We incorporated a UK Limited company in under 24 hours, providing a prestigious London registered office address and handling all Companies House filings.",
        outcome: "Kenji's company gained the credibility to secure key banking partnerships and now uses our service for annual accounts and Corporation Tax filings."
    },
    {
        country: "Singapore",
        flag: "🇸🇬",
        profile: { name: "Maria", from: "Brazil", business: "Mobile App Development" },
        challenge: "Wanted to expand into the Southeast Asian market from a stable hub but couldn't meet the local resident director requirement.",
        solution: "We provided a nominee director service to fulfill the statutory requirement, incorporated her Pte. Ltd. company, and guided her through the Employment Pass application process.",
        outcome: "Maria successfully relocated to Singapore, took over the directorship, and now benefits from the SUTE tax exemption for startups, saving thousands in taxes."
    },
    {
        country: "Australia",
        flag: "🇦🇺",
        profile: { name: "Liam", from: "Ireland", business: "Renewable Energy Consulting" },
        challenge: "Needed to form an Australian company to bid on local projects but was blocked by the mandatory resident director requirement.",
        solution: "We provided a professional nominee director service, registered his Pty Ltd company with ASIC, and handled all ABN and GST registrations with the ATO.",
        outcome: "Liam's company was able to successfully bid on and win a major contract in Australia. We continue to manage his annual ASIC and ATO compliance."
    },
    {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        profile: { name: "Fatima", from: "Egypt", business: "IT Services" },
        challenge: "Wanted to capitalize on Vision 2030 projects but found the MISA licensing and Saudization (Nitaqat) requirements overwhelming.",
        solution: "We managed her MISA license application from start to finish, registered the LLC, and provided a clear compliance plan for meeting Nitaqat hiring quotas.",
        outcome: "Fatima's company is now fully operational in Riyadh, compliant with local labor laws, and positioned to win significant government contracts."
    },
    {
        country: "India",
        flag: "🇮🇳",
        profile: { name: "Chloe", from: "France", business: "Luxury Goods Marketplace" },
        challenge: "Aiming to enter the massive Indian market but was concerned about FDI policy restrictions and the resident director requirement.",
        solution: "We confirmed her business fell under the 100% automatic FDI route, formed a Private Limited company, appointed a resident nominee director, and set up her GST and other tax registrations.",
        outcome: "Chloe launched her e-commerce platform successfully in India. Our team handles her monthly GST filings and annual MCA compliance, allowing her to focus on growth."
    },
     {
        country: "Netherlands",
        flag: "🇳🇱",
        profile: { name: "Ben", from: "South Africa", business: "Tech & R&D" },
        challenge: "Wanted a European base to attract top tech talent and benefit from R&D incentives, but was unsure about the BV structure and the '30% ruling' for employees.",
        solution: "We incorporated a Dutch BV, provided a registered address in Amsterdam, and structured employment contracts to be eligible for the 30% tax ruling for skilled migrants.",
        outcome: "Ben hired a top international team and successfully claimed R&D tax credits (WBSO), significantly lowering his operational costs in Europe."
    }
];

const CaseStudyCard = ({ study }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1.5">
        <div className="p-6 bg-gray-50 border-b flex items-center gap-4">
            <span className="text-4xl">{study.flag}</span>
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{study.country}</h3>
                <p className="text-gray-600 font-medium">{study.profile.name} from {study.profile.from} &bull; {study.profile.business}</p>
            </div>
        </div>
        <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">The Challenge</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">The YourLegal Solution</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">The Outcome</h4>
                    <p className="text-gray-600 text-sm">{study.outcome}</p>
                </div>
            </div>
        </div>
    </div>
);

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

            <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Founder Success Stories</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how global entrepreneurs like you overcame complex challenges to launch and scale their businesses with YourLegal.
                    </p>
                </div>
            </section>
            
            <section className="py-20 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {caseStudies.map((study) => (
                            <CaseStudyCard key={study.country} study={study} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Have a Similar Challenge?</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Our experts are ready to provide a tailored solution for your specific needs. Let's build your success story together.
                    </p>
                     <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get a Free Consultation</Button>
                    </a>
                </div>
            </section>
            
            <AppFooter />
        </div>
    );
}
