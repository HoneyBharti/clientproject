
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
  Building,
  Briefcase,
  Banknote,
  Landmark,
  FileCheck,
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
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-800 text-white rounded-full font-bold text-lg mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const faqs = [
    { q: "Is 100% foreign ownership allowed in Saudi Arabia?", a: "Yes, under Vision 2030 reforms, 100% foreign ownership is now permitted for most business activities. However, some sectors may still have restrictions or require a local partner." },
    { q: "What is a MISA license?", a: "A MISA (Ministry of Investment of Saudi Arabia) license is a mandatory foreign investment license required for any foreign entity to do business in the Kingdom. It is the first and most critical step." },
    { q: "What is 'Saudization' (Nitaqat)?", a: "Saudization is a national policy requiring companies to hire a certain percentage of Saudi nationals. The percentage varies by company size and industry. Compliance is critical for visa issuance and government contracts." },
    { q: "What are the main taxes in Saudi Arabia?", a: "The main taxes for businesses are VAT (15%), Corporation Tax (typically 20% on profits for foreign shareholders), and Zakat (for Saudi/GCC shareholders). There is also withholding tax on payments to non-residents." },
    { q: "Is a physical office required?", a: "Yes, in most cases, a physical office address is required to complete the registration process and for operational purposes. We assist in finding suitable office solutions." }
];

const BlogSection = () => {
    const posts = [
        { title: "Navigating 'Saudization' (Nitaqat) for Your KSA Business", date: "Nov 25, 2024", category: "Saudi Arabia", excerpt: "Understand the Nitaqat program and its implications for hiring and compliance in Saudi Arabia.", path: "/blog/saudi-nitaqat-guide", image: "https://picsum.photos/seed/riyadh%20city/600/400", imageHint: "riyadh city" },
        { title: "A Foreign Investor's Guide to the MISA License", date: "Nov 21, 2024", category: "Saudi Arabia", excerpt: "A step-by-step guide to obtaining your foreign investment license from the Ministry of Investment.", path: "/blog/saudi-misa-license", image: "https://picsum.photos/seed/saudi%20ministry/600/400", imageHint: "saudi ministry" },
        { title: "Understanding VAT in Saudi Arabia for New Businesses", date: "Nov 17, 2024", category: "Saudi Arabia", excerpt: "Learn about the 15% VAT, registration requirements, and filing obligations with ZATCA.", path: "/blog/saudi-vat-guide", image: "https://picsum.photos/seed/saudi%20tax/600/400", imageHint: "saudi tax" }
    ];
    return (
         <section id="blog" className="py-20 bg-indigo-50/50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Founder Resources for Saudi Arabia</h2>
                    <p className="text-gray-600">Expert guides on scaling your business in the Kingdom.</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.title} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group">
                            <div className="h-48 bg-gray-200 w-full relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-ai-hint={post.imageHint} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col">
                                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.path} className="text-green-800 font-semibold hover:underline mt-auto">Read More →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const DeepDiveSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our KSA Expertise</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dive deeper into specific services, industries, and compliance frameworks relevant to your KSA business.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/saudi-arabia/industries" className="block p-8 bg-green-50/50 rounded-2xl border border-green-100 hover:shadow-xl hover:border-green-200 transition">
                    <Briefcase className="w-8 h-8 text-green-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industries We Serve</h3>
                    <p className="text-gray-600">Tailored solutions for Tech, Consulting, Construction, and Retail companies in KSA.</p>
                </Link>
                <Link href="/saudi-arabia/tax-compliance" className="block p-8 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-200 transition">
                    <Landmark className="w-8 h-8 text-blue-700 mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tax &amp; Compliance Framework</h3>
                    <p className="text-gray-600">Understand the key MISA, ZATCA, and MHRSD regulations for your Saudi company.</p>
                </Link>
            </div>
        </div>
    </section>
);

const ServicesGrid = () => {
    const services = [
        { name: 'Company Formation', path: '/saudi-arabia/company-formation', icon: Building, description: 'MISA license & LLC registration.' },
        { name: 'Annual Compliance', path: '/saudi-arabia/annual-compliance', icon: FileCheck, description: 'MISA & CR license renewals.' },
        { name: 'Tax Compliance', path: '/saudi-arabia/tax-compliance', icon: Landmark, description: 'VAT, Zakat/Tax & WHT filings.' },
        { name: 'Bookkeeping', path: '/saudi-arabia/bookkeeping', icon: Briefcase, description: 'ZATCA-compliant record keeping.' },
        { name: 'Accounting', path: '/saudi-arabia/accounting', icon: BookOpen, description: 'SOCPA-compliant financial reporting.' },
        { name: 'Virtual CFO', path: '/saudi-arabia/virtual-cfo', icon: TrendingUp, description: 'Strategic financial leadership for KSA.' },
        { name: 'Payroll', path: '/saudi-arabia/payroll', icon: Users, description: 'GOSI, Mudad, and Nitaqat compliance.' },
        { name: 'Cross-Border Accounting', path: '/saudi-arabia/cross-border-accounting', icon: Globe, description: 'Handle multi-currency transactions.' },
    ];
    return (
        <section className="py-20 bg-gray-50 animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in Saudi Arabia</h2>
                    <p className="text-lg text-gray-600">A complete suite of services for your KSA business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map(service => (
                        <Link key={service.name} href={service.path} className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-200 transition transform hover:-translate-y-1">
                            <service.icon className="w-8 h-8 text-green-800 mb-3" />
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


export default function SaudiArabiaPage() {
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
            <section className="bg-gradient-to-r from-green-50 via-gray-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-900">Saudi Arabia Company Formation & Compliance</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Your strategic partner for entering the Middle East's largest economy. We provide end-to-end MISA licensing, company registration, and tax compliance services.</p>
                    <div className="mt-10">
                        <a href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-green-800 hover:bg-green-700 text-white">Book a KSA Consultation</Button>
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBySection />
            
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Establish Your Business in Saudi Arabia?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={TrendingUp} title="Vision 2030 Growth" description="Tap into massive economic diversification projects and a rapidly growing non-oil economy." />
                            <FeatureCard icon={Globe} title="G20 Economy Access" description="Establish a presence in the largest economy in the Middle East and a key player on the global stage." />
                            <FeatureCard icon={Users} title="Pro-Investment Reforms" description="Benefit from sweeping legal and economic reforms designed to attract foreign investment." />
                            <FeatureCard icon={Building} title="Strategic Location" description="A logistical hub connecting Asia, Europe, and Africa, with significant infrastructure investment." />
                        </div>
                    </section>
                    
                    <ServicesGrid />

                    <section className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Saudi Arabia Company Formation Process (LLC)</h2>
                        <div className="bg-white p-8 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Limited Liability Company (LLC) Setup</h3>
                                <div className="space-y-6">
                                    <ProcessStep number="1" title="MISA Investment License" description="The essential first step. We prepare and submit your application to the Ministry of Investment to secure your foreign investment license." />
                                    <ProcessStep number="2" title="AoA & CR Registration" description="We draft your Articles of Association (AoA) and register your company with the Ministry of Commerce to obtain your Commercial Registration (CR)." />
                                    <ProcessStep number="3" title="Statutory Registrations" description="Register with the Chamber of Commerce, ZATCA (for tax/VAT), and GOSI (for social insurance)." />
                                    <ProcessStep number="4" title="Bank Account & Visas" description="Receive full support in opening your corporate bank account and managing visa applications for your team." />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included in Our Package</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>MISA License Application & Advisory</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Commercial Registration (CR)</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Articles of Association (AoA) Notarization</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>ZATCA, GOSI, and CoC Registrations</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>National Address Registration</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1"/>Bank Account Opening Assistance</li>
                                </ul>
                                 <Button asChild className="mt-6 w-full">
                                    <Link href="/saudi-arabia/process">View Detailed Process</Link>
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
                                <Link href="/saudi-arabia/pricing">View Detailed Pricing</Link>
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
