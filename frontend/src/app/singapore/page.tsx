
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
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { HubspotForm } from '@/components/forms/hubspot-form';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="p-3 bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const faqs = [
    { q: "Can foreigners own 100% of a Singapore company?", a: "Yes, Singapore allows 100% foreign ownership of a Private Limited (Pte. Ltd.) company. There are no restrictions on the nationality of shareholders." },
    { q: "Is a local director mandatory?", a: "Yes, every Singapore company must have at least one director who is ordinarily resident in Singapore. We can provide a nominee director service to fulfill this requirement for foreign founders." },
    { q: "When is GST registration required?", a: "GST registration is mandatory if your company's taxable turnover for the past 12 months has exceeded S$1 million, or if you expect it to exceed S$1 million in the next 12 months. Voluntary registration is also possible." },
    { q: "Is bookkeeping mandatory in Singapore?", a: "Yes, under the Singapore Companies Act, all companies are required to maintain proper accounting records from the date of incorporation. These records are essential for tax filing and AGMs." },
    { q: "How long does incorporation take?", a: "The entire process, including name approval and registration with ACRA, can typically be completed within 1-3 business days, provided all documents are in order." },
    { q: "What are the main annual compliance costs?", a: "Annual costs typically include fees for the company secretary, registered address, filing of the Annual Return with ACRA, and corporate tax filing with IRAS." }
];

const BlogSection = () => {
    const posts = [
        { title: "Guide to Singapore's GST for Foreign Founders", date: "Dec 01, 2024", category: "Singapore", excerpt: "Learn about GST registration thresholds, obligations, and how it impacts your Singaporean business.", path: "/blog/singapore-gst-guide", image: "https://picsum.photos/seed/singapore%20shop/600/400", imageHint: "singapore shop" },
        { title: "The Nominee Director in Singapore: A Must-Know for Global Entrepreneurs", date: "Nov 28, 2024", category: "Singapore", excerpt: "Understand the role and responsibilities of a nominee director, a key requirement for setting up your company in Singapore.", path: "/blog/singapore-nominee-director", image: "https://picsum.photos/seed/singapore%20boardroom/600/400", imageHint: "singapore boardroom" },
        { title: "Understanding Singapore's Start-up Tax Exemption (SUTE)", date: "Nov 22, 2024", category: "Singapore", excerpt: "Maximize your tax savings with the SUTE scheme. Learn about eligibility criteria and benefits.", path: "/blog/singapore-sute-guide", image: "https://picsum.photos/seed/singapore%20tax/600/400", imageHint: "singapore tax" },
    ];
    return (
        <section id="blog" className="py-20 bg-red-50/20 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for Singapore</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in Singapore.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-red-600 font-semibold hover:underline mt-auto">Read More →</a>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Singapore Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your Singaporean business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/singapore/industries" className="block p-8 bg-red-50/50 rounded-2xl border border-red-100 hover:shadow-xl hover:border-red-200 transition">
                    <Briefcase className="w-8 h-8 text-red-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, trading, and holding companies in Singapore.</p>
                </Link>
                <Link href="/singapore/tax-compliance" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Landmark className="w-8 h-8 text-blue-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key ACRA and IRAS regulations for your Singaporean company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/singapore/company-formation', icon: Building, description: 'Pte. Ltd. setup with local director.' },
        { name: 'Annual Compliance', path: '/singapore/annual-compliance', icon: FileCheck, description: 'ACRA annual return filing.' },
        { name: 'Tax Compliance', path: '/singapore/tax-compliance', icon: Landmark, description: 'IRAS tax returns & ECI filing.' },
        { name: 'Bookkeeping', path: '/singapore/bookkeeping', icon: Briefcase, description: 'SFRS-compliant record keeping.' },
        { name: 'Accounting', path: '/singapore/accounting', icon: BookOpen, description: 'Unaudited Financial Statements.' },
        { name: 'Virtual CFO', path: '/singapore/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership for APAC.' },
        { name: 'Payroll', path: '/singapore/payroll', icon: Users, description: 'CPF contributions & SDL management.' },
        { name: 'Cross-Border Accounting', path: '/singapore/cross-border-accounting', icon: Globe, description: 'Handle multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in Singapore</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your Singapore business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-red-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-red-600 mb-3" />
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

export default function SingaporePage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-br from-red-50 to-orange-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Singapore Company Incorporation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">End-to-end support for global entrepreneurs looking to establish a presence in Asia's premier business hub.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">Get a Free Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate in Singapore?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={TrendingUp} title="Low Tax Regime" description="Attractive corporate tax rates, tax exemptions for startups, and no capital gains tax." />
                            <FeatureCard icon={ShieldCheck} title="Strong Legal Framework" description="Politically stable with robust IP protection and a world-class judicial system." />
                            <FeatureCard icon={Globe} title="Global Business Hub" description="Strategic gateway to ASEAN and Asian markets, with extensive trade agreements." />
                            <FeatureCard icon={Users} title="Access to Talent" description="A cosmopolitan city with a highly skilled, multilingual workforce and straightforward work pass system." />
                        </div>
                    </section>

                    <ServicesGrid />
                    
                    <section className="animate-fade-in-up">
                         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Singapore Company Formation Process</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="bg-white p-8 rounded-xl border">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Private Limited (Pte. Ltd.) Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="ACRA Name Approval" description="We check your proposed company name for availability and reserve it with the Accounting and Corporate Regulatory Authority (ACRA)." />
                                    <ProcessStep number="2" title="Document Preparation" description="We prepare all required documents, including the company constitution and director/shareholder consents." />
                                    <ProcessStep number="3" title="Company Registration" description="Once documents are signed, we submit the application to ACRA. Your company is typically incorporated within one day." />
                                    <ProcessStep number="4" title="Post-Incorporation" description="We assist with opening a corporate bank account and provide your first board resolution and other statutory documents." />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-xl">
                                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Requirements</h3>
                                 <ul className="space-y-4">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>At least one shareholder (individual or corporate).</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>A minimum of one Singapore resident director (nominee available).</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>A Singapore-based registered office address.</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>A qualified Company Secretary appointed within 6 months.</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Minimum initial paid-up capital of just S$1.</li>
                                 </ul>
                                  <Button asChild className="mt-6 w-full">
                                    <Link href="/singapore/process">View Detailed Process</Link>
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
                                <Link href="/singapore/pricing">View Detailed Pricing</Link>
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

