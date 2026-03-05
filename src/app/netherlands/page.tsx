
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Users,
  ShieldCheck,
  TrendingUp,
  Globe,
  Briefcase,
  Landmark,
  FileCheck,
  Building,
  BookOpen
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

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const faqs = [
    { q: "What is a Dutch B.V.?", a: "A 'Besloten Vennootschap' (B.V.) is a private limited liability company in the Netherlands. It's the most common legal form for foreign entrepreneurs as it provides limited liability and has a professional image." },
    { q: "Is a local director required?", a: "No, a Dutch B.V. can be 100% foreign-owned and managed. There is no requirement for a resident director, making it very accessible for international founders." },
    { q: "What is the '30% ruling'?", a: "The 30% ruling is a tax advantage for highly skilled migrants moving to the Netherlands for a specific job. If the criteria are met, the employer can grant a tax-free allowance of up to 30% of the gross salary." },
    { q: "What are the main corporate taxes in the Netherlands?", a: "The corporate income tax rate is 19% on the first €200,000 of profits and 25.8% on profits above that amount. There is also a Value Added Tax (BTW) of 21% on most goods and services." },
    { q: "Is a physical office address necessary?", a: "Yes, you need a registered office address in the Netherlands to incorporate a B.V. We can provide a registered address service to meet this requirement." },
];

const BlogSection = () => {
    const posts = [
        { title: "A Founder's Guide to Incorporating a Dutch B.V.", date: "Jan 15, 2025", category: "Netherlands", excerpt: "A step-by-step guide on the requirements and process for setting up your private limited company in the Netherlands.", path: "/blog/netherlands-bv-guide", image: "https://picsum.photos/seed/amsterdam%20canal/600/400", imageHint: "amsterdam canal" },
        { title: "Navigating Dutch Corporate Tax for Startups", date: "Jan 12, 2025", category: "Netherlands", excerpt: "Learn about corporate income tax rates, VAT (BTW), and other tax considerations for your Dutch business.", path: "/blog/netherlands-tax-guide", image: "https://picsum.photos/seed/dutch%20tax/600/400", imageHint: "dutch tax" },
        { title: "The 30% Ruling in the Netherlands: A Guide for Employers", date: "Jan 10, 2025", category: "Netherlands", excerpt: "Understand how the 30% ruling can help you attract top international talent to your Dutch company.", path: "/blog/netherlands-30-percent-ruling", image: "https://picsum.photos/seed/netherlands%20talent/600/400", imageHint: "netherlands talent" }
    ];
    return (
        <section id="blog" className="py-20 bg-orange-50/20 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for the Netherlands</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in the Netherlands.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-orange-600 font-semibold hover:underline mt-auto">Read More →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DeepDiveSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Netherlands Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your Dutch business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/netherlands/industries" className="block p-8 bg-orange-50/50 rounded-2xl border border-orange-100 hover:shadow-xl hover:border-orange-200 transition">
                    <Briefcase className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, trading, and holding companies in the Netherlands.</p>
                </Link>
                <Link href="/netherlands/tax-compliance" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Landmark className="w-8 h-8 text-blue-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key KVK and Belastingdienst regulations for your Dutch company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/netherlands/company-formation', icon: Building, description: 'Dutch B.V. setup via public notary.' },
        { name: 'Annual Compliance', path: '/netherlands/annual-compliance', icon: FileCheck, description: 'KVK annual accounts filing.' },
        { name: 'Tax Compliance', path: '/netherlands/tax-compliance', icon: Landmark, description: 'VPB (CIT) & BTW (VAT) returns.' },
        { name: 'Bookkeeping', path: '/netherlands/bookkeeping', icon: Briefcase, description: 'Dutch GAAP-compliant record keeping.' },
        { name: 'Accounting', path: '/netherlands/accounting', icon: BookOpen, description: 'SFRS-compliant financial reporting.' },
        { name: 'Virtual CFO', path: '/netherlands/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership for EU growth.' },
        { name: 'Payroll', path: '/netherlands/payroll', icon: Users, description: 'Manage salaries, wage tax & 30% ruling.' },
        { name: 'Cross-Border Accounting', path: '/netherlands/cross-border-accounting', icon: Globe, description: 'Handle multi-currency EU transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in the Netherlands</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your Dutch business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-orange-600 mb-3" />
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

export default function NetherlandsPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-orange-50 via-gray-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-blue-600">Netherlands Company Formation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Your complete solution for launching a Dutch B.V. We handle incorporation, compliance, and financial management, so you can expand into Europe with confidence.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">Get a Free Netherlands Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate in the Netherlands?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={Globe} title="Strategic European Gateway" description="A prime location with world-class logistics (Port of Rotterdam, Schiphol Airport) providing access to the entire EU market." />
                            <FeatureCard icon={Users} title="Highly Skilled Workforce" description="A tech-savvy, multilingual (English is widely spoken) workforce makes hiring and operating easy." />
                            <FeatureCard icon={TrendingUp} title="Pro-Business Climate" description="A stable political and economic environment with competitive corporate tax rates and R&D incentives." />
                            <FeatureCard icon={ShieldCheck} title="Attractive for Talent" description="The '30% ruling' offers a significant tax advantage for skilled international employees, helping you attract top talent." />
                        </div>
                    </section>
                    
                    <ServicesGrid />

                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Netherlands Company Formation Process (B.V.)</h2>
                        <div className="bg-white p-8 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Dutch B.V. (Besloten Vennootschap) Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="Document Preparation" description="We gather all shareholder and director information and draft the deed of incorporation." />
                                    <ProcessStep number="2" title="Notary & Deed Execution" description="We arrange for the deed to be executed by a public notary, a mandatory step in the Netherlands." />
                                    <ProcessStep number="3" title="KVK & Tax Registration" description="We register your new company with the Dutch Chamber of Commerce (KVK) and obtain your tax numbers (BTW & RSIN)." />
                                    <ProcessStep number="4" title="Bank Account & Launch" description="We provide full support for opening a Dutch business bank account to get you operational." />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included in Our Package</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Drafting of Incorporation Documents</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Notary Fee Coordination</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Chamber of Commerce (KVK) Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>VAT (BTW) & Corporate Tax Number Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>UBO Register Filing</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Registered Office Address Service</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Business Bank Account Assistance</li>
                                </ul>
                                <Button asChild className="mt-6 w-full">
                                    <Link href="/netherlands/process">View Detailed Process</Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="animate-fade-in-up">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing Plans</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                                Choose the plan that fits your needs, from simple formation to full-service compliance and tax.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/netherlands/pricing">View Detailed Pricing</Link>
                            </Button>
                        </div>
                    </section>
                    
                    <DeepDiveSection />
                    
                    <BlogSection />

                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto">
                             <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </section>

                    <HubspotCtaSection />
                </div>
            </div>

            <AppFooter />
        </div>
    );
};
