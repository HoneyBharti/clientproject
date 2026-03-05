
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
        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const faqs = [
    { q: "Is a local Australian director mandatory?", a: "Yes, every Australian Proprietary Limited (Pty Ltd) company must have at least one director who ordinarily resides in Australia. We can provide a professional nominee director service to meet this requirement." },
    { q: "Can foreigners own 100% of an Australian company?", a: "Yes, Australia permits 100% foreign ownership of a Pty Ltd company. There are no restrictions on the nationality of shareholders." },
    { q: "What is GST and when do I need to register?", a: "The Goods and Services Tax (GST) is a 10% tax on most goods and services sold in Australia. Registration is mandatory if your business has a GST turnover of AUD 75,000 or more." },
    { q: "What are the main annual compliance tasks?", a: "Key annual tasks include lodging an annual company statement with ASIC, paying the annual review fee, and lodging an annual company tax return with the Australian Taxation Office (ATO)." },
    { q: "How long does incorporation take in Australia?", a: "The process is very efficient. Once all director and shareholder information is provided, registration with ASIC can typically be completed within 1-2 business days." }
];

const BlogSection = () => {
    const posts = [
        { title: "A Guide to Australia's Goods and Services Tax (GST)", date: "Nov 20, 2024", category: "Australia", excerpt: "Learn about GST registration thresholds, obligations, and how it impacts your Australian business.", path: "/blog/australia-gst-guide", image: "https://picsum.photos/seed/sydney%20harbour/600/400", imageHint: "sydney harbour" },
        { title: "The Resident Director Requirement in Australia Explained", date: "Nov 18, 2024", category: "Australia", excerpt: "A deep dive into the legal requirement for a resident director and how our nominee service can help you comply.", path: "/blog/australia-resident-director", image: "https://picsum.photos/seed/sydney%20boardroom/600/400", imageHint: "sydney boardroom" },
        { title: "Choosing Your Business Structure in Australia: Pty Ltd vs. Sole Trader", date: "Nov 15, 2024", category: "Australia", excerpt: "Compare the most common business structures for foreign founders and determine which is right for you.", path: "/blog/australia-business-structures", image: "https://picsum.photos/seed/australia%20docs/600/400", imageHint: "australia docs" }
    ];

    return (
        <section id="blog" className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for Australia</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in Australia.</p>
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
}

const DeepDiveSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Australia Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your Australian business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/australia/industries" className="block p-8 bg-yellow-50/50 rounded-2xl border border-yellow-100 hover:shadow-xl hover:border-yellow-200 transition">
                    <Briefcase className="w-8 h-8 text-yellow-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for SaaS, E-commerce, agencies, and holding companies in Australia.</p>
                </Link>
                <Link href="/australia/tax-compliance" className="block p-8 bg-green-50/50 rounded-2xl border border-green-100 hover:shadow-xl hover:border-green-200 transition">
                    <Landmark className="w-8 h-8 text-green-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key ASIC, ATO, and financial regulations for your Australian company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/australia/company-formation', icon: Building, description: 'Pty Ltd company setup with resident director.' },
        { name: 'Annual Compliance', path: '/australia/annual-compliance', icon: FileCheck, description: 'Annual ASIC review and filings.' },
        { name: 'Tax Compliance', path: '/australia/tax-compliance', icon: Landmark, description: 'ATO tax returns and BAS lodgement.' },
        { name: 'Bookkeeping', path: '/australia/bookkeeping', icon: Briefcase, description: 'ATO-compliant record keeping.' },
        { name: 'Accounting', path: '/australia/accounting', icon: BookOpen, description: 'GAAP/IFRS financial reporting.' },
        { name: 'Virtual CFO', path: '/australia/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership.' },
        { name: 'Payroll', path: '/australia/payroll', icon: Users, description: 'Superannuation and PAYG compliance.' },
        { name: 'Cross-Border Accounting', path: '/australia/cross-border-accounting', icon: Globe, description: 'Handle multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in Australia</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your Australian business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-yellow-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-yellow-600 mb-3" />
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


export default function AustraliaPage() {
    const router = useRouter();
    const FounderReviews = () => {
        const reviews = [
            {
                quote: "As a non-resident founder, setting up in the US was daunting. YourLegal handled everything—formation, EIN, banking—flawlessly. Their platform is my command center for compliance.",
                name: "Elena V.",
                title: "Founder, SaaS Startup",
                avatar: "https://picsum.photos/seed/elena/100/100"
            },
            {
                quote: "The tax compliance service is a lifesaver. Instead of worrying about IRS deadlines and state filings, I can focus entirely on growing my business. The peace of mind is invaluable.",
                name: "Kenji T.",
                title: "Founder, E-commerce Brand",
                avatar: "https://picsum.photos/seed/kenji/100/100"
            },
            {
                quote: "Incredible service. We were incorporated in Delaware in under 48 hours, and our dashboard had all the legal documents we needed for our seed round. Highly recommended for any serious startup.",
                name: "Priya S.",
                title: "CEO, Fintech Company",
                avatar: "https://picsum.photos/seed/priya/100/100"
            }
        ];
    
        return (
            <section className="py-20 bg-gray-50 animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Trusted by Global Founders</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from entrepreneurs who chose YourLegal to launch and manage their businesses.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                                <p className="text-gray-600 italic mb-6 flex-grow">"{review.quote}"</p>
                                <div className="flex items-center">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" data-ai-hint={index === 1 ? "man face" : "woman face"} />
                                    <div>
                                        <p className="font-bold text-gray-900">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <NavHeader onLoginClick={() => router.push('/login')} onSignupClick={() => router.push('/signup')} />
            <section className="bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500">Australia Company Formation, Accounting & Tax</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Your complete solution for launching and managing an Australian company, fully compliant with ASIC and ATO regulations.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white">Get a Free Australia Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Incorporate a Company in Australia?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={TrendingUp} title="Strong & Stable Economy" description="A resilient, AAA-rated economy with a strong regulatory environment and consistent growth." />
                            <FeatureCard icon={Globe} title="Gateway to Asia-Pacific" description="Strategic location and extensive trade agreements provide ideal access to fast-growing Asian markets." />
                            <FeatureCard icon={ShieldCheck} title="Robust Legal System" description="A transparent and reliable legal framework that provides certainty and protection for businesses." />
                            <FeatureCard icon={Users} title="Highly Skilled Workforce" description="Access a well-educated, multicultural, and innovative talent pool." />
                        </div>
                    </section>
                    
                    <ServicesGrid />
                    
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Australian Company Formation Process (Pty Ltd)</h2>
                        <div className="bg-white p-8 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Proprietary Limited (Pty Ltd) Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="Name Reservation & ACN" description="We check and reserve your company name and apply for an Australian Company Number (ACN) with ASIC." />
                                    <ProcessStep number="2" title="Appoint Local Director" description="We appoint a resident nominee director to meet statutory requirements, a crucial step for foreign founders." />
                                    <ProcessStep number="3" title="Tax Registrations" description="We register your company for an Australian Business Number (ABN), Tax File Number (TFN), and Goods & Services Tax (GST) with the ATO." />
                                    <ProcessStep number="4" title="Bank Account & Compliance" description="Receive your corporate documents and get full support for opening an Australian business bank account." />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included in Our Package</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>ASIC Company Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>ABN, TFN, and GST Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Company Constitution</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Share Certificates</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Registered Office Address Service</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Nominee Resident Director Service</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Business Bank Account Assistance</li>
                                </ul>
                                <Button asChild className="mt-6 w-full">
                                    <Link href="/australia/process">View Detailed Process</Link>
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
                                <Link href="/australia/pricing">View Detailed Pricing</Link>
                            </Button>
                        </div>
                    </section>
                    
                    <DeepDiveSection />
                    
                    <FounderReviews />

                    <BlogSection />

                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto">
                             <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>)}
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
