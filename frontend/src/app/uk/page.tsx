
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
  Banknote,
  Building,
  BookOpen,
  FileCheck
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
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-800 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const faqs = [
    { q: "Can non-residents incorporate a UK company?", a: "Yes, absolutely. You do not need to be a UK resident to be a director or shareholder of a UK limited company. Our service is designed for overseas founders." },
    { q: "Is a UK director mandatory?", a: "No, a UK company can have directors of any nationality and residency. However, you must have a registered office address in the UK, which we provide." },
    { q: "When do I need to register for VAT in the UK?", a: "VAT registration is mandatory if your UK taxable turnover exceeds £85,000 in a rolling 12-month period. You can also register voluntarily to reclaim VAT on your business expenses." },
    { q: "Is bookkeeping mandatory in the UK?", a: "Yes, all UK companies are legally required to keep accurate and up-to-date accounting records. These records are necessary for filing your annual accounts and Corporation Tax return." },
    { q: "What are the main annual compliance costs?", a: "The main annual costs are for filing the Confirmation Statement with Companies House, preparing and filing statutory accounts, and submitting your Corporation Tax return to HMRC. Our packages are designed to cover these." },
    { q: "How long does UK incorporation take?", a: "With all information provided correctly, a UK company can typically be incorporated with Companies House in under 24 hours." }
];

const BlogSection = () => {
    const posts = [
        { title: "Understanding UK Corporation Tax for Startups", date: "Nov 10, 2024", category: "UK", excerpt: "A clear guide to HMRC's Corporation Tax, rates, and filing requirements for new UK companies.", path: "/blog/uk-corporation-tax", image: "https://picsum.photos/seed/london%20office/600/400", imageHint: "london office" },
        { title: "UK VAT Registration: When and Why for Foreign Founders", date: "Nov 08, 2024", category: "UK", excerpt: "Learn the thresholds for mandatory VAT registration and the benefits of voluntary registration for your UK business.", path: "/blog/uk-vat-guide", image: "https://picsum.photos/seed/uk%20receipts/600/400", imageHint: "uk receipts" },
        { title: "Director's Responsibilities for a UK Limited Company", date: "Nov 05, 2024", category: "UK", excerpt: "A breakdown of the key legal duties and responsibilities you have as a director of a UK company.", path: "/blog/uk-director-duties", image: "https://picsum.photos/seed/uk%20meeting/600/400", imageHint: "uk meeting" }
    ];

    return (
        <section id="blog" className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for the UK</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in the United Kingdom.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-blue-600 font-semibold hover:underline mt-auto">Read More →</a>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our UK Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your UK business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/uk/industries" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, agencies, and holding companies in the UK.</p>
                </Link>
                <Link href="/uk/tax-compliance" className="block p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition">
                    <Landmark className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key Companies House and HMRC regulations for your UK company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/uk/company-formation', icon: Building, description: 'Ltd company setup in under 24 hours.' },
        { name: 'Annual Compliance', path: '/uk/annual-compliance', icon: FileCheck, description: 'Companies House & HMRC filings.' },
        { name: 'Tax Compliance', path: '/uk/tax-compliance', icon: Landmark, description: 'Corporation Tax & VAT returns.' },
        { name: 'Bookkeeping', path: '/uk/bookkeeping', icon: Briefcase, description: 'MTD-compliant record keeping.' },
        { name: 'Accounting', path: '/uk/accounting', icon: BookOpen, description: 'FRS-compliant financial reporting.' },
        { name: 'Virtual CFO', path: '/uk/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership.' },
        { name: 'Payroll', path: '/uk/payroll', icon: Users, description: 'PAYE scheme and employee payments.' },
        { name: 'Cross-Border Accounting', path: '/uk/cross-border-accounting', icon: Globe, description: 'Handle multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in the UK</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your UK business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-blue-800 mb-3" />
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

export default function UkPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />

            <section className="bg-gradient-to-r from-blue-100 via-gray-50 to-red-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">UK Company Formation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">End-to-end support for setting up and running your UK company, designed for both resident and overseas founders.</p>
                    <div className="mt-10">
                         <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white">Get a Free UK Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate a Company in the UK?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={Globe} title="Global Credibility" description="A UK company registration is respected worldwide, enhancing your business's reputation." />
                            <FeatureCard icon={ShieldCheck} title="Stable Legal System" description="Benefit from a transparent and predictable legal and financial framework." />
                            <FeatureCard icon={Banknote} title="Competitive Tax Regime" description="A competitive Corporation Tax rate and extensive double taxation treaties." />
                            <FeatureCard icon={Users} title="Access to Talent & Markets" description="Tap into a diverse talent pool and gain easy access to UK and European markets." />
                        </div>
                    </section>
                    
                    <ServicesGrid />

                    <section className="animate-fade-in-up">
                         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">UK Company Incorporation Process</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="bg-white p-8 rounded-xl border">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Private Limited (Ltd) Company Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="Name & SIC Code" description="We check your company name availability and help you choose the correct Standard Industrial Classification (SIC) codes." />
                                    <ProcessStep number="2" title="Directors & Shareholders" description="We collect the details for all directors and shareholders, including PSC (Persons with Significant Control) information." />
                                    <ProcessStep number="3" title="Registration" description="We file your application with Companies House and register your company for Corporation Tax with HMRC." />
                                    <ProcessStep number="4" title="Post-Incorporation" description="Receive your Certificate of Incorporation, share certificates, and get support for opening a UK business bank account." />
                                </div>
                            </div>
                             <div className="bg-gray-50 p-8 rounded-xl">
                                 <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included in Our Package</h3>
                                 <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Companies House Registration & Fee</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Articles of Association</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Share Certificates & PSC Register</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Registered Office Address (London)</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Director's Service Address</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>HMRC Corporation Tax Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>UK Business Bank Account Support</li>
                                 </ul>
                                  <Button asChild className="mt-6 w-full">
                                    <Link href="/uk/process">View Detailed Process</Link>
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
                                <Link href="/uk/pricing">View Detailed Pricing</Link>
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

